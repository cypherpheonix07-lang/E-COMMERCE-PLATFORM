import React from 'react';
import { motion } from 'framer-motion';
import { Box, Gamepad2, Users, Globe2, Layers, Cpu, Zap, Headphones } from 'lucide-react';
import { useShopStore } from '../../store';
import { Link } from 'react-router-dom';

const zones = [
  { name: 'Neo-Chennai Plaza', visitors: '12.4K online', color: 'from-violet-500/20 to-purple-600/10', border: 'border-violet-500/30', img: '42' },
  { name: 'TechForge District', visitors: '8.9K online', color: 'from-blue-500/20 to-cyan-600/10', border: 'border-blue-500/30', img: '56' },
  { name: 'Luxury Skyport', visitors: '5.2K online', color: 'from-yellow-500/20 to-amber-600/10', border: 'border-yellow-500/30', img: '73' },
  { name: 'Hidden Bazaar', visitors: '3.1K online', color: 'from-pink-500/20 to-rose-600/10', border: 'border-pink-500/30', img: '89' },
];

const features = [
  { icon: Layers, title: 'Spatial Commerce', desc: 'Walk through 3D product spaces and inspect items from every angle before buying.' },
  { icon: Users, title: 'Social Shopping', desc: 'Shop alongside 50,000+ concurrent users in shared virtual storefronts.' },
  { icon: Headphones, title: 'Immersive Audio', desc: 'Spatial audio zones where product demos play as you approach display nodes.' },
  { icon: Globe2, title: 'Cross-Reality Delivery', desc: 'Buy in metaverse, receive physically. Seamless bridge between worlds.' },
];

export default function MetaverseReality() {
  const { setRealityMode } = useShopStore();

  React.useEffect(() => {
    setRealityMode('metaverse');
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* HERO */}
      <div className="relative pt-32 pb-24 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/8 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
          {/* GRID LINES */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}
          className="relative z-10 mb-6">
          <div className="w-28 h-28 mx-auto rounded-2xl bg-gradient-to-br from-violet-600/40 to-purple-600/20 border border-violet-500/40 flex items-center justify-center mb-6 shadow-[0_0_80px_rgba(139,92,246,0.4)]">
            <Box className="w-14 h-14 text-violet-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full text-violet-400 text-xs font-black uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            Metaverse Reality — Active
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
          The <span className="text-violet-400">Metaverse</span> Realm
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="text-lg text-white/50 max-w-xl mx-auto mb-10">
          Enter persistent virtual shopping worlds shared with thousands of simultaneous explorers.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex gap-4 justify-center">
          <Link to="/shop" className="px-8 py-4 bg-violet-600 text-white font-black rounded-2xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(139,92,246,0.5)]">
            Enter Metaverse
          </Link>
          <Link to="/community" className="px-8 py-4 glass border border-white/10 font-bold rounded-2xl hover:bg-white/5 transition-colors">
            Find Friends
          </Link>
        </motion.div>
      </div>

      {/* VIRTUAL ZONES */}
      <div className="max-w-5xl mx-auto px-4 mb-20">
        <h2 className="text-2xl font-black text-white mb-8">Live Virtual Zones</h2>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {zones.map((zone, i) => (
            <motion.div key={i} variants={itemVariants}
              className={`relative glass bg-gradient-to-br ${zone.color} border ${zone.border} rounded-2xl p-6 overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform`}>
              <img src={`https://picsum.photos/seed/${zone.img}/600/200`} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 rounded-2xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-black text-white text-lg">{zone.name}</h3>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
                <p className="text-sm text-white/50">{zone.visitors}</p>
                <button className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white transition-colors">
                  Teleport →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* FEATURES */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
        {features.map((f, i) => (
          <motion.div key={i} variants={itemVariants}
            className="glass border border-violet-500/10 rounded-2xl p-8 flex gap-5 hover:border-violet-500/30 transition-colors group">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-600/20 transition-colors">
              <f.icon className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
