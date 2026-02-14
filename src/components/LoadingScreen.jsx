import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

const sysLogs = [
  "Loading core modules...",
  "Initializing graphics engine...",
  "Allocating memory buffers...",
  "Connecting to secure gateway...",
  "Fetching user profile...",
  "Optimizing shaders...",
  "Anti-cheat verification...",
  "Handshake established.",
  "Welcome back, Legend."
];

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Progress Timer
    const duration = 2000;
    const intervalTime = 20;
    const steps = duration / intervalTime;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = (100 / steps) * (Math.random() * 0.5 + 0.8);
        const next = Math.min(prev + increment, 100);
        if (next >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 800); // Slight delay at 100%
            return 100;
        }
        return next;
      });
    }, intervalTime);

    // Log generator
    let logIndex = 0;
    const logInterval = setInterval(() => {
        if (logIndex < sysLogs.length) {
            setLogs(prev => [...prev, sysLogs[logIndex]].slice(-4)); // Keep last 4 logs
            logIndex++;
        }
    }, duration / sysLogs.length);

    return () => {
        clearInterval(interval);
        clearInterval(logInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden font-sans"
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#000000_100%)] z-0"></div>
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(500px)_rotateX(60deg)] origin-top opacity-50 pointer-events-none"></div>

      {/* Cyberpunk Scanline */}
      <motion.div 
        className="absolute w-full h-1 bg-brand-red/50 blur-sm z-10"
        initial={{ top: -10 }}
        animate={{ top: "110%" }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-20 flex flex-col items-center w-full max-w-lg px-4">
        
        {/* Main Logo Container */}
        <div className="relative mb-12">
            <motion.div
                className="w-24 h-24 bg-brand-red skew-x-[-12deg] flex items-center justify-center border-2 border-white/20 shadow-[0_0_30px_rgba(255,0,51,0.4)]"
                animate={{
                    boxShadow: ["0 0 30px rgba(255,0,51,0.4)", "0 0 60px rgba(255,0,51,0.8)", "0 0 30px rgba(255,0,51,0.4)"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-white font-display font-bold text-6xl skew-x-[12deg] select-none">R</span>
            </motion.div>
            
            {/* Spinning Rings */}
            <motion.div 
                className="absolute inset-[-20px] border border-white/10 rounded-full border-t-brand-red border-r-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
                className="absolute inset-[-35px] border border-white/5 rounded-full border-b-white/30 border-l-transparent"
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
        </div>

        {/* Title with Glitch Effect */}
        <div className="text-center mb-10 relative">
            <motion.h1 
                className="text-5xl md:text-6xl font-display font-bold text-white tracking-widest"
                animate={{ opacity: [1, 0.8, 1, 1, 0.5, 1] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
            >
                RBX <span className="text-brand-red">ESPORTS</span>
            </motion.h1>
            <div className="text-xs text-gray-500 font-mono tracking-[0.5em] mt-2 uppercase">System Interface v2.0</div>
        </div>

        {/* Custom Progress Bar */}
        <div className="w-full relative mb-6">
            <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider font-mono">
                <span className="flex items-center gap-2"><Terminal size={12} className="text-brand-red" /> System Boot</span>
                <span>{Math.floor(progress)}%</span>
            </div>
            
            <div className="h-4 bg-[#111] border border-white/10 relative overflow-hidden skew-x-[-12deg]">
                {/* Background stripes */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_100%)] bg-[size:10px_10px]"></div>
                
                {/* Fill */}
                <motion.div 
                    className="h-full bg-brand-red relative"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute right-0 top-0 h-full w-2 bg-white/50 blur-[2px]"></div>
                </motion.div>
            </div>
        </div>

        {/* System Logs */}
        <div className="w-full h-24 bg-black/40 border border-white/5 p-4 font-mono text-[10px] text-green-500/80 overflow-hidden flex flex-col justify-end">
            <AnimatePresence>
                {logs.map((log, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="truncate"
                    >
                        {">"} {log}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 p-2 border-l-2 border-t-2 border-brand-red/50 w-16 h-16"></div>
      <div className="absolute top-8 right-8 p-2 border-r-2 border-t-2 border-brand-red/50 w-16 h-16"></div>
      <div className="absolute bottom-8 left-8 p-2 border-l-2 border-b-2 border-brand-red/50 w-16 h-16"></div>
      <div className="absolute bottom-8 right-8 p-2 border-r-2 border-b-2 border-brand-red/50 w-16 h-16"></div>

    </motion.div>
  );
};