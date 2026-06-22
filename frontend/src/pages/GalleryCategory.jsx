import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import PhotoCard from '../components/PhotoCard';
import LightboxModal from '../components/LightboxModal';
import { ArrowLeft } from 'lucide-react';
import './Gallery.css';

const ALL_PHOTOS = [
  { id: 1, title: 'Golden Mist', category: 'landscapes', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' },
  { id: 2, title: 'Bridal Light', category: 'weddings', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800' },
  { id: 3, title: 'City Rain', category: 'street', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800' },
  { id: 4, title: 'Serenity', category: 'portraits', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800' },
  { id: 5, title: 'Dusk Falls', category: 'landscapes', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800' },
  { id: 6, title: 'First Dance', category: 'weddings', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800' },
  { id: 7, title: 'Urban Soul', category: 'street', url: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800' },
  { id: 8, title: 'Golden Hour', category: 'portraits', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800' },
  { id: 9, title: 'Wild Eagle', category: 'nature', url: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=800' },
  { id: 10, title: 'Ocean Calm', category: 'landscapes', url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800' },
  { id: 11, title: 'Festival Joy', category: 'events', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800' },
  { id: 12, title: 'Forest Path', category: 'nature', url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800' },
];

export default function GalleryCategory() {
  const { category } = useParams();
  const [selected, setSelected] = useState(null);
  const photos = ALL_PHOTOS.filter(p => p.category === category);
  const title = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="page-container">
      <div className="page-hero">
        <p className="section-label">Gallery</p>
        <h1 className="section-title">{title}</h1>
        <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
          {photos.length} curated {title.toLowerCase()} photograph{photos.length !== 1 ? 's' : ''}.
        </p>
      </div>

      <div className="gallery-page">
        <div className="gallery-back-row">
          <Link to="/gallery" className="btn-outline back-btn">
            <ArrowLeft size={16} /> All Photos
          </Link>
        </div>

        {photos.length === 0 ? (
          <div className="empty-state">
            <p>No photos in this category yet. Check back soon!</p>
            <Link to="/gallery" className="btn-primary" style={{ marginTop: '1rem' }}>Browse All</Link>
          </div>
        ) : (
          <div className="gallery-grid">
            {photos.map(photo => (
              <PhotoCard key={photo.id} photo={photo} onClick={setSelected} />
            ))}
          </div>
        )}
      </div>

      {selected && <LightboxModal photo={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
