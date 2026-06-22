import express from 'express';
import Photo from '../models/Photo.js';
import { authMiddleware } from '../config/auth.js';

const router = express.Router();

// GET /api/photos - Fetch all photos, optionally filtered by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'all' ? { category } : {};
    const photos = await Photo.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: photos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch photos' });
  }
});

// POST /api/photos - Add a new photo (Admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, category, url, date } = req.body;
    if (!title || !category || !url) {
      return res.status(400).json({ success: false, message: 'Title, category, and image URL are required.' });
    }
    const photo = await Photo.create({ title, category, url, date });
    res.status(201).json({ success: true, message: 'Photo added successfully!', data: photo });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add photo' });
  }
});

// DELETE /api/photos/:id - Delete a photo (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (!photo) {
      return res.status(404).json({ success: false, message: 'Photo not found' });
    }
    res.json({ success: true, message: 'Photo deleted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete photo' });
  }
});

export default router;
