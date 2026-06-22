import { Link } from 'react-router-dom';
import { Camera, Award, Heart, Aperture, ArrowRight } from 'lucide-react';
import './About.css';

const skills = ['Portrait Photography', 'Landscape', 'Wedding Coverage', 'Street Photography', 'Nature & Wildlife', 'Event Photography', 'Photo Editing', 'Color Grading'];
const gear = ['Sony A7R V', 'Canon EF 85mm f/1.2L', 'Sony FE 24-70mm f/2.8', 'DJI Mini 3 Pro Drone', 'Profoto B10 Flash', 'Adobe Lightroom & Photoshop'];

export default function About() {
  return (
    <div className="page-container">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-img">
          <img src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80" alt="Photographer at work" />
          <div className="about-hero-overlay" />
        </div>
        <div className="about-hero-content">
          <p className="section-label">About the Artist</p>
          <h1 className="section-title">Nidula D Photography</h1>
          <p className="about-tagline">Photographer · Storyteller · Visual Artist</p>
        </div>
      </section>

      {/* Bio + Skills */}
      <section className="about-body">
        <div className="about-grid">
          <div className="about-text">
            <p className="section-label">My Story</p>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>Passionate About<br />Every Frame</h2>
            <p className="about-para">
              I'm Nidula, a professional photographer based in Colombo, Sri Lanka. With over a decade behind the lens, I specialise in capturing authentic moments — from the quiet emotion of a portrait to the raw grandeur of a landscape.
            </p>
            <p className="about-para">
              My work is guided by a simple philosophy: every photograph should tell a story that transcends the frame. I believe in chasing light, not just shooting it.
            </p>
            <p className="about-para">
              When I'm not shooting, you'll find me exploring the hill country, sharing photography tutorials on YouTube, or mentoring aspiring photographers.
            </p>
            <Link to="/contact" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
              Work With Me <ArrowRight size={16} />
            </Link>
          </div>

          <div className="about-sidebar">
            {/* Quick Stats */}
            <div className="about-card">
              <div className="about-stat"><Award size={18} /><div><strong>8</strong><span>International Awards</span></div></div>
              <div className="about-stat"><Camera size={18} /><div><strong>12+</strong><span>Years Experience</span></div></div>
              <div className="about-stat"><Heart size={18} /><div><strong>500+</strong><span>Happy Clients</span></div></div>
              <div className="about-stat"><Aperture size={18} /><div><strong>10K+</strong><span>Photos Delivered</span></div></div>
            </div>

            {/* Skills */}
            <div className="about-skills-card">
              <h3>Specialisations</h3>
              <div className="skills-tags">
                {skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gear */}
      <section className="gear-section">
        <div className="gear-inner">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="section-label">My Toolkit</p>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>The Gear I Use</h2>
          </div>
          <div className="gear-grid">
            {gear.map(g => (
              <div key={g} className="gear-item">
                <Aperture size={18} className="gear-icon" />
                <span>{g}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
