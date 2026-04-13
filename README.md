# HistoriCart — Personalized E-commerce Platform

A luxury, production-ready storefront built with React 18, Vite, Tailwind CSS v4, React Router v7, Zustand, and advanced personalization logic.

## Features

- **Personalized Recommendations**: AI-powered product suggestions based on user history
- **Dark Mode Premium Design**: Elegant luxury aesthetic with smooth animations
- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **Smart Search**: Autocomplete with category suggestions
- **Shopping Cart**: Real-time cart management with Zustand state
- **User Dashboard**: Personalized greetings and navigation
- **Product Discovery**: Trending items in preferred categories

## Tech Stack

- **Frontend**: React 18, Vite, JavaScript
- **Styling**: Tailwind CSS v4 with custom glassmorphism
- **Animations**: Framer Motion + React Spring
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) to view the platform.

## Personalization Logic

The platform uses the following personalization features:

- **User Profile**: Based on shopping history and preferences
- **Recommendations**: Products from preferred categories not yet purchased
- **Frequently Bought Together**: Items from same categories as past purchases
- **Recently Viewed**: Items recently browsed
- **Dynamic Hero**: Tailored banners based on user interests

## Project Structure

```
app/
├── components/
│   ├── Header.tsx          # Navigation with personalized greeting
│   ├── Hero.tsx            # Dynamic hero section
│   ├── ProductCard.tsx     # Product display with ratings and actions
│   └── ProductList.tsx     # Product grid with animations
├── store.ts                # Zustand state management
├── types.ts                # TypeScript interfaces
├── data.ts                 # Mock data and personalization functions
├── layout.tsx              # Root layout with dark theme
├── page.tsx                # Main homepage
└── globals.css             # Tailwind and custom styles
```

## Customization

To connect to real user data, update the `user` object in `store.ts` and modify the personalization functions in `data.ts`.

## Deployment

Build for production:
```bash
npm run build
npm start
```

## Contributing

This platform is designed to be easily extensible. Add new components, features, or integrate with real APIs as needed.