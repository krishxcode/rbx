import React, { useEffect, useState } from "react";
import { Save, Lock, User } from "lucide-react";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

export const SettingsPage = () => {
  const [settings, setSettings] = useState({
    displayName: "",
    email: "",
    roleDescription: "",
    twoFactor: true,
  });

  const settingsRef = doc(db, "admin_settings", "main_admin");

  /* ---------- LOAD SETTINGS ---------- */
  useEffect(() => {
    const loadSettings = async () => {
      const snap = await getDoc(settingsRef);

      if (snap.exists()) {
        setSettings(snap.data());
      } else {
        await setDoc(settingsRef, settings);
      }
    };

    loadSettings();
  }, []);

  /* ---------- SAVE SETTINGS ---------- */
  const saveSettings = async () => {
    try {
      toast.loading("Saving settings...");

      await updateDoc(settingsRef, settings);

      toast.dismiss();
      toast.success("Settings updated");
    } catch {
      toast.dismiss();
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-0">
      <div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">
          SETTINGS
        </h2>
        <p className="text-gray-400 text-sm">
          Manage your profile and system preferences.
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8 pb-8 border-b border-white/5">
          <div className="w-20 h-20 bg-brand-red/20 rounded-full flex items-center justify-center text-brand-red border border-brand-red/50">
            <User size={40} />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
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
                value={settings.displayName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    displayName: e.target.value,
                  })
                }
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    email: e.target.value,
                  })
                }
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Role Description
            </label>
            <textarea
              value={settings.roleDescription}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  roleDescription: e.target.value,
                })
              }
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-brand-red focus:outline-none h-24 resize-none"
            ></textarea>
          </div>

          <div className="flex justify-center sm:justify-end">
            <button
              type="button"
              onClick={saveSettings}
              className="flex items-center justify-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors w-full sm:w-auto"
            >
              <Save size={18} /> Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Security Section */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-5 sm:p-8">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lock className="text-brand-red" size={20} /> Security
        </h3>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-black/30 border border-white/5 rounded-lg">
            <div>
              <p className="font-bold text-white text-sm">
                Two-Factor Authentication
              </p>
              <p className="text-xs text-gray-500">
                Add an extra layer of security to your account.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer self-end sm:self-auto">
              <input
                type="checkbox"
                checked={settings.twoFactor}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    twoFactor: e.target.checked,
                  })
                }
                className="sr-only peer"
              />

              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-red"></div>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-black/30 border border-white/5 rounded-lg">
            <div>
              <p className="font-bold text-white text-sm">Change Password</p>
              <p className="text-xs text-gray-500">
                Managed via authentication provider.
              </p>
            </div>

            <button className="text-sm font-bold text-white border border-white/20 px-4 py-2 rounded hover:bg-white/5 transition-colors w-full sm:w-auto">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
