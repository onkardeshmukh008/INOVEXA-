import React, { useState } from 'react';
import { BookOpen, Search, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface LexiconCategory {
  title: string;
  subtitle: string;
  items: Array<{
    feature: string;
    dialects: string;
    meaning: string;
    examples: string[];
    explanation: string;
  }>;
}

export const LinguisticLexicon: React.FC<{ onTestWord: (word: string) => void }> = ({ onTestWord }) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const categories: LexiconCategory[] = [
    {
      title: 'Negation Particles',
      subtitle: 'How citizens express negative existential states (e.g., "water is not coming", "officers not listening")',
      items: [
        {
          feature: 'naikhe / naahi',
          dialects: 'Bhojpuri & Purvanchali Hindi',
          meaning: 'is not / does not exist',
          examples: ['paani naikhe aawat (water is not coming)', 'koi sunat naikhe (nobody is listening)'],
          explanation: 'Unique compound negative existential copula formed from "na" + "ikhe" (derived from Prakrit/Apabhramsha).'
        },
        {
          feature: 'koni / konya',
          dialects: 'Haryanvi & Western Hindi',
          meaning: 'not / no',
          examples: ['sarpanch sunta koni (sarpanch does not listen)', 'manne berani koni (I do not know)'],
          explanation: 'Signature Haryanvi negation particle, distinct from standard Hindi "nahin".'
        },
        {
          feature: 'nakko',
          dialects: 'Dakhni / Hyderabadi Urdu-Hindi & Marathi',
          meaning: 'do not / do not want / prohibited',
          examples: ['nakko bolo tension ji (dont give me tension sir)', 'paani nakko waste karo'],
          explanation: 'Classic Deccan marker borrowed from Marathi "nako" into Hyderabadi Urdu colloquial syntax.'
        },
        {
          feature: 'nathi',
          dialects: 'Grassroots Gujarati',
          meaning: 'is not / not present',
          examples: ['paani nathi aavtu (water is not coming)', 'kain karyu nathi (they did nothing)'],
          explanation: 'Core Gujarati auxiliary negative.'
        },
        {
          feature: 'illa / illai',
          dialects: 'Grassroots Kannada / Tamil',
          meaning: 'not / no response',
          examples: ['officer response illa (no officer response)', 'thanni varala / eriyavillai (water not coming)'],
          explanation: 'Dravidian negative markers frequently combined with English loanwords ("response illa", "current illa").'
        }
      ]
    },
    {
      title: 'Copulas & Verb Endings',
      subtitle: 'The grammatical verbs denoting "is", "happens", or ongoing aspect',
      items: [
        {
          feature: 'ba / baate / baani',
          dialects: 'Bhojpuri & Purvanchali',
          meaning: 'is / are / am',
          examples: ['pipeline tutal ba (pipeline is broken)', 'sab log lad rahal ba (everyone is fighting)'],
          explanation: 'Bhojpuri existential verb "ba", conjugated for respect ("baani" for 1st person or honorific).'
        },
        {
          feature: 'se / su',
          dialects: 'Haryanvi & Khari Boli',
          meaning: 'is / am',
          examples: ['firni tootti padi se (boundary road is broken)', 'tractor fas ja se (tractor gets stuck)'],
          explanation: 'Standard Haryanvi present tense copula "se" replacing Hindi "hai".'
        },
        {
          feature: 'chhi / achhi',
          dialects: 'Maithili & Magahi',
          meaning: 'is / exists',
          examples: ['zameen hamaar chhi (land is mine)', 'aavedan atkal achhi (application is stuck)'],
          explanation: 'Archetypal Mithila and Magadh region copula, originating from Sanskrit "asti".'
        },
        {
          feature: 'aahe / naahi',
          dialects: 'Marathi (Deshastha / Vidarbha)',
          meaning: 'is / is not',
          examples: ['pipeline phutli aahe (pipeline has burst)', 'koni laksh det naahi (no one pays attention)'],
          explanation: 'Essential Marathi verb system markers used by rural citizens lodging panchayat complaints.'
        },
        {
          feature: '-rela / -reli',
          dialects: 'Bambaiya Hindi / Tapori',
          meaning: 'progressive continuous aspect (-ing)',
          examples: ['rada ho rela hai (chaos is happening)', 'gaadi nahi aa reli (vehicle is not coming)'],
          explanation: 'Unique Mumbai urban portmanteau blending Hindi "raha" with Gujarati/Marathi "-la" participial suffixes.'
        }
      ]
    },
    {
      title: 'Pronominal & Address Forms',
      subtitle: 'How citizens refer to themselves, officials, and community members',
      items: [
        {
          feature: 'manne / tanne',
          dialects: 'Haryanvi',
          meaning: 'to me / to you',
          examples: ['manne do baar application de li (I gave application twice)', 'tanne ke pata (what do you know)'],
          explanation: 'Haryanvi oblique 1st and 2nd person pronouns with distinctive nasal glide.'
        },
        {
          feature: 'apun / apun ko',
          dialects: 'Bambaiya / Mumbai Colloquial',
          meaning: 'I / to me / we',
          examples: ['apun ko ye sab nahi mangta (I don’t want all this excuses)', 'apun ne ward officer ko bola'],
          explanation: 'Iconic Mumbai 1st person singular pronoun adopted across slums, chawls, and youth grievances.'
        },
        {
          feature: 'hum / hamre / raur',
          dialects: 'Bhojpuri / Purvanchal / Bihar',
          meaning: 'I (royal/respectful) / our / your honor',
          examples: ['hum garib manukh (I am a poor person)', 'raur aashirwad (your blessing / sir)'],
          explanation: 'Plural pronoun "hum" universally used as singular "I" across eastern Hindi/Bhojpuri belts.'
        },
        {
          feature: 'mereku / unku',
          dialects: 'Dakhni (Hyderabad / Deccan)',
          meaning: 'to me / to them',
          examples: ['mereku paani nai aara ji (water is not coming to me sir)'],
          explanation: 'Dakhni dative/accusative pronominal suffix "-ku" substituting for standard Hindi "mujhe/unhe".'
        },
        {
          feature: 'namma / enga',
          dialects: 'Kannada / Tamil',
          meaning: 'our / in our neighborhood',
          examples: ['namma layout alli (in our layout)', 'enga theru la (in our street)'],
          explanation: 'Inclusive 1st person plural markers commonly prefixed to administrative ward addresses.'
        }
      ]
    },
    {
      title: 'Grassroots Civic & Revenue Terms',
      subtitle: 'Technical and vernacular terms citizens frequently use in petitions',
      items: [
        {
          feature: 'firni (फिरनी)',
          dialects: 'Haryanvi & Punjabi',
          meaning: 'village circular boundary road',
          examples: ['mahre gaam ki firni (our village perimeter road)'],
          explanation: 'Specific agrarian revenue term for the motorable circular road enclosing residential village abadi.'
        },
        {
          feature: 'dakhil kharij (दाखिल खारिज)',
          dialects: 'Bihar, UP, North India',
          meaning: 'property mutation in revenue records',
          examples: ['dakhil kharij tin mahina se atkal ba (land mutation stuck for 3 months)'],
          explanation: 'Perso-Arabic administrative legal term for transferring title in jamabandi/patwari records.'
        },
        {
          feature: 'kotihedar (कोटेदार)',
          dialects: 'Uttar Pradesh & Bihar',
          meaning: 'PDS fair price ration shop dealer',
          examples: ['kotihedar anaj nahi dehat aahi (ration dealer is withholding grains)'],
          explanation: 'Local vernacular title for licensed public distribution shopkeeper.'
        },
        {
          feature: 'rada / locha (राड़ा / लोचा)',
          dialects: 'Mumbai & Western India',
          meaning: 'ruckus, dispute, technical chaos',
          examples: ['kachra ka bada rada ho gaya (huge dispute over garbage dump)'],
          explanation: 'Colloquial slang for civic disruption or system breakdown.'
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-orange-100 text-orange-800 rounded-lg">
              <BookOpen className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-serif font-bold text-stone-900">
              Linguistic Clue Lexicon & Morpho-Syntax Guide
            </h2>
          </div>
          <p className="text-xs text-stone-500">
            A comprehensive reference explaining the grammatical foundations that separate regional Indian dialects from standard language.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-1 bg-stone-100 p-1 rounded-xl">
          {categories.map((c, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === idx
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* Category Subtitle */}
      <div className="bg-orange-50/60 border border-orange-200/80 rounded-xl p-4 text-xs text-orange-950 font-medium">
        {categories[activeCategory].subtitle}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories[activeCategory].items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3 hover:border-orange-300 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-lg font-mono font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                  {item.feature}
                </span>
                <div className="text-xs font-semibold text-stone-900 mt-2">
                  Meaning: {item.meaning}
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                {item.dialects}
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              {item.explanation}
            </p>

            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                Authentic Grievance Usages:
              </div>
              <ul className="text-xs text-stone-800 space-y-1 font-mono">
                {item.examples.map((ex, i) => (
                  <li key={i} className="flex items-center justify-between gap-2">
                    <span className="text-stone-700">"{ex}"</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onTestWord(item.examples[0].split('(')[0].trim())}
              className="text-xs font-semibold text-orange-600 hover:text-orange-800 flex items-center gap-1 pt-1"
            >
              <span>Test example in Analyzer</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
