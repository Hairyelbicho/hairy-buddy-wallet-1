import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Wallet, RefreshCw, BarChart3, MessageSquare, ArrowUpRight, MoreHorizontal } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="gradient-bg text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Hairy Wallet</h1>
            <p className="text-white/70">Hello, User!</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>
        <div className="mt-6 mb-3">
          <p className="text-sm text-white/70">Total Balance</p>
          <div className="flex items-baseline">
            <h2 className="text-3xl font-bold">$1,234.56</h2>
            <div className="ml-3 text-sm bg-white/20 px-2 py-1 rounded-full flex items-center">
              <ArrowUpRight size={14} />
              <span className="ml-1">2.3%</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-6 -mt-6">
        <Card className="mb-6 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-4 divide-x divide-gray-100">
              <Link to="/wallet" className="p-4 flex flex-col items-center text-gray-600 hover:bg-gray-50">
                <Wallet size={24} className="text-hairy-primary mb-2" />
                <span className="text-xs">Wallet</span>
              </Link>
              <Link to="/swap" className="p-4 flex flex-col items-center text-gray-600 hover:bg-gray-50">
                <RefreshCw size={24} className="text-hairy-primary mb-2" />
                <span className="text-xs">Swap</span>
              </Link>
              <Link to="/market" className="p-4 flex flex-col items-center text-gray-600 hover:bg-gray-50">
                <BarChart3 size={24} className="text-hairy-primary mb-2" />
                <span className="text-xs">Market</span>
              </Link>
              <Link to="/chat" className="p-4 flex flex-col items-center text-gray-600 hover:bg-gray-50">
                <MessageSquare size={24} className="text-hairy-primary mb-2" />
                <span className="text-xs">Chat</span>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Featured Token */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Featured Token</h3>
            <a href="#" className="text-hairy-primary text-sm">View All</a>
          </div>
          <Card className="overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-hairy-primary to-hairy-tertiary text-white">
              <div className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/3547e277-3db5-473c-9772-6b0f5b4c5895.png" 
                  alt="HBT" 
                  className="w-12 h-12 rounded-full bg-white p-1 mr-3"
                />
                <div>
                  <h3 className="font-bold">Hairy Buddy Token</h3>
                  <p className="text-white/70 text-sm">$HBT</p>
                </div>
              </div>
              <p className="text-sm mb-4">
                Your contributions help animal shelters worldwide. Every transaction donates 2% to charity.
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-white/70">Price</p>
                  <p className="font-bold">$0.0042</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">24h Change</p>
                  <div className="bg-white/20 px-2 py-1 rounded-full flex items-center">
                    <ArrowUpRight size={14} />
                    <span className="ml-1 text-sm">5.2%</span>
                  </div>
                </div>
                <Link to="/wallet" className="bg-white text-hairy-primary px-3 py-1.5 rounded-lg text-sm font-medium">
                  View
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Recent Activity</h3>
            <a href="#" className="text-hairy-primary text-sm">View All</a>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                <div className="p-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <ArrowUpRight size={20} className="text-green-600" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">Received 120 HBT</p>
                    <p className="text-sm text-gray-500">From: 0x8a...3f5d</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">+$0.50</p>
                    <p className="text-xs text-gray-500">Apr 12</p>
                  </div>
                </div>
                <div className="p-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <RefreshCw size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">Swapped SOL to HBT</p>
                    <p className="text-sm text-gray-500">0.1 SOL → 250 HBT</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$1.05</p>
                    <p className="text-xs text-gray-500">Apr 10</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default HomePage;
