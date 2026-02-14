import React from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, ArrowUpRight } from 'lucide-react';

const jobs = [
    {
        id: 1,
        title: "Senior Video Editor",
        department: "Content Production",
        location: "Remote",
        type: "Full-Time",
        salary: "$65k - $85k",
        description: "Craft high-energy fragmovies and documentary-style content. Must be proficient in Premiere Pro & After Effects."
    },
    {
        id: 2,
        title: "Social Media Manager",
        department: "Marketing",
        location: "Los Angeles, CA",
        type: "Full-Time",
        salary: "$55k - $70k",
        description: "Lead the voice of RBX across Twitter, Instagram, and TikTok. Meme game must be radiant tier."
    },
    {
        id: 3,
        title: "Performance Coach",
        department: "Esports Operations",
        location: "Seoul, KR",
        type: "Contract",
        salary: "Competitive",
        description: "Work directly with our Valorant roster to optimize mental fortitude, strategy, and team synergy."
    },
    {
        id: 4,
        title: "Merchandise Designer",
        department: "Creative",
        location: "Remote",
        type: "Freelance",
        salary: "Project Based",
        description: "Design the next generation of streetwear-inspired esports apparel and digital assets."
    }
];

export const Careers = () => {
  return (
    <section id="careers" className="py-24 bg-black relative border-t border-white/5">
        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16">
                <div className="md:w-2/3">
                    <span className="text-brand-red font-bold tracking-[0.3em] uppercase mb-4 block">Work With Us</span>
                    <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
                        BUILD THE <span className="text-gray-500">LEGACY</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        We are not just looking for employees; we are looking for visionaries. Join the team behind the screen and help shape the future of competitive gaming.
                    </p>
                </div>
                <button className="hidden md:flex items-center gap-2 text-white border border-white/20 px-6 py-3 font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 clip-path-button">
                    View All Positions <ArrowUpRight size={18} />
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {jobs.map((job) => (
                    <div key={job.id} className="group relative bg-white/[0.02] border border-white/10 hover:border-brand-red/50 p-8 transition-all duration-300 hover:bg-white/[0.04]">
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative z-10">
                            
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-brand-red text-xs font-bold tracking-widest uppercase border border-brand-red/30 px-2 py-1 bg-brand-red/10">
                                        {job.department}
                                    </span>
                                    {job.type === 'Full-Time' && (
                                        <span className="text-gray-400 text-xs font-bold tracking-widest uppercase border border-white/10 px-2 py-1">
                                            {job.type}
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
                                <button className="flex items-center gap-2 text-white font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300">
                                    Apply Now <ArrowRight size={18} className="text-brand-red" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
                    </div>
                ))}
            </div>

            <div className="mt-8 md:hidden text-center">
                 <button className="flex items-center justify-center w-full gap-2 text-white border border-white/20 px-6 py-4 font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300">
                    View All Positions <ArrowUpRight size={18} />
                </button>
            </div>
        </div>
    </section>
  );
};