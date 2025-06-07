
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

const FiatPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [crypto, setCrypto] = useState("SOL");

  const paymentMethods = [
    { id: "card", name: "Tarjeta de Crédito/Débito", fee: "3.5%" },
    { id: "bank", name: "Transferencia Bancaria", fee: "1.5%" },
    { id: "paypal", name: "PayPal", fee: "4.0%" },
  ];

  const cryptos = [
    { symbol: "SOL", name: "Solana", price: 147.23 },
    { symbol: "BTC", name: "Bitcoin", price: 65432.10 },
    { symbol: "ETH", name: "Ethereum", price: 3456.78 },
    { symbol: "USDC", name: "USD Coin", price: 1.00 },
  ];

  const handleBuy = () => {
    if (!amount || !paymentMethod) {
      toast({
        title: "Error",
        description: "Completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Compra iniciada",
      description: `Procesando compra de ${amount} ${currency} de ${crypto}`,
    });
  };

  const handleSell = () => {
    if (!amount) {
      toast({
        title: "Error",
        description: "Introduce la cantidad a vender",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Venta iniciada",
      description: `Procesando venta de ${amount} ${crypto}`,
    });
  };

  const getCryptoAmount = () => {
    if (!amount) return "0";
    const price = cryptos.find(c => c.symbol === crypto)?.price || 0;
    return (parseFloat(amount) / price).toFixed(6);
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
        <div className="flex items-center">
          <CreditCard size={24} className="mr-2 text-green-500" />
          <h1 className="text-xl font-bold">Fiat Gateway</h1>
        </div>
      </div>

      <Tabs defaultValue="buy" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buy" className="flex items-center">
            <ArrowDownToLine size={16} className="mr-1" />
            Comprar
          </TabsTrigger>
          <TabsTrigger value="sell" className="flex items-center">
            <ArrowUpFromLine size={16} className="mr-1" />
            Vender
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buy">
          <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
            <CardHeader>
              <CardTitle>Comprar Crypto con Fiat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Cantidad</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    className="flex-1"
                  />
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Criptomoneda</Label>
                <Select value={crypto} onValueChange={setCrypto}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptos.map(crypto => (
                      <SelectItem key={crypto.symbol} value={crypto.symbol}>
                        {crypto.symbol} - {crypto.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Método de Pago</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona método de pago" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map(method => (
                      <SelectItem key={method.id} value={method.id}>
                        {method.name} ({method.fee})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {amount && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <p className="text-sm">
                    Recibirás aproximadamente: <span className="font-bold">{getCryptoAmount()} {crypto}</span>
                  </p>
                </div>
              )}

              <Button 
                onClick={handleBuy} 
                disabled={!amount || !paymentMethod}
                className="w-full bg-green-500 hover:bg-green-600"
              >
                Comprar {crypto}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sell">
          <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
            <CardHeader>
              <CardTitle>Vender Crypto por Fiat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Criptomoneda a vender</Label>
                <Select value={crypto} onValueChange={setCrypto}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptos.map(crypto => (
                      <SelectItem key={crypto.symbol} value={crypto.symbol}>
                        {crypto.symbol} - {crypto.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Cantidad</Label>
                <Input
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                />
              </div>

              <div className="space-y-2">
                <Label>Recibir en</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {amount && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <p className="text-sm">
                    Recibirás aproximadamente: <span className="font-bold">
                      {(parseFloat(amount) * (cryptos.find(c => c.symbol === crypto)?.price || 0)).toFixed(2)} {currency}
                    </span>
                  </p>
                </div>
              )}

              <Button 
                onClick={handleSell} 
                disabled={!amount}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Vender {crypto}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FiatPage;
