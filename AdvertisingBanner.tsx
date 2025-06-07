import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ShoppingCart, MapPin, Search } from 'lucide-react';

interface AdItem {
  id: string;
  type: 'image' | 'text_icon';
  content: string;
  altText?: string;
  link: string;
  icon?: React.ElementType;
  bgColor?: string;
  textColor?: string;
}

const ads: AdItem[] = [
  {
    id: 'shop-crypto',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=800&auto=format&fit=crop',
    altText: 'Shop with Crypto - Exclusive Deals',
    link: '/discover',
    bgColor: 'bg-purple-600',
    textColor: 'text-white',
  },
  {
    id: 'hairy-pet-shop',
    type: 'image',
    content: '/lovable-uploads/12f0fb3f-bf63-4f81-af4c-40730e260469.png',
    altText: '¡Próxima Apertura! Hairy Pet Shop - Alimentación Premium con $HBT',
    link: '/pet-stores',
    bgColor: 'bg-gradient-to-r from-yellow-400 to-teal-400',
    textColor: 'text-white',
  },
  {
    id: 'find-vets',
    type: 'image',
    content: '/lovable-uploads/9bba1edd-cc3a-44aa-8916-212023e0fe63.png',
    altText: 'Encuentra Veterinarios Cercanos para tu Mascota',
    link: '/veterinarians',
    bgColor: 'bg-teal-500',
    textColor: 'text-white',
  },
  {
    id: 'pet-stores',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop',
    altText: 'Noticias y Análisis de Criptomonedas - Mantente Actualizado',
    link: '/ai-trading',
    bgColor: 'bg-green-500',
    textColor: 'text-white',
  },
  {
    id: 'hairy-promo',
    type: 'text_icon',
    content: '¡Descubre Hairy Wallet y maneja tus cripto con facilidad!',
    icon: ShoppingCart,
    link: '/welcome',
    bgColor: 'bg-wallet-pink',
    textColor: 'text-white',
  },
];

const AdvertisingBanner: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);

  return (
    <div className="w-full max-w-md mx-auto p-4 md:pl-20">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent>
          {ads.map((ad) => (
            <CarouselItem key={ad.id}>
              <a href={ad.link} target="_blank" rel="noopener noreferrer" className="block w-full">
                <Card className={cn("overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow", ad.bgColor)}>
                  <CardContent className="p-0 h-48 sm:h-56 relative">
                    {ad.type === 'image' && (
                      <div className="relative h-full w-full">
                        <img 
                          src={ad.content} 
                          alt={ad.altText || 'Advertising'} 
                          className="h-full w-full object-cover"
                        />
                        {ad.id === 'find-vets' && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        )}
                      </div>
                    )}
                    {ad.type === 'text_icon' && ad.icon && (
                      <div className="flex flex-col items-center justify-center h-full text-center p-6">
                        <ad.icon className={cn("h-12 w-12 mb-4", ad.textColor)} />
                        <span className={cn("text-lg font-bold", ad.textColor)}>{ad.content}</span>
                      </div>
                    )}
                    {ad.type === 'text_icon' && !ad.icon && (
                      <div className="flex items-center justify-center h-full text-center p-6">
                        <span className={cn("text-lg font-bold", ad.textColor)}>{ad.content}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default AdvertisingBanner;

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');
