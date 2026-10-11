import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, Shield, Languages, CheckCircle2 } from 'lucide-react';

interface StartupAnimationProps {
  onComplete: () => void;
  appName?: string;
  tagline?: string;
}

export const StartupAnimation: React.FC<StartupAnimationProps> = ({
  onComplete,
  appName = 'JanSetu • जनसेतु',
  tagline = 'Indian Grassroots Language Analyser & Citizen Grievance Triage',
}) => {
  const [stage, setStage] = useState<'enter' | 'pulse' | 'glow' | 'exit'>('enter');
  const [dialectsCount, setDialectsCount] = useState(0);
  const [currentScript, setCurrentScript] = useState('जनसेतु');

  const scripts = [
    { text: 'जनसेतु', lang: 'Hindi / Bhojpuri / Maithili' },
    { text: 'જનસેતુ', lang: 'Gujarati' },
    { text: 'জনসেতু', lang: 'Bengali' },
    { text: 'ജനസേതു', lang: 'Malayalam' },
    { text: 'జనసేతు', lang: 'Telugu' },
    { text: 'ਜਨਸੇਤੂ', lang: 'Punjabi' },
    { text: 'ಜನಸೇತು', lang: 'Kannada' },
    { text: 'जनसेतू', lang: 'Marathi' },
  ];

  useEffect(() => {
    // Script rotation
    const scriptInterval = setInterval(() => {
      setCurrentScript((prev) => {
        const nextIdx = (scripts.findIndex((s) => s.text === prev) + 1) % scripts.length;
        return scripts[nextIdx].text;
      });
    }, 450);

    // Number ticker
    const counterInterval = setInterval(() => {
      setDialectsCount((prev) => {
        if (prev < 16) return prev + 1;
        return 16;
      });
    }, 70);

    // Stage progression
    const t1 = setTimeout(() => setStage('pulse'), 500);
    const t2 = setTimeout(() => setStage('glow'), 1400);
    const t3 = setTimeout(() => setStage('exit'), 2400);
    const t4 = setTimeout(() => {
      onComplete();
    }, 2850);

    return () => {
      clearInterval(scriptInterval);
      clearInterval(counterInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      role="status"
      aria-label="Starting JanSetu Application"
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-500 ${
        stage === 'exit' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #1c1917 0%, #0c0a09 100%)',
      }}
    >
      {/* Dynamic Animated Background Aura */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/15 rounded-full blur-[90px]" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-600/15 rounded-full blur-[100px]" />

        {/* Ambient Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg mx-auto">
        {/* Emblem Badge with Rings */}
        <div className="relative mb-6">
          {/* Animated concentric pulse rings */}
          <div className="absolute -inset-4 rounded-full border border-orange-500/30 animate-ping opacity-30" />
          <div className="absolute -inset-2 rounded-full border border-amber-400/40 animate-pulse" />

          {/* Main Logo Card */}
          <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-700 p-0.5 shadow-2xl shadow-orange-950/60 flex items-center justify-center transform transition-transform duration-700 hover:scale-105">
            <div className="w-full h-full bg-stone-900/40 backdrop-blur-xs rounded-[22px] flex flex-col items-center justify-center relative overflow-hidden">
              <Compass className="h-10 w-10 text-orange-200 animate-spin" style={{ animationDuration: '10s' }} />
              <div className="absolute bottom-1.5 flex items-center gap-1 text-[9px] font-bold text-amber-200 uppercase tracking-widest">
                <span>AI</span>
                <span>•</span>
                <span>TRIAGE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Multi-lingual Script Display */}
        <div className="h-10 flex items-center justify-center mb-1">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 via-amber-200 to-emerald-400 bg-clip-text text-transparent font-serif transition-all duration-300 transform scale-100">
            {currentScript}
          </span>
        </div>

        {/* App Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide mb-2 flex items-center gap-2">
          <span>JanSetu</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-orange-600/30 border border-orange-500/50 text-orange-300 font-mono">
            v2.4
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-sm text-stone-300/90 font-medium max-w-sm leading-relaxed mb-6">
          {tagline}
        </p>

        {/* Live Loading Metrics Strip */}
        <div className="w-full max-w-xs bg-stone-900/90 border border-stone-800 rounded-xl p-3 shadow-xl backdrop-blur-md mb-6">
          <div className="flex items-center justify-between text-xs text-stone-300 mb-2 font-medium">
            <span className="flex items-center gap-1.5 text-stone-400">
              <Languages className="w-3.5 h-3.5 text-orange-400" />
              Dialect Lexicons
            </span>
            <span className="font-mono text-orange-300 font-semibold">
              {dialectsCount} / 16 Zones Ready
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(dialectsCount / 16) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-800/80 text-[11px] text-stone-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              Linguistic Engine
            </span>
            <span className="text-stone-400 flex items-center gap-1">
              <Shield className="w-3 h-3 text-amber-400" />
              Govt Portals Ready
            </span>
          </div>
        </div>

        {/* Skip Animation Button */}
        <button
          onClick={onComplete}
          className="text-xs text-stone-400 hover:text-white px-3 py-1.5 rounded-full bg-stone-800/50 hover:bg-stone-800 transition-colors cursor-pointer border border-stone-700/60"
        >
          Skip Intro →
        </button>
      </div>
    </div>
  );
};
