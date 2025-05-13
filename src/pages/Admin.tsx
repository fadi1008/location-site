import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// REMOVE this line:
// import apartments from '../data/apartments';
import { ApartmentType } from '../components/ApartmentCard';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from 'lucide-react';

// Predefined options for the admin interface
const locationOptions = [
  { value: 'nabeul-centre', label: 'Nabeul Centre' },
  { value: 'lido-darchaben', label: 'Lido Darchaben' },
  { value: 'sidi-mahrsi', label: 'Sidi Mahrsi' },
  { value: 'afh', label: 'AFH' },
  { value: 'hammamet', label: 'Hammamet' }
];

const apartmentTypeOptions = [
  { value: 'appartement', label: 'Appartement' },
  { value: 'villa', label: 'Villa' },
  { value: 'studio', label: 'Studio' },
  { value: 'maison', label: 'Maison' }
];

const commonFeatures = [
  'WiFi gratuit',
  'Climatisation',
  'Cuisine équipée',
  'Télévision',
  'Parking',
  'Piscine',
  'Vue sur mer',
  'Balcon',
  'Terrasse',
  'Jardin'
];

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apartmentsList, setApartmentsList] = useState<ApartmentType[]>([]);

    // Dialog states
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentApartment, setCurrentApartment] = useState<ApartmentType | null>(null);

  // Add this useEffect to fetch apartments when component mounts
  useEffect(() => {
    const fetchApartments = async () => {
      const { data, error } = await supabase
        .from('apartments')
        .select('*');
      
      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les appartements.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }
      
      if (data) {
        setApartmentsList(data);
      }
    };

    fetchApartments();
  }, [toast]);
  const [newApartment, setNewApartment] = useState<Partial<ApartmentType>>({
    title: '',
    location: '',
    price: '',
    images: [],
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    features: [],
    description: ''  // New field for description
  });

  const [newFeature, setNewFeature] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [apartmentType, setApartmentType] = useState('appartement');
  const [selectedLocation, setSelectedLocation] = useState('');

  // New state for handling file uploads
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if we're on admin-secret-url path
    if (window.location.pathname === '/admin-secret-url') {
      // Auto-login for secret URL
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple admin login - in a real application, use proper authentication
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'interface d'administration.",
        duration: 3000,
      });
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Nom d'utilisateur ou mot de passe incorrect.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  // Updated function to handle real file uploads
  const handleFileUpload = async () => {
    // Create file input element to open file dialog
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Function to handle file selection
  const handleFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      const uploadedUrls = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('apartment-images')
          .upload(filePath, file);
          
        if (error) {
          console.error('Erreur lors du téléchargement:', error);
          toast({
            title: "Erreur lors du téléchargement",
            description: error.message,
            variant: "destructive",
            duration: 3000,
          });
          continue;
        }
        
        // Get public URL for the uploaded file
        const { data: publicUrlData } = supabase.storage
          .from('apartment-images')
          .getPublicUrl(filePath);
          
        if (publicUrlData.publicUrl) {
          uploadedUrls.push(publicUrlData.publicUrl);
        }
      }
      
      if (uploadedUrls.length > 0) {
        setNewApartment(prev => ({
          ...prev,
          images: [...(prev.images || []), ...uploadedUrls]
        }));
        
        toast({
          title: "Téléchargement réussi",
          description: `${uploadedUrls.length} image(s) téléchargée(s) avec succès`,
          duration: 3000,
        });
      }
    } catch (err) {
      console.error('Erreur inattendue:', err);
      toast({
        title: "Erreur inattendue",
        description: "Une erreur s'est produite lors du téléchargement des images",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  // Function to add a new apartment
  const handleAddApartment = async () => {
    if (!newApartment.title || !newApartment.location) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir au moins le titre et l'emplacement.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const { data, error } = await supabase
      .from('apartments')
      .insert([newApartment])
      .select();
    if (!error && data) {
      setApartmentsList(prev => [...prev, ...data]);
      toast({ title: "Appartement ajouté", description: "L'appartement a été ajouté avec succès.", duration: 3000 });
      setIsAddDialogOpen(false);
      resetForm();
    } else {
      toast({ title: "Erreur", description: error?.message, variant: "destructive", duration: 3000 });
    }
  };

  // Function to edit an apartment
  const openEditDialog = (apartment: ApartmentType) => {
    setCurrentApartment(apartment);
    setNewApartment({
      ...apartment
    });
    setApartmentType(apartment.title.toLowerCase().includes('villa') ? 'villa' : 'appartement');
    setSelectedLocation(getLocationValue(apartment.location));
    setIsEditDialogOpen(true);
  };

  const handleEditApartment = async () => {
    if (!currentApartment) return;

    const { data, error } = await supabase.from('apartments').update({ ...newApartment }).eq('id', currentApartment.id).select();
    if (!error && data) {
      setApartmentsList(prev => prev.map(apt => apt.id === currentApartment.id ? data[0] : apt));
      toast({ title: "Appartement modifié", description: "Les modifications ont été enregistrées avec succès.", duration: 3000 });
      setIsEditDialogOpen(false);
      setCurrentApartment(null);
      resetForm();
    } else {
      toast({ title: "Erreur", description: error?.message, variant: "destructive", duration: 3000 });
    }
  };

  // Function to delete an apartment
  const openDeleteDialog = (apartment: ApartmentType) => {
    setCurrentApartment(apartment);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteApartment = async () => {
    if (!currentApartment) return;

    const { error } = await supabase.from('apartments').delete().eq('id', currentApartment.id);
    if (!error) {
      setApartmentsList(prev => prev.filter(apt => apt.id !== currentApartment.id));
      toast({ title: "Appartement supprimé", description: "L'appartement a été supprimé avec succès.", duration: 3000 });
      setIsDeleteDialogOpen(false);
      setCurrentApartment(null);
    } else {
      toast({ title: "Erreur", description: error?.message, variant: "destructive", duration: 3000 });
    }
  };

  // Helper function to get location value from apartment location string
  const getLocationValue = (locationString: string) => {
    for (const option of locationOptions) {
      if (locationString.toLowerCase().includes(option.label.toLowerCase())) {
        return option.value;
      }
    }
    return '';
  };

  // Helper functions for form fields
  const handleAddFeature = () => {
    if (newFeature.trim() === '') return;
    
    setNewApartment(prev => ({
      ...prev,
      features: [...(prev.features || []), newFeature.trim()]
    }));
    
    setNewFeature('');
  };

  const handleRemoveFeature = (index: number) => {
    setNewApartment(prev => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== index)
    }));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim() === '') return;
    
    setNewApartment(prev => ({
      ...prev,
      images: [...(prev.images || []), newImageUrl.trim()]
    }));
    
    setNewImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    setNewApartment(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
  };

  const handleQuickAddFeature = (feature: string) => {
    if ((newApartment.features || []).includes(feature)) {
      // Remove feature if already added
      setNewApartment(prev => ({
        ...prev,
        features: (prev.features || []).filter(f => f !== feature)
      }));
    } else {
      // Add feature if not already added
      setNewApartment(prev => ({
        ...prev,
        features: [...(prev.features || []), feature]
      }));
    }
  };

  const resetForm = () => {
    setNewApartment({
      title: '',
      location: '',
      price: '',
      images: [],
      bedrooms: 1,
      bathrooms: 1,
      area: 0,
      features: [],
      description: ''
    });
    setNewFeature('');
    setNewImageUrl('');
    setApartmentType('appartement');
    setSelectedLocation('');
  };

  // Update apartment title when type changes
  useEffect(() => {
    if (apartmentType && !isEditDialogOpen) {
      setNewApartment(prev => ({
        ...prev,
        title: `${apartmentType.charAt(0).toUpperCase() + apartmentType.slice(1)}${prev.title ? prev.title.replace(/^(Appartement|Villa|Studio|Maison)\s*/i, '') : ''}`
      }));
    }
  }, [apartmentType, isEditDialogOpen, setNewApartment]);
  
  // Update apartment location when location changes
  useEffect(() => {
    if (selectedLocation) {
      const locationLabel = locationOptions.find(opt => opt.value === selectedLocation)?.label || '';
      setNewApartment(prev => ({
        ...prev,
        location: locationLabel
      }));
    }
  }, [selectedLocation, locationOptions, setNewApartment]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-10 pb-2 section-title">
            Administration
          </h1>
          
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-serif font-medium mb-6">Connexion</h2>
              
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700 mb-2">
                    Nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nabeul-yellow"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nabeul-yellow"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-nabeul-yellow text-black hover:bg-nabeul-yellow/90"
                >
                  Se connecter
                </Button>
              </form>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>Utilisez "admin" comme nom d'utilisateur et mot de passe pour cette démo</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <h2 className="text-2xl font-serif font-medium mb-4">Gérer les appartements</h2>
                <p className="text-gray-700 mb-6">
                  Bienvenue dans votre interface d'administration. Ici, vous pouvez gérer vos annonces d'appartements.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <p className="font-medium">Comment accéder à cette page en toute sécurité:</p>
                  <p className="mt-2">Cette page d'administration est accessible uniquement via l'URL directe: <span className="font-bold">/admin-secret-url</span></p>
                  <p className="mt-2">Pour une sécurité supplémentaire, utilisez le formulaire de connexion standard avec nom d'utilisateur et mot de passe.</p>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-medium">
                    {apartmentsList.length} appartement(s) en ligne
                  </span>
                  <Button 
                    className="bg-nabeul-yellow text-black hover:bg-nabeul-yellow/90"
                    onClick={() => setIsAddDialogOpen(true)}
                  >
                    Ajouter un appartement
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left">ID</th>
                        <th className="border px-4 py-2 text-left">Titre</th>
                        <th className="border px-4 py-2 text-left">Emplacement</th>
                        <th className="border px-4 py-2 text-left">Prix</th>
                        <th className="border px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apartmentsList.map((apartment) => (
                        <tr key={apartment.id} className="hover:bg-gray-50">
                          <td className="border px-4 py-2">{apartment.id}</td>
                          <td className="border px-4 py-2">{apartment.title}</td>
                          <td className="border px-4 py-2">{apartment.location}</td>
                          <td className="border px-4 py-2">{apartment.price}</td>
                          <td className="border px-4 py-2">
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline"
                                size="sm"
                                className="text-nabeul-blue border-nabeul-blue hover:bg-nabeul-blue/10"
                                onClick={() => openEditDialog(apartment)}
                              >
                                Modifier
                              </Button>
                              <Button 
                                variant="outline"
                                size="sm"
                                className="text-red-500 border-red-500 hover:bg-red-500/10"
                                onClick={() => openDeleteDialog(apartment)}
                              >
                                Supprimer
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  variant="outline"
                  className="text-nabeul-black border-nabeul-black hover:bg-nabeul-black/10"
                  onClick={() => setIsLoggedIn(false)}
                >
                  Se déconnecter
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />

      {/* Add Apartment Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ajouter un nouvel appartement</DialogTitle>
            <DialogDescription>
              Remplissez les informations pour ajouter un nouvel appartement
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Type d'appartement */}
            <div className="grid grid-cols-1 gap-2">
              <label className="font-medium">Type de bien*</label>
              <Select value={apartmentType} onValueChange={setApartmentType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir le type de bien" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {apartmentTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label className="font-medium">Titre de l'annonce*</label>
              <Input
                placeholder="Ex: Villa avec piscine proche de la plage"
                value={newApartment.title}
                onChange={(e) => setNewApartment({...newApartment, title: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label className="font-medium">Emplacement*</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir l'emplacement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {locationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label className="font-medium">Prix*</label>
              <Input
                placeholder="Ex: 500 DT / nuit"
                value={newApartment.price}
                onChange={(e) => setNewApartment({...newApartment, price: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label className="font-medium">Nombre de chambres</label>
              <Input
                type="number"
                min="1"
                value={newApartment.bedrooms}
                onChange={(e) => setNewApartment({...newApartment, bedrooms: parseInt(e.target.value)})}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label className="font-medium">Description</label>
              <Textarea
                placeholder="Description détaillée du bien"
                value={newApartment.description || ''}
                onChange={(e) => setNewApartment({...newApartment, description: e.target.value})}
                rows={5}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label className="font-medium">Images</label>
              <div className="grid grid-cols-1 gap-4">
                <Button 
                  type="button" 
                  onClick={handleFileUpload} 
                  className="bg-nabeul-blue text-white hover:bg-nabeul-blue/90"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Téléchargement en cours...
                    </>
                  ) : (
                    'Ajouter des photos'
                  )}
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelected}
                  className="hidden"
                  multiple
                  accept="image/*"
                />
                
                <div className="flex space-x-2">
                  <Input
                    placeholder="URL de l'image"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                  />
                  <Button 
                    type="button"
                    onClick={handleAddImage}
                    className="bg-nabeul-yellow text-black hover:bg-nabeul-yellow/90"
                  >
                    Ajouter
                  </Button>
                </div>
              </div>
              
              {newApartment.images && newApartment.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {newApartment.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img src={image} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label className="font-medium">Équipements</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {commonFeatures.map(feature => (
                  <Button
                    key={feature}
                    type="button"
                    size="sm"
                    variant={newApartment.features?.includes(feature) ? "default" : "outline"}
                    onClick={() => handleQuickAddFeature(feature)}
                    className={newApartment.features?.includes(feature) 
                      ? "bg-nabeul-blue text-white" 
                      : "text-nabeul-blue"}
                  >
                    {feature}
                  </Button>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Input
                  placeholder="Autre équipement"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                />
                <Button 
                  type="button"
                  onClick={handleAddFeature}
                  className="bg-nabeul-yellow text-black hover:bg-nabeul-yellow/90"
                >
                  Ajouter
                </Button>
              </div>
              
              {newApartment.features && newApartment.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {newApartment.features.map((feature, index) => (
                    <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                      <span>{feature}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                resetForm();
                setIsAddDialogOpen(false);
              }}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleAddApartment}
              className="bg-nabeul-yellow text-black hover:bg-nabeul-yellow/90"
            >
              Ajouter l'appartement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Apartment Dialog - Similar to Add Dialog with prefilled values */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier un appartement</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'appartement
            </DialogDescription>
          </DialogHeader>
          
          {/* Similar form fields as Add Dialog */}
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <label className="font-medium">Type de bien*</label>
              <Select value={apartmentType} onValueChange={setApartmentType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir le type de bien" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {apartmentTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label className="font-medium">Titre de l'annonce*</label>
              <Input
                placeholder="Ex: Villa avec piscine proche de la plage"
                value={newApartment.title}
                onChange={(e) => setNewApartment({...newApartment, title: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label className="font-medium">Emplacement*</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir l'emplacement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {locationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label className="font-medium">Prix*</label>
              <Input
                placeholder="Ex: 500 DT / nuit"
                value={newApartment.price}
                onChange={(e) => setNewApartment({...newApartment, price: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label className="font-medium">Nombre de chambres</label>
              <Input
                type="number"
                min="1"
                value={newApartment.bedrooms}
                onChange={(e) => setNewApartment({...newApartment, bedrooms: parseInt(e.target.value)})}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label className="font-medium">Description</label>
              <Textarea
                placeholder="Description détaillée du bien"
                value={newApartment.description || ''}
                onChange={(e) => setNewApartment({...newApartment, description: e.target.value})}
                rows={5}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label className="font-medium">Images</label>
              <div className="grid grid-cols-1 gap-4">
                <Button 
                  type="button" 
                  onClick={handleFileUpload} 
                  className="bg-nabeul-blue text-white hover:bg-nabeul-blue/90"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Téléchargement en cours...
                    </>
                  ) : (
                    'Ajouter des photos'
                  )}
                </Button>
                
                <div className="flex space-x-2">
                  <Input
                    placeholder="URL de l'image"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                  />
                  <Button 
                    type="button"
                    onClick={handleAddImage}
                    className="bg-nabeul-yellow text-black hover:bg-nabeul-yellow/90"
                  >
                    Ajouter
                  </Button>
                </div>
              </div>
              
              {newApartment.images && newApartment.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {newApartment.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img src={image} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label className="font-medium">Équipements</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {commonFeatures.map(feature => (
                  <Button
                    key={feature}
                    type="button"
                    size="sm"
                    variant={newApartment.features?.includes(feature) ? "default" : "outline"}
                    onClick={() => handleQuickAddFeature(feature)}
                    className={newApartment.features?.includes(feature) 
                      ? "bg-nabeul-blue text-white" 
                      : "text-nabeul-blue"}
                  >
                    {feature}
                  </Button>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Input
                  placeholder="Autre équipement"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                />
                <Button 
                  type="button"
                  onClick={handleAddFeature}
                  className="bg-nabeul-yellow text-black hover:bg-nabeul-yellow/90"
                >
                  Ajouter
                </Button>
              </div>
              
              {newApartment.features && newApartment.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {newApartment.features.map((feature, index) => (
                    <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                      <span>{feature}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setCurrentApartment(null);
                resetForm();
              }}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleEditApartment}
              className="bg-nabeul-yellow text-black hover:bg-nabeul-yellow/90"
            >
              Enregistrer les modifications
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet appartement ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          
          {currentApartment && (
            <div className="py-4">
              <p className="font-medium">{currentApartment.title}</p>
              <p className="text-gray-500">{currentApartment.location}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setCurrentApartment(null);
              }}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleDeleteApartment}
              variant="destructive"
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
