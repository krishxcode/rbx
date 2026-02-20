import React, { useEffect, useState } from "react";
import { Trophy, MapPin, Gamepad2, Target } from "lucide-react";
import { motion } from "framer-motion";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const filters = ["ALL", "LIVE", "UPCOMING", "COMPLETED"];

const TournamentHub = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------- REALTIME FETCH ---------- */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tournaments"), (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setTournaments(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const filteredTournaments =
    activeFilter === "ALL"
      ? tournaments
      : tournaments.filter((t) => t.status === activeFilter);

  const getStatusStyles = (status) => {
    switch (status) {
      case "LIVE":
        return "bg-red-500/10 text-red-500 border-red-500/50 animate-pulse";
      case "UPCOMING":
        return "bg-blue-500/10 text-blue-500 border-blue-500/50";
      case "COMPLETED":
        return "bg-gray-500/10 text-gray-400 border-gray-500/50";
      default:
        return "bg-white/10 text-white border-white/20";
    }
  };

  const getResultColor = (result = "") => {
    if (result.includes("1") || result.includes("CHAMPIONS"))
      return "text-yellow-500";
    if (result.includes("2") || result.includes("RUNNER"))
      return "text-gray-300";
    if (result.includes("3")) return "text-amber-700";
    if (result.includes("RANK")) return "text-brand-red";
    return "text-white";
  };
  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    // split dd/mm/yyyy
    const [day, month, year] = dateStr.split("/");

    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    return `${day} ${months[Number(month) - 1]}`;
  };

  /* ---------- SHIMMER ---------- */
  const ShimmerRow = (_, i) => (
    <div
      key={i}
      className="w-full bg-[#0a0a0a] border-b border-white/10 p-8 space-y-4"
    >
      <div className="h-4 w-40 bg-white/5 relative overflow-hidden">
        <div className="absolute inset-0 shimmer"></div>
      </div>

      <div className="h-6 w-2/3 bg-white/5 relative overflow-hidden">
        <div className="absolute inset-0 shimmer"></div>
      </div>

      <div className="h-4 w-1/3 bg-white/5 relative overflow-hidden">
        <div className="absolute inset-0 shimmer"></div>
      </div>
    </div>
  );

  return (
    <section
      id="tournaments"
      className="py-24 bg-brand-dark relative min-h-screen border-t border-white/5"
    >
      <style>
        {`
          .shimmer {
            background: linear-gradient(
              110deg,
              transparent 20%,
              rgba(255,255,255,0.15) 40%,
              rgba(255,255,255,0.25) 50%,
              rgba(255,255,255,0.15) 60%,
              transparent 80%
            );
            animation: shimmerMove 1.4s infinite;
          }

          @keyframes shimmerMove {
            from { transform: translateX(-100%); }
            to { transform: translateX(100%); }
          }
        `}
      </style>

      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-red/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16">
          <div className="md:w-1/2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Target className="text-brand-red animate-pulse" size={24} />
              <span className="text-brand-red font-bold tracking-[0.3em] uppercase text-sm">
                Competitive Calendar
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-none">
              TOURNAMENT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-white">
                SCHEDULE
              </span>
            </h2>
          </div>

          {/* FILTERS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="relative px-6 py-2 font-display font-bold text-xl uppercase tracking-wider transition-colors duration-300"
              >
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-red skew-x-[-12deg]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <span
                  className={`relative z-10 ${
                    activeFilter === filter
                      ? "text-white"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {filter}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* LIST */}
        <div className="flex flex-col border-t border-white/10">
          {loading && [...Array(4)].map((_, i) => ShimmerRow(_, i))}

          {!loading &&
            filteredTournaments.length > 0 &&
            filteredTournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="group relative w-full bg-[#0a0a0a] border-b border-white/10 hover:bg-white/[0.02] transition-colors"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red scale-y-0 group-hover:scale-y-100 transition origin-center"></div>

                <div className="flex flex-col md:flex-row md:items-center p-6 md:p-8 gap-6">
                  <div className="w-full md:w-[180px] flex md:flex-col justify-between items-center md:items-start">
                    <span className="text-sm font-mono text-gray-500 group-hover:text-white">
                      {formatDate(tournament.date)}
                    </span>

                    <div className="flex items-center gap-2 text-brand-red font-bold text-sm">
                      <Gamepad2 size={14} />
                      {tournament.game}
                    </div>
                  </div>

                  <div className="hidden md:block w-px h-12 bg-white/5"></div>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-display font-bold text-white group-hover:text-brand-red transition uppercase mb-2">
                      {tournament.name}
                    </h3>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-gray-500 uppercase">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} /> {tournament.location}
                      </div>

                      <span>|</span>

                      <div className="flex items-center gap-2">
                        <Trophy size={14} className="text-yellow-500" />
                        <span className="text-white">{tournament.prize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-0 border-white/5 pt-4 md:pt-0">
                    <span
                      className={`px-3 py-1 text-[10px] font-bold uppercase border ${getStatusStyles(
                        tournament.status
                      )}`}
                    >
                      {tournament.status}
                    </span>

                    <div className="text-right">
                      <span
                        className={`block font-display font-bold text-2xl ${getResultColor(
                          tournament.result
                        )}`}
                      >
                        {tournament.result}
                      </span>

                      <span className="block text-[10px] text-gray-600 uppercase">
                        {tournament.points}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {!loading && filteredTournaments.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No tournaments found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TournamentHub;
