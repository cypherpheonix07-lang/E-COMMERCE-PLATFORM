import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Dna, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useShopStore } from '../store';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useShopStore();
  const [activeTab, setActiveTab] = useState('description');

  if (!product) return <div className="pt-32 text-center text-white">Product Not Found in this Timeline.</div>;

  return (
    <div className="pt-32 px-4 sm:px-8 pb-32 min-h-screen max-w-screen-xl mx-auto">
      <Link to="/shop" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Marketplace
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* IMAGE GALLERY WITH PROMPTS */}
        <div className="space-y-4">
          <div className="aspect-square glass rounded-3xl overflow-hidden relative group p-8 flex items-center justify-center">
            <p className="absolute top-4 left-4 right-4 text-[10px] text-white/30 font-mono opacity-0 group-hover:opacity-100 transition-opacity z-20">
              PROMPT: {product.imagePrompts[0]}
            </p>
            <img 
              src={`https://picsum.photos/seed/${product.id}/1000/1000`} 
              alt={product.name} 
              className="w-full h-full object-cover mix-blend-screen opacity-90 transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.imagePrompts.slice(1).map((prompt, i) => (
              <div key={i} className="aspect-square glass rounded-xl overflow-hidden relative group">
                <p className="absolute inset-0 p-2 text-[8px] text-white/80 font-mono bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-pre-wrap overflow-y-auto">
                  {prompt}
                </p>
                <img src={`https://picsum.photos/seed/${product.id}-${i}/400/400`} alt="detail" className="w-full h-full object-cover mix-blend-screen opacity-70" />
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col">
          <div className="mb-2">
             <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white/70 uppercase tracking-widest">
               {product.brand}
             </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
            <div className="flex text-yellow-400">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="font-bold text-white text-lg">{product.rating}</span>
            <span className="text-white/40">({product.reviewCount} customer reviews)</span>
          </div>

          <div className="mb-8">
            <p className="text-4xl font-black text-white mb-2">${product.price}</p>
            {product.discount > 0 && (
              <p className="text-sm text-white/40 line-through">Originally ${product.originalPrice} ({product.discount}% off)</p>
            )}
          </div>

          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-8 flex gap-3 items-start">
            <Dna className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div>
              <p className="font-bold text-primary mb-1">Why This Matches You</p>
              <p className="text-sm text-primary/70 leading-relaxed">{product.matchesHistory}</p>
            </div>
          </div>

          <button 
            onClick={() => addToCart(product.id)}
            className="w-full py-4 bg-primary text-primary-foreground text-lg font-black rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform glow-primary flex items-center justify-center gap-2 mt-auto"
          >
            <ShoppingCart className="w-6 h-6" /> Assimilate to Cart
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="border-t border-white/10 pt-16">
        <div className="flex gap-8 mb-8 border-b border-white/10 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {['description', 'specifications', 'reviews'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-white/40 hover:text-white/80'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div>
          {activeTab === 'description' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 text-white/70 leading-relaxed text-lg max-w-4xl">
              <p>{product.description}</p>
              <div>
                <h4 className="font-bold text-white mb-4">Core Integration Features</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {product.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'specifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 gap-4 max-w-4xl">
              {Object.entries(product.specifications).map(([key, val], i) => (
                <div key={i} className="p-4 glass rounded-xl border border-white/5 flex flex-col gap-1">
                  <span className="text-xs text-white/40 font-bold uppercase">{key}</span>
                  <span className="text-white/90 font-medium">{val}</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ReviewList reviews={product.reviews} />
              <ReviewForm />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
