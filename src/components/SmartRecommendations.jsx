import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '../api.js';
import { getFrequentlyBoughtTogether, getHiddenGems, getNextBestPurchase, getStyleEvolution } from '../hooks/usePersonalization.js';
import { useShopStore } from '../store.js';

const tabs = [
  { id: 'frequent', label: 'Frequently Bought Together' },
  { id: 'style', label: 'Style Evolution' },
  { id: 'gems', label: 'Hidden Gems for You' },
  { id: 'next', label: 'Next Best Purchase' },
];

const SmartRecommendations = () => {
  const [activeTab, setActiveTab] = useState('frequent');
  const { data } = useQuery(['homeData'], fetchHomeData);
  const addToCart = useShopStore((state) => state.addToCart);

  if (!data) {
    return <p className="rounded-3xl border border-border/70 bg-surface/80 p-8 text-center text-foreground/70">Loading your personal recommendation engine...</p>;
  }

  const frequent = getFrequentlyBoughtTogether(data.user, data.products);
  const styleEvolution = getStyleEvolution(data.user, data.products, data.orders);
  const hiddenGems = getHiddenGems(data.user, data.products);
  const nextPurchase = getNextBestPurchase(data.user, data.products);

  return (
    <section className="rounded-[2rem] border border-border/60 bg-surface/90 p-6 shadow-glass">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent/80">Smart Recommendations</p>
          <h2 className="mt-2 text-3xl font-semibold text-foreground">Adaptive buying intelligence built for your past preferences</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 text-sm transition ${activeTab === tab.id ? 'bg-accent text-accentForeground' : 'border border-border/70 text-foreground/70 hover:border-accent hover:text-accent'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {activeTab === 'frequent' && (
          <div className="grid gap-4 xl:grid-cols-4">
            {frequent.map((product) => (
              <article key={product.id} className="rounded-3xl border border-border/60 bg-background p-5 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-foreground/50">{product.category}</p>
                <h3 className="mt-2 text-xl font-semibold text-foreground">{product.name}</h3>
                <p className="mt-2 text-sm text-foreground/70">A top pick from the categories you already love and return to often.</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="font-semibold text-accent">${product.price}</span>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accentForeground"
                  >
                    Buy Again
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'style' && (
          <div className="grid gap-4 sm:grid-cols-2">
            {styleEvolution.map((step) => (
              <article key={step.title} className="rounded-3xl border border-border/60 bg-background p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-foreground/75">{step.description}</p>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'gems' && (
          <div className="grid gap-4 xl:grid-cols-4">
            {hiddenGems.map((product) => (
              <article key={product.id} className="rounded-3xl border border-border/60 bg-background p-5 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-foreground/50">Hidden gem</p>
                <h3 className="mt-2 text-xl font-semibold text-foreground">{product.name}</h3>
                <p className="mt-2 text-sm text-foreground/70">This item is from a category you own but have not explored fully yet.</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="font-semibold text-accent">${product.price}</span>
                  <button type="button" onClick={() => addToCart(product)} className="rounded-full border border-accent px-4 py-2 text-sm font-semibold text-accent">
                    Explore
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'next' && (
          <div className="rounded-[2rem] border border-border/60 bg-background p-6 shadow-sm sm:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-foreground/50">Next best purchase</p>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-3xl font-semibold text-foreground">{nextPurchase.name}</h3>
                <p className="mt-3 max-w-2xl text-base leading-7 text-foreground/75">This recommendation is based on your recent kitchen and wearable purchases, matching your premium brand preferences and rising performance tastes.</p>
              </div>
              <button type="button" onClick={() => addToCart(nextPurchase)} className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accentForeground shadow-glass transition hover:bg-accent/90">
                Add to cart — ${nextPurchase.price}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SmartRecommendations;
