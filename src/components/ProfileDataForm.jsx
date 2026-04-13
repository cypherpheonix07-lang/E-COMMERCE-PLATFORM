import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useShopStore } from '../store';
import { Camera, Save, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ProfileDataForm() {
  const { user, syncUser } = useShopStore();
  
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || 'Chennai, Tamil Nadu',
    bio: user?.bio || '',
    language: user?.language || 'English',
    notifications: user?.notifications || { email: true, push: false, sms: true },
    avatarPrompt: user?.avatarPrompt || 'Studio portrait, cyberpunk aesthetic, clean background'
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API delay
    setTimeout(() => {
      syncUser(formData);
      setSaving(false);
      toast.success('Omni-Profile Synced Successfully', {
        style: { background: '#111', color: '#fff', border: '1px solid #3b82f6' },
        icon: '🌌'
      });
    }, 800);
  };

  const generateAIAvatar = () => {
    toast.loading('Generating Avatar via Grok Engine...', { id: 'avatar-gen' });
    setTimeout(() => {
      toast.success('Avatar Seed Established', { id: 'avatar-gen' });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 glass-card p-8 border-primary/20 bg-black/40">
      
      {/* HEADER OVERVIEW */}
      <div className="flex items-center gap-6 border-b border-white/10 pb-8">
        <div className="relative group cursor-pointer" onClick={generateAIAvatar}>
           <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent p-1 cursor-pointer hover:scale-105 transition-transform">
              <img src={`https://picsum.photos/seed/${user.id}/200/200`} alt="Avatar" className="w-full h-full rounded-full object-cover mix-blend-luminosity" />
           </div>
           <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <Camera className="w-6 h-6 text-white" />
           </div>
        </div>
        <div>
          <h2 className="text-2xl font-black text-white">{formData.displayName}</h2>
          <p className="text-primary/80 font-mono text-xs mb-2">Neural Link ID: {user.id}</p>
          <button onClick={generateAIAvatar} className="flex items-center gap-2 text-xs font-bold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors border border-white/10 text-white/70">
            <Sparkles className="w-3 h-3 text-accent" /> Regenerate via Grok AI
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* CORE DETAILS */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest border-b border-white/10 pb-2">Core Identity</h3>
            
            <div>
              <label className="text-xs text-white/60 mb-1 block">Display Name</label>
              <input 
                value={formData.displayName}
                onChange={e => setFormData({...formData, displayName: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="text-xs text-white/60 mb-1 block">Transmission Email</label>
              <input 
                type="email"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-colors"
                placeholder="node@historicart.com"
              />
            </div>

            <div>
              <label className="text-xs text-white/60 mb-1 block">Physical Terminal</label>
              <input 
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                className="w-full bg-white/5 border border-emerald-500/30 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors font-mono text-sm"
              />
              <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Chennai routing node locked for optimal latency.
              </p>
            </div>
          </div>

          {/* AI SETTINGS */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest border-b border-white/10 pb-2">Neural Parameters</h3>
            
            <div>
              <label className="text-xs text-white/60 mb-1 block">Persona Bio</label>
              <textarea 
                value={formData.bio}
                onChange={e => setFormData({...formData, bio: e.target.value})}
                rows="3"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-colors resize-none"
                placeholder="Tech enthusiast exploring the bounds of e-commerce..."
              />
            </div>

            <div>
              <label className="text-xs text-white/60 mb-1 block">Avatar Rendering Prompt (Live Edit)</label>
              <textarea 
                value={formData.avatarPrompt}
                onChange={e => setFormData({...formData, avatarPrompt: e.target.value})}
                rows="2"
                className="w-full bg-primary/10 border border-primary/30 rounded-xl px-4 py-3 text-primary text-xs font-mono outline-none focus:bg-primary/20 transition-colors resize-none"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <span className="text-sm text-white/80">Preferred Language</span>
              <select 
                value={formData.language}
                onChange={e => setFormData({...formData, language: e.target.value})}
                className="bg-black/50 text-white border border-white/20 rounded-md px-2 py-1 text-sm outline-none"
              >
                <option value="English">English</option>
                <option value="Tamil">Tamil (தமிழ்)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
          <button type="button" className="px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 font-bold">
            <RefreshCw className="w-4 h-4" /> Reset 
          </button>
          <button 
            type="submit" 
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-black flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 glow-primary"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Syncing...' : 'Save Profile Alignment'}
          </button>
        </div>

      </form>
    </div>
  );
}
