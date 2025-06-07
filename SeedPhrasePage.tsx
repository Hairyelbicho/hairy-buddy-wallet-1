
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockGenerateSeedPhrase = () => {
  // En una aplicación real, esto vendría de la biblioteca de Solana
  const words = [
    "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract",
    "absurd", "abuse", "access", "accident", "account", "accuse", "achieve", "acid",
    "acoustic", "acquire", "across", "act", "action", "actor", "address", "adjust"
  ];
  
  const seedPhrase = [];
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    seedPhrase.push(words[randomIndex]);
  }
  
  return seedPhrase.join(" ");
};

const SeedPhrasePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [seedPhrase, setSeedPhrase] = useState("");
  const [copied, setCopied] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Generate seed phrase on component mount
    const phrase = mockGenerateSeedPhrase();
    setSeedPhrase(phrase);
    
    // Store the seed phrase in session storage for verification
    sessionStorage.setItem("tempSeedPhrase", phrase);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(seedPhrase);
    setCopied(true);
    toast({
      title: "¡Copiado!",
      description: "Frase semilla copiada al portapapeles.",
      duration: 2000,
    });

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleContinue = () => {
    setAnimating(true);
    setTimeout(() => {
      navigate('/verify-seed');
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-background/80">
      <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-wallet-blue/20">
        <CardHeader>
          <CardTitle className="text-center text-xl">Tu frase semilla</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-md">
            <p className="text-center break-words font-mono">{seedPhrase}</p>
          </div>
          
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-4">
            <p className="text-yellow-500 text-sm">
              <strong>¡IMPORTANTE!</strong> Guarda esta frase en un lugar seguro. 
              Es la única forma de recuperar tu wallet si pierdes el acceso.
              Nunca compartas esta frase con nadie.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button 
            onClick={handleCopy} 
            variant="outline" 
            className="w-full border-wallet-blue text-wallet-blue hover:bg-wallet-blue/10"
          >
            {copied ? (
              <>
                <CheckIcon className="mr-2 h-4 w-4" /> Copiado
              </>
            ) : (
              <>
                <ClipboardIcon className="mr-2 h-4 w-4" /> Copiar frase
              </>
            )}
          </Button>
          
          <Button 
            onClick={handleContinue} 
            className={`w-full bg-wallet-blue text-white hover:bg-wallet-blue/90 transition-all duration-500 ${animating ? 'scale-105 opacity-90' : ''}`}
          >
            He guardado mi frase semilla
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SeedPhrasePage;
