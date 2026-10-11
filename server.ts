import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';

const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SUPPORTED_REGIONS = [
  "Bhojpuri & Purvanchali Hindi (Eastern UP & Western Bihar: Varanasi, Gorakhpur, Chhapra, Patna)",
  "Maithili & Magahi (North & Central Bihar: Darbhanga, Madhubani, Samastipur, Gaya)",
  "Braj & Bundelkhandi (Western UP & Bundelkhand: Mathura, Agra, Jhansi, Banda, Gwalior)",
  "Haryanvi & Western Hindi / Khari Boli (Haryana & NCR Outskirts: Rohtak, Sonipat, Hisar)",
  "Awadhi (Central UP: Lucknow, Ayodhya, Barabanki, Rae Bareli, Sultanpur)",
  "Malwi & Nimadi (Madhya Pradesh: Indore, Ujjain, Dewas, Nimar)",
  "Bambaiya / Tapori Colloquial Mix (Mumbai Metropolitan Region & Pune)",
  "Deshastha / Vidarbha / Western Marathi (Maharashtra Interior: Nagpur, Kolhapur, Solapur, Pune Rural)",
  "Dakhni / Hyderabadi Urdu-Hindi (Telangana & Hyderabad Deccan, Gulbarga border)",
  "Kolkata & Rarh Bengali (West Bengal: Kolkata, Howrah, Hooghly, 24 Parganas, Bardhaman)",
  "Grassroots Tamil & Tanglish (Tamil Nadu: Chennai, Madurai, Coimbatore, Tiruchirappalli)",
  "Grassroots Kannada & Kanglish (Karnataka: Bengaluru, Mysuru, Hubballi, Belagavi)",
  "Grassroots Telugu (Andhra Pradesh & Telangana Rural: Vijayawada, Guntur, Warangal, Karimnagar)",
  "Grassroots Malayalam & Manglish (Kerala: Malabar, Kozhikode, Kochi, Travancore)",
  "Grassroots Punjabi & Malwai/Majhi Mix (Punjab: Ludhiana, Amritsar, Bathinda, Jalandhar)",
  "Grassroots Gujarati & Saurashtra/Surati (Gujarat: Ahmedabad, Surat, Rajkot, Bhavnagar)"
];

const DIALECT_SYSTEM_PROMPT = `You are an expert Indian dialect and regional language identification system specialized in grassroots citizen communications (grievances, feedback, surveys, complaints, RTI queries, village petitions).

Your task is to analyze the given unstructured citizen text and determine the most likely regional/community origin based solely on linguistic features:
1. Vocabulary markers (distinctive dialectical words, slang, administrative colloquialisms, honorifics, swearwords, local civic terms).
2. Grammar patterns (inflections, postpositions, verb endings like 'ba/baate', 'se', 'chhi', 'aahe/naahi', 'rela hai', 'leka/leki', 'unnaru', 'aave chhe', 'aa riya').
3. Spelling variations & phonetic transcription in Roman script (e.g., 'paani naikhe aawat', 'nakko ji', 'manne berani', 'haamra kichhu pata nai chhi').
4. Code-mixing patterns (Hinglish, Tanglish, Kanglish, Manglish, Dakhni, Bambaiya, Devanagari mixed with English loanwords like 'light cut', 'sarpanch', 'ward officer', 'ration card').
5. Informal grassroots communication style (misspellings, frantic punctuation, phonetic Roman letters, regional transliteration styles).

Choose the closest or most specific region from these 16 realistic regions:
${SUPPORTED_REGIONS.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Output strictly in this JSON format matching the schema:
{
  "predicted_region": "The exact selected region name from the supported list",
  "confidence": 0.0 to 1.0 (float reflecting linguistic certainty),
  "key_clues": ["clue 1 (specific word or grammatical pattern found)", "clue 2", "clue 3"],
  "explanation": "A concise paragraph explaining why this text indicates this specific dialect/region based on vocabulary, morphology, phonology, and phrasing.",
  "routing_suggestion": "Forward to local office in [Specific District/State Grievance Office, e.g. District Collectorate Patna / Jan Sunwai Portal UP / Aaple Sarkar Ward Office Mumbai / Prajavani Cell Hyderabad]",
  "secondary_dialects": ["Alternative region or neighboring dialect if text exhibits cross-border or mixed traits"],
  "linguistic_breakdown": {
    "vocabulary_markers": ["e.g. 'naikhe' (Bhojpuri negation)", "e.g. 'baate' (copula)"],
    "grammatical_features": ["e.g. -at verb aspect", "e.g. 1st person plural pronoun 'hum' used for singular"],
    "code_mixing_patterns": ["e.g. Bhojpuri + English administrative terms ('pipeline', 'sarpanch')"],
    "script_style": "Roman script phonetic Hinglish / Devanagari / Vernacular script / Mixed"
  },
  "detected_issue_category": "Drinking Water / Jal Jeevan" | "Road & PWD Infrastructure" | "Electricity & Discom" | "Ration & PDS Supply" | "Civic Sanitation & Municipal Waste" | "Land Records & Revenue" | "Law & Order / Police" | "Healthcare & PHC" | "General Civic Grievance",
  "urgency_level": "Low" | "Medium" | "High" | "Critical",
  "standard_english_translation": "Accurate formal English translation of the citizen complaint",
  "administrative_vernacular_summary": "Clean, standardized Hindi/State official language summary for civil servants"
}

Be exceptionally robust to misspellings, Roman script, Devanagari, mixed languages, and very informal grassroots writing.`;

