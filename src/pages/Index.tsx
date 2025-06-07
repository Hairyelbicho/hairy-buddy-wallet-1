
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    console.log("Inicializando Hairy Wallet móvil...");
  }, []);

  // Redirigir directamente al dashboard de la wallet
  return <Navigate to="/dashboard" replace />;
};

export default Index;
