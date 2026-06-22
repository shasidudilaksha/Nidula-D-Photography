import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  },
  { timestamps: true }
);

export default mongoose.model('Photo', photoSchema);
