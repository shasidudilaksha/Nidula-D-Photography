import express from 'express';

const router = express.Router();

// Sample photo data — replace URLs with your own hosted images
const photos = [
  { id: 1, title: 'Golden Mist', category: 'landscapes', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', date: '2024-12-01' },
  { id: 2, title: 'Bridal Light', category: 'weddings', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', date: '2024-11-15' },
  { id: 3, title: 'City Rain', category: 'street', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800', date: '2024-11-05' },
  { id: 4, title: 'Serenity', category: 'portraits', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800', date: '2024-10-28' },
  { id: 5, title: 'Dusk Falls', category: 'landscapes', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', date: '2024-10-10' },
  { id: 6, title: 'First Dance', category: 'weddings', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800', date: '2024-09-20' },
  { id: 7, title: 'Urban Soul', category: 'street', url: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800', date: '2024-09-01' },
  { id: 8, title: 'Golden Hour', category: 'portraits', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800', date: '2024-08-14' },
  { id: 9, title: 'Wild Eagle', category: 'nature', url: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=800', date: '2024-08-01' },
  { id: 10, title: 'Ocean Calm', category: 'landscapes', url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800', date: '2024-07-20' },
  { id: 11, title: 'Festival Joy', category: 'events', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800', date: '2024-07-05' },
  { id: 12, title: 'Forest Path', category: 'nature', url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800', date: '2024-06-18' },
];

router.get('/', (req, res) => {
  const { category } = req.query;
  const result = category ? photos.filter(p => p.category === category) : photos;
  res.json({ success: true, data: result });
});

export default router;
