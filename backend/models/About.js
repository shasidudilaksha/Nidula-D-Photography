import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Nidula D Photography' },
    tagline: { type: String, default: 'Photographer · Storyteller · Visual Artist' },
    bioParagraphs: { type: [String], default: [] },
    awards: { type: String, default: '0' },
    experience: { type: String, default: '0' },
    clients: { type: String, default: '0' },
    photosDelivered: { type: String, default: '0' },
    skills: { type: [String], default: [] },
    gear: { type: [String], default: [] },
    heroImg: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('About', aboutSchema);
