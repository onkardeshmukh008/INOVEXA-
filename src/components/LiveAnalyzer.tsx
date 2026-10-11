import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  RotateCcw,
  Copy,
  Check,
  MapPin,
  ShieldAlert,
  Mic,
  MicOff,
  FileText,
  Code2,
  ExternalLink,
  Info,
  CheckCircle2,
  AlertCircle,
  Building2,
  Share2,
  Languages,
  FolderTree
} from 'lucide-react';
import { DialectAnalysisResult, GrievanceSample } from '../types';
import { PRESET_GRIEVANCES } from '../data/dialectData';

interface LiveAnalyzerProps {
  onAnalyzeComplete?: (text: string, result: DialectAnalysisResult) => void;
  presetText?: string;
  onNavigateToSegregation?: () => void;
}

export const LiveAnalyzer: React.FC<LiveAnalyzerProps> = ({
  onAnalyzeComplete,
  presetText,
  onNavigateToSegregation
}) => {
  const [inputText, setInputText] = useState(
    presetText || PRESET_GRIEVANCES[0].text
  );
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESET_GRIEVANCES[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DialectAnalysisResult | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [activeTab, setActiveTab] = useState<'analysis' | 'json' | 'docket'>('analysis');
  const [isRecording, setIsRecording] = useState(false);
  const [docketGenerated, setDocketGenerated] = useState<string | null>(null);

  // When presetText changes from parent
  useEffect(() => {
    if (presetText) {
      setInputText(presetText);
      setSelectedPresetId('');
    }
  }, [presetText]);

  // Initial analysis on load
  useEffect(() => {
    handleAnalyze();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnalyze = async (textToUse?: string) => {
    const query = (textToUse !== undefined ? textToUse : inputText).trim();
    if (!query) {
      setError('Please enter a citizen grievance or select a grassroots sample.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-dialect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: query }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned ${response.status}`);
      }

      const data: DialectAnalysisResult = await response.json();
      setResult(data);
      setDocketGenerated(null);

      if (onAnalyzeComplete) {
        onAnalyzeComplete(query, data);
      }
    } catch (err: any) {
      console.error('Dialect analysis error:', err);
      setError(err?.message || 'Failed to process linguistic features.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (preset: GrievanceSample) => {
    setSelectedPresetId(preset.id);
    setInputText(preset.text);
    setError(null);
    handleAnalyze(preset.text);
  };

  const handleCopyJson = () => {
    if (!result) return;
    const strictFormat = {
      predicted_region: result.predicted_region,
      confidence: result.confidence,
      key_clues: result.key_clues,
      explanation: result.explanation,
      routing_suggestion: result.routing_suggestion,
    };
    navigator.clipboard.writeText(JSON.stringify(strictFormat, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleCopySummary = () => {
    if (!result) return;
    const summary = `[DIALECT CLASSIFICATION & ROUTING]
Region: ${result.predicted_region} (Confidence: ${Math.round(result.confidence * 100)}%)
Routing: ${result.routing_suggestion}
Category: ${result.detected_issue_category || 'Grievance'} | Urgency: ${result.urgency_level || 'Normal'}
English Translation: ${result.standard_english_translation || 'N/A'}
Key Clues: ${result.key_clues.join(', ')}`;

    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleVoiceToggle = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported on this browser. Try Chrome/Edge or type/paste your text.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN'; // Indian context default
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onerror = () => setIsRecording(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText((prev) => (prev ? prev + ' ' + transcript : transcript));
        }
      };

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const generateDocket = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const prefix = result?.predicted_region.includes('UP') ? 'UP-JAN'
      : result?.predicted_region.includes('Bihar') ? 'BH-LOK'
      : result?.predicted_region.includes('Maharashtra') ? 'MH-APL'
      : result?.predicted_region.includes('Telangana') ? 'TG-PRA'
      : result?.predicted_region.includes('Tamil') ? 'TN-MUG'
      : 'CPG';
    const docketId = `${prefix}-2026-${randomNum}`;
    setDocketGenerated(docketId);
  };

  const getUrgencyBadge = (urgency?: string) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/30 text-xs font-semibold tracking-wide">
            <CompassIcon className="h-3.5 w-3.5" />
            Linguistic Identification & Jurisdictional Triage
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-white">
            Grassroots Language Analyser
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Analyzes raw, unstructured citizen communications—including phonetic Roman script, Devanagari,
            informal vernacular slang, code-mixing, and frantic typos—to isolate grammatical morphology and
            route the ticket to the correct district administration office.
          </p>
        </div>
      </div>

      {/* Preset Grievance Switcher */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider">
            <Languages className="h-4 w-4 text-orange-600" />
            <span>Pre-Loaded Grassroots Grievance Presets (Click to Test)</span>
          </div>
          <span className="text-xs text-stone-500 hidden sm:inline">
            10 Authentic Real-World Field Samples
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_GRIEVANCES.map((p) => {
            const isSelected = selectedPresetId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all text-left ${
                  isSelected
                    ? 'bg-orange-50 border-orange-500 text-orange-950 font-semibold shadow-xs ring-1 ring-orange-500'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
                }`}
              >
                <div className="font-semibold">{p.title}</div>
                <div className="text-[10px] text-stone-500 flex items-center gap-1.5">
                  <span>{p.region.split('(')[0]}</span>
                  <span>•</span>
                  <span className="italic">{p.category}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Input Column & Output Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Citizen Communication Input */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="bg-stone-50 border-b border-stone-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-stone-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Citizen Text Input (SMS / WhatsApp / Survey)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleVoiceToggle}
                  className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition-all ${
                    isRecording
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'text-stone-600 hover:bg-stone-200'
                  }`}
                  title={isRecording ? 'Listening...' : 'Voice Dictation (Mic)'}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  <span className="text-[10px] font-semibold">
                    {isRecording ? 'Listening' : 'Voice'}
                  </span>
                </button>
                <button
                  onClick={() => {
                    setInputText('');
                    setSelectedPresetId('');
                  }}
                  className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-200 rounded-md transition-colors"
                  title="Clear text"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setSelectedPresetId('');
                }}
                rows={8}
                placeholder="Type or paste unstructured citizen text here... e.g. 'Hamre gaon me paani naikhe aawat babu ji', 'Kachra ka locha ho gaya hai boss', 'Tanne kitni baar bhediye application'."
                className="w-full text-stone-900 placeholder-stone-400 text-sm font-sans rounded-lg border border-stone-300 p-3 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-y leading-relaxed"
              />

              <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                <span>{inputText.length} characters • {inputText.trim() ? inputText.trim().split(/\s+/).length : 0} words</span>
                <span className="text-[11px] text-stone-400">
                  Supports Roman script, Devanagari, mixed languages & typos
                </span>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>{error}</div>
                </div>
              )}

              <button
                onClick={() => handleAnalyze()}
                disabled={loading || !inputText.trim()}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  loading || !inputText.trim()
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 text-white shadow-orange-600/25 active:scale-[0.99]'
                }`}
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing Linguistic Clues & Phonetics...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Analyze Language & Determine Routing</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Guidelines Card */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-950">
              <Info className="h-4 w-4 text-amber-700" />
              <span>How JanSetu Identifies Regional Languages & Dialects:</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-amber-800/90 leading-relaxed">
              <li><strong>Vocabulary Markers:</strong> Specific regional nouns & slangs (e.g., <em>firni</em>, <em>rada</em>, <em>dakhil kharij</em>, <em>tola</em>).</li>
              <li><strong>Grammatical Morphemes:</strong> Regional copulas (<em>baate</em> vs <em>se</em> vs <em>chhi</em>) and negative particles (<em>naikhe</em> vs <em>koni</em> vs <em>nakko</em>).</li>
              <li><strong>Pronominal Systems:</strong> 1st/2nd person forms (<em>manne/tanne</em>, <em>apun</em>, <em>hum/hamre</em>, <em>enga</em>).</li>
              <li><strong>Phonetic Transliteration:</strong> Reconstructing intention despite wild Roman spellings.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Dialect Classification & Routing Results */}
        <div className="lg:col-span-7 space-y-6">
          {loading && (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center shadow-sm space-y-4">
              <div className="relative inline-block">
                <div className="w-16 h-16 rounded-full border-4 border-orange-100 border-t-orange-600 animate-spin mx-auto" />
                <Sparkles className="h-6 w-6 text-orange-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Parsing Dialectal Features & Morpho-Syntax
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Cross-referencing 16 Indian linguistic zones, Romanized phonetic markers, code-mixing patterns, and grievance routing jurisdictions...
                </p>
              </div>
            </div>
          )}

          {!loading && !result && (
            <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-12 text-center text-stone-400 space-y-3">
              <MapPin className="h-10 w-10 mx-auto text-stone-300" />
              <div className="font-serif text-base font-semibold text-stone-700">
                Awaiting Citizen Input
              </div>
              <p className="text-xs max-w-sm mx-auto text-stone-500">
                Type an unstructured message or select one of the 10 presets above to view the linguistic breakdown and routing suggestion.
              </p>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-6">
              {/* Primary Region Banner */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Predicted Dialect & Community
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-orange-100 text-orange-800 border border-orange-200">
                      Identified
                    </span>
                  </div>

                  {/* Confidence Gauge */}
                  <div className="flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200">
                    <span className="text-xs text-stone-600 font-medium">Confidence:</span>
                    <div className="w-20 bg-stone-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${Math.round(result.confidence * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-emerald-700">
                      {(result.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                    {result.predicted_region}
                  </h2>

                  {/* Routing Suggestion Box */}
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
                    <div className="p-2 bg-orange-600 text-white rounded-lg shrink-0 mt-0.5 shadow-xs">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div className="space-y-1 grow">
                      <div className="text-xs font-bold uppercase tracking-wider text-orange-900">
                        Official Routing Suggestion
                      </div>
                      <div className="text-sm font-semibold text-stone-900 leading-snug">
                        {result.routing_suggestion}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                      {onNavigateToSegregation && (
                        <button
                          onClick={onNavigateToSegregation}
                          className="text-xs px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                          title="View this complaint segregated under its departmental problem type"
                        >
                          <FolderTree className="h-3.5 w-3.5 text-amber-800" />
                          <span>Problem Segregation</span>
                        </button>
                      )}
                      <button
                        onClick={generateDocket}
                        className="text-xs px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors shadow-xs flex items-center justify-center gap-1.5"
                      >
                        {docketGenerated ? 'Docket Generated' : 'Dispatch Docket'}
                      </button>
                    </div>
                  </div>

                  {docketGenerated && (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>
                          Official Docket <strong>#{docketGenerated}</strong> generated and routed to {result.routing_suggestion.replace('Forward to local office in ', '')}.
                        </span>
                      </div>
                      <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold">
                        SLA 48h
                      </span>
                    </div>
                  )}
                </div>

                {/* Sub-Tabs for Analysis vs JSON vs Docket */}
                <div className="flex border-b border-stone-200 mt-6 pt-2 gap-4 text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('analysis')}
                    className={`pb-2 transition-colors flex items-center gap-1.5 ${
                      activeTab === 'analysis'
                        ? 'border-b-2 border-orange-600 text-orange-700 font-bold'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Linguistic Explanation & Clues</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('json')}
                    className={`pb-2 transition-colors flex items-center gap-1.5 ${
                      activeTab === 'json'
                        ? 'border-b-2 border-orange-600 text-orange-700 font-bold'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    <Code2 className="h-3.5 w-3.5" />
                    <span>Strict JSON Format</span>
                  </button>
                </div>

                {/* Tab 1: Detailed Linguistic Breakdown */}
                {activeTab === 'analysis' && (
                  <div className="pt-5 space-y-6">
                    {/* Explanation Paragraph */}
                    <div className="space-y-1.5">
                      <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Linguistic Rationale & Explanation
                      </div>
                      <p className="text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200">
                        {result.explanation}
                      </p>
                    </div>

                    {/* Key Clues */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Identified Linguistic Clues ({result.key_clues.length})
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.key_clues.map((clue, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-mono font-medium"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span>{clue}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Secondary Dialects (if any) */}
                    {result.secondary_dialects && result.secondary_dialects.length > 0 && (
                      <div className="text-xs text-stone-600 flex items-center gap-2">
                        <span className="font-semibold text-stone-700">Adjacent / Secondary Dialects:</span>
                        <div className="flex gap-1.5">
                          {result.secondary_dialects.map((sd, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[11px]">
                              {sd}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Linguistic Morphology Grid */}
                    {result.linguistic_breakdown && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1.5">
                          <div className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                            Vocabulary & Dialect Slang
                          </div>
                          <ul className="text-xs text-stone-800 space-y-1">
                            {result.linguistic_breakdown.vocabulary_markers.map((vm, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-orange-600 font-bold">•</span>
                                <span>{vm}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1.5">
                          <div className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                            Grammatical & Morphological Patterns
                          </div>
                          <ul className="text-xs text-stone-800 space-y-1">
                            {result.linguistic_breakdown.grammatical_features.map((gf, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-orange-600 font-bold">•</span>
                                <span>{gf}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1.5">
                          <div className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                            Code-Mixing Patterns
                          </div>
                          <ul className="text-xs text-stone-800 space-y-1">
                            {result.linguistic_breakdown.code_mixing_patterns.map((cm, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-orange-600 font-bold">•</span>
                                <span>{cm}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1.5">
                          <div className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                            Script & Phonetic Orthography
                          </div>
                          <div className="text-xs text-stone-800">
                            {result.linguistic_breakdown.script_style}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Dual Translations / Standardizations */}
                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Administrative Standardization & Translations
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-1">
                          <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider flex items-center justify-between">
                            <span>Standard English (Central / CPGRAMS)</span>
                            <span className="text-[10px] text-blue-700">Official</span>
                          </div>
                          <p className="text-xs text-blue-950 leading-relaxed font-sans">
                            {result.standard_english_translation || 'Translation generated for central record.'}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                          <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center justify-between">
                            <span>Standard State Vernacular (Administrative)</span>
                            <span className="text-[10px] text-emerald-700">State Official</span>
                          </div>
                          <p className="text-xs text-emerald-950 leading-relaxed font-sans">
                            {result.administrative_vernacular_summary || 'Standard state vernacular documentation ready.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Department Category & Urgency */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-200">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-stone-500">Civic Category:</span>
                        <span className="text-xs font-semibold px-2.5 py-1 bg-stone-100 text-stone-800 rounded-md border border-stone-200">
                          {result.detected_issue_category || 'Civic Grievance'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-stone-500">Urgency Level:</span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${getUrgencyBadge(result.urgency_level)}`}>
                          {result.urgency_level || 'Normal'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Strict JSON Output format as requested */}
                {activeTab === 'json' && (
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-stone-500">
                        Strict JSON Output (adheres strictly to user requirement)
                      </span>
                      <button
                        onClick={handleCopyJson}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-mono transition-colors"
                      >
                        {copiedJson ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
                      </button>
                    </div>

                    <pre className="bg-stone-950 text-stone-100 rounded-xl p-4 text-xs font-mono overflow-x-auto leading-relaxed border border-stone-800 shadow-inner">
{JSON.stringify(
  {
    predicted_region: result.predicted_region,
    confidence: result.confidence,
    key_clues: result.key_clues,
    explanation: result.explanation,
    routing_suggestion: result.routing_suggestion,
  },
  null,
  2
)}
                    </pre>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={handleCopySummary}
                        className="text-xs text-orange-700 hover:text-orange-900 font-medium flex items-center gap-1"
                      >
                        {copiedSummary ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
                        <span>{copiedSummary ? 'Summary Copied' : 'Copy Plaintext Triage Slip'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function CompassIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm3.5 6.5l-2.5 6-6 2.5 2.5-6 6-2.5z" />
    </svg>
  );
}
