
import React, { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Box, Sparkles, RefreshCcw } from 'lucide-react';
// Note: We would import Three.js components here. Providing a high-fidelity mock UI for the AR experience.

const VirtualTryOnModal = ({ isOpen, onClose, product }) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const startScan = () => {
    setIsCameraActive(true);
    let prog = 0;
    const interval = setInterval(() => {
      prog += 5;
      setScanProgress(prog);
      if (prog >= 100) clearInterval(interval);
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* BACKDROP */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl aspect-video glass-card overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(59,130,246,0.3)]"
          >
            {/* CLOSE BUTTON */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 glass rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* LEFT: AR VIEWPORT */}
            <div className="flex-1 relative bg-slate-900 overflow-hidden">
              {!isCameraActive ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 glass rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Camera className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Ready for AR Preview?</h3>
                  <p className="text-muted-foreground mb-8 max-w-xs">
                    We'll use your camera to project the <span className="text-foreground font-bold">{product?.name}</span> into your space in Chennai.
                  </p>
                  <button 
                    onClick={startScan}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold neo-glow-primary hover:scale-105 transition-transform"
                  >
                    Enable AR Camera
                  </button>
                </div>
              ) : (
                <div className="absolute inset-0">
                  {/* MOCK CAMERA FEED */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* SCANNING LINES */}
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-0 right-0 h-[2px] bg-primary/50 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10"
                    />
                    
                    {/* THE PRODUCT 3D MOCKUP */}
                    <motion.div
                      animate={{ 
                        rotateY: 360,
                        scale: scanProgress < 100 ? 0.8 : [1, 1.05, 1]
                      }}
                      transition={{ 
                        rotateY: { duration: 10, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 2, repeat: Infinity }
                      }}
                      className="w-64 h-64 relative"
                    >
                      <img src={product?.image} alt="3D Mockup" className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]" />
                    </motion.div>
                  </div>

                  {/* SCANNING OVERLAY */}
                  {scanProgress < 100 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
                      <p className="text-xl font-bold mb-4">Analyzing Your Space...</p>
                      <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${scanProgress}%` }} />
                      </div>
                    </div>
                  )}

                  {/* AR UI CONTROLS */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-30">
                    <button className="p-4 glass rounded-full hover:bg-white/10"><RefreshCcw className="w-5 h-5" /></button>
                    <button className="px-6 py-3 bg-white text-black rounded-full font-bold">Snap Photo</button>
                    <button className="p-4 glass rounded-full hover:bg-white/10"><Box className="w-5 h-5" /></button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: INFO & SIZING */}
            <div className="w-full md:w-80 glass p-8 flex flex-col border-l border-white/5">
              <div className="mb-auto">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">HistoriAR AI</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{product?.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Based on your previous purchase of {product?.category === 'electronics' ? 'Sony WH-1000XM5' : 'similar items'}, 
                  this {product?.name} will fit perfectly with your current setup.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground font-bold">Virtual Size Check</label>
                    <div className="h-2 w-full bg-white/10 rounded-full mt-2">
                      <div className="h-full bg-emerald-500 w-[95%] rounded-full" />
                    </div>
                    <p className="text-[10px] mt-1 text-emerald-500 font-bold">95% Confidence Match for your room</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold">
                  Add to Cart
                </button>
                <p className="text-[10px] text-center text-muted-foreground">
                  Chennai Delivery: <span className="text-foreground">Tomorrow, 10 AM</span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VirtualTryOnModal;
