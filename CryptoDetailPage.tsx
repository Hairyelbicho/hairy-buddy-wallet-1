import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Share2, ExternalLink, QrCode, Send, ArrowDown, ArrowLeftRight, ShoppingCart, CreditCard, Bitcoin, DollarSign, Banknote } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { 
  Sheet,
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetTrigger 
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";

// Custom PayPal icon component
const PayPalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 10C5.9 8.5 5.9 6.5 7 5C8.34 3.33 11 3 11 3H17.5C17.5 3 19 3 19 4.5C19 6 17.5 6 17.5 6H11C11 6 10 6 10 7C10 8 11 8 11 8H17C17 8 20 8 20 11C20 14 17 14 17 14H11C11 14 8 14 8 11" />
    <path d="M6 11C4.9 12.5 4.9 14.5 6 16C7.34 17.67 10 18 10 18H16.5C16.5 18 18 18 18 16.5C18 15 16.5 15 16.5 15H10C10 15 9 15 9 14C9 13 10 13 10 13H16C16 13 19 13 19 10C19 7 16 7 16 7" />
  </svg>
);

// Types
interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  logoUrl: string;
}

interface PaymentOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  action: () => void;
}

// Mock chart data (would be fetched from an API in a real app)
const generateChartData = (basePrice: number, days = 30) => {
  const data = [];
  let currentPrice = basePrice;
  
  for (let i = days; i >= 0; i--) {
    // Random price fluctuation within ±5%
    const change = currentPrice * (Math.random() * 0.1 - 0.05);
    currentPrice += change;
    
    data.push({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
      price: currentPrice,
    });
  }
  return data;
};

const CryptoDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [asset, setAsset] = useState<CryptoAsset | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState<"1d" | "1w" | "1m" | "3m" | "1y">("1m");
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    // In a real app, we would parse the asset from URL params or state
    // and fetch real-time data using ID
    const state = location.state as { asset?: CryptoAsset };
    
    if (state?.asset) {
      setAsset(state.asset);
      // Generate mock chart data based on the asset's current price
      setChartData(generateChartData(state.asset.price));
      
      // Log selected asset for debugging
      console.info("Selected asset details:", state.asset);
    } else {
      // If no asset was passed, go back to dashboard
      navigate("/dashboard");
    }
  }, [location, navigate]);

  if (!asset) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando datos de la cripto...</p>
      </div>
    );
  }

  // Configure chart appearance
  const chartConfig = {
    price: {
      label: "Precio",
      theme: {
        light: asset.change24h >= 0 ? "#10b981" : "#ef4444", // green if positive, red if negative
        dark: asset.change24h >= 0 ? "#10b981" : "#ef4444",
      },
    },
  };

  // Update timeframe and reload chart data
  const handleTimeframeChange = (tf: "1d" | "1w" | "1m" | "3m" | "1y") => {
    setTimeframe(tf);
    // In a real app, we would fetch new data for the selected timeframe
    // For now, just regenerate mock data with different length
    const days = tf === "1d" ? 1 : tf === "1w" ? 7 : tf === "1m" ? 30 : tf === "3m" ? 90 : 365;
    setChartData(generateChartData(asset.price, days));
  };

  // Payment options
  const paymentOptions: PaymentOption[] = [
    {
      id: 'card',
      name: 'Tarjeta',
      icon: <CreditCard className="mr-2 h-5 w-5" />,
      action: () => {
        toast({
          title: "Compra con tarjeta",
          description: `Procesando compra de ${asset.symbol} con tarjeta de crédito`,
        });
        setSheetOpen(false);
      }
    },
    {
      id: 'usdt',
      name: 'USDT',
      icon: <DollarSign className="mr-2 h-5 w-5" />,
      action: () => {
        toast({
          title: "Compra con USDT",
          description: `Procesando compra de ${asset.symbol} con USDT`,
        });
        setSheetOpen(false);
      }
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <PayPalIcon className="mr-2 h-5 w-5" />,
      action: () => {
        toast({
          title: "Compra con PayPal",
          description: `Procesando compra de ${asset.symbol} con PayPal`,
        });
        setSheetOpen(false);
      }
    },
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      icon: <Bitcoin className="mr-2 h-5 w-5" />,
      action: () => {
        toast({
          title: "Compra con Bitcoin",
          description: `Procesando compra de ${asset.symbol} con Bitcoin`,
        });
        setSheetOpen(false);
      }
    },
    {
      id: 'sol',
      name: 'SOL',
      icon: <img src="https://cryptologos.cc/logos/solana-sol-logo.png?v=029" className="mr-2 h-5 w-5" alt="SOL" />,
      action: () => {
        toast({
          title: "Compra con SOL",
          description: `Procesando compra de ${asset.symbol} con Solana`,
        });
        setSheetOpen(false);
      }
    },
    {
      id: 'bank',
      name: 'Transferencia Bancaria',
      icon: <Banknote className="mr-2 h-5 w-5" />,
      action: () => {
        toast({
          title: "Compra con transferencia bancaria",
          description: `Procesando compra de ${asset.symbol} con transferencia bancaria`,
        });
        setSheetOpen(false);
      }
    },
    {
      id: 'bizun',
      name: 'Bizum',
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Bizum_Logo.svg/320px-Bizum_Logo.svg.png" className="mr-2 h-5 w-5" alt="Bizum" />,
      action: () => {
        toast({
          title: "Compra con Bizum",
          description: `Procesando compra de ${asset.symbol} con Bizum`,
        });
        setSheetOpen(false);
      }
    }
  ];

  const handleSellAsset = () => {
    if (asset) {
      navigate('/sell', { state: { asset } });
    }
  };

  return (
    <div className="container max-w-md mx-auto px-4 pb-20">
      {/* Header with back button */}
      <div className="flex items-center pt-4 pb-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft size={24} />
        </Button>
        <div className="flex-grow">
          <h1 className="text-xl font-bold">{asset.name}</h1>
          <p className="text-sm text-muted-foreground">{asset.symbol}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <img 
            src={asset.logoUrl || `https://cryptoicons.org/api/icon/${asset.symbol.toLowerCase()}/30`}
            alt={asset.name}
            className="w-6 h-6 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/30';
            }}
          />
        </div>
      </div>
      
      {/* Price information */}
      <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20 mb-4">
        <CardContent className="pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold">
              {asset.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </span>
            <span className={`font-medium ${
              asset.change24h > 0 ? "text-green-500" : 
              asset.change24h < 0 ? "text-red-500" : 
              "text-muted-foreground"
            }`}>
              {asset.change24h > 0 ? "+" : ""}{asset.change24h.toFixed(2)}%
            </span>
          </div>
        </CardContent>
      </Card>
      
      {/* Chart */}
      <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20 mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Gráfico</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Timeframe selector */}
          <div className="flex justify-between mb-4">
            {(["1d", "1w", "1m", "3m", "1y"] as const).map((tf) => (
              <Button 
                key={tf}
                variant={timeframe === tf ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handleTimeframeChange(tf)}
                className="flex-1 mx-1 first:ml-0 last:mr-0"
              >
                {tf}
              </Button>
            ))}
          </div>
          
          {/* Price chart */}
          <div className="h-48">
            <ChartContainer config={chartConfig}>
              <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={20}
                />
                <YAxis 
                  domain={[(dataMin: number) => dataMin * 0.95, (dataMax: number) => dataMax * 1.05]} 
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `€${value.toFixed(0)}`}
                  orientation="right"
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  name="price"
                  stroke={`var(--color-price, ${asset.change24h >= 0 ? "#10b981" : "#ef4444"})`}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Action buttons - now with 5 buttons */}
      <div className="grid grid-cols-5 gap-2 my-6">
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center p-2 h-auto bg-wallet-navy border-wallet-blue/30 hover:bg-wallet-blue/20 text-xs"
          onClick={() => navigate("/receive", { state: { asset } })}
        >
          <ArrowDown size={18} className="mb-1" />
          <span>Recibir</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center p-2 h-auto bg-wallet-navy border-wallet-blue/30 hover:bg-wallet-blue/20 text-xs"
          onClick={() => navigate("/send", { state: { asset } })}
        >
          <Send size={18} className="mb-1" />
          <span>Enviar</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center p-2 h-auto bg-wallet-navy border-wallet-blue/30 hover:bg-wallet-blue/20 text-xs"
          // onClick={() => { /* Lógica de Intercambiar */ }}
        >
          <ArrowLeftRight size={18} className="mb-1" />
          <span className="text-xs">Intercambiar</span>
        </Button>
        
        {/* Buy button with Sheet for purchase options */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center p-2 h-auto bg-wallet-navy border-wallet-blue/30 hover:bg-wallet-blue/20 text-xs"
            >
              <ShoppingCart size={18} className="mb-1" />
              <span className="text-xs">Comprar</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-wallet-navy border-wallet-blue/30">
            <SheetHeader>
              <SheetTitle>Comprar {asset.symbol}</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {paymentOptions.map(option => (
                <Button
                  key={option.id}
                  variant="outline"
                  className="w-full justify-start bg-wallet-blue/10 border-wallet-blue/30 hover:bg-wallet-blue/20"
                  onClick={option.action}
                >
                  {option.icon}
                  {option.name}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* New Sell Button */}
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center p-2 h-auto bg-wallet-orange/80 border-wallet-orange/50 hover:bg-wallet-orange/70 text-xs text-white" // Specific style for Sell
          onClick={handleSellAsset}
        >
          <DollarSign size={18} className="mb-1" />
          <span className="text-xs">Vender</span>
        </Button>
      </div>
      
      {/* Extra actions */}
      <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
        <CardContent className="py-4">
          <div className="grid grid-cols-1 gap-3">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => window.open(`https://solscan.io/token/${asset.id}`, '_blank')}
            >
              <ExternalLink size={18} className="mr-2" />
              Ver en explorador
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `${asset.name} (${asset.symbol})`,
                    text: `Mira el precio de ${asset.name}: ${asset.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}`,
                    url: window.location.href,
                  });
                }
              }}
            >
              <Share2 size={18} className="mr-2" />
              Compartir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoDetailPage;
