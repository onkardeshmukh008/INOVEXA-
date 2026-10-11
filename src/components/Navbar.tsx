import React from 'react';
import { Compass, Sparkles, Layers, BookOpen, Terminal, FolderTree, PhoneCall, User, LogIn, UserPlus } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: 'analyzer' | 'segregation' | 'batch' | 'matrix' | 'lexicon' | 'prompt' | 'contact' | 'login' | 'signup' | 'profile';
  setActiveTab: (tab: 'analyzer' | 'segregation' | 'batch' | 'matrix' | 'lexicon' | 'prompt' | 'contact' | 'login' | 'signup' | 'profile') => void;
  batchCount: number;
  currentUser: UserProfile | null;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, batchCount, currentUser }) => {
  return (
    <header className="border-b border-stone-200 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab('analyzer')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-600 via-orange-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-stone-900 font-serif">
                  JanSetu
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  जनसेतु
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 hidden sm:inline-block">
                  Citizen AI Bridge
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden md:block">
                Grassroots Language Analyser & Citizen Problem Triage System
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => setActiveTab('analyzer')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'analyzer'
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>Language Analyser</span>
            </button>

            <button
              onClick={() => setActiveTab('segregation')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
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
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'batch'
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>Complain/Problem Queue</span>
              {batchCount > 0 && (
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'batch' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
                }`}>
                  {batchCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'contact'
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <PhoneCall className="h-4 w-4" />
              <span>Contact Us & FAQs</span>
            </button>

            {/* User Profile or Login/Signup */}
            {currentUser ? (
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border transition-all ${
                  activeTab === 'profile'
                    ? 'bg-stone-900 text-white border-stone-900 shadow-sm ring-2 ring-stone-900/20'
                    : 'bg-stone-50 border-stone-200 text-stone-800 hover:border-orange-300 hover:bg-orange-50/50'
                }`}
                title="View Citizen Profile & Filed Complaints"
              >
                <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
                  {currentUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-semibold leading-tight truncate max-w-[100px]">
                    {currentUser.name.split(' ')[0]}
                  </div>
                  <div className={`text-[9px] font-bold uppercase ${
                    activeTab === 'profile' ? 'text-amber-300' : 'text-stone-400'
                  }`}>
                    {currentUser.role === 'officer' ? 'Officer' : 'Profile'}
                  </div>
                </div>
              </button>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'login'
                      ? 'bg-orange-600 text-white font-bold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => setActiveTab('signup')}
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'signup'
                      ? 'bg-stone-900 text-white'
                      : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                  }`}
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Sign Up</span>
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
