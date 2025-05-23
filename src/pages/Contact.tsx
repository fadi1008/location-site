
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-10 pb-2 section-title">
            Contactez-nous
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <h2 className="text-2xl font-serif font-medium mb-4">
                  Nous sommes à votre écoute
                </h2>
                <p className="text-gray-700 mb-6">
                  Vous avez des questions ou vous souhaitez réserver une de nos propriétés ? N'hésitez pas à nous contacter directement par WhatsApp pour une réponse rapide.
                </p>
                <a
                  href="https://wa.me/+21628035247"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
                    />
                  </svg>
                  Contacter via WhatsApp
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-serif font-medium mb-4">
                  Suivez-nous
                </h2>
                <p className="text-gray-700 mb-6">
                  Rejoignez notre communauté sur Facebook pour découvrir nos dernières offres et les actualités de Nabeul et Hammamet.
                </p>
                <a
                  href="https://www.facebook.com/share/15kTvS2sWH/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                    />
                  </svg>
                  Suivre sur Facebook
                </a>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-md h-96 flex items-center justify-center bg-nabeul-sand">
              <a
                href="https://www.google.com/maps?q=Nabeul,+Tunisia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xl px-8 py-4 rounded-full shadow-lg hover:bg-nabeul-yellow hover:text-black transition-colors font-serif font-semibold"
                style={{ textDecoration: "none" }}
              >
                 Voir la carte de Nabeul sur Google Maps
              </a>
            </div>
          </div>
          
          <div className="mt-12 bg-nabeul-sand p-8 rounded-xl">
            <h2 className="text-2xl font-serif font-medium mb-6 text-center">
              Notre disponibilité
            </h2>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-center items-center gap-3 mb-4 text-nabeul-yellow">
                <Clock size={36} />
                <span className="text-2xl font-serif font-medium">Disponible 24h/24</span>
              </div>
              <p className="text-center text-gray-700">
                Nous sommes à votre disposition à tout moment pour répondre à vos questions et vous aider dans votre recherche de logement.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
