import React, { useEffect, useState } from "react";
import {
  Users,
  Trophy,
  Activity,
  FileText,
  ArrowUp,
  ArrowDown,
  Clock,
} from "lucide-react";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

/* ---------- STAT CARD ---------- */
const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-[#111] border border-white/10 p-5 sm:p-6 rounded-xl hover:border-brand-red/30 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div
        className={`p-3 rounded-lg bg-${color}-500/10 text-${color}-500 group-hover:bg-${color}-500/20 transition-colors`}
      >
        <Icon size={24} />
      </div>

      <div
        className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-white/5 ${
          change.startsWith("+") ? "text-green-500" : "text-red-500"
        }`}
      >
        {change.startsWith("+") ? (
          <ArrowUp size={12} />
        ) : (
          <ArrowDown size={12} />
        )}
        {change}
      </div>
    </div>

    <h3 className="text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider mb-1">
      {title}
    </h3>

    <span className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-brand-red transition-colors">
      {value}
    </span>
  </div>
);

/* ---------- ACTIVITY ITEM ---------- */
const ActivityItem = ({ action, target, time, user }) => (
  <div className="flex items-start gap-4 p-4 hover:bg-white/5 rounded-lg transition-colors border-b border-white/5 last:border-0">
    <div className="w-8 h-8 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red text-xs font-bold shrink-0">
      {user.substring(0, 2).toUpperCase()}
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-300 break-words">
        <span className="font-bold text-white">{user}</span> {action}{" "}
        <span className="text-brand-red">{target}</span>
      </p>

      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
        <Clock size={12} />
        <span>{time}</span>
      </div>
    </div>
  </div>
);

export const Overview = () => {
  const [playersCount, setPlayersCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [tournamentsCount, setTournamentsCount] = useState(0);
  const [matchesCount, setMatchesCount] = useState(0);
  const [activities, setActivities] = useState([]);

  /* ---------- REALTIME LISTENERS ---------- */
  useEffect(() => {
    const unsubPlayers = onSnapshot(collection(db, "players"), (snap) =>
      setPlayersCount(snap.size)
    );

    const unsubApps = onSnapshot(collection(db, "applications"), (snap) =>
      setApplicationsCount(snap.size)
    );

    const unsubTournaments = onSnapshot(collection(db, "tournaments"), (snap) =>
      setTournamentsCount(snap.size)
    );

    const unsubMatches = onSnapshot(collection(db, "matches"), (snap) =>
      setMatchesCount(snap.size)
    );

    const unsubActivity = onSnapshot(collection(db, "activities"), (snap) => {
      const data = snap.docs.map((d) => d.data()).slice(0, 5);
      setActivities(data);
    });

    return () => {
      unsubPlayers();
      unsubApps();
      unsubTournaments();
      unsubMatches();
      unsubActivity();
    };
  }, []);

  return (
    <div className="space-y-8 w-full px-4 sm:px-6 lg:px-0">
      <div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
          DASHBOARD OVERVIEW
        </h2>
        <p className="text-gray-400 text-sm">
          Real-time system statistics and performance metrics.
        </p>
      </div>

      {/* ---------- STATS ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Players"
          value={playersCount}
          change="+ Live"
          icon={Users}
          color="blue"
        />

        <StatCard
          title="Tournaments"
          value={tournamentsCount}
          change="+ Live"
          icon={Trophy}
          color="yellow"
        />

        <StatCard
          title="Active Matches"
          value={matchesCount}
          change="Running"
          icon={Activity}
          color="green"
        />

        <StatCard
          title="Applications"
          value={applicationsCount}
          change="+ Live"
          icon={FileText}
          color="red"
        />
      </div>

      {/* ---------- ACTIVITY + SYSTEM ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-xl p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h3 className="font-bold text-lg text-white">Recent Activity</h3>

            <button className="text-xs text-brand-red font-bold uppercase hover:text-white transition-colors self-start sm:self-auto">
              View Log
            </button>
          </div>

          <div className="flex flex-col">
            {activities.map((act, i) => (
              <ActivityItem key={i} {...act} />
            ))}
          </div>
        </div>

        {/* ---------- SYSTEM HEALTH ---------- */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 sm:p-6">
          <h3 className="font-bold text-lg text-white mb-6">System Health</h3>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase text-gray-500">
                <span>Server Load</span>
                <span className="text-white">42%</span>
              </div>

              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[42%] bg-green-500 rounded-full"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase text-gray-500">
                <span>Database Usage</span>
                <span className="text-white">68%</span>
              </div>

              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[68%] bg-yellow-500 rounded-full"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase text-gray-500">
                <span>Storage</span>
                <span className="text-white">24%</span>
              </div>

              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[24%] bg-blue-500 rounded-full"></div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold text-white transition-colors">
                Run Diagnostics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
