import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, PlayCircle, Crosshair } from "lucide-react";

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-brand-dark perspective-1000"
    >
      {/* Background with Parallax */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center scale-110"></div>
        {/* Dynamic Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/30 via-brand-dark/60 to-brand-dark"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]"></div>
        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
      </motion.div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-64 h-64 bg-brand-red/10 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"
        />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center"
      >
        {/* Season Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 flex items-center gap-2 px-4 py-1 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full"
        >
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
          <span className="text-gray-300 text-xs font-bold tracking-[0.2em] uppercase">
            Season 2025 • Act III
          </span>
        </motion.div>

        {/* Dynamic Title */}
        <div className="relative mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-[10rem] font-display font-bold leading-[0.85] tracking-tighter text-white"
          >
            REDEFINE
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-7xl md:text-[10rem] font-display font-bold leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-brand-red to-red-900"
          >
            VICTORY
          </motion.h1>

          {/* Decorative Outline Text Behind */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10 pointer-events-none select-none">
            <h1
              className="text-7xl md:text-[10rem] font-display font-bold leading-[0.85] tracking-tighter text-transparent"
              style={{ WebkitTextStroke: "2px white" }}
            >
              REDEFINE
            </h1>
            <h1
              className="text-7xl md:text-[10rem] font-display font-bold leading-[0.85] tracking-tighter text-transparent"
              style={{ WebkitTextStroke: "2px white" }}
            >
              VICTORY
            </h1>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-12 font-light tracking-wide leading-relaxed"
        >
          The arena is unforgiving. Only the relentless survive.{" "}
          <br className="hidden md:block" />
          Welcome to <strong className="text-white">RBX ESPORTS</strong>, where
          we don't just play the game—we rewrite the rules.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-6"
        >
          <button className="group relative px-10 py-5 bg-brand-red text-white font-display font-bold text-xl tracking-widest uppercase overflow-hidden clip-path-button">
            <span className="relative z-10 flex items-center gap-3 group-hover:gap-4 transition-all">
              Join The Roster <ArrowRight size={20} />
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
            <div className="absolute inset-0 bg-black/10 z-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-white/20"></span>
          </button>

          <button className="group flex items-center gap-3 px-10 py-5 border border-white/10 hover:border-white/30 bg-white/5 backdrop-blur-md text-white font-display font-bold text-xl tracking-widest uppercase clip-path-button transition-all hover:bg-white/10">
            <PlayCircle className="text-brand-red group-hover:scale-110 transition-transform" />
            Watch Showreel
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom Ticker / Decoration */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-black/50 backdrop-blur-sm py-4 z-20 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="mx-8 text-white/20 font-display font-bold text-2xl tracking-[0.2em] flex items-center gap-4"
            >
              DOMINATE THE ARENA{" "}
              <Crosshair size={16} className="text-brand-red" />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};
