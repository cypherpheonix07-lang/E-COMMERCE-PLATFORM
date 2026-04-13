import { motion } from 'framer-motion';

export default function Events() {
  return (
    <div className="pt-32 px-8 min-h-screen text-center">
      <motion.h1 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-5xl font-black text-amber-500 mb-8"
      >
        Festival & Local Experience Hub
      </motion.h1>
      <p className="text-xl text-white/70">
        Curated Chennai/Tamil Nadu specific cultural bundles and pop-up metaverse access points.
      </p>
    </div>
  );
}
