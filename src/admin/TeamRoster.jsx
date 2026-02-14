import React, { useState } from 'react';
import { TeamManager } from './TeamManager';
import { Gamepad2 } from 'lucide-react';

const games = ['FREE FIRE', 'VALORANT', 'BGMI'];

export const TeamRoster = () => {
    const [selectedGame, setSelectedGame] = useState(games[0]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-display font-bold text-white mb-1">ROSTER MANAGEMENT</h2>
                    <p className="text-gray-400 text-sm">Manage games, teams, and player profiles.</p>
                </div>
            </div>

            {/* Game Selector Tabs */}
            <div className="border-b border-white/10">
                <div className="flex gap-1 overflow-x-auto">
                    {games.map((game) => (
                        <button
                            key={game}
                            onClick={() => setSelectedGame(game)}
                            className={`px-6 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
                                selectedGame === game 
                                ? 'border-brand-red text-white bg-white/5' 
                                : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <Gamepad2 size={16} className={selectedGame === game ? 'text-brand-red' : ''} />
                            {game}
                        </button>
                    ))}
                </div>
            </div>

            {/* Team Manager Content */}
            <div className="bg-[#111] border border-white/10 rounded-xl p-6 min-h-[500px]">
                <TeamManager game={selectedGame} />
            </div>
        </div>
    );
};