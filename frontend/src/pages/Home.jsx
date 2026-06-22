import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Award, Camera, Eye, Image } from 'lucide-react';
import PhotoCard from '../components/PhotoCard';
import LightboxModal from '../components/LightboxModal';
import './Home.css';

const stats = [
  { icon: <Camera size={22} />, value: '500+', label: 'Sessions' },
  { icon: <Image size={22} />, value: '10K+', label: 'Photos' },
  { icon: <Award size={22} />, value: '8', label: 'Awards' },
  { icon: <Eye size={22} />, value: '1M+', label: 'Views' },
];

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/photos');
        setPhotos(res.data.data.slice(0, 6));
      } catch {
        // fallback static data
        setPhotos([
          { id: 1, title: 'Golden Mist', category: 'landscapes', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' },
          { id: 2, title: 'Bridal Light', category: 'weddings', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800' },
          { id: 3, title: 'City Rain', category: 'street', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800' },
          { id: 4, title: 'Serenity', category: 'portraits', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800' },
          { id: 5, title: 'Dusk Falls', category: 'landscapes', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800' },
          { id: 6, title: 'First Dance', category: 'weddings', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  // Parallax on hero
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="home">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" ref={heroRef}>
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&q=80"
            alt="Hero"
          />
          <div className="hero-gradient" />
        </div>
        <div className="hero-content">
          <span className="hero-label">Nidula D Photography</span>
          <h1 className="hero-title">
            Moments Frozen<br />
            <em>In Time</em>
          </h1>
          <p className="hero-sub">
            Award-winning photography capturing the beauty of light, emotion, and the human story.
          </p>
          <div className="hero-actions">
            <Link to="/gallery" className="btn-primary">
              View Gallery <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-outline">
              Book a Session
            </Link>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span />
          <p>Scroll</p>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section className="stats-banner">
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <span className="stat-icon">{s.icon}</span>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── RECENT WORK ── */}
      <section className="recent-section">
        <div className="section-header">
          <div>
            <p className="section-label">Recent Work</p>
            <h2 className="section-title">Latest Captures</h2>
            <p className="section-subtitle">
              A curated selection of recent photographs from various categories.
            </p>
          </div>
          <Link to="/gallery" className="btn-outline view-all-btn">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="spinner-wrap"><div className="spinner" /></div>
        ) : (
          <div className="photos-grid">
            {photos.map(photo => (
              <PhotoCard key={photo.id} photo={photo} onClick={setSelected} />
            ))}
          </div>
        )}
      </section>

      {/* ── CATEGORIES STRIP ── */}
      <section className="categories-section">
        <p className="section-label" style={{ textAlign: 'center' }}>Browse By Category</p>
        <div className="category-strip">
          {['Portraits', 'Landscapes', 'Weddings', 'Street', 'Nature', 'Events'].map(cat => (
            <Link
              key={cat}
              to={`/gallery/${cat.toLowerCase()}`}
              className="category-pill"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-section">
        <div className="cta-glow" />
        <div className="cta-inner">
          <p className="section-label">Ready to Begin?</p>
          <h2 className="cta-title">Let's Create Something<br /><em>Extraordinary</em></h2>
          <p className="cta-sub">
            From intimate portraits to grand celebrations, every moment deserves to be immortalised.
          </p>
          <Link to="/contact" className="btn-primary">
            Book Your Session <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {selected && <LightboxModal photo={selected} photos={photos} onClose={() => setSelected(null)} />}
    </main>
  );
}
