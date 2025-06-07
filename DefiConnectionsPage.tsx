import React, { useState } from "react";
import { ArrowLeftIcon, ExternalLinkIcon, ArrowRightLeft, TrendingUp, Eye, Gamepad2, Coins, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { LucideProps } from "lucide-react";

interface Platform {
  name: string;
  icon: React.ComponentType<LucideProps> | "orca" | "raydium" | "birdeye" | "dexscreener" | "coingecko";
  url: string;
  description: string;
  color: string;
}

// Componente personalizado para el ícono de Orca (ballena)
const OrcaIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="currentColor">
    <path 
      d="M20 45c0-8 6-14 14-14h32c8 0 14 6 14 14v10c0 12-8 20-20 20H40c-12 0-20-8-20-20v-10z"
      fill="#FFD15C"
    />
    <path 
      d="M75 50c3 0 5-2 5-5s-2-5-5-5-5 2-5 5 2 5 5 5z"
      fill="#FF6B35"
    />
    <path 
      d="M15 55c-3 2-5 5-5 8s2 6 5 8c2 1 4 0 5-2l8-12c1-2 0-4-2-5s-4 0-5 2l-6 1z"
      fill="#FFD15C"
    />
    <path 
      d="M85 55c3 2 5 5 5 8s-2 6-5 8c-2 1-4 0-5-2l-8-12c-1-2 0-4 2-5s4 0 5 2l6 1z"
      fill="#FFD15C"
    />
    <circle cx="55" cy="42" r="3" fill="#333"/>
  </svg>
);

// Componente personalizado para el ícono de Raydium (R en figura geométrica)
const RaydiumIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="currentColor">
    <path 
      d="M50 10L85 30v40L50 90L15 70V30L50 10z"
      fill="#8B5CF6"
      stroke="#C084FC"
      strokeWidth="2"
    />
    <path 
      d="M35 35h15c5 0 9 4 9 9v0c0 3-1 5-3 7l4 9h-6l-3-7h-8v7h-8V35z M43 42v6h7c1 0 2-1 2-3s-1-3-2-3h-7z"
      fill="white"
    />
  </svg>
);

// Componente personalizado para el ícono de Birdeye (pájaro pequeño)
const BirdeyeIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="currentColor">
    <path 
      d="M30 40c0-5 4-9 9-9h22c5 0 9 4 9 9v8c0 8-6 14-14 14H44c-8 0-14-6-14-14v-8z"
      fill="#10B981"
    />
    <path 
      d="M25 35c-2 0-4 1-5 3s0 4 2 5l8 4c2 1 4 0 5-2s0-4-2-5l-8-5z"
      fill="#10B981"
    />
    <path 
      d="M75 35c2 0 4 1 5 3s0 4-2 5l-8 4c-2 1-4 0-5-2s0-4 2-5l8-5z"
      fill="#10B981"
    />
    <circle cx="45" cy="42" r="2" fill="#fff"/>
    <path 
      d="M55 38c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3z"
      fill="#F59E0B"
    />
    <path 
      d="M50 55c-1 2-2 4-2 6s1 4 3 5c1 0 2-1 2-2v-9z"
      fill="#10B981"
    />
  </svg>
);

// Componente personalizado para el ícono de DexScreener (pantalla con gráfico)
const DexScreenerIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="currentColor">
    <path 
      d="M15 20c0-3 2-5 5-5h60c3 0 5 2 5 5v50c0 3-2 5-5 5H20c-3 0-5-2-5-5V20z"
      fill="#FF6B35"
      stroke="#FF8A65"
      strokeWidth="2"
    />
    <path 
      d="M25 30h50v35H25V30z"
      fill="#2A2A2A"
    />
    <path 
      d="M30 55l8-8 6 6 8-10 8 4"
      stroke="#00E676"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="30" cy="55" r="2" fill="#00E676"/>
    <circle cx="38" cy="47" r="2" fill="#00E676"/>
    <circle cx="44" cy="53" r="2" fill="#00E676"/>
    <circle cx="52" cy="43" r="2" fill="#00E676"/>
    <circle cx="60" cy="47" r="2" fill="#00E676"/>
    <path 
      d="M15 75h70v5c0 2-2 4-4 4H19c-2 0-4-2-4-4v-5z"
      fill="#FF8A65"
    />
  </svg>
);

