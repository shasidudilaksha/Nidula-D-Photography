import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './LightboxModal.css';

export default function LightboxModal({ photo, photos, onClose }) {
  // Support both single-photo mode and gallery navigation mode
  const allPhotos = photos || [photo];
  const [idx, setIdx] = useState(() => {
    const i = allPhotos.findIndex(p => p.id === photo.id);
    return i >= 0 ? i : 0;
  });

  const current = allPhotos[idx];
  const hasPrev = idx > 0;
  const hasNext = idx < allPhotos.length - 1;

  const prev = () => hasPrev && setIdx(i => i - 1);
  const next = () => hasNext && setIdx(i => i + 1);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, idx]);

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}><X size={22} /></button>

        {hasPrev && (
          <button className="lightbox-nav lightbox-prev" onClick={prev} aria-label="Previous photo">
            <ChevronLeft size={26} />
          </button>
        )}
        {hasNext && (
          <button className="lightbox-nav lightbox-next" onClick={next} aria-label="Next photo">
            <ChevronRight size={26} />
          </button>
        )}

        <img src={current.url} alt={current.title} key={current.id} />
        <div className="lightbox-caption">
          <div className="lightbox-caption-top">
            <span className="lightbox-category">{current.category}</span>
            {allPhotos.length > 1 && (
              <span className="lightbox-counter">{idx + 1} / {allPhotos.length}</span>
            )}
          </div>
          <h3>{current.title}</h3>
        </div>
      </div>
    </div>
  );
}
