import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '../api.js';
import { getBestMatchSorted } from '../hooks/usePersonalization.js';
import ProductCard from '../components/ProductCard.jsx';

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const { data } = useQuery(['homeData'], fetchHomeData);
  const query = useQueryParams().get('q') || '';

  const results = useMemo(() => {
    if (!data || !query) return [];
    return getBestMatchSorted(data.products, query, data.user).filter((product) =>
      [product.name, product.brand, product.category].some((value) => value.toLowerCase().includes(query.toLowerCase()))
    );
  }, [data, query]);

  if (!data) {
    return <p className="rounded-3xl border border-border/70 bg-surface/80 p-8 text-center text-foreground/70">Loading search results...</p>;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-border/60 bg-surface/90 p-8 shadow-glass">
        <p className="text-sm uppercase tracking-[0.3em] text-accent/80">Search</p>
        <h2 className="mt-2 text-3xl font-semibold text-foreground">Best Match for Your History</h2>
        <p className="mt-3 text-sm text-foreground/70">Showing products ranked for your purchase history and brand preferences.</p>
      </section>
      <div className="grid gap-6 xl:grid-cols-2">
        {results.length > 0 ? results.map((product) => <ProductCard key={product.id} product={product} user={data.user} onView={() => {}} />) : <p className="rounded-3xl border border-border/70 bg-background p-8 text-center text-foreground/70">No products matched your query.</p>}
      </div>
    </div>
  );
};

export default SearchResults;
