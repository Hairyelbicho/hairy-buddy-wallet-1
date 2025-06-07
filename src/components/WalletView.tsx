
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { WalletActions } from '@/components/WalletActions';
import { PriceChart } from '@/components/PriceChart';
import { TokenList } from '@/components/TokenList';
import { Search, QrCode } from 'lucide-react';

interface WalletViewProps {
  balance: number;
  publicKey: string;
}

export const WalletView: React.FC<WalletViewProps> = ({ balance, publicKey }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white border-b">
        <CardHeader className="py-3">
          <CardTitle className="flex items-center justify-between text-lg text-gray-800">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/8fc07a2b-fa3a-4907-91f5-5b884ee02a2e.png"
                alt="HBT Hairy Wallet"
                className="h-8 w-8 rounded-full"
              />
              <span>HBT Hairy Wallet</span>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-hairy-light hover:text-hairy-primary"
                onClick={() => console.log('QR Scan clicked')}
              >
                <QrCode className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-hairy-light hover:text-hairy-primary"
                onClick={() => console.log('Search clicked')}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </div>

      <div className="pt-16 pb-20">
        <Card className="mx-4 mt-4 bg-white shadow-sm border-gray-100">
          <CardContent className="p-4">
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Balance</p>
                <h2 className="text-3xl font-bold text-hairy-primary">{balance} SOL</h2>
                <PriceChart />
              </div>
              
              <WalletActions />
              
              <TokenList />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
