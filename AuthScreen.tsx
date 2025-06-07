
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeyRound } from "lucide-react";
import PinInput from "@/components/auth/PinInput";
import PatternLock from "@/components/auth/PatternLock";
import { toast } from "sonner";

const AuthScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasAuth, setHasAuth] = useState(false);
  const [authMethod, setAuthMethod] = useState<"pin" | "pattern">("pin");
  const [animating, setAnimating] = useState(false);
  const [isCreatingNewWallet, setIsCreatingNewWallet] = useState(false);

  // Check if user has setup auth before and if they're creating a new wallet
  useEffect(() => {
    const savedPin = localStorage.getItem("hairy-wallet-pin");
    const savedPattern = localStorage.getItem("hairy-wallet-pattern");
    const walletCreated = localStorage.getItem("walletCreated");
    
    // Check if method is specified in URL params
    const params = new URLSearchParams(location.search);
    const methodParam = params.get("method");
    const fromWelcome = params.get("from") === "welcome";
    
    // If coming from welcome screen without existing wallet, it's a new wallet creation
    if (fromWelcome && !walletCreated) {
      setIsCreatingNewWallet(true);
      setHasAuth(false);
    } else if (methodParam === "pattern") {
      setAuthMethod("pattern");
      setIsCreatingNewWallet(!walletCreated);
      setHasAuth(!!savedPattern && !!walletCreated);
    } else if (methodParam === "pin") {
      setAuthMethod("pin");
      setIsCreatingNewWallet(!walletCreated);
      setHasAuth(!!savedPin && !!walletCreated);
    } else {
      // Default behavior based on saved auth
      if (savedPin && walletCreated) {
        setAuthMethod("pin");
        setHasAuth(true);
        setIsCreatingNewWallet(false);
      } else if (savedPattern && walletCreated) {
        setAuthMethod("pattern");
        setHasAuth(true);
        setIsCreatingNewWallet(false);
      } else {
        setHasAuth(false);
        setIsCreatingNewWallet(true);
      }
    }
  }, [location]);

  const handleAuthSuccess = () => {
    setAnimating(true);
    toast.success("¡Acceso concedido!");
    
    setTimeout(() => {
      if (isCreatingNewWallet) {
        // If creating new wallet, go to seed phrase generation
        navigate("/seed-phrase");
      } else {
        // If logging in, go to dashboard
        navigate("/dashboard");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-wallet-navy to-black">
      <div className={`transition-all duration-1000 ease-in-out transform ${
        animating ? "scale-110 opacity-0" : "scale-100 opacity-100"
      }`}>
        <div className="max-w-md w-full mx-auto text-center mb-8">
          <div className="relative w-32 h-32 mx-auto animate-float">
            <img
              src="/lovable-uploads/4db084ef-58e0-4fc0-9fc5-d5c5527604a5.png"
              alt="Hairy Wallet Logo"
              className="w-full h-full object-contain"
            />
          </div>
          
          <h1 className="text-4xl font-bold mt-6">
            <span className="text-wallet-blue glow-text">$HBT</span> 
            <span className="text-wallet-pink glow-text-pink ml-2">HAIRY WALLET</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            {isCreatingNewWallet ? "Configura tu método de acceso" : "Bienvenido de nuevo a tu wallet"}
          </p>
        </div>
        
        <Card className="max-w-md w-full mx-auto bg-card/50 backdrop-blur-sm border-wallet-blue/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-lg">
              {isCreatingNewWallet ? "Configura tu acceso" : "Accede a tu wallet"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center p-6">
            {!hasAuth || isCreatingNewWallet ? (
              <Tabs defaultValue={authMethod} className="w-full">
                <TabsList className="grid grid-cols-2 w-full mb-6">
                  <TabsTrigger value="pin" onClick={() => setAuthMethod("pin")}>PIN</TabsTrigger>
                  <TabsTrigger value="pattern" onClick={() => setAuthMethod("pattern")}>Patrón</TabsTrigger>
                </TabsList>
                <TabsContent value="pin">
                  <PinInput isSetup={true} onSuccess={handleAuthSuccess} />
                </TabsContent>
                <TabsContent value="pattern">
                  <PatternLock isSetup={true} onSuccess={handleAuthSuccess} />
                </TabsContent>
              </Tabs>
            ) : (
              authMethod === "pin" ? (
                <PinInput isSetup={false} onSuccess={handleAuthSuccess} />
              ) : (
                <PatternLock isSetup={false} onSuccess={handleAuthSuccess} />
              )
            )}
          </CardContent>
        </Card>
        
        <div className="w-full max-w-md mx-auto mt-4 text-center">
          <Button
            onClick={() => navigate('/welcome')}
            variant="ghost"
            className="text-white hover:text-gray-200"
          >
            Volver a opciones de acceso
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
