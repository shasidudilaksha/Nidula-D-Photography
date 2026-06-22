import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Send, Globe2 } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/contact', form);
      toast.success('Message sent! I\'ll get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send. Please try again or email directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-hero">
        <p className="section-label">Let's Connect</p>
        <h1 className="section-title">Get In Touch</h1>
        <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
          Ready to create something beautiful? Book a session or drop a message.
        </p>
      </div>

      <div className="contact-page">
        <div className="contact-grid">
          {/* Info Panel */}
          <div className="contact-info-panel">
            <h2 className="contact-info-title">Contact Details</h2>
            <div className="contact-details">
              <div className="contact-row">
                <div className="contact-icon"><Mail size={18} /></div>
                <div>
                  <p className="contact-row-label">Email</p>
                  <a href="mailto:hello@nidulad.com" className="contact-row-value">hello@nidulad.com</a>
                </div>
              </div>
              <div className="contact-row">
                <div className="contact-icon"><Phone size={18} /></div>
                <div>
                  <p className="contact-row-label">Phone</p>
                  <a href="tel:+94770000000" className="contact-row-value">+94 77 000 0000</a>
                </div>
              </div>
              <div className="contact-row">
                <div className="contact-icon"><MapPin size={18} /></div>
                <div>
                  <p className="contact-row-label">Location</p>
                  <p className="contact-row-value">Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>

            <div className="availability-box">
              <span className="availability-dot" />
              <div>
                <p className="avail-title">Currently Accepting Bookings</p>
                <p className="avail-sub">Sessions from May 2025 onwards</p>
              </div>
            </div>

            <div className="contact-socials">
              <p className="contact-row-label" style={{ marginBottom: '0.75rem' }}>Find Me On</p>
              <div className="social-row">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-chip"><Globe2 size={15} /> Instagram</a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-chip"><Globe2 size={15} /> YouTube</a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-chip"><Globe2 size={15} /> Facebook</a>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Send a Message</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text" placeholder="e.g. Wedding Photography Inquiry" value={form.subject} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={6} placeholder="Tell me about your vision, event date, location..." value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn-primary submit-btn" disabled={loading}>
              {loading ? 'Sending...' : <><Send size={16} /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
