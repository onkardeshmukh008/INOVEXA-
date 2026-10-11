import React from 'react';
import { Compass, Sparkles, Layers, BookOpen, Terminal, FolderTree } from 'lucide-react';

interface NavbarProps {
  activeTab: 'analyzer' | 'segregation' | 'batch' | 'matrix' | 'lexicon' | 'prompt';
  setActiveTab: (tab: 'analyzer' | 'segregation' | 'batch' | 'matrix' | 'lexicon' | 'prompt') => void;
  batchCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, batchCount }) => {
  return (
    <header className="border-b border-stone-200 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-600 via-orange-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-stone-900 font-serif">
                  VaaniSetu
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  वाणीसेतु
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 hidden sm:inline-block">
                  Citizen Dialect AI
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden md:block">
                Grassroots Indian Dialect Identifier & Administrative Grievance Router
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('analyzer')}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'analyzer'
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>Dialect Analyzer</span>
            </button>

            <button
              onClick={() => setActiveTab('segregation')}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'segregation'
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <FolderTree className="h-4 w-4" />
              <span>Problem Segregation</span>
            </button>

            <button
              onClick={() => setActiveTab('batch')}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'batch'
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>Grievance Queue</span>
              {batchCount > 0 && (
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'batch' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
                }`}>
                  {batchCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all hidden md:flex ${
                activeTab === 'matrix'
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>16 Dialect Zones</span>
            </button>

            <button
              onClick={() => setActiveTab('lexicon')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all hidden lg:flex ${
                activeTab === 'lexicon'
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Linguistic Lexicon</span>
            </button>

            <button
              onClick={() => setActiveTab('prompt')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'prompt'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
              title="Strict JSON Format & API Specification"
            >
              <Terminal className="h-4 w-4" />
              <span className="hidden sm:inline">JSON Contract</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
