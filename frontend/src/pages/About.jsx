import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Camera, Award, Heart, Aperture, ArrowRight, Lock, Loader2 } from 'lucide-react';
import './About.css';

export default function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/about');
        if (response.data.success) {
          setAbout(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching about details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) {
    return (
      <div
        className="page-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <Loader2 className="spinner" size={32} />
      </div>
    );
  }

  // Fallback defaults in case something fails or database is empty
  const data = about || {
    name: 'Nidula D Photography',
    tagline: 'Photographer · Storyteller · Visual Artist',
    bioParagraphs: [
      "I'm Nidula, a professional photographer based in Colombo, Sri Lanka. With over a decade behind the lens, I specialise in capturing authentic moments — from the quiet emotion of a portrait to the raw grandeur of a landscape.",
      "My work is guided by a simple philosophy: every photograph should tell a story that transcends the frame. I believe in chasing light, not just shooting it.",
      "When I'm not shooting, you'll find me exploring the hill country, sharing photography tutorials on YouTube, or mentoring aspiring photographers.",
    ],
    awards: '8',
    experience: '12+',
    clients: '500+',
    photosDelivered: '10K+',
    skills: [
      'Portrait Photography',
      'Landscape',
      'Wedding Coverage',
      'Street Photography',
      'Nature & Wildlife',
      'Event Photography',
      'Photo Editing',
      'Color Grading',
    ],
    gear: [
      'Sony A7R V',
      'Canon EF 85mm f/1.2L',
      'Sony FE 24-70mm f/2.8',
      'DJI Mini 3 Pro Drone',
      'Profoto B10 Flash',
      'Adobe Lightroom & Photoshop',
    ],
    heroImg: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
  };

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-img">
          <img src={data.heroImg} alt="Photographer at work" />
          <div className="about-hero-overlay" />
        </div>
        <div className="about-hero-content">
          <p className="section-label">About the Artist</p>
          <h1 className="section-title">{data.name}</h1>
          <p className="about-tagline">{data.tagline}</p>
        </div>
      </section>

      {/* Bio + Skills */}
      <section className="about-body">
        <div className="about-grid">
          <div className="about-text">
            <p className="section-label">My Story</p>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>
              Passionate About
              <br />
              Every Frame
            </h2>
            {data.bioParagraphs &&
              data.bioParagraphs.map((para, idx) => (
                <p key={idx} className="about-para">
                  {para}
                </p>
              ))}
            <Link
              to="/contact"
              className="btn-primary"
              style={{ marginTop: '1.5rem', display: 'inline-flex' }}
            >
              Work With Me <ArrowRight size={16} />
            </Link>
          </div>

          <div className="about-sidebar">
            {/* Quick Stats */}
            <div className="about-card">
              <div className="about-stat">
                <Award size={18} />
                <div>
                  <strong>{data.awards}</strong>
                  <span>International Awards</span>
                </div>
              </div>
              <div className="about-stat">
                <Camera size={18} />
                <div>
                  <strong>{data.experience}</strong>
                  <span>Years Experience</span>
                </div>
              </div>
              <div className="about-stat">
                <Heart size={18} />
                <div>
                  <strong>{data.clients}</strong>
                  <span>Happy Clients</span>
                </div>
              </div>
              <div className="about-stat">
                <Aperture size={18} />
                <div>
                  <strong>{data.photosDelivered}</strong>
                  <span>Photos Delivered</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
              <div className="about-skills-card">
                <h3>Specialisations</h3>
                <div className="skills-tags">
                  {data.skills.map((s) => (
                    <span key={s} className="skill-tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gear */}
      {data.gear && data.gear.length > 0 && (
        <section className="gear-section">
          <div className="gear-inner">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <p className="section-label">My Toolkit</p>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>
                The Gear I Use
              </h2>
            </div>
            <div className="gear-grid">
              {data.gear.map((g) => (
                <div key={g} className="gear-item">
                  <Aperture size={18} className="gear-icon" />
                  <span>{g}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Subtle Admin Link */}
      <div className="admin-footer-link">
        <Link to="/admin/login" className="admin-subtle-link">
          <Lock size={12} /> Admin Login
        </Link>
      </div>
    </div>
  );
}
