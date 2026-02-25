import React from "react";
import { Cpu, Monitor, Zap } from "lucide-react";

/* ===== ALLIANCE NETWORK DATA ===== */
const partners = [
  {
    name: "CRYPTEX ESPORTS",
    icon: Cpu,
    category: "COLLABORATION PARTNER",
    active: true,
  },
  {
    name: "CHILL GAMER",
    icon: Monitor,
    category: "COMMUNITY PARTNER",
    active: true,
  },

  /* ===== EMPTY SLOTS ===== */
  {
    name: "OPEN FOR COLLAB",
    icon: Zap,
    category: "COMING SOON",
    active: false,
  },
  {
    name: "OPEN FOR COLLAB",
    icon: Zap,
    category: "COMING SOON",
    active: false,
  },
  {
    name: "OPEN FOR COLLAB",
    icon: Zap,
    category: "COMING SOON",
    active: false,
  },
  {
    name: "OPEN FOR COLLAB",
    icon: Zap,
    category: "COMING SOON",
    active: false,
  },
];

export const Sponsors = () => {
  return (
    <section className="py-20 bg-black border-y border-white/5 relative overflow-hidden">
      {/* ===== BG TEXT ===== */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-[0.03] overflow-hidden whitespace-nowrap pointer-events-none select-none">
        <span className="text-[15vw] leading-none font-display font-bold">
          ALLIANCES ALLIANCES ALLIANCES
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* ===== HEADING ===== */}
        <div className="text-center mb-16">
          <span className="text-brand-red font-bold tracking-[0.3em] uppercase text-sm block mb-2">
            Powered By
          </span>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
            OFFICIAL <span className="text-gray-500">COLLABORATIONS</span>
          </h2>
        </div>

        {/* ===== GRID ===== */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className={`group relative flex flex-col items-center justify-center gap-6 p-6 border transition-all duration-300 clip-path-slant cursor-pointer
              ${
                partner.active
                  ? "border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-brand-red/30"
                  : "border-white/10 bg-white/[0.01] hover:border-brand-red/20"
              }`}
            >
              {/* ===== LASER GLOW EFFECT ===== */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-brand-red/10 blur-2xl"></div>
              </div>

              {/* ===== LASER LINE ===== */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-red group-hover:w-full transition-all duration-500"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-red group-hover:w-full transition-all duration-500"></div>

              {/* ICON */}
              <div className="relative z-10">
                <partner.icon
                  size={48}
                  className={`transition-colors duration-300 ${
                    partner.active
                      ? "text-gray-600 group-hover:text-brand-red"
                      : "text-gray-700 group-hover:text-brand-red"
                  }`}
                />

                <div className="absolute inset-0 bg-brand-red/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* TEXT */}
              <div className="text-center relative z-10">
                <span
                  className={`block font-display font-bold text-xl tracking-wider transition-colors ${
                    partner.active
                      ? "text-gray-300 group-hover:text-white"
                      : "text-gray-500 group-hover:text-gray-300"
                  }`}
                >
                  {partner.name}
                </span>

                <span
                  className={`block text-[10px] uppercase tracking-widest mt-1 transition-colors ${
                    partner.active
                      ? "text-gray-600 group-hover:text-brand-red/80"
                      : "text-gray-600 group-hover:text-brand-red/60"
                  }`}
                >
                  {partner.category}
                </span>
              </div>

              {/* ===== NETWORK DOT ===== */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
