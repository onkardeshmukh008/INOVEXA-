import type { DialectAnalysisResult } from '../types';

const dialects = [
  {
    region: 'Bhojpuri & Purvanchali Hindi (Eastern UP & Western Bihar: Varanasi, Gorakhpur, Chhapra, Patna)',
    markers: ['naikhe', 'hamre', 'aawat', 'tola', 'baate', 'rahala'],
    office: 'District Collectorate / Jan Sunwai Portal Varanasi or Bihar Lok Shikayat Niwaran Kendra',
  },
  {
    region: 'Maithili & Magahi (North & Central Bihar: Darbhanga, Madhubani, Samastipur, Gaya)',
    markers: ['chhi', 'achhi', 'hamaar', 'kichhu'],
    office: 'Bihar Rajya Lok Shikayat Nivaran Karyalaya',
  },
  {
    region: 'Braj & Bundelkhandi (Western UP & Bundelkhand: Mathura, Agra, Jhansi, Banda, Gwalior)',
    markers: ['tau', 'thare', 'mohe', 'bundelkhand'],
    office: 'District Collectorate / UP Jan Sunwai Portal',
  },
  {
    region: 'Haryanvi & Western Hindi / Khari Boli (Haryana & NCR Outskirts: Rohtak, Sonipat, Hisar)',
    markers: ['manne', 'koni', 'firni', 'mahre', 'tanne'],
    office: 'Haryana CM Window & District Grievance Committee',
  },
  {
    region: 'Awadhi (Central UP: Lucknow, Ayodhya, Barabanki, Rae Bareli, Sultanpur)',
    markers: ['humka', 'rahis', 'karat', 'awadh'],
    office: 'UP CM Jan Sunwai Portal 1076 & local Collectorate',
  },
  {
    region: 'Malwi & Nimadi (Madhya Pradesh: Indore, Ujjain, Dewas, Nimar)',
    markers: ['mhare', 'tharo', 'nimadi', 'malwi'],
    office: 'Madhya Pradesh CM Helpline & District Collectorate',
  },
  {
    region: 'Bambaiya / Tapori Colloquial Mix (Mumbai Metropolitan Region & Pune)',
    markers: ['apun', 'rada', 'locha', 'aa reli', 'aa rela'],
    office: 'Brihanmumbai Municipal Corporation (BMC) Ward Office',
  },
  {
    region: 'Deshastha / Vidarbha / Western Marathi (Maharashtra Interior: Nagpur, Kolhapur, Solapur, Pune Rural)',
    markers: ['aahe', 'aamhi', 'jhala', 'gavat'],
    office: 'Aaple Sarkar Grievance Redressal & Zilla Parishad',
  },
  {
    region: 'Dakhni / Hyderabadi Urdu-Hindi (Telangana & Hyderabad Deccan, Gulbarga border)',
    markers: ['nakko', 'mereku', 'aara ji', 'pottal', 'hyderabadi'],
    office: 'Prajavani Grievance Cell & GHMC Citizens Ward Office Hyderabad',
  },
  {
    region: 'Kolkata & Rarh Bengali (West Bengal: Kolkata, Howrah, Hooghly, 24 Parganas, Bardhaman)',
    markers: ['amader', 'ashe ni', 'dicche na', 'gramer', 'rastar'],
    office: 'District Magistrate / BDO Grievance Cell West Bengal',
  },
  {
    region: 'Grassroots Tamil & Tanglish (Tamil Nadu: Chennai, Madurai, Coimbatore, Tiruchirappalli)',
    markers: ['thanni', 'enga', 'eriyala', 'romba', 'pannanum'],
    office: 'Mudalvarin Mugavari (CM Helpline 1100) & GCC Ward Control Room',
  },
  {
    region: 'Grassroots Kannada & Kanglish (Karnataka: Bengaluru, Mysuru, Hubballi, Belagavi)',
    markers: ['namma', 'neeru', 'gundi', 'aagide', 'barthilla'],
    office: 'Janasnehi Karnataka & BBMP Sahaya Helpline 1533',
  },
  {
    region: 'Grassroots Telugu (Andhra Pradesh & Telangana Rural: Vijayawada, Guntur, Warangal, Karimnagar)',
    markers: ['cheppandi', 'unnaru', 'lekapothe', 'panulu', 'mandhi'],
    office: 'Spandana AP & Prajavani Telangana Grievance Redressal',
  },
  {
    region: 'Grassroots Malayalam & Manglish (Kerala: Malabar, Kozhikode, Kochi, Travancore)',
    markers: ['njangal', 'illa', 'cheyyuka', 'paranju'],
    office: 'CMO Kerala Sutharyakeralam & LSGD Ward Office',
  },
  {
    region: 'Grassroots Punjabi & Malwai/Majhi Mix (Punjab: Ludhiana, Amritsar, Bathinda, Jalandhar)',
    markers: ['sade pind', 'khaal', 'payi aa', 'sunn da ni'],
    office: 'Punjab CM Window & Rural Development Department',
  },
  {
    region: 'Grassroots Gujarati & Saurashtra/Surati (Gujarat: Ahmedabad, Surat, Rajkot, Bhavnagar)',
    markers: ['chhe', 'nathi', 'aave chhe', 'tamne', 'amne'],
    office: 'Gujarat CM Dashboard & SWAGAT Grievance Cell',
  },
];