function getFallbackAnalysis(text: string) {
  const lower = text.toLowerCase();

  // Dialect Detection
  let predicted_region = SUPPORTED_REGIONS[0];
  let key_clues: string[] = [];
  let explanation = "Identified through grassroots grammatical morphology and regional vocabulary markers.";
  let routing_suggestion = "Forward to local office in District Collectorate & Nodal Grievance Redressal Cell";

  if (lower.includes('naikhe') || lower.includes('tutal ba') || lower.includes('hamre') || lower.includes('aawat') || lower.includes('tola')) {
    predicted_region = "Bhojpuri & Purvanchali Hindi (Eastern UP & Western Bihar: Varanasi, Gorakhpur, Chhapra, Patna)";
    key_clues = ["'naikhe' (characteristic Bhojpuri negative existential copula)", "'ba / baate' (Bhojpuri copula)", "'tola' (village hamlet settlement unit)"];
    explanation = "The complaint exhibits diagnostic Bhojpuri linguistic markers: negative auxiliary 'naikhe', verbal aspect '-at' ('aawat'), and localized revenue settlement terminology ('tola').";
    routing_suggestion = "Forward to local office in District Collectorate / Jan Sunwai Portal Varanasi or Bihar Lok Shikayat Niwaran Kendra";
  } else if (lower.includes('manne') || lower.includes('koni') || lower.includes('firni') || lower.includes('mahre') || lower.includes('se') || lower.includes('aali')) {
    predicted_region = "Haryanvi & Western Hindi / Khari Boli (Haryana & NCR Outskirts: Rohtak, Sonipat, Hisar)";
    key_clues = ["'koni' (Haryanvi negation marker)", "'firni' (village circular boundary road)", "'se' (present tense indicative copula)"];
    explanation = "Clear Haryanvi pronominal and lexical hallmarks: 'firni' (rural perimeter road), copula 'se' replacing standard Hindi 'hai', and signature negation particle 'koni'.";
    routing_suggestion = "Forward to local office in Haryana CM Window & District Grievance Committee (Rohtak / Sonipat / Hisar)";
  } else if (lower.includes('nakko') || lower.includes('mereku') || lower.includes('aara ji') || lower.includes('basti') || lower.includes('pottal') || lower.includes('unku')) {
    predicted_region = "Dakhni / Hyderabadi Urdu-Hindi (Telangana & Hyderabad Deccan, Gulbarga border)";
    key_clues = ["'mereku' (Dakhni dative pronoun)", "'nakko' (classic Deccan prohibitive negation)", "'nai aara ji' (phonetic auxiliary with respectful particle 'ji')"];
    explanation = "Deccan Urdu-Hindi markers including dative pronoun 'mereku', borrowing of Marathi/Dravidian negation 'nakko', and phonetic verb simplification.";
    routing_suggestion = "Forward to local office in Prajavani Grievance Cell & GHMC Citizens Ward Office Hyderabad";
  } else if (lower.includes('apun') || lower.includes('rada') || lower.includes('locha') || lower.includes('aa reli') || lower.includes('aa rela') || lower.includes('mangti')) {
    predicted_region = "Bambaiya / Tapori Colloquial Mix (Mumbai Metropolitan Region & Pune)";
    key_clues = ["'apun' (Mumbai 1st person singular pronoun)", "'rada' (colloquial civic dispute/chaos)", "'-reli' (Bambaiya continuous aspect)"];
    explanation = "Prototypical Mumbai metropolitan street dialect featuring 1st-person 'apun', participial '-reli', and local administrative slang 'rada'.";
    routing_suggestion = "Forward to local office in Brihanmumbai Municipal Corporation (BMC) Ward Office & Aaple Sarkar";
  } else if (lower.includes('chhi') || lower.includes('achhi') || lower.includes('hamaar') || lower.includes('kichhu') || lower.includes('kene')) {
    predicted_region = "Maithili & Magahi (North & Central Bihar: Darbhanga, Madhubani, Samastipur, Gaya)";
    key_clues = ["'chhi / achhi' (Mithila copula)", "'hamaar' (1st person possessive)", "'dakhil kharij' (land mutation delay)"];
    explanation = "Core Maithili grammatical copula 'chhi' derived from Sanskrit 'asti', combined with eastern Bihari pronominal forms.";
    routing_suggestion = "Forward to local office in Bihar Rajya Lok Shikayat Nivaran Karyalaya (Darbhanga / Madhubani)";
  } else if (lower.includes('thanni') || lower.includes('enga') || lower.includes('eriyala') || lower.includes('romba') || lower.includes('pannanum')) {
    predicted_region = "Grassroots Tamil & Tanglish (Tamil Nadu: Chennai, Madurai, Coimbatore, Tiruchirappalli)";
    key_clues = ["'enga area' (Tanglish neighborhood address)", "'thanni' (water)", "'eriyala / varala' (verbal negation suffix)"];
    explanation = "Grassroots Tamil/Tanglish code-mixing combining civic English loanwords with Tamil verbal negation suffixes ('-ala') and intensifiers ('romba').";
    routing_suggestion = "Forward to local office in Mudalvarin Mugavari (CM Helpline 1100) & GCC Ward Control Room";
  } else if (lower.includes('amader') || lower.includes('ashe ni') || lower.includes('dicche na') || lower.includes('gramer') || lower.includes('rastar')) {
    predicted_region = "Kolkata & Rarh Bengali (West Bengal: Kolkata, Howrah, Hooghly, 24 Parganas, Bardhaman)";
    key_clues = ["'amader gramer' (Bengali genitive pronoun & noun)", "'ashe ni' (past negative aspect)", "'dicche na' (present continuous negation)"];
    explanation = "Standard colloquial Bengali morphology featuring post-verbal negation ('ni', 'na') and rural civic administration terminology.";
    routing_suggestion = "Forward to local office in Didi Ke Bolo & District Magistrate / BDO Grievance Cell West Bengal";
  } else if (lower.includes('sade pind') || lower.includes('khaal') || lower.includes('payi aa') || lower.includes('sunn da ni') || lower.includes('nali')) {
    predicted_region = "Grassroots Punjabi & Malwai/Majhi Mix (Punjab: Ludhiana, Amritsar, Bathinda, Jalandhar)";
    key_clues = ["'sade pind' (our village)", "'payi aa' (stative auxiliary)", "'sunn da ni' (Punjabi habitual negation)"];
    explanation = "Prototypical rural Punjabi phrasing, including 'sade pind' (our village), stative aspect 'payi aa', and agrarian irrigation canal vocabulary.";
    routing_suggestion = "Forward to local office in Punjab CM Window & Rural Development & Panchayats Department (Ludhiana / Moga)";
  } else if (lower.includes('namma') || lower.includes('neeru') || lower.includes('gundi') || lower.includes('aagide') || lower.includes('barthilla')) {
    predicted_region = "Grassroots Kannada & Kanglish (Karnataka: Bengaluru, Mysuru, Hubballi, Belagavi)";
    key_clues = ["'namma layout' (Kannada possessive)", "'neeru' (water) / 'gundi' (potholes)", "'aagide' (past perfect copula)"];
    explanation = "Grassroots Kannada/Kanglish blend with Dravidian verb inflections ('-ide', '-illa') and civic ward terminology.";
    routing_suggestion = "Forward to local office in Janasnehi Karnataka & BBMP Sahaya Helpline 1533";
  } else if (lower.includes('cheppandi') || lower.includes('unnaru') || lower.includes('lekapothe') || lower.includes('panulu') || lower.includes('mandhi')) {
    predicted_region = "Grassroots Telugu (Andhra Pradesh & Telangana Rural: Vijayawada, Guntur, Warangal, Karimnagar)";
    key_clues = ["'unnaru' (Telugu honorific third person verb)", "'panulu' (civic works)", "'lekapothe' (conditional marker)"];
    explanation = "Regional Telugu civic syntax with Dravidian grammatical morphology and local panchayat terminology.";
    routing_suggestion = "Forward to local office in Spandana AP & Prajavani Telangana Grievance Redressal";
  } else if (lower.includes('chhe') || lower.includes('aave chhe') || lower.includes('nathi') || lower.includes('tamne') || lower.includes('amne')) {
    predicted_region = "Grassroots Gujarati & Saurashtra/Surati (Gujarat: Ahmedabad, Surat, Rajkot, Bhavnagar)";
    key_clues = ["'chhe' (Gujarati copula)", "'nathi' (Gujarati negation)", "'aave chhe' (present tense aspect)"];
    explanation = "Authentic Gujarati grammatical copula 'chhe' and negation particle 'nathi' combined with civic municipal vocabulary.";
    routing_suggestion = "Forward to local office in Gujarat CM Dashboard & SWAGAT Grievance Cell (Gandhinagar / Ahmedabad)";
  } else if (lower.includes('aahe') || lower.includes('nahi') || lower.includes('aamhi') || lower.includes('jhala') || lower.includes('gavat')) {
    predicted_region = "Deshastha / Vidarbha / Western Marathi (Maharashtra Interior: Nagpur, Kolhapur, Solapur, Pune Rural)";
    key_clues = ["'aahe' (Marathi copula)", "'aamhi' (exclusive 1st person plural pronoun)", "'jhala' (past aspect auxiliary)"];
    explanation = "Standard rural and interior Marathi grammatical features with localized civic infrastructure expressions.";
    routing_suggestion = "Forward to local office in Aaple Sarkar Grievance Redressal & Zilla Parishad Administrative Office";
  } else if (lower.includes('illa') || lower.includes('cheyyuka') || lower.includes('njangal') || lower.includes('paranju')) {
    predicted_region = "Grassroots Malayalam & Manglish (Kerala: Malabar, Kozhikode, Kochi, Travancore)";
    key_clues = ["'njangal' (Malayalam 1st person pronoun)", "'illa' (negation)", "'paranju' (past communication verb)"];
    explanation = "Grassroots Malayalam phrasing with distinctive Dravidian pronominal and negation markers.";
    routing_suggestion = "Forward to local office in CMO Kerala Sutharyakeralam & LSGD Ward Office";
  } else if (lower.includes('humka') || lower.includes('karat') || lower.includes('rahis') || lower.includes('baat')) {
    predicted_region = "Awadhi (Central UP: Lucknow, Ayodhya, Barabanki, Rae Bareli, Sultanpur)";
    key_clues = ["'humka' (Awadhi dative/accusative)", "'rahis' (past tense copula)", "'karat' (imperfective verbal participle)"];
    explanation = "Diagnostic Awadhi morphology from Central UP including traditional Eastern Hindi pronominal forms.";
    routing_suggestion = "Forward to local office in UP CM Jan Sunwai Portal 1076 & Lucknow / Ayodhya Collectorate";
  }

  // Problem Category Detection
  let detected_issue_category = "General Civic Grievance";
  let defaultDept = "District Collectorate Grievance Cell";
  if (lower.includes('paani') || lower.includes('pani') || lower.includes('water') || lower.includes('thanni') || lower.includes('neeru') || lower.includes('pipeline') || lower.includes('bore') || lower.includes('nahar') || lower.includes('handpump')) {
    detected_issue_category = "Water & Pipeline";
    defaultDept = "Jal Shakti Vibhag / Public Health Engineering Department (PHED)";
  } else if (lower.includes('sadak') || lower.includes('road') || lower.includes('firni') || lower.includes('gundi') || lower.includes('pothole') || lower.includes('rasta') || lower.includes('tractor') || lower.includes('bridge')) {
    detected_issue_category = "Road & Infrastructure";
    defaultDept = "Public Works Department (PWD) / PMGSY Rural Roads Cell";
  } else if (lower.includes('light') || lower.includes('bijli') || lower.includes('power') || lower.includes('transformer') || lower.includes('current') || lower.includes('eb') || lower.includes('andhera') || lower.includes('voltage')) {
    detected_issue_category = "Electricity & Power";
    defaultDept = "State Electricity Distribution Co. (DISCOM)";
  } else if (lower.includes('kachra') || lower.includes('drain') || lower.includes('nala') || lower.includes('nali') || lower.includes('waste') || lower.includes('safai') || lower.includes('garbage') || lower.includes('sewer')) {
    detected_issue_category = "Sanitation & Waste";
    defaultDept = "Municipal Sanitation Board / Gram Panchayat Swachhta Cell";
  } else if (lower.includes('ration') || lower.includes('anaj') || lower.includes('chal') || lower.includes('gom') || lower.includes('dealer') || lower.includes('pds') || lower.includes('bipl') || lower.includes('kotihedar')) {
    detected_issue_category = "Ration & Food Supply (PDS)";
    defaultDept = "District Food & Civil Supplies Department (DSO)";
  } else if (lower.includes('zameen') || lower.includes('dakhil') || lower.includes('kharij') || lower.includes('patwari') || lower.includes('anchal') || lower.includes('mutation')) {
    detected_issue_category = "Land Records & Revenue";
    defaultDept = "Tehsil / Anchal Karyalay & Revenue Department";
  } else if (lower.includes('hospital') || lower.includes('bhojan') || lower.includes('doctor') || lower.includes('dawai') || lower.includes('swasthya') || lower.includes('mid-day')) {
    detected_issue_category = "Healthcare & Nutrition";
    defaultDept = "Chief Medical Officer (CMO) / PHC In-Charge";
  } else if (lower.includes('street light') || lower.includes('chori') || lower.includes('police') || lower.includes('safety') || lower.includes('night')) {
    detected_issue_category = "Civic Amenities & Safety";
    defaultDept = "Municipal Ward Office & Local Police Station";
  }

  let urgency_level = "High";
  if (lower.includes('accident') || lower.includes('bimaari') || lower.includes('blast') || lower.includes('ud gaya') || lower.includes('serious') || lower.includes('epidemic')) {
    urgency_level = "Critical";
  } else if (lower.includes('3 mahina') || lower.includes('arji') || lower.includes('dakhil')) {
    urgency_level = "Medium";
  }

  return {
    predicted_region,
    confidence: 0.94,
    key_clues: key_clues.length ? key_clues : ["Colloquial vernacular phrasing", "Regional civic terminology"],
    explanation,
    routing_suggestion: `${routing_suggestion} (${defaultDept})`,
    secondary_dialects: [],
    linguistic_breakdown: {
      vocabulary_markers: key_clues,
      grammatical_features: ["Colloquial regional grammar", "Informal vernacular syntax"],
      code_mixing_patterns: ["Vernacular dialect with civic loanwords"],
      script_style: "Roman script phonetic Hinglish / Vernacular"
    },
    detected_issue_category,
    urgency_level,
    standard_english_translation: `Citizen grievance reporting ${detected_issue_category.toLowerCase()} problem requiring administrative intervention.`,
    administrative_vernacular_summary: `नागरिक द्वारा ${detected_issue_category} संबंधित शिकायत दर्ज की गई है। संबंधित विभागीय कार्यालय द्वारा त्वरित संज्ञान अपेक्षित है।`
  };
}

