import { motion } from 'framer-motion';

export default function Community() {
  return (
    <div className="pt-32 px-8 min-h-screen text-center">
      <motion.h1 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-5xl font-black text-emerald-400 mb-8"
      >
        Similar Shoppers Feed
      </motion.h1>
      <p className="text-xl text-white/70">
        Connect directly with user clusters matching your personalized shopping DNA.
      </p>
    </div>
  );
}
