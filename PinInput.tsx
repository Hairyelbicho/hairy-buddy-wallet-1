
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";

interface PinInputProps {
  isSetup: boolean;
  onSuccess: () => void;
}

const PinInput = ({ isSetup, onSuccess }: PinInputProps) => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [step, setStep] = useState(isSetup ? "create" : "verify");
  const [attempts, setAttempts] = useState(0);
  const [savedPin, setSavedPin] = useState<string | null>(null);
  
  useEffect(() => {
    const storedPin = localStorage.getItem("hairy-wallet-pin");
    setSavedPin(storedPin);
  }, []);
  
  const handlePinChange = (value: string) => {
    setPin(value);
    
    // If verifying and PIN is complete, check automatically
    if (!isSetup && value.length === 4) {
      setTimeout(() => validatePin(value), 300);
    }
  };
  
  const handleConfirmPinChange = (value: string) => {
    setConfirmPin(value);
  };
  
  const handleCreatePin = () => {
    if (pin.length < 4) {
      toast.error("El PIN debe tener 4 dígitos");
      return;
    }
    
    setStep("confirm");
  };
  
  const handleConfirmPin = () => {
    if (pin !== confirmPin) {
      toast.error("Los PINs no coinciden. Inténtalo de nuevo.");
      setConfirmPin("");
      return;
    }
    
    localStorage.setItem("hairy-wallet-pin", pin);
    toast.success("PIN configurado correctamente");
    onSuccess();
  };
  
  const validatePin = (inputPin: string) => {
    if (inputPin === savedPin) {
      toast.success("PIN correcto");
      onSuccess();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        toast.error("Demasiados intentos fallidos. Prueba otra forma de acceso.");
      } else {
        toast.error(`PIN incorrecto. Intentos restantes: ${3 - newAttempts}`);
      }
      
      setPin("");
    }
  };
  
  const handleResetPin = () => {
    localStorage.removeItem("hairy-wallet-pin");
    window.location.reload();
  };
  
  if (step === "create" && isSetup) {
    return (
      <div className="flex flex-col items-center">
        <div className="bg-wallet-blue/10 rounded-full p-3 mb-4">
          <KeyRound className="h-6 w-6 text-wallet-blue" />
        </div>
        <h3 className="text-lg font-medium mb-1">Crea tu PIN</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Establece un código PIN de 4 dígitos para acceder a tu wallet
        </p>
        
        <InputOTP 
          value={pin} 
          onChange={handlePinChange} 
          maxLength={4}
          pattern="[0-9]*"
          inputMode="numeric"
          className="mb-6"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        
        <Button 
          onClick={handleCreatePin} 
          className="w-full bg-wallet-blue hover:bg-wallet-blue/90"
          disabled={pin.length < 4}
        >
          Continuar
        </Button>
      </div>
    );
  }
  
  if (step === "confirm" && isSetup) {
    return (
      <div className="flex flex-col items-center">
        <div className="bg-wallet-blue/10 rounded-full p-3 mb-4">
          <KeyRound className="h-6 w-6 text-wallet-blue" />
        </div>
        <h3 className="text-lg font-medium mb-1">Confirma tu PIN</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Vuelve a introducir tu PIN para confirmarlo
        </p>
        
        <InputOTP 
          value={confirmPin} 
          onChange={handleConfirmPinChange} 
          maxLength={4}
          pattern="[0-9]*"
          inputMode="numeric"
          className="mb-6"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        
        <div className="flex gap-2 w-full">
          <Button 
            onClick={() => setStep("create")} 
            variant="outline" 
            className="flex-1"
          >
            Atrás
          </Button>
          <Button 
            onClick={handleConfirmPin} 
            className="flex-1 bg-wallet-blue hover:bg-wallet-blue/90"
            disabled={confirmPin.length < 4}
          >
            Confirmar
          </Button>
        </div>
      </div>
    );
  }
  
  // Verify existing PIN
  return (
    <div className="flex flex-col items-center">
      <div className="bg-wallet-blue/10 rounded-full p-3 mb-4">
        <KeyRound className="h-6 w-6 text-wallet-blue" />
      </div>
      <h3 className="text-lg font-medium mb-1">Introduce tu PIN</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Introduce tu código PIN de 4 dígitos
      </p>
      
      <InputOTP 
        value={pin} 
        onChange={handlePinChange} 
        maxLength={4}
        pattern="[0-9]*"
        inputMode="numeric"
        className="mb-6"
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      
      <Button 
        onClick={() => validatePin(pin)} 
        className="w-full bg-wallet-blue hover:bg-wallet-blue/90"
        disabled={pin.length < 4}
      >
        Desbloquear
      </Button>
      
      <button 
        onClick={handleResetPin}
        className="mt-6 text-sm text-muted-foreground underline"
      >
        He olvidado mi PIN
      </button>
    </div>
  );
};

export default PinInput;
