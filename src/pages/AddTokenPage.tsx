
import React, { useState } from 'react';
import { ArrowLeft, Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CustomButton } from '@/components/ui/custom-button';
import { toast } from '@/components/ui/sonner';

interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
}

const AddTokenPage = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [error, setError] = useState('');

  // Simulated token search - in a real app, this would connect to Solana blockchain
  const searchToken = async () => {
    if (!contractAddress || contractAddress.trim().length < 32) {
      setError('Por favor, introduce una dirección de contrato válida');
      return;
    }

    setLoading(true);
    setError('');
    setTokenInfo(null);

    try {
      // Simulate API call to fetch token data
      // In a real app, you would use @solana/web3.js or similar library
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we're simulating based on address length
      // In production, you would validate and query the Solana blockchain
      if (contractAddress.length >= 32) {
        // Mock response - this would be real token data in production
        setTokenInfo({
          name: "Solana Token " + contractAddress.substring(0, 5),
          symbol: "SOL" + contractAddress.substring(0, 3).toUpperCase(),
          decimals: 9,
          logoURI: "https://cryptologos.cc/logos/solana-sol-logo.png?v=029"
        });
      } else {
        setError('Token no encontrado. Verifica la dirección del contrato.');
      }
    } catch (err) {
      setError('Error al buscar el token. Inténtalo de nuevo.');
      console.error('Error searching token:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToken = () => {
    if (!tokenInfo) return;
    
    // In a real app, this would add the token to the user's wallet
    // For now, we'll just show a success toast
    toast.success('Token añadido correctamente', {
      description: `${tokenInfo.name} (${tokenInfo.symbol}) ha sido añadido a tu wallet`,
    });
    
    // Reset form
    setContractAddress('');
    setTokenInfo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 flex items-center border-b border-gray-200">
        <Link to="/wallet" className="mr-4">
          <ArrowLeft className="text-gray-600" />
        </Link>
        <h1 className="text-xl font-bold">Añadir Token Personalizado</h1>
      </header>

      {/* Main Content */}
      <div className="p-5 max-w-lg mx-auto">
        <div className="mb-6">
          <label htmlFor="contract-address" className="block text-sm font-medium text-gray-700 mb-2">
            Dirección del Contrato
          </label>
          <div className="flex space-x-2">
            <Input
              id="contract-address"
              placeholder="Pega la dirección del contrato del token"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              className="flex-grow"
            />
            <CustomButton 
              title="Buscar"
              icon={loading ? <Loader2 className="animate-spin" /> : <Search size={18} />}
              loading={loading}
              variant="primary"
              size="medium"
              onClick={searchToken}
              disabled={loading || contractAddress.trim().length === 0}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Introduce la dirección de contrato del token en la red Solana
          </p>
        </div>

        {error && (
          <Alert className="mb-6 bg-red-50 text-red-800 border-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {tokenInfo && (
          <Card className="mb-6 border-2 border-green-100">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                {tokenInfo.logoURI && (
                  <img src={tokenInfo.logoURI} alt={tokenInfo.name} className="w-10 h-10 rounded-full mr-3" />
                )}
                <div>
                  <h3 className="font-bold text-lg">{tokenInfo.name}</h3>
                  <p className="text-gray-600">{tokenInfo.symbol}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Símbolo</p>
                  <p className="font-medium">{tokenInfo.symbol}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Decimales</p>
                  <p className="font-medium">{tokenInfo.decimals}</p>
                </div>
              </div>
              
              <CustomButton
                title="Añadir Token"
                variant="primary"
                size="medium"
                className="w-full mt-2"
                onClick={handleAddToken}
              />
            </CardContent>
          </Card>
        )}

        <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
          <p className="font-medium text-blue-800 mb-1">Información</p>
          <p className="mb-2">
            Al añadir un token personalizado, asegúrate de que la dirección del contrato sea correcta. 
            Los tokens añadidos aparecerán en tu lista de activos en la wallet.
          </p>
          <p>
            Sólo añade tokens en los que confíes. La app no puede garantizar la seguridad de todos los tokens personalizados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddTokenPage;
