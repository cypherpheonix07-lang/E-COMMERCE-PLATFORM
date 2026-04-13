'use client';

import { motion } from 'framer-motion';
import { Search, ShoppingCart, User, Heart, Menu } from 'lucide-react';
import { useStore } from '../store';

export default function Header() {
  const { user, cart, getCartTotal } = useStore();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gray-800 shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-blue-400">NEXUS</h1>
          <p className="text-sm text-gray-300">Good morning, {user.name} 👋</p>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search your favorites..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <nav className="hidden md:flex space-x-6">
          {user.preferences.map(category => (
            <a key={category} href="#" className="text-gray-300 hover:text-blue-400 transition-colors capitalize">
              {category}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button className="relative">
            <ShoppingCart size={24} className="text-gray-300 hover:text-blue-400" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
                {cart.length}
              </span>
            )}
          </button>
          <div className="relative">
            <button className="flex items-center space-x-2" aria-label="User menu">
              <User size={24} className="text-gray-300 hover:text-blue-400" />
            </button>
            {/* Dropdown would go here */}
          </div>
        </div>
      </div>
    </motion.header>
  );
}