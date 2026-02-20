import React from 'react';
import { Target, Users, Zap, Award } from 'lucide-react';

const values = [
    {
        title: "DOMINANCE",
        desc: "We don't just participate; we conquer. Every match is a statement of our relentless pursuit of victory.",
        icon: Target
    },
    {
        title: "COMMUNITY",
        desc: "Our strength comes from the legion of fans who stand with us. We fight for the badge and the people behind it.",
        icon: Users
    },
    {
        title: "INNOVATION",
        desc: "Pioneering new strategies and pushing the meta forward. We set the trends that others follow.",
        icon: Zap
    },
     {
        title: "EXCELLENCE",
        desc: "Setting the highest standards in performance, professionalism, and integrity on and off the server.",
        icon: Award
    }
];

export const AboutUs = () => {
  return (
    <section className="py-24 bg-brand-dark relative border-t border-white/5 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-red/5 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-red/10 blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 mb-20">
                {/* Left: Text Content */}
                <div className="lg:w-1/2">
                    <span className="text-brand-red font-bold tracking-[0.3em] uppercase mb-4 block">Who We Are</span>
                    <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-none">
                        FORGED IN <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-white">THE FIRE</span>
                    </h2>
                    
                    <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
                        <p>
                            <strong className="text-white">RBX ESPORTS</strong> was founded in 2020 with a singular vision: to dismantle the status quo of competitive gaming. What started as a collective of high-elo outcasts has evolved into a global powerhouse, challenging titans and claiming trophies across multiple titles.
                        </p>
                        <p>
                            We are not just a team; we are a movement. From the streets of the underground circuit to the main stages of world championships, our journey is fueled by an unyielding hunger for victory. Our mission is to redefine professional esports through aggressive gameplay and unwavering dedication.
                        </p>
                    </div>

                    <div className="mt-10 p-6 border-l-4 border-brand-red bg-white/5">
                        <p className="text-xl italic text-white font-medium">"We don't play the game. We change it."</p>
                        <span className="block mt-4 text-sm font-bold text-brand-red tracking-widest uppercase">- CEO & Founder</span>
                    </div>
                </div>

                {/* Right: Visual Stats/Image */}
                <div className="lg:w-1/2 relative">
                    <div className="grid grid-cols-2 gap-4 h-full">
                         <div className="bg-brand-gray/50 p-8 flex flex-col justify-center items-center border border-white/5 hover:border-brand-red/30 transition-colors">
                            <span className="text-5xl font-display font-bold text-white mb-2">30+</span>
                            <span className="text-xs uppercase tracking-widest text-gray-500">Championships</span>
                         </div>
                         <div className="bg-brand-gray/50 p-8 flex flex-col justify-center items-center border border-white/5 hover:border-brand-red/30 transition-colors mt-8">
                            <span className="text-5xl font-display font-bold text-white mb-2">1K+</span>
                            <span className="text-xs uppercase tracking-widest text-gray-500">Community Members</span>
                         </div>
                         <div className="bg-brand-gray/50 p-8 flex flex-col justify-center items-center border border-white/5 hover:border-brand-red/30 transition-colors -mt-8">
                            <span className="text-5xl font-display font-bold text-white mb-2">4</span>
                            <span className="text-xs uppercase tracking-widest text-gray-500">Game Titles</span>
                         </div>
                         <div className="bg-brand-gray/50 p-8 flex flex-col justify-center items-center border border-white/5 hover:border-brand-red/30 transition-colors">
                            <span className="text-5xl font-display font-bold text-white mb-2">2025</span>
                            <span className="text-xs uppercase tracking-widest text-gray-500">Founded</span>
                         </div>
                    </div>
                </div>
            </div>

            {/* Core Values */}
            <div>
                <h3 className="text-3xl font-display font-bold text-white mb-10 text-center">CORE <span className="text-brand-red">VALUES</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((item, idx) => (
                        <div key={idx} className="group p-8 border border-white/10 bg-black/40 hover:bg-brand-red/10 transition-colors duration-300 relative overflow-hidden clip-path-slant">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <item.icon size={64} />
                            </div>
                            <item.icon className="text-brand-red mb-4 group-hover:scale-110 transition-transform duration-300" size={32} />
                            <h4 className="text-2xl font-display font-bold text-white mb-2">{item.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}