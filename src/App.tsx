/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
import { INITIAL_BATCH_TICKETS } from './data/dialectData';
import { BatchTicket, DialectAnalysisResult, UserProfile } from './types';
import { getStoredUser, setStoredUser, DEFAULT_DEMO_USERS } from './data/mockUsers';
import { Compass, Shield, CheckCircle, ExternalLink, Mail } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'segregation' | 'batch' | 'matrix' | 'lexicon' | 'prompt' | 'contact' | 'login' | 'signup' | 'profile'>('analyzer');
  const [tickets, setTickets] = useState<BatchTicket[]>(INITIAL_BATCH_TICKETS);
  const [analyzerPresetText, setAnalyzerPresetText] = useState<string | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(getStoredUser());

  const handleSelectSampleFromAnywhere = (text: string) => {
    setAnalyzerPresetText(text);
    setActiveTab('analyzer');
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setStoredUser(user);
    setActiveTab('profile');
  };

  const handleSignUpSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setStoredUser(user);
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
    <div className="min-h-screen bg-stone-100/70 text-stone-900 font-sans flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        batchCount={tickets.filter((t) => t.status === 'Pending').length}
        currentUser={currentUser}
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
      <footer className="border-t border-stone-200 bg-white mt-12 py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
              J
            </div>
            <span className="font-semibold text-stone-800">
              JanSetu (जनसेतु)
            </span>
            <span>•</span>
            <span>Citizen Grassroots Language Analyser & Problem Queue</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-stone-600">
            <button
              onClick={() => setActiveTab('contact')}
              className="flex items-center gap-1 text-orange-700 hover:text-orange-900 font-medium"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>jansetu@gmail.com</span>
            </button>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-emerald-600" />
              CPGRAMS & State Portals Interoperable
            </span>
            <span>•</span>
            <span>16 Dialect Zones</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
