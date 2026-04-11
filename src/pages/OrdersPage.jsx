
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '../api.js';
import { 
  Package, 
  History, 
  MapPin, 
  RefreshCcw, 
  ChevronRight, 
  Zap,
  Globe,
  Clock,
  ShieldCheck
} from 'lucide-react';

const OrdersPage = () => {
  const { data } = useQuery({ queryKey: ['homeData'], queryFn: fetchHomeData });

  if (!data) return (
    <div className="pt-32 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-muted-foreground animate-pulse">Retrieving Temporal Records...</p>
    </div>
  );

  return (
    <div className="pt-28 pb-20 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-2">
          <History className="w-5 h-5 text-emerald-500" />
          <span className="text-xs font-black uppercase tracking-widest text-emerald-500">Temporal Echoes</span>
        </div>
        <h1 className="text-5xl font-black tracking-tighter">
          Shopping <span className="text-gradient">Timeline</span>
        </h1>
        <p className="text-muted-foreground mt-4">Tracking your manifestations across regional supply nodes.</p>
      </div>

      <div className="space-y-12">
        {data.orders.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card overflow-hidden"
          >
            {/* ORDER TOP BAR */}
            <div className="p-6 bg-white/5 border-b border-white/5 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                 <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Manifested On</p>
                    <p className="text-sm font-bold">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                 </div>
                 <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Order ID</p>
                    <p className="text-sm font-mono text-primary">#{order.id.toUpperCase()}</p>
                 </div>
                 <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Reality Node</p>
                    <div className="flex items-center gap-1.5">
                       <Globe className="w-3 h-3 text-emerald-500" />
                       <span className="text-xs font-bold">Chennai 04</span>
                    </div>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                    order.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-primary/10 text-primary border border-primary/20 animate-pulse'
                 }`}>
                    {order.status}
                 </span>
                 <p className="text-xl font-black">${order.total}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3">
               {/* LEFT: PRODUCTS */}
               <div className="lg:col-span-2 p-8 space-y-6">
                  {order.items.map((item, j) => {
                    const productData = data.products.find(p => p.id === item.productId);
                    return (
                      <div key={j} className="flex items-center gap-6 group">
                        <div className="w-16 h-16 glass rounded-xl p-2 shrink-0 group-hover:scale-105 transition-transform">
                           <img src={productData?.image} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                           <p className="text-sm font-bold">{productData?.name}</p>
                           <p className="text-xs text-muted-foreground">{productData?.brand} • Qty: {item.quantity}</p>
                        </div>
                        <button className="flex items-center gap-1 text-[10px] font-black uppercase text-primary hover:underline">
                           <RefreshCcw className="w-3 h-3" />
                           Manifest Again
                        </button>
                      </div>
                    );
                  })}
               </div>

               {/* RIGHT: TEMPORAL TRACKING */}
               <div className="lg:col-span-1 p-8 bg-white/5 border-l border-white/5 relative">
                  <h4 className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-6">Quantum Supply Path</h4>
                  
                  <div className="space-y-6 relative">
                     <div className="absolute left-1.5 top-1 bottom-1 w-[1px] bg-white/10" />
                     
                     <div className="flex gap-4 relative z-10">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 mt-1 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        <div>
                           <p className="text-xs font-bold">Delivered to Chennai</p>
                           <p className="text-[10px] text-muted-foreground">Final node verification complete.</p>
                        </div>
                     </div>

                     <div className="flex gap-4 relative z-10">
                        <div className="w-3 h-3 rounded-full bg-white/20 mt-1" />
                        <div>
                           <p className="text-xs font-medium text-muted-foreground">In Transit</p>
                           <p className="text-[10px] text-muted-foreground/50">Cross-dimensional shipping node.</p>
                        </div>
                     </div>

                     <div className="flex gap-4 relative z-10">
                        <div className="w-3 h-3 rounded-full bg-white/10 mt-1" />
                        <div>
                           <p className="text-xs font-medium text-muted-foreground">Source Hub</p>
                           <p className="text-[10px] text-muted-foreground/50">Order manifest generated.</p>
                        </div>
                     </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                     <div className="flex items-center justify-between p-3 glass rounded-xl hover:bg-white/5 cursor-pointer group">
                        <div className="flex items-center gap-2">
                           <ShieldCheck className="w-4 h-4 text-primary" />
                           <span className="text-xs font-bold">Sustainability Echo</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
