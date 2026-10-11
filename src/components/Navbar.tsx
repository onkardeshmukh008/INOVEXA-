import React from 'react';
import {
  Compass,
  Sparkles,
  Layers,
  BookOpen,
  Terminal,
  FolderTree,
  PhoneCall,
  User,
  LogIn,
  UserPlus,
  Moon,
  Sun,
  PlayCircle
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: 'analyzer' | 'segregation' | 'batch' | 'matrix' | 'lexicon' | 'prompt' | 'contact' | 'login' | 'signup' | 'profile';
  setActiveTab: (tab: 'analyzer' | 'segregation' | 'batch' | 'matrix' | 'lexicon' | 'prompt' | 'contact' | 'login' | 'signup' | 'profile') => void;
  batchCount: number;
  currentUser: UserProfile | null;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  onReplayStartupAnimation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  batchCount,
  currentUser,
  isDarkMode = false,
  onToggleDarkMode,
  onReplayStartupAnimation
}) => {
  return (
    <header className="border-b border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md sticky top-0 z-30 shadow-xs transition-colors">
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
                <span className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 font-serif">
                  JanSetu
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  जनसेतु
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hidden sm:inline-block">
                  Citizen AI Bridge
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 hidden md:block">
                Grassroots Language Analyser & Citizen Problem Triage System
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => setActiveTab('analyzer')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'analyzer'
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30 font-semibold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>Language Analyser</span>
            </button>

            <button
              onClick={() => setActiveTab('segregation')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'segregation'
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30 font-semibold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <FolderTree className="h-4 w-4" />
              <span>Problem Segregation</span>
            </button>

            <button
              onClick={() => setActiveTab('batch')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'batch'
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30 font-semibold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>Complain/Problem Queue</span>
              {batchCount > 0 && (
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'batch' ? 'bg-white/20 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200'
                }`}>
                  {batchCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'contact'
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30 font-semibold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <PhoneCall className="h-4 w-4" />
              <span>Contact Us & FAQs</span>
            </button>

            {/* Replay App Startup Animation Button */}
            {onReplayStartupAnimation && (
              <button
                onClick={onReplayStartupAnimation}
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-orange-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer border border-transparent hover:border-orange-200 dark:hover:border-stone-700"
                title="Play App Intro Animation"
              >
                <PlayCircle className="h-4 w-4 text-orange-600 dark:text-amber-400" />
                <span>Intro</span>
              </button>
            )}

            {/* Dark Mode Quick Switch Icon in Navbar */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:text-orange-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-stone-700" />
                )}
              </button>
            )}

            {/* User Profile or Login/Signup */}
            {currentUser ? (
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-stone-900 dark:bg-orange-600 text-white border-stone-900 dark:border-orange-600 shadow-sm ring-2 ring-stone-900/20'
                    : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-orange-300 hover:bg-orange-50/50 dark:hover:bg-stone-750'
                }`}
                title="View Citizen Profile, Dark Mode & Filed Complaints"
              >
                <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
                  {currentUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-semibold leading-tight truncate max-w-[100px]">
                    {currentUser.name.split(' ')[0]}
                  </div>
                  <div className={`text-[9px] font-bold uppercase ${
                    activeTab === 'profile' ? 'text-amber-300' : 'text-stone-400 dark:text-stone-400'
                  }`}>
                    {currentUser.role === 'officer' ? 'Officer' : 'Profile'}
                  </div>
                </div>
              </button>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-orange-600 text-white font-bold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => setActiveTab('signup')}
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'signup'
                      ? 'bg-stone-900 text-white'
                      : 'bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300 hover:bg-orange-200'
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
