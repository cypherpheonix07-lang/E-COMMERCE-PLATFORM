import React from 'react';
import { motion } from 'framer-motion';
import { useShopStore } from '../store';
import { products } from '../data/products';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, Radar, RadialBarChart, RadialBar, Legend
} from 'recharts';
import { Activity, Leaf, TrendingUp, CreditCard, Box, Zap } from 'lucide-react';

export default function AdvancedAnalyticsDashboard() {
  const { user } = useShopStore();

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

  // 1. Spending Trend Data
  const trendData = [
    { month: 'Jan', spend: 400 },
    { month: 'Feb', spend: 300 },
    { month: 'Mar', spend: 550 },
    { month: 'Apr', spend: 200 },
    { month: 'May', spend: 780 },
    { month: 'Jun', spend: 890 },
    { month: 'Jul', spend: 430 },
  ];

  // 2. Category Pie
  const categoryData = [
    { name: 'Electronics', value: 65 },
    { name: 'Home', value: 20 },
    { name: 'Wearables', value: 15 },
  ];

  // 3. DNA Evolution (Radar)
  const dnaData = [
    { subject: 'Tech', A: 98, fullMark: 100 },
    { subject: 'Design', A: 85, fullMark: 100 },
    { subject: 'Eco', A: 40, fullMark: 100 },
    { subject: 'Luxury', A: 92, fullMark: 100 },
    { subject: 'Nomad', A: 60, fullMark: 100 },
  ];

  return (
    <div className="space-y-8">
      {/* AI SUMMARY */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-6 glass rounded-2xl border border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-50 pointer-events-none" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="p-3 bg-primary/20 rounded-xl text-primary"><Activity className="w-6 h-6" /></div>
          <div>
            <h3 className="font-bold text-lg text-white mb-2">Neural Insight Core</h3>
            <p className="text-sm text-white/70 leading-relaxed font-mono">
              Based on your Chennai footprint and 6-month historical vector, you are identified as a <strong>Premium Tech & Lifestyle enthusiast</strong>. Your likelihood to adopt "Ultra" grade wearables in Q4 is projected at 88%. You saved approximately 2.4kg of Carbon by utilizing our localized logistics nodes.
            </p>
          </div>
        </div>
      </motion.div>

      {/* KPI GHOST METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Assessed Value', value: '$8,452', icon: CreditCard, color: 'text-primary' },
          { label: 'Average Node Cost', value: '$422', icon: Box, color: 'text-accent' },
          { label: 'Eco Offset', value: '4 Trees', icon: Leaf, color: 'text-emerald-400' },
          { label: 'Future Predictive', value: '+12%', icon: TrendingUp, color: 'text-yellow-400' },
        ].map((kpi, i) => (
          <div key={i} className="glass p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center group hover:border-white/20 transition-colors">
             <kpi.icon className={`w-8 h-8 ${kpi.color} mb-3 group-hover:scale-110 transition-transform`} />
             <p className="text-3xl font-black text-white">{kpi.value}</p>
             <p className="text-[10px] uppercase font-bold text-white/40 mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* SPENDING TREND LINE */}
        <div className="glass p-6 rounded-2xl border border-white/5">
           <h3 className="text-sm font-bold uppercase text-white/60 mb-6">Historical Expenditure Vector</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={trendData}>
                 <defs>
                   <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <XAxis dataKey="month" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                 <RechartsTooltip contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px' }} />
                 <Area type="monotone" dataKey="spend" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* ALLOCATION MATRIX PIE */}
        <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col items-center">
           <h3 className="text-sm font-bold uppercase text-white/60 mb-2 self-start">Resource Allocation Matrix</h3>
           <div className="h-64 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                   {categoryData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <RechartsTooltip contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px' }} />
                 <Legend wrapperStyle={{ fontSize: '12px' }} />
               </PieChart>
             </ResponsiveContainer>
           </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {/* RADAR */}
        <div className="glass p-6 rounded-2xl border border-white/5 md:col-span-1">
          <h3 className="text-sm font-bold uppercase text-white/60 mb-6">Psychographic Radar</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dnaData}>
                <PolarGrid stroke="#ffffff10" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff60', fontSize: 10 }} />
                <Radar name="Profile" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* HEATMAP MOCK (Frequent Activity) */}
        <div className="glass p-6 rounded-2xl border border-white/5 md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold uppercase text-white/60">Node Activity Heatmap</h3>
            <button className="px-3 py-1 bg-white/5 text-xs rounded-md text-white/60 hover:text-white">Export PDF Array</button>
          </div>
          <div className="flex flex-wrap gap-2 h-48 overflow-y-auto content-start custom-scrollbar">
            {Array.from({ length: 154 }).map((_, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.005 }}
                className={`w-4 h-4 rounded-sm ${Math.random() > 0.85 ? (Math.random() > 0.5 ? 'bg-primary' : 'bg-accent') : 'bg-white/5'}`}
              />
            ))}
          </div>
          <p className="text-[10px] text-white/30 text-right mt-2 font-mono">Last 154 Days</p>
        </div>
      </div>
    </div>
  );
}