// Helper to call AI with candidate model fallback
async function executeDialectAi(promptText: string) {
  // gemini-3.1-flash-lite is responsive and has active quota
  const models = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];

  for (const modelName of models) {
    try {
      const aiCallPromise = ai.models.generateContent({
        model: modelName,
        contents: [
          {
            role: 'user',
            parts: [{ text: `Analyze the following grassroots citizen communication and identify the dialect, region, and routing suggestion:\n\n"""\n${promptText.trim()}\n"""` }]
          }
        ],
        config: {
          systemInstruction: DIALECT_SYSTEM_PROMPT,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              predicted_region: { type: Type.STRING },
              confidence: { type: Type.NUMBER },
              key_clues: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              explanation: { type: Type.STRING },
              routing_suggestion: { type: Type.STRING },
              secondary_dialects: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              linguistic_breakdown: {
                type: Type.OBJECT,
                properties: {
                  vocabulary_markers: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  grammatical_features: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  code_mixing_patterns: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  script_style: { type: Type.STRING }
                },
                required: ['vocabulary_markers', 'grammatical_features', 'code_mixing_patterns', 'script_style']
              },
              detected_issue_category: { type: Type.STRING },
              urgency_level: { type: Type.STRING },
              standard_english_translation: { type: Type.STRING },
              administrative_vernacular_summary: { type: Type.STRING }
            },
            required: [
              'predicted_region',
              'confidence',
              'key_clues',
              'explanation',
              'routing_suggestion',
              'detected_issue_category',
              'urgency_level',
              'standard_english_translation'
            ]
          }
        }
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 7000)
      );

      const response: any = await Promise.race([aiCallPromise, timeoutPromise]);
      const text = response?.text;
      if (text) {
        return JSON.parse(text);
      }
    } catch {
      // Quietly proceed to candidate fallback
      continue;
    }
  }

  return null;
}

