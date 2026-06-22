import Photo from '../models/Photo.js';
import About from '../models/About.js';
import Vlog from '../models/Vlog.js';

const defaultPhotos = [
  { title: 'Golden Mist', category: 'landscapes', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', date: '2024-12-01' },
  { title: 'Bridal Light', category: 'weddings', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', date: '2024-11-15' },
  { title: 'City Rain', category: 'street', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800', date: '2024-11-05' },
  { title: 'Serenity', category: 'portraits', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800', date: '2024-10-28' },
  { title: 'Dusk Falls', category: 'landscapes', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', date: '2024-10-10' },
  { title: 'First Dance', category: 'weddings', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800', date: '2024-09-20' },
  { title: 'Urban Soul', category: 'street', url: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800', date: '2024-09-01' },
  { title: 'Golden Hour', category: 'portraits', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800', date: '2024-08-14' },
  { title: 'Wild Eagle', category: 'nature', url: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=800', date: '2024-08-01' },
  { title: 'Ocean Calm', category: 'landscapes', url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800', date: '2024-07-20' },
  { title: 'Festival Joy', category: 'events', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800', date: '2024-07-05' },
  { title: 'Forest Path', category: 'nature', url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800', date: '2024-06-18' }
];

const defaultAbout = {
  name: 'Nidula D Photography',
  tagline: 'Photographer · Storyteller · Visual Artist',
  bioParagraphs: [
    "I'm Nidula, a professional photographer based in Colombo, Sri Lanka. With over a decade behind the lens, I specialise in capturing authentic moments — from the quiet emotion of a portrait to the raw grandeur of a landscape.",
    "My work is guided by a simple philosophy: every photograph should tell a story that transcends the frame. I believe in chasing light, not just shooting it.",
    "When I'm not shooting, you'll find me exploring the hill country, sharing photography tutorials on YouTube, or mentoring aspiring photographers."
  ],
  awards: '8',
  experience: '12+',
  clients: '500+',
  photosDelivered: '10K+',
  skills: [
    'Portrait Photography', 'Landscape', 'Wedding Coverage', 'Street Photography',
    'Nature & Wildlife', 'Event Photography', 'Photo Editing', 'Color Grading'
  ],
  gear: [
    'Sony A7R V', 'Canon EF 85mm f/1.2L', 'Sony FE 24-70mm f/2.8',
    'DJI Mini 3 Pro Drone', 'Profoto B10 Flash', 'Adobe Lightroom & Photoshop'
  ],
  heroImg: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80'
};

const defaultVlogs = [
  {
    embedId: 'dQw4w9WgXcQ',
    title: 'A Week in the Hill Country — Sri Lanka Photography Vlog',
    duration: '18:42',
    views: '124K',
    date: 'Dec 2024',
    tags: ['Landscape', 'Travel']
  },
  {
    embedId: 'ysz5S6PUM-U',
    title: 'How I Shoot Portraits With Natural Light | Full BTS',
    duration: '22:15',
    views: '89K',
    date: 'Nov 2024',
    tags: ['Portraits', 'Tutorial']
  },
  {
    embedId: 'L_jWHffIx5E',
    title: 'Wedding Photography: From Ceremony to Reception — Complete BTS',
    duration: '35:08',
    views: '203K',
    date: 'Oct 2024',
    tags: ['Weddings', 'BTS']
  },
  {
    embedId: 'hHW1oY26kxQ',
    title: 'My Complete Camera Bag 2024 — What I Use & Why',
    duration: '14:30',
    views: '67K',
    date: 'Sep 2024',
    tags: ['Gear', 'Tips']
  },
  {
    embedId: 'YykjpeuMNEk',
    title: 'Street Photography in Colombo — Finding Light in the Chaos',
    duration: '19:55',
    views: '51K',
    date: 'Aug 2024',
    tags: ['Street', 'Travel']
  },
  {
    embedId: 'Zi_XLOBDo_Y',
    title: 'Editing My Best Wildlife Shots | Lightroom Full Workflow',
    duration: '28:12',
    views: '76K',
    date: 'Jul 2024',
    tags: ['Editing', 'Nature']
  }
];

export async function seedDatabase() {
  try {
    // Seed Photos
    const photoCount = await Photo.countDocuments();
    if (photoCount === 0) {
      await Photo.insertMany(defaultPhotos);
      console.log('Seeded default photos.');
    }

    // Seed About
    const aboutCount = await About.countDocuments();
    if (aboutCount === 0) {
      await About.create(defaultAbout);
      console.log('Seeded default about details.');
    }

    // Seed Vlogs
    const vlogCount = await Vlog.countDocuments();
    if (vlogCount === 0) {
      await Vlog.insertMany(defaultVlogs);
      console.log('Seeded default vlogs.');
    }
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
}
