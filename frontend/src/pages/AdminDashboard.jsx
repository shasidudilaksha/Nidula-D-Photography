import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Image,
  User,
  Play,
  Calendar,
  LogOut,
  Plus,
  Trash2,
  Save,
  Loader2,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import './AdminDashboard.css';

const CATEGORIES = ['portraits', 'landscapes', 'weddings', 'street', 'nature', 'events'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('gallery');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const navigate = useNavigate();

  // Data states
  const [photos, setPhotos] = useState([]);
  const [about, setAbout] = useState({
    name: '',
    tagline: '',
    bioParagraphs: ['', '', ''],
    awards: '',
    experience: '',
    clients: '',
    photosDelivered: '',
    skills: [],
    gear: [],
    heroImg: '',
  });
  const [vlogs, setVlogs] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Form states
  const [newPhoto, setNewPhoto] = useState({ title: '', category: 'portraits', url: '' });
  const [newVlog, setNewVlog] = useState({
    embedId: '',
    title: '',
    duration: '',
    views: '',
    date: '',
    tags: '',
  });
  const [newSkill, setNewSkill] = useState('');
  const [newGear, setNewGear] = useState('');

  // ── Fetch bookings (standalone so it can be called on demand) ──
  const fetchBookings = useCallback(async (showToast = false) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;
    setBookingsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/contact', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setBookings(response.data.data);
        if (showToast) toast.success('Bookings refreshed!');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        toast.error('Session expired. Please log in again.');
        navigate('/admin/login');
      } else {
        toast.error('Failed to load bookings.');
      }
    } finally {
      setBookingsLoading(false);
    }
  }, [navigate]);

  // ── Re-fetch bookings every time the bookings tab becomes active ──
  useEffect(() => {
    if (activeTab === 'bookings') {
      fetchBookings();
    }
  }, [activeTab, fetchBookings]);

  // ── Authentication check & Fetch initial data ──
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast.error('Access denied. Please log in.');
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      setInitialLoading(true);
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const [photosRes, aboutRes, vlogsRes, bookingsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/photos'),
          axios.get('http://localhost:5000/api/about'),
          axios.get('http://localhost:5000/api/vlogs'),
          axios.get('http://localhost:5000/api/contact', { headers }),
        ]);

        if (photosRes.data.success) setPhotos(photosRes.data.data);
        if (aboutRes.data.success) setAbout(aboutRes.data.data);
        if (vlogsRes.data.success) setVlogs(vlogsRes.data.data);
        if (bookingsRes.data.success) setBookings(bookingsRes.data.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('adminToken');
          toast.error('Session expired. Please log in again.');
          navigate('/admin/login');
        } else {
          toast.error('Failed to load dashboard data.');
        }
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const getHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully.');
    navigate('/admin/login');
  };

  // ── Gallery Actions ──
  const handleAddPhoto = async (e) => {
    e.preventDefault();
    if (!newPhoto.title || !newPhoto.url) {
      return toast.error('Please enter a title and image URL');
    }
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/photos',
        newPhoto,
        getHeaders()
      );
      if (response.data.success) {
        setPhotos([response.data.data, ...photos]);
        setNewPhoto({ title: '', category: 'portraits', url: '' });
        toast.success('Photo added successfully!');
      }
    } catch {
      toast.error('Failed to add photo.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    try {
      const response = await axios.delete(`http://localhost:5000/api/photos/${id}`, getHeaders());
      if (response.data.success) {
        setPhotos(photos.filter((p) => p._id !== id));
        toast.success('Photo deleted.');
      }
    } catch {
      toast.error('Failed to delete photo.');
    }
  };

  // ── About Actions ──
  const handleUpdateAbout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put('http://localhost:5000/api/about', about, getHeaders());
      if (response.data.success) {
        setAbout(response.data.data);
        toast.success('About details updated!');
      }
    } catch {
      toast.error('Failed to update about details.');
    } finally {
      setLoading(false);
    }
  };

  const handleBioChange = (index, value) => {
    const updatedBio = [...about.bioParagraphs];
    updatedBio[index] = value;
    setAbout({ ...about, bioParagraphs: updatedBio });
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    if (about.skills.includes(newSkill.trim())) return toast.error('Specialisation already exists.');
    setAbout({ ...about, skills: [...about.skills, newSkill.trim()] });
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setAbout({ ...about, skills: about.skills.filter((s) => s !== skillToRemove) });
  };

  const handleAddGear = () => {
    if (!newGear.trim()) return;
    if (about.gear.includes(newGear.trim())) return toast.error('Gear already exists in list.');
    setAbout({ ...about, gear: [...about.gear, newGear.trim()] });
    setNewGear('');
  };

  const handleRemoveGear = (gearToRemove) => {
    setAbout({ ...about, gear: about.gear.filter((g) => g !== gearToRemove) });
  };

  // ── Vlog Actions ──
  const handleAddVlog = async (e) => {
    e.preventDefault();
    if (!newVlog.embedId || !newVlog.title || !newVlog.duration || !newVlog.views || !newVlog.date) {
      return toast.error('All fields except tags are required.');
    }
    setLoading(true);

    const tagsArray = newVlog.tags
      ? newVlog.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    try {
      const response = await axios.post(
        'http://localhost:5000/api/vlogs',
        { ...newVlog, tags: tagsArray },
        getHeaders()
      );
      if (response.data.success) {
        setVlogs([response.data.data, ...vlogs]);
        setNewVlog({ embedId: '', title: '', duration: '', views: '', date: '', tags: '' });
        toast.success('Vlog added successfully!');
      }
    } catch {
      toast.error('Failed to add vlog.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vlog?')) return;
    try {
      const response = await axios.delete(`http://localhost:5000/api/vlogs/${id}`, getHeaders());
      if (response.data.success) {
        setVlogs(vlogs.filter((v) => v._id !== id));
        toast.success('Vlog deleted.');
      }
    } catch {
      toast.error('Failed to delete vlog.');
    }
  };

  // ── Bookings/Contacts Actions ──
  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to dismiss this booking request?')) return;
    try {
      const response = await axios.delete(`http://localhost:5000/api/contact/${id}`, getHeaders());
      if (response.data.success) {
        setBookings(bookings.filter((b) => b._id !== id));
        toast.success('Booking dismissed.');
      }
    } catch {
      toast.error('Failed to dismiss booking.');
    }
  };

  if (initialLoading) {
    return (
      <div className="dashboard-loading">
        <Loader2 className="spinner" size={48} />
        <p>Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
          <p>Nidula D Photography</p>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            <Image size={18} /> Gallery Manager
          </button>
          <button
            className={`nav-item ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <User size={18} /> About Editor
          </button>
          <button
            className={`nav-item ${activeTab === 'vlogs' ? 'active' : ''}`}
            onClick={() => setActiveTab('vlogs')}
          >
            <Play size={18} /> Vlogs Manager
          </button>
          <button
            className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Calendar size={18} />
            Session Bookings
            {bookings.length > 0 && <span className="badge">{bookings.length}</span>}
          </button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Tab 1: Gallery */}
        {activeTab === 'gallery' && (
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Gallery Manager</h2>
              <p>Add and remove photos in the portfolio</p>
            </div>

            {/* Add Photo Form */}
            <form onSubmit={handleAddPhoto} className="dashboard-card form-grid">
              <h3 className="card-title">Add New Photo</h3>
              <div className="form-group">
                <label>Photo Title</label>
                <input
                  type="text"
                  placeholder="e.g. Golden Mist"
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newPhoto.category}
                  onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group full-width">
                <label>Image URL</label>
                <input
                  type="url"
                  placeholder="e.g. https://images.unsplash.com/photo-..."
                  value={newPhoto.url}
                  onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? <Loader2 className="spinner" size={16} /> : <Plus size={16} />} Add Photo
              </button>
            </form>

            {/* Photo List */}
            <div className="dashboard-card">
              <h3 className="card-title">Existing Photos ({photos.length})</h3>
              <div className="photos-table-wrapper">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Preview</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {photos.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="empty-table">
                          No photos in gallery. Add one above!
                        </td>
                      </tr>
                    ) : (
                      photos.map((photo) => (
                        <tr key={photo._id}>
                          <td>
                            <img src={photo.url} alt={photo.title} className="table-img-preview" />
                          </td>
                          <td><strong>{photo.title}</strong></td>
                          <td>
                            <span className="category-tag">{photo.category}</span>
                          </td>
                          <td>{photo.date || photo.createdAt?.split('T')[0]}</td>
                          <td>
                            <button
                              className="action-btn delete"
                              onClick={() => handleDeletePhoto(photo._id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: About Editor */}
        {activeTab === 'about' && (
          <section className="dashboard-section">
            <div className="section-header">
              <h2>About Details Editor</h2>
              <p>Edit stats, bio, specialisations and toolkit details</p>
            </div>

            <form onSubmit={handleUpdateAbout} className="about-editor-form">
              {/* General details */}
              <div className="dashboard-card info-card-grid">
                <h3 className="card-title full-width">Artist Profile</h3>
                <div className="form-group">
                  <label>Artist Name</label>
                  <input
                    type="text"
                    value={about.name}
                    onChange={(e) => setAbout({ ...about, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tagline / Occupation</label>
                  <input
                    type="text"
                    value={about.tagline}
                    onChange={(e) => setAbout({ ...about, tagline: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Profile/Hero Image URL</label>
                  <input
                    type="url"
                    value={about.heroImg}
                    onChange={(e) => setAbout({ ...about, heroImg: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Statistics */}
              <div className="dashboard-card stats-edit-grid">
                <h3 className="card-title full-width">Statistics Stats</h3>
                <div className="form-group">
                  <label>International Awards</label>
                  <input
                    type="text"
                    value={about.awards}
                    onChange={(e) => setAbout({ ...about, awards: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Years Experience</label>
                  <input
                    type="text"
                    value={about.experience}
                    onChange={(e) => setAbout({ ...about, experience: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Happy Clients</label>
                  <input
                    type="text"
                    value={about.clients}
                    onChange={(e) => setAbout({ ...about, clients: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Photos Delivered</label>
                  <input
                    type="text"
                    value={about.photosDelivered}
                    onChange={(e) => setAbout({ ...about, photosDelivered: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Biography Story */}
              <div className="dashboard-card">
                <h3 className="card-title">Story Paragraphs</h3>
                <p className="card-sub-info">Edit the biography details displayed on the About page</p>
                <div className="bio-inputs-wrapper">
                  {about.bioParagraphs.map((para, index) => (
                    <div className="form-group" key={index}>
                      <label>Paragraph {index + 1}</label>
                      <textarea
                        rows={3}
                        value={para}
                        onChange={(e) => handleBioChange(index, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills & Gear Lists */}
              <div className="dashboard-grid-2col">
                {/* Specialisations */}
                <div className="dashboard-card">
                  <h3 className="card-title">Specialisations</h3>
                  <div className="add-list-item-row">
                    <input
                      type="text"
                      placeholder="Add specialisation"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                    />
                    <button type="button" className="btn-secondary" onClick={handleAddSkill}>
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="list-chips">
                    {about.skills.map((skill) => (
                      <span key={skill} className="list-chip">
                        {skill}
                        <button type="button" onClick={() => handleRemoveSkill(skill)}>
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gear */}
                <div className="dashboard-card">
                  <h3 className="card-title">Toolkit Gear</h3>
                  <div className="add-list-item-row">
                    <input
                      type="text"
                      placeholder="Add gear item"
                      value={newGear}
                      onChange={(e) => setNewGear(e.target.value)}
                    />
                    <button type="button" className="btn-secondary" onClick={handleAddGear}>
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="list-chips">
                    {about.gear.map((gearItem) => (
                      <span key={gearItem} className="list-chip">
                        {gearItem}
                        <button type="button" onClick={() => handleRemoveGear(gearItem)}>
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-actions-sticky">
                <button type="submit" className="btn-primary save-about-btn" disabled={loading}>
                  {loading ? <Loader2 className="spinner" size={16} /> : <Save size={16} />} Save All Changes
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Tab 3: YouTube Vlogs */}
        {activeTab === 'vlogs' && (
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Vlogs Manager</h2>
              <p>Add and remove photography vlogs linked from YouTube</p>
            </div>

            {/* Add Vlog Form */}
            <form onSubmit={handleAddVlog} className="dashboard-card form-grid">
              <h3 className="card-title">Add YouTube Vlog</h3>
              <div className="form-group">
                <label>Vlog Title</label>
                <input
                  type="text"
                  placeholder="e.g. My Complete Camera Bag 2024"
                  value={newVlog.title}
                  onChange={(e) => setNewVlog({ ...newVlog, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>YouTube Embed/Video ID</label>
                <input
                  type="text"
                  placeholder="e.g. dQw4w9WgXcQ"
                  value={newVlog.embedId}
                  onChange={(e) => setNewVlog({ ...newVlog, embedId: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 18:42"
                  value={newVlog.duration}
                  onChange={(e) => setNewVlog({ ...newVlog, duration: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Views Count</label>
                <input
                  type="text"
                  placeholder="e.g. 124K"
                  value={newVlog.views}
                  onChange={(e) => setNewVlog({ ...newVlog, views: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Publish Month/Date</label>
                <input
                  type="text"
                  placeholder="e.g. Dec 2024"
                  value={newVlog.date}
                  onChange={(e) => setNewVlog({ ...newVlog, date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tags (Comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Gear, Tips, Travel"
                  value={newVlog.tags}
                  onChange={(e) => setNewVlog({ ...newVlog, tags: e.target.value })}
                />
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? <Loader2 className="spinner" size={16} /> : <Plus size={16} />} Add Vlog
              </button>
            </form>

            {/* Vlog List */}
            <div className="dashboard-card">
              <h3 className="card-title">Existing Videos ({vlogs.length})</h3>
              <div className="vlogs-table-wrapper">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>YouTube ID</th>
                      <th>Title</th>
                      <th>Duration</th>
                      <th>Views</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vlogs.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="empty-table">
                          No vlogs added. Add one above!
                        </td>
                      </tr>
                    ) : (
                      vlogs.map((vlog) => (
                        <tr key={vlog._id}>
                          <td>
                            <a
                              href={`https://youtube.com/watch?v=${vlog.embedId}`}
                              target="_blank"
                              rel="noreferrer"
                              className="yt-link"
                            >
                              <code>{vlog.embedId}</code> <ExternalLink size={12} />
                            </a>
                          </td>
                          <td><strong>{vlog.title}</strong></td>
                          <td>{vlog.duration}</td>
                          <td>{vlog.views}</td>
                          <td>{vlog.date}</td>
                          <td>
                            <button
                              className="action-btn delete"
                              onClick={() => handleDeleteVlog(vlog._id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Tab 4: Session Bookings */}
        {activeTab === 'bookings' && (
          <section className="dashboard-section">
            <div className="section-header bookings-header">
              <div>
                <h2>Session Bookings &amp; Inquiries</h2>
                <p>View booking requests and contact messages from the contact page</p>
              </div>
              <button
                className="btn-refresh"
                onClick={() => fetchBookings(true)}
                disabled={bookingsLoading}
                title="Refresh bookings"
              >
                <RefreshCw size={16} className={bookingsLoading ? 'spinning' : ''} />
                {bookingsLoading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>

            <div className="dashboard-card">
              <h3 className="card-title">
                Inbox Messages ({bookings.length})
                {bookingsLoading && <Loader2 className="spinner inline-spinner" size={16} />}
              </h3>
              <div className="bookings-table-wrapper">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Sender</th>
                      <th>Contact Info</th>
                      <th>Subject</th>
                      <th>Message Details</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="empty-table">
                          Your inbox is clean. No booking messages received yet.
                        </td>
                      </tr>
                    ) : (
                      bookings.map((booking) => (
                        <tr key={booking._id}>
                          <td>
                            <strong>{booking.name}</strong>
                          </td>
                          <td>
                            <a href={`mailto:${booking.email}`} className="email-link">
                              {booking.email}
                            </a>
                          </td>
                          <td>
                            <span className="subject-text">{booking.subject}</span>
                          </td>
                          <td className="msg-cell">
                            <div className="message-content-box">{booking.message}</div>
                          </td>
                          <td>
                            {booking.createdAt ? booking.createdAt.split('T')[0] : 'N/A'}
                          </td>
                          <td>
                            <button
                              className="action-btn delete"
                              onClick={() => handleDeleteBooking(booking._id)}
                              title="Dismiss Inquiry"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
