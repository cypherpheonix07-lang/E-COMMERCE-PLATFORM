import { Sparkles } from 'lucide-react';
import { categories } from '../data.js';

const CategoryMegaMenu = ({ categories: activeCategories }) => {
  const highlighted = categories.filter((category) => activeCategories.includes(category.id));

  return (
    <div className="border-t border-border/40 bg-surface/95 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-accentForeground">
          <Sparkles className="h-5 w-5" />
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-accentForeground/80">Mega Menu</p>
            <h2 className="text-base font-semibold">Your most active categories</h2>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {highlighted.map((category) => (
            <div key={category.id} className="rounded-3xl border border-border/70 bg-background/80 p-4 shadow-glass">
              <p className="text-xs uppercase tracking-[0.24em] text-foreground/60">{category.title}</p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{category.banner}</h3>
              <p className="mt-2 text-sm leading-6 text-foreground/70">{category.accent}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryMegaMenu;
