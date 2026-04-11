
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, Sparkles, MessageSquare } from 'lucide-react';
import { useShopStore } from '../store';

const VoiceAssistant = () => {
  const { isVoiceActive, toggleVoice, user } = useShopStore();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [levels, setLevels] = useState(Array(15).fill(2));
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const text = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(text);
        if (event.results[0].isFinal) {
          handleCommand(text.toLowerCase());
        }
      };
      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    if (isVoiceActive) {
      const interval = setInterval(() => {
        setLevels(levels.map(() => Math.random() * 20 + 5));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isVoiceActive]);

  const handleCommand = (cmd) => {
    if (cmd.includes('order') || cmd.includes('last purchase')) {
      setAiResponse(`Your last purchase in Chennai was the Samsung S24 Ultra on March 24th. Would you like to see similar tech?`);
    } else if (cmd.includes('recommend') || cmd.includes('buy next')) {
      setAiResponse(`Based on your tech-heavy history, I recommend looking at the Razer BlackWidow keyboard. It matches your Apple/Sony ecosystem.`);
    } else {
      setAiResponse(`I've heard you, Arun. Analyzing your history for "${cmd}" now.`);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {(isVoiceActive || aiResponse) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 glass-card p-6 pointer-events-auto"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-black uppercase tracking-widest text-accent">AI Oracle Mode</span>
              <button onClick={() => { setAiResponse(''); if(isVoiceActive) toggleVoice(); }} className="ml-auto">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {transcript && (
              <div className="mb-4">
                <p className="text-[10px] text-muted-foreground uppercase mb-1">You said:</p>
                <p className="text-sm font-medium italic">"{transcript}"</p>
              </div>
            )}

            {aiResponse && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-accent/10 rounded-xl border border-accent/20"
              >
                <div className="flex gap-2">
                  <Volume2 className="w-4 h-4 text-accent shrink-0 mt-1" />
                  <p className="text-sm leading-relaxed">{aiResponse}</p>
                </div>
              </motion.div>
            )}

            {!aiResponse && isVoiceActive && (
              <div className="flex flex-col items-center py-6">
                <div className="flex items-end gap-1 h-12 mb-4">
                  {levels.map((height, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: isListening ? height : 4 }}
                      className="w-1 bg-accent rounded-full"
                    />
                  ))}
                </div>
                <button 
                  onClick={startListening}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${
                    isListening ? 'bg-accent/20 text-accent' : 'bg-accent text-accent-foreground'
                  }`}
                >
                  {isListening ? 'Listening...' : 'Speak Now'}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleVoice}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 pointer-events-auto relative scroll-mt-20 ${
          isVoiceActive 
            ? 'bg-accent text-accent-foreground neo-glow-accent scale-110' 
            : 'glass text-foreground hover:bg-white/10'
        }`}
      >
        {isVoiceActive ? <Mic className="w-7 h-7" /> : <MicOff className="w-7 h-7 opacity-50" />}
        
        {/* WAVE RING */}
        {isVoiceActive && (
          <div className="absolute inset-0 rounded-full border-2 border-accent animate-ping opacity-50" />
        )}
      </button>
    </div>
  );
};

export default VoiceAssistant;
