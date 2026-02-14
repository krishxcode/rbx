import React, { useState } from "react";
import { PlayerManager } from "./PlayerManager";
import {
  Plus,
  Users,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronRight,
  Target,
} from "lucide-react";

// Mock Data
const mockTeams = {
  VALORANT: [
    { id: "v1", name: "RBX Valorant Main", type: "Main" },
    { id: "v2", name: "RBX Academy", type: "Academy" },
  ],
  "FREE FIRE": [
    { id: "f1", name: "RBX FF Main", type: "Main" },
    { id: "f2", name: "RBX Rising", type: "Academy" },
  ],
  BGMI: [{ id: "b1", name: "RBX BGMI Squad", type: "Main" }],
};

export const TeamManager = ({ game }) => {
  const [teams, setTeams] = useState(mockTeams[game] || []);
  const [expandedTeam, setExpandedTeam] = useState(null);

  // Update teams when game changes (useEffect simulation)
  React.useEffect(() => {
    setTeams(mockTeams[game] || []);
    setExpandedTeam(null);
  }, [game]);

  const toggleTeam = (teamId) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Target className="text-brand-red" size={20} />
          {game} Teams
        </h3>
        <button className="flex items-center gap-2 bg-brand-red text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors">
          <Plus size={16} /> Add Team
        </button>
      </div>

      <div className="space-y-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="border border-white/10 rounded-lg bg-black/30 overflow-hidden"
          >
            {/* Team Header */}
            <div
              className={`p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors ${
                expandedTeam === team.id
                  ? "bg-white/5 border-b border-white/5"
                  : ""
              }`}
              onClick={() => toggleTeam(team.id)}
            >
              <div className="flex items-center gap-3">
                <div className="text-gray-500">
                  {expandedTeam === team.id ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{team.name}</h4>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">
                    {team.type} Roster
                  </span>
                </div>
              </div>

              <div
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded transition-colors"
                  title="Edit Team Name"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                  title="Delete Team"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Players Section (Collapsible) */}
            {expandedTeam === team.id && (
              <div className="p-6 bg-black/50 animate-in slide-in-from-top-2 duration-200">
                <PlayerManager teamId={team.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
