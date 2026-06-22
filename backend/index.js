import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { seedDatabase } from './config/seed.js';
import contactRoutes from './routes/contact.js';
import photoRoutes from './routes/photos.js';
import adminRoutes from './routes/admin.js';
import aboutRoutes from './routes/about.js';
import vlogRoutes from './routes/vlogs.js';

dotenv.config();

// Establish DB connection and run seeding
const initializeApp = async () => {
  await connectDB();
  await seedDatabase();
};
initializeApp();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/vlogs', vlogRoutes);

app.get('/', (req, res) => res.send('Nidula D Photography API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
