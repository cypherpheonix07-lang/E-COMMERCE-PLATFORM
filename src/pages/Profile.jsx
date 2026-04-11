
import React from 'react';
import { motion } from 'framer-motion';
import { useShopStore } from '../store';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip
} from 'recharts';
import { 
  User, 
  MapPin, 
  Dna, 
  Cpu, 
  ShieldCheck, 
  Zap,
  Globe,
  Settings,
  CreditCard
} from 'lucide-react';

const Profile = () => {
  const { user, royaltyPoints, realityMode } = useShopStore();

  const dnaData = [
    { subject: 'Tech Mastery', A: 98, fullMark: 100 },
    { subject: 'Visual Loyalty', A: 85, fullMark: 100 },
    { subject: 'Sustainability', A: 70, fullMark: 100 },
    { subject: 'Early Adoption', A: 92, fullMark: 100 },
    { subject: 'Price Sensitivity', A: 40, fullMark: 100 },
  ];

  const realityStats = [
    { name: 'Physical', value: 45 },
    { name: 'Metaverse', value: 30 },
    { name: 'Holographic', value: 15 },
    { name: 'Neural', value: 10 },
  ];

  return (
    <div className="pt-28 pb-20 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* PROFILE HEADER */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary via-accent to-purple-600 p-[2px] neo-glow-primary">
            <div className="w-full h-full bg-background rounded-full flex items-center justify-center overflow-hidden">
              <User className="w-20 h-20 text-primary opacity-50" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 glass rounded-2xl flex items-center justify-center border-primary/30">
             <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
        </motion.div>

        <div className="text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
            <h1 className="text-4xl font-black tracking-tighter">{user.displayName}</h1>
            <span className="px-3 py-1 glass rounded-full text-[10px] font-black uppercase text-primary border-primary/30">
              {user.loyalty.tier} Elite
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1.5 ">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Chennai, Tamil Nadu</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              <span className="text-sm">Neural Node #1094</span>
            </div>
          </div>
        </div>

        <div className="ml-auto flex gap-4">
          <div className="glass-card p-6 text-center">
            <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Royalty Points</p>
            <p className="text-3xl font-black text-primary">{royaltyPoints}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SHOPPING CONSCIOUSNESS (RADAR) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 glass-card p-8"
        >
          <div className="flex items-center gap-2 mb-8">
            <Dna className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold uppercase tracking-tighter text-sm">Shopping DNA</h3>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dnaData}>
                <PolarGrid stroke="#ffffff10" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff40', fontSize: 9 }} />
                <Radar name="DNA" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-6 text-xs text-muted-foreground text-center italic">
            "Arun, your consciousness aligns strongest with Technical Innovation."
          </p>
        </motion.div>

        {/* REALITY DISTRIBUTION (BAR) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass-card p-8"
        >
          <div className="flex items-center gap-2 mb-8">
            <Globe className="w-5 h-5 text-accent" />
            <h3 className="text-xl font-bold uppercase tracking-tighter text-sm">Multiverse Presence</h3>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={realityStats} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#ffffff40" fontSize={12} width={80} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '12px' }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-8 justify-center">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-primary" />
               <span className="text-[10px] text-muted-foreground">Most Frequent: Physical</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-accent" />
               <span className="text-[10px] text-muted-foreground">Rising Influence: Metaverse</span>
            </div>
          </div>
        </motion.div>

        {/* PROFILE ACTIONS & SETTINGS */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="glass p-6 rounded-3xl flex items-center gap-4 hover:bg-primary/10 transition-colors cursor-pointer border-white/5">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                 <CreditCard className="w-6 h-6" />
              </div>
              <div>
                 <p className="font-bold">Neural Wallet</p>
                 <p className="text-xs text-muted-foreground">Link your Chennai Bank Node</p>
              </div>
           </div>
           
           <div className="glass p-6 rounded-3xl flex items-center gap-4 hover:bg-accent/10 transition-colors cursor-pointer border-white/5">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                 <Settings className="w-6 h-6" />
              </div>
              <div>
                 <p className="font-bold">Interface Specs</p>
                 <p className="text-xs text-muted-foreground">Calibrate Multiverse HUD</p>
              </div>
           </div>

           <div className="glass p-6 rounded-3xl flex items-center gap-4 hover:bg-yellow-500/10 transition-colors cursor-pointer border-white/5">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500">
                 <Zap className="w-6 h-6" />
              </div>
              <div>
                 <p className="font-bold">loyalty DNA</p>
                 <p className="text-xs text-muted-foreground">Evolve to Platinum Tier</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
