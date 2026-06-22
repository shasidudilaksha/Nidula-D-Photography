import express from 'express';
import { generateToken } from '../config/auth.js';

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'nidulaadmin' && password === 'nidulaadmin12345') {
    const token = generateToken({ username });
    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials. Please try again.',
  });
});

export default router;
