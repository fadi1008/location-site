
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import apartments from '../data/apartments';
import { useEffect,} from 'react';
import { supabase } from "@/integrations/services/supabase/client";
import { ApartmentType } from '../components/ApartmentCard';

const ApartmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);
  const [apartment, setApartment] = useState<ApartmentType | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchApartment = async () => {
      const { data, error } = await (supabase as unknown as {
        from: (table: string) => {
          select: (query: string) => {
            eq: (column: string, value: string | number) => {
              single: () => Promise<{
                data: ApartmentType | null;
                error: Error | null;
              }>;
            };
          };
        };
      }).from('apartments').select('*').eq('id', id).single();
      if (!error && data) setApartment(data);
      setLoading(false);
    };
    fetchApartment();
  }, [id]);
  if (loading) return <div>Loading...</div>;
  if (!apartment) return <div>Not found</div>;
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <Link to="/" className="flex items-center text-nabeul-blue hover:text-nabeul-yellow transition-colors mb-6">
            <ArrowLeft size={20} className="mr-2" />
            Retour à la liste
          </Link>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-4">
            {apartment.title}
          </h1>
          
          <div className="flex items-center text-gray-600 mb-8">
            <MapPin size={20} className="mr-2" />
            <span>{apartment.location}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2">
              <div className="bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={apartment.images[activeImage]}
                  alt={`${apartment.title} - Image ${activeImage + 1}`}
                  className="w-full h-[30rem] object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-3 mt-3">
                {apartment.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                      activeImage === index ? 'border-nabeul-yellow' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${apartment.title} - Thumbnail ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-serif mb-2">Prix</h2>
                <p className="text-3xl font-medium text-nabeul-yellow">{apartment.price} DT/nuit</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-2xl font-serif mb-4">Caractéristiques</h2>
                <div className="flex justify-center mb-4">
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500">Chambres</span>
                    <span className="font-medium">{apartment.bedrooms}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-2xl font-serif mb-4">Équipements</h2>
                <ul className="grid grid-cols-1 gap-2">
                  {apartment.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-4 h-4 text-nabeul-yellow mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <a
                href="https://wa.me/+21628035247?text=Je suis intéressé par votre propriété"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-primary text-center block"
              >
                Contacter via WhatsApp
              </a>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-xl p-6 mb-10">
            <h2 className="text-2xl font-serif mb-4">Description</h2>
            <div className="text-gray-700 whitespace-pre-line">
              {apartment.description && apartment.description.trim() !== "" ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: apartment.description.replace(
                      /(https?:\/\/[^\s`]+)/g,
                      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-nabeul-blue underline break-all">$1</a>'
                    )
                  }}
                />
              ) : (
                <>
                  Découvrez cette magnifique propriété située dans l'une des plus belles régions de Nabeul. Cet espace offre un cadre idyllique pour vos vacances en Tunisie, alliant confort moderne et charme local.
                  <br /><br />
                  Profitez de tout ce que la région a à offrir : plages de sable fin, restaurants locaux, marchés traditionnels et attractions touristiques, tous facilement accessibles depuis cette location de charme.
                  <br /><br />
                  Ne manquez pas cette opportunité de vivre une expérience authentique dans un cadre exceptionnel. Contactez-nous dès maintenant pour plus d'informations ou pour réserver.
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ApartmentDetail;
// Add type annotation for supabase client
