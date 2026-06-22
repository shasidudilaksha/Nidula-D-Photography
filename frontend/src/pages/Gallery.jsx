import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PhotoCard from '../components/PhotoCard';
import LightboxModal from '../components/LightboxModal';
import './Gallery.css';

const CATEGORIES = ['all', 'portraits', 'landscapes', 'weddings', 'street', 'nature', 'events'];

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

export default function Gallery() {
  const [photos, setPhotos] = useState(ALL_PHOTOS);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = activeFilter === 'all' ? photos : photos.filter(p => p.category === activeFilter);

  return (
    <div className="page-container">
      <div className="page-hero">
        <p className="section-label">Portfolio</p>
        <h1 className="section-title">Photo Gallery</h1>
        <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
          A complete collection of work spanning portraits, landscapes, weddings and more.
        </p>
      </div>

      <div className="gallery-page">
        {/* Filter Tabs */}
        <div className="filter-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="results-count">{filtered.length} photo{filtered.length !== 1 ? 's' : ''}</p>

        {/* Grid */}
        <div className="gallery-grid">
          {filtered.map(photo => (
            <PhotoCard key={photo.id} photo={photo} onClick={setSelected} />
          ))}
        </div>
      </div>

      {selected && <LightboxModal photo={selected} photos={filtered} onClose={() => setSelected(null)} />}
    </div>
  );
}
