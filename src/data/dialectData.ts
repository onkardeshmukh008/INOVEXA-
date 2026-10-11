import { DialectZoneInfo, GrievanceSample, BatchTicket, ProblemCategoryMeta } from '../types';

export const PROBLEM_CATEGORIES_META: ProblemCategoryMeta[] = [
  {
    id: 'Water & Pipeline',
    label: 'Water & Pipeline Problems',
    icon: 'Droplets',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    department: 'Jal Shakti Vibhag / PHED / Municipal Jal Board',
    defaultSLA: '24–48 Hours',
    description: 'Drinking water scarcity, pipe bursts, dried borewells, contaminated tankers, canal irrigation blockages.'
  },
  {
    id: 'Road & Infrastructure',
    label: 'Road & Infrastructure Problems',
    icon: 'Construction',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    department: 'Public Works Department (PWD) / Rural Roads (PMGSY)',
    defaultSLA: '3–5 Days',
    description: 'Potholes, broken village circular roads (firni), collapsed culverts, unpaved muddy approach roads.'
  },
  {
    id: 'Electricity & Power',
    label: 'Electricity & Power Problems',
    icon: 'Zap',
    badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    department: 'State Electricity Distribution Co. (DISCOM)',
    defaultSLA: '12–24 Hours',
    description: 'Blown phase transformers, continuous blackouts, dangling high-voltage lines, erratic voltage surges.'
  },
  {
    id: 'Sanitation & Waste',
    label: 'Sanitation & Waste Problems',
    icon: 'Trash2',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    department: 'Municipal Sanitation Board / Gram Panchayat Swachhta Cell',
    defaultSLA: '24 Hours',
    description: 'Overflowing open drains, uncleared chawl garbage, choked sewer lines, dengue/pest breeding.'
  },
  {
    id: 'Ration & Food Supply (PDS)',
    label: 'Ration & Food Supply Problems',
    icon: 'ShoppingBag',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
    department: 'Food & Civil Supplies Department / District Supply Office (DSO)',
    defaultSLA: '48 Hours',
    description: 'PDS dealer black-marketing, denial of monthly ration quota, biometric machine failure.'
  },
  {
    id: 'Land Records & Revenue',
    label: 'Land Records & Revenue Problems',
    icon: 'FileSpreadsheet',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    department: 'Revenue Department / Tehsil / Anchal Adhikari (Circle Officer)',
    defaultSLA: '7 Days',
    description: 'Unprocessed mutation (dakhil kharij), patwari bribery, contested land boundary records.'
  },
  {
    id: 'Healthcare & Nutrition',
    label: 'Health & Nutrition Problems',
    icon: 'HeartPulse',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    department: 'Chief Medical Officer (CMO) / Women & Child Development',
    defaultSLA: '24 Hours',
    description: 'Primary Health Centre doctor absent, emergency medicines stockout, Mid-Day Meal issues.'
  },
  {
    id: 'Civic Amenities & Safety',
    label: 'Civic Amenities & Safety',
    icon: 'Shield',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    department: 'Municipal Corporation / Local Police Station',
    defaultSLA: '48 Hours',
    description: 'Defunct streetlights causing night crimes, public encroachments, open utility pits.'
  }
];

