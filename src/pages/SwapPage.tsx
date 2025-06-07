
import { useState } from "react";
import NavBar from "@/components/NavBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, RefreshCw } from "lucide-react";

const SwapPage = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [fromToken, setFromToken] = useState("SOL");
  const [toToken, setToToken] = useState("HBT");
  
  // Calculate exchange rate (in a real app, this would come from an API)
  const exchangeRate = fromToken === "SOL" && toToken === "HBT" ? 2500 : 1;
  const estimatedAmount = fromAmount ? parseFloat(fromAmount) * exchangeRate : 0;

  const handleSwap = () => {
    // In a real app, this would connect to a blockchain service
    console.log("Swapping", fromAmount, fromToken, "to", toToken);
    // Show success message or redirect
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-xl font-bold">Swap</h1>
      </header>

      {/* Main Content */}
      <div className="p-4">
        <Card className="mb-6">
          <CardContent className="p-4 space-y-6">
            <h2 className="text-lg font-medium">Swap Tokens</h2>
            
            {/* From Token */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">From</label>
              <div className="flex space-x-2">
                <Select value={fromToken} onValueChange={setFromToken}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SOL">SOL</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="HBT">HBT</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  type="number" 
                  placeholder="0.0" 
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="flex-1" 
                />
              </div>
              <div className="mt-1 text-right">
                <span className="text-sm text-gray-500">Balance: 1.25 SOL</span>
              </div>
            </div>
            
            {/* Swap Direction Button */}
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full"
                onClick={() => {
                  const temp = fromToken;
                  setFromToken(toToken);
                  setToToken(temp);
                }}
              >
                <RefreshCw size={16} />
              </Button>
            </div>
            
            {/* To Token */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">To</label>
              <div className="flex space-x-2">
                <Select value={toToken} onValueChange={setToToken}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SOL">SOL</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="HBT">HBT</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  readOnly 
                  value={estimatedAmount.toFixed(4)} 
                  className="flex-1 bg-gray-50" 
                />
              </div>
            </div>
            
            {/* Exchange Rate */}
            <div className="p-3 bg-gray-50 rounded-lg text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Exchange Rate</span>
                <span>1 {fromToken} = {exchangeRate} {toToken}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-500">Estimated Fee</span>
                <span>0.0005 SOL</span>
              </div>
            </div>
            
            {/* Swap Button */}
            <Button 
              className="w-full bg-hairy-primary hover:bg-hairy-secondary"
              disabled={!fromAmount || parseFloat(fromAmount) <= 0}
              onClick={handleSwap}
            >
              Swap Now
            </Button>
          </CardContent>
        </Card>

        {/* Charity Notice */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-hairy-light flex items-center justify-center flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=40" 
                  alt="HBT" 
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div>
                <h3 className="font-medium mb-1">Charity Impact</h3>
                <p className="text-sm text-gray-600">
                  2% of every swap involving $HBT tokens is donated to animal shelters. Your transactions help make a difference!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <NavBar />
    </div>
  );
};

export default SwapPage;
