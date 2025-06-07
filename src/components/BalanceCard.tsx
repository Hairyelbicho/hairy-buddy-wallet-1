
import { Card, CardContent } from "@/components/ui/card";

interface BalanceCardProps {
  totalBalance: number;
  currency?: string;
}

const BalanceCard = ({ totalBalance, currency = "USD" }: BalanceCardProps) => {
  return (
    <Card className="w-full gradient-bg text-white mb-6">
      <CardContent className="p-6">
        <h2 className="text-lg font-medium text-white/80">Total Balance</h2>
        <div className="flex items-baseline mt-2">
          <span className="text-3xl font-bold">{currency === "USD" ? "$" : ""}{totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          {currency !== "USD" && <span className="ml-1">{currency}</span>}
        </div>
        <div className="mt-6 flex justify-between gap-4">
          <button className="bg-white/20 hover:bg-white/30 transition-colors text-white py-2 rounded-lg flex-1 backdrop-blur-sm">
            Send
          </button>
          <button className="bg-white/20 hover:bg-white/30 transition-colors text-white py-2 rounded-lg flex-1 backdrop-blur-sm">
            Receive
          </button>
          <button className="bg-white/20 hover:bg-white/30 transition-colors text-white py-2 rounded-lg flex-1 backdrop-blur-sm">
            Buy
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
