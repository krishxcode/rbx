import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Target, MapPin, Shield } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
/* ---------- CLOUDINARY IMAGE OPTIMIZER ---------- */
const optimizeImage = (url) => {
  if (!url) return "";
  return url.replace(
    "/upload/",
    "/upload/f_auto,q_auto,c_fill,g_face,w_900,h_900/"
  );
};

const GAME_ORDER = ["FREE FIRE", "VALORANT", "BGMI"];
const getFlagEmoji = (countryCode = "") => {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
};
export const TeamRoster = () => {
  const [activeTeamId, setActiveTeamId] = useState("ff-main");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [rosterData, setRosterData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let teamsCache = [];
    let playersCache = [];

    const rebuildRoster = () => {
      if (!teamsCache.length) return;

      const grouped = {};

      teamsCache.forEach((team) => {
        if (!grouped[team.game]) grouped[team.game] = [];

        grouped[team.game].push({
          id: team.id,
          name: team.name,
          players: playersCache.filter((p) => p.teamId === team.id),
        });
      });

      setRosterData(grouped);
      setLoading(false);
      if (!activeTeamId || !grouped) return;

      if (grouped["FREE FIRE"]?.[0]) {
        setActiveTeamId(grouped["FREE FIRE"][0].id);
      }
    };

    const unsubTeams = onSnapshot(collection(db, "teams"), (snap) => {
      teamsCache = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      rebuildRoster();
    });

    const unsubPlayers = onSnapshot(collection(db, "players"), (snap) => {
      playersCache = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      rebuildRoster();
    });

    return () => {
      unsubTeams();
      unsubPlayers();
    };
  }, []);

  const currentTeam = useMemo(() => {
    for (const game in rosterData) {
      const team = rosterData[game].find((t) => t.id === activeTeamId);
      if (team) return team;
    }
    const firstGame = Object.keys(rosterData)[0];
    return firstGame ? rosterData[firstGame][0] : null;
  }, [rosterData, activeTeamId]);

  const currentGame = useMemo(
    () =>
      Object.keys(rosterData).find((game) =>
        rosterData[game]?.some((t) => t.id === activeTeamId)
      ),
    [rosterData, activeTeamId]
  );

  const handleGameInteraction = useCallback(
    (game, type) => {
      if (isMobile) {
        if (type === "click") {
          setOpenDropdown(openDropdown === game ? null : game);
        }
      } else {
        if (type === "enter") setOpenDropdown(game);
      }
    },
    [isMobile, openDropdown]
  );

  const handleGameLeave = useCallback(() => {
    if (!isMobile) setOpenDropdown(null);
  }, [isMobile]);

  return (
    <section
      id="teams"
      className="pt-8 md:pt-12 lg:pt-16 pb-24 bg-[#0a0a0a] relative overflow-hidden min-h-screen transform-gpu"
      style={{ contain: "layout paint" }}
    >
      {/* BACKGROUND SAME */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#050505] opacity-95"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* ===== OUR ARSENAL HEADING ===== */}
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

        {/* NAV SAME */}
        <nav className="flex flex-wrap justify-center gap-6 mb-20 relative z-20">
          {GAME_ORDER.filter((g) => rosterData[g]).map((game) => (
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
                    ? "bg-brand-red text-white"
                    : "bg-white/5 text-gray-500 hover:bg-white hover:text-black border border-white/10"
                }`}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {game}
                  <ChevronDown size={18} />
                </span>
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
                          onClick={() => {
                            setActiveTeamId(team.id);
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-4 py-4 text-lg font-display font-bold uppercase tracking-wider hover:bg-white/5 text-gray-300"
                        >
                          {team.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* ===== RBX ESPORTS ROSTER ===== */}
        <div className="flex items-center gap-6 mb-12">
          <div className="h-px bg-gradient-to-r from-transparent to-brand-red flex-1"></div>
          <div className="px-6 py-2 border border-brand-red/30 bg-brand-red/5 skew-x-[-12deg]">
            <h3 className="text-3xl font-display font-bold text-white uppercase tracking-widest flex items-center gap-3">
              <Shield size={24} className="text-brand-red" />
              {currentTeam?.name || "RBX ESPORTS"} ROSTER
            </h3>
          </div>
          <div className="h-px bg-gradient-to-l from-transparent to-brand-red flex-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : currentTeam?.players?.map((player, idx) => (
                <PlayerCard key={idx} player={player} index={idx} />
              ))}
        </div>
      </div>
    </section>
  );
};

/* ===== PLAYER CARD PART 2 ===== */
const PlayerCard = React.memo(({ player, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="group relative h-[500px] cursor-pointer perspective-1000"
  >
    <div className="absolute inset-0 bg-[#151515] border border-white/10 transition-all duration-300 group-hover:border-brand-red/50 clip-path-slant overflow-hidden">
      <div className="absolute inset-0 z-10">
        <img
          src={optimizeImage(player.img)}
          alt={player.name}
          loading="lazy"
          className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out origin-top will-change-transform"
        />
      </div>

      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-black text-white text-xs font-bold px-3 py-1 uppercase">
            {player.role}
          </span>
        </div>

        <div className="transform transition-transform duration-300 group-hover:-translate-y-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={12} className="text-brand-red" />

            <img
              src="/india.png"
              alt="India Flag"
            className="w-6 h-4 object-cover rounded-sm"
            />
          </div>

          <h3 className="text-5xl font-display font-bold text-white mb-1 leading-none italic uppercase">
            {player.name}
          </h3>

          <div className="w-12 h-1.5 bg-brand-red mb-4 group-hover:w-full transition-all duration-500"></div>

          {/* HOVER STATS SAME */}
          <div className="grid grid-cols-2 gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="bg-black/80 p-2 border-l-2 border-brand-red">
              <span className="block text-[10px] text-gray-400 uppercase font-bold">
                K/D Ratio
              </span>
              <span className="block text-xl font-display font-bold text-white">
                {player.kda}
              </span>
            </div>

            <div className="bg-black/80 p-2 border-l-2 border-white">
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
    </div>
  </motion.div>
));

const SkeletonCard = () => (
  <div className="group relative h-[500px] overflow-hidden bg-[#151515] border border-white/10 clip-path-slant">
    {/* ===== FAKE IMAGE LAYER ===== */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#222] via-[#1a1a1a] to-[#111]" />

    {/* ===== DEPTH GLOW ===== */}
    <div
      className="absolute inset-0 bg-brand-red/10"
      style={{ animation: "pulseGlow 2s ease-in-out infinite" }}
    />

    {/* ===== MOVING LIGHT SWEEP ===== */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
        animation: "gamingShimmer 1.4s linear infinite",
      }}
    />

    {/* ===== FAKE IMAGE SHAPE ===== */}
    <div className="absolute inset-0 opacity-40">
      <div className="w-full h-full bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    </div>

    {/* ===== FAKE CONTENT ===== */}
    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
      {/* fake location */}
      <div className="h-3 w-24 bg-white/10 mb-3 rounded"></div>

      {/* fake name */}
      <div className="h-10 w-44 bg-white/10 mb-4 rounded"></div>

      {/* fake underline */}
      <div className="h-2 w-20 bg-brand-red/50 rounded mb-4"></div>

      {/* fake stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="h-14 bg-black/40 border-l-2 border-brand-red/40 rounded"></div>
        <div className="h-14 bg-black/40 border-l-2 border-white/30 rounded"></div>
      </div>
    </div>
  </div>
);
