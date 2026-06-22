import express from 'express';
import About from '../models/About.js';
import { authMiddleware } from '../config/auth.js';

const router = express.Router();

// GET /api/about - Fetch about page details
router.get('/', async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About();
    }
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch about details' });
  }
});

// PUT /api/about - Update about details (Admin only)
router.put('/', authMiddleware, async (req, res) => {
  try {
    const {
      name,
      tagline,
      bioParagraphs,
      awards,
      experience,
      clients,
      photosDelivered,
      skills,
      gear,
      heroImg,
    } = req.body;

    let about = await About.findOne();
    if (!about) {
      about = new About();
    }

    if (name !== undefined) about.name = name;
    if (tagline !== undefined) about.tagline = tagline;
    if (bioParagraphs !== undefined) about.bioParagraphs = bioParagraphs;
    if (awards !== undefined) about.awards = awards;
    if (experience !== undefined) about.experience = experience;
    if (clients !== undefined) about.clients = clients;
    if (photosDelivered !== undefined) about.photosDelivered = photosDelivered;
    if (skills !== undefined) about.skills = skills;
    if (gear !== undefined) about.gear = gear;
    if (heroImg !== undefined) about.heroImg = heroImg;

    await about.save();
    res.json({ success: true, message: 'About details updated successfully!', data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update about details' });
  }
});

export default router;
