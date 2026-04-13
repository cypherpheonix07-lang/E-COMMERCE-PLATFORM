import { user, orders } from './data.js';
import { products } from './data/products.js';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchProducts() {
  await delay(240);
  return products;
}

export async function fetchUser() {
  await delay(160);
  return user;
}

export async function fetchOrders() {
  await delay(200);
  return orders;
}

export async function fetchHomeData() {
  const [productList, userProfile, pastOrders] = await Promise.all([fetchProducts(), fetchUser(), fetchOrders()]);
  return { products: productList, user: userProfile, orders: pastOrders };
}
