import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Clock, DollarSign, Star, CreditCard, Repeat, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePlatform } from '@/hooks/usePlatform';
import { cn } from '@/lib/utils';

const AdvertisingFormPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isMobile, isExtension } = usePlatform();
  
  const [formData, setFormData] = useState({
    businessName: '',
    contactEmail: '',
    phone: '',
    description: '',
    imageUrl: '',
    websiteUrl: '',
    duration: 'monthly',
    paymentMethod: 'SOL',
    autoRenewal: true
  });

  const subscriptionPlans = [
    {
      id: 'monthly',
      duration: 'Mensual',
      price: 0.5,
      currency: 'SOL',
      popular: false,
      description: 'Renovación cada mes',
      discount: null
    },
    {
      id: 'quarterly',
      duration: 'Trimestral',
      price: 1.2,
      currency: 'SOL',
      popular: true,
      description: 'Renovación cada 3 meses',
      discount: '20% descuento',
      monthlyEquivalent: 0.4
    },
    {
      id: 'annual',
      duration: 'Anual',
      price: 4.0,
      currency: 'SOL',
      popular: false,
      description: 'Renovación cada 12 meses',
      discount: '33% descuento',
      monthlyEquivalent: 0.33
    }
  ];

  const paymentMethods = [
    { id: 'SOL', name: 'Solana (SOL)', icon: '◎' },
    { id: 'USDT', name: 'Tether (USDT)', icon: '₮' },
    { id: 'BTC', name: 'Bitcoin (BTC)', icon: '₿' },
    { id: 'FIAT', name: 'Moneda Fiat', icon: '$' },
    { id: 'CARD', name: 'Tarjeta de Crédito', icon: '💳' }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName || !formData.contactEmail || !formData.phone || !formData.description) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    const selectedPlan = subscriptionPlans.find(plan => plan.id === formData.duration);
    const selectedPayment = paymentMethods.find(method => method.id === formData.paymentMethod);
    
    toast({
      title: "Procesando suscripción...",
      description: `Se procesará el pago de ${selectedPlan?.price} ${selectedPlan?.currency} vía ${selectedPayment?.name}`,
    });

    setTimeout(() => {
      toast({
        title: "¡Suscripción exitosa!",
        description: `Tu suscripción ${selectedPlan?.duration.toLowerCase()} está activa. ${formData.autoRenewal ? 'Se renovará automáticamente.' : 'Deberás renovar manualmente.'}`,
      });
      navigate('/discover');
    }, 2000);
  };

  const selectedPlan = subscriptionPlans.find(plan => plan.id === formData.duration);
  const selectedPayment = paymentMethods.find(method => method.id === formData.paymentMethod);

  return (
    <div className={cn(
      "container mx-auto px-4 py-8",
      isExtension ? "max-w-sm py-4" : "max-w-2xl",
      isMobile && "px-2 py-4"
    )}>
      <div className={cn(
        "flex items-center gap-4 mb-6",
        isExtension && "mb-4"
      )}>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/discover')}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className={cn(
          "font-bold",
          isExtension ? "text-lg" : "text-2xl"
        )}>
          Suscripción Publicitaria
        </h1>
      </div>

      <div className={cn(
        "grid gap-6",
        isExtension && "gap-4"
      )}>
        {/* Planes de Suscripción */}
        <Card>
          <CardHeader className={isExtension ? "pb-3" : ""}>
            <CardTitle className={cn(
              "flex items-center gap-2",
              isExtension && "text-base"
            )}>
              <Repeat className="h-5 w-5" />
              Planes de Suscripción
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={formData.duration} 
              onValueChange={(value) => handleInputChange('duration', value)}
              className="grid gap-4"
            >
              {subscriptionPlans.map((plan) => (
                <div key={plan.id} className="relative">
                  <div className={cn(
                    "border rounded-lg cursor-pointer transition-colors hover:bg-muted/50",
                    isExtension ? "p-3" : "p-4",
                    formData.duration === plan.id ? 'border-primary bg-primary/5' : 'border-border'
                  )}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={plan.id} id={plan.id} />
                      <Label htmlFor={plan.id} className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "font-medium",
                                isExtension && "text-sm"
                              )}>
                                {plan.duration}
                              </span>
                              {plan.popular && (
                                <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                                  <Star className="h-3 w-3" />
                                  Popular
                                </span>
                              )}
                            </div>
                            <p className={cn(
                              "text-muted-foreground",
                              isExtension ? "text-xs" : "text-sm"
                            )}>
                              {plan.description}
                            </p>
                            {plan.discount && (
                              <p className={cn(
                                "text-green-600 font-medium",
                                isExtension ? "text-xs" : "text-sm"
                              )}>
                                {plan.discount}
                              </p>
                            )}
                            {plan.monthlyEquivalent && (
                              <p className={cn(
                                "text-muted-foreground",
                                isExtension ? "text-xs" : "text-xs"
                              )}>
                                Equivale a {plan.monthlyEquivalent} SOL/mes
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <div className={cn(
                              "font-bold",
                              isExtension ? "text-lg" : "text-xl"
                            )}>
                              {plan.price} {plan.currency}
                            </div>
                            <div className={cn(
                              "text-muted-foreground",
                              isExtension ? "text-xs" : "text-sm"
                            )}>
                              Por {plan.duration.toLowerCase()}
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Información del Anunciante */}
        <Card>
          <CardHeader className={isExtension ? "pb-3" : ""}>
            <CardTitle className={isExtension ? "text-base" : ""}>
              Información del Anunciante
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn(
              "space-y-4",
              isExtension && "space-y-3"
            )}>
              <div>
                <Label htmlFor="businessName" className={isExtension ? "text-sm" : ""}>
                  Nombre del Negocio *
                </Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Ej: Mi Tienda de Mascotas"
                  className={isExtension ? "h-8 text-sm" : ""}
                  required
                />
              </div>

              <div className={cn(
                "grid gap-4",
                isExtension ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
              )}>
                <div>
                  <Label htmlFor="contactEmail" className={isExtension ? "text-sm" : ""}>
                    Email de Contacto *
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="contacto@minegocio.com"
                    className={isExtension ? "h-8 text-sm" : ""}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className={isExtension ? "text-sm" : ""}>
                    Teléfono *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className={isExtension ? "h-8 text-sm" : ""}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className={isExtension ? "text-sm" : ""}>
                  Descripción del Anuncio *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe tu negocio y lo que ofreces..."
                  rows={isExtension ? 2 : 3}
                  className={isExtension ? "text-sm" : ""}
                  required
                />
              </div>

              {!isExtension && (
                <>
                  <div>
                    <Label htmlFor="imageUrl">URL de la Imagen</Label>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="websiteUrl">Sitio Web</Label>
                    <Input
                      id="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                      placeholder="https://minegocio.com"
                    />
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Método de Pago */}
        <Card>
          <CardHeader className={isExtension ? "pb-3" : ""}>
            <CardTitle className={cn(
              "flex items-center gap-2",
              isExtension && "text-base"
            )}>
              <CreditCard className="h-5 w-5" />
              Método de Pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="paymentMethod" className={isExtension ? "text-sm" : ""}>
                  Selecciona tu método de pago preferido
                </Label>
                <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                  <SelectTrigger className={isExtension ? "h-8" : ""}>
                    <SelectValue placeholder="Seleccionar método de pago" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        <div className="flex items-center gap-2">
                          <span>{method.icon}</span>
                          <span className={isExtension ? "text-sm" : ""}>
                            {method.name}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoRenewal"
                  checked={formData.autoRenewal}
                  onChange={(e) => handleInputChange('autoRenewal', e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="autoRenewal" className={isExtension ? "text-sm" : "text-sm"}>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Renovación automática
                  </div>
                  <p className={cn(
                    "text-muted-foreground mt-1",
                    isExtension ? "text-xs" : "text-xs"
                  )}>
                    Tu suscripción se renovará automáticamente y se cobrará con el método seleccionado
                  </p>
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumen de la Suscripción */}
        <Card className="bg-muted/30">
          <CardContent className={isExtension ? "pt-4" : "pt-6"}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className={cn(
                    "font-medium",
                    isExtension && "text-sm"
                  )}>
                    Plan: {selectedPlan?.duration}
                  </p>
                  <p className={cn(
                    "text-muted-foreground",
                    isExtension ? "text-xs" : "text-sm"
                  )}>
                    {formData.autoRenewal ? 'Renovación automática' : 'Renovación manual'}
                  </p>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "font-bold",
                    isExtension ? "text-xl" : "text-2xl"
                  )}>
                    {selectedPlan?.price} {selectedPlan?.currency}
                  </p>
                  <p className={cn(
                    "text-muted-foreground",
                    isExtension ? "text-xs" : "text-sm"
                  )}>
                    Por {selectedPlan?.duration.toLowerCase()}
                  </p>
                </div>
              </div>
              
              <div className={cn(
                "flex items-center justify-between",
                isExtension ? "text-xs" : "text-sm"
              )}>
                <span>Método de pago:</span>
                <span className="flex items-center gap-1">
                  {selectedPayment?.icon} {selectedPayment?.name}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button 
          type="submit" 
          onClick={handleSubmit} 
          className="w-full" 
          size={isExtension ? "sm" : "lg"}
        >
          <Clock className="mr-2 h-4 w-4" />
          Activar Suscripción
        </Button>

        <p className={cn(
          "text-muted-foreground text-center",
          isExtension ? "text-xs" : "text-sm"
        )}>
          Los pagos van directamente a la liquidez de Hairy Wallet. 
          {formData.autoRenewal && " Tu suscripción se renovará automáticamente."} 
          Recibirás recordatorios antes de cada renovación.
        </p>
      </div>
    </div>
  );
};

export default AdvertisingFormPage;
