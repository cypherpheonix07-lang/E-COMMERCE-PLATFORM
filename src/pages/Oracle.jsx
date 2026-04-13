import { motion } from 'framer-motion';

export default function Oracle() {
  return (
    <div className="pt-32 px-8 min-h-screen text-center flex flex-col items-center justify-center">
      <div className="w-32 h-32 rounded-full border-4 border-cyan-500/50 animate-pulse mb-8 relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-cyan-400 blur-md"></div>
      </div>
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-black text-cyan-400 mb-4"
      >
        The Oracle
      </motion.h1>
      <p className="text-lg text-white/60">
        AI conversational node generating future shopping predictions and hyper-specific recommendations.
      </p>
    </div>
  );
}
