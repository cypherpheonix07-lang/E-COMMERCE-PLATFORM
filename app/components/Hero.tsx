'use client';

import { motion } from 'framer-motion';
import { useStore } from '../store';

export default function Hero() {
  const { user, products } = useStore();
  const favoriteCategory = user.preferences[0];
  const heroProduct = products.find(p => p.category === favoriteCategory);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Back for more {favoriteCategory}?
        </h2>
        <p className="text-xl mb-8 text-gray-300">
          Discover the latest in {favoriteCategory} tailored just for you
        </p>
        {heroProduct && (
          <div className="mb-8">
            <img src={heroProduct.image} alt={heroProduct.name} className="mx-auto w-64 h-64 object-cover rounded-lg shadow-lg" />
            <h3 className="text-2xl font-semibold mt-4">{heroProduct.name}</h3>
            <p className="text-lg">${heroProduct.price}</p>
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
        >
          Shop Now
        </motion.button>
      </div>
    </motion.section>
  );
}