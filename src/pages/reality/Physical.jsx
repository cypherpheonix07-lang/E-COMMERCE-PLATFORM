import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, Package, ShieldCheck, Truck } from 'lucide-react';
import { useShopStore } from '../../store';
import { Link } from 'react-router-dom';

const features = [
  { icon: Truck, title: 'Same-Day Chennai Delivery', desc: 'Hyper-local Chennai logistics network. Order by 2PM, delivered by 8PM.' },
  { icon: ShieldCheck, title: 'Tactile Authenticity Guarantee', desc: 'Every product physically verified at our Chennai warehouse before dispatch.' },
  { icon: MapPin, title: 'Local Pickup Nodes', desc: '14 physical pickup stations across Chennai — Anna Nagar, T-Nagar, Velachery.' },
  { icon: Package, title: 'Zero-Plastic Packaging', desc: 'All physical orders use 100% biodegradable packaging sourced from TN.' },
];

const stats = [
  { value: '14,200+', label: 'Physical Products' },
  { value: '4.9★', label: 'Delivery Rating' },
  { value: '< 4hrs', label: 'Avg. Delivery Time' },
  { value: '100%', label: 'Authenticity Rate' },
];

export default function PhysicalReality() {
  const { setRealityMode } = useShopStore();

  React.useEffect(() => {
    setRealityMode('physical');
  }, [setRealityMode]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* HERO */}
      <div className="relative pt-32 pb-24 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* BG GLOW */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute top-20 left-10 w-64 h-64 bg-green-600/10 rounded-full blur-2xl" />
        </div>

        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}
          className="relative z-10 mb-8">
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-emerald-500/30 to-green-600/20 border border-emerald-500/30 flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(16,185,129,0.3)]">
            <Globe className="w-14 h-14 text-emerald-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Physical Reality — Active
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-4 relative z-10">
          The <span className="text-emerald-400">Physical</span> Realm
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="text-lg text-white/50 max-w-xl mx-auto mb-10 relative z-10">
          Real products. Real atoms. Real delivery to your door in Chennai within hours.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="flex gap-4 relative z-10">
          <Link to="/shop" className="px-8 py-4 bg-emerald-500 text-black font-black rounded-2xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(16,185,129,0.4)]">
            Shop Physical
          </Link>
          <Link to="/orders" className="px-8 py-4 glass border border-white/10 font-bold rounded-2xl hover:bg-white/5 transition-colors">
            Track Orders
          </Link>
        </motion.div>
      </div>

      {/* STATS */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        {stats.map((stat, i) => (
          <motion.div key={i} variants={itemVariants}
            className="glass border border-emerald-500/10 rounded-2xl p-6 text-center hover:border-emerald-500/30 transition-colors">
            <p className="text-3xl font-black text-emerald-400 mb-1">{stat.value}</p>
            <p className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* FEATURES */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {features.map((f, i) => (
          <motion.div key={i} variants={itemVariants}
            className="glass border border-white/5 rounded-2xl p-8 flex gap-5 hover:border-emerald-500/20 transition-colors group">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
              <f.icon className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* MAP BANNER */}
      <div className="max-w-5xl mx-auto px-4 mb-24">
        <div className="glass border border-emerald-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 bg-emerald-500/5">
          <MapPin className="w-16 h-16 text-emerald-400 shrink-0" />
          <div>
            <h3 className="text-2xl font-black text-white mb-2">You&apos;re in Chennai, Tamil Nadu</h3>
            <p className="text-white/50 mb-4">Physical delivery is active for your location. 14 nearby pickup nodes detected.</p>
            <div className="flex gap-2 flex-wrap">
              {['Anna Nagar', 'T-Nagar', 'Velachery', 'Adyar', 'Guindy'].map(area => (
                <span key={area} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold">{area}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
