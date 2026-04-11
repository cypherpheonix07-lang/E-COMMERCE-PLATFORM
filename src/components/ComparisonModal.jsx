import { motion } from 'framer-motion';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useShopStore } from '../store.js';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api.js';

const ComparisonModal = () => {
  const compare = useShopStore((state) => state.compare);
  const productsQuery = useQuery({ queryKey: ['products'], queryFn: fetchProducts });
  const products = productsQuery.data || [];
  const closeCompare = useShopStore((state) => state.addCompare);
  const anyProducts = compare.map((id) => products.find((product) => product.id === id)).filter(Boolean);

  if (!anyProducts.length) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        className="w-full max-w-6xl overflow-hidden rounded-[2rem] border border-border/70 bg-surface shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent/80">Comparison Tool</p>
            <h2 className="text-xl font-semibold text-foreground">Side-by-side intelligence</h2>
          </div>
          <button className="rounded-full bg-background/80 p-3 text-foreground transition hover:bg-accent/10" onClick={() => compare.forEach((id) => closeCompare(id))}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid gap-4 overflow-x-auto p-6 md:grid-cols-2 xl:grid-cols-4">
          {anyProducts.map((product) => (
            <div key={product.id} className="rounded-3xl border border-border/60 bg-background p-5 shadow-sm">
              <img src={product.image} alt={product.name} className="h-40 w-full rounded-3xl object-cover" />
              <div className="mt-4 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                <p className="text-sm text-foreground/60">{product.brand}</p>
                <p className="text-sm text-foreground/70">{product.category}</p>
                <p className="text-sm text-accent">${product.price}</p>
                <div className="space-y-2 text-sm text-foreground/70">
                  {product.features.slice(0, 3).map((feature) => (
                    <p key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      {feature}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-border/50 px-6 py-4">
          <button className="inline-flex items-center gap-2 rounded-3xl bg-accent px-5 py-3 text-sm font-semibold text-accentForeground transition hover:bg-accent/90">
            Compare {anyProducts.length} products
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ComparisonModal;
