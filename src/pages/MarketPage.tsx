
import { useState } from "react";
import NavBar from "@/components/NavBar";
import MarketItem from "@/components/MarketItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const MarketPage = () => {
  const [activeTab, setActiveTab] = useState<"all" | "watchlist">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const marketData = [
    {
      name: "Hairy Buddy Token",
      symbol: "HBT",
      price: 0.0042,
      change: 5.2,
      volume: "$280K",
      marketCap: "$850K",
      iconUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=80"
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: 102.35,
      change: 2.8,
      volume: "$1.2B",
      marketCap: "$42B",
      iconUrl: "https://cryptologos.cc/logos/solana-sol-logo.png?v=029"
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      price: 1.00,
      change: 0.01,
      volume: "$24.5B",
      marketCap: "$31B",
      iconUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=029"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: 2347.89,
      change: -1.2,
      volume: "$8.7B",
      marketCap: "$275B",
      iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029"
    },
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: 52348.76,
      change: 0.5,
      volume: "$12.5B",
      marketCap: "$980B",
      iconUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029"
    },
    {
      name: "Cardano",
      symbol: "ADA",
      price: 0.45,
      change: -2.3,
      volume: "$630M",
      marketCap: "$15B",
      iconUrl: "https://cryptologos.cc/logos/cardano-ada-logo.png?v=029"
    }
  ];

  const filteredData = marketData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-xl font-bold">Market</h1>
        <Button variant="ghost" size="icon" className="text-gray-500">
          <TrendingUp size={20} />
        </Button>
      </header>

      {/* Search */}
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search coins"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={cn(
              "pb-2 px-4 text-sm font-medium",
              activeTab === "all"
                ? "text-hairy-primary border-b-2 border-hairy-primary"
                : "text-gray-500"
            )}
            onClick={() => setActiveTab("all")}
          >
            All Coins
          </button>
          <button
            className={cn(
              "pb-2 px-4 text-sm font-medium",
              activeTab === "watchlist"
                ? "text-hairy-primary border-b-2 border-hairy-primary"
                : "text-gray-500"
            )}
            onClick={() => setActiveTab("watchlist")}
          >
            My Watchlist
          </button>
        </div>

        {/* Market List */}
        <div>
          {activeTab === "all" && filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <MarketItem
                key={index}
                name={item.name}
                symbol={item.symbol}
                price={item.price}
                change={item.change}
                volume={item.volume}
                marketCap={item.marketCap}
                iconUrl={item.iconUrl}
              />
            ))
          ) : activeTab === "watchlist" ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-3">No coins in your watchlist yet</p>
              <Button 
                variant="outline" 
                className="text-hairy-primary border-hairy-primary"
                onClick={() => setActiveTab("all")}
              >
                Browse Coins
              </Button>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No coins found</p>
            </div>
          )}
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default MarketPage;
