
import { useState, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { usePlatform } from "@/hooks/usePlatform";
import { 
  Home, 
  Send, 
  QrCode, 
  Settings, 
  Globe, 
  Brain, 
  Menu, 
  X,
  LayoutGrid,
  GalleryHorizontal,
  ArrowLeftRight,
  TrendingUp,
  GitBranch,
  Vote,
  Droplets,
  BarChart3,
  CreditCard,
  Shield
} from "lucide-react";
import AdvertisingBanner from "./AdvertisingBanner";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile, isExtension, platform } = usePlatform();

  const navigationItems = [
    { icon: LayoutGrid, path: "/dashboard", label: "Dashboard" },
    { icon: ArrowLeftRight, path: "/swap", label: "Swap" },
    { icon: TrendingUp, path: "/trade", label: "Trade" },
    { icon: GitBranch, path: "/bridge", label: "Bridge" },
    { icon: Vote, path: "/governance", label: "Governance" },
    { icon: Droplets, path: "/pools", label: "Pools" },
    { 
      icon: "hairy", 
      path: "/solarflare", 
      label: "Solarflare" 
    },
    { icon: BarChart3, path: "/metrics", label: "Metrics" },
    { icon: CreditCard, path: "/fiat", label: "FIAT" },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNavigation = (item: any) => {
    if (item.external) {
      window.open(item.path, '_blank');
    } else {
      navigate(item.path);
    }
    setSidebarOpen(false);
  };

  // Configuración específica para cada plataforma
  const getLayoutConfig = () => {
    if (isExtension) {
      return {
        sidebarWidth: 'w-64',
        showLabels: true,
        compactMode: false
      };
    }
    if (isMobile) {
      return {
        sidebarWidth: 'w-64',
        showLabels: true,
        compactMode: false
      };
    }
    return {
      sidebarWidth: 'w-64',
      showLabels: true,
      compactMode: false
    };
  };

  const config = getLayoutConfig();

  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      isExtension && "max-h-[600px] overflow-hidden",
      isMobile && "touch-manipulation"
    )}>
      {/* Mobile menu button */}
      <button
        className={cn(
          "fixed top-4 left-4 z-50 p-2 rounded-full bg-wallet-blue/80 text-white",
          isMobile ? "block" : "md:hidden"
        )}
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className={cn(
            "fixed inset-0 bg-black/50 z-40",
            isMobile ? "block" : "md:hidden"
          )}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={cn(
            "fixed left-0 top-0 h-full bg-[#2A2D47] border-r border-wallet-blue/20 flex flex-col pt-6 pb-4 z-40 transition-transform duration-300 ease-in-out overflow-y-auto",
            config.sidebarWidth,
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          {/* Header with Menu title */}
          <div className="px-6 mb-8">
            <h2 className="text-white text-lg font-medium">Menu</h2>
          </div>

          <div className="flex flex-col flex-1 px-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item)}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-lg transition-all text-left w-full",
                  (location.pathname === item.path || 
                   (item.path === "/dashboard" && location.pathname === "/") ||
                   (item.path === "/dashboard" && location.pathname === "/dashboard"))
                    ? "bg-wallet-blue/20 text-white border-l-4 border-wallet-blue" 
                    : "text-gray-300 hover:bg-wallet-blue/10 hover:text-white"
                )}
                title={item.label}
              >
                {item.icon === "hairy" ? (
                  <img
                    src="/lovable-uploads/8b3a744c-2ea5-48ad-b4b7-93b9eb8d808e.png"
                    alt="Hairy Logo"
                    className="w-6 h-6"
                  />
                ) : (
                  <item.icon size={20} className="flex-shrink-0" />
                )}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Footer with logo */}
          <div className="px-6 mt-8">
            <div className="flex items-center gap-3">
              <img
                src="/lovable-uploads/8b3a744c-2ea5-48ad-b4b7-93b9eb8d808e.png"
                alt="Hairy Wallet Logo"
                className="w-8 h-8 object-contain"
              />
              <div className="text-wallet-pink font-bold text-sm">
                Hairy Wallet
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className={cn(
          "flex-1 flex flex-col",
          isMobile ? "ml-0" : "md:ml-64"
        )}>
          <main className={cn(
            "flex-1 pb-4",
            isExtension && "overflow-y-auto max-h-[500px]"
          )}>
            {children}
          </main>
          
          {/* Banner - solo en web */}
          {!isExtension && <AdvertisingBanner />}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
