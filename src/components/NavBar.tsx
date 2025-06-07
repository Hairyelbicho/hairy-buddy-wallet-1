import { Link } from 'react-router-dom';
import { Home, Wallet, BarChart3, RefreshCw, MessageSquare } from 'lucide-react';
import ConnectWalletButton from './ConnectWalletButton';

const NavBar = () => {
  return (
    <>
      {/* Top bar solo visible en escritorio */}
      <div className="hidden sm:flex justify-end items-center px-6 py-2 bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-20">
        <ConnectWalletButton />
      </div>

      {/* Bottom navigation bar visible en móviles */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 sm:px-6 flex justify-between items-center z-10 sm:hidden">
        <Link to="/" className="flex flex-col items-center text-hairy-primary">
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/wallet" className="flex flex-col items-center text-gray-500 hover:text-hairy-primary transition-colors">
          <Wallet size={24} />
          <span className="text-xs mt-1">Wallet</span>
        </Link>
        <Link to="/swap" className="flex flex-col items-center text-gray-500 hover:text-hairy-primary transition-colors">
          <RefreshCw size={24} />
          <span className="text-xs mt-1">Swap</span>
        </Link>
        <Link to="/market" className="flex flex-col items-center text-gray-500 hover:text-hairy-primary transition-colors">
          <BarChart3 size={24} />
          <span className="text-xs mt-1">Market</span>
        </Link>
        <Link to="/chat" className="flex flex-col items-center text-gray-500 hover:text-hairy-primary transition-colors">
          <MessageSquare size={24} />
          <span className="text-xs mt-1">Hairy IA</span>
        </Link>
      </nav>
    </>
  );
};

export default NavBar;
