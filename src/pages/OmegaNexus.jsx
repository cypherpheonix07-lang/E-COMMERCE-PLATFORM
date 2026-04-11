
import React from 'react';
import { motion } from 'framer-motion';
import { 
  useShopStore 
} from '../store';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Zap, 
  Brain, 
  Dna, 
  History, 
  TrendingUp, 
  ShieldCheck,
  Cpu,
  Globe
} from 'lucide-react';
import { products } from '../data';

const OmegaNexus = () => {
  const { user, royaltyPoints, realityMode } = useShopStore();

  // MOCK DATA FOR CHARTS
  const dnaData = [
    { subject: 'Tech', A: 95, fullMark: 100 },
    { subject: 'Style', A: 82, fullMark: 100 },
    { subject: 'Sustainability', A: 75, fullMark: 100 },
    { subject: 'Value', A: 60, fullMark: 100 },
    { subject: 'Innovation', A: 90, fullMark: 100 },
  ];

  const spendingData = [
    { name: 'Jan', spent: 400 },
    { name: 'Feb', spent: 700 },
    { name: 'Mar', spent: 1200 },
    { name: 'Apr', spent: 900 },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

  const stats = [
    { label: 'Purchased Items', value: user.history.length, icon: <History className="w-5 h-5" /> },
    { label: 'Loyalty Points', value: royaltyPoints, icon: <Zap className="w-5 h-5 text-yellow-500" /> },
    { label: 'History Accuracy', value: '99.4%', icon: <ShieldCheck className="w-5 h-5 text-emerald-500" /> },
    { label: 'Active Mode', value: realityMode, icon: <Globe className="w-5 h-5 text-blue-500" /> },
  ];

  return (
    <div className="pt-28 pb-20 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-primary">Neural Nexus Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
            Your Shopping <span className="text-gradient">Consciousness</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <div className="glass p-4 rounded-2xl text-right">
            <p className="text-[10px] text-muted-foreground uppercase font-bold">Location Sync</p>
            <p className="font-bold">Chennai, TN</p>
          </div>
          <div className="glass p-4 rounded-2xl text-right border-primary/30">
            <p className="text-[10px] text-primary uppercase font-bold">Account Tier</p>
            <p className="font-black text-primary">{user.loyalty.tier} VIP</p>
          </div>
        </div>
      </motion.div>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 flex flex-col gap-4"
          >
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">{stat.label}</p>
              <p className="text-2xl font-black">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* TASTE DNA RADAR */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 glass-card p-8"
        >
          <div className="flex items-center gap-2 mb-8">
            <Dna className="w-5 h-5 text-purple-500" />
            <h3 className="text-xl font-bold">Your Taste DNA</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dnaData}>
                <PolarGrid stroke="#ffffff20" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff60', fontSize: 10 }} />
                <Radar
                  name="DNA"
                  dataKey="A"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex flex-col gap-3">
             <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Top Category</span>
                <span className="font-bold">Premium Electronics</span>
             </div>
             <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Style Profile</span>
                <span className="font-bold">Minimalist Functional</span>
             </div>
          </div>
        </motion.div>

        {/* SPENDING PREDICTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass-card p-8"
        >
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-bold">Predictive Trajectory</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} />
                <YAxis stroke="#ffffff40" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line 
                   type="monotone" 
                   dataKey="spent" 
                   stroke="#3b82f6" 
                   strokeWidth={4} 
                   dot={{ r: 6, fill: "#3b82f6", strokeWidth: 0 }}
                   activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-6 text-sm text-muted-foreground italic">
            "We predict a 15% increase in home automation purchases during next month's Chennai festival season."
          </p>
        </motion.div>

        {/* TIMELINE ECHOES */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 glass-card p-8"
        >
          <div className="flex items-center gap-2 mb-8">
            <History className="w-5 h-5 text-emerald-500" />
            <h3 className="text-xl font-bold">Temporal Shopping Echoes</h3>
          </div>
          <div className="flex flex-col gap-6 relative">
            <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-white/10" />
            {[
              { date: 'Yesterday', event: 'Analyzed S24 Ultra ecosystem usage.', color: 'bg-blue-500' },
              { date: '3 Days Ago', event: 'Suggested upgrade for home lighting in Chennai.', color: 'bg-purple-500' },
              { date: 'Next Week', event: 'Predicted need for ergonomic accessories.', color: 'bg-orange-500', future: true },
            ].map((echo, i) => (
              <div key={i} className="flex gap-8 items-start relative z-10 group">
                <div className={`w-12 h-12 rounded-2xl glass flex items-center justify-center shrink-0 border-white/10 group-hover:border-primary transition-all`}>
                  <div className={`w-2 h-2 rounded-full ${echo.color} ${echo.future ? 'animate-pulse' : ''}`} />
                </div>
                <div className="pt-2">
                   <p className="text-[10px] uppercase font-bold text-muted-foreground">{echo.date}</p>
                   <p className="text-sm font-medium">{echo.event}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default OmegaNexus;
