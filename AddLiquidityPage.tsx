
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const AddLiquidityPage = () => {
  const navigate = useNavigate();
  const { poolId } = useParams();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get pool info from route state or use poolId
  const poolPair = location.state?.poolPair || poolId || "SOL/USDC";
  
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  
  const handleAddLiquidity = () => {
    toast({
      title: "Liquidez Agregada",
      description: `Se agregó liquidez exitosamente al pool ${poolPair}`,
    });
    navigate("/pools");
  };

  const tokens = poolPair.split("/");

  return (
    <div className="container max-w-2xl mx-auto px-4 pb-20">
      <div className="flex items-center pt-4 pb-2 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/pools")}
          className="mr-2"
        >
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-xl font-bold">Agregar Liquidez</h1>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Droplets size={20} className="mr-2 text-blue-500" />
              Pool {poolPair}
            </div>
            <Badge className="bg-green-500/20 text-green-500">
              12.5% APY
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Cantidad de {tokens[0]}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount1}
                  onChange={(e) => setAmount1(e.target.value)}
                  placeholder="0.0"
                  className="w-full p-3 bg-background border border-input rounded-md pr-16"
                />
                <span className="absolute right-3 top-3 text-sm text-muted-foreground">
                  {tokens[0]}
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <Plus size={20} className="text-muted-foreground" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Cantidad de {tokens[1]}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount2}
                  onChange={(e) => setAmount2(e.target.value)}
                  placeholder="0.0"
                  className="w-full p-3 bg-background border border-input rounded-md pr-16"
                />
                <span className="absolute right-3 top-3 text-sm text-muted-foreground">
                  {tokens[1]}
                </span>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-md space-y-2">
              <div className="flex justify-between text-sm">
                <span>Ratio del Pool:</span>
                <span>1 {tokens[0]} = 25.4 {tokens[1]}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Share del Pool:</span>
                <span>0.15%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Fees estimados:</span>
                <span className="text-green-500">$2.50/día</span>
              </div>
            </div>

            <Button 
              className="w-full bg-wallet-blue hover:bg-wallet-blue/90"
              onClick={handleAddLiquidity}
              disabled={!amount1 || !amount2}
            >
              <Plus size={16} className="mr-1" />
              Agregar Liquidez
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddLiquidityPage;
