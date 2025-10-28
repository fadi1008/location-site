
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Show back to top button when scrolled down 300px
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/uploads/82709799-14e8-4c4c-8dc0-890697718779.png"
              alt="Location à Nabeul Logo"
              className="h-20 w-auto" // Increased height from h-16 to h-20
            />
            <span className="font-serif font-medium text-lg md:text-xl text-nabeul-black">
              Locations Nabeul
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="font-medium hover:text-nabeul-yellow transition-colors">
              Accueil
            </Link>
            <Link to="/a-propos" className="font-medium hover:text-nabeul-yellow transition-colors">
              À propos
            </Link>
            <Link to="/contact" className="font-medium hover:text-nabeul-yellow transition-colors">
              Contact
            </Link>
            <a 
              href="https://wa.me/+21628035247" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden bg-white absolute w-full transition-all duration-300 shadow-md ${
            menuOpen ? 'max-h-64 py-4' : 'max-h-0 overflow-hidden'
          }`}
        >
          <div className="container-custom flex flex-col gap-4">
            <Link 
              to="/" 
              className="font-medium py-2 hover:text-nabeul-yellow transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/a-propos" 
              className="font-medium py-2 hover:text-nabeul-yellow transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              À propos
            </Link>
            <Link 
              to="/contact" 
              className="font-medium py-2 hover:text-nabeul-yellow transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            <a 
              href="https://wa.me/+21628035247" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary text-center"
              onClick={() => setMenuOpen(false)}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </nav>

      {/* Back to top button */}
      {showBackToTop && (
        <Button
          className="fixed bottom-6 right-6 p-2 rounded-full bg-nabeul-yellow text-black z-40 shadow-lg hover:bg-nabeul-yellow/90"
          onClick={scrollToTop}
          aria-label="Retour en haut"
        >
          <ArrowUp size={24} />
        </Button>
      )}
    </>
  );
};

export default Navigation;
