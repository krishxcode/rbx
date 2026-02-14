import React from "react";
import {
  Users,
  Trophy,
  Activity,
  FileText,
  ArrowUp,
  ArrowDown,
  Clock,
} from "lucide-react";

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-[#111] border border-white/10 p-6 rounded-xl hover:border-brand-red/30 transition-all duration-300 group">
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
    <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">
      {title}
    </h3>
    <span className="text-3xl font-display font-bold text-white group-hover:text-brand-red transition-colors">
      {value}
    </span>
  </div>
);

const ActivityItem = ({ action, target, time, user }) => (
  <div className="flex items-start gap-4 p-4 hover:bg-white/5 rounded-lg transition-colors border-b border-white/5 last:border-0">
    <div className="w-8 h-8 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red text-xs font-bold shrink-0">
      {user.substring(0, 2).toUpperCase()}
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-300">
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
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-display font-bold text-white mb-2">
          DASHBOARD OVERVIEW
        </h2>
        <p className="text-gray-400 text-sm">
          Real-time system statistics and performance metrics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Players"
          value="2,543"
          change="+12.5%"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Tournaments"
          value="12"
          change="+2"
          icon={Trophy}
          color="yellow"
        />
        <StatCard
          title="Active Matches"
          value="5"
          change="Running"
          icon={Activity}
          color="green"
        />
        <StatCard
          title="Applications"
          value="48"
          change="+8 New"
          icon={FileText}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-white">Recent Activity</h3>
            <button className="text-xs text-brand-red font-bold uppercase hover:text-white transition-colors">
              View Log
            </button>
          </div>
          <div className="flex flex-col">
            <ActivityItem
              user="Admin_01"
              action="updated match score for"
              target="RBX vs SEN"
              time="2 mins ago"
            />
            <ActivityItem
              user="Moderator_Dave"
              action="approved application for"
              target="Player_Viper"
              time="15 mins ago"
            />
            <ActivityItem
              user="System"
              action="auto-scheduled match"
              target="Qualifiers Group A"
              time="1 hour ago"
            />
            <ActivityItem
              user="Admin_01"
              action="created new tournament"
              target="Winter Championship"
              time="3 hours ago"
            />
            <ActivityItem
              user="Editor_Sarah"
              action="uploaded highlight"
              target="Grand Finals Map 3"
              time="5 hours ago"
            />
          </div>
        </div>

        {/* System Status */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
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
