
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '../api.js';
import { getBestMatchSorted } from '../hooks/usePersonalization.js';
import ProductCard from '../components/ProductCard.jsx';
import { Search, Sparkles, Filter, Ghost } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get('q') || '';

  const { data } = useQuery({ queryKey: ['homeData'], queryFn: fetchHomeData });

  const results = useMemo(() => {
    if (!data || !q) return [];
    return getBestMatchSorted(data.products, q, data.user);
  }, [data, q]);

  if (!data) return (
    <div className="pt-32 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-muted-foreground animate-pulse">Scanning the Ether...</p>
    </div>
  );

  return (
    <div className="pt-28 pb-20 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* SEARCH HEADER */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-5 h-5 text-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-primary">Neural Perception Search</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter">
            Manifested Results for <span className="text-gradient">"{q}"</span>
          </h1>
        </motion.div>

        <div className="flex gap-4">
           <div className="px-4 py-2 glass rounded-xl border-white/5 text-xs font-bold flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-primary" />
              Intelligence Match: Active
           </div>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center glass-card border-dashed border-white/10">
          <Ghost className="w-16 h-16 text-muted-foreground opacity-20 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-2">No Resonance Found</h2>
          <p className="text-muted-foreground">Try adjusting your query or switching realities.</p>
        </div>
      )}

      {/* SEARCH SUGGESTIONS */}
      <div className="mt-20">
         <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-8">Related Manifestations</h3>
         <div className="flex flex-wrap gap-4">
            {['Tech', 'Audo', 'Chennai Specials', 'Premium Essentials'].map(tag => (
               <button key={tag} className="px-6 py-3 glass rounded-2xl text-sm font-medium hover:bg-primary/10 transition-all border-white/5">
                  {tag}
               </button>
            ))}
         </div>
      </div>
    </div>
  );
};

export default SearchResults;
