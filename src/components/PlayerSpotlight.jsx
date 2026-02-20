import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { X } from "lucide-react";

export const PlayerSpotlight = () => {
  const [player, setPlayer] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  /* ---------- FETCH PLAYERS REALTIME ---------- */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "players"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (!data.length) return;

      // SORT → Highest KD first
      // If KD same → more matches wins
      const topPlayer = [...data].sort((a, b) => {
        if ((b.kda || 0) !== (a.kda || 0)) {
          return (b.kda || 0) - (a.kda || 0);
        }
        return (b.matches || 0) - (a.matches || 0);
      })[0];

      setPlayer(topPlayer);
    });

    return () => unsub();
  }, []);

  if (!player) return null;

  return (
    <>
      <section className="py-24 bg-black relative border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Side */}
            <div className="lg:w-1/2 z-10">
              <span className="text-brand-red font-bold tracking-[0.3em] uppercase mb-4 block">
                Player Spotlight
              </span>

              <h2 className="text-6xl md:text-8xl font-display font-bold text-white leading-none mb-6 uppercase">
                {player.name}
              </h2>

              <div className="text-2xl text-gray-400 font-light mb-8">
                "Top performer based on KD ratio."
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-8 mb-10">
                <div>
                  <span className="block text-4xl font-display font-bold text-white">
                    {player.kda || 0}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">
                    KD
                  </span>
                </div>

                <div>
                  <span className="block text-4xl font-display font-bold text-white">
                    {player.matches || 0}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">
                    Matches
                  </span>
                </div>

                <div>
                  <span className="block text-4xl font-display font-bold text-white">
                    {player.role || "Player"}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">
                    Role
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowProfile(true)}
                className="px-8 py-3 bg-white text-black font-display font-bold text-lg hover:bg-brand-red hover:text-white transition-colors uppercase tracking-wider clip-path-button"
              >
                View Full Profile
              </button>
            </div>

            {/* Image Side */}
            <div className="lg:w-1/2 relative">
              <div className="relative z-10">
                <img
                  src={
                    player.img ||
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop"
                  }
                  alt={player.name}
                  className="w-full h-[600px] object-cover object-top filter contrast-125 grayscale hover:grayscale-0 transition-all duration-700 clip-path-slant"
                />
              </div>

              <div className="absolute top-10 -right-10 w-full h-full border-2 border-brand-red/30 z-0 hidden md:block"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-red/10 z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GLASSMORPHISM MODAL ================= */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="w-full max-w-2xl rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-6 relative">
            {/* CLOSE */}
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X size={22} />
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              {/* IMAGE */}
              <img
                src={player.img}
                alt={player.name}
                className="w-full md:w-64 h-72 object-cover rounded-xl border border-white/20"
              />

              {/* DETAILS */}
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-2 uppercase">
                  {player.name}
                </h3>

                <p className="text-brand-red font-semibold mb-4 uppercase">
                  {player.role}
                </p>

                <div className="space-y-2 text-sm text-gray-300">
                  <p>
                    <span className="text-white font-bold">KD:</span>{" "}
                    {player.kda || 0}
                  </p>

                  <p>
                    <span className="text-white font-bold">Matches:</span>{" "}
                    {player.matches || 0}
                  </p>

                  <p>
                    <span className="text-white font-bold">Status:</span> MVP
                    Player
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
