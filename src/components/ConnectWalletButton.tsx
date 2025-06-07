import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

const ConnectWalletButton = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Detecta si ya está conectada una wallet
  useEffect(() => {
    const checkWallet = async () => {
      const provider = (window as any).solana;
      if (provider?.isConnected && provider?.publicKey) {
        setWalletAddress(provider.publicKey.toString());
      }
    };
    checkWallet();
  }, []);

  const connectWallet = async () => {
    try {
      const provider = (window as any).solana;

      if (provider) {
        const response = await provider.connect();
        const pubKey = response.publicKey.toString();
        setWalletAddress(pubKey);

        toast({
          title: "Wallet conectada",
          description: `Dirección: ${truncateAddress(pubKey)}`,
        });
      } else {
        toast({
          title: "Wallet no detectada",
          description: "Instala Phantom o Solflare para continuar.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      console.error("Error al conectar wallet:", err);
      toast({
        title: "Error al conectar",
        description: err.message || "Algo salió mal.",
        variant: "destructive",
      });
    }
  };

  const truncateAddress = (address: string) =>
    `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <button
      onClick={connectWallet}
      className="bg-hairy-primary hover:bg-hairy-primary/90 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all"
    >
      {walletAddress ? truncateAddress(walletAddress) : "Conectar Wallet"}
    </button>
  );
};

export default ConnectWalletButton;