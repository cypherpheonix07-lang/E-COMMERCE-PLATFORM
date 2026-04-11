
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '../api.js';
import ProductCard from '../components/ProductCard.jsx';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ExplorePage = () => {
  const { data } = useQuery({ queryKey: ['homeData'], queryFn: fetchHomeData });
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  if (!data) return (
    <div className="pt-32 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-muted-foreground animate-pulse">Synchronizing with Global Node...</p>
    </div>
  );

  const filtered = useMemo(() => {
    let list = data.products;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }
    return list;
  }, [data.products, search, selectedCategory]);

  const categories = ['all', ...new Set(data.products.map(p => p.category))];

  return (
    <div className="pt-28 pb-20 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-primary">Intelligence-Led Search</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter">
            Manifested <span className="text-gradient">Products</span>
          </h1>
        </motion.div>

        {/* SEARCH BOX */}
        <div className="w-full md:w-96 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search the multiverse..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 glass rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none border-white/5"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR FILTERS */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="glass-card p-6 sticky top-28">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal className="w-4 h-4" />
              <h3 className="font-bold uppercase text-[10px] tracking-widest">Neural Filters</h3>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground mb-3">Categories</p>
                <div className="flex flex-col gap-1">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left px-3 py-2 rounded-xl text-sm capitalize transition-all ${
                        selectedCategory === cat ? 'bg-primary/20 text-primary font-bold' : 'hover:bg-white/5 text-muted-foreground'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filtered.length === 0 && (
            <div className="py-20 text-center glass-card">
              <p className="text-muted-foreground">No products found in this reality.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
