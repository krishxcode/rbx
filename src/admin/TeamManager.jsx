import React, { useEffect, useState } from "react";
import { PlayerManager } from "./PlayerManager";
import {
  Plus,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronRight,
  Target,
  X,
} from "lucide-react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase";
import toast from "react-hot-toast";

export const TeamManager = ({ game }) => {
  const [teams, setTeams] = useState([]);
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const emptyForm = {
    name: "",
    type: "Main",
  };

  const [formData, setFormData] = useState(emptyForm);

  const teamsRef = collection(db, "teams");

  /* ---------- LOAD TEAMS ---------- */
  const loadTeams = async () => {
    if (!game) return;

    try {
      setLoading(true);

      const q = query(teamsRef, where("game", "==", game));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setTeams(data);
      setExpandedTeam(null);
    } catch {
      toast.error("Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, [game]);

  /* ---------- OPEN ADD ---------- */
  const openAdd = () => {
    setEditing(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  /* ---------- OPEN EDIT ---------- */
  const openEdit = (team) => {
    setEditing(team);
    setFormData({
      name: team.name,
      type: team.type,
    });
    setShowModal(true);
  };

  /* ---------- SAVE TEAM ---------- */
  const saveTeam = async () => {
    if (!formData.name.trim()) {
      toast.error("Enter team name");
      return;
    }

    try {
      if (editing) {
        const ref = doc(db, "teams", editing.id);
        await updateDoc(ref, formData);
        toast.success("Team updated");
      } else {
        await addDoc(teamsRef, {
          ...formData,
          game,
        });
        toast.success("Team added");
      }

      setShowModal(false);
      setEditing(null);
      setFormData(emptyForm);
      loadTeams();
    } catch {
      toast.error("Operation failed");
    }
  };

  /* ---------- DELETE ---------- */
  const deleteTeam = async (id) => {
    if (!window.confirm("Delete team?")) return;

    try {
      await deleteDoc(doc(db, "teams", id));
      toast.success("Team deleted");
      loadTeams();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ---------- TOGGLE ---------- */
  const toggleTeam = (teamId) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Target className="text-brand-red" size={20} />
          {game} Teams
        </h3>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-brand-red text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors w-full sm:w-auto justify-center"
        >
          <Plus size={16} /> Add Team
        </button>
      </div>

      {/* LOADING */}
      {loading && <div className="text-gray-500 text-sm">Loading teams...</div>}

      {/* TEAM LIST */}
      <div className="space-y-4">
        {!loading && teams.length === 0 && (
          <div className="text-gray-500 text-sm">No teams found. Add one.</div>
        )}

        {teams.map((team) => (
          <div
            key={team.id}
            className="border border-white/10 rounded-lg bg-black/30 overflow-hidden"
          >
            {/* TEAM HEADER */}
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

              {/* ACTIONS */}
              <div
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => openEdit(team)}
                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded transition-colors"
                >
                  <Edit2 size={16} />
                </button>

                <button
                  onClick={() => deleteTeam(team.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* PLAYERS */}
            {expandedTeam === team.id && (
              <div className="p-6 bg-black/50 animate-in slide-in-from-top-2 duration-200">
                <PlayerManager teamId={team.id} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">
          <div className="bg-[#111] p-6 rounded-xl w-full max-w-md space-y-3">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">
                {editing ? "Edit Team" : "Add Team"}
              </h3>

              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            <input
              placeholder="Team Name"
              className="w-full bg-black border border-white/10 p-3 rounded"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <select
              className="w-full bg-black border border-white/10 p-3 rounded"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option>Main</option>
              <option>Academy</option>
              <option>Female</option>
            </select>

            <button
              onClick={saveTeam}
              className="w-full bg-brand-red py-3 rounded font-bold"
            >
              {editing ? "Update Team" : "Save Team"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
