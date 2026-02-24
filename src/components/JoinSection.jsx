import React, { useState } from "react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
const joinRef = collection(db, "join_requests");
export const JoinSection = () => {
  const [formData, setFormData] = useState({
    ign: "",
    uid: "",
    email: "",
    number: "",
    game: "",
    experience: "",
  });

  const [sending, setSending] = useState(false);

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async () => {
    if (!formData.ign.trim()) return toast.error("Enter IGN");
    if (!formData.email.trim()) return toast.error("Enter Email");
    if (!formData.number.trim()) return toast.error("Enter Phone Number");
    if (formData.number.length !== 10)
      return toast.error("Phone must be 10 digits");
    if (!formData.game) return toast.error("Select Game");

    const toastId = toast.loading("Sending request...");

    try {
      console.log("🔥 TRYING TO SAVE:", formData);

      /* 🔥 SAVE TO FIREBASE */
      const docRef = await addDoc(joinRef, {
        ...formData,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      console.log("✅ FIREBASE SAVE SUCCESS ID:", docRef.id);

      /* 🔥 EMAIL SEND */
      await emailjs.send(
        "service_6d986qp",
        "template_cy31nff",
        {
          subject: "🔥 New Join Request - RBX ESPORTS",
          name: formData.ign,
          email: formData.email,
          role: "JOIN REQUEST",

          message: `
<p><b>New Join Request Received</b></p>

<p><b>IGN:</b> ${formData.ign}</p>
<p><b>UID:</b> ${formData.uid}</p>
<p><b>Email:</b> ${formData.email}</p>
<p><b>Phone:</b> ${formData.number}</p>
<p><b>Game:</b> ${formData.game}</p>
<p><b>Experience:</b> ${formData.experience}</p>
`,

          to_email: "kishanpanditweb@gmail.com",
        },
        "_EW8XXtVjIQ7ea6P5"
      );

      toast.dismiss(toastId);
      toast.success("Join request sent!");
    } catch (err) {
      console.error("❌ FIREBASE ERROR:", err.message);
      toast.dismiss(toastId);
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="bg-brand-gray/80 backdrop-blur-md border border-white/5 p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
              JOIN THE <span className="text-brand-red">LEGION</span>
            </h2>
            <p className="text-gray-400">
              Do you have what it takes to compete at the highest level?
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  IGN (In-Game Name)
                </label>
                <input
                  type="text"
                  value={formData.ign}
                  onChange={(e) =>
                    setFormData({ ...formData, ign: e.target.value })
                  }
                  className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-brand-red focus:outline-none transition-colors"
                  placeholder="e.g. ShadowSlayer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  GAME UID
                </label>
                <input
                  type="text"
                  value={formData.uid}
                  onChange={(e) =>
                    setFormData({ ...formData, uid: e.target.value })
                  }
                  className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-brand-red focus:outline-none transition-colors"
                  placeholder="UID#0000"
                />
              </div>
            </div>

            {/* EMAIL FIELD */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-brand-red focus:outline-none transition-colors"
                placeholder="you@email.com"
              />
            </div>

            {/* PHONE FIELD */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Phone Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={formData.number}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    number: e.target.value.replace(/\D/g, "").slice(0, 10),
                  })
                }
                className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-brand-red focus:outline-none transition-colors"
                placeholder="Phone Number"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Primary Game
              </label>
              <div className="grid grid-cols-3 gap-4">
                {["VALORANT", "BGMI", "FREE FIRE"].map((game) => (
                  <label key={game} className="cursor-pointer">
                    <input
                      type="radio"
                      name="game"
                      className="peer sr-only"
                      checked={formData.game === game}
                      onChange={() => setFormData({ ...formData, game })}
                    />
                    <div className="text-center py-3 border border-white/10 bg-black/30 peer-checked:bg-brand-red peer-checked:text-white peer-checked:border-brand-red transition-all hover:border-brand-red/50">
                      <span className="font-bold text-sm">{game}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Experience / Achievements
              </label>
              <textarea
                value={formData.experience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: e.target.value,
                  })
                }
                className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-brand-red focus:outline-none transition-colors h-32"
                placeholder="Tell us about your rank, past tournaments, and competitive experience..."
              ></textarea>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={sending}
              className="w-full bg-white text-black font-display font-bold text-xl py-4 hover:bg-brand-red hover:text-white transition-colors clip-path-button uppercase tracking-wider"
            >
              {sending ? "Sending..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
