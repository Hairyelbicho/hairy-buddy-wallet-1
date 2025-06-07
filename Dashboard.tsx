
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WalletHeader from "@/components/WalletHeader";
import ActionButton from "@/components/ActionButton";
import TransactionList from "@/components/TransactionList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CryptoMarket from "@/components/CryptoMarket";
import { QrCode, Send, Settings, Globe } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { useCryptoData, transformCryptoData } from "@/hooks/useCryptoData";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("wallet");
  const { balance, transactions, loading: walletLoading, error: walletError } = useWallet();
  const { data: cryptoData, isLoading, error } = useCryptoData();
  
  // Transformar datos de la API a nuestro formato
  const assets = cryptoData ? transformCryptoData(cryptoData) : [];
  
  const handleAssetSelect = (asset: any) => {
    console.log("Selected asset:", asset);
    navigate(`/crypto/${asset.id}`, { state: { asset } });
  };

  const goTo = (path: string) => {
    navigate(path);
  };

  const handleSendAsset = (asset: any) => {
    console.log("Sending asset:", asset);
    navigate(`/send`, { state: { asset } });
  };

  const handleSellAsset = (asset: any) => {
    console.log("Selling asset:", asset);
    navigate(`/sell`, { state: { asset } });
  };
  
  return (
    <div className="container max-w-md mx-auto px-4 pb-20">
      <WalletHeader 
        address="7Zw3iHRdBmghgg6YKG5zfYTj8GvJikX2cXZvPN6aTEWd"
      />
      
      <div className="flex justify-center gap-3 my-6">
        <ActionButton 
          icon={QrCode}
          label="Recibir"
          onClick={() => goTo("/receive")}
        />
        <ActionButton 
          icon={Send}
          label="Enviar"
          onClick={() => goTo("/send")}
        />
        <ActionButton 
          icon={Globe}
          label="DeFi"
          onClick={() => goTo("/defi")}
        />
        <ActionButton 
          icon={Settings}
          label="Ajustes"
          onClick={() => goTo("/settings")}
        />
      </div>
      
      <Tabs defaultValue="wallet" className="mt-6">
        <TabsList className="grid grid-cols-2 w-full bg-wallet-navy border border-wallet-blue/30">
          <TabsTrigger 
            value="wallet" 
            className="data-[state=active]:bg-wallet-blue/20"
            onClick={() => setActiveTab("wallet")}
          >
            Wallet
          </TabsTrigger>
          <TabsTrigger 
            value="market" 
            className="data-[state=active]:bg-wallet-blue/20"
            onClick={() => setActiveTab("market")}
          >
            Mercado
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="wallet" className="mt-4 space-y-4">
          <TransactionList 
            transactions={transactions} 
            loading={walletLoading}
            error={walletError}
          />
        </TabsContent>
        
        <TabsContent value="market" className="mt-4">
          {isLoading ? (
            <div className="text-center text-muted-foreground">Cargando precios...</div>
          ) : error ? (
            <div className="text-center text-red-500">Error al cargar precios</div>
          ) : (
            <CryptoMarket 
              assets={assets} 
              onSelectAsset={handleAssetSelect}
              onSendAsset={handleSendAsset}
              onSellAsset={handleSellAsset}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
