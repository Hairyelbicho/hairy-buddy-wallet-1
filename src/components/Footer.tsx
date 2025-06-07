import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-4 text-center text-sm text-muted-foreground border-t mt-8">
      <p>
        � 2025 Hairy Wallet. Todos los derechos reservados.{" "}
        <Link to="/privacidad" className="underline hover:text-primary">
          Pol�tica de Privacidad
        </Link>
      </p>
    </footer>
  );
};

export default Footer;