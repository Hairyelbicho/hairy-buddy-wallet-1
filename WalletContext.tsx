
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useSolanaWallet } from '@/hooks/useSolanaWallet';

interface Transaction {
  id: string;
  type: "send" | "receive";
  amount: string;
  date: Date;
  address: string;
  status: "completed" | "pending" | "failed";
}

interface WalletContextType {
  balance: string;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  updateBalance: (newBalance: string) => void;
  subtractFromBalance: (amount: number, symbol: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  refreshData: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const walletAddress = "7Zw3iHRdBmghgg6YKG5zfYTj8GvJikX2cXZvPN6aTEWd";
  const { balance: solBalance, transactions: solTransactions, loading, error, refreshData } = useSolanaWallet(walletAddress);
  
  const [localBalance, setLocalBalance] = useState("");
  const [localTransactions, setLocalTransactions] = useState<Transaction[]>([]);

  // Convertir transacciones de Solana al formato de la aplicación
  useEffect(() => {
    const formattedTransactions = solTransactions.map((tx, index) => ({
      id: tx.signature || `tx_${index}`,
      type: tx.type,
      amount: `${tx.amount?.toFixed(6) || '0'} SOL`,
      date: tx.blockTime ? new Date(tx.blockTime * 1000) : new Date(),
      address: tx.signature ? `${tx.signature.slice(0, 6)}...${tx.signature.slice(-4)}` : 'Unknown',
      status: tx.status
    }));
    
    setLocalTransactions(formattedTransactions);
  }, [solTransactions]);

  // Actualizar balance cuando cambie el balance de Solana
  useEffect(() => {
    setLocalBalance(`${solBalance.toFixed(6)} SOL`);
  }, [solBalance]);

  const updateBalance = (newBalance: string) => {
    setLocalBalance(newBalance);
  };

  const subtractFromBalance = (amount: number, symbol: string) => {
    const currentAmount = parseFloat(localBalance.split(' ')[0]);
    const newAmount = Math.max(0, currentAmount - amount);
    setLocalBalance(`${newAmount.toFixed(6)} ${symbol}`);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx_${Date.now()}`,
      date: new Date(),
    };
    setLocalTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <WalletContext.Provider value={{
      balance: localBalance || `${solBalance.toFixed(6)} SOL`,
      transactions: localTransactions,
      loading,
      error,
      updateBalance,
      subtractFromBalance,
      addTransaction,
      refreshData
    }}>
      {children}
    </WalletContext.Provider>
  );
};
