
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MarketItemProps {
  name: string;
  symbol: string;
  price: number;
  change: number;
  iconUrl: string;
  volume: string;
  marketCap: string;
}

const MarketItem = ({ name, symbol, price, change, iconUrl, volume, marketCap }: MarketItemProps) => {
  const isPositive = change >= 0;
  
  return (
    <Card className="w-full mb-3 border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            <img src={iconUrl} alt={name} className="w-9 h-9 rounded-full" />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{name}</h3>
                <p className="text-xs text-gray-500">{symbol}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${price.toFixed(2)}</p>
                <div className={`px-2 py-0.5 rounded-full inline-flex items-center ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  <span className="text-xs ml-1">{Math.abs(change)}%</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-2 text-xs text-gray-500">
              <div>
                <span>Vol: </span>
                <span>{volume}</span>
              </div>
              <div>
                <span>Cap: </span>
                <span>{marketCap}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketItem;
