import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Target, MapPin, Shield } from "lucide-react";

// Mock Data Structure
const rosterData = {
  "FREE FIRE": [
    {
      id: "ff-main",
      name: "RBX ESPORTS",
      players: [
        {
          name: "RBX ARYAN",
          role: " PRIMARY RUSHER",
          kda: "4.2",
          matches: "156",
          country: "IND",
          img: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=2680&auto=format&fit=crop",
        },
        {
          name: "RBX GARRY",
          role: "ASSULTER",
          kda: "5.1",
          matches: "142",
          country: "IND",
          img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=2680&auto=format&fit=crop",
        },
        {
          name: "RBX HIMU",
          role: "IGL",
          kda: "3.8",
          matches: "189",
          country: "IND",
          img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop",
        },
        {
          name: "RBX DARSHAN",
          role: "SNIPER",
          kda: "3.5",
          matches: "160",
          country: "IND",
          img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop",
        },
        {
          name: "RBX SUNNY",
          role: "SECONDRY RUSHER",
          kda: "3.5",
          matches: "160",
          country: "IND",
          img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop",
        },
      ],
    },
    {
      id: "ff-academy",
      name: "RBX X CHILL",
      players: [
        {
          name: "NOVA",
          role: "RUSHER",
          kda: "3.1",
          matches: "45",
          country: "IND",
          img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
        },
        {
          name: "BLAZE",
          role: "SUPPORT",
          kda: "2.8",
          matches: "40",
          country: "IND",
          img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop",
        },
        {
          name: "SHADOW",
          role: "SNIPER",
          kda: "3.5",
          matches: "52",
          country: "IND",
          img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop",
        },
        {
          name: "FROST",
          role: "FLANKER",
          kda: "3.2",
          matches: "38",
          country: "IND",
          img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop",
        },
      ],
    },
    {
      id: "ff-rising",
      name: "RBX X CRYPTEX",
      players: [
        {
          name: "AXEL",
          role: "ASSAULT",
          kda: "2.5",
          matches: "12",
          country: "IND",
          img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop",
        },
        {
          name: "JINX",
          role: "SCOUT",
          kda: "2.1",
          matches: "10",
          country: "IND",
          img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2459&auto=format&fit=crop",
        },
      ],
    // },
    // {
    //   id: "ff-women",
    //   name: "RBX FF WOMEN",
    //   players: [
    //     {
    //       name: "VALKYRIE",
    //       role: "IGL",
    //       kda: "4.0",
    //       matches: "85",
    //       country: "IND",
    //       img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
    //     },
    //     {
    //       name: "SIREN",
    //       role: "SNIPER",
    //       kda: "4.5",
    //       matches: "82",
    //       country: "IND",
    //       img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop",
    //     },
    //     {
    //       name: "LUNA",
    //       role: "RUSHER",
    //       kda: "3.9",
    //       matches: "78",
    //       country: "IND",
    //       img: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f43?q=80&w=2670&auto=format&fit=crop",
    //     },
    //     {
    //       name: "SAGE",
    //       role: "SUPPORT",
    //       kda: "3.6",
    //       matches: "80",
    //       country: "IND",
    //       img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2670&auto=format&fit=crop",
    //     },
    //   ],
    },
  ],
  VALORANT: [
    {
      id: "val-main",
      name: "UPCOMING",
      players: [
        // {
        //   name: "VIPER",
        //   role: "CONTROLLER",
        //   kda: "1.12",
        //   matches: "240",
        //   country: "USA",
        //   img: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?q=80&w=2676&auto=format&fit=crop",
        // },
        // {
        //   name: "KAI",
        //   role: "INITIATOR",
        //   kda: "1.28",
        //   matches: "215",
        //   country: "CAN",
        //   img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop",
        // },
        // {
        //   name: "ZEUS",
        //   role: "SENTINEL",
        //   kda: "1.05",
        //   matches: "230",
        //   country: "USA",
        //   img: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=2664&auto=format&fit=crop",
        // },
        // {
        //   name: "JET",
        //   role: "DUELIST",
        //   kda: "1.45",
        //   matches: "220",
        //   country: "KR",
        //   img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop",
        // },
        // {
        //   name: "OMEN",
        //   role: "FLEX",
        //   kda: "1.10",
        //   matches: "180",
        //   country: "USA",
        //   img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
        // },
      ],
    },
    {
      id: "val-academy",
      name: "UPCOMING",
      players: [
        // {
        //   name: "SPARK",
        //   role: "DUELIST",
        //   kda: "1.30",
        //   matches: "40",
        //   country: "UK",
        //   img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop",
        // },
        // {
        //   name: "VOID",
        //   role: "CONTROLLER",
        //   kda: "0.98",
        //   matches: "35",
        //   country: "UK",
        //   img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop",
        // },
      ],
    },
  ],
  BGMI: [
    {
      id: "bgmi-main",
      name: "UPCOMING",
      players: [
        // {
        //   name: "STRIKER",
        //   role: "IGL",
        //   kda: "4.2",
        //   matches: "350",
        //   country: "IND",
        //   img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop",
        // },
        // {
        //   name: "BLAZE",
        //   role: "ASSAULTER",
        //   kda: "5.1",
        //   matches: "340",
        //   country: "IND",
        //   img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop",
        // },
        // {
        //   name: "GHOST",
        //   role: "SUPPORT",
        //   kda: "3.8",
        //   matches: "330",
        //   country: "IND",
        //   img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop",
        // },
        // {
        //   name: "NEXUS",
        //   role: "SNIPER",
        //   kda: "4.5",
        //   matches: "345",
        //   country: "IND",
        //   img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
        // },
      ],
    },
  ],
};

