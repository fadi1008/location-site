
import React from 'react';

const HeroBanner = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Image background instead of video */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1920&auto=format&fit=crop"
          alt="Villa de luxe avec piscine"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
        <div className="container mx-auto px-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
            Locations de Prestige à Nabeul
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md">
            Découvrez nos appartements et villas de luxe pour des vacances inoubliables en Tunisie
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#appartements" 
              className="btn-primary text-center"
            >
              Voir nos biens
            </a>
            <a 
              href="https://wa.me/+21628035247" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary text-center"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
