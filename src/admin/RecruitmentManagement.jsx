import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

const ROLE_OPTIONS = {
  Gaming: [
    {
      title: "Rusher",
      description:
        "Lead aggressive entry pushes and create opening advantages for the squad. Strong game sense, fast decision making, and fearless close-range combat required.",
    },
    {
      title: "Assaulter",
      description:
        "Core assault role focused on mid-range engagements, team coordination, and consistent damage output during high-pressure competitive matches.",
    },
    {
      title: "Sniper",
      description:
        "Long-range specialist responsible for precision eliminations, map control, and providing strategic cover to the team during rotations and fights.",
    },
    {
      title: "IGL (In-Game Leader)",
      description:
        "Lead team strategy, call rotations, manage fights, and maintain overall game flow. Strong communication and tactical thinking are mandatory.",
    },
    {
      title: "Support Player",
      description:
        "Support teammates with utilities, revives, and positioning. Focus on survival, team coordination, and enabling star players to perform better.",
    },
    {
      title: "Entry Fragger",
      description:
        "Take first contact in fights and create space for teammates. Requires confidence, mechanical skill, and fast reaction timing under pressure.",
    },
    {
      title: "Scout / Analyst Player",
      description:
        "Gather enemy information, track rotations, and provide real-time intel to improve team decision-making during tournaments and scrims.",
    },
    {
      title: "Substitute Player",
      description:
        "Backup competitive player ready to step in during tournaments or practice sessions while maintaining consistent performance standards.",
    },
  ],

  Management: [
    {
      title: "Content Manager",
      description:
        "Plan, organize, and manage the entire content pipeline for RBX Esports including uploads, campaigns, and creative direction across platforms.",
    },
    {
      title: "Social Media Manager",
      description:
        "Lead the voice of RBX across Twitter, Instagram, and TikTok. Meme game must be radiant tier while maintaining brand consistency and engagement.",
    },
    {
      title: "Video Editor",
      description:
        "Create high-energy esports videos, highlights, montages, and promotional edits that match competitive gaming trends and audience expectations.",
    },
    {
      title: "Graphic Designer",
      description:
        "Design esports posters, announcements, matchday graphics, and branding assets that align with RBX visual identity and professional standards.",
    },
    {
      title: "Community Manager",
      description:
        "Manage Discord and community interactions, maintain positive engagement, and act as a bridge between players, fans, and the organization.",
    },
    {
      title: "Team Manager",
      description:
        "Handle player schedules, scrims, tournament registrations, and internal coordination to ensure smooth day-to-day team operations.",
    },
    {
      title: "Tournament Coordinator",
      description:
        "Plan and manage tournament participation, registrations, communication with organizers, and ensure team readiness for competitive events.",
    },
    {
      title: "Talent Scout",
      description:
        "Identify upcoming gaming talent, review player performance, and help expand the RBX roster with skilled and disciplined players.",
    },
    {
      title: "Partnership Manager",
      description:
        "Handle brand collaborations, sponsorship discussions, and partnership growth opportunities to expand RBX Esports visibility and revenue.",
    },
    {
      title: "Marketing Strategist",
      description:
        "Build growth strategies, campaign ideas, and audience expansion plans to increase reach, engagement, and brand awareness.",
    },
    {
      title: "Esports Analyst",
      description:
        "Analyze gameplay, review match performance, and provide strategic insights to improve team coordination and competitive results.",
    },
    {
      title: "Operations Manager",
      description:
        "Oversee internal workflows, manage execution timelines, and ensure all departments work smoothly toward organizational goals.",
    },
  ],
};

/* ================= DEFAULT FORM ================= */
const emptyForm = {
  title: "",
  department: "Gaming",
  location: "Remote",
  type: "Team Role",
  salary: "",
  description: "",
  category: "Gaming",
  status: "Open",
};

const RecruitmentManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  /* ================= FETCH JOBS ================= */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "jobs"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(data);
    });

    return () => unsub();
  }, []);

  /* ================= OPEN ADD ================= */
  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowModal(true);
  };

  /* ================= OPEN EDIT ================= */
  const openEdit = (job) => {
    setForm(job);
    setEditId(job.id);
    setShowModal(true);
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!form.title || !form.description) {
      toast.error("Title & Description required");
      return;
    }

    try {
      toast.loading("Saving...");

      if (editId) {
        await updateDoc(doc(db, "jobs", editId), form);
        toast.dismiss();
        toast.success("Recruitment updated");
      } else {
        await addDoc(collection(db, "jobs"), form);
        toast.dismiss();
        toast.success("Recruitment added");
      }

      setShowModal(false);
      setForm(emptyForm);
      setEditId(null);
    } catch {
      toast.dismiss();
      toast.error("Operation failed");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this recruitment?")) return;

    try {
      await deleteDoc(doc(db, "jobs", id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <section className="min-h-screen bg-black text-white px-3 sm:px-4 md:px-6 py-4 sm:py-6">
      <div className="max-w-6xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
            Recruitment Management
          </h1>

          <button
            onClick={openAdd}
            className="flex items-center justify-center gap-2 bg-brand-red px-4 py-2.5 rounded font-bold hover:opacity-90 w-full sm:w-auto"
          >
            <Plus size={18} />
            Add Recruitment
          </button>
        </div>

        {/* ================= JOB LIST ================= */}
        <div className="grid gap-4 sm:gap-5">
          {jobs.length === 0 && (
            <div className="border border-white/10 p-5 sm:p-6 text-gray-400 text-sm sm:text-base rounded-lg">
              No recruitments found.
            </div>
          )}

          {jobs.map((job) => (
            <div
              key={job.id}
              className="border border-white/10 bg-white/[0.02] p-4 sm:p-5 md:p-6 rounded-lg flex flex-col lg:flex-row lg:items-start justify-between gap-4"
            >
              {/* LEFT CONTENT */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-brand-red break-words">
                  {job.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-400 mt-1 break-words">
                  {job.department} • {job.type} • {job.location}
                </p>

                <p className="text-sm text-gray-300 mt-2 break-words">
                  {job.description}
                </p>

                <p className="text-xs sm:text-sm mt-3 text-gray-500 break-words">
                  Salary: {job.salary || "N/A"}
                </p>

                <p className="text-xs sm:text-sm text-green-400 mt-1">
                  Status: {job.status || "Open"}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 sm:gap-3 self-start lg:self-center">
                <button
                  onClick={() => openEdit(job)}
                  className="p-2.5 border border-white/20 rounded hover:border-brand-red transition"
                >
                  <Edit2 size={18} />
                </button>

                <button
                  onClick={() => handleDelete(job.id)}
                  className="p-2.5 border border-white/20 rounded hover:border-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-end sm:items-center p-2 sm:p-4 z-50">
          <div className="bg-[#111] w-full max-w-md rounded-t-xl sm:rounded-xl p-4 sm:p-6 space-y-3 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base sm:text-lg">
                {editId ? "Edit Recruitment" : "Add Recruitment"}
              </h3>

              <button onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <select
              className="w-full bg-black border border-white/20 p-3 rounded"
              value={form.title}
              onChange={(e) => {
                const selectedRole = ROLE_OPTIONS[form.department].find(
                  (r) => r.title === e.target.value
                );

                setForm({
                  ...form,
                  title: selectedRole.title,
                  description: selectedRole.description,
                  category: form.department,
                });
              }}
            >
              <option value="">Select Role</option>

              {ROLE_OPTIONS[form.department].map((role) => (
                <option key={role.title} value={role.title}>
                  {role.title}
                </option>
              ))}
            </select>

            <select
              className="w-full bg-black border border-white/20 p-3 rounded text-sm sm:text-base"
              value={form.department}
              onChange={(e) =>
                setForm({
                  ...form,
                  department: e.target.value,
                  category: e.target.value,
                })
              }
            >
              <option>Gaming</option>
              <option>Management</option>
            </select>

            <input
              placeholder="Location"
              className="w-full bg-black border border-white/20 p-3 rounded text-sm sm:text-base"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            <select
              className="w-full bg-black border border-white/20 p-3 rounded text-sm sm:text-base"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option>Team Role</option>
              <option>Full-Time</option>
            </select>

            <input
              placeholder="Salary"
              className="w-full bg-black border border-white/20 p-3 rounded text-sm sm:text-base"
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
            />

            <select
              className="w-full bg-black border border-white/20 p-3 rounded"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            >
              <option value="">Select Description</option>

              {ROLE_OPTIONS[form.department].map((role) => (
                <option key={role.title} value={role.description}>
                  {role.description}
                </option>
              ))}
            </select>

            <select
              className="w-full bg-black border border-white/20 p-3 rounded text-sm sm:text-base"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>Open</option>
              <option>Closed</option>
            </select>

            <button
              onClick={handleSave}
              className="w-full bg-brand-red py-3 rounded font-bold text-sm sm:text-base"
            >
              {editId ? "Update Recruitment" : "Add Recruitment"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecruitmentManagement;
