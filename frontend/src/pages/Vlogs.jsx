import { Globe2, Play, Clock, Eye } from 'lucide-react';
import './Vlogs.css';

const vlogs = [
  {
    id: 1,
    embedId: 'dQw4w9WgXcQ',
    title: 'A Week in the Hill Country — Sri Lanka Photography Vlog',
    duration: '18:42',
    views: '124K',
    date: 'Dec 2024',
    tags: ['Landscape', 'Travel'],
  },
  {
    id: 2,
    embedId: 'ysz5S6PUM-U',
    title: 'How I Shoot Portraits With Natural Light | Full BTS',
    duration: '22:15',
    views: '89K',
    date: 'Nov 2024',
    tags: ['Portraits', 'Tutorial'],
  },
  {
    id: 3,
    embedId: 'L_jWHffIx5E',
    title: 'Wedding Photography: From Ceremony to Reception — Complete BTS',
    duration: '35:08',
    views: '203K',
    date: 'Oct 2024',
    tags: ['Weddings', 'BTS'],
  },
  {
    id: 4,
    embedId: 'hHW1oY26kxQ',
    title: 'My Complete Camera Bag 2024 — What I Use & Why',
    duration: '14:30',
    views: '67K',
    date: 'Sep 2024',
    tags: ['Gear', 'Tips'],
  },
  {
    id: 5,
    embedId: 'YykjpeuMNEk',
    title: 'Street Photography in Colombo — Finding Light in the Chaos',
    duration: '19:55',
    views: '51K',
    date: 'Aug 2024',
    tags: ['Street', 'Travel'],
  },
  {
    id: 6,
    embedId: 'Zi_XLOBDo_Y',
    title: 'Editing My Best Wildlife Shots | Lightroom Full Workflow',
    duration: '28:12',
    views: '76K',
    date: 'Jul 2024',
    tags: ['Editing', 'Nature'],
  },
];

export default function Vlogs() {
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
        {/* Featured Vlog */}
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

        {/* Grid */}
        <div style={{ marginBottom: '2rem' }}>
          <p className="section-label">More Videos</p>
          <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Past Vlogs</h2>
        </div>
        <div className="vlogs-grid">
          {vlogs.slice(1).map(vlog => (
            <div key={vlog.id} className="vlog-card">
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
                  {vlog.tags.map(t => <span key={t} className="vlog-tag">{t}</span>)}
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
      </div>
    </div>
  );
}
