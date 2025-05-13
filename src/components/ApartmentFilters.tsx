
import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export type SortOption = 'default' | 'price-asc' | 'price-desc';
export type LocationFilter = 'all' | 'nabeul-centre' | 'lido-darchaben' | 'sidi-mahrsi' | 'afh';

interface ApartmentFiltersProps {
  onSortChange: (sort: SortOption) => void;
  onLocationFilterChange: (location: LocationFilter) => void;
}

const ApartmentFilters: React.FC<ApartmentFiltersProps> = ({ onSortChange, onLocationFilterChange }) => {
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [locationFilter, setLocationFilter] = useState<LocationFilter>('all');

  const handleSortChange = (value: string) => {
    const option = value as SortOption;
    setSortOption(option);
    onSortChange(option);
  };

  const handleLocationChange = (value: string) => {
    const location = value as LocationFilter;
    setLocationFilter(location);
    onLocationFilterChange(location);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center text-nabeul-black">
          <Filter size={20} className="mr-2" />
          <span className="font-medium">Filtrer & Trier</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="default">Par défaut</SelectItem>
                <SelectItem value="price-asc">Prix: croissant</SelectItem>
                <SelectItem value="price-desc">Prix: décroissant</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Select value={locationFilter} onValueChange={handleLocationChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Emplacement" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Tous les emplacements</SelectItem>
                <SelectItem value="nabeul-centre">Nabeul Centre</SelectItem>
                <SelectItem value="lido-darchaben">Lido Darchaben</SelectItem>
                <SelectItem value="sidi-mahrsi">Sidi Mahrsi</SelectItem>
                <SelectItem value="afh">AFH</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          variant="outline"
          className="md:w-auto w-full"
          onClick={() => {
            setSortOption('default');
            setLocationFilter('all');
            onSortChange('default');
            onLocationFilterChange('all');
          }}
        >
          Réinitialiser
        </Button>
      </div>
    </div>
  );
};

export default ApartmentFilters;
