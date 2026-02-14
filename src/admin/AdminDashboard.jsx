import React, { useState } from "react";
import {
  LayoutDashboard,
  Trophy,
  Users,
  FileText,
  Settings,
  LogOut,
  Gamepad2,
  Menu,
  Bell,
  Search,
  Shield,
} from "lucide-react";

// Import Admin Sub-components
import  {Overview}  from "./Overview";
import  {MatchCenter} from "./MatchCenter";
import  {Applications}  from "./Applications";
import  {ContentManager}  from "./ContentManager";
import  {TeamRoster}  from "./TeamRoster";
import  {SettingsPage}  from "./Settings";

export const AdminDashboard = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "matches":
        return <MatchCenter />;
      case "applications":
        return <Applications />;
      case "content":
        return <ContentManager />;
      case "roster":
        return <TeamRoster />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Overview />;
    }
  };

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-r-lg transition-all duration-300 border-l-2 mb-1 ${
        activeTab === id
          ? "bg-brand-red/10 border-brand-red text-white"
          : "border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon size={20} className={activeTab === id ? "text-brand-red" : ""} />
      <span
        className={`font-medium tracking-wide transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 hidden md:block"
        }`}
      >
        {label}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans selection:bg-brand-red selection:text-white">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } flex-shrink-0 bg-[#0a0a0a] border-r border-white/10 transition-all duration-300 flex flex-col fixed h-full z-30 left-0 top-0`}
      >
        <div className="h-20 flex items-center justify-center border-b border-white/10">
          {sidebarOpen ? (
            <div className="flex items-center gap-2 animate-in fade-in duration-300">
              <div className="w-8 h-8 bg-brand-red flex items-center justify-center font-bold skew-x-[-12deg]">
                R
              </div>
              <span className="font-display font-bold text-2xl tracking-wider">
                ADMIN<span className="text-brand-red">PANEL</span>
              </span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-brand-red flex items-center justify-center font-bold skew-x-[-12deg]">
              R
            </div>
          )}
        </div>

        <div className="flex-1 py-6 pr-4 overflow-y-auto custom-scrollbar">
          <div className="px-4 mb-2 text-xs font-bold text-gray-600 uppercase tracking-widest">
            {sidebarOpen && "Main Menu"}
          </div>
          <NavItem id="overview" icon={LayoutDashboard} label="Overview" />
          <NavItem id="matches" icon={Trophy} label="Match Center" />
          <NavItem id="applications" icon={Users} label="Applications" />

          <div className="px-4 mt-6 mb-2 text-xs font-bold text-gray-600 uppercase tracking-widest">
            {sidebarOpen && "Management"}
          </div>
          <NavItem id="content" icon={FileText} label="Content" />
          <NavItem id="roster" icon={Gamepad2} label="Team Roster" />
          <NavItem id="settings" icon={Settings} label="Settings" />
        </div>

        <div className="p-4 border-t border-white/10 bg-black/20">
          <button
            onClick={() => onNavigate("home")}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-red-900/20 rounded transition-colors group"
          >
            <LogOut
              size={20}
              className="group-hover:text-brand-red transition-colors"
            />
            {sidebarOpen && <span>Exit Dashboard</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Top Navbar */}
        <header className="h-20 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-red transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder="Search database..."
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:border-brand-red focus:outline-none w-64 transition-all focus:w-80 placeholder-gray-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-green-500 uppercase">
                System Online
              </span>
            </div>
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-red rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right hidden md:block">
                <span className="block text-sm font-bold text-white">
                  Administrator
                </span>
                <span className="block text-[10px] text-brand-red uppercase tracking-wider">
                  Super Admin
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-black border border-white/20 flex items-center justify-center text-white shadow-lg">
                <Shield size={18} />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};
