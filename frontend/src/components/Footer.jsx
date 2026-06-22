import { Link } from 'react-router-dom';
import { Camera, Globe2, Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

const galleryLinks = [
  { label: 'Portraits', path: '/gallery/portraits' },
  { label: 'Landscapes', path: '/gallery/landscapes' },
  { label: 'Weddings', path: '/gallery/weddings' },
  { label: 'Street', path: '/gallery/street' },
  { label: 'Nature', path: '/gallery/nature' },
  { label: 'Events', path: '/gallery/events' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="footer-inner">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <Camera size={20} className="logo-icon" />
              <span>Nidula <em>D</em></span>
            </Link>
            <p className="footer-tagline">
              Capturing light, emotion, and the stories that matter — one frame at a time.
            </p>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-btn">
                <Globe2 size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="social-btn">
                <Globe2 size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-btn">
                <Globe2 size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="social-btn">
                <Globe2 size={18} />
              </a>
            </div>
          </div>

          {/* Gallery */}
          <div className="footer-col">
            <h4 className="footer-col-title">Gallery</h4>
            <ul>
              {galleryLinks.map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul>
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About Me</Link></li>
              <li><Link to="/vlogs" className="footer-link">YT Vlogs</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
              <li><Link to="/contact" className="footer-link">Book a Session</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4 className="footer-col-title">Get In Touch</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={15} />
                <span>hello@nidulad.com</span>
              </div>
              <div className="contact-item">
                <Phone size={15} />
                <span>+94 77 000 0000</span>
              </div>
              <div className="contact-item">
                <MapPin size={15} />
                <span>Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Nidula D Photography. All rights reserved.</p>
          <p className="footer-credit">Designed &amp; Built with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
