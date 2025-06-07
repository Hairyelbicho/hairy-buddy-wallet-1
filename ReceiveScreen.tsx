import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Copy, Share2, Shield } from "lucide-react";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useWallet } from "@/contexts/WalletContext";
import { 
  initializeHairyShield,
  verifyIncomingTransaction 
} from "@/security";

const ReceiveScreen = () => {
  const navigate = useNavigate();
  const { addTransaction, updateBalance } = useWallet();
  const [selectedToken, setSelectedToken] = useState("sol");
  const [copied, setCopied] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  
  const walletAddress = "7Zw3iHRdBmghgg6YKG5zfYTj8GvJikX2cXZvPN6aTEWd";
  
  const tokens = [
    { id: "sol", name: "Solana (SOL)", logo: "https://cryptologos.cc/logos/solana-sol-logo.png?v=029", symbol: "SOL" },
    { id: "usdc", name: "USD Coin (USDC)", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=029", symbol: "USDC" },
    { id: "hbt", name: "Hairy Token (HBT)", logo: "/lovable-uploads/8b3a744c-2ea5-48ad-b4b7-93b9eb8d808e.png", symbol: "HBT" },
  ];
  
  useEffect(() => {
    // Inicializar Hairy Shield para protección de recepción
    const initSecurity = async () => {
      try {
        await initializeHairyShield(walletAddress);
        console.log('🛡️ Hairy Shield inicializado en ReceiveScreen');
      } catch (error) {
        console.error('Error inicializando seguridad:', error);
      }
    };

    initSecurity();
  }, []);
  
  // Simulate receiving a transaction with security verification
  const simulateReceiveTransaction = async () => {
    const selectedTokenInfo = tokens.find(t => t.id === selectedToken);
    if (!selectedTokenInfo) return;

    const amounts = {
      sol: "0.5",
      usdc: "25.0", 
      hbt: "1000"
    };
    
    const amount = amounts[selectedToken as keyof typeof amounts];
    const mockSenderAddress = "9ZNTfG4NyQgxy2SWjSiQoUyBPEvXT2xo7fKc5hPYYJ7b";
    
    try {
      // Verificar transacción entrante con Hairy Shield
      console.log('🛡️ Verificando transacción entrante con Hairy Shield...');
      
      const securityAlert = await verifyIncomingTransaction({
        toAddress: walletAddress,
        fromAddress: mockSenderAddress,
        amount: parseFloat(amount),
        tokenSymbol: selectedTokenInfo.symbol
      });

      if (securityAlert) {
        console.log('⚠️ Alerta de seguridad en recepción:', securityAlert);
        
        if (securityAlert.blocked) {
          toast.error(`🚫 Transacción bloqueada: ${securityAlert.message}`);
          return;
        } else {
          toast.warning(`⚠️ ${securityAlert.title}: ${securityAlert.message}`);
        }
      }

      // Procesar transacción si es segura
      addTransaction({
        type: "receive",
        amount: `${amount} ${selectedTokenInfo.symbol}`,
        address: mockSenderAddress,
        status: "completed"
      });

      // Update balance if it's SOL (for demo)
      if (selectedToken === "sol") {
        const currentBalance = parseFloat("12.345");
        const newBalance = currentBalance + parseFloat(amount);
        updateBalance(`${newBalance.toFixed(6)} SOL`);
      }

      toast.success(`✅ ¡Recibido con seguridad! ${amount} ${selectedTokenInfo.symbol} de ${mockSenderAddress.slice(0, 6)}...${mockSenderAddress.slice(-4)}`);
      
    } catch (error) {
      console.error('Error en verificación de seguridad de recepción:', error);
      toast.error('Error al verificar la transacción entrante');
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast.success("Dirección copiada al portapapeles");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const shareAddress = () => {
    setShareDialogOpen(true);
  };
  
  const handleShareOption = (option: string) => {
    setShareDialogOpen(false);
    
    const text = `Mi dirección de wallet Solana: ${walletAddress}`;
    const title = 'Mi dirección de wallet Solana';
    
    switch(option) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        toast.success("Abriendo WhatsApp para compartir");
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text)}`, '_blank');
        toast.success("Abriendo email para compartir");
        break;
      case 'native':
        if (navigator.share) {
          navigator.share({
            title: title,
            text: text,
          }).then(() => {
            toast.success("Compartido exitosamente");
          }).catch((error) => {
            console.error('Error al compartir:', error);
            copyToClipboard();
            toast.info("No se pudo compartir. La dirección ha sido copiada al portapapeles.");
          });
        } else {
          copyToClipboard();
          toast.info("Compartir no está disponible en este dispositivo. Dirección copiada al portapapeles.");
        }
        break;
      default:
        copyToClipboard();
    }
  };
  
  const selectedTokenInfo = tokens.find(t => t.id === selectedToken);
  
  return (
    <div className="container max-w-md mx-auto px-4 pb-20 pt-6">
      <Button 
        variant="ghost" 
        className="mb-4 flex items-center text-white"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} className="mr-2" />
        Volver
      </Button>
      
      <Card className="bg-card/80 backdrop-blur-sm border-wallet-blue/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-center gap-2">
            <CardTitle className="text-center text-xl">Recibir</CardTitle>
            <Shield className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-center text-sm text-muted-foreground">Protegido por Hairy Shield</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={selectedToken}
            onValueChange={setSelectedToken}
          >
            <SelectTrigger className="bg-wallet-navy border-wallet-blue/30">
              <SelectValue placeholder="Seleccionar token" />
            </SelectTrigger>
            <SelectContent className="bg-wallet-navy border-wallet-blue/30">
              {tokens.map(token => (
                <SelectItem key={token.id} value={token.id}>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center mr-2">
                      <img 
                        src={token.logo}
                        alt={token.name}
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                    <span>{token.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex flex-col items-center justify-center pt-4 pb-2">
            <div className="bg-white p-4 rounded-lg mb-4">
              <QRCodeSVG
                value={walletAddress}
                size={192}
                level="M"
                includeMargin={true}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
            
            <div className="text-center">
              <p className="text-muted-foreground mb-1">Dirección de {selectedTokenInfo?.name}</p>
              <p className="text-sm font-mono bg-wallet-blue/10 py-2 px-3 rounded-md border border-wallet-blue/20">
                {`${walletAddress.slice(0, 10)}...${walletAddress.slice(-10)}`}
              </p>
            </div>
            
            {/* Demo button with security protection */}
            <Button 
              onClick={simulateReceiveTransaction}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              🎮 Simular recibir {selectedTokenInfo?.symbol} (Protegido)
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button 
            variant="outline" 
            className="border-wallet-blue text-wallet-blue hover:bg-wallet-blue/10"
            onClick={copyToClipboard}
          >
            <Copy size={16} className={`mr-2 ${copied ? 'text-green-400' : ''}`} />
            Copiar
          </Button>
          
          <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="border-wallet-blue text-wallet-blue hover:bg-wallet-blue/10"
                onClick={shareAddress}
              >
                <Share2 size={16} className="mr-2" />
                Compartir
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-wallet-navy border-wallet-blue/30">
              <DialogHeader>
                <DialogTitle>Compartir dirección</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-3 py-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-wallet-blue/30 hover:bg-wallet-blue/10"
                  onClick={() => handleShareOption('whatsapp')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500">
                    <path d="M3 3l10 10"></path>
                    <circle cx="8" cy="8" r="6"></circle>
                  </svg>
                  WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-wallet-blue/30 hover:bg-wallet-blue/10"
                  onClick={() => handleShareOption('email')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-500">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  Email
                </Button>
                {navigator.share && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-wallet-blue/30 hover:bg-wallet-blue/10"
                  onClick={() => handleShareOption('native')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-purple-500">
                    <path d="m4 12 8-8 8 8"></path>
                    <path d="M12 4v16"></path>
                  </svg>
                  Compartir dispositivo
                </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReceiveScreen;
