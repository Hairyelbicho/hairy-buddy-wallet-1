
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Bell, ShieldCheck, Globe, Moon, KeyRound, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [showPINDialog, setShowPINDialog] = useState(false);
  const [showPatternDialog, setShowPatternDialog] = useState(false);
  const [showSeedPhraseDialog, setShowSeedPhraseDialog] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Manejador para el modo oscuro
  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    toast({
      title: checked ? "Modo oscuro activado" : "Modo oscuro desactivado",
      duration: 2000,
    });
    
    // Aquí se implementaría la lógica real para cambiar el tema
    document.documentElement.classList.toggle("dark", checked);
  };

  // Manejador para cambiar el idioma
  const handleLanguageChange = () => {
    setShowLanguageDialog(false);
    toast({
      title: "Idioma actualizado",
      description: "El idioma ha sido cambiado correctamente",
      duration: 2000,
    });
  };

  // Manejador para cambiar el PIN
  const handlePINChange = () => {
    setShowPINDialog(false);
    navigate("/auth");
  };

  // Manejador para cambiar el patrón
  const handlePatternChange = () => {
    setShowPatternDialog(false);
    navigate("/auth");
  };

  // Manejador para ver la frase semilla
  const handleViewSeedPhrase = () => {
    setShowSeedPhraseDialog(false);
    navigate("/seed-phrase");
  };

  // Manejador para cerrar sesión
  const handleLogout = () => {
    setShowLogoutDialog(false);
    // Limpiar el estado de la sesión
    localStorage.removeItem("userSession");
    navigate("/");
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
      duration: 2000,
    });
  };

  return (
    <div className="container max-w-md mx-auto px-4 pb-20 pt-6">
      <h1 className="text-2xl font-bold mb-6">Ajustes</h1>

      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe size={18} />
            General
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Modo oscuro</p>
              <p className="text-sm text-muted-foreground">Activar tema oscuro</p>
            </div>
            <Switch checked={darkMode} onCheckedChange={handleDarkModeChange} />
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Idioma</p>
              <p className="text-sm text-muted-foreground">Español</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowLanguageDialog(true)}>
              Cambiar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell size={18} />
            Notificaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Notificaciones push</p>
              <p className="text-sm text-muted-foreground">Recibe alertas de actividad</p>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={(checked) => {
                setNotifications(checked);
                toast({
                  title: checked ? "Notificaciones activadas" : "Notificaciones desactivadas",
                  duration: 2000,
                });
              }} 
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldCheck size={18} />
            Seguridad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Autenticación biométrica</p>
              <p className="text-sm text-muted-foreground">Usar Face ID / Huella</p>
            </div>
            <Switch 
              checked={biometrics} 
              onCheckedChange={(checked) => {
                setBiometrics(checked);
                toast({
                  title: checked ? "Biometría activada" : "Biometría desactivada",
                  duration: 2000,
                });
              }} 
            />
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Cambiar PIN</p>
              <p className="text-sm text-muted-foreground">Actualizar código de acceso</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowPINDialog(true)}>
              Cambiar
            </Button>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Cambiar patrón</p>
              <p className="text-sm text-muted-foreground">Actualizar patrón de desbloqueo</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowPatternDialog(true)}>
              Cambiar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <KeyRound size={18} />
            Frase semilla
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Ver frase semilla</p>
              <p className="text-sm text-muted-foreground">12 palabras de recuperación</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowSeedPhraseDialog(true)}>
              Ver
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText size={18} />
            Legal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Política de privacidad</p>
              <p className="text-sm text-muted-foreground">Ver términos y condiciones</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/privacy-policy')}>
              Ver
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button 
        variant="destructive" 
        className="w-full mt-4"
        onClick={() => setShowLogoutDialog(true)}
      >
        Cerrar sesión
      </Button>

      {/* Diálogos de confirmación */}
      <AlertDialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cambiar idioma</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres cambiar el idioma de la aplicación?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleLanguageChange}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showPINDialog} onOpenChange={setShowPINDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cambiar PIN</AlertDialogTitle>
            <AlertDialogDescription>
              Serás redirigido a la pantalla de autenticación para configurar un nuevo PIN.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handlePINChange}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showPatternDialog} onOpenChange={setShowPatternDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cambiar patrón</AlertDialogTitle>
            <AlertDialogDescription>
              Serás redirigido a la pantalla de autenticación para configurar un nuevo patrón.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handlePatternChange}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showSeedPhraseDialog} onOpenChange={setShowSeedPhraseDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ver frase semilla</AlertDialogTitle>
            <AlertDialogDescription>
              Estás a punto de ver tu frase semilla. Asegúrate de estar en un lugar privado y seguro.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleViewSeedPhrase}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cerrar sesión</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres cerrar tu sesión en Hairy Wallet?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Cerrar sesión</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SettingsPage;
