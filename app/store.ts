import { create } from 'zustand';
import { Product, User, CartItem } from './types';

interface Store {
  user: User;
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  getCartTotal: () => number;
}

export const useStore = create<Store>((set, get) => ({
  user: {
    id: '1',
    name: 'WHITE_DEVIL',
    history: ['1', '2', '3'],
    preferences: ['electronics', 'books'],
    recentlyViewed: ['7', '8'],
  },
  products: [
    { id: '1', name: 'Gaming Laptop', price: 1200, category: 'electronics', image: '/laptop.jpg', rating: 4.5, brand: 'TechBrand', description: 'High-performance gaming laptop.' },
    { id: '2', name: 'Smartphone Pro', price: 800, category: 'electronics', image: '/phone.jpg', rating: 4.7, brand: 'PhoneCo', description: 'Latest smartphone with advanced features.' },
    { id: '3', name: 'Wireless Headphones', price: 150, category: 'electronics', image: '/headphones.jpg', rating: 4.3, brand: 'AudioTech', description: 'Noise-cancelling wireless headphones.' },
    { id: '4', name: 'JavaScript Guide Book', price: 30, category: 'books', image: '/book.jpg', rating: 4.8, brand: 'CodeBooks', description: 'Comprehensive guide to JavaScript.' },
    { id: '5', name: 'Designer T-shirt', price: 25, category: 'clothing', image: '/tshirt.jpg', rating: 4.2, brand: 'FashionCo', description: 'Stylish designer t-shirt.' },
    { id: '6', name: 'Mystery Novel', price: 15, category: 'books', image: '/novel.jpg', rating: 4.0, brand: 'BookPub', description: 'Thrilling mystery novel.' },
    { id: '7', name: 'Smart Watch', price: 300, category: 'electronics', image: '/watch.jpg', rating: 4.6, brand: 'WearTech', description: 'Feature-rich smart watch.' },
    { id: '8', name: 'Coding Keyboard', price: 100, category: 'electronics', image: '/keyboard.jpg', rating: 4.4, brand: 'KeyTech', description: 'Mechanical keyboard for programmers.' },
  ],
  cart: [],
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.product.id === product.id);
    if (existing) {
      return {
        cart: state.cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    return { cart: [...state.cart, { product, quantity: 1 }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.product.id !== productId),
  })),
  getCartTotal: () => get().cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
}));