
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, RefreshCw, ChartCandlestick } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CandlestickChart from "./CandlestickChart";

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  logoUrl: string;
}

interface CryptoMarketProps {
  assets: CryptoAsset[];
  onSelectAsset: (asset: CryptoAsset) => void;
  onSendAsset?: (asset: CryptoAsset) => void;
  onSellAsset?: (asset: CryptoAsset) => void;
}

const CryptoMarket = ({ assets, onSelectAsset }: CryptoMarketProps) => {
  const [sortBy, setSortBy] = useState<"name" | "price" | "change">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const sortedAssets = [...assets].sort((a, b) => {
    if (sortBy === "name") {
      return sortDirection === "asc" 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (sortBy === "price") {
      return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
    }
    // change
    return sortDirection === "asc" 
      ? a.change24h - b.change24h 
      : b.change24h - a.change24h;
  });

  const toggleSort = (column: "name" | "price" | "change") => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const handleChartClick = (e: React.MouseEvent, assetId: string) => {
    e.stopPropagation();
    setSelectedAsset(selectedAsset === assetId ? null : assetId);
  };

  const formatPrice = (price: number) => {
    if (price >= 1) {
      return price.toLocaleString('es-ES', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } else {
      return price.toLocaleString('es-ES', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 6,
        maximumFractionDigits: 8
      });
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Mercado</CardTitle>
          <div className="flex items-center text-xs text-muted-foreground">
            <RefreshCw className="mr-1" size={12} />
            <span>Actualizado cada 30s</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedAssets.map((asset) => (
            <div key={asset.id} className="space-y-2">
              <div 
                className="flex items-center justify-between p-3 rounded-lg bg-wallet-navy/30 hover:bg-wallet-blue/5 cursor-pointer transition-colors"
                onClick={() => onSelectAsset(asset)}
              >
                <div className="flex items-center flex-1">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3">
                    <img 
                      src={asset.logoUrl}
                      alt={asset.name}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/30';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                  </div>
                </div>
                
                <div className="text-right mr-4">
                  <div className="font-medium">{formatPrice(asset.price)}</div>
                  <div className={cn(
                    "font-medium text-sm",
                    asset.change24h > 0 ? "text-green-500" : 
                    asset.change24h < 0 ? "text-red-500" : 
                    "text-muted-foreground"
                  )}>
                    {asset.change24h > 0 ? "+" : ""}{asset.change24h.toFixed(2)}%
                  </div>
                </div>

                <div className="flex items-center">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="group border-wallet-blue/30 hover:border-wallet-blue/60 hover:bg-wallet-blue/20 px-3 py-2 h-auto"
                    onClick={(e) => handleChartClick(e, asset.id)}
                  >
                    <ChartCandlestick size={16} className="mr-2" />
                    <span>Gráfico</span>
                  </Button>
                </div>
              </div>

              {selectedAsset === asset.id && (
                <div className="mt-2">
                  <CandlestickChart asset={asset} />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoMarket;
