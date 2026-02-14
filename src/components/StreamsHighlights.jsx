import React from "react";
import { Play, Eye, ArrowRight } from "lucide-react";

const streams = [
  {
    id: 1,
    title: " FROZEN CUP – SEASON 141 | LIVE ON RBX ESPORTS",
    category: "FREE FIRE",
    viewers: "136",
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop",
    isLive: false,
    url: "https://www.youtube.com/live/BCKY5zuPoUI?si=UP4mdXySIWyc8Rql",
  },
  {
    id: 2,
    title: "CHAMPIONS ARENA-GRAND FINALS || RBX ESPORTS",
    category: "FREE FIRE",
    viewers: "140",
    thumbnail:
      "https://images.unsplash.com/photo-1593305841991-05c29736f87e?q=80&w=2670&auto=format&fit=crop",
    isLive: false,
    url: "https://www.youtube.com/live/42jfD5rEEiA?si=GiN4HCNwpatESAYi",
  },
  {
    id: 3,
    title: "EPIC SHOWDOWN || LIVE ON RBX ESPORTS",
    category: "FREE FIRE",
    viewers: "138 Views",
    thumbnail:
      "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=2670&auto=format&fit=crop",
    isLive: false,
    url: "https://www.youtube.com/live/OOXBCEWVoqk?si=Hb8Tq_MDPoZreGOZ",
  },
];

const StreamsHighlights = ({ onNavigate = () => {} }) => {
  return (
    <section
      id="media"
      className="py-20 bg-brand-dark relative border-t border-white/5"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-red/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12">
          <div>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-2">
              STREAMS & <span className="text-brand-red">HIGHLIGHTS</span>
            </h2>
            <p className="text-gray-400">
              Watch our champions dominate in real-time.
            </p>
          </div>

          <button
            onClick={() => onNavigate("archive")}
            className="hidden md:flex items-center gap-2 font-bold tracking-widest uppercase text-sm hover:text-brand-red transition-colors mt-4 md:mt-0"
          >
            View Archive <ArrowRight size={16} />
          </button>
        </div>

        {/* Streams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {streams.map((stream) => (
            <a
              key={stream.id}
              href={stream.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative overflow-hidden aspect-video border border-white/10 bg-black/50 mb-4 clip-path-slant">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300"></div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-brand-red flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {stream.isLive && (
                    <span className="bg-brand-red text-white text-xs font-bold px-2 py-1 flex items-center gap-1 animate-pulse">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      LIVE
                    </span>
                  )}

                  <span className="bg-black/80 text-white text-xs font-bold px-2 py-1 border border-white/10">
                    {stream.category}
                  </span>
                </div>

                {/* Viewers */}
                <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 flex items-center gap-2 border border-white/10">
                  <Eye size={14} className="text-brand-red" />
                  <span className="text-xs font-bold text-white">
                    {stream.viewers}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-xl font-display font-bold mb-2 text-white group-hover:text-brand-red transition-colors">
                  {stream.title}
                </h3>
                <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">
                  RBX OFFICIAL CHANNEL
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-8 md:hidden text-center">
          <button
            onClick={() => onNavigate("archive")}
            className="inline-flex items-center gap-2 font-bold tracking-widest uppercase text-sm hover:text-brand-red transition-colors border border-white/20 px-6 py-3"
          >
            View Archive <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StreamsHighlights;
