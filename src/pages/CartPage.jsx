import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '../api.js';
import { useShopStore } from '../store.js';
import { getFrequentlyBoughtTogether } from '../hooks/usePersonalization.js';

const CartPage = () => {
  const { data } = useQuery(['homeData'], fetchHomeData);
  const cart = useShopStore((state) => state.cart);
  const addToCart = useShopStore((state) => state.addToCart);

  if (!data) {
    return <p className="rounded-3xl border border-border/70 bg-surface/80 p-8 text-center text-foreground/70">Loading cart details...</p>;
  }

  const items = cart.map((entry) => ({
    ...data.products.find((product) => product.id === entry.productId),
    quantity: entry.quantity,
  }));
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 35;
  const total = subtotal + delivery;
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 3);
  const suggested = getFrequentlyBoughtTogether(data.user, data.products).slice(0, 3);

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-border/60 bg-surface/90 p-8 shadow-glass">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent/80">Smart cart</p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">Your cart is personalized around your best repeat purchases</h2>
            <p className="mt-3 text-sm text-foreground/70">Delivery estimate for Chennai, Tamil Nadu and split payment options are ready when you are.</p>
          </div>
          <div className="rounded-3xl bg-background p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-foreground/50">Estimated delivery</p>
            <p className="mt-4 text-3xl font-semibold text-foreground">{estimatedDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
            <p className="mt-2 text-sm text-foreground/70">Express delivery available to Chennai, Tamil Nadu.</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <section className="rounded-[2rem] border border-border/60 bg-background p-6 shadow-glass">
          <h3 className="text-2xl font-semibold text-foreground">Items in cart</h3>
          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border/70 bg-surface p-4">
                <div>
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-foreground/70">{item.brand} • {item.color}</p>
                  <p className="mt-2 text-sm text-foreground/70">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${item.price * item.quantity}</p>
                  <button type="button" onClick={() => addToCart(item)} className="mt-3 text-sm text-accent">Add one more</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-3xl border border-border/60 bg-surface p-5">
            <h4 className="text-lg font-semibold text-foreground">Split payment options</h4>
            <p className="mt-3 text-sm text-foreground/70">Choose split checkout, EMI, or BNPL right when you review your order.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {['Pay in 3', 'EMI plans', 'Reward points'].map((option) => (
                <div key={option} className="rounded-3xl border border-border/70 bg-background p-4 text-sm text-foreground/75">
                  {option}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-border/60 bg-surface/90 p-6 shadow-glass">
          <p className="text-sm uppercase tracking-[0.3em] text-accent/80">Cart suggestions</p>
          <h3 className="mt-2 text-2xl font-semibold text-foreground">Customers who bought your items also added</h3>
          <div className="mt-6 space-y-4">
            {suggested.map((product) => (
              <div key={product.id} className="rounded-3xl border border-border/70 bg-background p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{product.name}</p>
                    <p className="text-sm text-foreground/70">{product.brand}</p>
                  </div>
                  <button type="button" onClick={() => addToCart(product)} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accentForeground">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-3xl border border-border/60 bg-background p-4 text-sm text-foreground/70">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p className="mt-2">Delivery: ${delivery.toFixed(2)}</p>
            <p className="mt-2 font-semibold text-foreground">Total: ${total.toFixed(2)}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartPage;
