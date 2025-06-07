
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Importar Avatar
import { ChevronRight } from "lucide-react";

// Mock data - similar to Dashboard.tsx
const mockAssets = [
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    balance: "12.345", // Example balance
    logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.png?v=029",
  },
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    balance: "0.005", // Example balance
    logoUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    balance: "0.15", // Example balance
    logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029",
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    balance: "150.75", // Example balance
    logoUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=029",
  },
  {
    id: "hbt",
    name: "Hairy Token",
    symbol: "HBT",
    balance: "1,000,000", // Example balance
    logoUrl: "/lovable-uploads/8b3a744c-2ea5-48ad-b4b7-93b9eb8d808e.png",
  },
];


const MyAssetsPage = () => {
  const navigate = useNavigate();

  const handleAssetClick = (assetId: string, assetSymbol: string) => {
    navigate(`/my-assets/${assetId}/transactions`, { state: { assetSymbol } });
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Mis Activos</h1>
      {mockAssets.length === 0 ? (
        <p className="text-center text-muted-foreground">No tienes activos actualmente.</p>
      ) : (
        <div className="space-y-4">
          {mockAssets.map((asset) => (
            <Card 
              key={asset.id} 
              className="bg-card/60 backdrop-blur-sm border-wallet-blue/30 hover:bg-card/80 cursor-pointer transition-colors"
              onClick={() => handleAssetClick(asset.id, asset.symbol)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={asset.logoUrl} alt={asset.name} className="object-contain" />
                    <AvatarFallback className="bg-wallet-blue/20 text-white font-semibold">
                      {asset.symbol.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base text-white">{asset.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-400">
                      {asset.balance} {asset.symbol}
                    </CardDescription>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAssetsPage;
