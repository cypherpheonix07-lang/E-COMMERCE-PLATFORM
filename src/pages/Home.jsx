
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useShopStore } from '../store';
import { products, categories, realities } from '../data';
import { 
  ArrowRight, 
  Sparkles, 
  History, 
  Dna, 
  Globe, 
  Zap, 
  Box as BoxIcon 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { realityMode, user, recentlyViewed } = useShopStore();
  const [heroProducts, setHeroProducts] = useState([]);

  useEffect(() => {
    // Highly personalized hero selection based on history
    const historyCategories = user.preferences.categories;
    const recommended = products.filter(p => historyCategories.includes(p.category)).slice(0, 3);
    setHeroProducts(recommended);
  }, [user]);

  return (
    <div className="relative pt-20">
      {/* 3D AMBIENCE MOCK (will be replaced by actual Canvas later) */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className={`absolute inset-0 transition-all duration-1000 ${
          realityMode === 'metaverse' ? 'bg-purple-950/20' : 
          realityMode === 'holographic' ? 'bg-cyan-950/20' : 
          realityMode === 'neural' ? 'bg-indigo-950/20' : 'bg-transparent'
        }`} />
      </div>

      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {realityMode === 'physical' ? 'Your Personal Storefront' : `${realityMode.charAt(0).toUpperCase() + realityMode.slice(1)} Mode Active`}
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
            Welcome home, <br />
            <span className="text-gradient">{user.displayName}</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            I&apos;ve synchronized with your latest activity in <span className="text-foreground font-bold">Chennai</span>. 
            The store has evolved based on your passion for <span className="text-foreground font-bold">{user.preferences.categories[0]}</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/explore"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center gap-2 group neo-glow-primary transition-all hover:scale-105"
            >
              Explore New Realities
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 glass text-foreground rounded-2xl font-bold hover:bg-white/5 transition-all">
              View Your DNA
            </button>
          </div>
        </motion.div>

        {/* FLOATING HERO ASSETS (MOCK) */}
        <div className="absolute inset-0 pointer-events-none">
          {heroProducts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ delay: 0.5 + (i * 0.2) }}
              className={`absolute hidden lg:block ${
                i === 0 ? 'top-1/4 left-10' : i === 1 ? 'top-1/3 right-10' : 'bottom-20 left-1/2 -ml-10'
              }`}
            >
              <div className="w-48 h-48 glass rounded-3xl p-4 overflow-hidden animate-float">
                <img src={p.image} alt={p.name} className="w-full h-full object-contain mix-blend-lighten opacity-80" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* RECENTLY VIEWED & DNA MATCHES */}
      <section className="py-20 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
              <History className="text-primary" />
              Resumed for You
            </h2>
            <p className="text-muted-foreground">Pick up where you left off in Chennai.</p>
          </div>
          <Link to="/explore" className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
            View History <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.filter(p => recentlyViewed.includes(p.id)).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card group cursor-pointer"
            >
              <div className="aspect-square p-6 relative">
                {/* DNA MATCH BADGE */}
                <div className="absolute top-4 left-4 z-10 bg-primary/20 backdrop-blur-md px-2 py-1 rounded-full border border-primary/30 flex items-center gap-1">
                  <Dna className="w-3 h-3 text-primary" />
                  <span className="text-[10px] font-bold">98% Match</span>
                </div>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="p-6 pt-0">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{product.brand}</p>
                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black">${product.price}</span>
                  <button className="p-2 glass rounded-xl hover:bg-primary hover:text-primary-foreground transition-all">
                    <Zap className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* OMNI-CHANNEL CATEGORY HUB */}
      <section className="py-20 bg-white/5">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Explore Your Universe</h2>
            <p className="text-muted-foreground">Tailored categories reflecting your taste evolution.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-6 flex flex-col items-center gap-4 hover:border-primary/50 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  {/* Icon mapping would go here */}
                  <div className="w-6 h-6 bg-current opacity-50 rounded-full" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">{cat.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
