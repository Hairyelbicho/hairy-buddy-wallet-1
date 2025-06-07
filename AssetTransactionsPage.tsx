
import { useParams, useLocation, useNavigate } from "react-router-dom";
import TransactionList from "@/components/TransactionList"; // Reutilizamos TransactionList
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Mock data - similar to Dashboard.tsx
// En una aplicación real, estos datos vendrían de una API filtrados por el assetId
const mockTransactionsAll = [
  {
    id: "tx1",
    type: "receive" as const,
    amount: "0.34 SOL",
    date: new Date(2025, 0, 28), // Año actual para relevancia
    address: "7Zw3iHRdBmghgg6YKG5zfYTj8GvJikX2cXZvPN6aTEWd",
    status: "completed" as const,
  },
  {
    id: "tx2",
    type: "send" as const,
    amount: "0.12 SOL",
    date: new Date(2025, 0, 27),
    address: "9ZNTfG4NyQgxy2SWjSiQoUyBPEvXT2xo7fKc5hPYYJ7b",
    status: "completed" as const,
  },
  {
    id: "tx3",
    type: "receive" as const,
    amount: "15.2 USDC",
    date: new Date(2025, 0, 26),
    address: "5ZNTfG4NyQgxy2SWjSiQoUyBPEvXT2xo7fKc5hPYYJ7b",
    status: "pending" as const,
  },
  {
    id: "tx4",
    type: "send" as const,
    amount: "0.001 BTC",
    date: new Date(2025, 0, 25),
    address: "1BitcoinAddress...",
    status: "completed" as const,
  },
  {
    id: "tx5",
    type: "receive" as const,
    amount: "50 HBT",
    date: new Date(2025, 0, 24),
    address: "HairyTokenReceiver...",
    status: "completed" as const,
  },
];

const AssetTransactionsPage = () => {
  const { assetId } = useParams<{ assetId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const assetSymbol = location.state?.assetSymbol || assetId?.toUpperCase();

  // Filtrar transacciones por el símbolo del activo (simple filter based on amount string)
  const filteredTransactions = mockTransactionsAll.filter(tx => 
    assetSymbol ? tx.amount.toUpperCase().includes(assetSymbol) : true
  );

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2 text-white hover:bg-wallet-blue/20">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-white">
          Transacciones de {assetSymbol || 'Activo'}
        </h1>
      </div>
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
};

export default AssetTransactionsPage;
