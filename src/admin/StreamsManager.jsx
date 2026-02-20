import React, { useState, useEffect } from "react";
import { Plus, Video, Trash2, Play, X, Edit2 } from "lucide-react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";
import toast from "react-hot-toast";

export const StreamsManager = () => {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const emptyForm = {
    title: "",
    url: "",
    category: "Highlights",
    views: "",
    isLive: false,
  };

  const [formData, setFormData] = useState(emptyForm);

  const streamsRef = collection(db, "streams");

  /* LOAD STREAMS */
  const loadStreams = async () => {
    setLoading(true);

    const snapshot = await getDocs(streamsRef);
    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setStreams(data);
    setLoading(false);
  };

  useEffect(() => {
    loadStreams();
  }, []);

  /* YOUTUBE ID */
  const getYoutubeId = (url) => {
    const regExp = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  const getThumbnail = (url) => {
    const id = getYoutubeId(url);
    return id
      ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
      : "https://via.placeholder.com/480x360?text=No+Thumbnail";
  };

  /* ADD */
  const openAdd = () => {
    setEditing(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  /* EDIT */
  const openEdit = (stream) => {
    setEditing(stream);
    setFormData(stream);
    setShowModal(true);
  };

  /* SAVE STREAM */
  const saveStream = async () => {
    if (!formData.url) return alert("Enter video URL");
    if (!formData.title) return alert("Enter title");

    setSaving(true);
    toast.loading("Saving stream...");

    try {
      if (editing) {
        await updateDoc(doc(db, "streams", editing.id), formData);
      } else {
        await addDoc(streamsRef, formData);
      }

      toast.dismiss();
      toast.success("Stream saved");

      setShowModal(false);
      setFormData(emptyForm);
      setEditing(null);
      loadStreams();
    } catch {
      toast.dismiss();
      toast.error("Failed to save");
    }

    setSaving(false);
  };

  /* DELETE */
  const deleteStream = async (id) => {
    if (!window.confirm("Delete stream?")) return;

    await deleteDoc(doc(db, "streams", id));
    loadStreams();
  };

  return (
    <div className="space-y-6 px-3 sm:px-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
        <h3 className="text-xl font-bold text-white flex gap-2">
          <Video className="text-brand-red" size={20} />
          Streams & Highlights
        </h3>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded border border-white/10 w-full sm:w-auto justify-center"
        >
          <Plus size={16} /> Add Stream
        </button>
      </div>

      {/* STREAM GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* LOADING SHIMMER */}
        {loading &&
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-black/40 border border-white/10 rounded-lg overflow-hidden"
            >
              <div className="h-44 bg-white/10"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                <div className="h-3 bg-white/10 rounded w-1/2"></div>
              </div>
            </div>
          ))}

        {/* EMPTY STATE */}
        {!loading && streams.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center text-center py-16 text-gray-400 animate-pulse">
            <Video size={40} />
            <p className="mt-3 font-semibold">No content added yet</p>
            <p className="text-xs opacity-70">
              Add streams or highlights to show here.
            </p>
          </div>
        )}

        {/* STREAM CARDS */}
        {!loading &&
          streams.map((stream) => (
            <div
              key={stream.id}
              className="bg-black/50 border border-white/10 rounded-lg overflow-hidden"
            >
              <div className="h-44 relative">
                <img
                  src={getThumbnail(stream.url)}
                  alt="thumb"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play size={30} className="text-white" />
                </div>

                {stream.isLive && (
                  <div className="absolute top-2 left-2 bg-red-600 px-2 py-1 text-xs rounded font-bold">
                    LIVE
                  </div>
                )}

                <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 text-xs rounded">
                  {stream.category}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="font-bold text-white truncate">
                  {stream.title}
                </h4>

                <p className="text-xs text-gray-400">
                  Views: {stream.views || "0"}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(stream)}
                    className="flex-1 py-2 bg-white/5 hover:bg-blue-500/20 text-xs rounded flex justify-center gap-2"
                  >
                    <Edit2 size={12} /> Edit
                  </button>

                  <button
                    onClick={() => deleteStream(stream.id)}
                    className="flex-1 py-2 bg-white/5 hover:bg-red-500/20 text-xs rounded flex justify-center gap-2"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

        {/* ADD CARD */}
        {!loading && (
          <button
            onClick={openAdd}
            className="min-h-[250px] border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-brand-red/30"
          >
            <Plus size={28} />
            Add Content
          </button>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">
          <div className="bg-[#111] p-6 rounded-xl w-full max-w-md space-y-3 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">
                {editing ? "Edit Stream" : "Add Stream"}
              </h3>
              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            <input
              placeholder="Title"
              className="w-full bg-black border border-white/10 p-3 rounded"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <input
              placeholder="YouTube Link"
              className="w-full bg-black border border-white/10 p-3 rounded"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
            />

            <input
              placeholder="Views"
              className="w-full bg-black border border-white/10 p-3 rounded"
              value={formData.views}
              onChange={(e) =>
                setFormData({ ...formData, views: e.target.value })
              }
            />

            <select
              className="w-full bg-black border border-white/10 p-3 rounded"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option>Highlights</option>
              <option>Live Stream</option>
            </select>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={formData.isLive}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isLive: e.target.checked,
                  })
                }
              />
              Live Now
            </label>

            <button
              onClick={saveStream}
              disabled={saving}
              className="w-full bg-brand-red py-3 rounded font-bold disabled:opacity-50"
            >
              {saving ? "Saving..." : editing ? "Update Stream" : "Save Stream"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
