
export function getHistoryCounts(user, products) {
  const counts = {};
  // New: Handle array of objects { productId, ... }
  user.history.forEach((item) => {
    const id = typeof item === 'string' ? item : item.productId;
    const product = products.find((p) => p.id === id);
    const category = product?.category || 'unknown';
    counts[category] = (counts[category] || 0) + 1;
  });
  return counts;
}

export function getFrequentlyBoughtTogether(user, products) {
  const categoryCounts = getHistoryCounts(user, products);
  const favoriteCategories = Object.keys(categoryCounts).sort((a, b) => categoryCounts[b] - categoryCounts[a]);
  const historyIds = user.history.map(item => typeof item === 'string' ? item : item.productId);
  
  return products
    .filter((product) => favoriteCategories.includes(product.category) && !historyIds.includes(product.id))
    .slice(0, 4);
}

export function getStyleEvolution(user, products, orders) {
  const orderedCategories = orders
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((order) => order.items.map((item) => products.find((product) => product.id === item.productId)?.category || ''))
    .flat();
  const timeline = [...new Set(orderedCategories)];
  return timeline.map((category, index) => ({
    title: `Phase ${index + 1}: ${category}`,
    description: `Your journey shifted toward ${category} after a smart purchase sequence.`,
  }));
}

export function getHiddenGems(user, products) {
  const historyIds = user.history.map(item => typeof item === 'string' ? item : item.productId);
  const historyCategories = [...new Set(historyIds.map((id) => products.find((item) => item.id === id)?.category).filter(Boolean))];
  const categoryCounts = getHistoryCounts(user, products);
  const lessFrequent = historyCategories.filter((category) => categoryCounts[category] <= 2);
  
  return products
    .filter((product) => lessFrequent.includes(product.category) && !historyIds.includes(product.id))
    .slice(0, 4);
}

export function getNextBestPurchase(user, products) {
  const categoryCounts = getHistoryCounts(user, products);
  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const brandSet = new Set(user.favoriteBrands || []);
  const historyIds = user.history.map(item => typeof item === 'string' ? item : item.productId);
  
  return (
    products
      .filter((product) => !historyIds.includes(product.id))
      .sort((a, b) => {
        const scoreA = Number(a.category === topCategory) + Number(brandSet.has(a.brand)) + a.rating / 5;
        const scoreB = Number(b.category === topCategory) + Number(brandSet.has(b.brand)) + b.rating / 5;
        return scoreB - scoreA;
      })[0] || products[0]
  );
}

export function getWishlistInsights(wishlist, user, products) {
  const historyIds = user.history.map(item => typeof item === 'string' ? item : item.productId);
  return wishlist.map((id) => {
    const product = products.find((item) => item.id === id);
    const related = products.find((item) => item.category === product?.category && historyIds.includes(item.id));
    return {
      product,
      insight: related
        ? `Based on your past purchase of ${related.name}, this ${product?.category} item is a curated match.`
        : `This item aligns with your preferred ${product?.category} essentials.`,
    };
  });
}

export function scoreSearchMatch(query, product, user) {
  const text = query.toLowerCase();
  const historyIds = user.history.map(item => typeof item === 'string' ? item : item.productId);
  const matches = [product.name, product.brand, product.category].filter((value) => value?.toLowerCase().includes(text)).length;
  const historyScore = historyIds.includes(product.id) ? 5 : 0;
  const categoryMatch = (user.preferences?.categories || user.preferences || []).includes(product.category) ? 2 : 0;
  return matches + categoryMatch + historyScore + product.rating / 2;
}

export function getBestMatchSorted(products, query, user) {
  return products
    .map((product) => ({ product, score: scoreSearchMatch(query, product, user) }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);
}

export function getMatchesHistoryFilter(products, user) {
  const frequentCategories = Object.keys(getHistoryCounts(user, products)).filter((category) => category !== 'unknown');
  return products.filter((product) => frequentCategories.includes(product.category));
}