export const DIALECT_ZONES: DialectZoneInfo[] = [
  {
    id: 'bhojpuri-purvanchal',
    name: 'Bhojpuri & Purvanchali Hindi',
    state: 'Eastern Uttar Pradesh & Western Bihar',
    keyHubs: ['Varanasi', 'Gorakhpur', 'Azamgarh', 'Chhapra', 'Bhojpur/Arrah', 'Siwan', 'Patna'],
    signatureMarkers: ['naikhe (negation)', 'ba / baate (copula)', 'humke / raur (pronouns)', 'ka bhail', 'kareke ba'],
    samplePhrase: 'Babu ji, gaon me paani naikhe aawat, pipeline tutal ba, kripya dekhal jaav.',
    sampleMeaning: 'Sir, water is not coming in the village, the pipeline is broken, please look into this.',
    nodalOffice: 'UP Jan Sunwai / Bihar Lok Shikayat Kendra (Patna & Varanasi)',
    helpline: '1076 (UP) / 1800-345-6284 (Bihar)'
  },
  {
    id: 'maithili-magahi',
    name: 'Maithili & Magahi',
    state: 'North & Central Bihar',
    keyHubs: ['Darbhanga', 'Madhubani', 'Samastipur', 'Saharsa', 'Gaya', 'Nalanda'],
    signatureMarkers: ['chhi / achhi (to be)', 'kichhu (something)', 'hamar aahan', 'kathi (what)', 'kene (where)'],
    samplePhrase: 'Hamaar dakhil kharij do mahina se atkal achhi, anchal adhikari kichhu suni nai chhi.',
    sampleMeaning: 'My land mutation has been stuck for two months, the circle officer listens to nothing.',
    nodalOffice: 'Bihar Rajya Lok Shikayat Nivaran Karyalaya (Darbhanga / Gaya)',
    helpline: '1800-345-6284'
  },
  {
    id: 'haryanvi-khari',
    name: 'Haryanvi & Western Hindi / Khari Boli',
    state: 'Haryana & Outer Delhi/NCR',
    keyHubs: ['Rohtak', 'Sonipat', 'Hisar', 'Jhajjar', 'Karnal', 'Bhiwani'],
    signatureMarkers: ['manne / tanne (to me/you)', 'se / su (is/am)', 'koni (not)', 'ke kar riya', 'gaam', 'berani'],
    samplePhrase: 'Mahre gaam ki firni aali sadak tootti padi se, tractor fas ja se, sarpanch sunta koni.',
    sampleMeaning: 'The circular boundary road of our village is completely broken, tractors get stuck, the Sarpanch does not listen.',
    nodalOffice: 'Haryana CM Window / District Grievance Committee (Rohtak & Hisar)',
    helpline: '1800-180-2090'
  },
  {
    id: 'braj-bundeli',
    name: 'Braj & Bundelkhandi',
    state: 'Western UP & Bundelkhand (MP/UP border)',
    keyHubs: ['Mathura', 'Agra', 'Jhansi', 'Banda', 'Mahoba', 'Gwalior', 'Chhatarpur'],
    signatureMarkers: ['hamare ite / ote', 'kahe ko', 'diyo / kiyo', 'kare raho', 'kachhu na bhayo', 'gire paro'],
    samplePhrase: 'Hamare ite nahar ko paani teen din se band paro hai, fasal sukhi rahi, kachhu to karo sarkar.',
    sampleMeaning: 'In our area the canal water has been shut off for three days, crops are drying up, do something sir.',
    nodalOffice: 'Bundelkhand Vikas Board & Jhansi Commissionerate Grievance Cell',
    helpline: '1076 (UP) / 181 (MP)'
  },
  {
    id: 'awadhi',
    name: 'Awadhi',
    state: 'Central Uttar Pradesh',
    keyHubs: ['Lucknow', 'Ayodhya', 'Barabanki', 'Rae Bareli', 'Sultanpur', 'Pratapgarh'],
    signatureMarkers: ['humke / mor (mine)', 'kaisan', 'hoi gawa (happened)', 'karat aahi', 'tuhu', 'ihva / ohva'],
    samplePhrase: 'Mor ration card banwaye teen mahina hoi gawa, kotihedar anaj nahi dehat aahi.',
    sampleMeaning: 'It has been three months since my ration card was approved, the PDS dealer is not giving grain.',
    nodalOffice: 'UP CM Helpline 1076 & Lucknow Municipal Grievance Cell',
    helpline: '1076'
  },
  {
    id: 'malwi-nimadi',
    name: 'Malwi & Nimadi',
    state: 'Madhya Pradesh (Malwa & Nimar)',
    keyHubs: ['Indore', 'Ujjain', 'Dewas', 'Ratlam', 'Khargone', 'Khandwa'],
    signatureMarkers: ['kayko (why)', 'ni aayo (did not come)', 'apne yahan', 'dekhiyo', 've log bola tha', 'karego'],
    samplePhrase: 'Apne yahan bijli ko roz ka locha hega, teen ghanta bina bole cut marte, kisan log pareshan.',
    sampleMeaning: 'Here we have daily electricity problems, 3 hours unannounced power cuts, farmers are suffering.',
    nodalOffice: 'MP CM Helpline 181 & Paschim Kshetra Vidyut Vitaran (Indore)',
    helpline: '181'
  },
  {
    id: 'bambaiya-marathi-hindi',
    name: 'Bambaiya / Tapori Colloquial Mix',
    state: 'Maharashtra (Mumbai MMR & Pune Urban Belt)',
    keyHubs: ['Mumbai', 'Thane', 'Navi Mumbai', 'Kalyan-Dombivli', 'Pune'],
    signatureMarkers: ['apun ko (to me)', 'rada / locha', 'aa rela / ja rela', 'mangta hai', 'ward officer', 'bawa'],
    samplePhrase: 'Apun ke galli me kachra ka bada rada ho gaya, do din se BMC gadi nahi aa reli, safai mangti hai boss.',
    sampleMeaning: 'There is huge garbage chaos in our lane, BMC truck has not arrived for 2 days, immediate cleanup is needed.',
    nodalOffice: 'Brihanmumbai Municipal Corporation (BMC) Ward Control & Aaple Sarkar',
    helpline: '1916 (BMC) / 1800-120-8040'
  },
  {
    id: 'deshastha-vidarbha-marathi',
    name: 'Deshastha / Vidarbha / Western Marathi',
    state: 'Maharashtra Interior & Vidarbha',
    keyHubs: ['Nagpur', 'Amravati', 'Kolhapur', 'Solapur', 'Nashik', 'Chhatrapati Sambhajinagar'],
    signatureMarkers: ['aamcha (our)', 'samashya', 'koni laksh det nahi', 'kharab rasta aahe', 'shaskiya kacheri', 'kaay te sanga'],
    samplePhrase: 'Aamchya gavachi pipe line phutli aahe, grampanchayat madhe sangun pan koni laksh det nahi.',
    sampleMeaning: 'Our village water pipeline is broken, despite informing the Gram Panchayat no one pays attention.',
    nodalOffice: 'Aaple Sarkar Grievance Redressal (District Collectorate Nagpur/Kolhapur)',
    helpline: '1800-120-8040'
  },
  {
    id: 'dakhni-hyderabadi',
    name: 'Dakhni / Hyderabadi Urdu-Hindi',
    state: 'Telangana & Hyderabad Deccan',
    keyHubs: ['Hyderabad Old City', 'Secunderabad', 'Warangal', 'Nizamabad', 'Gulbarga Border'],
    signatureMarkers: ['nakko (dont/no)', 'hau (yes)', 'mereku / unku', 'kare so kaam', 'nai aara ji', 'pottal', 'kayku'],
    samplePhrase: 'Bhai mereku do din se paani nai aara ji, GHMC valve man sunte hi nai, nakko bolo tension dera.',
    sampleMeaning: 'Brother, I haven’t received water for two days, GHMC valve operator doesn’t listen at all, causing huge stress.',
    nodalOffice: 'Prajavani Telangana & GHMC Citizens Grievance Redressal',
    helpline: '040-21111111 / 1100'
  },
  {
    id: 'kolkata-rarh-bengali',
    name: 'Kolkata & Rarh Colloquial Bengali',
    state: 'West Bengal',
    keyHubs: ['Kolkata', 'Howrah', 'Hooghly', 'North 24 Parganas', 'Bardhaman', 'Murshidabad'],
    signatureMarkers: ['amader ekhane (at our place)', 'jol asche na', 'rastar kharap obostha', 'panchayet pradhan', 'kono byabostha nei', 'didi ke bolo'],
    samplePhrase: 'Amader para te chaar din dhore tubewell kharap, drinking water-er kono byabostha nei, municipality shunche na.',
    sampleMeaning: 'In our neighborhood the tubewell has been broken for 4 days, no drinking water arrangement, municipality is unresponsive.',
    nodalOffice: 'Didi Ke Bolo / West Bengal Public Grievance Redressal (KMC / Howrah)',
    helpline: '9137091370 / 1800-345-5555'
  },
  {
    id: 'grassroots-tamil-tanglish',
    name: 'Grassroots Tamil & Tanglish',
    state: 'Tamil Nadu',
    keyHubs: ['Chennai', 'Madurai', 'Coimbatore', 'Tiruchirappalli', 'Salem', 'Tirunelveli'],
    signatureMarkers: ['enga area la', 'thanni varala', 'kappu rodu romba mosam', 'eb current cut', 'officer response illa', 'seekiram'],
    samplePhrase: 'Enga theru la street light 10 naal ah eriyala, night la safety problem irukku, eb office ketta no response.',
    sampleMeaning: 'In our street the streetlight has not been functioning for 10 days, severe safety hazard at night, EB office gives no response.',
    nodalOffice: 'Tamil Nadu CM Helpline (Mudalvarin Mugavari) & GCC Ward Control',
    helpline: '1100'
  },
  {
    id: 'grassroots-kannada-kanglish',
    name: 'Grassroots Kannada & Kanglish',
    state: 'Karnataka',
    keyHubs: ['Bengaluru', 'Mysuru', 'Hubballi-Dharwad', 'Belagavi', 'Mangaluru', 'Kalaburagi'],
    signatureMarkers: ['namma layout alli', 'neeru barthilla', 'road full gundi', 'ward member response illa', 'dayavittu nodi', 'bega'],
    samplePhrase: 'Namma cross road alli sewage drain overflow aagthide, vasane thaleloilla, BBMP helpline ge call madidre lift madthilla.',
    sampleMeaning: 'Sewage drain is overflowing on our cross road, unbearable odor, called BBMP helpline but they do not pick up.',
    nodalOffice: 'Janasnehi Karnataka / BBMP Sahaya Helpline Bengaluru',
    helpline: '1902 / 1533'
  },
  {
    id: 'grassroots-telugu',
    name: 'Grassroots Telugu',
    state: 'Andhra Pradesh & Telangana Rural',
    keyHubs: ['Vijayawada', 'Guntur', 'Visakhapatnam', 'Kurnool', 'Warangal', 'Karimnagar'],
    signatureMarkers: ['ma oorlo (in our village)', 'neellu ravadam ledu', 'current cut ekkuva', 'panchayat secretary ki cheppina', 'chudandi sir'],
    samplePhrase: 'Ma colony lo past one week nunchi drinking water supply ledu, bore motor kalipoyindi, ward volunteer pattinchukovadam ledu.',
    sampleMeaning: 'In our colony there has been no drinking water supply for a week, borewell motor burned out, ward volunteer is ignoring us.',
    nodalOffice: 'AP Spandana 1902 / Telangana Prajavani (District Collectorate Guntur/Vijayawada)',
    helpline: '1902 (AP) / 1100 (TG)'
  },
  {
    id: 'grassroots-malayalam-manglish',
    name: 'Grassroots Malayalam & Manglish',
    state: 'Kerala',
    keyHubs: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Kannur'],
    signatureMarkers: ['njangalude naattil', 'vellam varunnilla', 'road muzhuvan kuzhi', 'panchayathil paranju', 'oru theerumanam', 'ithuvare'],
    samplePhrase: 'Njangalude ward 4 il waste cleaning nadakkunnilla, thodu muzhuvan plastic niranju ozhukk thadassappettu, epidemic bhithi.',
    sampleMeaning: 'In our Ward 4 waste cleaning is not happening, canal is full of plastic and water flow blocked, risk of epidemic.',
    nodalOffice: 'CM Grievance Redressal Cell Kerala & Suchitwa Mission',
    helpline: '1076 / 1800-425-4257'
  },
  {
    id: 'grassroots-punjabi',
    name: 'Grassroots Punjabi & Malwai/Majhi Mix',
    state: 'Punjab',
    keyHubs: ['Ludhiana', 'Amritsar', 'Bathinda', 'Jalandhar', 'Patiala', 'Ferozepur'],
    signatureMarkers: ['sade pind ch', 'pani di samasya', 'bijli cut', 'sadak tuti payi aa', 'sarpanch sunn ni reha', 'kuch karo ji'],
    samplePhrase: 'Sade pind di gandi nali da paani raste te khad geya hai, bimaari failan da darr hai, sarpanch koi sunwai ni kar reha.',
    sampleMeaning: 'Dirty drain water is stagnating on the main village road, fear of disease outbreak, Sarpanch is doing no grievance hearing.',
    nodalOffice: 'Punjab CM Window / Rural Development & Panchayats Office Ludhiana',
    helpline: '1100'
  },
  {
    id: 'grassroots-gujarati',
    name: 'Grassroots Gujarati & Saurashtra/Surati',
    state: 'Gujarat',
    keyHubs: ['Ahmedabad', 'Surat', 'Rajkot', 'Bhavnagar', 'Vadodara', 'Junagadh'],
    signatureMarkers: ['amara gam ma / vistar ma', 'paani nathi aavtu', 'rasto bau kharab che', 'nagarpalika ma rajuaat', 'kain karyu nathi'],
    samplePhrase: 'Amara society pase drainage line chokup thai gayeli che, gandu paani rasta par aave che, nagarpalika ma 3 vakhat complaint kari pan kain thayu nathi.',
    sampleMeaning: 'Drainage line near our society is choked up, dirty sewage spilling onto the road, complained 3 times to Nagarpalika but nothing done.',
    nodalOffice: 'SWAGAT Online Grievance Redressal System & Municipal Corporation Rajkot/Surat',
    helpline: '1800-233-5500'
  }
];

