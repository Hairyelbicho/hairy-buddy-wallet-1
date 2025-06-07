import NavBar from "@/components/NavBar";
import BalanceCard from "@/components/BalanceCard";
import CryptoCard from "@/components/CryptoCard";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const WalletPage = () => {
  const cryptoData = [
    {
      name: "Hairy Buddy Token",
      symbol: "HBT",
      balance: 10500,
      dollarValue: 44.1,
      change: 5.2,
      iconUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=80"
    },
    {
      name: "Solana",
      symbol: "SOL",
      balance: 1.25,
      dollarValue: 125.35,
      change: 2.8,
      iconUrl: "https://cryptologos.cc/logos/solana-sol-logo.png?v=029"
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      balance: 50.25,
      dollarValue: 50.25,
      change: 0.01,
      iconUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=029"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      balance: 0.05,
      dollarValue: 115.75,
      change: -1.2,
      iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-xl font-bold">Wallet</h1>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Search size={20} />
          </Button>
          <Link to="/add-token">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Plus size={20} />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4">
        <BalanceCard totalBalance={335.45} />

        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium">My Assets</h2>
            <Link to="/add-token" className="text-sm text-hairy-primary font-medium">
              Añadir token
            </Link>
          </div>
          {cryptoData.map((crypto, index) => (
            <CryptoCard
              key={index}
              name={crypto.name}
              symbol={crypto.symbol}
              balance={crypto.balance}
              dollarValue={crypto.dollarValue}
              change={crypto.change}
              iconUrl={crypto.iconUrl}
            />
          ))}
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default WalletPage;
