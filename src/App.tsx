/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LiveAnalyzer } from './components/LiveAnalyzer';
import { ProblemSegregation } from './components/ProblemSegregation';
import { BatchTriage } from './components/BatchTriage';
import { DialectMatrix } from './components/DialectMatrix';
import { LinguisticLexicon } from './components/LinguisticLexicon';
import { PromptViewer } from './components/PromptViewer';
import { ContactFaq } from './components/ContactFaq';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { UserProfileSection } from './components/UserProfileSection';
import { StartupAnimation } from './components/StartupAnimation';
import { INITIAL_BATCH_TICKETS } from './data/dialectData';
import { BatchTicket, DialectAnalysisResult, UserProfile } from './types';
import {
  getStoredUser,
  setStoredUser,
  DEFAULT_DEMO_USERS,
  getStoredTheme,
  setStoredTheme
} from './data/mockUsers';
import { Compass, Shield, CheckCircle, ExternalLink, Mail, PlayCircle } from 'lucide-react';
import jansetuBg from './assets/images/jansetu_background_1791711709017.jpg';

export default function App() {
  const [showStartupAnimation, setShowStartupAnimation] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'analyzer' | 'segregation' | 'batch' | 'matrix' | 'lexicon' | 'prompt' | 'contact' | 'login' | 'signup' | 'profile'>('analyzer');
  const [tickets, setTickets] = useState<BatchTicket[]>(INITIAL_BATCH_TICKETS);
  const [analyzerPresetText, setAnalyzerPresetText] = useState<string | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(getStoredUser());
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = getStoredTheme();
      const userTheme = getStoredUser()?.darkMode;
      return userTheme !== undefined ? userTheme : storedTheme;
    }
    return false;
  });

  // Sync dark class on documentElement for Tailwind dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setStoredTheme(isDarkMode);
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      setStoredTheme(next);
      if (currentUser) {
        const updated = { ...currentUser, darkMode: next };
        setCurrentUser(updated);
        setStoredUser(updated);
      }
      return next;
    });
  };

  const handleSelectSampleFromAnywhere = (text: string) => {
    setAnalyzerPresetText(text);
    setActiveTab('analyzer');
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setStoredUser(user);
    if (user.darkMode !== undefined) {
      setIsDarkMode(user.darkMode);
    }
    setActiveTab('profile');
  };

  const handleSignUpSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setStoredUser(user);
    if (user.darkMode !== undefined) {
      setIsDarkMode(user.darkMode);
    }
    setActiveTab('profile');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setStoredUser(null);
    setActiveTab('login');
  };

  const handleUpdateUser = (updated: UserProfile) => {
    setCurrentUser(updated);
    setStoredUser(updated);
    if (updated.darkMode !== undefined && updated.darkMode !== isDarkMode) {
      setIsDarkMode(updated.darkMode);
    }
  };

  const handleLiveAnalysisCompleted = (text: string, result: DialectAnalysisResult) => {
    // If this matches an existing ticket in the batch queue, mark it as triaged
    setTickets((prev) =>
      prev.map((t) => {
        if (t.rawText.trim() === text.trim()) {
          return {
            ...t,
            status: 'Triaged',
            result: result,
          };
        }
        return t;
      })
    );
  };

  return (
    <div
      className={`min-h-screen font-sans flex flex-col selection:bg-orange-500 selection:text-white transition-colors duration-300 ${
        isDarkMode ? 'dark text-stone-100' : 'text-stone-900'
      }`}
      style={{
        backgroundImage: `url(${jansetuBg})`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Startup Intro Animation Overlay */}
      {showStartupAnimation && (
        <StartupAnimation onComplete={() => setShowStartupAnimation(false)} />
      )}

      {/* Semi-transparent tint overlay allowing background to show elegantly in both light & dark modes */}
      <div
        className={`min-h-screen flex flex-col transition-colors duration-300 ${
          isDarkMode
            ? 'bg-stone-950/85 backdrop-blur-[1px]'
            : 'bg-stone-100/75 backdrop-blur-[0.5px]'
        }`}
      >
        {/* Top Navigation */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          batchCount={tickets.filter((t) => t.status === 'Pending').length}
          currentUser={currentUser}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onReplayStartupAnimation={() => setShowStartupAnimation(true)}
        />

        {/* Main Content Body */}
        <main className="grow">
          {activeTab === 'analyzer' && (
            <LiveAnalyzer
              presetText={analyzerPresetText}
              onAnalyzeComplete={handleLiveAnalysisCompleted}
              onNavigateToSegregation={() => setActiveTab('segregation')}
            />
          )}

          {activeTab === 'segregation' && (
            <ProblemSegregation
              tickets={tickets}
              setTickets={setTickets}
              onInspectComplaint={handleSelectSampleFromAnywhere}
            />
          )}

          {activeTab === 'batch' && (
            <BatchTriage
              tickets={tickets}
              setTickets={setTickets}
              onInspectTicket={handleSelectSampleFromAnywhere}
              onNavigateToSegregation={() => setActiveTab('segregation')}
            />
          )}

          {activeTab === 'contact' && <ContactFaq />}

          {activeTab === 'profile' && (
            <UserProfileSection
              user={currentUser || DEFAULT_DEMO_USERS[0]}
              onUpdateUser={handleUpdateUser}
              onLogout={handleLogout}
              onLodgeNewComplaint={() => setActiveTab('analyzer')}
              onInspectComplaint={handleSelectSampleFromAnywhere}
              tickets={tickets}
              isDarkMode={isDarkMode}
              onToggleDarkMode={handleToggleDarkMode}
            />
          )}

          {activeTab === 'login' && (
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onGoToSignUp={() => setActiveTab('signup')}
              onContinueAsGuest={() => setActiveTab('analyzer')}
            />
          )}

          {activeTab === 'signup' && (
            <SignUpPage
              onSignUpSuccess={handleSignUpSuccess}
              onGoToLogin={() => setActiveTab('login')}
            />
          )}

          {activeTab === 'matrix' && (
            <DialectMatrix onSelectSample={handleSelectSampleFromAnywhere} />
          )}

          {activeTab === 'lexicon' && (
            <LinguisticLexicon onTestWord={handleSelectSampleFromAnywhere} />
          )}

          {activeTab === 'prompt' && <PromptViewer />}
        </main>

        {/* Footer */}
        <footer className="border-t border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md mt-12 py-8 text-xs text-stone-500 dark:text-stone-400 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-orange-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                J
              </div>
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                JanSetu (जनसेतु)
              </span>
              <span>•</span>
              <span>Citizen Grassroots Language Analyser & Problem Queue</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-stone-600 dark:text-stone-300">
              <button
                onClick={() => setShowStartupAnimation(true)}
                className="flex items-center gap-1 text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-amber-400 font-medium cursor-pointer transition-colors"
                title="Replay app startup animation"
              >
                <PlayCircle className="h-3.5 w-3.5 text-orange-600 dark:text-amber-400" />
                <span>Replay Animation</span>
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveTab('contact')}
                className="flex items-center gap-1 text-orange-700 dark:text-orange-400 hover:text-orange-900 dark:hover:text-orange-300 font-medium cursor-pointer transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>jansetu@gmail.com</span>
              </button>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                CPGRAMS & State Portals Interoperable
              </span>
              <span>•</span>
              <span>16 Dialect Zones</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
