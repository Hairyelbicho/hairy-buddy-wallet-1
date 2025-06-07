
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // In a real app, we would check if the user has a wallet and redirect accordingly
  // For now, we'll just redirect to the welcome screen
  
  useEffect(() => {
    // This would be where we initialize any required libraries or check for existing wallet
    console.log("Initializing Hairy Wallet app...");
  }, []);

  return <Navigate to="/welcome" replace />;
};

export default Index;
