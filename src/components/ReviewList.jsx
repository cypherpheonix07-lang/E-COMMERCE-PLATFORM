import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, ThumbsUp } from 'lucide-react';

export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-2xl font-bold mb-6 text-white/90 border-b border-white/10 pb-4">
        Simulated Persona Reviews
      </h3>
      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 glass hover:bg-white/10 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center shrink-0">
                  {/* AI AVATAR PLACEHOLDER EXECUTING PROMPT */}
                  <span className="text-[10px] text-center text-white/40 leading-tight px-1">AI Gen<br/>Avatar</span>
                </div>
                <div>
                  <p className="font-bold text-white flex items-center gap-2">
                    {review.author}
                    {review.verified && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                  </p>
                  <p className="text-xs text-white/50">{review.date}</p>
                </div>
              </div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className={`w-4 h-4 ${idx < review.rating ? 'fill-current' : 'text-white/20'}`} />
                ))}
              </div>
            </div>
            
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              "{review.text}"
            </p>
            
            <div className="flex items-center text-xs text-white/40 hover:text-white/80 cursor-pointer transition-colors w-max">
              <ThumbsUp className="w-3 h-3 mr-1" /> Helpful ({review.helpful})
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
