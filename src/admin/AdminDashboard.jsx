import React, { useState, useEffect } from "react";
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
  Shield,
  X,
} from "lucide-react";
import { db } from "../firebase";

import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { Overview } from "./Overview";
import { MatchCenter } from "./MatchCenter";
import { Applications } from "./Applications";
import { ContentManager } from "./ContentManager";
import { TeamRoster } from "./TeamRoster";
import { SettingsPage } from "./Settings";
import RecruitmentManagement from "./RecruitmentManagement";

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "applications"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // only pending applications notification
      const pending = data.filter(
        (app) => app.status === "Pending" || !app.status
      );

      setNotifications(pending);
    });

    return () => unsub();
  }, []);

  /* ---------- AUTO COLLAPSE ON MOBILE ---------- */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------- LOGOUT ---------- */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("adminAuth");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  /* ---------- CONTENT SWITCH ---------- */
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
      case "recruitment":
        return <RecruitmentManagement />;

      case "settings":
        return <SettingsPage />;
      default:
        return <Overview />;
    }
  };

  /* ---------- NAV ITEM ---------- */
  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setMobileSidebar(false);
      }}
      className={`w-full flex items-center ${
        sidebarOpen ? "gap-3 px-4 justify-start" : "justify-center px-0"
      } py-3 rounded-r-lg transition-all duration-300 border-l-2 mb-1 ${
        activeTab === id
          ? "bg-brand-red/10 border-brand-red text-white"
          : "border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon size={20} className={activeTab === id ? "text-brand-red" : ""} />
      <span
        className={`font-medium tracking-wide transition-all duration-300 ${
          sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
        }`}
      >
        {label}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans relative">
      {/* ---------- MOBILE OVERLAY ---------- */}
      {mobileSidebar && (
        <div
          onClick={() => setMobileSidebar(false)}
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
        />
      )}

      {/* ---------- SIDEBAR ---------- */}
      <aside
        className={`fixed h-full z-30 bg-[#0a0a0a] border-r border-white/10 transition-all duration-300 flex flex-col
        ${sidebarOpen ? "w-64" : "w-20"}
        ${mobileSidebar ? "left-0" : "-left-64"}
        lg:left-0`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-white/10">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-red flex items-center justify-center font-bold skew-x-[-12deg]">
                R
              </div>
              <span className="font-display font-bold text-2xl">
                ADMIN<span className="text-brand-red">PANEL</span>
              </span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-brand-red flex items-center justify-center font-bold skew-x-[-12deg]">
              R
            </div>
          )}

          {/* Mobile close */}
          <button
            className="lg:hidden text-gray-400"
            onClick={() => setMobileSidebar(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-6 pr-4 overflow-y-auto">
          <NavItem id="overview" icon={LayoutDashboard} label="Overview" />
          <NavItem id="matches" icon={Trophy} label="Match Center" />
          <NavItem id="applications" icon={Users} label="Applications" />
          <NavItem id="content" icon={FileText} label="Content" />
          <NavItem id="roster" icon={Gamepad2} label="Team Roster" />
          <NavItem id="recruitment" icon={Users} label="Recruitment" />
          <NavItem id="settings" icon={Settings} label="Settings" />
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <button
            onClick={handleLogout}
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

      {/* ---------- MAIN AREA ---------- */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300
        ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}
      >
        {/* ---------- TOP BAR ---------- */}
        <header className="h-16 md:h-20 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setMobileSidebar(true);
              } else {
                setSidebarOpen(!sidebarOpen);
              }
            }}
            className="text-gray-400 hover:text-white"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => setShowNotifications(true)}
              className="relative"
            >
              <Bell size={20} />

              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2 md:gap-3">
              <Shield size={18} />
              <span className="text-sm font-bold hidden sm:block">
                Administrator
              </span>
            </div>
          </div>
        </header>

        {/* ---------- CONTENT ---------- */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>

      {showNotifications && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50">
          <div className="bg-[#111] border border-white/10 rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">New Applications</h3>
              <button onClick={() => setShowNotifications(false)}>
                <X size={18} />
              </button>
            </div>

            {notifications.length === 0 ? (
              <p className="text-gray-400 text-sm">No new notifications</p>
            ) : (
              <div className="space-y-3">
                {notifications.map((app) => (
                  <div
                    key={app.id}
                    className="border border-white/10 rounded-lg p-3 bg-white/[0.03]"
                  >
                    <p className="font-bold text-white">
                      {app.ign || app.name}
                    </p>

                    <p className="text-xs text-gray-400">Role: {app.role}</p>

                    <p className="text-xs text-gray-500">
                      Category: {app.category}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
