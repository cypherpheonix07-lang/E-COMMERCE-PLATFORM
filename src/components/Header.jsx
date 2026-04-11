
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  User, 
  Menu, 
  X, 
  Cpu, 
  Mic, 
  Zap,
  Globe,
  Ghost,
  Box
} from 'lucide-react';
import { useShopStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const { 
    cart, 
    wishlist, 
    realityMode, 
    setRealityMode, 
    user,
    isVoiceActive,
    toggleVoice
  } = useShopStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const realityIcons = {
    physical: <Globe className="w-4 h-4" />,
    metaverse: <Box className="w-4 h-4" />,
    holographic: <Zap className="w-4 h-4" />,
    neural: <Cpu className="w-4 h-4" />
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-2 bg-background/80 backdrop-blur-2xl border-b border-white/5' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO & SENTIENT CORE */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:bg-primary/40 transition-all duration-500" />
              <div className="relative z-10 w-full h-full glass rounded-xl flex items-center justify-center border-primary/30 animate-float">
                <Cpu className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tighter text-gradient">HistoriCart</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none font-medium">Omega Edition</p>
            </div>
          </Link>

          {/* MAIN NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/explore" className="text-sm font-medium hover:text-primary transition-colors">Explore</Link>
            <Link to="/recommendations" className="text-sm font-medium hover:text-primary transition-colors">Quantum Picks</Link>
            <Link to="/nexus" className="text-sm font-medium hover:text-primary transition-colors">Omega Nexus</Link>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* REALITY SWITCHER */}
            <div className="hidden md:flex items-center p-1 glass rounded-full border-white/5">
              {['physical', 'metaverse', 'holographic', 'neural'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setRealityMode(mode)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    realityMode === mode 
                      ? 'bg-primary text-primary-foreground neo-glow-primary scale-110' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title={mode.charAt(0).toUpperCase() + mode.slice(1)}
                >
                  {realityIcons[mode]}
                </button>
              ))}
            </div>

            {/* VOICE ORB MOCK */}
            <button 
              onClick={toggleVoice}
              className={`p-2.5 rounded-full transition-all duration-500 group relative ${
                isVoiceActive ? 'bg-accent/20 text-accent neo-glow-accent' : 'glass hover:bg-white/5'
              }`}
            >
              <Mic className={`w-5 h-5 ${isVoiceActive ? 'animate-pulse' : ''}`} />
              {isVoiceActive && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping" />
              )}
            </button>

            {/* WISHLIST */}
            <Link to="/wishlist" className="p-2.5 rounded-full glass hover:bg-white/5 transition-all group relative">
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full" />
              )}
            </Link>

            {/* CART */}
            <Link to="/cart" className="p-2.5 rounded-full glass hover:bg-white/5 transition-all group relative">
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-primary text-[10px] font-bold text-primary-foreground rounded-full leading-none">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* PROFILE */}
            <Link to="/profile" className="flex items-center gap-2 pl-2 border-l border-white/10 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center p-[1px]">
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center overflow-hidden">
                  <User className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="hidden xl:block text-left leading-tight">
                <p className="text-xs font-bold">{user.displayName}</p>
                <p className="text-[10px] text-muted-foreground">{user.loyalty.tier} VIP</p>
              </div>
            </Link>

            {/* MOBILE MENU TOGGLE */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/5 glass overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <Link to="/explore" className="block text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Explore</Link>
              <Link to="/recommendations" className="block text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Quantum Picks</Link>
              <Link to="/nexus" className="block text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Omega Nexus</Link>
              <div className="pt-4 border-t border-white/5">
                <p className="text-xs text-muted-foreground uppercase mb-2">Switch Reality</p>
                <div className="flex gap-4">
                  {['physical', 'metaverse', 'holographic', 'neural'].map(mode => (
                    <button 
                      key={mode} 
                      onClick={() => { setRealityMode(mode); setIsMobileMenuOpen(false); }}
                      className={`flex-1 p-3 rounded-xl glass flex flex-col items-center gap-1 ${realityMode === mode ? 'border-primary' : ''}`}
                    >
                      {realityIcons[mode]}
                      <span className="text-[10px] capitalize">{mode}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
