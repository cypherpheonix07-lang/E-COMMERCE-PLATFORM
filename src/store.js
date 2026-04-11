
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products, user as mockUser } from './data';

export const useShopStore = create(
  persist(
    (set, get) => ({
      // --- CORE STORE ---
      cart: [],
      wishlist: [],
      recentlyViewed: [],
      compare: [],
      
      // --- USER & LOYALTY ---
      user: mockUser,
      loyaltyPoints: mockUser.loyalty.points,
      
      // --- OMNI-REALITY STATE ---
      realityMode: 'physical', // 'physical', 'metaverse', 'holographic', 'neural'
      isEvolving: false,
      evolutionProgress: 0,
      
      // --- SENTIENT & AI ---
      sentientMood: 'curious',
      sentientDialogue: 'Welcome back, Arun. I have been analyzing your recent interest in high-end audio...',
      isVoiceActive: false,
      neuralPulse: 0,
      
      // --- ACTIONS ---
      setRealityMode: (mode) => set({ realityMode: mode }),
      
      addToCart: (productId) => set((state) => {
        const existing = state.cart.find(item => item.productId === productId);
        if (existing) {
          return {
            cart: state.cart.map(item => 
              item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }
        return { cart: [...state.cart, { productId, quantity: 1 }] };
      }),
      
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.productId !== productId)
      })),
      
      toggleWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.includes(productId)
          ? state.wishlist.filter(id => id !== productId)
          : [...state.wishlist, productId]
      })),
      
      moveToCart: (productId) => {
        get().addToCart(productId);
        get().toggleWishlist(productId);
      },
      
      addCompare: (productId) => set((state) => {
        if (state.compare.includes(productId)) return { compare: state.compare.filter(id => id !== productId) };
        return { compare: [...state.compare, productId].slice(0, 4) };
      }),
      
      setRecentlyViewed: (productId) => set((state) => ({
        recentlyViewed: [productId, ...state.recentlyViewed.filter(id => id !== productId)].slice(0, 10)
      })),
      
      // Sentient core evolution
      triggerEvolution: () => {
        set({ isEvolving: true });
        setTimeout(() => set({ isEvolving: false, evolutionProgress: 100 }), 3000);
      },
      
      setSentientMood: (mood) => set({ sentientMood: mood }),
      setSentientDialogue: (text) => set({ sentientDialogue: text }),
      
      toggleVoice: () => set((state) => ({ isVoiceActive: !state.isVoiceActive })),
      
      updateNeuralPulse: (val) => set({ neuralPulse: val }),

      // Sync user data
      syncUser: (data) => set({ user: { ...get().user, ...data } })
    }),
    {
      name: 'historicart-omega-storage',
    }
  )
);
