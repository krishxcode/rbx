import React, { useEffect, useState, useMemo } from "react";
import { Plus, Trash2, Edit2, User, X, Search, Crown } from "lucide-react";

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

import imageCompression from "browser-image-compression";
import { db } from "../firebase";
import toast from "react-hot-toast";

export const PlayerManager = ({ teamId }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [search, setSearch] = useState("");

  const emptyForm = {
    name: "",
    role: "",
    kda: "",
    matches: "",
    img: "",
    captain: false,
  };

  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const playersRef = collection(db, "players");

  /* ---------- LOAD PLAYERS ---------- */
  const loadPlayers = async () => {
    setLoading(true);

    const q = query(playersRef, where("teamId", "==", teamId));
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setPlayers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPlayers();
  }, [teamId]);

  /* ---------- FILTER ---------- */
  const filteredPlayers = useMemo(() => {
    return players.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [players, search]);

  /* ---------- IMAGE UPLOAD ---------- */
  const uploadImage = async (file) => {
    const compressed = await imageCompression(file, {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 400,
      useWebWorker: true,
    });

    const form = new FormData();
    form.append("file", compressed);
    form.append("upload_preset", "rbx_players");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dkjoqpwhl/image/upload",
      { method: "POST", body: form }
    );

    const data = await res.json();
    return data.secure_url;
  };

  /* ---------- ADD ---------- */
  const openAdd = () => {
    setEditing(null);
    setFormData(emptyForm);
    setPreview(null);
    setShowModal(true);
  };

  /* ---------- EDIT ---------- */
  const openEdit = (player) => {
    setEditing(player);
    setFormData({
      ...player,
      captain: player.captain || false,
    });
    setPreview(player.img);
    setShowModal(true);
  };

  /* ---------- SAVE ---------- */
  const savePlayer = async () => {
    if (!formData.name || !formData.role) {
      toast.error("Fill required fields");
      return;
    }

    setSaving(true);

    let imageUrl = formData.img;

    try {
      if (imageFile) {
        toast.loading("Uploading...");
        imageUrl = await uploadImage(imageFile);
        toast.dismiss();
      }

      const payload = {
        ...formData,
        img: imageUrl,
        teamId,
      };

      if (editing) {
        await updateDoc(doc(db, "players", editing.id), payload);
        toast.success("Player updated");
      } else {
        await addDoc(playersRef, payload);
        toast.success("Player added");
      }

      setShowModal(false);
      setEditing(null);
      setImageFile(null);
      setPreview(null);
      setFormData(emptyForm);
      loadPlayers();
    } catch {
      toast.error("Upload failed");
    }

    setSaving(false);
  };

  /* ---------- DELETE ---------- */
  const deletePlayer = async (id) => {
    if (!window.confirm("Delete player?")) return;

    await deleteDoc(doc(db, "players", id));
    toast.success("Player deleted");
    loadPlayers();
  };

  /* ---------- IMAGE PREVIEW ---------- */
  const handleFile = (file) => {
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between gap-2">
        <h5 className="text-xs sm:text-sm font-bold text-gray-400 uppercase">
          Active Roster
        </h5>

        <div className="flex gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="flex items-center bg-white/5 px-2 rounded w-full sm:w-48">
            <Search size={14} className="text-gray-500" />
            <input
              placeholder="Search"
              className="bg-transparent p-2 text-sm w-full outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-2 rounded"
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      {/* LIST */}
      {loading ? (
        <div className="text-gray-500 text-sm">Loading players...</div>
      ) : filteredPlayers.length === 0 ? (
        <div className="text-gray-500 text-sm">No players found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              className="flex items-center gap-3 bg-[#1a1a1a] border border-white/5 p-3 rounded-lg group"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 shrink-0">
                {player.img ? (
                  <img
                    src={player.img}
                    alt={player.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-full h-full p-2 text-gray-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h6 className="font-bold text-white text-sm truncate flex items-center gap-1">
                  {player.name}
                  {player.captain && (
                    <Crown size={14} className="text-yellow-400" />
                  )}
                </h6>

                <div className="flex gap-2 text-[10px] text-gray-500 uppercase">
                  <span className="text-brand-red">{player.role}</span>
                  <span>KD: {player.kda}</span>
                  <span>MATCHES: {player.matches}</span>
                </div>
              </div>

              <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                <button
                  onClick={() => openEdit(player)}
                  className="p-2 hover:bg-white/10 rounded"
                >
                  <Edit2 size={14} />
                </button>

                <button
                  onClick={() => deletePlayer(player.id)}
                  className="p-2 hover:bg-red-500/10 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-3 z-50">
          <div className="bg-[#111] p-5 rounded-xl w-full max-w-md space-y-3 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between">
              <h3 className="font-bold">
                {editing ? "Edit Player" : "Add Player"}
              </h3>

              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            {preview && (
              <img
                src={preview}
                className="w-24 h-24 rounded-full object-cover mx-auto"
              />
            )}

            <input
              placeholder="Player Name"
              className="w-full bg-black border border-white/10 p-3 rounded"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              placeholder="Role"
              className="w-full bg-black border border-white/10 p-3 rounded"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />

            <input
              placeholder="KDA"
              className="w-full bg-black border border-white/10 p-3 rounded"
              value={formData.kda}
              onChange={(e) =>
                setFormData({ ...formData, kda: e.target.value })
              }
            />
            <input
              placeholder="Matches"
              className="w-full bg-black border border-white/10 p-3 rounded"
              value={formData.matches}
              onChange={(e) =>
                setFormData({ ...formData, matches: e.target.value })
              }
            />

            {/* CAPTAIN TOGGLE */}
            <div className="flex items-center justify-between bg-black border border-white/10 p-3 rounded">
              <span className="text-sm font-semibold">Team Captain</span>

              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    captain: !formData.captain,
                  })
                }
                className={`px-4 py-1 rounded font-bold text-xs ${
                  formData.captain ? "bg-green-600" : "bg-white/10"
                }`}
              >
                {formData.captain ? "YES" : "NO"}
              </button>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files[0])}
            />

            <button
              disabled={saving}
              onClick={savePlayer}
              className="w-full bg-brand-red py-3 rounded font-bold disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Player"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
