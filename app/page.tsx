'use client';

import { useStore } from './store';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';

export default function Home() {
  const { user, products } = useStore();

  // Personalization logic: recommend products from user's preferred categories
  const recommendations = products.filter(p =>
    user.preferences.includes(p.category) && !user.history.includes(p.id)
  );

  // Frequently bought together: products from same categories as history
  const frequentlyBought = products.filter(p =>
    user.history.some(id => {
      const histProduct = products.find(prod => prod.id === id);
      return histProduct && histProduct.category === p.category && p.id !== id;
    })
  );

  // Recently viewed
  const recentlyViewed = products.filter(p => user.recentlyViewed.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Hero />
      <ProductList products={recommendations.slice(0, 4)} title="Recommended Just For You" />
      <ProductList products={frequentlyBought.slice(0, 4)} title="Because You Bought Electronics" />
      <ProductList products={recentlyViewed} title="Recently Viewed" />
    </div>
  );
}