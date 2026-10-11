import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building2,
  Languages
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { DIALECT_ZONES } from '../data/dialectData';

interface SignUpPageProps {
  onSignUpSuccess: (user: UserProfile) => void;
  onGoToLogin: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  onSignUpSuccess,
  onGoToLogin
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('citizen');
  const [state, setState] = useState('Uttar Pradesh');
  const [district, setDistrict] = useState('Varanasi');
  const [preferredLanguage, setPreferredLanguage] = useState(DIALECT_ZONES[0].name);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newUser: UserProfile = {
        id: `USR-2026-${Math.floor(100 + Math.random() * 900)}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim().startsWith('+91') ? phone.trim() : `+91 ${phone.trim()}`,
        role: role,
        state: state,
        district: district.trim(),
        preferredLanguage: preferredLanguage,
        createdAt: 'October 2026',
        complaintsLodgedCount: 0,
        resolvedComplaintsCount: 0
      };

      onSignUpSuccess(newUser);
      setLoading(false);
    }, 500);
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
                Create Your Citizen or Officer Account
              </h2>
              <p className="text-xs text-stone-300 leading-relaxed">
                Connect your voice directly to district collectors, municipal engineers, and public grievance officers across India.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-stone-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero language barrier: File complaints in spoken vernacular phrases.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-stone-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Automatic jurisdictional routing to Jal Sansthan, PWD, and Electricity cells.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-stone-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Track complaint progress and resolution dockets in your personal profile.</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/10 text-[11px] text-stone-400">
            Complies with Digital India Citizen Redressal Standards.
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Sign Up for JanSetu
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Fill in your details to get your verified citizen credentials.
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
            {/* Account Type Switcher */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-stone-700">Account Type:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('citizen')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    role === 'citizen'
                      ? 'bg-orange-50 border-orange-600 text-orange-900 ring-1 ring-orange-600'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Grassroots Citizen</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('officer')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    role === 'officer'
                      ? 'bg-orange-50 border-orange-600 text-orange-900 ring-1 ring-orange-600'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <Building2 className="h-4 w-4" />
                  <span>Municipal / Grievance Officer</span>
                </button>
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 flex items-center gap-1">
                  <User className="h-3 w-3 text-stone-500" />
                  <span>Full Name:</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 flex items-center gap-1">
                  <Phone className="h-3 w-3 text-stone-500" />
                  <span>Mobile Number:</span>
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 98765 43210"
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1 text-xs">
              <label className="font-bold text-stone-700 flex items-center gap-1">
                <Mail className="h-3 w-3 text-stone-500" />
                <span>Email Address:</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. citizen@example.com"
                className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* State & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-stone-500" />
                  <span>State:</span>
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-xs"
                >
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 flex items-center gap-1">
                  <span>District / Taluka:</span>
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Gorakhpur / Ward 12"
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-xs"
                />
              </div>
            </div>

            {/* Preferred Dialect */}
            <div className="space-y-1 text-xs">
              <label className="font-bold text-stone-700 flex items-center gap-1">
                <Languages className="h-3 w-3 text-stone-500" />
                <span>Preferred Regional Language / Dialect:</span>
              </label>
              <select
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-xs"
              >
                {DIALECT_ZONES.map((zone) => (
                  <option key={zone.id} value={zone.name}>
                    {zone.name} ({zone.state})
                  </option>
                ))}
              </select>
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 flex items-center gap-1">
                  <Lock className="h-3 w-3 text-stone-500" />
                  <span>Password:</span>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 flex items-center gap-1">
                  <Lock className="h-3 w-3 text-stone-500" />
                  <span>Confirm Password:</span>
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-md shadow-orange-600/25 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              {loading ? (
                <span>Registering Account...</span>
              ) : (
                <>
                  <span>Create JanSetu Account</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer switch */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs">
            <span className="text-stone-500">Already registered on JanSetu?</span>
            <button
              type="button"
              onClick={onGoToLogin}
              className="font-bold text-orange-600 hover:text-orange-700 underline"
            >
              Sign In Instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
