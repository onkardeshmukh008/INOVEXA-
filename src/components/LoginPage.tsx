import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  User,
  Building2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { UserProfile } from '../types';
import { DEFAULT_DEMO_USERS } from '../data/mockUsers';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onGoToSignUp: () => void;
  onContinueAsGuest: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onGoToSignUp,
  onContinueAsGuest
}) => {
  const [identifier, setIdentifier] = useState('rajesh.bind@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setError('Please provide your registered Email or Mobile Number and Password.');
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      // Find matching demo user or create a session
      const matched = DEFAULT_DEMO_USERS.find(
        (u) =>
          u.email.toLowerCase() === identifier.toLowerCase().trim() ||
          u.phone.includes(identifier.trim())
      );

      if (matched) {
        onLoginSuccess(matched);
      } else {
        // Create custom user on the fly
        const customUser: UserProfile = {
          id: `USR-2026-${Math.floor(100 + Math.random() * 900)}`,
          name: identifier.split('@')[0].replace(/[._]/g, ' ').toUpperCase(),
          email: identifier.includes('@') ? identifier.trim() : `${identifier.trim()}@citizen.jansetu.gov.in`,
          phone: identifier.startsWith('+') || /^\d+$/.test(identifier) ? identifier : '+91 98765 43210',
          role: 'citizen',
          state: 'Uttar Pradesh',
          district: 'Varanasi',
          preferredLanguage: 'Bhojpuri & Purvanchali Hindi',
          createdAt: 'Just now',
          complaintsLodgedCount: 1,
          resolvedComplaintsCount: 0
        };
        onLoginSuccess(customUser);
      }
      setLoading(false);
    }, 400);
  };

  const handleSelectDemoUser = (user: UserProfile) => {
    setIdentifier(user.email);
    setPassword('password123');
    onLoginSuccess(user);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Brand & Benefits */}
        <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 via-amber-950 to-orange-950 text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-orange-600 flex items-center justify-center font-bold text-white shadow-md">
                J
              </div>
              <div>
                <span className="font-serif font-bold text-xl tracking-tight">JanSetu</span>
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  जनसेतु
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-white leading-tight">
                Citizen Portal & Administrative Login
              </h2>
              <p className="text-xs text-stone-300 leading-relaxed">
                Log in to file grievances in your mother tongue, track municipal problem tickets in real time, and view jurisdictional routing slips.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-stone-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Submit complaints in Bhojpuri, Haryanvi, Tanglish, or any regional dialect.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-stone-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Automated problem segregation to Jal Sansthan, PWD, and DISCOM.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-stone-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Live SMS and WhatsApp docket tracking with SLA guarantees.</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/10 text-[11px] text-stone-400">
            Integrated with National CPGRAMS & State Lok Shikayat Cells.
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-8 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">
                  Welcome to JanSetu
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Enter your credentials to access your citizen dashboard.
                </p>
              </div>
              <span className="p-2 bg-orange-50 text-orange-700 rounded-xl border border-orange-200">
                <ShieldCheck className="h-5 w-5" />
              </span>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-stone-700 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-stone-500" />
                  <span>Email or Mobile Number:</span>
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. rajesh.bind@gmail.com or +91 98391 44521"
                  className="w-full border border-stone-300 rounded-xl p-3 text-stone-900 bg-stone-50 text-xs focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-stone-700 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-stone-500" />
                    <span>Password:</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Demo password is "password123"')}
                    className="text-[11px] text-orange-600 hover:text-orange-800 font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full border border-stone-300 rounded-xl p-3 pr-10 text-stone-900 bg-stone-50 text-xs focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-md shadow-orange-600/25 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                {loading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Sign In to JanSetu</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Logins */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                Quick 1-Click Demo Profiles:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectDemoUser(DEFAULT_DEMO_USERS[0])}
                  className="p-2.5 rounded-xl border border-stone-200 hover:border-orange-400 bg-stone-50 hover:bg-orange-50/50 text-left transition-colors flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-xs shrink-0">
                    RB
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-semibold text-xs text-stone-900 truncate">Rajeshwar Bind</div>
                    <div className="text-[10px] text-stone-500 truncate">Citizen (Mirzapur, UP)</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectDemoUser(DEFAULT_DEMO_USERS[1])}
                  className="p-2.5 rounded-xl border border-stone-200 hover:border-orange-400 bg-stone-50 hover:bg-orange-50/50 text-left transition-colors flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0">
                    PK
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-semibold text-xs text-stone-900 truncate">Dr. Priya Kulkarni</div>
                    <div className="text-[10px] text-stone-500 truncate">Officer (BMC Ward G/N)</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Footer switches */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs">
            <span className="text-stone-500">Don't have an account?</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onContinueAsGuest}
                className="text-stone-600 hover:text-stone-900 underline font-medium"
              >
                Guest Mode
              </button>
              <button
                type="button"
                onClick={onGoToSignUp}
                className="font-bold text-orange-600 hover:text-orange-700 underline"
              >
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
