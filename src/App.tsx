import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes
import Footer from "./components/Footer";

// Páginas principales
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import WalletPage from "./pages/WalletPage";
import SwapPage from "./pages/SwapPage";
import MarketPage from "./pages/MarketPage";
import ChatPage from "./pages/ChatPage";
import AddTokenPage from "./pages/AddTokenPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col justify-between">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/swap" element={<SwapPage />} />
              <Route path="/market" element={<MarketPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/add-token" element={<AddTokenPage />} />
              <Route path="/privacidad" element={<PrivacyPolicyPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
