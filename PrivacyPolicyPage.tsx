import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-2xl mx-auto px-4 pb-20 pt-6 text-white">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold">Política de Privacidad</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6 space-y-6">
          <p className="text-sm text-muted-foreground mb-2">
            Última actualización: 31 de mayo de 2025
          </p>

          <section>
            <h2 className="text-lg font-semibold mb-1">1. Introducción</h2>
            <p className="text-sm text-muted-foreground">
              En Hairy Wallet, valoramos tu privacidad y nos comprometemos a proteger
              tu información personal. Esta política explica cómo recopilamos, usamos y
              resguardamos tus datos dentro de la app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">2. Datos que recopilamos</h2>
            <p className="text-sm text-muted-foreground">
              No recopilamos datos personales sensibles. Podemos almacenar localmente tu
              dirección pública, configuración de la app y movimientos en la blockchain.
              Si conectas servicios externos como Supabase o exchanges, ellos podrían
              manejar datos según sus propias políticas.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">3. Uso de los datos</h2>
            <ul className="text-sm text-muted-foreground list-disc ml-5 space-y-1">
              <li>Mostrar saldo y transacciones en tiempo real.</li>
              <li>Mejorar la experiencia y funcionamiento de la app.</li>
              <li>Detectar actividades sospechosas (protección antiphishing).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">4. Almacenamiento y seguridad</h2>
            <p className="text-sm text-muted-foreground">
              La información se almacena de forma cifrada y segura en tu dispositivo.
              No compartimos datos con terceros sin tu consentimiento explícito.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">5. Servicios de terceros</h2>
            <p className="text-sm text-muted-foreground">
              Hairy Wallet puede integrar servicios como Supabase, Helius o redes
              blockchain como Solana. No controlamos sus políticas, por lo que te
              recomendamos revisar sus términos y condiciones.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">6. Cambios en esta política</h2>
            <p className="text-sm text-muted-foreground">
              Esta política puede modificarse ocasionalmente. Te notificaremos dentro de
              la app si se realizan cambios importantes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">7. Contacto</h2>
            <p className="text-sm text-muted-foreground">
              Para cualquier duda, escríbenos a:{' '}
              <a href="mailto:hairywallet@protonmail.com" className="underline">
                hairywallet@protonmail.com
              </a>
            </p>
          </section>

          <div className="text-center pt-6 border-t border-gray-700">
            <p className="text-xs text-muted-foreground">
              Hairy Wallet © 2025. Todos los derechos reservados.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicyPage;
