import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Filter, Search } from 'lucide-react';

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-32 px-4 sm:px-8 min-h-screen max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div className="max-w-2xl text-left">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4"
          >
            Omega Marketplace
          </motion.h1>
          <p className="text-xl text-white/50">
            Live global price comparisons natively connected to your Chennai footprint.
          </p>
        </div>

        <div className="flex w-full md:w-auto items-center gap-4">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            <input 
              type="text"
              placeholder="Search infinite products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
            <Filter className="w-5 h-5 text-white/70" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
              activeCategory === cat ? 'bg-primary text-black' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-32"
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center text-white/40">
          <p>No products match your current resonance search in this timeline.</p>
        </div>
      )}
    </div>
  );
}
