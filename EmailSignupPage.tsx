
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const EmailSignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast.error("Por favor, completa todos los campos");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    
    setLoading(true);
    
    // In a real app, this would be a call to your auth service
    setTimeout(() => {
      // Mock account creation
      localStorage.setItem("hairy-wallet-email", email);
      localStorage.setItem("hairy-wallet-password", password); // In a real app, NEVER store passwords in localStorage
      
      toast.success("Cuenta creada con éxito");
      navigate("/seed-phrase");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto text-center mb-8">
        <div className="relative w-24 h-24 mx-auto">
          <img
            src="/lovable-uploads/8b3a744c-2ea5-48ad-b4b7-93b9eb8d808e.png"
            alt="Hairy Wallet Logo"
            className="w-full h-full object-contain"
          />
        </div>
        
        <h1 className="text-3xl font-bold mt-4">
          <span className="text-wallet-blue">Crea tu cuenta</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Regístrate con tu correo electrónico para crear una wallet
        </p>
      </div>
      
      <Card className="max-w-md w-full mx-auto bg-card/50 backdrop-blur-sm border-wallet-blue/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-lg flex items-center justify-center gap-2">
            <Mail className="h-5 w-5" />
            Registro por Email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-wallet-blue hover:bg-wallet-blue/90"
              disabled={loading}
            >
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/welcome")}
                className="text-sm text-wallet-blue hover:underline"
              >
                Volver a opciones de acceso
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSignupPage;
