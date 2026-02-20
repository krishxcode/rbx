import React, { useEffect, useState } from "react";
import { Check, X, Eye } from "lucide-react";
import emailjs from "emailjs-com";

import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";
import toast from "react-hot-toast";

/* ---------- DETAIL ROW ---------- */
const Detail = ({ label, value }) => {
  if (!value) return null;

  return (
    <div className="flex justify-between gap-4 border-b border-white/5 pb-1">
      <span className="text-gray-400">{label}</span>
      <span className="text-right max-w-[60%] break-words">{value}</span>
    </div>
  );
};

export const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  const applicationsRef = collection(db, "applications");

  /* ---------- LOAD APPLICATIONS ---------- */
  const loadApplications = async () => {
    const snapshot = await getDocs(applicationsRef);

    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setApplications(data);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  /* ---------- ACCEPT ---------- */
  const acceptApp = async (app) => {
    if (!app.email) return toast.error("User email missing");
    try {
      await updateDoc(doc(db, "applications", app.id), {
        status: "Accepted",
      });

      await emailjs.send(
        "service_6d986qp",
        "template_cy31nff",
        {
          subject: "🎉 Application Accepted - RBX ESPORTS",
          name: app.name || app.ign || "Player",
          email: app.email || "",
          type: "APPLICATION STATUS",
          message:
            "Congratulations! Your application has been accepted. Our team will contact you soon.",
          to_email: app.email, // IMPORTANT
        },
        "_EW8XXtVjIQ7ea6P5"
      );

      toast.success("Application accepted & email sent");
      loadApplications();
    } catch (err) {
      console.error(err);
      toast.error("Email sending failed");
    }
  };

  /* ---------- REJECT ---------- */
  const rejectApp = async (app) => {
    if (!app.email) return toast.error("User email missing");
    try {
      await updateDoc(doc(db, "applications", app.id), {
        status: "Rejected",
      });

      await emailjs.send(
        "service_6d986qp",
        "template_cy31nff",
        {
          subject: "❌ Application Update - RBX ESPORTS",
          name: app.name || app.ign || "Player",
          email: app.email || "",
          type: "APPLICATION STATUS",
          message:
            "Thank you for applying to RBX Esports. Currently we are not moving forward with your application.",
          to_email: app.email, // IMPORTANT
        },
        "_EW8XXtVjIQ7ea6P5"
      );

      toast.success("Application rejected & email sent");
      loadApplications();
    } catch (err) {
      console.error(err);
      toast.error("Email sending failed");
    }
  };

  /* ---------- DELETE ---------- */
  const deleteApp = async (id) => {
    if (!window.confirm("Delete application?")) return;

    await deleteDoc(doc(db, "applications", id));
    toast.success("Application deleted");
    setSelectedApp(null);
    loadApplications();
  };

  const pendingCount = applications.filter(
    (a) => a.status === "Pending" || !a.status
  ).length;

  const sortedApplications = [...applications].sort((a, b) => {
    const order = {
      Pending: 0,
      Accepted: 1,
      Rejected: 2,
    };

    const statusA = a.status || "Pending";
    const statusB = b.status || "Pending";

    return order[statusA] - order[statusB];
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-1">
            RECRUITMENT
          </h2>
          <p className="text-gray-400 text-sm">
            Manage incoming player applications and tryout requests.
          </p>
        </div>

        <div className="flex gap-2">
          <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded text-xs font-bold uppercase">
            {pendingCount} Pending
          </span>
        </div>
      </div>

      {/* APPLICATION CARDS */}
      <div className="grid grid-cols-1 gap-4">
        {sortedApplications.map((app) => (
          <div
            key={app.id}
            className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 hover:border-brand-red/30 transition-all group"
          >
            {/* STATUS STRIP */}
            <div
              className={`w-full md:w-1 h-1 md:h-16 rounded-full ${
                app.status === "Pending" || !app.status
                  ? "bg-yellow-500"
                  : app.status === "Rejected"
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            ></div>

            {/* INFO */}
            <div className="flex-1 w-full text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-white">
                  {app.ign || app.name}
                </h3>

                <span className="text-xs font-bold text-gray-500 bg-white/5 px-2 py-0.5 rounded uppercase">
                  {app.country || "N/A"}
                </span>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
                <span className="text-brand-red font-bold">
                  {app.game || app.category}
                </span>

                {app.rank && (
                  <span>
                    Rank: <span className="text-white">{app.rank}</span>
                  </span>
                )}

                {app.age && (
                  <span>
                    Age: <span className="text-white">{app.age}</span>
                  </span>
                )}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedApp(app)}
                className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10"
              >
                <Eye size={18} />
              </button>

              {app.status === "Accepted" ? (
                <div className="px-4 py-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg font-bold text-sm">
                  Application Accepted
                </div>
              ) : app.status === "Rejected" ? (
                <div className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg font-bold text-sm">
                  Application Rejected
                </div>
              ) : (
                <>
                  <button
                    onClick={() => acceptApp(app)}
                    className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 rounded-lg font-bold text-sm flex items-center gap-2"
                  >
                    <Check size={16} /> Accept
                  </button>

                  <button
                    onClick={() => rejectApp(app)}
                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg font-bold text-sm flex items-center gap-2"
                  >
                    <X size={16} /> Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* DETAILS POPUP */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 max-w-lg w-full text-white space-y-3">
            <h3 className="text-xl font-bold mb-2">Applicant Details</h3>

            <div className="space-y-2 text-sm">
              <Detail label="Name" value={selectedApp.name} />
              <Detail label="UID" value={selectedApp.uid} />
              <Detail label="Email" value={selectedApp.email} />
              <Detail label="Role" value={selectedApp.role} />
              <Detail label="Category" value={selectedApp.category} />

              {selectedApp.ign && (
                <Detail label="IGN" value={selectedApp.ign} />
              )}

              {selectedApp.experience && (
                <Detail label="Experience" value={selectedApp.experience} />
              )}

              {selectedApp.availableTime && (
                <Detail
                  label="Available Time"
                  value={
                    Array.isArray(selectedApp.availableTime)
                      ? selectedApp.availableTime.join(", ")
                      : selectedApp.availableTime
                          ?.split(",")
                          .map((t) => t.trim())
                          .filter((t) => t.includes("PM"))
                          .join(", ")
                  }
                />
              )}

              {selectedApp.achievements && (
                <Detail label="Achievements" value={selectedApp.achievements} />
              )}

              {selectedApp.skills && (
                <Detail label="Skills" value={selectedApp.skills} />
              )}

              {selectedApp.portfolio && (
                <Detail label="Portfolio" value={selectedApp.portfolio} />
              )}

              {selectedApp.createdAt && (
                <Detail
                  label="Applied At"
                  value={new Date(
                    selectedApp.createdAt.seconds * 1000
                  ).toLocaleString()}
                />
              )}
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={() => deleteApp(selectedApp.id)}
                className="flex-1 bg-red-500/10 border border-red-500/30 py-2 rounded"
              >
                Delete
              </button>

              <button
                onClick={() => setSelectedApp(null)}
                className="flex-1 bg-white/10 border border-white/20 py-2 rounded"
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
