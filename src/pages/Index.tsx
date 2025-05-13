
import React from 'react';
import Navigation from '../components/Navigation';
import HeroBanner from '../components/HeroBanner';
import ApartmentGrid from '../components/ApartmentGrid';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ApartmentType } from '../components/ApartmentCard';
// REMOVE this line:
// import apartments from '../data/apartments';

const Index = () => {
  const [apartments, setApartments] = useState<ApartmentType[]>([]);
  useEffect(() => {
    const fetchApartments = async () => {
      const { data, error } = await supabase.from('apartments').select('*');
      if (!error && Array.isArray(data)) setApartments(data);
      else setApartments([]);
    };
    fetchApartments();
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <HeroBanner />
      <ApartmentGrid apartments={apartments} />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
