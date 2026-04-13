
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
import ShopPage from './pages/Shop.jsx';
import SearchResults from './pages/SearchResults.jsx';
import CartPage from './pages/CartPage.jsx';
import WishlistPage from './pages/WishlistPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import ComparePage from './pages/ComparePage.jsx';
import OmegaNexus from './pages/OmegaNexus.jsx';
import QuantumPicks from './pages/QuantumPicks.jsx';
import Profile from './pages/Profile.jsx';
import Insights from './pages/Insights.jsx';
import Forge from './pages/Forge.jsx';
import Universe from './pages/Universe.jsx';
import Oracle from './pages/Oracle.jsx';
import Community from './pages/Community.jsx';
import Events from './pages/Events.jsx';
import Settings from './pages/Settings.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import PhysicalReality from './pages/reality/Physical.jsx';
import MetaverseReality from './pages/reality/Metaverse.jsx';
import HolographicReality from './pages/reality/Holographic.jsx';
import NeuralReality from './pages/reality/Neural.jsx';

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
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/recommendations" element={<QuantumPicks />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/forge" element={<Forge />} />
              <Route path="/universe" element={<Universe />} />
              <Route path="/oracle" element={<Oracle />} />
              <Route path="/community" element={<Community />} />
              <Route path="/events" element={<Events />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              
              {/* Reality Mode Dedicated Pages */}
              <Route path="/reality/physical" element={<PhysicalReality />} />
              <Route path="/reality/metaverse" element={<MetaverseReality />} />
              <Route path="/reality/holographic" element={<HolographicReality />} />
              <Route path="/reality/neural" element={<NeuralReality />} />

              
              {/* Legacy fallback bridges */}
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/nexus" element={<OmegaNexus />} />
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
