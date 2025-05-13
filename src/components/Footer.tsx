
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-nabeul-black text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/lovable-uploads/82709799-14e8-4c4c-8dc0-890697718779.png" 
                alt="Location à Nabeul Logo" 
                className="h-20 w-auto" // Increased height from h-16 to h-20
              />
              <span className="font-serif font-medium text-lg md:text-xl text-white">
                Locations Nabeul
              </span>
            </div>
            <p className="mb-4">
              Découvrez nos appartements et villas de luxe à Nabeul et Hammamet pour des vacances inoubliables en Tunisie.
            </p>
          </div>
          
          <div>
            <h3 className="font-serif text-xl mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-nabeul-yellow transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="hover:text-nabeul-yellow transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-nabeul-yellow transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/admin-secret-url" className="hover:text-nabeul-yellow transition-colors">
                  Administration
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-xl mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://wa.me/+21628035247" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-nabeul-yellow transition-colors"
                >
                  WhatsApp: +216 28 035 247
                </a>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/share/15kTvS2sWH/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-nabeul-yellow transition-colors"
                >
                  Facebook: Location à Nabeul et Hammamet
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Location à Nabeul. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