// Componente personalizado para el ícono de CoinGecko (ranita)
const CoinGeckoIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="currentColor">
    {/* Cuerpo de la rana */}
    <ellipse cx="50" cy="60" rx="25" ry="20" fill="#8BC34A"/>
    
    {/* Cabeza */}
    <ellipse cx="50" cy="35" rx="20" ry="18" fill="#9CCC65"/>
    
    {/* Ojos */}
    <circle cx="42" cy="28" r="6" fill="#4CAF50"/>
    <circle cx="58" cy="28" r="6" fill="#4CAF50"/>
    <circle cx="42" cy="28" r="3" fill="#2E7D32"/>
    <circle cx="58" cy="28" r="3" fill="#2E7D32"/>
    <circle cx="43" cy="26" r="1" fill="#fff"/>
    <circle cx="59" cy="26" r="1" fill="#fff"/>
    
    {/* Boca */}
    <path 
      d="M40 40c5 3 10 3 15 0"
      stroke="#2E7D32"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    
    {/* Patas delanteras */}
    <ellipse cx="32" cy="55" rx="6" ry="12" fill="#8BC34A"/>
    <ellipse cx="68" cy="55" rx="6" ry="12" fill="#8BC34A"/>
    
    {/* Patas traseras */}
    <ellipse cx="28" cy="75" rx="8" ry="10" fill="#8BC34A"/>
    <ellipse cx="72" cy="75" rx="8" ry="10" fill="#8BC34A"/>
    
    {/* Dedos de las patas */}
    <circle cx="25" cy="82" r="2" fill="#689F38"/>
    <circle cx="31" cy="82" r="2" fill="#689F38"/>
    <circle cx="69" cy="82" r="2" fill="#689F38"/>
    <circle cx="75" cy="82" r="2" fill="#689F38"/>
    
    {/* Manchas en el cuerpo */}
    <circle cx="45" cy="50" r="3" fill="#689F38"/>
    <circle cx="58" cy="55" r="2" fill="#689F38"/>
    <circle cx="40" cy="65" r="2" fill="#689F38"/>
  </svg>
);

const DefiConnectionsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);

  const platforms: Platform[] = [
    {
      name: "Orca",
      icon: "orca",
      url: "https://www.orca.so/",
      description: "Intercambio descentralizado (DEX) en Solana",
      color: "text-yellow-400"
    },
    {
      name: "Raydium",
      icon: "raydium",
      url: "https://raydium.io/",
      description: "Plataforma AMM y Yield Farming en Solana",
      color: "text-purple-400"
    },
    {
      name: "Birdeye",
      icon: "birdeye",
      url: "https://birdeye.so/",
      description: "Análisis de tokens y seguimiento de carteras",
      color: "text-green-400"
    },
    {
      name: "DexScreener",
      icon: "dexscreener",
      url: "https://dexscreener.com/",
      description: "Herramienta de análisis de pares DEX",
      color: "text-orange-400"
    },
    {
      name: "CoinGecko",
      icon: "coingecko",
      url: "https://www.coingecko.com/",
      description: "Información y seguimiento de precios de criptomonedas",
      color: "text-green-400"
    },
    {
      name: "PumpFun",
      icon: Gamepad2,
      url: "https://pumpfun.io/",
      description: "Plataforma de tokens gamificados",
      color: "text-pink-400"
    },
  ];

  const handlePlatformClick = (platform: Platform) => {
    setLoading(platform.name);
    // For mobile devices, we would integrate with Capacitor's Browser plugin
    // For web, we'll use window.open
    try {
      window.open(platform.url, "_blank");
      toast({
        title: "Conectando con " + platform.name,
        description: "Abriendo en una nueva ventana...",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al conectar",
        description: "No se pudo conectar con " + platform.name,
      });
    }
    setTimeout(() => setLoading(null), 1000);
  };

  return (
    <div className="container max-w-md mx-auto px-4 pb-20">
      <div className="flex items-center justify-between py-6">
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeftIcon className="mr-2" size={20} />
          Volver
        </Button>
        <h1 className="text-xl font-bold">DeFi Conexiones</h1>
        <div className="w-10"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {platforms.map((platform) => {
          return (
            <Card
              key={platform.name}
              className="bg-wallet-navy/80 border border-wallet-blue/30 hover:border-wallet-blue/50 transition-colors cursor-pointer"
              onClick={() => handlePlatformClick(platform)}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3 mt-2 relative">
                  {platform.icon === "orca" ? (
                    <OrcaIcon size={32} className={platform.color} />
                  ) : platform.icon === "raydium" ? (
                    <RaydiumIcon size={32} className={platform.color} />
                  ) : platform.icon === "birdeye" ? (
                    <BirdeyeIcon size={32} className={platform.color} />
                  ) : platform.icon === "dexscreener" ? (
                    <DexScreenerIcon size={32} className={platform.color} />
                  ) : platform.icon === "coingecko" ? (
                    <CoinGeckoIcon size={32} className={platform.color} />
                  ) : (
                    React.createElement(platform.icon as React.ComponentType<LucideProps>, {
                      size: 32,
                      className: platform.color
                    })
                  )}
                  {loading === platform.name && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-full">
                      <div className="w-6 h-6 border-2 border-t-transparent border-wallet-blue rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <h3 className="font-medium mb-1">
                  {platform.name}
                </h3>
                <p className="text-xs text-muted-foreground">{platform.description}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-wallet-blue flex items-center text-xs"
                  onClick={(e) => {
                    e.stopPropagation(); // Detiene la propagación para que no se active el onClick del Card
                    handlePlatformClick(platform);
                  }}
                >
                  <ExternalLinkIcon className="mr-1" size={12} />
                  Abrir
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DefiConnectionsPage;
