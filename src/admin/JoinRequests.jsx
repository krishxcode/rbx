import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, Search, Eye, X } from "lucide-react";

const tabs = ["All", "Pending", "Approved", "Rejected"];

const JoinRequests = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  /* 🔥 REALTIME FETCH */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "join_requests"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // newest first
      data.sort((a, b) => {
        const aTime = a.createdAt?.seconds ?? 0;
        const bTime = b.createdAt?.seconds ?? 0;
        return bTime - aTime;
      });

      setRequests(data);
    });

    return () => unsub();
  }, []);

  /* 🔥 DELETE REQUEST */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this request permanently?")) return;

    try {
      await deleteDoc(doc(db, "join_requests", id));
      toast.success("Request deleted");
      setSelectedRequest(null);
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };
  /* 🔥 FILTER + SEARCH */
  const filtered = useMemo(() => {
    return requests.filter((r) => {
      const matchTab =
        activeTab === "All" || (r.status || "Pending") === activeTab;

      const matchSearch = (r.ign || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchTab && matchSearch;
    });
  }, [requests, activeTab, search]);

  /* 🔥 APPROVE / REJECT */
  const handleStatus = async (req, status) => {
    try {
      // update firestore
      await updateDoc(doc(db, "join_requests", req.id), {
        status,
      });

      const whatsappLink =
        "https://chat.whatsapp.com/KyukXegyu5uBburfJ4z9vS?mode=gi_t";

      /* 🔥 APPROVED MESSAGE */
      const approvedMessage = `
<p>Hello <b>${req.ign}</b>,</p>

<p>🎉 Congratulations! Your RBX Esports application has been <b>APPROVED</b>.</p>

<p>Click below to join the official RBX Esports WhatsApp Group:</p>

<p>
<a href="${whatsappLink}"
style="
display:inline-block;
background:#25D366;
color:white;
padding:10px 18px;
border-radius:8px;
text-decoration:none;
font-weight:bold;
">
🔥 Join RBX WhatsApp Group
</a>
</p>

<p>Welcome to the team 🔥</p>
<p>- RBX ESPORTS</p>
`;

      /* 🔥 REJECTED MESSAGE */
      const rejectedMessage = `
<p>Hello <b>${req.ign}</b>,</p>

<p>Your RBX Esports application has been <b>REJECTED</b>.</p>

<p>Thank you for applying.</p>
<p>- RBX ESPORTS</p>
`;

      const emailMessage =
        status === "Approved" ? approvedMessage : rejectedMessage;
      // send email
      await emailjs.send(
        "service_6d986qp",
        "template_cy31nff",
        {
          subject: `RBX ESPORTS APPLICATION ${status}`,
          name: req.ign,
          email: req.email,
          message: emailMessage,
          to_email: req.email,
        },
        "_EW8XXtVjIQ7ea6P5"
      );

      toast.success(`Application ${status}`);
    } catch (err) {
      console.error(err);
      toast.error("Action failed");
    }
  };

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-b from-black to-[#0a0a0a]">
      {/* HEADER */}
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
        <h2 className="text-3xl font-bold">
          Join Requests ({filtered.length})
        </h2>

        {/* SEARCH */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            placeholder="Search IGN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/50 border border-white/20 pl-10 pr-4 py-2 rounded-lg focus:border-red-500 outline-none"
          />
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg border transition-all ${
              activeTab === tab
                ? "bg-red-600 border-red-600"
                : "border-white/20 hover:border-red-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {filtered.map((req) => {
          const currentStatus = req.status || "Pending";

          return (
            <div
              key={req.id}
              className="p-5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-red-500/50 transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-red-600">{req.ign}</h3>
                  <p className="text-sm text-gray-300">Game: {req.game}</p>
                  <p className="text-sm text-gray-300">Email: {req.email}</p>
                  <p className="text-sm text-gray-300">Phone: {req.number}</p>
                  <p className="text-sm mt-1">
                    Status:
                    <span className="font-bold ml-1">{currentStatus}</span>
                  </p>
                </div>

                <div className="flex gap-3 flex-wrap items-center">
                  {/* VIEW */}
                  <button
                    onClick={() => setSelectedRequest(req)}
                    className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:scale-105 transition"
                  >
                    <Eye size={18} />
                    View
                  </button>

                  {currentStatus === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleStatus(req, "Approved")}
                        className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg hover:scale-105 transition"
                      >
                        <CheckCircle size={18} />
                        Approve
                      </button>

                      <button
                        onClick={() => handleStatus(req, "Rejected")}
                        className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:scale-105 transition"
                      >
                        <XCircle size={18} />
                        Reject
                      </button>
                    </>
                  ) : (
                    <span
                      className={`px-4 py-2 rounded-lg font-bold text-sm ${
                        currentStatus === "Approved"
                          ? "bg-green-600/20 text-green-400 border border-green-500/30"
                          : "bg-red-600/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {currentStatus}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No requests found</p>
      )}

      {/* 🔥 GLASSMORPHISM MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold text-red-400">
                Application Details
              </h3>
              <button onClick={() => setSelectedRequest(null)}>
                <X />
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <b>IGN:</b> {selectedRequest.ign}
              </p>
              <p>
                <b>UID:</b> {selectedRequest.uid}
              </p>
              <p>
                <b>Email:</b> {selectedRequest.email}
              </p>
              <p>
                <b>Phone:</b> {selectedRequest.number}
              </p>
              <p>
                <b>Game:</b> {selectedRequest.game}
              </p>
              <p>
                <b>Status:</b> {selectedRequest.status || "Pending"}
              </p>
              <p>
                <b>Experience:</b> {selectedRequest.experience}
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => handleDelete(selectedRequest.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-bold transition"
              >
                Delete Request
              </button>

              <button
                onClick={() => setSelectedRequest(null)}
                className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-lg font-bold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinRequests;
