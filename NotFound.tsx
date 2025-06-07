
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <img
            src="/lovable-uploads/8b3a744c-2ea5-48ad-b4b7-93b9eb8d808e.png"
            alt="Hairy Wallet Logo"
            className="w-full h-full object-contain opacity-50"
          />
        </div>
        
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-xl font-semibold mb-4">Página no encontrada</h2>
        <p className="mb-8 text-muted-foreground">
          Parece que te has perdido en el mundo cripto. Esta página no existe.
        </p>
        
        <Button 
          onClick={() => navigate('/')}
          className="bg-wallet-blue text-white hover:bg-wallet-blue/90"
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
