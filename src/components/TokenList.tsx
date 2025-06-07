
import React from 'react';
import { Card } from '@/components/ui/card';

const tokens = [
  {
    name: 'Solana',
    symbol: 'SOL',
    balance: '1.5',
    price: '$100.25',
    icon: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=029'
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    balance: '150.00',
    price: '$1.00',
    icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=029'
  }
];

export const TokenList = () => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium mb-3">Tokens</h3>
      {tokens.map((token, index) => (
        <Card key={index} className="p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-3">
            <img src={token.icon} alt={token.name} className="w-8 h-8" />
            <div>
              <h4 className="font-medium">{token.name}</h4>
              <p className="text-sm text-gray-500">{token.balance} {token.symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">{token.price}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
