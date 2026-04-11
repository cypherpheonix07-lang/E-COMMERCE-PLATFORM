
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '../api.js';
import { useShopStore } from '../store.js';
import { 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Cpu, 
  Dna,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const ComparePage = () => {
  const { data } = useQuery({ queryKey: ['homeData'], queryFn: fetchHomeData });
  const { compare, removeFromCompare } = useShopStore();

  if (!data) return (
    <div className="pt-32 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-muted-foreground animate-pulse">Aligning Spec Arrays...</p>
    </div>
  );

  const compareProducts = data.products.filter(p => compare.includes(p.id));

  if (compareProducts.length === 0) {
    return (
      <div className="pt-40 pb-20 text-center">
        <div className="w-24 h-24 glass rounded-full flex items-center justify-center mx-auto mb-8 text-muted-foreground opacity-20">
          <Zap className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black mb-4">No Reality Comparison Active</h2>
        <p className="text-muted-foreground mb-10">Select products from the Explore page to analyze side-by-side.</p>
      </div>
    );
  }

  const features = [...new Set(compareProducts.flatMap(p => p.features))];

  return (
    <div className="pt-28 pb-20 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <div className="mb-16 flex flex-col md:flex-row items-end justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
             <Cpu className="w-5 h-5 text-primary" />
             <span className="text-xs font-black uppercase tracking-widest text-primary">Multiverse Spec Matrix</span>
           </div>
           <h1 className="text-5xl font-black tracking-tighter">
             Quantum <span className="text-gradient">Analysis</span>
           </h1>
        </div>
        <div className="px-6 py-3 glass rounded-2xl border-white/5 flex items-center gap-3">
           <Zap className="w-4 h-4 text-yellow-500" />
           <span className="text-sm font-bold">Comparing {compareProducts.length} Manifestations</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-8 no-scrollbar">
         <div className="min-w-[800px] border border-white/5 rounded-[2.5rem] bg-white/5 overflow-hidden">
            <table className="w-full border-collapse">
               <thead>
                  <tr>
                     <th className="p-8 text-left bg-black/20 w-80">
                        <p className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground">Attributes</p>
                     </th>
                     {compareProducts.map(product => (
                        <th key={product.id} className="p-8 bg-black/10 border-l border-white/5 relative group">
                           <button 
                             onClick={() => removeFromCompare(product.id)}
                             className="absolute top-4 right-4 p-2 glass rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-red-500"
                           >
                              <X className="w-4 h-4" />
                           </button>
                           <div className="w-32 h-32 glass rounded-2xl p-4 mx-auto mb-6">
                              <img src={product.image} className="w-full h-full object-contain" />
                           </div>
                           <h3 className="text-lg font-bold">{product.name}</h3>
                           <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mt-1">{product.brand}</p>
                           <p className="text-2xl font-black text-primary mt-4">${product.price}</p>
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {/* REALITY MATCH */}
                  <tr>
                     <td className="p-8 border-t border-white/5 bg-black/10">
                        <div className="flex items-center gap-2">
                           <Dna className="w-4 h-4 text-primary" />
                           <span className="text-xs font-black uppercase tracking-widest">DNA Compatibility</span>
                        </div>
                     </td>
                     {compareProducts.map(p => (
                        <td key={p.id} className="p-8 border-t border-l border-white/5 text-center">
                           <span className="text-xl font-black text-primary">98%</span>
                        </td>
                     ))}
                  </tr>

                  {/* CROSS-REALITY PERK */}
                  <tr>
                     <td className="p-8 border-t border-white/5 bg-black/10">
                        <div className="flex items-center gap-2">
                           <Zap className="w-4 h-4 text-yellow-500" />
                           <span className="text-xs font-black uppercase tracking-widest">Metaverse Perk</span>
                        </div>
                     </td>
                     {compareProducts.map(p => (
                        <td key={p.id} className="p-8 border-t border-l border-white/5 text-center">
                           <p className="text-xs text-muted-foreground font-medium">Unlocked 3D Avatar Gear</p>
                        </td>
                     ))}
                  </tr>

                  {/* FEATURE MATRIX */}
                  {features.map((feature, i) => (
                     <tr key={i}>
                        <td className="p-8 border-t border-white/5 bg-black/10">
                           <p className="text-xs font-medium text-muted-foreground">{feature}</p>
                        </td>
                        {compareProducts.map(p => (
                           <td key={p.id} className="p-8 border-t border-l border-white/5 text-center">
                              {p.features.includes(feature) ? (
                                 <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                              ) : (
                                 <div className="w-5 h-[1px] bg-white/10 mx-auto" />
                              )}
                           </td>
                        ))}
                     </tr>
                  ))}

                  {/* AI SUMMARY ROW */}
                  <tr>
                     <td className="p-8 border-t border-white/5 bg-black/10">
                         <div className="flex items-center gap-2">
                           <ShieldCheck className="w-4 h-4 text-primary" />
                           <span className="text-xs font-black uppercase tracking-widest">AI Verdict</span>
                        </div>
                     </td>
                     {compareProducts.map(p => (
                        <td key={p.id} className="p-8 border-t border-l border-white/5 text-center align-top">
                           <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                              <p className="text-[10px] text-muted-foreground leading-relaxed text-left italic">
                                 "Optimized for your tech-stack in Chennai. Highly recommended for long-term loyalty growth."
                              </p>
                           </div>
                        </td>
                     ))}
                  </tr>
               </tbody>
            </table>
         </div>
      </div>

      {/* CTA FOOTER */}
      <div className="mt-12 p-8 glass-card border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary">
               <AlertCircle className="w-6 h-6" />
            </div>
            <div>
               <p className="font-bold">Multiverse Alert</p>
               <p className="text-sm text-muted-foreground">Merging these manifestations may deplete regional inventory.</p>
            </div>
         </div>
         <button className="px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-black neo-glow-primary hover:scale-[1.02] transition-all flex items-center gap-2">
            Finalize Selection
            <ArrowRight className="w-5 h-5" />
         </button>
      </div>

    </div>
  );
};

export default ComparePage;
