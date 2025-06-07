
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Wallet, Shield, FileKey } from "lucide-react";

// Validation schemas
const seedPhraseSchema = z.object({
  seedPhrase: z
    .string()
    .min(1, { message: "La frase semilla es obligatoria" })
    .refine((value) => {
      const words = value.trim().split(/\s+/);
      return words.length === 12 || words.length === 24;
    }, { message: "La frase semilla debe contener 12 o 24 palabras" }),
  agreement: z.boolean().refine(val => val === true, {
    message: "Debes confirmar que eres el propietario de la wallet"
  })
});

const publicAddressSchema = z.object({
  publicAddress: z
    .string()
    .min(1, { message: "La dirección pública es obligatoria" })
    .regex(/^(0x)?[0-9a-fA-F]{40}$/, { message: "Formato de dirección Ethereum no válido" }),
  agreement: z.boolean().refine(val => val === true, {
    message: "Debes confirmar que eres el propietario de la wallet"
  })
});

const ImportWalletPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [importMethod, setImportMethod] = useState<"seed" | "address">("seed");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  
  // Form for seed phrase
  const seedPhraseForm = useForm<z.infer<typeof seedPhraseSchema>>({
    resolver: zodResolver(seedPhraseSchema),
    defaultValues: {
      seedPhrase: "",
      agreement: false,
    },
  });

  // Form for public address
  const publicAddressForm = useForm<z.infer<typeof publicAddressSchema>>({
    resolver: zodResolver(publicAddressSchema),
    defaultValues: {
      publicAddress: "",
      agreement: false,
    },
  });

  const onSubmitSeedPhrase = (values: z.infer<typeof seedPhraseSchema>) => {
    // Open verification dialog
    setVerifyDialogOpen(true);
  };

  const onSubmitPublicAddress = (values: z.infer<typeof publicAddressSchema>) => {
    // Open verification dialog
    setVerifyDialogOpen(true);
  };

  const handleVerificationComplete = () => {
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      setVerifyDialogOpen(false);
      
      // Success notification
      toast({
        title: "¡Wallet importada correctamente!",
        description: "Tu wallet ha sido verificada e importada con éxito.",
      });
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-wallet-navy via-wallet-navy/90 to-black">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5 z-0"></div>
      
      <Card className="w-full max-w-md bg-black/30 backdrop-blur-xl border-gray-800/50 text-white relative z-10">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-3">
            <FileKey className="h-6 w-6 text-wallet-blue" />
            <span>Importar Wallet</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs
            value={importMethod}
            onValueChange={(value) => setImportMethod(value as "seed" | "address")}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-6 bg-gray-800/50">
              <TabsTrigger value="seed" className="data-[state=active]:bg-wallet-blue data-[state=active]:text-white">
                Frase Semilla
              </TabsTrigger>
              <TabsTrigger value="address" className="data-[state=active]:bg-wallet-blue data-[state=active]:text-white">
                Dirección Pública
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="seed">
              <Form {...seedPhraseForm}>
                <form onSubmit={seedPhraseForm.handleSubmit(onSubmitSeedPhrase)} className="space-y-6">
                  <FormField
                    control={seedPhraseForm.control}
                    name="seedPhrase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Frase Semilla (12 o 24 palabras)</FormLabel>
                        <FormControl>
                          <textarea
                            placeholder="Ingresa tu frase semilla separada por espacios"
                            className="flex w-full h-24 rounded-md border border-input bg-background/20 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400 text-xs">
                          Tu frase semilla nunca será almacenada.
                        </FormDescription>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={seedPhraseForm.control}
                    name="agreement"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-wallet-blue data-[state=checked]:border-wallet-blue"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-gray-300">
                            Confirmo que soy el propietario legítimo de esta wallet
                          </FormLabel>
                        </div>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-wallet-blue hover:bg-wallet-blue/90"
                  >
                    <Wallet className="mr-2 h-4 w-4" /> Importar Wallet
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="address">
              <Form {...publicAddressForm}>
                <form onSubmit={publicAddressForm.handleSubmit(onSubmitPublicAddress)} className="space-y-6">
                  <FormField
                    control={publicAddressForm.control}
                    name="publicAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Dirección Pública</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0x..."
                            className="bg-background/20 backdrop-blur-sm border-gray-700"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400 text-xs">
                          La dirección pública de tu wallet Ethereum.
                        </FormDescription>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={publicAddressForm.control}
                    name="agreement"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-wallet-blue data-[state=checked]:border-wallet-blue"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-gray-300">
                            Confirmo que soy el propietario legítimo de esta wallet
                          </FormLabel>
                        </div>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-wallet-blue hover:bg-wallet-blue/90"
                  >
                    <Shield className="mr-2 h-4 w-4" /> Verificar Propiedad
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-center pb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/welcome")}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Volver
          </Button>
        </CardFooter>
      </Card>
      
      {/* Verification Dialog */}
      <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
        <DialogContent className="bg-black/90 border-gray-800 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-wallet-blue">Verificación de Propiedad</DialogTitle>
            <DialogDescription className="text-center text-gray-400">
              Ingresa el código de verificación que hemos enviado a la wallet
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-4 space-y-6">
            <p className="text-sm text-gray-300">
              Para verificar que eres el propietario de esta wallet, por favor ingresa el código de 6 dígitos:
            </p>
            
            <InputOTP maxLength={6} value={verificationCode} onChange={setVerificationCode}>
              <InputOTPGroup>
                <InputOTPSlot index={0} className="bg-gray-800/50 border-gray-700" />
                <InputOTPSlot index={1} className="bg-gray-800/50 border-gray-700" />
                <InputOTPSlot index={2} className="bg-gray-800/50 border-gray-700" />
                <InputOTPSlot index={3} className="bg-gray-800/50 border-gray-700" />
                <InputOTPSlot index={4} className="bg-gray-800/50 border-gray-700" />
                <InputOTPSlot index={5} className="bg-gray-800/50 border-gray-700" />
              </InputOTPGroup>
            </InputOTP>
            
            <Button
              onClick={handleVerificationComplete}
              disabled={verificationCode.length < 6 || isVerifying}
              className="w-full bg-gradient-to-r from-wallet-blue to-wallet-pink"
            >
              {isVerifying ? "Verificando..." : "Confirmar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImportWalletPage;
