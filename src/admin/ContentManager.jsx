import React from "react";
import { StreamsManager } from "./StreamsManager";

export const ContentManager = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-display font-bold text-white mb-1">
          CONTENT MANAGEMENT
        </h2>
        <p className="text-gray-400 text-sm">
          Manage streams, highlights, and media assets.
        </p>
      </div>

      {/* In the future, this can have tabs for Blog, News, Gallery etc. */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6">
        <StreamsManager />
      </div>
    </div>
  );
};
