
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Loader2, AlertCircle } from "lucide-react";

interface Transaction {
  id: string;
  type: "send" | "receive";
  amount: string;
  date: Date;
  address: string;
  status: "completed" | "pending" | "failed";
}

interface TransactionListProps {
  transactions: Transaction[];
  loading?: boolean;
  error?: string | null;
}

const TransactionList = ({ transactions, loading, error }: TransactionListProps) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <Loader2 className="h-6 w-6 animate-spin mb-2 text-wallet-blue" />
        <p className="text-muted-foreground">Cargando transacciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="h-6 w-6 mb-2 text-red-400" />
        <p className="text-red-400 text-sm">{error}</p>
        <p className="text-muted-foreground text-xs mt-1">
          Para una app en producción, configura un RPC endpoint privado
        </p>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-muted-foreground">No hay transacciones recientes</p>
        <p className="text-muted-foreground text-xs mt-1">
          Las transacciones aparecerán aquí cuando realices operaciones
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg mb-2 px-1">Transacciones recientes</h3>
      {transactions.map((tx) => (
        <Card key={tx.id} className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
          <CardHeader className="py-3 px-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm flex items-center">
                  <Badge variant={tx.type === "receive" ? "default" : "destructive"} className="mr-2">
                    {tx.type === "receive" ? "Recibido" : "Enviado"}
                  </Badge>
                  {tx.amount}
                </CardTitle>
                <CardDescription className="text-xs truncate max-w-[200px]">
                  {tx.address}
                </CardDescription>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(tx.date, { addSuffix: true, locale: es })}
                </span>
                <div>
                  <Badge 
                    variant={
                      tx.status === "completed" ? "default" : 
                      tx.status === "pending" ? "secondary" : "destructive"
                    }
                    className="text-xs"
                  >
                    {tx.status === "completed" ? "Completado" : 
                     tx.status === "pending" ? "Pendiente" : "Fallido"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default TransactionList;
