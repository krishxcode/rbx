import React, { useState } from "react";
import { Plus, Trash2, Edit2, User } from "lucide-react";

const mockPlayers = [
  {
    id: 1,
    name: "Viper",
    role: "IGL",
    kda: "1.45",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Spectre",
    role: "Sniper",
    kda: "1.82",
    img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=2680&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Omen",
    role: "Support",
    kda: "1.10",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop",
  },
];

export const PlayerManager = ({ teamId }) => {
  const [players, setPlayers] = useState(mockPlayers);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
          Active Roster
        </h5>
        <button className="flex items-center gap-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded transition-colors">
          <Plus size={14} /> Add Player
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center gap-4 bg-[#1a1a1a] border border-white/5 p-3 rounded-lg hover:border-white/20 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 shrink-0">
              <img
                src={player.img}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h6 className="font-bold text-white text-sm">{player.name}</h6>
              <div className="flex gap-3 text-[10px] text-gray-500 uppercase font-bold mt-0.5">
                <span className="text-brand-red">{player.role}</span>
                <span>KD: {player.kda}</span>
              </div>
            </div>

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors">
                <Edit2 size={14} />
              </button>
              <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
