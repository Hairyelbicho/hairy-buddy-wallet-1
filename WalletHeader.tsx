
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Copy, QrCode, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";

interface WalletHeaderProps {
  address: string;
}

const WalletHeader = ({ address }: WalletHeaderProps) => {
  const [copied, setCopied] = useState(false);
  const { balance, loading, error, refreshData } = useWallet();
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success("Dirección copiada al portapapeles");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleRefresh = () => {
    refreshData();
    toast.success("Datos actualizados");
  };

  const shortAddress = address ? `${address.slice(0, 4)}...${address.slice(-4)}` : '';

  return (
    <div className="flex flex-col items-center space-y-4 py-6">
      <div className="relative w-24 h-24 rounded-full bg-wallet-blue p-1">
        <div className="w-full h-full rounded-full bg-wallet-navy flex items-center justify-center p-2">
          <img 
            src="/lovable-uploads/8b3a744c-2ea5-48ad-b4b7-93b9eb8d808e.png" 
            alt="Hairy Wallet Logo" 
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-white mt-2">
        <span className="text-wallet-blue glow-text">$HBT</span> 
        <span className="text-wallet-pink glow-text-pink ml-2">HAIRY WALLET</span>
      </h1>
      
      <div className="flex flex-col items-center space-y-1">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold">
            {loading ? "Cargando..." : error ? "Error" : balance}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="h-8 w-8 p-0 hover:bg-wallet-blue/20"
            disabled={loading}
          >
            <RefreshCw size={14} className={`text-wallet-blue ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}
        
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="px-2 py-1 bg-wallet-navy border border-wallet-blue/30">
            {shortAddress}
          </Badge>
          <button 
            onClick={copyToClipboard} 
            className="bg-wallet-blue/20 p-1 rounded-md hover:bg-wallet-blue/30 transition-colors"
          >
            <Copy size={14} className={copied ? "text-green-400" : "text-wallet-blue"} />
          </button>
          <Popover>
            <PopoverTrigger asChild>
              <button className="bg-wallet-blue/20 p-1 rounded-md hover:bg-wallet-blue/30 transition-colors">
                <QrCode size={14} className="text-wallet-blue" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto bg-wallet-navy border border-wallet-blue/30 p-4">
              <div className="flex flex-col items-center space-y-3">
                <h3 className="text-sm font-medium">Código QR de tu dirección</h3>
                <div className="bg-white p-3 rounded-lg">
                  <div className="w-40 h-40 bg-black grid grid-cols-8 grid-rows-8 gap-px">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs font-mono bg-wallet-blue/10 py-1 px-2 rounded-md border border-wallet-blue/20 max-w-full truncate">
                  {address}
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default WalletHeader;
