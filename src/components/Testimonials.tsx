
import React from 'react';

interface Testimonial {
  id: number;
  name: string;
  text: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Imed',
    text: 'Barcha zin el dar, kol chay 3ajebni w el makan hatha top! Merci beaucoup.',
    location: 'Tunis, Tunisie'
  },
  {
    id: 2,
    name: 'Sonia',
    text: 'Séjour parfait, proche de la plage et tout était propre. On reviendra l\'année prochaine inchallah.',
    location: 'Sousse, Tunisie'
  },
  {
    id: 3,
    name: 'Karim',
    text: 'El wifi yemchi behi w el piscine toujours propre. Les enfants ont adoré!',
    location: 'Sfax, Tunisie'
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-nabeul-sand">
      <div className="container-custom">
        <h2 className="section-title mb-12 pb-2">Ce que disent nos clients</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <svg className="w-10 h-10 text-nabeul-yellow mb-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path>
              </svg>
              <p className="text-gray-700 mb-4">{testimonial.text}</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-nabeul-blue text-white flex items-center justify-center font-medium">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
