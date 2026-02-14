import React, { useState } from "react";
import {
  Plus,
  Search,
  Calendar,
  Edit2,
  Trash2,
  MoreVertical,
  Filter,
} from "lucide-react";

const initialMatches = [
  {
    id: 1,
    game: "VALORANT",
    tournament: "Challengers League",
    team1: "RBX Esports",
    team2: "Sentinels",
    date: "2024-11-20",
    time: "20:00",
    status: "Upcoming",
  },
  {
    id: 2,
    game: "BGMI",
    tournament: "Pro Series S3",
    team1: "RBX Squad",
    team2: "Team Soul",
    date: "2024-11-21",
    time: "18:00",
    status: "Scheduled",
  },
  {
    id: 3,
    game: "FREE FIRE",
    tournament: "World Series",
    team1: "RBX Elite",
    team2: "LOUD",
    date: "2024-11-19",
    time: "16:00",
    status: "Finished",
  },
];

export const MatchCenter = () => {
  const [matches, setMatches] = useState(initialMatches);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-1">
            MATCH CENTER
          </h2>
          <p className="text-gray-400 text-sm">
            Schedule and manage competitive matches.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-brand-red text-white px-6 py-2.5 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg shadow-brand-red/20">
          <Plus size={18} /> Schedule Match
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 bg-[#111] p-4 rounded-lg border border-white/10">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search matches by team or tournament..."
            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm font-bold text-gray-400 hover:text-white hover:border-white/30 transition-colors">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm font-bold text-gray-400 hover:text-white hover:border-white/30 transition-colors">
            <Calendar size={16} /> Date
          </button>
        </div>
      </div>

      {/* Matches Table */}
      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-xs font-bold uppercase tracking-wider border-b border-white/5">
                <th className="p-4">Game & Tournament</th>
                <th className="p-4">Matchup</th>
                <th className="p-4">Schedule</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {matches.map((match) => (
                <tr
                  key={match.id}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-brand-red text-xs uppercase tracking-widest mb-1">
                        {match.game}
                      </span>
                      <span className="text-white font-medium">
                        {match.tournament}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3 text-sm font-bold text-white">
                      <span>{match.team1}</span>
                      <span className="text-gray-500 text-xs font-normal">
                        VS
                      </span>
                      <span>{match.team2}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col text-sm">
                      <span className="text-white">{match.date}</span>
                      <span className="text-gray-500 text-xs">
                        {match.time} EST
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                        match.status === "Upcoming"
                          ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                          : match.status === "Finished"
                          ? "bg-gray-500/10 text-gray-500 border-gray-500/20"
                          : "bg-green-500/10 text-green-500 border-green-500/20"
                      }`}
                    >
                      {match.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 hover:bg-blue-500/20 hover:text-blue-500 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
