import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Camera } from 'lucide-react';

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="mt-12 bg-white/5 border border-primary/20 rounded-2xl p-6 lg:p-8 backdrop-blur-md">
      <h3 className="text-xl font-bold mb-6 text-white grid-glow">Leave your reality-linked review</h3>
      
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 text-emerald-400"
          >
            <Star className="w-16 h-16 mb-4 fill-emerald-400 opacity-50" />
            <h4 className="text-2xl font-bold">Review Synergized</h4>
            <p className="text-white/50 text-sm mt-2">Your feedback has been integrated into the Omega network.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-white/60 mb-2">Overall Rating</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star 
                      className={`w-8 h-8 ${star <= (hoverRating || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-white/60 mb-2">Detailed Feedback</p>
              <textarea 
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                rows="4"
                required
                placeholder="How does this product fit into your ecosystem?"
              ></textarea>
            </div>

            <div className="flex gap-4">
              <button type="button" className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 transition-colors text-sm">
                <Camera className="w-4 h-4" /> Add Photo
              </button>
              <button 
                type="submit" 
                disabled={rating === 0}
                className="flex-1 bg-primary text-primary-foreground font-bold rounded-xl py-3 disabled:opacity-50 hover:bg-primary/90 transition-all glow-primary"
              >
                Submit Review
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
