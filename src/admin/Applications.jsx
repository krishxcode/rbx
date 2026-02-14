import React from "react";
import { Check, X, Eye, FileText } from "lucide-react";

const applications = [
  {
    id: 1,
    ign: "ShadowSlayer",
    game: "VALORANT",
    rank: "Radiant",
    age: 21,
    country: "USA",
    status: "Pending",
    date: "2 mins ago",
  },
  {
    id: 2,
    ign: "NoScopeGod",
    game: "BGMI",
    rank: "Conqueror",
    age: 19,
    country: "IND",
    status: "Pending",
    date: "1 hour ago",
  },
  {
    id: 3,
    ign: "JettMain420",
    game: "VALORANT",
    rank: "Immortal 3",
    age: 20,
    country: "CAN",
    status: "Reviewing",
    date: "3 hours ago",
  },
  {
    id: 4,
    ign: "HealerX",
    game: "FREE FIRE",
    rank: "Grandmaster",
    age: 18,
    country: "BRA",
    status: "Rejected",
    date: "1 day ago",
  },
];

export const Applications = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-1">
            RECRUITMENT
          </h2>
          <p className="text-gray-400 text-sm">
            Manage incoming player applications and tryout requests.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded text-xs font-bold uppercase">
            12 Pending
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 hover:border-brand-red/30 transition-all group"
          >
            {/* Status Strip */}
            <div
              className={`w-full md:w-1 h-1 md:h-16 rounded-full ${
                app.status === "Pending"
                  ? "bg-yellow-500"
                  : app.status === "Rejected"
                  ? "bg-red-500"
                  : "bg-blue-500"
              }`}
            ></div>

            <div className="flex-1 w-full text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-white">{app.ign}</h3>
                <span className="text-xs font-bold text-gray-500 bg-white/5 px-2 py-0.5 rounded uppercase">
                  {app.country}
                </span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="text-brand-red font-bold">{app.game}</span>
                </span>
                <span>
                  Rank: <span className="text-white">{app.rank}</span>
                </span>
                <span>
                  Age: <span className="text-white">{app.age}</span>
                </span>
                <span className="text-xs text-gray-600 self-center">
                  {app.date}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10 group/btn"
                title="View Details"
              >
                <Eye size={18} />
              </button>
              {app.status !== "Rejected" && (
                <>
                  <button className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors">
                    <Check size={16} /> Accept
                  </button>
                  <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors">
                    <X size={16} /> Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
