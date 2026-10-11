import React, { useState } from 'react';
import { Terminal, Copy, Check, Code, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const PromptViewer: React.FC = () => {
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const curlExample = `curl -X POST https://ais-dev-p2ps6znir6judrzhasqnkh-586235230468.asia-southeast1.run.app/api/analyze-dialect \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Babu ji, hamre tola me chaar din se paani naikhe aawat, pipeline tutal baate."
  }'`;

  const schemaExample = `{
  "predicted_region": "Bhojpuri & Purvanchali Hindi (Eastern UP & Western Bihar: Varanasi, Gorakhpur, Chhapra, Patna)",
  "confidence": 0.94,
  "key_clues": [
    "naikhe aawat (Bhojpuri negative existential copula)",
    "tutal baate (Bhojpuri stative auxiliary baate)",
    "hamre tola (hamre 1st person plural pronoun + tola rural hamlet unit)"
  ],
  "explanation": "The text displays diagnostic linguistic markers of Bhojpuri and Purvanchali Hindi, notably the synthetic negative verb 'naikhe' combined with the imperfective participle 'aawat', the copular construction 'baate', and regional administrative settlement terminology ('tola').",
  "routing_suggestion": "Forward to local office in District Collectorate / Jan Sunwai Portal Varanasi or Patna Water Board"
}`;

  const copyText = (txt: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-2xl border border-stone-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-orange-600/30 text-orange-400 rounded-lg border border-orange-500/30">
              <Terminal className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-serif font-bold text-white">
              JSON Specification & API Contract
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono font-semibold flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            100% Strict Schema Validated
          </span>
        </div>

        <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
          The JanSetu engine strictly outputs the exact schema mandated for automated grievance routing pipelines. It handles Roman script transliteration, Devanagari, regional scripts, grammatical code-mixing, and extreme phonetic spelling variations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schema Definition */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <Code className="h-4 w-4 text-orange-600" />
              <span>Strict Output Schema Definition</span>
            </h3>
            <button
              onClick={() => copyText(schemaExample, setCopiedSchema)}
              className="text-xs px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center gap-1 transition-colors"
            >
              {copiedSchema ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedSchema ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <pre className="bg-stone-950 text-stone-100 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-stone-800">
{schemaExample}
          </pre>

          <div className="space-y-2 text-xs text-stone-600">
            <div className="font-semibold text-stone-900">Required Key Specifications:</div>
            <ul className="list-disc pl-4 space-y-1">
              <li><code className="text-orange-700 font-bold">predicted_region</code>: Specific dialect name chosen from the realistic 16-zone taxonomy.</li>
              <li><code className="text-orange-700 font-bold">confidence</code>: Float between 0.0 and 1.0 reflecting linguistic certainty.</li>
              <li><code className="text-orange-700 font-bold">key_clues</code>: Array of exact words/morphemes and grammatical reasons.</li>
              <li><code className="text-orange-700 font-bold">explanation</code>: Short explanatory paragraph on morphology and syntax.</li>
              <li><code className="text-orange-700 font-bold">routing_suggestion</code>: District/state nodal office recommendation.</li>
            </ul>
          </div>
        </div>

        {/* Live cURL & Backend Integration */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <Terminal className="h-4 w-4 text-orange-600" />
              <span>Backend API Invocation (cURL / Fetch)</span>
            </h3>
            <button
              onClick={() => copyText(curlExample, setCopiedCurl)}
              className="text-xs px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center gap-1 transition-colors"
            >
              {copiedCurl ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedCurl ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <pre className="bg-stone-950 text-stone-100 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-stone-800">
{curlExample}
          </pre>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs text-emerald-950">
            <div className="font-bold flex items-center gap-1.5 text-emerald-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              <span>Robustness Guarantees:</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-emerald-900/90">
              <li>Handles extreme Romanized phonetic spelling variations (e.g. "aawat", "aawath", "naike", "nyke").</li>
              <li>Handles Devanagari, Gurmukhi, Bengali, Tamil, Telugu, Kannada, Malayalam, Gujarati.</li>
              <li>Separates civic intent (potholes, transformers, pipelines) from geographical linguistic roots.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
