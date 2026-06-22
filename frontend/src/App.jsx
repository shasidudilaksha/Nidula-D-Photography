import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import GalleryCategory from './pages/GalleryCategory';
import About from './pages/About';
import Contact from './pages/Contact';
import Vlogs from './pages/Vlogs';
import './index.css';

function App() {
  return (
    <BrowserRouter>
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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:category" element={<GalleryCategory />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/vlogs" element={<Vlogs />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
