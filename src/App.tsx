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
import { INITIAL_BATCH_TICKETS } from './data/dialectData';
import { BatchTicket, DialectAnalysisResult } from './types';
import { Compass, Shield, CheckCircle, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'segregation' | 'batch' | 'matrix' | 'lexicon' | 'prompt'>('analyzer');
  const [tickets, setTickets] = useState<BatchTicket[]>(INITIAL_BATCH_TICKETS);
  const [analyzerPresetText, setAnalyzerPresetText] = useState<string | undefined>(undefined);

  const handleSelectSampleFromAnywhere = (text: string) => {
    setAnalyzerPresetText(text);
    setActiveTab('analyzer');
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
              V
            </div>
            <span className="font-semibold text-stone-800">
              VaaniSetu (वाणीसेतु)
            </span>
            <span>•</span>
            <span>Indian Grassroots Citizen Dialect & Triage Engine</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-stone-600">
            <span className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-emerald-600" />
              CPGRAMS & State Portals Interoperable
            </span>
            <span>•</span>
            <span>16 Dialect Zones</span>
            <span>•</span>
            <span>Phonetic & Code-Mix Robust</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
