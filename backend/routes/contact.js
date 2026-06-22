import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import Contact from '../models/Contact.js';
import { authMiddleware } from '../config/auth.js';

const router = express.Router();

// Local JSON fallback file used when MongoDB is unavailable
const DATA_DIR = path.resolve(process.cwd(), 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (e) {
    // ignore
  }
}

async function readLocalContacts() {
  try {
    const raw = await fs.readFile(CONTACTS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

async function writeLocalContacts(list) {
  await ensureDataDir();
  await fs.writeFile(CONTACTS_FILE, JSON.stringify(list, null, 2), 'utf8');
}

// GET /api/contact - return all contacts (most recent first) - Securing this route for admins
router.get('/', authMiddleware, async (req, res) => {
  try {
    // If mongoose is connected, read from DB
    if (Contact.db && Contact.db.readyState === 1) {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: contacts });
    }

    // Fallback to local JSON
    const contacts = await readLocalContacts();
    // sort by createdAt desc
    contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Backend error. Please try again.' });
  }
});

// POST /api/contact - Public endpoint for submitting a contact form/booking
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // If mongoose is connected, write to DB
    if (Contact.db && Contact.db.readyState === 1) {
      const contact = await Contact.create({ name, email, subject, message });
      return res.status(201).json({ success: true, message: 'Message sent successfully!', data: contact });
    }

    // Fallback: write to local JSON file so admin panel can still see bookings
    const contacts = await readLocalContacts();
    const newContact = {
      _id: `${Date.now()}`,
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    contacts.push(newContact);
    await writeLocalContacts(contacts);
    res.status(201).json({ success: true, message: 'Message saved locally (DB unavailable).', data: newContact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Backend error. Please try again.' });
  }
});

// DELETE /api/contact/:id - Delete/dismiss a booking request (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // If connected to DB, delete there
    if (Contact.db && Contact.db.readyState === 1) {
      const contact = await Contact.findByIdAndDelete(req.params.id);
      if (!contact) {
        return res.status(404).json({ success: false, message: 'Booking request not found' });
      }
      return res.json({ success: true, message: 'Booking dismissed successfully!' });
    }

    // Otherwise delete from local JSON
    const contacts = await readLocalContacts();
    const filtered = contacts.filter((c) => String(c._id) !== String(req.params.id));
    if (filtered.length === contacts.length) {
      return res.status(404).json({ success: false, message: 'Booking request not found' });
    }
    await writeLocalContacts(filtered);
    res.json({ success: true, message: 'Booking dismissed (local).' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete booking request' });
  }
});

export default router;
