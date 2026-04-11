import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '../api.js';
import { useShopStore } from '../store.js';
import OrderTimeline from '../components/OrderTimeline.jsx';

const OrdersPage = () => {
  const { data } = useQuery(['homeData'], fetchHomeData);
  const reorderOrder = useShopStore((state) => state.reorderOrder);

  if (!data) {
    return <p className="rounded-3xl border border-border/70 bg-surface/80 p-8 text-center text-foreground/70">Loading your order timeline...</p>;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-border/60 bg-surface/90 p-8 shadow-glass">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent/80">Order History</p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">Timeline of your past purchases</h2>
          </div>
          <p className="text-sm text-foreground/70">Reorder favorites with one click and keep the momentum moving.</p>
        </div>
      </section>

      <OrderTimeline orders={data.orders} products={data.products} onReorder={reorderOrder} />

      <section className="rounded-[2rem] border border-border/60 bg-background p-8 shadow-glass">
        <h3 className="text-2xl font-semibold text-foreground">Buy it Again</h3>
        <p className="mt-2 text-sm text-foreground/70">Recommended products from your most recent order for instant restock.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {data.orders[0].items.map((item) => {
            const product = data.products.find((productItem) => productItem.id === item.productId);
            return (
              product && (
                <div key={product.id} className="rounded-3xl border border-border/60 bg-surface p-5">
                  <p className="text-sm text-foreground/60">{product.brand}</p>
                  <h4 className="mt-2 text-lg font-semibold text-foreground">{product.name}</h4>
                  <p className="mt-4 text-sm text-foreground/70">Add it back to your cart and keep your setup consistent.</p>
                  <button type="button" onClick={() => reorderOrder([{ productId: product.id, quantity: 1 }])} className="mt-4 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-accentForeground">
                    Buy it again
                  </button>
                </div>
              )
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default OrdersPage;
