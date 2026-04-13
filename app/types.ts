export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  brand: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  history: string[]; // product ids
  preferences: string[]; // categories
  recentlyViewed: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}