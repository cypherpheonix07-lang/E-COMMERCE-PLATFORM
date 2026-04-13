
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '../api.js';
import { useShopStore } from '../store.js';
import { getWishlistInsights } from '../hooks/usePersonalization.js';
import ProductCard from '../components/ProductCard.jsx';
import { 
  Heart, 
  Sparkles, 
  TrendingDown, 
  Eye, 
  ShoppingCart,
  Dna,
  Zap,
  Box
} from 'lucide-react';

const WishlistPage = () => {
  const { data } = useQuery({ queryKey: ['homeData'], queryFn: fetchHomeData });
  const { wishlist, addToCart, removeFromWishlist } = useShopStore();

  // ✅ All hooks MUST be called before any early returns
  const insights = useMemo(
    () => data ? getWishlistInsights(wishlist, data.user, data.products) : [],
    [wishlist, data]
  );

  if (!data) return (
    <div className="pt-32 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-muted-foreground animate-pulse">Consulting Price Oracles...</p>
    </div>
  );

  const wishlistProducts = data.products.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="pt-40 pb-20 text-center">
        <div className="w-24 h-24 glass rounded-full flex items-center justify-center mx-auto mb-8 text-pink-500/20">
          <Heart className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black mb-4">No Heartbeats Detected</h2>
        <p className="text-muted-foreground mb-10">Add items to your wishlist to see AI price predictions.</p>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
          <span className="text-xs font-black uppercase tracking-widest text-pink-500">Sentient Wishlist</span>
        </div>
        <h1 className="text-5xl font-black tracking-tighter">
          Desired <span className="text-gradient">Realities</span>
        </h1>
        <p className="text-muted-foreground mt-4">These items are resonating with your local Chennai preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* MAIN WISHLIST GRID */}
        <div className="lg:col-span-2 space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard product={product} />
                  <div className="absolute top-4 right-16 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button 
                        onClick={() => removeFromWishlist(product.id)}
                        className="p-3 glass rounded-xl text-red-500 hover:bg-red-500/20 transition-all"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* AI INSIGHTS SIDEBAR */}
        <div className="lg:col-span-1 space-y-6">
           <div className="glass-card p-8 sticky top-28">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                 <Sparkles className="w-5 h-5 text-primary" />
                 Sentient Insights
              </h3>

              <div className="space-y-6">
                 {insights.map((insight, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 glass rounded-2xl border-white/5 relative group"
                    >
                       <div className="flex gap-4">
                          <div className="w-12 h-12 glass rounded-xl shrink-0 p-2">
                             <img src={insight.product?.image} className="w-full h-full object-contain" />
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase text-pink-500 mb-1">Price Prediction</p>
                             <div className="flex items-center gap-1.5 mb-2">
                                <TrendingDown className="w-3 h-3 text-emerald-500" />
                                <span className="text-xs font-bold text-emerald-500">Price Drop Expected in 3 days</span>
                             </div>
                             <p className="text-xs text-muted-foreground leading-relaxed">{insight.insight}</p>
                          </div>
                       </div>
                    </motion.div>
                 ))}
              </div>

              {/* GLOBAL CTA */}
              <div className="mt-10 pt-10 border-t border-white/5 space-y-4">
                 <button className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-2 neo-glow-primary">
                    <Box className="w-4 h-4" />
                    Holographic AR View All
                 </button>
                 <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest leading-relaxed">
                    Personalized for Chennai Node <br />
                    Loyalty Multiplier: 1.2x Active
                 </p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default WishlistPage;