export const TeamRoster = () => {
  const [activeTeamId, setActiveTeamId] = useState("ff-main");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleGameInteraction = (game, type) => {
    if (isMobile) {
      if (type === "click") {
        setOpenDropdown(openDropdown === game ? null : game);
      }
    } else {
      if (type === "enter") {
        setOpenDropdown(game);
      }
    }
  };

  const handleGameLeave = () => {
    if (!isMobile) setOpenDropdown(null);
  };

  const getCurrentTeam = () => {
    for (const game in rosterData) {
      const team = rosterData[game].find((t) => t.id === activeTeamId);
      if (team) return team;
    }
    return rosterData["FREE FIRE"][0];
  };

  const currentTeam = getCurrentTeam();

  const currentGame = Object.keys(rosterData).find((game) =>
    rosterData[game].some((t) => t.id === activeTeamId)
  );

  return (
    <section
      id="teams"
      className="py-24 bg-[#0a0a0a] relative overflow-hidden min-h-screen"
    >
      {/* === VALORANT STYLE DYNAMIC BACKGROUND === */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Base texture */}
        <div className="absolute inset-0 bg-[#050505] opacity-95"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-120 contrast-120"></div>

        {/* Shapes */}
        <motion.div
          animate={{ rotate: [0, 5, 0], x: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-brand-red/3 blur-[100px] rounded-full"
        />

        <motion.div
          animate={{ rotate: [0, -5, 0], x: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-900/3 blur-[120px] rounded-full"
        />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>

        {/* Text */}
        <div className="absolute top-1/4 -right-20 rotate-90 opacity-[0.02] whitespace-nowrap select-none">
          <span className="text-[20vh] font-display font-bold">
            UNSTOPPABLE FORCE
          </span>
        </div>

        {/* Lines */}
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent skew-x-[-20deg]"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand-red/10 to-transparent skew-x-[-20deg]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-2 mb-4"
          >
            <div className="h-px w-8 bg-brand-red"></div>
            <span className="text-brand-red font-bold tracking-[0.3em] uppercase text-sm">
              Our Arsenal
            </span>
            <div className="h-px w-8 bg-brand-red"></div>
          </motion.div>

          <h2 className="text-6xl md:text-8xl font-display font-bold text-white mb-2 leading-[0.85] tracking-tighter">
            MEET THE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-white">
              AGENTS
            </span>
          </h2>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 mb-20 relative z-20">
          {Object.keys(rosterData).map((game) => (
            <div
              key={game}
              className="relative"
              onMouseEnter={() => handleGameInteraction(game, "enter")}
              onMouseLeave={handleGameLeave}
            >
              <button
                onClick={() => handleGameInteraction(game, "click")}
                className={`relative group px-10 py-4 font-display font-bold text-2xl tracking-wider uppercase transition-all duration-300 overflow-hidden clip-path-button ${
                  currentGame === game || openDropdown === game
                    ? "bg-brand-red text-white shadow-[0_0_30px_rgba(255,0,51,0.3)]"
                    : "bg-white/5 text-gray-500 hover:bg-white hover:text-black border border-white/10"
                }`}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {game}
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${
                      openDropdown === game ? "rotate-180" : ""
                    }`}
                  />
                </span>

                {/* Hover effect internal */}
                {currentGame !== game && openDropdown !== game && (
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
                )}
              </button>

              <AnimatePresence>
                {openDropdown === game && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-72 pt-4 z-50"
                  >
                    <div className="bg-[#111] border border-white/20 p-2 shadow-2xl">
                      {rosterData[game].map((team) => (
                        <button
                          key={team.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTeamId(team.id);
                            setOpenDropdown(null);
                          }}
                          className={`w-full text-left px-4 py-4 text-lg font-display font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-between hover:bg-white/5 ${
                            activeTeamId === team.id
                              ? "text-brand-red"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          <span>{team.name}</span>
                          <Target size={16} />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTeamId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-6 mb-12">
              <div className="h-px bg-gradient-to-r from-transparent to-brand-red flex-1"></div>
              <h3 className="text-3xl font-display font-bold text-white uppercase tracking-widest flex items-center gap-3">
                <Shield size={24} className="text-brand-red" />
                {currentTeam.name} ROSTER
              </h3>
              <div className="h-px bg-gradient-to-l from-transparent to-brand-red flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentTeam.players.map((player, idx) => (
                <PlayerCard key={idx} player={player} index={idx} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const PlayerCard = ({ player, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative h-[500px] cursor-pointer perspective-1000"
  >
    {/* Card Background Container */}
    <div className="absolute inset-0 bg-[#151515] border border-white/10 transition-all duration-300 group-hover:border-brand-red/50 clip-path-slant overflow-hidden">
      {/* Dynamic Background on Hover */}
      <div className="absolute inset-0 bg-brand-red/80 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0"></div>

      {/* Character Image */}
      <div className="absolute inset-0 z-10">
        <img
          src={player.img}
          alt={player.name}
          className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out origin-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-500"></div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
        {/* Top Role Badge */}
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 transform translate-y-[-10px] group-hover:translate-y-0">
          <span className="bg-black text-white text-xs font-bold px-3 py-1 uppercase tracking-widest border border-white/20 skew-x-[-12deg] block">
            {player.role}
          </span>
        </div>

        {/* Main Info */}
        <div className="transform transition-transform duration-300 group-hover:-translate-y-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={12} className="text-brand-red" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {player.country}
            </span>
          </div>

          <h3 className="text-5xl font-display font-bold text-white mb-1 leading-none italic uppercase">
            {player.name}
          </h3>

          {/* Animated Underline */}
          <div className="w-12 h-1.5 bg-brand-red mb-4 group-hover:w-full transition-all duration-500 ease-out"></div>

          {/* Stats revealed on hover */}
          <div className="grid grid-cols-2 gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
            <div className="bg-black/80 p-2 backdrop-blur-sm border-l-2 border-brand-red">
              <span className="block text-[10px] text-gray-400 uppercase font-bold">
                K/D Ratio
              </span>
              <span className="block text-xl font-display font-bold text-white">
                {player.kda}
              </span>
            </div>
            <div className="bg-black/80 p-2 backdrop-blur-sm border-l-2 border-white">
              <span className="block text-[10px] text-gray-400 uppercase font-bold">
                Matches
              </span>
              <span className="block text-xl font-display font-bold text-white">
                {player.matches}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-white/30 group-hover:border-white transition-colors z-30"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-brand-red group-hover:scale-150 transition-transform z-30"></div>
    </div>
  </motion.div>
);
