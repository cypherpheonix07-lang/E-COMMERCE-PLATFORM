import { motion } from 'framer-motion';

export default function Insights() {
  return (
    <div className="pt-32 px-8 min-h-screen text-center">
      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-8"
      >
        Deep Analytics
      </motion.h1>
      <p className="text-xl text-white/70">
        Generate exportable reports and visual histories of your localized Chennai-based and global purchases.
      </p>
    </div>
  );
}
