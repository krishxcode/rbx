import React from 'react';

export const JoinSection = () => {
  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
        {/* Decorative BG */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="bg-brand-gray/80 backdrop-blur-md border border-white/5 p-8 md:p-12">
            <div className="text-center mb-10">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">JOIN THE <span className="text-brand-red">LEGION</span></h2>
                <p className="text-gray-400">Do you have what it takes to compete at the highest level?</p>
            </div>

            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">IGN (In-Game Name)</label>
                        <input type="text" className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-brand-red focus:outline-none transition-colors" placeholder="e.g. ShadowSlayer" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Discord ID</label>
                        <input type="text" className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-brand-red focus:outline-none transition-colors" placeholder="username#0000" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Primary Game</label>
                    <div className="grid grid-cols-3 gap-4">
                        {['VALORANT', 'BGMI', 'FREE FIRE'].map(game => (
                            <label key={game} className="cursor-pointer">
                                <input type="radio" name="game" className="peer sr-only" />
                                <div className="text-center py-3 border border-white/10 bg-black/30 peer-checked:bg-brand-red peer-checked:text-white peer-checked:border-brand-red transition-all hover:border-brand-red/50">
                                    <span className="font-bold text-sm">{game}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Experience / Achievements</label>
                    <textarea className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-brand-red focus:outline-none transition-colors h-32" placeholder="Tell us about your rank, past tournaments, and competitive experience..."></textarea>
                </div>

                <button type="button" className="w-full bg-white text-black font-display font-bold text-xl py-4 hover:bg-brand-red hover:text-white transition-colors clip-path-button uppercase tracking-wider">
                    Submit Application
                </button>
            </form>
        </div>
      </div>
    </section>
  );
};