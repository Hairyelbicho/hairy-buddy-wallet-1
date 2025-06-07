
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DiscoverCard from '@/components/DiscoverCard';
import { ShoppingCart, MapPin, Search, ShieldCheck } from 'lucide-react';

const DiscoverPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (featureName: string, route: string) => {
    console.log(`${featureName} card clicked`);
    navigate(route);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-foreground">Descubrir</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DiscoverCard
          title="Shop with Crypto"
          description="Explora comercios que aceptan criptomonedas."
          icon={ShoppingCart}
          onClick={() => handleCardClick("Shop with Crypto", "/defi")}
          className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white"
        />
        <DiscoverCard
          title="Veterinarios Cercanos"
          description="Encuentra veterinarios para tu mascota en tu área."
          icon={MapPin}
          onClick={() => handleCardClick("Veterinarios Cercanos", "/veterinarians")}
        />
        <DiscoverCard
          title="Tiendas de Mascotas"
          description="Descubre tiendas con productos para tus animales."
          icon={Search}
          onClick={() => handleCardClick("Tiendas de Mascotas", "/pet-stores")}
        />
        <DiscoverCard
          title="Publicidad Destacada"
          description="Ofertas y promociones especiales."
          icon={ShieldCheck}
          onClick={() => handleCardClick("Publicidad Destacada", "/advertising-form")}
        />
      </div>
      
      <p className="text-center text-muted-foreground mt-12 text-sm">
        Más funcionalidades y opciones de personalización próximamente.
      </p>
    </div>
  );
};

export default DiscoverPage;
