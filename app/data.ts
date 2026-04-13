import { Product, User } from './types';

export const products: Product[] = [
  { id: '1', name: 'Gaming Laptop', price: 1200, category: 'electronics', image: 'https://via.placeholder.com/300x200/4A5568/FFFFFF?text=Gaming+Laptop', rating: 4.5, brand: 'TechBrand', description: 'High-performance gaming laptop.' },
  { id: '2', name: 'Smartphone Pro', price: 800, category: 'electronics', image: 'https://via.placeholder.com/300x200/2D3748/FFFFFF?text=Smartphone+Pro', rating: 4.7, brand: 'PhoneCo', description: 'Latest smartphone with advanced features.' },
  { id: '3', name: 'Wireless Headphones', price: 150, category: 'electronics', image: 'https://via.placeholder.com/300x200/1A202C/FFFFFF?text=Wireless+Headphones', rating: 4.3, brand: 'AudioTech', description: 'Noise-cancelling wireless headphones.' },
  { id: '4', name: 'JavaScript Guide Book', price: 30, category: 'books', image: 'https://via.placeholder.com/300x200/4C51BF/FFFFFF?text=JavaScript+Guide', rating: 4.8, brand: 'CodeBooks', description: 'Comprehensive guide to JavaScript.' },
  { id: '5', name: 'Designer T-shirt', price: 25, category: 'clothing', image: 'https://via.placeholder.com/300x200/2B6CB0/FFFFFF?text=Designer+T-shirt', rating: 4.2, brand: 'FashionCo', description: 'Stylish designer t-shirt.' },
  { id: '6', name: 'Mystery Novel', price: 15, category: 'books', image: 'https://via.placeholder.com/300x200/805AD5/FFFFFF?text=Mystery+Novel', rating: 4.0, brand: 'BookPub', description: 'Thrilling mystery novel.' },
  { id: '7', name: 'Smart Watch', price: 300, category: 'electronics', image: 'https://via.placeholder.com/300x200/319795/FFFFFF?text=Smart+Watch', rating: 4.6, brand: 'WearTech', description: 'Feature-rich smart watch.' },
  { id: '8', name: 'Coding Keyboard', price: 100, category: 'electronics', image: 'https://via.placeholder.com/300x200/38A169/FFFFFF?text=Coding+Keyboard', rating: 4.4, brand: 'KeyTech', description: 'Mechanical keyboard for programmers.' },
];

export const user: User = {
  id: '1',
  name: 'WHITE_DEVIL',
  history: ['1', '2', '3'], // bought laptop, phone, headphones
  preferences: ['electronics', 'books'],
  recentlyViewed: ['7', '8'],
};

export const categories = ['electronics', 'books', 'clothing'];

export function getRecommendations(user: User, products: Product[]): Product[] {
  const historyCategories = user.history.map(id => products.find(p => p.id === id)?.category).filter(Boolean);
  const uniqueCategories = [...new Set(historyCategories)];
  return products.filter(p => uniqueCategories.includes(p.category) && !user.history.includes(p.id));
}

export function getFrequentlyBoughtTogether(user: User, products: Product[]): Product[] {
  // Simple logic: products from same categories
  return getRecommendations(user, products).slice(0, 3);
}