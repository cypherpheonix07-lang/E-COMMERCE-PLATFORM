import { motion } from 'framer-motion';
import { useShopStore } from '../store.js';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api.js';

const RecentlyViewedCarousel = () => {
  const recentlyViewed = useShopStore((state) => state.recentlyViewed);
  const { data: products } = useQuery(['products'], fetchProducts);
  const items = products?.filter((product) => recentlyViewed.includes(product.id)) ?? [];

  if (!items.length) return null;

  return (
    <section className="my-10 rounded-[2rem] border border-border/60 bg-surface/90 p-4 shadow-glass">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/50">Recently Viewed</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">Your session and history in motion</h2>
        </div>
      </div>
      <div className="mt-6 grid gap-4 overflow-x-auto md:grid-cols-3">
        {items.map((product) => (
          <motion.div key={product.id} whileHover={{ y: -5 }} className="rounded-3xl border border-border/70 bg-background p-4 shadow-sm">
            <img src={product.image} alt={product.name} className="h-44 w-full rounded-3xl object-cover" />
            <div className="mt-4">
              <p className="text-sm text-foreground/60">{product.brand}</p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{product.name}</h3>
              <p className="mt-3 text-sm text-foreground/70">{product.features.slice(0, 2).join(' · ')}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewedCarousel;
