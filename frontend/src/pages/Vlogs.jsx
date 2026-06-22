import { useEffect, useState } from 'react';
import axios from 'axios';
import { Globe2, Clock, Eye, Loader2 } from 'lucide-react';
import './Vlogs.css';

export default function Vlogs() {
  const [vlogs, setVlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vlogs');
        if (response.data.success) {
          setVlogs(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching vlogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVlogs();
  }, []);

  if (loading) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent)' }} />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-hero">
        <p className="section-label">YouTube Channel</p>
        <h1 className="section-title">Photography Vlogs</h1>
        <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
          Behind-the-scenes stories, tutorials, gear reviews and travel vlogs.
        </p>
        <a
          href="https://youtube.com/@NidulaD"
          target="_blank"
          rel="noreferrer"
          className="btn-primary yt-sub-btn"
        >
          <Globe2 size={18} /> Subscribe on YouTube
        </a>
      </div>

      <div className="vlogs-page">
        {vlogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-secondary)' }}>
            <p>No vlogs added yet. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* Featured Vlog — Latest */}
            <div className="featured-vlog">
              <h2 className="featured-label">🎬 Latest Vlog</h2>
              <div className="featured-embed">
                <iframe
                  src={`https://www.youtube.com/embed/${vlogs[0].embedId}`}
                  title={vlogs[0].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="featured-meta">
                <h3>{vlogs[0].title}</h3>
                <div className="vlog-stats">
                  <span><Clock size={14} /> {vlogs[0].duration}</span>
                  <span><Eye size={14} /> {vlogs[0].views} views</span>
                  <span>{vlogs[0].date}</span>
                </div>
              </div>
            </div>

            {/* More Videos Grid */}
            {vlogs.length > 1 && (
              <>
                <div style={{ marginBottom: '2rem' }}>
                  <p className="section-label">More Videos</p>
                  <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Past Vlogs</h2>
                </div>
                <div className="vlogs-grid">
                  {vlogs.slice(1).map(vlog => (
                    <div key={vlog._id} className="vlog-card">
                      <div className="vlog-embed">
                        <iframe
                          src={`https://www.youtube.com/embed/${vlog.embedId}`}
                          title={vlog.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div className="vlog-info">
                        <div className="vlog-tags">
                          {vlog.tags && vlog.tags.map(t => (
                            <span key={t} className="vlog-tag">{t}</span>
                          ))}
                        </div>
                        <h3 className="vlog-title">{vlog.title}</h3>
                        <div className="vlog-stats">
                          <span><Clock size={12} /> {vlog.duration}</span>
                          <span><Eye size={12} /> {vlog.views}</span>
                          <span>{vlog.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
