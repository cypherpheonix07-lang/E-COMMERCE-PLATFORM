import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '../api.js';
import { useShopStore } from '../store.js';

const ComparePage = () => {
  const { data } = useQuery(['homeData'], fetchHomeData);
  const compare = useShopStore((state) => state.compare);
  const toggleCompare = useShopStore((state) => state.addCompare);

  if (!data) {
    return <p className="rounded-3xl border border-border/70 bg-surface/80 p-8 text-center text-foreground/70">Loading comparison list...</p>;
  }

  const comparedProducts = compare.map((id) => data.products.find((product) => product.id === id)).filter(Boolean);

  return (
    <section className="rounded-[2rem] border border-border/60 bg-surface/90 p-8 shadow-glass">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent/80">Compare</p>
          <h2 className="mt-2 text-3xl font-semibold text-foreground">Review products side by side with your history in mind</h2>
        </div>
        <p className="text-sm text-foreground/70">Remove items from comparison if you want to keep the list under four.</p>
      </div>
      <div className="mt-8 grid gap-4 xl:grid-cols-2">
        {comparedProducts.map((product) => (
          <div key={product.id} className="rounded-3xl border border-border/70 bg-background p-5 shadow-sm">
            <img src={product.image} alt={product.name} className="h-52 w-full rounded-3xl object-cover" />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
              <p className="text-sm text-foreground/70">{product.brand} • {product.category}</p>
              <p className="text-sm text-accent">${product.price}</p>
              <div className="mt-3 grid gap-2 text-sm text-foreground/70">
                {product.features.map((feature) => (
                  <p key={feature}>• {feature}</p>
                ))}
              </div>
              <button type="button" onClick={() => toggleCompare(product.id)} className="mt-4 rounded-full border border-accent px-4 py-3 text-sm font-semibold text-accent">
                Remove from Compare
              </button>
            </div>
          </div>
        ))}
      </div>
      {comparedProducts.length === 0 && <p className="mt-8 rounded-3xl border border-border/70 bg-background p-6 text-center text-foreground/70">Select up to 4 products to see the highlights that align with your past purchases.</p>}
    </section>
  );
};

export default ComparePage;
