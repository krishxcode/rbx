import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail, Shield } from "lucide-react";

const leaders = [
  {
    name: "ALEX 'VORTEX' MERCER",
    role: "FOUNDER & CEO",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop",
    bio: "Visionary leader with a decade of competitive experience. Founded RBX to set a new standard in esports excellence.",
    type: "FOUNDER",
  },
  {
    name: "SARAH 'NOVA' JENKINS",
    role: "CO-FOUNDER & COO",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
    bio: "The strategic mind behind our global operations. Formerly managed top-tier teams in Europe and NA.",
    type: "FOUNDER",
  },
];

const staff = [
  {
    name: "MICHAEL CHANG",
    role: "GENERAL MANAGER",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop",
    bio: "Orchestrating the daily operations of our championship rosters.",
    type: "STAFF",
  },
  {
    name: "DAVID 'HAWK' KIM",
    role: "HEAD COACH",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop",
    bio: "Tactical mastermind. Led three different rosters to major titles.",
    type: "STAFF",
  },
  {
    name: "ELENA RODRIGUEZ",
    role: "MARKETING LEAD",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop",
    bio: "Building the RBX brand and connecting with our global fanbase.",
    type: "STAFF",
  },
  {
    name: "JESSICA LEE",
    role: "SOCIAL MEDIA",
    image:
      "https://images.unsplash.com/photo-1598550874175-4d7112ee7f43?q=80&w=2670&auto=format&fit=crop",
    bio: "The voice of the organization. Creator of our viral content.",
    type: "STAFF",
  },
  {
    name: "MARCUS JOHNSON",
    role: "CREATIVE DIRECTOR",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
    bio: "Defining the visual identity of the next generation of esports.",
    type: "STAFF",
  },
  {
    name: "EMILY CHEN",
    role: "HR & TALENT",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2670&auto=format&fit=crop",
    bio: "Fostering a culture of excellence and well-being.",
    type: "STAFF",
  },
];

const SocialIcon = ({ Icon }) => (
  <a href="#" className="text-gray-500 hover:text-white transition-colors">
    <Icon size={20} />
  </a>
);

const SocialIconSmall = ({ Icon }) => (
  <a href="#" className="text-gray-600 hover:text-brand-red transition-colors">
    <Icon size={16} />
  </a>
);

export const Management = () => {
  return (
    <section className="pt-32 pb-24 bg-brand-dark min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-[800px] bg-gradient-to-b from-brand-red/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center p-3 bg-brand-red/10 rounded-full mb-6 border border-brand-red/20"
          >
            <Shield className="text-brand-red" size={32} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
          >
            RBX <span className="text-brand-red">LEADERSHIP</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Meet the visionaries and strategists driving RBX Esports to the
            forefront of the global competitive scene.
          </motion.p>
        </div>

        {/* Founders Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">
          {leaders.map((leader, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative bg-white/5 border border-white/10 overflow-hidden"
            >
              <div className="flex flex-col h-full">
                <div className="h-80 overflow-hidden relative">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-80"></div>
                  <div className="absolute bottom-4 left-6">
                    <span className="bg-brand-red text-white text-xs font-bold px-3 py-1 uppercase tracking-widest">
                      {leader.role}
                    </span>
                  </div>
                </div>
                <div className="p-8 pt-6 relative bg-gradient-to-b from-transparent to-black/50 flex-1 flex flex-col">
                  <h3 className="text-3xl font-display font-bold text-white mb-3 group-hover:text-brand-red transition-colors">
                    {leader.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                    {leader.bio}
                  </p>
                  <div className="flex gap-4 border-t border-white/10 pt-6">
                    <SocialIcon Icon={Twitter} />
                    <SocialIcon Icon={Linkedin} />
                    <SocialIcon Icon={Mail} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Staff Grid */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-10 flex items-center justify-center gap-3">
            <span className="w-12 h-1 bg-white/10"></span>
            MANAGEMENT TEAM
            <span className="w-12 h-1 bg-white/10"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-[#0a0a0a] border border-white/10 hover:border-brand-red/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="p-6 flex flex-col items-center text-center relative z-10">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 mb-6 group-hover:border-brand-red transition-colors relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-brand-red transition-colors">
                  {member.name}
                </h3>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                  {member.role}
                </span>

                {/* Active Badge */}
                <div className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-green-500 uppercase tracking-wide">
                    Currently Active
                  </span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>

                <div className="flex justify-center gap-4 w-full pt-4 border-t border-white/5">
                  <SocialIconSmall Icon={Twitter} />
                  <SocialIconSmall Icon={Linkedin} />
                  <SocialIconSmall Icon={Mail} />
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
