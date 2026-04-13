'use client';

import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store';

interface ProductCardProps {
  product: Product;
  isRecommended?: boolean;
}

export default function ProductCard({ product, isRecommended }: ProductCardProps) {
  const { addToCart } = useStore();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        {isRecommended && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-sm">
            Best Match
          </div>
        )}
        <button className="absolute top-2 right-2 text-red-500 hover:text-red-600" aria-label="Add to wishlist">
          <Heart size={20} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
            ))}
          </div>
          <span className="text-sm text-gray-400 ml-2">({product.rating})</span>
        </div>
        <p className="text-gray-400 text-sm mb-2">{product.brand}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-400">${product.price}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}