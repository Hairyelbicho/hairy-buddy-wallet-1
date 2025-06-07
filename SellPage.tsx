
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, DollarSign, Euro } from "lucide-react";
import { useState } from "react";

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  logoUrl: string;
}

const SellPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const assetToSell = location.state?.asset as CryptoAsset | undefined;

  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<"EUR" | "USD">("EUR");

  if (!assetToSell) {
    return (
      <div className="container max-w-md mx-auto px-4 py-8 text-center">
        <p>No se ha especificado ningún activo para vender.</p>
        <Button onClick={() => navigate(-1)} className="mt-4">Volver</Button>
      </div>
    );
  }

  const handleSell = () => {
    // Aquí iría la lógica para procesar la venta
    console.log(`Vender ${amount} de ${assetToSell.symbol} por ${currency}`);
    // Simulación de venta exitosa y navegación de vuelta
    alert(`Has vendido ${amount} ${assetToSell.symbol} por ${currency}. (Simulación)`);
    navigate("/dashboard"); 
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Button>
          <CardTitle className="text-xl">Vender {assetToSell.name}</CardTitle>
          <div className="w-8"></div> {/* Spacer */}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center">
            <img src={assetToSell.logoUrl} alt={assetToSell.name} className="w-16 h-16 mr-4" />
            <div>
              <p className="text-2xl font-semibold">{assetToSell.symbol}</p>
              <p className="text-muted-foreground">{assetToSell.name}</p>
            </div>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-muted-foreground mb-1">
              Cantidad a vender ({assetToSell.symbol})
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 rounded-md border border-input bg-background focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <p className="block text-sm font-medium text-muted-foreground mb-1">Recibir en</p>
            <div className="flex space-x-2">
              <Button 
                variant={currency === "EUR" ? "default" : "outline"} 
                onClick={() => setCurrency("EUR")}
                className="flex-1"
              >
                <Euro className="mr-2 h-4 w-4" /> EUR
              </Button>
              <Button 
                variant={currency === "USD" ? "default" : "outline"} 
                onClick={() => setCurrency("USD")}
                className="flex-1"
              >
                <DollarSign className="mr-2 h-4 w-4" /> USD
              </Button>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            Precio actual: {assetToSell.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} por {assetToSell.symbol}
          </p>

          <Button onClick={handleSell} disabled={!amount || parseFloat(amount) <= 0} className="w-full bg-wallet-orange hover:bg-wallet-orange/90">
            Confirmar Venta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellPage;
