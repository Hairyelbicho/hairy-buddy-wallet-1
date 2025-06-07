
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const BridgePage = () => {
  const navigate = useNavigate();
  const [fromChain, setFromChain] = useState("");
  const [toChain, setToChain] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chains = [
    { id: "ethereum", name: "Ethereum", symbol: "ETH" },
    { id: "solana", name: "Solana", symbol: "SOL" },
    { id: "polygon", name: "Polygon", symbol: "MATIC" },
    { id: "bsc", name: "BSC", symbol: "BNB" },
  ];

  const tokens = [
    { symbol: "USDC", name: "USD Coin" },
    { symbol: "USDT", name: "Tether" },
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "SOL", name: "Solana" },
  ];

  const handleBridge = () => {
    if (!fromChain || !toChain || !amount || !token) {
      toast({
        title: "Error",
        description: "Completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Bridge iniciado",
        description: `${amount} ${token} desde ${fromChain} a ${toChain}`,
      });
    }, 3000);
  };

  return (
    <div className="container max-w-md mx-auto px-4 pb-20">
      <div className="flex items-center pt-4 pb-2 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-xl font-bold">Bridge</h1>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
        <CardHeader>
          <CardTitle>Transfer entre Blockchains</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Desde</Label>
            <Select value={fromChain} onValueChange={setFromChain}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona blockchain origen" />
              </SelectTrigger>
              <SelectContent>
                {chains.map(chain => (
                  <SelectItem key={chain.id} value={chain.name}>
                    {chain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="text-muted-foreground" size={20} />
          </div>

          <div className="space-y-2">
            <Label>Hacia</Label>
            <Select value={toChain} onValueChange={setToChain}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona blockchain destino" />
              </SelectTrigger>
              <SelectContent>
                {chains.map(chain => (
                  <SelectItem key={chain.id} value={chain.name}>
                    {chain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Token</Label>
            <Select value={token} onValueChange={setToken}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona token" />
              </SelectTrigger>
              <SelectContent>
                {tokens.map(token => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.symbol} - {token.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Cantidad</Label>
            <Input
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
            />
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            <p className="text-sm text-amber-500">
              ⚠️ Los transfers entre blockchains pueden tardar varios minutos
            </p>
          </div>

          <Button 
            onClick={handleBridge} 
            disabled={isLoading || !fromChain || !toChain || !amount || !token}
            className="w-full bg-wallet-blue hover:bg-wallet-blue/90"
          >
            {isLoading ? "Procesando Bridge..." : "Iniciar Bridge"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BridgePage;
