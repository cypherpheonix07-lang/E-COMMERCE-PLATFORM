import { motion } from 'framer-motion';

export default function Forge() {
  return (
    <div className="pt-32 px-8 min-h-screen text-center">
      <motion.h1 
        initial={{ opacity: 0, rotateX: 90 }}
        animate={{ opacity: 1, rotateX: 0 }}
        className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 mb-8"
      >
        The Forge
      </motion.h1>
      <p className="text-xl text-white/70">
        Mock forge user-generated products based on shared shopping histories.
      </p>
    </div>
  );
}
