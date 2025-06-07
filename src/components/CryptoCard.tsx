
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface CryptoCardProps {
  name: string;
  symbol: string;
  balance: number;
  dollarValue: number;
  change: number;
  iconUrl: string;
}

const CryptoCard = ({ name, symbol, balance, dollarValue, change, iconUrl }: CryptoCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <Card className="w-full mb-4 border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="flex items-center p-4">
        <div className="flex-shrink-0 mr-4">
          <img src={iconUrl} alt={name} className="w-12 h-12 rounded-full" />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-gray-500">{symbol}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{balance.toFixed(4)} {symbol}</p>
              <p className="text-sm text-gray-600">${dollarValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className={`ml-4 px-2 py-1 rounded-full flex items-center ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span className="text-xs ml-1">{Math.abs(change)}%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoCard;
