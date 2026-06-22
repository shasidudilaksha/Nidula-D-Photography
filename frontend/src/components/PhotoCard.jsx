import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Expand, Tag } from 'lucide-react';
import './PhotoCard.css';

export default function PhotoCard({ photo, onClick }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="photo-card" onClick={() => onClick && onClick(photo)}>
      <div className={`photo-card-img-wrap ${loaded ? 'loaded' : ''}`}>
        <img
          src={photo.url}
          alt={photo.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
        <div className="photo-card-overlay">
          <div className="photo-card-info">
            <span className="photo-card-category">
              <Tag size={12} /> {photo.category}
            </span>
            <h3 className="photo-card-title">{photo.title}</h3>
          </div>
          <button className="photo-card-expand" aria-label="View full">
            <Expand size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
