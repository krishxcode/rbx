import React, { useState } from "react";
import { Plus, Video, Trash2, Edit2, ExternalLink, Play } from "lucide-react";

const initialStreams = [
  {
    id: 1,
    title: "Grand Finals Highlights",
    url: "https://youtube.com/...",
    category: "Highlights",
    views: "125K",
  },
  {
    id: 2,
    title: "Rank Push Live",
    url: "https://twitch.tv/...",
    category: "Live Stream",
    views: "Live",
  },
];

export const StreamsManager = () => {
  const [streams, setStreams] = useState(initialStreams);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Video className="text-brand-red" size={20} /> Streams & Highlights
        </h3>
        <button className="flex items-center gap-2 text-sm font-bold bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors border border-white/10">
          <Plus size={16} /> Add New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {streams.map((stream) => (
          <div
            key={stream.id}
            className="group relative bg-black/50 border border-white/10 rounded-lg overflow-hidden hover:border-brand-red/30 transition-all"
          >
            {/* Mock Thumbnail */}
            <div className="h-40 bg-gray-800 relative flex items-center justify-center">
              <Play
                size={32}
                className="text-white/20 group-hover:text-brand-red transition-colors"
              />
              <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-[10px] font-bold uppercase text-white backdrop-blur-sm">
                {stream.category}
              </div>
            </div>

            <div className="p-4">
              <h4 className="font-bold text-white mb-1 truncate">
                {stream.title}
              </h4>
              <p className="text-xs text-gray-500 mb-4">
                {stream.views} • {stream.category}
              </p>

              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-white/5 hover:bg-blue-500/20 hover:text-blue-500 text-gray-400 text-xs font-bold uppercase rounded transition-colors flex items-center justify-center gap-2">
                  <Edit2 size={12} /> Edit
                </button>
                <button className="flex-1 py-2 bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-gray-400 text-xs font-bold uppercase rounded transition-colors flex items-center justify-center gap-2">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Placeholder Card */}
        <button className="h-full min-h-[250px] border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center gap-3 text-gray-600 hover:text-brand-red hover:border-brand-red/30 hover:bg-white/[0.02] transition-all">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
            <Plus size={24} />
          </div>
          <span className="text-sm font-bold uppercase tracking-wider">
            Add Content
          </span>
        </button>
      </div>
    </div>
  );
};
