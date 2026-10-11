export type ProblemCategoryType =
  | 'Water & Pipeline'
  | 'Road & Infrastructure'
  | 'Electricity & Power'
  | 'Sanitation & Waste'
  | 'Ration & Food Supply (PDS)'
  | 'Land Records & Revenue'
  | 'Healthcare & Nutrition'
  | 'Civic Amenities & Safety'
  | 'General Grievance';

export interface ProblemCategoryMeta {
  id: ProblemCategoryType;
  label: string;
  icon: string;
  badgeColor: string;
  department: string;
  defaultSLA: string;
  description: string;
}

export interface DialectAnalysisResult {
  predicted_region: string;
  confidence: number;
  key_clues: string[];
  explanation: string;
  routing_suggestion: string;
  secondary_dialects?: string[];
  linguistic_breakdown?: {
    vocabulary_markers: string[];
    grammatical_features: string[];
    code_mixing_patterns: string[];
    script_style: string;
  };
  detected_issue_category?: string;
  urgency_level?: 'Low' | 'Medium' | 'High' | 'Critical';
  standard_english_translation?: string;
  administrative_vernacular_summary?: string;
}

export interface GrievanceSample {
  id: string;
  title: string;
  region: string;
  category: string;
  script: 'Romanized / Code-mixed' | 'Devanagari' | 'Vernacular';
  text: string;
  description: string;
}

export interface DialectZoneInfo {
  id: string;
  name: string;
  state: string;
  keyHubs: string[];
  signatureMarkers: string[];
  samplePhrase: string;
  sampleMeaning: string;
  nodalOffice: string;
  helpline: string;
}

export interface BatchTicket {
  id: string;
  citizenName: string;
  channel: 'WhatsApp Bot' | 'SMS Portal' | 'Gram Panchayat Kiosk' | '181 Helpline IVR';
  submittedAt: string;
  rawText: string;
  status: 'Pending' | 'Triaged' | 'Routed';
  result?: DialectAnalysisResult;
}

export type UserRole = 'citizen' | 'officer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  state: string;
  district: string;
  preferredLanguage: string;
  avatarUrl?: string;
  createdAt: string;
  complaintsLodgedCount: number;
  resolvedComplaintsCount: number;
  darkMode?: boolean;
}