export const PRESET_GRIEVANCES: GrievanceSample[] = [
  {
    id: 'bhojpuri-water',
    title: 'Purvanchal: Village Drinking Pipeline Rupture',
    region: 'Bhojpuri & Purvanchali Hindi',
    category: 'Drinking Water / Jal Jeevan',
    script: 'Romanized / Code-mixed',
    text: 'Babu ji, hamre tola me chaar din se paani naikhe aawat. Sarkar pipeline bichaai ke gail baaki ab tutal baate, sab log handpump khatir lad rahal ba. Kripya dhyan dehal jaav.',
    description: 'Bhojpuri phonetic markers: "naikhe aawat", "tutal baate", "hamre tola", "lad rahal ba".'
  },
  {
    id: 'haryanvi-road',
    title: 'Haryana: Tractor Access Road Submerged',
    region: 'Haryanvi & Western Hindi / Khari Boli',
    category: 'Road & PWD Infrastructure',
    script: 'Romanized / Code-mixed',
    text: 'Manne do baar tehsil me application de li par koi sunta koni. Mahre gaam ki kacchi firni me paani bhar gya se, tractor nikalna mushkil ho rya se. Agle hafte gehu nikalna se, jaldi theek karwao.',
    description: 'Haryanvi markers: "manne", "koni", "mahre gaam", "firni", "ho rya se", "gehu nikalna se".'
  },
  {
    id: 'hyderabadi-power',
    title: 'Hyderabad Deccan: Blown Transformer in Basti',
    region: 'Dakhni / Hyderabadi Urdu-Hindi',
    category: 'Electricity & Discom',
    script: 'Romanized / Code-mixed',
    text: 'Arre bhai mereku samajh me nai aara line man kya karra. Gali ka transformer ud gaya toh teen din se andhera hai basti me, light aane ka naam nai le ri. Bacche padh nai sakre, nakko bolo tension! Jaldi naya lagao ji.',
    description: 'Dakhni markers: "mereku", "nai aara", "nai le ri", "nai sakre", "nakko bolo", "ji".'
  },
  {
    id: 'mumbai-garbage',
    title: 'Mumbai MMR: Commercial Slum Waste Overflow',
    region: 'Bambaiya / Tapori Colloquial Mix',
    category: 'Civic Sanitation & Municipal Waste',
    script: 'Romanized / Code-mixed',
    text: 'Boss apun ke chawl ke naake pe kachra ka bada rada ho rela hai. Kachra gaadi wala aana bandh kar diya hai, pura kida ghoom rela hai. Ward officer ko bola toh bolta tenders ka issue chal raha hai, apun ko ye sab nahi mangta safai karao pehle.',
    description: 'Bambaiya markers: "apun ke chawl", "rada ho rela", "kachra gaadi wala", "nahi mangta".'
  },
  {
    id: 'maithili-mutation',
    title: 'Mithila: Land Registry Mutation Harassment',
    region: 'Maithili & Magahi',
    category: 'Land Records & Revenue',
    script: 'Romanized / Code-mixed',
    text: 'Hamaar babu ji ke naam par zameen chhi, daakhil kharij aavedan teen mahina se anchal karyalay me atkal achhi. Karamchari bina ghus ke aage kagaz barhaiye nai chhi. Hum garib manukh kene jaai?',
    description: 'Maithili markers: "hamaar", "zameen chhi", "atkal achhi", "barhaiye nai chhi", "garib manukh", "kene jaai".'
  },
  {
    id: 'tamil-drainage',
    title: 'Tamil Nadu: Stormwater Drain Choke & Health Scare',
    region: 'Grassroots Tamil & Tanglish',
    category: 'Civic Sanitation & Municipal Waste',
    script: 'Romanized / Code-mixed',
    text: 'Enga area ward 12 la mazhai thanni vadiya maatikithu. Kaalvai full ah garbage potu adaichu vachurukanga. Kosu thollai thanga mudiyala, sanitary inspector ta sonna response illa. Udane jcb vachi clean pannanum sir.',
    description: 'Tanglish markers: "enga area la", "thanni vadiya maatikithu", "adaichu vachurukanga", "kosu thollai thanga mudiyala", "pannanum".'
  },
  {
    id: 'bengali-pds',
    title: 'Bengal: Village Ration Dealer Malpractice',
    region: 'Kolkata & Rarh Bengali',
    category: 'Ration & PDS Supply',
    script: 'Romanized / Code-mixed',
    text: 'Amader gramer ration dealer bolche e masher chal ar gom ashe ni, bipl card thakleo kichhu dicche na. Dealer openly black market e beche dicche. BDO office e janano hoyechilo kintu kono tatporota nei. Doya kore action nin.',
    description: 'Colloquial Bengali markers: "amader gramer", "ashe ni", "kichhu dicche na", "janano hoyechilo", "kono tatporota nei".'
  },
  {
    id: 'punjabi-canal',
    title: 'Punjab: Irrigation Canal Siltation & Tail End Crisis',
    region: 'Grassroots Punjabi & Malwai/Majhi Mix',
    category: 'Drinking Water / Jal Jeevan',
    script: 'Romanized / Code-mixed',
    text: 'Sade pind de khetan nu nehri paani di vaari bilkul band hoyi payi aa. Khaal vich bhal bhar gayi aa te pichhle kisan paani chori kar rahe ne. SDO nahari vibhag nu dasya si par koi banda site te ni aaya. Fasal da nuksaan ho reha.',
    description: 'Punjabi markers: "sade pind de", "hoyi payi aa", "khaal vich", "dasya si", "banda site te ni aaya", "ho reha".'
  },
  {
    id: 'kannada-streetlights',
    title: 'Karnataka: Rural Crossroad Darkness & Accidents',
    region: 'Grassroots Kannada & Kanglish',
    category: 'Electricity & Discom',
    script: 'Romanized / Code-mixed',
    text: 'Namma village bus stop hathira street light on aagolla, thumba darkness iruthe. Ninne rathri illi bike accident aagi orva manushya serious aagidane. Panchayat secretary ge 10 times helidru bedi nodona antha heloodu bittu enu madilla. Bega repair madi.',
    description: 'Kanglish markers: "namma village", "on aagolla", "thumba darkness", "serious aagidane", "helidru", "bega repair madi".'
  },
  {
    id: 'devanagari-awadhi',
    title: 'Awadhi (Devanagari): Primary School Mid-Day Meal',
    region: 'Awadhi',
    category: 'Healthcare & PHC',
    script: 'Devanagari',
    text: 'साहेब हमारे गाँव के प्राथमिक विद्यालय म मध्यान भोजन कई दिन से नहीं बन रहा बा। मास्टर साहब कहत अहँ कि राशन नहीं आवा। लरिकन भूखे पेट लौटि जात अहँ। ई पर तुरन्त जाँच करवावा जाय।',
    description: 'Awadhi Devanagari markers: "गाँव के प्राथमिक विद्यालय म", "कहत अहँ", "लरिकन", "लौटि जात अहँ", "करवावा जाय".'
  }
];