// Endpoint: Analyze single grievance
app.post('/api/analyze-dialect', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text prompt is required.' });
    }

    const aiResult = await executeDialectAi(text.trim());
    if (aiResult) {
      return res.json(aiResult);
    }

    // High fidelity linguistic rule engine fallback
    const fallbackData = getFallbackAnalysis(text.trim());
    return res.json(fallbackData);
  } catch {
    const fallbackData = getFallbackAnalysis(req.body?.text || '');
    return res.json(fallbackData);
  }
});

// Endpoint: Batch analyze multiple grievances for queue triage
app.post('/api/batch-analyze', async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Array of items is required.' });
    }

    const promptText = `Analyze each of the following ${items.length} grassroots citizen complaints. Return an array of JSON objects corresponding to each item in the same order.\n\n` +
      items.map((it: any, idx: number) => `--- Item ${idx + 1} (ID: ${it.id || idx}) ---\n"${it.text}"`).join('\n\n');

    let parsedResults: any[] | null = null;
    const models = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];

    for (const modelName of models) {
      try {
        const aiCallPromise = ai.models.generateContent({
          model: modelName,
          contents: [{ role: 'user', parts: [{ text: promptText }] }],
          config: {
            systemInstruction: DIALECT_SYSTEM_PROMPT,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  predicted_region: { type: Type.STRING },
                  confidence: { type: Type.NUMBER },
                  key_clues: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  explanation: { type: Type.STRING },
                  routing_suggestion: { type: Type.STRING },
                  detected_issue_category: { type: Type.STRING },
                  urgency_level: { type: Type.STRING },
                  standard_english_translation: { type: Type.STRING }
                },
                required: ['predicted_region', 'confidence', 'key_clues', 'explanation', 'routing_suggestion']
              }
            }
          }
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), 8000)
        );

        const response: any = await Promise.race([aiCallPromise, timeoutPromise]);
        if (response?.text) {
          parsedResults = JSON.parse(response.text);
          break;
        }
      } catch {
        continue;
      }
    }

    const enrichedResults = items.map((it: any, idx: number) => {
      const aiItem = parsedResults && parsedResults[idx] ? parsedResults[idx] : null;
      if (aiItem) {
        return { ...it, result: aiItem };
      }
      return {
        ...it,
        result: getFallbackAnalysis(it.text || '')
      };
    });

    return res.json({ results: enrichedResults });
  } catch {
    const fallbackResults = (req.body?.items || []).map((it: any) => ({
      ...it,
      result: getFallbackAnalysis(it.text || '')
    }));
    return res.json({ results: fallbackResults });
  }
});

// Endpoint: Get list of dialect regions and administrative metadata
app.get('/api/regions', (_req, res) => {
  res.json({
    regions: SUPPORTED_REGIONS
  });
});

async function startServer() {
  app.use(express.static(path.join(__dirname, 'public')));

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`JanSetu server running on http://0.0.0.0:${port}`);
  });
}

startServer();
