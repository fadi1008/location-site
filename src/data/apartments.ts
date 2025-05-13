
import { ApartmentType } from '../components/ApartmentCard';

const apartments: ApartmentType[] = [
  {
    id: 1,
    title: "Villa avec piscine proche de la plage",
    location: "Nabeul, à 5 min de la mer",
    price: "500 DT / nuit",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622781867-1239067c88f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622781674-a7ef81f789d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    features: ["Piscine privée", "Jardin", "Climatisation", "WiFi", "Parking", "Terrasse", "Vue mer"],
    description: "Magnifique villa avec vue sur mer, à quelques minutes de la plage. Profitez de sa piscine privée et de son jardin spacieux pour des vacances inoubliables."
  },
  {
    id: 2,
    title: "Appartement moderne vue sur mer",
    location: "Hammamet, front de mer",
    price: "300 DT / nuit",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448082-4d9c959a4b9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    features: ["Vue mer", "Climatisation", "WiFi", "Balcon", "Cuisine équipée", "Ascenseur"],
    description: "Appartement moderne avec une vue imprenable sur la mer. Idéalement situé en front de mer à Hammamet."
  },
  {
    id: 3,
    title: "Maison traditionnelle rénovée",
    location: "Centre-ville de Nabeul",
    price: "250 DT / nuit",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588854337236-6889d631faa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    bedrooms: 2,
    bathrooms: 1,
    area: 90,
    features: ["Patio", "Climatisation", "WiFi", "Coin barbecue", "Architecture traditionnelle"],
    description: "Charmante maison traditionnelle rénovée au cœur de Nabeul. Découvrez l'authenticité tunisienne dans un cadre confortable."
  },
  {
    id: 4,
    title: "Penthouse luxueux avec terrasse",
    location: "Hammamet Nord",
    price: "450 DT / nuit",
    images: [
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    features: ["Terrasse panoramique", "Jacuzzi", "Climatisation", "WiFi", "Smart TV", "Sécurité 24/7"],
    description: "Penthouse de luxe avec une terrasse panoramique et jacuzzi. Profitez d'une vue imprenable sur Hammamet Nord."
  },
  {
    id: 5,
    title: "Studio cosy près de la plage",
    location: "Nabeul, quartier balnéaire",
    price: "150 DT / nuit",
    images: [
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536858974309-969976df0d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    features: ["Accès plage", "Climatisation", "WiFi", "Cuisine équipée", "Balcon"],
    description: "Studio confortable à proximité immédiate de la plage. Parfait pour un séjour en couple."
  },
  {
    id: 6,
    title: "Villa familiale avec grand jardin",
    location: "Hammamet Sud, près de Yasmine Hammamet",
    price: "400 DT / nuit",
    images: [
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    bedrooms: 5,
    bathrooms: 3,
    area: 280,
    features: ["Grand jardin", "Piscine", "Climatisation", "WiFi", "Barbecue", "Parking", "Salle de jeux"],
    description: "Grande villa familiale avec jardin spacieux et piscine. Idéale pour des vacances en famille ou entre amis à Hammamet."
  }
];

export default apartments;
