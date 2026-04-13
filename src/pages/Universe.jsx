import { motion } from 'framer-motion';

export default function Universe() {
  return (
    <div className="pt-32 px-8 min-h-screen text-center">
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 mb-8"
      >
        Sentient Universe
      </motion.h1>
      <p className="text-xl text-white/70">
        Navigate your shopping history entirely through a 3D localized map.
      </p>
    </div>
  );
}
