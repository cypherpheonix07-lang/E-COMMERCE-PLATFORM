
import React from 'react';
import { motion } from 'framer-motion';
import { useShopStore } from '../store';
import { ShoppingCart, Heart, Eye, Dna, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist, setRecentlyViewed } = useShopStore();
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product.id);
    toast.success(`${product.name} added to cart!`, {
      style: {
        borderRadius: '16px',
        background: '#111',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.1)'
      }
    });
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onClick={() => setRecentlyViewed(product.id)}
      className="glass-card group flex flex-col h-full relative overflow-hidden"
    >
      {/* GLOW OVERLAY */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* TOP ACTIONS */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button 
          onClick={handleToggleWishlist}
          className={`p-2 rounded-xl backdrop-blur-md border border-white/10 transition-all ${
            isWishlisted ? 'bg-pink-500 text-white' : 'glass text-foreground/70 hover:text-foreground'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
        <button className="p-2 glass rounded-xl text-foreground/70 hover:text-foreground backdrop-blur-md border border-white/10 transition-all">
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* DNA PERCENTAGE */}
      <div className="absolute top-4 left-4 z-10">
        <div className="glass px-2 py-1 rounded-full border border-primary/30 flex items-center gap-1.5">
          <Dna className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-bold text-primary">98% Match</span>
        </div>
      </div>

      {/* IMAGE */}
      <div className="aspect-square p-8 flex items-center justify-center relative bg-gradient-to-b from-white/5 to-transparent">
        <motion.img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-lighten transition-transform duration-500 group-hover:scale-110" 
        />
        {/* SHADOW */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-1/2 h-4 bg-black/40 blur-xl rounded-full" />
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-1 relative">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{product.brand}</p>
          <div className="flex gap-1">
             {product.dna?.tech > 80 && <Zap className="w-3 h-3 text-yellow-500" />}
          </div>
        </div>
        
        <h3 className="text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xl font-black">${product.price}</span>
          <button 
            onClick={handleAddToCart}
            className="p-3 bg-primary text-primary-foreground rounded-xl neo-glow-primary hover:scale-105 transition-transform"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
