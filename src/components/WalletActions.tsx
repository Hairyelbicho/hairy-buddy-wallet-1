
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDownUp, SendHorizontal, Plus, CreditCard } from 'lucide-react';

export const WalletActions = () => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <Button
        variant="ghost"
        className="flex flex-col items-center p-2 hover:bg-blue-500/20"
        onClick={() => console.log('Send clicked')}
      >
        <SendHorizontal className="h-6 w-6 mb-1" />
        <span className="text-xs">Send</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-col items-center p-2 hover:bg-blue-500/20"
        onClick={() => console.log('Receive clicked')}
      >
        <Plus className="h-6 w-6 mb-1" />
        <span className="text-xs">Receive</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-col items-center p-2 hover:bg-blue-500/20"
        onClick={() => console.log('Swap clicked')}
      >
        <ArrowDownUp className="h-6 w-6 mb-1" />
        <span className="text-xs">Swap</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-col items-center p-2 hover:bg-blue-500/20"
        onClick={() => console.log('Buy clicked')}
      >
        <CreditCard className="h-6 w-6 mb-1" />
        <span className="text-xs">Buy</span>
      </Button>
    </div>
  );
};
