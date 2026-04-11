
import React, { useRef } from 'react';
import { useShopStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sparkles, AlertCircle } from 'lucide-react';

const SentientCore = () => {
  const { sentientMood, sentientDialogue, isEvolving, evolutionProgress } = useShopStore();

  const moodColors = {
    curious: 'from-blue-400 to-cyan-400',
    excited: 'from-orange-400 to-red-400',
    analytical: 'from-purple-400 to-indigo-400',
    grateful: 'from-emerald-400 to-teal-400'
  };

  return (
    <div className="fixed bottom-8 left-8 z-40 flex flex-col items-start gap-4 pointer-events-none">
      <AnimatePresence>
        {sentientDialogue && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className="max-w-xs glass-card p-4 pointer-events-auto relative mb-2"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </div>
              <p className="text-sm font-medium leading-relaxed">
                {sentientDialogue}
              </p>
            </div>
            {/* BRAIN WAVE DECORATION */}
            <div className="absolute -bottom-1 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4 pointer-events-auto">
        <motion.div 
          animate={{ 
            scale: isEvolving ? [1, 1.2, 1] : 1,
            rotate: isEvolving ? 360 : 0 
          }}
          transition={{ duration: 2, repeat: isEvolving ? Infinity : 0 }}
          className="relative group"
        >
          {/* OUTER HALOS */}
          <div className={`absolute inset-0 bg-gradient-to-tr ${moodColors[sentientMood] || moodColors.curious} rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000`} />
          <div className="absolute inset-0 border border-white/10 rounded-full animate-ping opacity-20" />
          
          <div className="relative w-16 h-16 glass rounded-full flex items-center justify-center border-primary/20 neo-glow-primary overflow-hidden">
            <Cpu className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
            
            {/* SCANNING EFFECT */}
            <motion.div 
              animate={{ top: ['100%', '-100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 right-0 h-1/2 bg-gradient-to-b from-primary/20 to-transparent z-0"
            />
          </div>
        </motion.div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Sentient Core</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>
          <p className="text-xs font-bold text-muted-foreground capitalize">{sentientMood} Mode</p>
        </div>
      </div>

      {isEvolving && (
        <div className="w-full mt-2 glass h-1.5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${evolutionProgress}%` }}
            className="h-full bg-primary neo-glow-primary"
          />
        </div>
      )}
    </div>
  );
};

export default SentientCore;
