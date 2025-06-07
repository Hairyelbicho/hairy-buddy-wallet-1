
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Globe, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PetStoresPage = () => {
  const navigate = useNavigate();

  const petStores = [
    {
      id: 1,
      name: "PetMart Crypto",
      description: "Tienda completa de mascotas que acepta criptomonedas",
      address: "Av. Principal 123, Ciudad",
      phone: "+1 (555) 123-4567",
      website: "https://petmart-crypto.com",
      acceptsCrypto: true,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=400&auto=format&fit=crop",
      categories: ["Alimento", "Juguetes", "Accesorios"]
    },
    {
      id: 2,
      name: "Mundo Animal Solana",
      description: "Especialistas en productos premium para mascotas",
      address: "Calle Comercial 456, Centro",
      phone: "+1 (555) 234-5678",
      website: "https://mundoanimal-sol.com",
      acceptsCrypto: true,
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=400&auto=format&fit=crop",
      categories: ["Veterinaria", "Grooming", "Alimento"]
    },
    {
      id: 3,
      name: "Pet Paradise DeFi",
      description: "Tu paraíso de mascotas con pagos en blockchain",
      address: "Plaza Central 789, Zona Norte",
      phone: "+1 (555) 345-6789",
      website: "https://petparadise-defi.com",
      acceptsCrypto: true,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=400&auto=format&fit=crop",
      categories: ["Exóticos", "Acuarios", "Reptiles"]
    }
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/discover')}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Tiendas de Mascotas</h1>
      </div>

      <p className="text-muted-foreground mb-6">
        Descubre tiendas de mascotas que aceptan criptomonedas para tus compras.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {petStores.map((store) => (
          <Card key={store.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img 
                src={store.image} 
                alt={store.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{store.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{store.description}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span className="text-sm">{store.address}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{store.phone}</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {store.categories.map((category) => (
                  <span 
                    key={category}
                    className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>

              {store.acceptsCrypto && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">Acepta Crypto</span>
                </div>
              )}

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => window.open(store.website, '_blank')}
              >
                <Globe className="mr-2 h-4 w-4" />
                Visitar Sitio Web
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">¿Tienes una tienda de mascotas?</h3>
          <p className="text-muted-foreground mb-4">
            Únete a nuestra red de comercios que aceptan criptomonedas
          </p>
          <Button onClick={() => navigate('/advertising-form')}>
            Publicitar mi Tienda
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PetStoresPage;
