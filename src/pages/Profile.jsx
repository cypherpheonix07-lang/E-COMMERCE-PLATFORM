import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShopStore } from '../store';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip
} from 'recharts';
import { 
  User, MapPin, Dna, ShieldCheck, Zap, Globe, Settings, CreditCard,
  BarChart3, UserEdit, Hexagon
} from 'lucide-react';
import ProfileDataForm from '../components/ProfileDataForm';
import AdvancedAnalyticsDashboard from '../components/AdvancedAnalyticsDashboard';

const Profile = () => {
  const { user, royaltyPoints, realityMode } = useShopStore();
  const [activeTab, setActiveTab] = useState('overview');

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

  const tabs = [
    { id: 'overview', label: 'Neural Overview', icon: Globe },
    { id: 'data', label: 'My Profile Data', icon: UserEdit },
    { id: 'analytics', label: 'Advanced Analytics', icon: BarChart3 },
    { id: 'ascension', label: 'Avatar Ascension', icon: Hexagon },
  ];

  return (
    <div className="pt-28 pb-32 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* GLOBAL PROFILE HEADER */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12 border-b border-white/5 pb-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative group cursor-pointer"
        >
          <div className="w-32 h-32 rounded-full overflow-hidden p-1 bg-gradient-to-br from-primary via-accent to-purple-600 neo-glow-primary hover:scale-105 transition-transform">
            <img src={`https://picsum.photos/seed/${user.id}/300/300`} alt="Avatar" className="w-full h-full rounded-full object-cover mix-blend-luminosity" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-10 h-10 glass rounded-full flex items-center justify-center border-primary/30 bg-background">
             <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
        </motion.div>

        <div className="text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
            <h1 className="text-4xl font-black tracking-tighter text-white">{user.displayName || user.name}</h1>
            <span className="px-3 py-1 glass rounded-full text-[10px] font-black uppercase text-primary border-primary/30 bg-primary/10">
              {user.loyalty?.tier || 'Platinum'} Elite
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-white/50 justify-center md:justify-start">
            <div className="flex items-center gap-1.5 ">
              <MapPin className="w-4 h-4 text-white/40" />
              <span className="text-sm">{user.location || 'Chennai, Tamil Nadu'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-yellow-400/50" />
              <span className="text-sm font-mono">{royaltyPoints} Neural Credits</span>
            </div>
          </div>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex gap-2 overflow-x-auto scollbar-hide pb-2 mb-8">
         {tabs.map(tab => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id)}
             className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
               activeTab === tab.id 
                 ? 'bg-primary text-primary-foreground neo-glow-primary'
                 : 'bg-white/5 border border-white/5 hover:bg-white/10 text-white/70 hover:text-white'
             }`}
           >
             <tab.icon className="w-4 h-4" />
             {tab.label}
           </button>
         ))}
      </div>

      {/* TAB CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
           key={activeTab}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -10 }}
           transition={{ duration: 0.2 }}
        >
          
          {/* TAB: OVERVIEW (Legacy Charts) */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* SHOPPING CONSCIOUSNESS (RADAR) */}
              <div className="lg:col-span-1 glass-card p-8 border border-white/5">
                <div className="flex items-center gap-2 mb-8">
                  <Dna className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white/70">Shopping DNA</h3>
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
              </div>

              {/* REALITY DISTRIBUTION (BAR) */}
              <div className="lg:col-span-2 glass-card p-8 border border-white/5">
                <div className="flex items-center gap-2 mb-8">
                  <Globe className="w-5 h-5 text-accent" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white/70">Multiverse Presence</h3>
                </div>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={realityStats} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" stroke="#ffffff40" fontSize={12} width={80} />
                      <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '12px' }} />
                      <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* QUICK LINKS */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="glass p-6 rounded-3xl flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer border border-white/5">
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary"><CreditCard className="w-6 h-6" /></div>
                    <div><p className="font-bold text-white">Neural Wallet</p><p className="text-xs text-white/50">Link Bank Node</p></div>
                 </div>
                 <div className="glass p-6 rounded-3xl flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer border border-white/5">
                    <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent"><Settings className="w-6 h-6" /></div>
                    <div><p className="font-bold text-white">Interface Specs</p><p className="text-xs text-white/50">Calibrate HUD</p></div>
                 </div>
                 <div className="glass p-6 rounded-3xl flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer border border-white/5">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-yellow-500"><Zap className="w-6 h-6" /></div>
                    <div><p className="font-bold text-white">Loyalty DNA</p><p className="text-xs text-white/50">Evolve to Platinum</p></div>
                 </div>
              </div>
            </div>
          )}

          {/* TAB: MY PROFILE DATA */}
          {activeTab === 'data' && (
            <ProfileDataForm />
          )}

          {/* TAB: ADVANCED ANALYTICS */}
          {activeTab === 'analytics' && (
             <AdvancedAnalyticsDashboard />
          )}

          {/* TAB: AVATAR ASCENSION */}
          {activeTab === 'ascension' && (
            <div className="glass-card p-16 text-center border border-white/5">
               <Hexagon className="w-16 h-16 text-accent mx-auto mb-6 opacity-50" />
               <h2 className="text-2xl font-black text-white mb-2">Avatar Ascension Node</h2>
               <p className="text-white/50 max-w-md mx-auto">This metaphysical sector is currently locked. Sync more reality-altering purchases to breach this node.</p>
            </div>
          )}
          
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default Profile;
