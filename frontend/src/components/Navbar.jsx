import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Camera, ChevronDown, Menu, X } from 'lucide-react';
import './Navbar.css';

const categories = [
  { label: 'All Photos', path: '/gallery' },
  { label: 'Portraits', path: '/gallery/portraits' },
  { label: 'Landscapes', path: '/gallery/landscapes' },
  { label: 'Weddings', path: '/gallery/weddings' },
  { label: 'Street', path: '/gallery/street' },
  { label: 'Nature', path: '/gallery/nature' },
  { label: 'Events', path: '/gallery/events' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="nav-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <Camera size={22} className="logo-icon" />
          <span className="logo-text">Nidula <em>D Photography</em></span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink></li>

          {/* Gallery Dropdown */}
          <li className="dropdown-parent" ref={dropdownRef}>
            <button
              className={`nav-link dropdown-trigger ${location.pathname.startsWith('/gallery') ? 'active' : ''}`}
              onClick={() => setDropdownOpen(v => !v)}
            >
              Gallery <ChevronDown size={14} className={`chevron ${dropdownOpen ? 'open' : ''}`} />
            </button>
            <div className={`dropdown-menu ${dropdownOpen ? 'visible' : ''}`}>
              {categories.map(cat => (
                <NavLink
                  key={cat.path}
                  to={cat.path}
                  end={cat.path === '/gallery'}
                  className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                >
                  {cat.label}
                </NavLink>
              ))}
            </div>
          </li>

          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink></li>
          <li><NavLink to="/vlogs" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>YT Vlogs</NavLink></li>
          <li><NavLink to="/contact" className="nav-cta">Book a Session</NavLink></li>
        </ul>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end className="mobile-link">Home</NavLink>
        <div className="mobile-gallery-section">
          <span className="mobile-section-label">Gallery</span>
          {categories.map(cat => (
            <NavLink key={cat.path} to={cat.path} end={cat.path === '/gallery'} className="mobile-link sub">
              {cat.label}
            </NavLink>
          ))}
        </div>
        <NavLink to="/about" className="mobile-link">About</NavLink>
        <NavLink to="/vlogs" className="mobile-link">YT Vlogs</NavLink>
        <NavLink to="/contact" className="mobile-link cta">Book a Session</NavLink>
      </div>
    </nav>
  );
}
