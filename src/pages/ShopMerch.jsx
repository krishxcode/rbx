import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Zap, ChevronLeft, ChevronRight } from "lucide-react";

/* ===== BUTTON ===== */
const Button = ({ children, variant = "primary", className = "", onClick }) => {
  const baseStyles =
    "relative px-8 py-3 font-display font-bold tracking-wider uppercase transition-all duration-300 clip-path-slant";

  const variants = {
    primary:
      "bg-rbx-red text-white hover:bg-red-700 hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]",
    outline:
      "bg-transparent border border-rbx-red text-white hover:bg-rbx-red/10 hover:shadow-[0_0_20px_rgba(255,0,0,0.3)]",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

/* ===== IMAGES FROM PUBLIC FOLDER ===== */
const jerseyImages = [
  "/jersey/jersey1.jpg",
  "/jersey/jersey2.jpg",
  "/jersey/jersey3.jpg",
  "/jersey/jersey4.jpg",
  "/jersey/jersey5.jpg",
  "/jersey/jersey6.jpg",
  "/jersey/jersey7.jpg",
];

export const FeaturedMerch = () => {
  const [index, setIndex] = useState(0);

  /* AUTO SLIDE */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % jerseyImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + jerseyImages.length) % jerseyImages.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % jerseyImages.length);
  };

  return (
    /* ===== NAVBAR OVERLAP FIX (TOP SPACE) ===== */
    <section className="pt-32 pb-24 bg-rbx-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-rbx-red)_0%,_transparent_40%)] opacity-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* TEXT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-rbx-red animate-pulse" size={20} />
            <span className="text-rbx-red font-mono text-sm uppercase tracking-widest">
              Limited Edition Drop
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-display  font-black  text-white mb-6 leading-[1.1] uppercase">
            Pro Kit <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rbx-red to-white">
              2026 Jersey
            </span>
          </h2>

          <p className="text-gray-400 text-lg mb-8 max-w-md leading-relaxed">
            Engineered for peak performance. The official 2026 season jersey
            features moisture-wicking fabric, ergonomic fit, and the iconic RBX
            aesthetic.
          </p>

          <Button className="flex items-center gap-2 text-lg px-8 py-4 shadow-[0_0_20px_rgba(255,0,0,0.4)]">
            <ShoppingBag size={20} /> Buy Now - $79.99
          </Button>
        </motion.div>

        {/* ===== IMAGE SLIDER ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative perspective-1000 group w-full max-w-md mx-auto"
        >
          <div className="absolute inset-0 bg-rbx-red/20 blur-[100px] rounded-full animate-pulse" />

          {/* FIXED HEIGHT (CARDS WILL NOT MOVE) */}
          <div className="relative z-10 h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={jerseyImages[index]}
                alt="RBX Jersey"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="max-h-full w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
            </AnimatePresence>

            {/* NAV BUTTONS */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-rbx-red transition"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-rbx-red transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* ===== FLOATING CARDS FIXED POSITION ===== */}
        </motion.div>
      </div>
    </section>
  );
};
