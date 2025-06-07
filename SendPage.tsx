
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Shield, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useWallet } from "@/contexts/WalletContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  initializeHairyShield, 
  performCompleteSecurityCheck,
  SecurityAlert 
} from "@/security";

// Types
interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  logoUrl: string;
}

const SendPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subtractFromBalance, addTransaction } = useWallet();
  const [asset, setAsset] = useState<CryptoAsset | null>(null);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [assetResolutionAttempted, setAssetResolutionAttempted] = useState(false);
  const [securityAlert, setSecurityAlert] = useState<SecurityAlert | null>(null);
  const [securityCheckPassed, setSecurityCheckPassed] = useState(false);

  // Dirección simulada del usuario
  const userWalletAddress = "7Zw3iHRdBmghgg6YKG5zfYTj8GvJikX2cXZvPN6aTEWd";

  useEffect(() => {
    // Inicializar Hairy Shield
    const initSecurity = async () => {
      try {
        await initializeHairyShield(userWalletAddress);
        console.log('🛡️ Hairy Shield inicializado en SendPage');
      } catch (error) {
        console.error('Error inicializando seguridad:', error);
      }
    };

    initSecurity();

    // Resolver asset de navegación
    const state = location.state as { asset?: CryptoAsset };
    if (state?.asset) {
      setAsset(state.asset);
      console.log("Sending asset (from navigation state):", state.asset);
    }
    setAssetResolutionAttempted(true);
  }, [location.state]);

  // Verificación de seguridad automática cuando cambian dirección o monto
  useEffect(() => {
    const performSecurityCheck = async () => {
      if (!recipientAddress || !amount || !asset) {
        setSecurityAlert(null);
        setSecurityCheckPassed(false);
        return;
      }

      // Validación básica de dirección
      if (recipientAddress.length < 32) {
        return;
      }

      try {
        console.log('🔍 Realizando verificación de seguridad automática...');
        
        const alert = await performCompleteSecurityCheck(
          userWalletAddress,
          recipientAddress,
          parseFloat(amount),
          asset.symbol
        );

        if (alert) {
          setSecurityAlert(alert);
          setSecurityCheckPassed(false);
          console.log('⚠️ Alerta de seguridad detectada:', alert);
        } else {
          setSecurityAlert(null);
          setSecurityCheckPassed(true);
          console.log('✅ Verificación de seguridad pasada');
        }
      } catch (error) {
        console.error('Error en verificación de seguridad:', error);
      }
    };

    // Debounce para evitar muchas verificaciones
    const timeout = setTimeout(performSecurityCheck, 500);
    return () => clearTimeout(timeout);
  }, [recipientAddress, amount, asset]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipientAddress || !amount) {
      toast({
        title: "Error",
        description: "Por favor, complete todos los campos",
        variant: "destructive",
      });
      return;
    }

    // Validar dirección
    if (recipientAddress.length < 32) {
      toast({
        title: "Error",
        description: "Dirección no válida",
        variant: "destructive",
      });
      return;
    }

    // Verificar si hay alertas de seguridad críticas
    if (securityAlert && securityAlert.blocked) {
      toast({
        title: "🚫 Transacción Bloqueada",
        description: "Esta transacción ha sido bloqueada por motivos de seguridad",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simular envío de transacción
    setTimeout(() => {
      setIsLoading(false);
      
      if (asset) {
        subtractFromBalance(parseFloat(amount), asset.symbol);
        
        addTransaction({
          type: "send",
          amount: `${amount} ${asset.symbol}`,
          address: recipientAddress,
          status: "completed"
        });
      }
      
      toast({
        title: "✅ Transacción enviada con Hairy Shield",
        description: `${amount} ${asset?.symbol} enviado de forma segura`,
      });
      navigate("/dashboard");
    }, 2000);
  };

  const handleOverrideSecurity = () => {
    if (securityAlert && !securityAlert.blocked) {
      setSecurityAlert(null);
      setSecurityCheckPassed(true);
      toast({
        title: "Advertencia ignorada",
        description: "Procede con precaución",
        variant: "destructive",
      });
    }
  };

  if (!assetResolutionAttempted) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando página de envío...</p>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="container max-w-md mx-auto px-4 pb-20">
        <div className="flex items-center pt-4 pb-2 mb-6">
           <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-xl font-bold text-left">Enviar Criptomoneda</h1>
        </div>
        
        <p className="text-muted-foreground mb-6 text-center">
          Para enviar una criptomoneda, primero debes seleccionarla desde la pestaña "Mercado" o tu lista de activos en el Dashboard.
        </p>
        <Button 
          onClick={() => navigate("/dashboard")} 
          className="w-full bg-wallet-blue hover:bg-wallet-blue/90"
        >
          Volver al Dashboard para seleccionar
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto px-4 pb-20">
      {/* Header con indicador de seguridad */}
      <div className="flex items-center pt-4 pb-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft size={24} />
        </Button>
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Enviar {asset.symbol}</h1>
            <Shield className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground">Protegido por Hairy Shield</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <img 
            src={asset.logoUrl || `https://cryptoicons.org/api/icon/${asset.symbol.toLowerCase()}/30`}
            alt={asset.name}
            className="w-6 h-6 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/30';
            }}
          />
        </div>
      </div>

      {/* Alerta de seguridad */}
      {securityAlert && (
        <Alert className={`mb-4 ${securityAlert.severity === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-950' : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950'}`}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div>
              <strong>{securityAlert.title}</strong>
              <p className="text-sm mt-1">{securityAlert.message}</p>
              {!securityAlert.blocked && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleOverrideSecurity}
                  className="mt-2"
                >
                  Ignorar y continuar
                </Button>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      {/* Send Form */}
      <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20 mt-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Detalles de la transacción</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSend} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Dirección del destinatario</Label>
              <Input 
                id="recipient"
                placeholder="Escanea o pega la dirección"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="bg-wallet-navy/50 border-wallet-blue/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Cantidad</Label>
              <div className="relative">
                <Input 
                  id="amount"
                  placeholder="0.00"
                  type="number"
                  step="0.000001"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-wallet-navy/50 border-wallet-blue/30 pr-16"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-sm font-medium">{asset.symbol}</span>
                </div>
              </div>
              {amount && (
                <p className="text-xs text-muted-foreground">
                  ≈ {(parseFloat(amount) * asset.price).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                </p>
              )}
            </div>

            {/* Indicador de estado de seguridad */}
            {recipientAddress && amount && (
              <div className="flex items-center gap-2 text-sm">
                {securityCheckPassed ? (
                  <>
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-green-600">Verificación de seguridad pasada</span>
                  </>
                ) : securityAlert ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span className="text-yellow-600">Advertencia de seguridad</span>
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 border-2 border-t-transparent border-blue-500 rounded-full animate-spin" />
                    <span className="text-blue-600">Verificando seguridad...</span>
                  </>
                )}
              </div>
            )}
            
            <Button 
              type="submit"
              className="w-full bg-wallet-blue hover:bg-wallet-blue/90"
              disabled={isLoading || (securityAlert?.blocked)}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                  <span>Enviando...</span>
                </div>
              ) : (
                <>
                  <Send size={16} />
                  <span>Enviar {asset.symbol}</span>
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SendPage;
