import express from 'express';
import Vlog from '../models/Vlog.js';
import { authMiddleware } from '../config/auth.js';

const router = express.Router();

// GET /api/vlogs - Get all vlogs
router.get('/', async (req, res) => {
  try {
    const vlogs = await Vlog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: vlogs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch vlogs' });
  }
});

// POST /api/vlogs - Add a new vlog (Admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { embedId, title, duration, views, date, tags } = req.body;
    if (!embedId || !title || !duration || !views || !date) {
      return res.status(400).json({
        success: false,
        message: 'All fields (embedId, title, duration, views, date) are required.',
      });
    }
    const vlog = await Vlog.create({ embedId, title, duration, views, date, tags });
    res.status(201).json({ success: true, message: 'Vlog added successfully!', data: vlog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add vlog' });
  }
});

// DELETE /api/vlogs/:id - Delete a vlog (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const vlog = await Vlog.findByIdAndDelete(req.params.id);
    if (!vlog) {
      return res.status(404).json({ success: false, message: 'Vlog not found' });
    }
    res.json({ success: true, message: 'Vlog deleted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete vlog' });
  }
});

export default router;
