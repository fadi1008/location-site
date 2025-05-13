
import React, { useState, useMemo } from 'react';
import ApartmentCard, { ApartmentType } from './ApartmentCard';
import ApartmentFilters, { SortOption, LocationFilter } from './ApartmentFilters';

interface ApartmentGridProps {
  apartments: ApartmentType[];
}

const ApartmentGrid: React.FC<ApartmentGridProps> = ({ apartments }) => {
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [locationFilter, setLocationFilter] = useState<LocationFilter>('all');

  // Filter and sort apartments based on selected options
  const filteredAndSortedApartments = useMemo(() => {
    // First filter by location
    let filtered = [...apartments];
    
    if (locationFilter !== 'all') {
      // Convert locationFilter to a more readable format for comparison
      const locationMap: Record<LocationFilter, string> = {
        'all': '',
        'nabeul-centre': 'Nabeul Centre',
        'lido-darchaben': 'Lido Darchaben',
        'sidi-mahrsi': 'Sidi Mahrsi',
        'afh': 'AFH'
      };
      
      filtered = filtered.filter(apt => 
        apt.location.includes(locationMap[locationFilter])
      );
    }
    
    // Then sort based on selected sort option
    if (sortOption === 'price-asc') {
      return filtered.sort((a, b) => {
        // Extract numeric part of price (assuming format like "500 DT / nuit")
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceA - priceB;
      });
    } else if (sortOption === 'price-desc') {
      return filtered.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceB - priceA;
      });
    }
    
    return filtered;
  }, [apartments, sortOption, locationFilter]);

  return (
    <section id="appartements" className="py-16">
      <div className="container-custom">
        <h2 className="section-title mb-12 pb-2">Nos Appartements</h2>
        
        <ApartmentFilters 
          onSortChange={setSortOption} 
          onLocationFilterChange={setLocationFilter} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredAndSortedApartments.map((apartment) => (
            <div key={apartment.id} className="animate-slide-up">
              <ApartmentCard apartment={apartment} />
            </div>
          ))}
        </div>
        
        {filteredAndSortedApartments.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">Aucun appartement ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApartmentGrid;
