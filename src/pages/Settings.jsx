import { motion } from 'framer-motion';
import { useShopStore } from '../store';

export default function Settings() {
  const { realityMode, setRealityMode } = useShopStore();

  return (
    <div className="pt-32 px-8 min-h-screen max-w-4xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-5xl font-black text-white mb-12"
      >
        Advanced Customization Engine
      </motion.h1>
      
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
        <h2 className="text-2xl font-bold mb-4">Reality Overlay Override</h2>
        <select 
          value={realityMode}
          onChange={(e) => setRealityMode(e.target.value)}
          className="w-full bg-black/50 border border-white/20 p-4 rounded-xl text-white"
        >
          <option value="physical">Physical Layer</option>
          <option value="metaverse">Metaverse Submersion</option>
          <option value="holographic">Holographic Projection</option>
          <option value="neural">Neural Link Interfacing</option>
        </select>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Personalization Intensity</h2>
          <input type="range" min="1" max="100" defaultValue="100" className="w-full accent-purple-500" />
        </div>
      </div>
    </div>
  );
}
