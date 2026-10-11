import { UserProfile } from '../types';

export const DEFAULT_DEMO_USERS: UserProfile[] = [
  {
    id: 'USR-2026-901',
    name: 'Rajeshwar Bind',
    email: 'rajesh.bind@gmail.com',
    phone: '+91 98391 44521',
    role: 'citizen',
    state: 'Uttar Pradesh',
    district: 'Mirzapur',
    preferredLanguage: 'Bhojpuri & Purvanchali Hindi',
    createdAt: 'January 2026',
    complaintsLodgedCount: 3,
    resolvedComplaintsCount: 2
  },
  {
    id: 'USR-2026-902',
    name: 'Dr. Priya S. Kulkarni',
    email: 'priya.kulkarni@bmc.gov.in',
    phone: '+91 98200 78219',
    role: 'officer',
    state: 'Maharashtra',
    district: 'Mumbai (BMC Ward G/North)',
    preferredLanguage: 'Bambaiya / Marathi',
    createdAt: 'November 2025',
    complaintsLodgedCount: 14,
    resolvedComplaintsCount: 11
  },
  {
    id: 'USR-2026-903',
    name: 'Baldev Singh Dhillon',
    email: 'baldev.dhillon@yahoo.co.in',
    phone: '+91 94172 33810',
    role: 'citizen',
    state: 'Punjab',
    district: 'Moga',
    preferredLanguage: 'Grassroots Punjabi',
    createdAt: 'February 2026',
    complaintsLodgedCount: 2,
    resolvedComplaintsCount: 1
  }
];

const STORAGE_KEY = 'jansetu_auth_user';
const THEME_KEY = 'jansetu_dark_mode';

export function getStoredTheme(): boolean {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved !== null) {
      return saved === 'true';
    }
  } catch (err) {
    console.error('Failed to get stored theme:', err);
  }
  return false;
}

export function setStoredTheme(isDark: boolean): void {
  try {
    localStorage.setItem(THEME_KEY, isDark ? 'true' : 'false');
  } catch (err) {
    console.error('Failed to set stored theme:', err);
  }
}

export function getStoredUser(): UserProfile | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to parse stored user:', err);
  }
  // Default to the first citizen demo user so the app is immediately interactive!
  return DEFAULT_DEMO_USERS[0];
}

export function setStoredUser(user: UserProfile | null): void {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (err) {
    console.error('Failed to save stored user:', err);
  }
}
