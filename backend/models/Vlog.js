import mongoose from 'mongoose';

const vlogSchema = new mongoose.Schema(
  {
    embedId: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    views: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model('Vlog', vlogSchema);
