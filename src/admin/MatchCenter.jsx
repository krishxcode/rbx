import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, X } from "lucide-react";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";

export const MatchCenter = () => {
  const [tournaments, setTournaments] = useState([]);
  const [search, setSearch] = useState("");

  const emptyForm = {
    date: "",
    game: "",
    name: "",
    location: "",
    prize: "",
    status: "UPCOMING",
    rank: "",
    points: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const tournamentsRef = collection(db, "tournaments");

  const loadData = async () => {
    const snapshot = await getDocs(tournamentsRef);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTournaments(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = tournaments.filter(
    (t) =>
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.game?.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditing(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEdit = (t) => {
    setEditing(t);
    setFormData(t);
    setShowModal(true);
  };

  const saveTournament = async () => {
    if (editing) {
      const ref = doc(db, "tournaments", editing.id);
      await updateDoc(ref, formData);
    } else {
      await addDoc(tournamentsRef, formData);
    }

    setShowModal(false);
    loadData();
  };

  const deleteTournament = async (id) => {
    if (!window.confirm("Delete tournament?")) return;
    await deleteDoc(doc(db, "tournaments", id));
    loadData();
  };

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          TOURNAMENT SCHEDULE CONTROL
        </h2>

        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-brand-red px-6 py-3 rounded-lg font-bold w-full md:w-auto justify-center"
        >
          <Plus size={18} /> Add Tournament
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          placeholder="Search tournament..."
          className="w-full bg-black border border-white/10 pl-10 p-3 rounded text-white"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="space-y-4 md:hidden">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-[#111] border border-white/10 p-4 rounded-xl space-y-2"
          >
            <div className="flex justify-between">
              <div>
                <div className="text-brand-red text-xs">{t.game}</div>
                <div className="font-bold text-lg">{t.name}</div>
              </div>

              <div className="text-sm">{t.status}</div>
            </div>

            <div className="text-sm text-gray-400">📅 {t.date}</div>
            <div className="text-sm">📍 {t.location}</div>
            <div className="text-sm">💰 {t.prize}</div>

            <div className="text-sm">
              Rank: {t.rank} | Points: {t.points}
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => openEdit(t)}>
                <Edit2 size={18} />
              </button>
              <button onClick={() => deleteTournament(t.id)}>
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP TABLE VIEW ================= */}
      <div className="hidden md:block bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-white/5 text-xs text-gray-400 uppercase">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Tournament</th>
                <th className="p-4">Location</th>
                <th className="p-4">Prize</th>
                <th className="p-4">Status</th>
                <th className="p-4">Result</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-t border-white/5">
                  <td className="p-4">{t.date}</td>

                  <td className="p-4">
                    <div className="text-brand-red text-xs">{t.game}</div>
                    <div className="font-bold">{t.name}</div>
                  </td>

                  <td className="p-4">{t.location}</td>
                  <td className="p-4">{t.prize}</td>
                  <td className="p-4">{t.status}</td>

                  <td className="p-4">
                    <div>{t.rank}</div>
                    <div className="text-xs text-gray-500">{t.points}</div>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(t)}>
                        <Edit2 size={16} />
                      </button>

                      <button onClick={() => deleteTournament(t.id)}>
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

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <div className="bg-[#111] p-6 rounded-xl w-full max-w-lg space-y-3 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between">
              <h3 className="font-bold text-xl">
                {editing ? "Edit Tournament" : "New Tournament"}
              </h3>

              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            {[
              ["Date", "date"],
              ["Game Name", "game"],
              ["Tournament Name", "name"],
              ["Location", "location"],
              ["Prize Pool", "prize"],
              ["Rank", "rank"],
              ["Points", "points"],
            ].map(([label, key]) => (
              <input
                key={key}
                placeholder={label}
                className="w-full bg-black border border-white/10 p-3 rounded text-white"
                value={formData[key] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
              />
            ))}

            <select
              className="w-full bg-black border border-white/10 p-3 rounded text-white"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option>LIVE</option>
              <option>UPCOMING</option>
              <option>COMPLETED</option>
            </select>

            <button
              onClick={saveTournament}
              className="w-full bg-brand-red py-3 font-bold rounded"
            >
              Save Tournament
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
