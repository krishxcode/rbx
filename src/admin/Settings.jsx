import React from "react";
import { Save, Lock, User, Bell, Shield } from "lucide-react";

export const SettingsPage = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-display font-bold text-white mb-1">
          SETTINGS
        </h2>
        <p className="text-gray-400 text-sm">
          Manage your profile and system preferences.
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/5">
          <div className="w-20 h-20 bg-brand-red/20 rounded-full flex items-center justify-center text-brand-red border border-brand-red/50">
            <User size={40} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Administrator Account
            </h3>
            <p className="text-gray-500 text-sm">Super Admin Privileges</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Display Name
              </label>
              <input
                type="text"
                defaultValue="Admin User"
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="admin@rbxesports.com"
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Role Description
            </label>
            <textarea
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red focus:outline-none h-24"
              defaultValue="Head administrator with full access to roster, matches, and content management systems."
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Save size={18} /> Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Security Section */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lock className="text-brand-red" size={20} /> Security
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-black/30 border border-white/5 rounded-lg">
            <div>
              <p className="font-bold text-white text-sm">
                Two-Factor Authentication
              </p>
              <p className="text-xs text-gray-500">
                Add an extra layer of security to your account.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-red"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-black/30 border border-white/5 rounded-lg">
            <div>
              <p className="font-bold text-white text-sm">Change Password</p>
              <p className="text-xs text-gray-500">Last changed 30 days ago.</p>
            </div>
            <button className="text-sm font-bold text-white border border-white/20 px-4 py-2 rounded hover:bg-white/5 transition-colors">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