export const INITIAL_BATCH_TICKETS: BatchTicket[] = [
  {
    id: 'TCK-2026-101',
    citizenName: 'Ramprasad Bind (Mirzapur)',
    channel: 'SMS Portal',
    submittedAt: 'Today, 08:30 AM',
    rawText: 'Hamre tola me chaar din se paani naikhe aawat, pipeline tutal baate, jaldi banwao.',
    status: 'Triaged',
    result: {
      predicted_region: 'Bhojpuri & Purvanchali Hindi (Eastern UP & Western Bihar: Varanasi, Gorakhpur, Chhapra, Patna)',
      confidence: 0.98,
      key_clues: ['naikhe aawat', 'tutal baate', 'hamre tola'],
      explanation: 'Hallmark Bhojpuri negation "naikhe" with stative copula "baate" and village settlement unit "tola".',
      routing_suggestion: 'Forward to local office in District Collectorate / Jal Sansthan Mirzapur',
      detected_issue_category: 'Water & Pipeline',
      urgency_level: 'High',
      standard_english_translation: 'Water has not been arriving in our village hamlet for four days; the pipeline is broken, please repair quickly.'
    }
  },
  {
    id: 'TCK-2026-102',
    citizenName: 'Jagdish Hooda (Rohtak)',
    channel: 'Gram Panchayat Kiosk',
    submittedAt: 'Today, 08:45 AM',
    rawText: 'Mahre gaam ki firni aali sadak tootti padi se, tractor fas ja se, sarpanch sunta koni.',
    status: 'Triaged',
    result: {
      predicted_region: 'Haryanvi & Western Hindi / Khari Boli (Haryana & NCR Outskirts: Rohtak, Sonipat, Hisar)',
      confidence: 0.97,
      key_clues: ['mahre gaam', 'firni aali sadak', 'se (copula)', 'sunta koni'],
      explanation: 'Signature Haryanvi pronominal "mahre", village perimeter road term "firni", copula "se", and negation "koni".',
      routing_suggestion: 'Forward to local office in CM Window Haryana / PWD & Panchayati Raj Office Rohtak',
      detected_issue_category: 'Road & Infrastructure',
      urgency_level: 'High',
      standard_english_translation: 'The boundary ring road of our village is completely broken, tractors get stuck, the village head refuses to listen.'
    }
  },
  {
    id: 'TCK-2026-103',
    citizenName: 'Mohammed Imtiaz (Charminar)',
    channel: '181 Helpline IVR',
    submittedAt: 'Today, 09:15 AM',
    rawText: 'Arre bhai mereku samajh me nai aara gali ka transformer ud gaya toh teen din se andhera hai basti me, bacche padh nai sakre, nakko bolo tension!',
    status: 'Triaged',
    result: {
      predicted_region: 'Dakhni / Hyderabadi Urdu-Hindi (Telangana & Hyderabad Deccan, Gulbarga border)',
      confidence: 0.96,
      key_clues: ['mereku (dative pronoun)', 'ud gaya', 'nakko bolo (Deccan negation)', 'sakre'],
      explanation: 'Classic Deccan markers: "mereku", prohibitive "nakko", and verbal inflection "sakre".',
      routing_suggestion: 'Forward to local office in TSSPDCL Electric Sub-Station & Prajavani Cell Hyderabad',
      detected_issue_category: 'Electricity & Power',
      urgency_level: 'Critical',
      standard_english_translation: 'The lane transformer blew out three days ago causing complete darkness in our settlement, children cannot study, severe distress.'
    }
  },
  {
    id: 'TCK-2026-104',
    citizenName: 'Mangesh Patil (Dharavi Ward G/N)',
    channel: 'WhatsApp Bot',
    submittedAt: 'Today, 09:30 AM',
    rawText: 'Apun ke galli me kachra ka bada rada ho gaya, do din se BMC gadi nahi aa reli, safai mangti hai boss.',
    status: 'Triaged',
    result: {
      predicted_region: 'Bambaiya / Tapori Colloquial Mix (Mumbai Metropolitan Region & Pune)',
      confidence: 0.95,
      key_clues: ['apun ke galli', 'rada (dispute/chaos)', 'aa reli (-reli aspect)', 'safai mangti hai'],
      explanation: 'Quintessential Bambaiya dialect markers: "apun", slang "rada", participial ending "-reli", and modal "mangti".',
      routing_suggestion: 'Forward to local office in Brihanmumbai Municipal Corporation (BMC) Ward G/North Office',
      detected_issue_category: 'Sanitation & Waste',
      urgency_level: 'High',
      standard_english_translation: 'There is huge garbage chaos in our lane, BMC collection van hasn\'t come for 2 days, urgent cleanup needed.'
    }
  },
  {
    id: 'TCK-2026-105',
    citizenName: 'Subir Mondal (Bardhaman)',
    channel: 'SMS Portal',
    submittedAt: 'Today, 09:50 AM',
    rawText: 'Amader gramer ration dealer bolche e masher chal ar gom ashe ni, bipl card thakleo kichhu dicche na, dealer black market e beche dicche.',
    status: 'Triaged',
    result: {
      predicted_region: 'Kolkata & Rarh Bengali (West Bengal: Kolkata, Howrah, Hooghly, 24 Parganas, Bardhaman)',
      confidence: 0.96,
      key_clues: ['amader gramer', 'ashe ni (negation)', 'kichhu dicche na', 'chal ar gom'],
      explanation: 'Standard colloquial Rarh Bengali pronominal "amader" and negation morphemes "ni" and "na".',
      routing_suggestion: 'Forward to local office in BDO Office & District Food & Supplies Controller Bardhaman',
      detected_issue_category: 'Ration & Food Supply (PDS)',
      urgency_level: 'Critical',
      standard_english_translation: 'Our village PDS dealer claims rice and wheat have not arrived; denying quota despite BPL card and black-marketing grain.'
    }
  },
  {
    id: 'TCK-2026-106',
    citizenName: 'Jibachh Jha (Madhubani)',
    channel: 'Gram Panchayat Kiosk',
    submittedAt: 'Today, 10:15 AM',
    rawText: 'Hamaar babu ji ke naam par zameen chhi, daakhil kharij aavedan teen mahina se anchal karyalay me atkal achhi, karamchari bina ghus ke aage nai barhaiye chhi.',
    status: 'Triaged',
    result: {
      predicted_region: 'Maithili & Magahi (North & Central Bihar: Darbhanga, Madhubani, Samastipur, Gaya)',
      confidence: 0.97,
      key_clues: ['hamaar babu ji', 'zameen chhi', 'atkal achhi', 'nai barhaiye chhi'],
      explanation: 'Distinctive Mithila copula "chhi / achhi", possessive "hamaar", and revenue terms "daakhil kharij".',
      routing_suggestion: 'Forward to local office in Anchal Karyalay (Circle Office) & District Grievance Officer Madhubani',
      detected_issue_category: 'Land Records & Revenue',
      urgency_level: 'Medium',
      standard_english_translation: 'The land is in my father\'s name, mutation application has been delayed for 3 months at the circle office due to staff demanding bribes.'
    }
  },
  {
    id: 'TCK-2026-107',
    citizenName: 'Selvamurugan (Madurai South)',
    channel: 'WhatsApp Bot',
    submittedAt: 'Today, 10:40 AM',
    rawText: 'Enga area ward 12 la street light 10 naal ah eriyala, night la safety romba mosam, potholes road la accidents aaguthu.',
    status: 'Triaged',
    result: {
      predicted_region: 'Grassroots Tamil & Tanglish (Tamil Nadu: Chennai, Madurai, Coimbatore, Tiruchirappalli)',
      confidence: 0.95,
      key_clues: ['enga area', 'naal ah eriyala (negation)', 'romba mosam', 'accidents aaguthu'],
      explanation: 'Tanglish administrative syntax mixing "enga area", Tamil intensifier "romba", and verbal negation "eriyala".',
      routing_suggestion: 'Forward to local office in Madurai Corporation Ward 12 Office & TANGEDCO EB Cell',
      detected_issue_category: 'Civic Amenities & Safety',
      urgency_level: 'High',
      standard_english_translation: 'Street lights in Ward 12 have not been burning for 10 days, severe night safety issue with potholes causing vehicle accidents.'
    }
  },
  {
    id: 'TCK-2026-108',
    citizenName: 'Baldev Singh Dhillon (Moga)',
    channel: 'WhatsApp Bot',
    submittedAt: 'Today, 11:00 AM',
    rawText: 'Sade pind ch nali da paani raste te khad geya hai, bimaari failan da darr hai, sarpanch koi sunwai ni kar reha.',
    status: 'Pending'
  },
  {
    id: 'TCK-2026-109',
    citizenName: 'Kaveriamma (Hubballi Rural)',
    channel: '181 Helpline IVR',
    submittedAt: 'Today, 11:20 AM',
    rawText: 'Namma village bus stop hathira road full gundi aagide, ninne bus breakdown aaythu, PWD avaru enu madilla.',
    status: 'Pending'
  }
];
