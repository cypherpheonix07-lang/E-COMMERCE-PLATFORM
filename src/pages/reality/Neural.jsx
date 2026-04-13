import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, BrainCircuit, Waves, Fingerprint, Network, Lightbulb, Dna, Zap } from 'lucide-react';
import { useShopStore } from '../../store';
import { Link } from 'react-router-dom';

const capabilities = [
  { icon: BrainCircuit, title: 'Direct Neural Interface', desc: 'Thought-driven product search. Think a product category and results materialize instantly.' },
  { icon: Fingerprint, title: 'Biometric Preference Lock', desc: 'Your emotional response to products is tracked and used to refine future recommendations.' },
  { icon: Waves, title: 'Subconscious Wishlist', desc: 'Products you linger on mentally are auto-added to a hidden wishlist only you can access.' },
  { icon: Network, title: 'Neural Commerce Graph', desc: 'A real-time visualization of every product interaction traced back to your neural signature.' },
  { icon: Dna, title: 'DNA-Level Personalization', desc: 'Shopping history merged with behavioral data to create a truly unique commerce genome.' },
  { icon: Lightbulb, title: 'Predictive Synthesis', desc: `AI synthesizes purchases you haven't thought of yet — and places them at the top of your feed.` },
];

const neuralStats = [
  { value: '1.2M', label: 'Neural Nodes Mapped' },
  { value: '0.3ms', label: 'Response Latency' },
  { value: '99.8%', label: 'Intent Accuracy' },
  { value: '∞', label: 'Personalization Depth' },
];

export default function NeuralReality() {
  const { setRealityMode, user } = useShopStore();

  React.useEffect(() => {
    setRealityMode('neural');
  }, []);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* HERO */}
      <div className="relative pt-32 pb-24 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/8 rounded-full blur-3xl" />
          {/* NEURAL NET LINES */}
          {Array.from({length: 20}).map((_, i) => (
            <motion.div key={i}
              animate={{ opacity: [0, 0.6, 0], scale: [1, 1.5, 1] }}
              transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{ top: `${10 + Math.random() * 80}%`, left: `${5 + Math.random() * 90}%` }}
            />
          ))}
        </div>

        {/* ANIMATED BRAIN ORB */}
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }}
          className="relative z-10 mb-6 mx-auto w-fit">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-600/40 to-cyan-600/20 border border-blue-400/40 flex items-center justify-center mb-6 shadow-[0_0_100px_rgba(59,130,246,0.5)]">
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <Cpu className="w-16 h-16 text-blue-300" />
            </motion.div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-black uppercase tracking-widest mb-4">
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-blue-400 rounded-full" />
            Neural Reality — Active
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
          The <span className="text-blue-400">Neural</span> Realm
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="text-lg text-white/50 max-w-xl mx-auto mb-4">
          Commerce at the speed of thought. Your mind is the interface.
        </motion.p>

        {/* PERSONALIZED GREETING */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="inline-block mb-8 px-6 py-3 glass border border-blue-400/20 rounded-2xl">
          <p className="text-sm text-blue-300 font-mono">
            <span className="opacity-50">{'>'} </span>Neural signature verified: <strong>{user.displayName}</strong> — Chennai Node #1094
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="flex gap-4 justify-center">
          <Link to="/quantum-picks" className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(59,130,246,0.5)]">
            Enter Neural Stream
          </Link>
          <Link to="/profile" className="px-8 py-4 glass border border-white/10 font-bold rounded-2xl hover:bg-white/5 transition-colors">
            View Neural Profile
          </Link>
        </motion.div>
      </div>

      {/* STATS */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        {neuralStats.map((stat, i) => (
          <motion.div key={i} variants={itemVariants}
            className="glass border border-blue-500/10 rounded-2xl p-6 text-center hover:border-blue-500/30 transition-colors">
            <p className="text-3xl font-black text-blue-400 mb-1 font-mono">{stat.value}</p>
            <p className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* CAPABILITIES GRID */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
        {capabilities.map((cap, i) => (
          <motion.div key={i} variants={itemVariants}
            className="glass border border-blue-500/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] group">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
              <cap.icon className="w-5 h-5 text-blue-300" />
            </div>
            <h3 className="font-bold text-white mb-2">{cap.title}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{cap.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* NEURAL PULSE BANNER */}
      <div className="max-w-5xl mx-auto px-4 mb-24">
        <div className="glass border border-blue-500/20 rounded-3xl p-8 bg-blue-600/5 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-64 opacity-20">
            {Array.from({length: 6}).map((_, i) => (
              <motion.div key={i}
                animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.35 }}
                className="h-[2px] bg-blue-400 rounded-full my-8 origin-left"
              />
            ))}
          </div>
          <div className="relative z-10 flex items-center gap-6">
            <Waves className="w-12 h-12 text-blue-400 shrink-0" />
            <div>
              <h3 className="text-2xl font-black text-white mb-2">Neural Pulse: Active</h3>
              <p className="text-white/50">Your neural signature is being continuously updated with each interaction. The AI has identified <strong className="text-blue-300">18 products</strong> you're likely to desire before you search for them.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
