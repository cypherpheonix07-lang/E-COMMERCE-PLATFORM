
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '../api.js';
import { useShopStore } from '../store';
import { 
  getStyleEvolution, 
  getHiddenGems, 
  getNextBestPurchase,
  getFrequentlyBoughtTogether
} from '../hooks/usePersonalization.js';
import ProductCard from '../components/ProductCard.jsx';
import { 
  Sparkles, 
  TrendingUp, 
  Layers, 
  Zap, 
  Dna,
  History,
  BrainCircuit
} from 'lucide-react';

const QuantumPicks = () => {
  const { data } = useQuery({ queryKey: ['homeData'], queryFn: fetchHomeData });
  const { user } = useShopStore();

  if (!data) return (
    <div className="pt-32 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-muted-foreground animate-pulse">Running Quantum Inference...</p>
    </div>
  );

  const styleTimeline = useMemo(() => getStyleEvolution(data.user, data.products, data.orders), [data]);
  const hiddenGems = useMemo(() => getHiddenGems(data.user, data.products), [data]);
  const nextPurchase = useMemo(() => getNextBestPurchase(data.user, data.products), [data]);
  const frequentlyBought = useMemo(() => getFrequentlyBoughtTogether(data.user, data.products), [data]);

  return (
    <div className="pt-28 pb-20 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HERO / INTRO */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 border-primary/20">
          <BrainCircuit className="w-4 h-4 text-primary" />
          <span className="text-xs font-black uppercase tracking-widest text-primary">Quantum Inference Engine</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
          Quantum <span className="text-gradient">Personalization</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We've simulated 1.2 million shopping scenarios based on your Chennai history to manifest these picks.
        </p>
      </motion.div>

      {/* 1. STYLE EVOLUTION TIMELINE */}
      <section className="mb-24">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-primary">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Your Style Evolution</h2>
            <p className="text-sm text-muted-foreground">Tracing your taste trajectory across the multiverse.</p>
          </div>
        </div>

        <div className="relative flex flex-col md:flex-row gap-8 overflow-x-auto pb-4 no-scrollbar">
          {styleTimeline.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-80 glass-card p-6 relative group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Dna className="w-12 h-12" />
              </div>
              <span className="text-[10px] font-black text-primary uppercase mb-2 block">{step.title}</span>
              <p className="text-sm font-medium leading-relaxed">{step.description}</p>
              
              {/* CONNECTING LINE */}
              {i < styleTimeline.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 w-8 h-[1px] bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. THE BIG PREDICTION */}
      <section className="mb-24">
        <div className="glass-card overflow-hidden flex flex-col lg:flex-row shadow-[0_0_80px_rgba(59,130,246,0.15)] border-primary/20">
          <div className="flex-1 p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-bold uppercase tracking-widest text-yellow-500">99.8% AI Conviction Match</span>
            </div>
            <h2 className="text-4xl font-black mb-4">Your Next Great Upgrade</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Based on your purchase of the <span className="text-foreground font-bold italic">Sony WH-1000XM5</span>, our engine predicts the <span className="text-foreground font-bold underlineDecoration-primary">{nextPurchase?.name}</span> will be your optimal productivity multiplier.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold neo-glow-primary transition-all hover:scale-105">
                Add to Reality
              </button>
              <button className="px-8 py-4 glass text-foreground rounded-2xl font-bold hover:bg-white/5">
                Simulate Usage
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-10 flex items-center justify-center lg:w-96 border-l border-white/5 relative overflow-hidden">
            <motion.img 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              src={nextPurchase?.image} 
              className="w-full max-w-[200px] object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]" 
            />
            {/* BRAIN SCAN DECO */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-primary/30 rounded-full animate-ping" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. HIDDEN GEMS GRID */}
      <section className="mb-24">
        <div className="flex items-baseline justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-accent">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold">Hidden Gems for You</h2>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Low Volume • High Affinity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hiddenGems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. FREQUENTLY SYNCED */}
      <section>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-emerald-500">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold">Frequently Synced</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-80 hover:opacity-100 transition-opacity">
          {frequentlyBought.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default QuantumPicks;
