import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Droplets, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const PoolsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [myPools] = useState([
    {
      id: 1,
      pair: "SOL/USDC",
      liquidity: "$2,450.00",
      share: "0.15%",
      apy: "12.5%",
      earned: "$45.20"
    },
    {
      id: 2,
      pair: "HAIRY/SOL",
      liquidity: "$890.00",
      share: "0.08%",
      apy: "25.8%",
      earned: "$28.90"
    }
  ]);

  const [availablePools] = useState([
    {
      id: 1,
      pair: "ETH/USDC",
      tvl: "$15.2M",
      apy: "8.2%",
      volume24h: "$2.1M"
    },
    {
      id: 2,
      pair: "BTC/USDC",
      tvl: "$28.5M",
      apy: "6.8%",
      volume24h: "$5.2M"
    },
    {
      id: 3,
      pair: "HAIRY/USDC",
      tvl: "$450K",
      apy: "35.2%",
      volume24h: "$89K"
    }
  ]);

  const handleAddLiquidity = (poolPair?: string) => {
    const targetPool = poolPair || "general";
    navigate(`/add-liquidity/${encodeURIComponent(targetPool)}`, { 
      state: { poolPair: poolPair } 
    });
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 pb-20">
      <div className="flex items-center pt-4 pb-2 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-xl font-bold">Pools de Liquidez</h1>
      </div>

      <Tabs defaultValue="my-pools" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-pools">Mis Pools</TabsTrigger>
          <TabsTrigger value="all-pools">Todas las Pools</TabsTrigger>
        </TabsList>

        <TabsContent value="my-pools" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Mis Posiciones</h2>
            <Button 
              className="bg-wallet-blue hover:bg-wallet-blue/90"
              onClick={() => handleAddLiquidity()}
            >
              <Plus size={16} className="mr-1" />
              Agregar Liquidez
            </Button>
          </div>

          {myPools.map((pool) => (
            <Card key={pool.id} className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="flex items-center">
                    <Droplets size={20} className="mr-2 text-blue-500" />
                    {pool.pair}
                  </CardTitle>
                  <Badge className="bg-green-500/20 text-green-500">
                    {pool.apy} APY
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Liquidez</p>
                    <p className="font-medium">{pool.liquidity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Share</p>
                    <p className="font-medium">{pool.share}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ganado</p>
                    <p className="font-medium text-green-500">{pool.earned}</p>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAddLiquidity(pool.pair)}
                    >
                      Gestionar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="all-pools" className="space-y-4">
          <h2 className="text-lg font-semibold">Pools Disponibles</h2>
          
          {availablePools.map((pool) => (
            <Card key={pool.id} className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <Droplets size={20} className="mr-2 text-blue-500" />
                    <span className="font-medium text-lg">{pool.pair}</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-500">
                    {pool.apy} APY
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">TVL</p>
                    <p className="font-medium">{pool.tvl}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Volumen 24h</p>
                    <p className="font-medium">{pool.volume24h}</p>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-wallet-blue hover:bg-wallet-blue/90"
                  onClick={() => handleAddLiquidity(pool.pair)}
                >
                  <Plus size={16} className="mr-1" />
                  Agregar Liquidez
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PoolsPage;
