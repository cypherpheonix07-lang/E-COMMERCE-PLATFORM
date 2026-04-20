import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Eye, ScanLine, Sparkles, Layers2, Volume2, MonitorSmartphone, ArrowRight } from 'lucide-react';
import { useShopStore } from '../../store';
import { Link } from 'react-router-dom';

const demos = [
  { title: 'Hover-Space Inspection', desc: 'Products appear as floating holograms you examine from all angles.', img: '10' },
  { title: 'Room Projection', desc: 'Cast any product into your real room using your camera.', img: '20' },
  { title: 'Color & Texture Sync', desc: 'Material textures rendered at 8K fidelity in real-time.', img: '30' },
];

const features = [
  { icon: Eye, title: 'Volumetric Display', desc: 'See products as true 3D holograms floating in your actual space with depth and shadow.' },
  { icon: ScanLine, title: 'Surface Mapping', desc: 'AI detects your environment and places holograms with physically-accurate shadows.' },
  { icon: Volume2, title: 'Sonic Halo', desc: "Directional sound plays from the hologram's position in space." },
  { icon: MonitorSmartphone, title: 'Any Device', desc: 'Works via camera on any modern phone, tablet, or AR-capable device.' },
];

export default function HolographicReality() {
  const { setRealityMode } = useShopStore();

  React.useEffect(() => {
    setRealityMode('holographic');
  }, [setRealityMode]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* HERO */}
      <div className="relative pt-32 pb-24 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/8 rounded-full blur-3xl" />
          {/* SCAN LINES */}
          {Array.from({length: 12}).map((_, i) => (
            <div key={i} className="absolute left-0 right-0 h-[1px] bg-yellow-400/5" style={{ top: `${i * 8 + 10}%` }} />
          ))}
        </div>

        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}
          className="relative z-10 mb-6">
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-yellow-400/30 to-amber-500/20 border border-yellow-400/40 flex items-center justify-center mb-6 shadow-[0_0_80px_rgba(234,179,8,0.35)]">
            <Zap className="w-14 h-14 text-yellow-300" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-xs font-black uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
            Holographic Reality — Active
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
          The <span className="text-yellow-300">Holographic</span> Realm
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="text-lg text-white/50 max-w-xl mx-auto mb-10">
          Products materialize as photorealistic holograms in your real-world environment.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex gap-4 justify-center">
          <Link to="/shop" className="px-8 py-4 bg-yellow-400 text-black font-black rounded-2xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(234,179,8,0.5)]">
            Start Holo-View
          </Link>
          <Link to="/forge" className="px-8 py-4 glass border border-white/10 font-bold rounded-2xl hover:bg-white/5 transition-colors">
            Visit Forge
          </Link>
        </motion.div>
      </div>

      {/* DEMO CARDS */}
      <div className="max-w-5xl mx-auto px-4 mb-20">
        <h2 className="text-2xl font-black text-white mb-8">Holographic Experiences</h2>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demos.map((demo, i) => (
            <motion.div key={i} variants={itemVariants}
              className="glass border border-yellow-400/20 rounded-2xl overflow-hidden hover:border-yellow-400/40 transition-colors group cursor-pointer">
              <div className="relative h-40 overflow-hidden">
                <img src={`https://picsum.photos/seed/${demo.img}/400/200`} alt="" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-2 border-yellow-400/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6 text-yellow-300" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white mb-1">{demo.title}</h3>
                <p className="text-xs text-white/50">{demo.desc}</p>
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
            className="glass border border-yellow-400/10 rounded-2xl p-8 flex gap-5 hover:border-yellow-400/30 transition-colors group">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors">
              <f.icon className="w-6 h-6 text-yellow-300" />
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
