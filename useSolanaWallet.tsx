
import { useState, useEffect } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

export interface SolanaTransaction {
  signature: string;
  blockTime: number | null;
  slot: number;
  amount?: number;
  type: 'send' | 'receive';
  status: 'completed' | 'pending' | 'failed';
}

export const useSolanaWallet = (walletAddress: string) => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<SolanaTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Usar tu endpoint privado de Helius para mejor confiabilidad
  const getConnection = () => {
    const heliusEndpoint = `https://mainnet.helius-rpc.com/?api-key=d6a32a12-2550-4725-83e6-8404c2d4d6b5`;
    return new Connection(heliusEndpoint, {
      commitment: 'confirmed',
      confirmTransactionInitialTimeout: 30000
    });
  };

  const fetchBalance = async () => {
    try {
      const connection = getConnection();
      const publicKey = new PublicKey(walletAddress);
      const balanceInLamports = await connection.getBalance(publicKey);
      const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
      setBalance(balanceInSOL);
      console.log('Balance fetched successfully with Helius:', balanceInSOL);
      setError(null);
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError('No se pudo conectar con la red Solana. Verifica tu conexión a internet.');
      setBalance(0);
    }
  };

  const fetchTransactions = async () => {
    try {
      console.log('Fetching transactions for address with Helius:', walletAddress);
      const connection = getConnection();
      const publicKey = new PublicKey(walletAddress);
      
      // Obtener las últimas transacciones
      const signatures = await connection.getSignaturesForAddress(publicKey, { 
        limit: 20
      });
      
      console.log('Found signatures:', signatures.length);

      if (signatures.length === 0) {
        console.log('No transactions found');
        setTransactions([]);
        return;
      }

      const transactionDetails = [];
      
      // Procesar hasta 10 transacciones con mejor endpoint
      const limitedSignatures = signatures.slice(0, 10);
      
      for (const sig of limitedSignatures) {
        try {
          const transaction = await connection.getTransaction(sig.signature, {
            maxSupportedTransactionVersion: 0,
            commitment: 'confirmed'
          });
          
          if (!transaction || !transaction.meta) {
            console.log('Transaction not found or has no meta:', sig.signature);
            continue;
          }

          // Determinar si es envío o recepción y el monto
          const accountKeys = transaction.transaction.message.staticAccountKeys || [];
          const accountIndex = accountKeys.findIndex(
            key => key.toString() === walletAddress
          );
          
          let type: 'send' | 'receive' = 'receive';
          let amount = 0;

          if (transaction.meta.preBalances && transaction.meta.postBalances && accountIndex >= 0) {
            const preBalance = transaction.meta.preBalances[accountIndex] || 0;
            const postBalance = transaction.meta.postBalances[accountIndex] || 0;
            const balanceChange = postBalance - preBalance;
            
            type = balanceChange > 0 ? 'receive' : 'send';
            amount = Math.abs(balanceChange) / LAMPORTS_PER_SOL;
          } else {
            // Usar fee como cantidad mínima si no se puede determinar el cambio
            amount = (transaction.meta.fee || 0) / LAMPORTS_PER_SOL;
            type = 'send';
          }

          transactionDetails.push({
            signature: sig.signature,
            blockTime: transaction.blockTime,
            slot: transaction.slot,
            amount,
            type,
            status: sig.err ? 'failed' : 'completed'
          } as SolanaTransaction);

          console.log('Processed transaction:', sig.signature.slice(0, 8));
          
        } catch (txError) {
          console.error('Error processing transaction:', sig.signature, txError);
          continue;
        }
      }

      console.log('Successfully processed transactions with Helius:', transactionDetails.length);
      setTransactions(transactionDetails);
      setError(null);
      
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('No se pudieron cargar las transacciones. Reintentando...');
      setTransactions([]);
    }
  };

  useEffect(() => {
    const loadWalletData = async () => {
      if (!walletAddress) {
        console.log('No wallet address provided');
        setLoading(false);
        return;
      }

      console.log('Loading wallet data with Helius for:', walletAddress);
      setLoading(true);
      setError(null);
      
      try {
        // Cargar balance y transacciones con endpoint privado
        await Promise.allSettled([
          fetchBalance(),
          fetchTransactions()
        ]);
      } catch (err) {
        console.error('Error loading wallet data:', err);
        setError('Error al conectar con la red Solana');
      } finally {
        setLoading(false);
      }
    };

    loadWalletData();
  }, [walletAddress]);

  const refreshData = async () => {
    console.log('Refreshing wallet data with Helius...');
    setError(null);
    setLoading(true);
    
    try {
      await Promise.allSettled([
        fetchBalance(),
        fetchTransactions()
      ]);
      console.log('Data refreshed successfully with Helius');
    } catch (err) {
      console.error('Error refreshing data:', err);
      setError('Error al actualizar los datos');
    } finally {
      setLoading(false);
    }
  };

  return {
    balance,
    transactions,
    loading,
    error,
    refreshData
  };
};
