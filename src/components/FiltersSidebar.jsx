const FiltersSidebar = ({ setSearch, setSort, showHistoryOnly, setShowHistoryOnly }) => {
  return (
    <aside className="rounded-[2rem] border border-border/60 bg-surface/90 p-6 shadow-glass">
      <div className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent/80">Search</p>
          <input
            type="search"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search product names or brands"
            className="mt-3 w-full rounded-3xl border border-border/70 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent/80">Sort</p>
          <select onChange={(event) => setSort(event.target.value)} className="mt-3 w-full rounded-3xl border border-border/70 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20">
            <option value="relevance">Relevance to My History</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Popularity</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        <div className="rounded-3xl border border-border/70 bg-background p-4">
          <p className="text-sm uppercase tracking-[0.28em] text-foreground/50">History Match</p>
          <p className="mt-2 text-sm text-foreground/70">Only show products that are aligned with your shopping preferences and categories.</p>
          <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-foreground">
            <input type="checkbox" checked={showHistoryOnly} onChange={(event) => setShowHistoryOnly(event.target.checked)} className="h-5 w-5 rounded border-border/70 bg-background text-accent focus:ring-accent" />
            Matches My History
          </label>
        </div>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
