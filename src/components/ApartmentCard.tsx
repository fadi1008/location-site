
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export interface ApartmentType {
  id: number;
  title: string;
  location: string;
  price: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  features: string[];
  description?: string;
}

interface ApartmentCardProps {
  apartment: ApartmentType;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment }) => {
  return (
    <Link to={`/apartment/${apartment.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={apartment.images[0]} 
            alt={apartment.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 bg-nabeul-yellow text-black py-1 px-3 font-semibold">
            {apartment.price} DT/nuit
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-serif font-medium mb-2 group-hover:text-nabeul-yellow transition-colors">
            {apartment.title}
          </h3>
          
          <div className="flex items-center text-gray-500 mb-3">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{apartment.location}</span>
          </div>
          
          <div className="flex justify-center text-sm border-t pt-3">
            <div className="flex flex-col items-center">
              <span className="font-medium">{apartment.bedrooms}</span>
              <span className="text-gray-500">Chambres</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ApartmentCard;
