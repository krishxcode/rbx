import React from 'react';
import { Zap, Cpu, Wifi, Headphones, Monitor, MousePointer2 } from 'lucide-react';

const partners = [
    { name: "NEXUS GEAR", icon: MousePointer2, category: "PERIPHERALS" },
    { name: "TURBO ENERGY", icon: Zap, category: "OFFICIAL DRINK" },
    { name: "QUANTUM CHIPS", icon: Cpu, category: "PROCESSORS" },
    { name: "VELOCITY NET", icon: Wifi, category: "CONNECTIVITY" },
    { name: "SONIC AUDIO", icon: Headphones, category: "AUDIO" },
    { name: "VISUAL PRO", icon: Monitor, category: "DISPLAYS" },
];

export const Sponsors = () => {
  return (
    <section className="py-20 bg-black border-y border-white/5 relative overflow-hidden">
        {/* Scrolling text background */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-[0.03] overflow-hidden whitespace-nowrap pointer-events-none select-none">
            <span className="text-[15vw] leading-none font-display font-bold">ALLIANCES ALLIANCES ALLIANCES</span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <span className="text-brand-red font-bold tracking-[0.3em] uppercase text-sm block mb-2">Powered By</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white">OFFICIAL <span className="text-gray-500">PARTNERS</span></h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
                {partners.map((partner, idx) => (
                    <div key={idx} className="group flex flex-col items-center justify-center gap-6 p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-brand-red/30 transition-all duration-300 clip-path-slant cursor-pointer">
                        <div className="relative">
                            <partner.icon size={48} className="text-gray-600 group-hover:text-brand-red transition-colors duration-300" />
                            <div className="absolute inset-0 bg-brand-red/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="text-center">
                            <span className="block font-display font-bold text-xl text-gray-300 group-hover:text-white transition-colors tracking-wider">{partner.name}</span>
                            <span className="block text-[10px] text-gray-600 group-hover:text-brand-red/80 uppercase tracking-widest mt-1">{partner.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}