
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '../api.js';
import { useShopStore } from '../store.js';
import { 
  getFrequentlyBoughtTogether 
} from '../hooks/usePersonalization.js';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Zap, 
  ShieldCheck, 
  MapPin, 
  Cpu,
  ArrowRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const CartPage = () => {
  const { data } = useQuery({ queryKey: ['homeData'], queryFn: fetchHomeData });
  const { cart, addToCart, removeFromCart, updateQuantity, realityMode } = useShopStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!data) return (
    <div className="pt-32 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-muted-foreground animate-pulse">Calculating Singularities...</p>
    </div>
  );

  const cartItems = cart.map((entry) => ({
    ...data.products.find((p) => p.id === entry.productId),
    quantity: entry.quantity,
  })).filter(item => item.id);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.12; // Dynamic Chennai Tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      toast.success("Transaction localized in the Chennai Supply Grid!", {
        icon: '🚀',
        style: { background: '#111', color: '#fff' }
      });
      setIsCheckingOut(false);
    }, 4000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-40 pb-20 text-center">
        <div className="w-24 h-24 glass rounded-full flex items-center justify-center mx-auto mb-8 text-muted-foreground opacity-20">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black mb-4">Your Reality is Empty</h2>
        <p className="text-muted-foreground mb-10">Manifest some products from the Explore page.</p>
        <button className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold neo-glow-primary">
          Back to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* CHECKOUT OVERLAY (SINGULARITY) */}
      <AnimatePresence>
        {isCheckingOut && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center text-center overflow-hidden"
          >
            {/* BLACK HOLE ANIMATION */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 0.5, 20],
                rotate: 720,
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="w-40 h-40 bg-black border-4 border-white/20 rounded-full shadow-[0_0_100px_rgba(255,255,255,0.4)] relative"
            >
               <div className="absolute inset-0 bg-gradient-to-t from-primary via-accent to-transparent rounded-full animate-spin opacity-50" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-12"
            >
              <h2 className="text-4xl font-black mb-2">Singularity Initialized</h2>
              <p className="text-muted-foreground uppercase tracking-[0.3em] text-xs">Processing via Neural Node Chennai</p>
            </motion.div>

            {/* PARTICLE ECHOES */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                 <motion.div
                  key={i}
                  animate={{ 
                    x: [Math.random() * 1000 - 500, 0],
                    y: [Math.random() * 1000 - 500, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
                  className="absolute w-1 h-1 bg-white rounded-full left-1/2 top-1/2"
                 />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* LEFT: CART ITEMS */}
        <div className="flex-1 space-y-6">
          <div className="flex items-end justify-between mb-8">
            <h1 className="text-5xl font-black tracking-tighter">Your <span className="text-gradient">Cart</span></h1>
            <p className="text-sm font-bold text-muted-foreground">{cartItems.length} Manifestations Found</p>
          </div>

          {cartItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 flex items-center gap-6 group"
            >
              <div className="w-24 h-24 glass rounded-2xl p-4 shrink-0 transition-transform group-hover:scale-105">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain filter drop-shadow-xl" />
              </div>

              <div className="flex-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none mb-1">{item.brand}</p>
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <div className="flex items-center gap-4">
                   <div className="flex items-center glass rounded-xl px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="p-1 hover:text-primary transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => addToCart(item.id)} className="p-1 hover:text-primary transition-colors"><Plus className="w-3 h-3" /></button>
                   </div>
                   <button onClick={() => removeFromCart(item.id)} className="text-red-500/50 hover:text-red-500 transition-colors p-2 glass rounded-xl border-red-500/10"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-black">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-[10px] text-muted-foreground">Original Reality Price</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT: SUMMARY & LOGISTICS */}
        <div className="w-full lg:w-[400px] shrink-0 space-y-6">
          
          <div className="glass-card p-8">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
               <Cpu className="w-5 h-5 text-primary" />
               Summary
            </h3>

            <div className="space-y-4 mb-8">
               <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Regional Tax (Chennai 12%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reality Delivery Fee</span>
                  <span className="text-emerald-500 font-bold">FREE</span>
               </div>
               <div className="pt-4 border-t border-white/5 flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-black text-primary">${total.toFixed(2)}</span>
               </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-black flex items-center justify-center gap-3 neo-glow-primary hover:scale-[1.02] transition-all group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Zap className="w-5 h-5" />
              INITIALIZE SINGULARITY
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* REGIONAL LOGISTICS */}
          <div className="glass-card p-6 border-emerald-500/10">
             <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-emerald-500" />
                <p className="text-sm font-bold uppercase tracking-widest text-emerald-500">Chennai Logistics Hub</p>
             </div>
             <div className="space-y-3">
                <div className="flex items-center gap-3">
                   <ShieldCheck className="w-4 h-4 text-emerald-500/60" />
                   <p className="text-xs text-muted-foreground">Guaranteed delivery by Tomorrow, 10:00 AM</p>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-xs text-muted-foreground">Local node synchronization active</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;
