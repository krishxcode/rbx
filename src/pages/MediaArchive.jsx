import React, { useState } from "react";
import {
  Play,
  Eye,
  Search,
  Filter,
  ArrowLeft,
  Calendar,
  Clock,
  ChevronDown,
} from "lucide-react";

const categories = [
  "ALL",
  "VALORANT",
  "BGMI",
  "FREE FIRE",
  "HIGHLIGHTS",
  "INTERVIEWS",
];

const mediaData = [
  {
    id: 1,
    title: "GRAND FINALS: RBX vs SENTINELS - Map 3 Decider",
    game: "VALORANT",
    type: "FULL MATCH",
    views: "1.2M",
    date: "2 days ago",
    duration: "45:20",
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "VIPER: The Art of the Clutch",
    game: "VALORANT",
    type: "HIGHLIGHTS",
    views: "850K",
    date: "5 days ago",
    duration: "08:15",
    thumbnail:
      "https://images.unsplash.com/photo-1624138784181-2999e96fb423?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "BGMI PRO LEAGUE: Day 4 Highlights",
    game: "BGMI",
    type: "HIGHLIGHTS",
    views: "2.1M",
    date: "1 week ago",
    duration: "12:30",
    thumbnail:
      "https://images.unsplash.com/photo-1593305841991-05c29736f87e?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Voice Comms: The Winning Moment",
    game: "FREE FIRE",
    type: "INSIDE",
    views: "500K",
    date: "2 weeks ago",
    duration: "03:45",
    thumbnail:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Interview with Coach: Season Strategy",
    game: "ALL",
    type: "INTERVIEWS",
    views: "120K",
    date: "3 weeks ago",
    duration: "25:00",
    thumbnail:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Top 10 Snipes of the Month",
    game: "VALORANT",
    type: "HIGHLIGHTS",
    views: "3.5M",
    date: "1 month ago",
    duration: "10:00",
    thumbnail:
      "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "RBX Boot Camp Tour 2024",
    game: "ALL",
    type: "VLOG",
    views: "900K",
    date: "1 month ago",
    duration: "18:20",
    thumbnail:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Scrims Leaked? (Funny Moments)",
    game: "BGMI",
    type: "FUN",
    views: "4.2M",
    date: "2 months ago",
    duration: "15:45",
    thumbnail:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2670&auto=format&fit=crop",
  },
];

export const MediaArchive = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMedia = mediaData.filter((item) => {
    const matchesFilter =
      activeFilter === "ALL" ||
      item.game === activeFilter ||
      item.type === activeFilter;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20 relative">
      {/* Background Grain */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="w-full md:w-auto flex items-center gap-4">
            <button
              onClick={() => onNavigate("home")}
              className="w-12 h-12 flex items-center justify-center border border-white/10 bg-white/5 hover:bg-brand-red hover:text-white transition-colors group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-none">
                MEDIA <span className="text-brand-red">ARCHIVE</span>
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Explore our history of dominance.
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="w-full md:w-auto relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 bg-black border border-white/20 py-3 pl-12 pr-4 text-white focus:border-brand-red focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12 overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 font-display font-bold text-lg uppercase tracking-wider border transition-all duration-300 clip-path-slant ${
                  activeFilter === cat
                    ? "bg-brand-red border-brand-red text-white"
                    : "bg-transparent border-white/20 text-gray-500 hover:text-white hover:border-brand-red/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMedia.length > 0 ? (
            filteredMedia.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-black/50 border border-white/10 mb-4 overflow-hidden clip-path-slant">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs font-bold text-white border border-white/10">
                    {item.duration}
                  </div>

                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform">
                      <Play
                        fill="white"
                        className="text-white ml-1"
                        size={20}
                      />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <div className="flex items-center gap-3 mb-2 text-[10px] font-bold tracking-widest uppercase text-gray-500">
                    <span className="text-brand-red">{item.game}</span>
                    <span>•</span>
                    <span>{item.type}</span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-white leading-tight mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Eye size={12} /> {item.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-white/10 bg-white/[0.02]">
              <p className="text-gray-500 text-lg">
                No media found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setActiveFilter("ALL");
                  setSearchQuery("");
                }}
                className="mt-4 text-brand-red hover:text-white underline underline-offset-4"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Load More */}
        {filteredMedia.length > 0 && (
          <div className="mt-16 text-center">
            <button className="px-8 py-3 border border-white/20 text-white font-display font-bold text-xl uppercase tracking-widest hover:bg-brand-red hover:border-brand-red transition-all duration-300 clip-path-button">
              Load More Content
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
