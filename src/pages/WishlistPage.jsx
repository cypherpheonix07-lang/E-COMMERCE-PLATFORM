import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '../api.js';
import { useShopStore } from '../store.js';
import { getWishlistInsights } from '../hooks/usePersonalization.js';

const WishlistPage = () => {
  const { data } = useQuery(['homeData'], fetchHomeData);
  const moveToCart = useShopStore((state) => state.moveToCart);
  const toggleWishlist = useShopStore((state) => state.toggleWishlist);

  if (!data) {
    return <p className="rounded-3xl border border-border/70 bg-surface/80 p-8 text-center text-foreground/70">Loading your wishlist insights...</p>;
  }

  const wishlistInsights = getWishlistInsights(data.user.wishlist, data.user, data.products);

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-border/60 bg-surface/90 p-8 shadow-glass">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent/80">Wishlist</p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">Smart suggestions and instant move-to-cart actions</h2>
          </div>
          <p className="text-sm text-foreground/70">Items in your wishlist are matched to past purchases for faster checkout.</p>
        </div>
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        {wishlistInsights.map(({ product, insight }) => (
          <article key={product.id} className="rounded-[2rem] border border-border/60 bg-background p-6 shadow-glass">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">{product.category}</p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">{product.name}</h3>
                <p className="mt-3 text-sm leading-6 text-foreground/70">{product.description}</p>
              </div>
              <span className="rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">${product.price}</span>
            </div>
            <div className="mt-6 rounded-3xl border border-border/70 bg-surface p-4 text-sm text-foreground/70">
              <p className="font-semibold text-foreground">Wishlist Insight</p>
              <p className="mt-2">{insight}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => moveToCart(product.id)} className="rounded-3xl bg-accent px-4 py-3 text-sm font-semibold text-accentForeground">
                Move to Cart
              </button>
              <button type="button" onClick={() => toggleWishlist(product.id)} className="rounded-3xl border border-border/60 px-4 py-3 text-sm text-foreground/80 hover:border-accent hover:text-accent">
                Remove from Wishlist
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default WishlistPage;
