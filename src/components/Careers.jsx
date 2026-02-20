import React, { useState, useEffect } from "react";
import { Briefcase, MapPin, Clock, ArrowRight, X } from "lucide-react";

import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

/* DEMO JOB DATA */

export const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appData, setAppData] = useState({});

  const applicationsRef = collection(db, "applications");

  /* FAKE BACKEND DELAY */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "jobs"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setJobs(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((j) => j.category === filter);

  const visibleJobs = filteredJobs.slice(0, 4);

  const openApply = (job) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  /* SUBMIT */
  const submitApplication = async () => {
    if (!appData.name) {
      toast.error("Enter name");
      return;
    }

    try {
      toast.loading("Submitting application...");

      await addDoc(applicationsRef, {
        ...appData,

        availableTime: Array.isArray(appData.availableTime)
          ? [...new Set(appData.availableTime.filter(Boolean))]
          : [],

        role: selectedJob.title,
        category: selectedJob.category,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      toast.dismiss();
      toast.success("Application submitted!");

      setShowForm(false);
      setAppData({});
    } catch {
      toast.dismiss();
      toast.error("Submission failed");
    }
  };

  return (
    <section className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16">
          <div className="md:w-2/3">
            <span className="text-brand-red font-bold tracking-[0.3em] uppercase mb-4 block">
              Work With Us
            </span>

            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              BUILD THE <span className="text-gray-500">LEGACY</span>
            </h2>

            <p className="text-gray-400 text-lg max-w-2xl">
              We are not just looking for employees; we are looking for
              visionaries. Join the team behind the screen and help shape the
              future of competitive gaming.
            </p>
          </div>
        </div>

        {/* FILTER */}
        <div className="flex gap-3 mb-8">
          {["All", "Gaming", "Management"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 border rounded ${
                filter === f
                  ? "bg-brand-red border-brand-red"
                  : "border-white/20"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* JOB LIST */}
        <div className="grid grid-cols-1 gap-6">
          {/* SHIMMER */}
          {loading &&
            [...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse border border-white/10 p-8">
                <div className="h-4 bg-white/10 mb-3 w-24"></div>
                <div className="h-6 bg-white/10 mb-4 w-1/2"></div>
                <div className="h-4 bg-white/10 mb-2"></div>
                <div className="h-4 bg-white/10 w-3/4"></div>
              </div>
            ))}

          {!loading &&
            visibleJobs.map((job) => (
              <div
                key={job.id}
                className="group relative bg-white/[0.02] border border-white/10 hover:border-brand-red/50 p-8 transition-all duration-300 hover:bg-white/[0.04]"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-brand-red text-xs font-bold tracking-widest uppercase border border-brand-red/30 px-2 py-1 bg-brand-red/10">
                        {job.department}
                      </span>

                      {job.type === "Full-Time" && (
                        <span className="text-gray-400 text-xs font-bold tracking-widest uppercase border border-white/10 px-2 py-1">
                          {job.type}
                        </span>
                      )}
                      {job.status && (
                        <span
                          className={`text-xs font-bold tracking-widest uppercase border px-2 py-1 ${
                            job.status === "Open"
                              ? "text-green-400 border-green-500/30 bg-green-500/10"
                              : "text-red-400 border-red-500/30 bg-red-500/10"
                          }`}
                        >
                          {job.status}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 group-hover:text-brand-red transition-colors">
                      {job.title}
                    </h3>

                    <p className="text-gray-400 max-w-2xl text-sm mb-4 md:mb-0">
                      {job.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-6 items-center text-sm font-medium text-gray-500">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-brand-red" />
                      <span>{job.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-brand-red" />
                      <span>{job.type}</span>
                    </div>

                    <div className="hidden lg:flex items-center gap-2">
                      <Briefcase size={16} className="text-brand-red" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0">
                    <button
                      disabled={job.status === "Closed"}
                      onClick={() => job.status !== "Closed" && openApply(job)}
                      className={`flex items-center gap-2 font-bold uppercase tracking-wider transition-all duration-300
    ${
      job.status === "Closed"
        ? "text-gray-500 cursor-not-allowed"
        : "text-white hover:text-red-500 group-hover:translate-x-2"
    }`}
                    >
                      {job.status === "Closed" ? "Closed" : "Apply Now"}
                      <ArrowRight size={18} className="text-brand-red" />
                    </button>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
              </div>
            ))}
        </div>
      </div>

      {/* FORM */}
      {showForm && selectedJob && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">
          <div className="bg-[#111] p-6 rounded-xl w-full max-w-md space-y-3 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">Apply: {selectedJob.title}</h3>
              <button onClick={() => setShowForm(false)}>
                <X />
              </button>
            </div>

            <input
              placeholder="Full Name"
              className="w-full bg-black border p-3 rounded"
              onChange={(e) => setAppData({ ...appData, name: e.target.value })}
            />

            {selectedJob.category === "Gaming" && (
              <>
                <input
                  placeholder="UID"
                  inputMode="numeric"
                  className="w-full bg-black border p-3 rounded"
                  onChange={(e) =>
                    setAppData({ ...appData, uid: e.target.value })
                  }
                />
                <input
                  placeholder="Discord ID (username#1234)"
                  className="w-full bg-black border p-3 rounded"
                  onChange={(e) =>
                    setAppData({ ...appData, discord: e.target.value })
                  }
                />

                <input
                  placeholder="Email"
                  type="email"
                  className="w-full bg-black border p-3 rounded"
                  onChange={(e) =>
                    setAppData({ ...appData, email: e.target.value })
                  }
                />

                <input
                  placeholder="IGN"
                  className="w-full bg-black border p-3 rounded"
                  onChange={(e) =>
                    setAppData({ ...appData, ign: e.target.value })
                  }
                />
                <input
                  placeholder="Experience"
                  className="w-full bg-black border p-3 rounded"
                  onChange={(e) =>
                    setAppData({ ...appData, experience: e.target.value })
                  }
                />
                <div className="space-y-2">
                  <p className="text-sm text-gray-400 font-semibold">
                    Available Time
                  </p>

                  <div className="flex gap-4 flex-wrap text-sm">
                    {["12 PM", "3 PM", "6 PM", "9 PM"].map((time) => (
                      <label
                        key={time}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            const times = appData.availableTime || [];

                            if (e.target.checked) {
                              setAppData({
                                ...appData,
                                availableTime: [...times, time],
                              });
                            } else {
                              setAppData({
                                ...appData,
                                availableTime: times.filter((t) => t !== time),
                              });
                            }
                          }}
                        />
                        {time}
                      </label>
                    ))}
                  </div>
                </div>

                <textarea
                  placeholder="Achievements"
                  className="w-full bg-black border p-3 rounded"
                  onChange={(e) =>
                    setAppData({ ...appData, achievements: e.target.value })
                  }
                />
              </>
            )}

            {selectedJob.category === "Management" && (
              <>
                <input
                  placeholder="Email"
                  className="w-full bg-black border p-3 rounded"
                  onChange={(e) =>
                    setAppData({ ...appData, email: e.target.value })
                  }
                />
                <input
                  placeholder="Skills"
                  className="w-full bg-black border p-3 rounded"
                  onChange={(e) =>
                    setAppData({ ...appData, skills: e.target.value })
                  }
                />
                <input
                  placeholder="Portfolio Link"
                  className="w-full bg-black border p-3 rounded"
                  onChange={(e) =>
                    setAppData({ ...appData, portfolio: e.target.value })
                  }
                />
              </>
            )}

            <button
              onClick={submitApplication}
              className="w-full bg-brand-red py-3 rounded font-bold"
            >
              Submit Application
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