const issueCategories = [
  {
    category: 'Drinking Water / Jal Jeevan',
    markers: ['paani', 'pani', 'water', 'thanni', 'neeru', 'pipeline', 'bore', 'nahar', 'handpump', 'nal'],
    department: 'Jal Shakti Vibhag / Public Health Engineering Department',
  },
  {
    category: 'Road & PWD Infrastructure',
    markers: ['sadak', 'road', 'firni', 'pothole', 'rasta', 'tractor', 'bridge'],
    department: 'Public Works Department (PWD) / PMGSY Rural Roads Cell',
  },
  {
    category: 'Electricity & Discom',
    markers: ['light', 'bijli', 'power', 'transformer', 'current', 'andhera', 'voltage'],
    department: 'State Electricity Distribution Co. (DISCOM)',
  },
  {
    category: 'Ration & PDS Supply',
    markers: ['ration', 'anaj', 'dealer', 'pds', 'bipl', 'kotihedar'],
    department: 'District Food & Civil Supplies Department',
  },
  {
    category: 'Civic Sanitation & Municipal Waste',
    markers: ['kachra', 'drain', 'nala', 'nali', 'waste', 'safai', 'garbage', 'sewer'],
    department: 'Municipal Sanitation Board / Gram Panchayat Swachhta Cell',
  },
  {
    category: 'Land Records & Revenue',
    markers: ['zameen', 'dakhil', 'kharij', 'patwari', 'anchal', 'mutation'],
    department: 'Tehsil / Anchal Karyalay & Revenue Department',
  },
  {
    category: 'Law & Order / Police',
    markers: ['police', 'chori', 'assault', 'crime'],
    department: 'Local Police Station',
  },
  {
    category: 'Healthcare & PHC',
    markers: ['hospital', 'doctor', 'dawai', 'swasthya', 'clinic', 'bimaari'],
    department: 'Chief Medical Officer (CMO) / Primary Health Centre',
  },
];

function findMatch(text: string, markers: string[]) {
  return markers.find((marker) => text.includes(marker));
}

export function getFallbackAnalysis(text: string): DialectAnalysisResult {
  const lower = text.toLowerCase();
  const dialect = dialects.find(({ markers }) => findMatch(lower, markers));
  const issue = issueCategories.find(({ markers }) => findMatch(lower, markers));
  const clue = dialect && findMatch(lower, dialect.markers);
  const category = issue?.category ?? 'General Civic Grievance';
  const department = issue?.department ?? 'District Collectorate Grievance Cell';
  const urgency: NonNullable<DialectAnalysisResult['urgency_level']> =
    ['accident', 'serious', 'emergency', 'epidemic', 'blast'].some((word) => lower.includes(word))
      ? 'Critical'
      : ['urgent', 'immediately', '3 mahina', 'months', 'danger'].some((word) => lower.includes(word))
        ? 'High'
        : 'Medium';

  return {
    predicted_region: dialect?.region ?? 'Bhojpuri & Purvanchali Hindi (Eastern UP & Western Bihar: Varanasi, Gorakhpur, Chhapra, Patna)',
    confidence: dialect ? 0.72 : 0.35,
    key_clues: clue ? [`'${clue}' (regional vocabulary marker)`] : ['Informal grassroots phrasing'],
    explanation: dialect
      ? `The text contains the regional marker '${clue}', which is commonly associated with this language community.`
      : 'No distinctive regional marker was recognized by the offline rules; verify the dialect manually.',
    routing_suggestion: `Forward to ${dialect?.office ?? 'the local District Collectorate'} (${department})`,
    secondary_dialects: [],
    linguistic_breakdown: {
      vocabulary_markers: clue ? [`'${clue}'`] : [],
      grammatical_features: ['Offline keyword-based classification; verify before routing.'],
      code_mixing_patterns: ['Regional language and civic terminology'],
      script_style: /[\u0900-\u097f]/.test(text) ? 'Devanagari / Mixed' : 'Roman script / Mixed',
    },
    detected_issue_category: category,
    urgency_level: urgency,
    standard_english_translation: `Offline rules classified this as a ${category.toLowerCase()} complaint. A human or AI-assisted translation is recommended.`,
    administrative_vernacular_summary: `नागरिक द्वारा ${category} से संबंधित शिकायत दर्ज की गई है। संबंधित विभाग द्वारा जांच अपेक्षित है।`,
  };
}
