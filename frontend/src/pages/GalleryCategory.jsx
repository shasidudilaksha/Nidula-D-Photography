import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoCard from '../components/PhotoCard';
import LightboxModal from '../components/LightboxModal';
import { ArrowLeft, Loader2 } from 'lucide-react';
import './Gallery.css';

export default function GalleryCategory() {
  const { category } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const title = category.charAt(0).toUpperCase() + category.slice(1);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/photos?category=${category}`);
        if (response.data.success) {
          setPhotos(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching category photos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [category]);

  if (loading) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Loader2 className="spinner" size={32} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent)' }} />
      </div>
    );
  }

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
              <PhotoCard key={photo._id || photo.id} photo={photo} onClick={setSelected} />
            ))}
          </div>
        )}
      </div>

      {selected && <LightboxModal photo={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
