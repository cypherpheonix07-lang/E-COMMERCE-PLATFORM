
import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useShopStore } from './store';

// Components
import Header from './components/Header.jsx';
import SentientCore from './components/SentientCore.jsx';
import VoiceAssistant from './components/VoiceAssistant.jsx';

// Pages
import HomePage from './pages/Home.jsx';
import ExplorePage from './pages/Explore.jsx';
import SearchResults from './pages/SearchResults.jsx';
import CartPage from './pages/CartPage.jsx';
import WishlistPage from './pages/WishlistPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import ComparePage from './pages/ComparePage.jsx';
import OmegaNexus from './pages/OmegaNexus.jsx';

function App() {
  const location = useLocation();
  const { realityMode, setSentientDialogue } = useShopStore();

  useEffect(() => {
    // Reality-based sentient greeting
    const greetings = {
      physical: "Welcome back, Arun. I've optimized the local Chennai experience for you.",
      metaverse: "Entering the Metaverse. Your personalized showroom is ready.",
      holographic: "Holographic modes initialized. Feel free to touch the projection.",
      neural: "Neural link established. Your thoughts are now our guidance."
    };
    setSentientDialogue(greetings[realityMode]);
  }, [realityMode, setSentientDialogue]);

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      realityMode === 'physical' ? 'bg-background' : 
      realityMode === 'metaverse' ? 'bg-[#020617]' : 
      realityMode === 'holographic' ? 'bg-[#000]' : 'bg-[#050510]'
    } text-foreground selection:bg-primary selection:text-primary-foreground`}>
      
      <Header />
      
      {/* GLOBAL BACKGROUND EFFECTS (Mock Particle System) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 transition-all duration-1000 ${
          realityMode === 'physical' ? 'bg-blue-500' : 'bg-purple-600'
        }`} />
        <div className={`absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 transition-all duration-1000 ${
          realityMode === 'neural' ? 'bg-indigo-600' : 'bg-emerald-600'
        }`} />
      </div>

      <main className="relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/nexus" element={<OmegaNexus />} />
              {/* Fallback */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* GLOBAL SENTIENT SYSTEMS */}
      <SentientCore />
      <VoiceAssistant />

      {/* FOOTER MOCK */}
      <footer className="py-20 px-8 border-t border-white/5 text-center text-muted-foreground text-xs uppercase tracking-[0.3em]">
        &copy; 2026 HistoriCart Omega • Neural-Commerce System • Chennai Node
      </footer>
    </div>
  );
}

export default App;
