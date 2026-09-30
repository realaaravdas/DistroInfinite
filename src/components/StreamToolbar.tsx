import { useState } from 'react';
import { Shuffle, Search, Terminal, ArrowUp, Activity } from 'lucide-react';

interface StreamToolbarProps {
  distroCount: number;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onRandomize: () => void;
  scrollVelocity: number;
}

const CATEGORIES = [
  'All',
  'Debian',
  'Arch',
  'Fedora/RHEL',
  'openSUSE',
  'Independent'
];

export default function StreamToolbar({
  distroCount,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onRandomize,
  scrollVelocity
}: StreamToolbarProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const absVelocity = Math.round(Math.abs(scrollVelocity));

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080B12]/80 backdrop-blur-xl border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 space-y-3">
        {/* Top Row: Title, Stats & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Terminal size={19} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  DistroInfinite
                </h1>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Infinite Stream
                </span>
              </div>
              <p className="text-xs text-slate-400">
                The infinite visual encyclopedia of Linux distributions
              </p>
            </div>
          </div>

          {/* Action cluster: Randomize, Velocity meter, Counter */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Scroll velocity indicator */}
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/5">
              <Activity size={13} className={absVelocity > 30 ? "text-amber-400 animate-pulse" : "text-slate-500"} />
              <span>Velocity: {absVelocity} px/s</span>
            </div>

            {/* Distros Loaded Counter */}
            <div className="text-xs text-slate-300 font-mono bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/5">
              <span className="font-semibold text-white">{distroCount}</span> Loaded
            </div>

            {/* Randomize / Reshuffle Button */}
            <button
              onClick={onRandomize}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Reshuffle with new random seed"
            >
              <Shuffle size={13} />
              <span>Randomize</span>
            </button>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Back to Top"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Row: Category Filter Tabs & Live Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search distros, DE, or pkg..."
              className="w-full pl-9 pr-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
