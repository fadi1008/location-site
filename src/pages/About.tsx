
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-10 pb-2 section-title">
            À propos de nous
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
            <div className="rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Nabeul beach" 
                className="w-full h-auto"
              />
            </div>
            
            <div>
              <h2 className="text-2xl font-serif font-medium mb-4">Notre histoire</h2>
              <p className="text-gray-700 mb-4">
                Fondée par des passionnés de la région, Location à Nabeul est née d'une volonté de faire découvrir les merveilles de Nabeul et ses environs à travers des hébergements de qualité.
              </p>
              <p className="text-gray-700">
                Depuis notre création, nous nous efforçons de sélectionner les plus belles propriétés et de les mettre à la disposition de nos clients pour leur offrir une expérience inoubliable en Tunisie.
              </p>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-medium mb-6">Notre mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 flex items-center justify-center bg-nabeul-yellow rounded-full text-white mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Qualité</h3>
                <p className="text-gray-600">
                  Nous sélectionnons rigoureusement nos propriétés pour vous garantir un séjour de qualité dans des hébergements confortables et bien entretenus.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 flex items-center justify-center bg-nabeul-blue rounded-full text-white mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Service</h3>
                <p className="text-gray-600">
                  Notre équipe est disponible pour vous accompagner tout au long de votre séjour et vous aider à profiter pleinement de votre expérience.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 flex items-center justify-center bg-nabeul-black rounded-full text-white mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Authenticité</h3>
                <p className="text-gray-600">
                  Nous vous proposons une expérience authentique pour découvrir la culture tunisienne et les traditions locales.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-serif font-medium mb-6">Pourquoi nous choisir ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <svg className="w-6 h-6 text-nabeul-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Expertise locale</h3>
                  <p className="text-gray-600">
                    Nous connaissons parfaitement la région et pouvons vous conseiller sur les meilleures activités et lieux à découvrir.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <svg className="w-6 h-6 text-nabeul-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Sélection variée</h3>
                  <p className="text-gray-600">
                    Une large gamme d'hébergements pour tous les budgets et tous les goûts, des studios cosy aux villas luxueuses.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <svg className="w-6 h-6 text-nabeul-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Service personnalisé</h3>
                  <p className="text-gray-600">
                    Nous sommes à votre écoute pour répondre à vos besoins spécifiques et rendre votre séjour inoubliable.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <svg className="w-6 h-6 text-nabeul-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Transparence</h3>
                  <p className="text-gray-600">
                    Pas de frais cachés, des descriptions précises et des photos authentiques de nos propriétés.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
