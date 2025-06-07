
import { useQuery } from '@tanstack/react-query';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  logoUrl: string;
}

const fetchCryptoData = async (): Promise<CryptoData[]> => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=solana,bitcoin,ethereum,usd-coin&order=market_cap_desc&per_page=4&page=1&sparkline=false'
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch crypto data');
  }
  
  return response.json();
};

export const useCryptoData = () => {
  return useQuery({
    queryKey: ['cryptoData'],
    queryFn: fetchCryptoData,
    refetchInterval: 30000, // Actualizar cada 30 segundos
    staleTime: 10000, // Considerar datos obsoletos después de 10 segundos
  });
};

export const transformCryptoData = (data: CryptoData[]): CryptoAsset[] => {
  const cryptoMap: { [key: string]: Partial<CryptoAsset> } = {
    'solana': { id: 'sol' },
    'bitcoin': { id: 'btc' },
    'ethereum': { id: 'eth' },
    'usd-coin': { id: 'usdc' }
  };

  const transformedData = data.map(crypto => ({
    id: cryptoMap[crypto.id]?.id || crypto.id,
    name: crypto.name,
    symbol: crypto.symbol.toUpperCase(),
    price: crypto.current_price,
    change24h: crypto.price_change_percentage_24h || 0,
    logoUrl: crypto.image,
  }));

  // Agregar HBT manualmente ya que no está en CoinGecko
  transformedData.push({
    id: "hbt",
    name: "Hairy Token",
    symbol: "HBT",
    price: 0.000003316,
    change24h: 12.45,
    logoUrl: "/lovable-uploads/8b3a744c-2ea5-48ad-b4b7-93b9eb8d808e.png",
  });

  return transformedData;
};
