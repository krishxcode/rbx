import React from 'react';

export const PlayerSpotlight = () => {
  return (
    <section className="py-24 bg-black relative border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Text Side */}
            <div className="lg:w-1/2 z-10">
                <span className="text-brand-red font-bold tracking-[0.3em] uppercase mb-4 block">Player Spotlight</span>
                <h2 className="text-6xl md:text-8xl font-display font-bold text-white leading-none mb-6">
                    RBX GARRY
                </h2>
                <div className="text-2xl text-gray-400 font-light mb-8">
                    "Precision is not an act, it is a habit."
                </div>
                
                <div className="grid grid-cols-3 gap-8 mb-10">
                    <div>
                        <span className="block text-4xl font-display font-bold text-white">24K</span>
                        <span className="text-xs text-gray-500 uppercase tracking-widest">Kills</span>
                    </div>
                    <div>
                        <span className="block text-4xl font-display font-bold text-white">45</span>
                        <span className="text-xs text-gray-500 uppercase tracking-widest">MVPs</span>
                    </div>
                    <div>
                        <span className="block text-4xl font-display font-bold text-white">12</span>
                        <span className="text-xs text-gray-500 uppercase tracking-widest">Tourneys</span>
                    </div>
                </div>

                <button className="px-8 py-3 bg-white text-black font-display font-bold text-lg hover:bg-brand-red hover:text-white transition-colors uppercase tracking-wider clip-path-button">
                    View Full Profile
                </button>
            </div>

            {/* Image Side - Styled somewhat like a card but huge */}
            <div className="lg:w-1/2 relative">
                <div className="relative z-10">
                    <img 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" 
                        alt="Featured Player"
                        className="w-full h-[600px] object-cover object-top filter contrast-125 grayscale hover:grayscale-0 transition-all duration-700 clip-path-slant"
                    />
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-10 -right-10 w-full h-full border-2 border-brand-red/30 z-0 hidden md:block"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-red/10 z-0"></div>
            </div>

        </div>
      </div>
    </section>
  );
};