import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import GalleryCategory from './pages/GalleryCategory';
import About from './pages/About';
import Contact from './pages/Contact';
import Vlogs from './pages/Vlogs';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

const ADMIN_PATHS = ['/admin/login', '/admin/dashboard'];

function Layout() {
  const location = useLocation();
  const isAdmin = ADMIN_PATHS.some(path => location.pathname.startsWith(path));

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#f0ece4',
            border: '1px solid rgba(201,169,110,0.3)',
          },
          success: { iconTheme: { primary: '#c9a96e', secondary: '#0a0a0a' } },
        }}
      />
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:category" element={<GalleryCategory />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/vlogs" element={<Vlogs />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
