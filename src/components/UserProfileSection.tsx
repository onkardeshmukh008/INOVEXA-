import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Languages,
  ShieldCheck,
  Calendar,
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  LogOut,
  Edit2,
  Save,
  Bell,
  Building2,
  Layers,
  Sparkles,
  ExternalLink,
  Moon,
  Sun,
  Palette,
  Image,
  Check
} from 'lucide-react';
import { UserProfile, BatchTicket } from '../types';
import { DIALECT_ZONES } from '../data/dialectData';
import jansetuBg from '../assets/images/jansetu_background_1791711709017.jpg';

interface UserProfileSectionProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onLogout: () => void;
  onLodgeNewComplaint: () => void;
  onInspectComplaint: (text: string) => void;
  tickets: BatchTicket[];
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  user,
  onUpdateUser,
  onLogout,
  onLodgeNewComplaint,
  onInspectComplaint,
  tickets,
  isDarkMode = false,
  onToggleDarkMode
}) => {
  const [activeTab, setActiveTab] = useState<'complaints' | 'edit' | 'preferences' | 'notifications'>('complaints');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editPhone, setEditPhone] = useState(user.phone);
  const [editDistrict, setEditDistrict] = useState(user.district);
  const [editLanguage, setEditLanguage] = useState(user.preferredLanguage);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filter complaints associated with this user or relevant to district
  const userComplaints = tickets.slice(0, 3);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...user,
      name: editName.trim(),
      phone: editPhone.trim(),
      district: editDistrict.trim(),
      preferredLanguage: editLanguage,
      darkMode: isDarkMode
    };
    onUpdateUser(updated);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleThemeToggle = () => {
    if (onToggleDarkMode) {
      onToggleDarkMode();
    }
    const updated: UserProfile = {
      ...user,
      darkMode: !isDarkMode
    };
    onUpdateUser(updated);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Hero Card */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-white/10">
        <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-2xl font-serif font-bold shadow-lg border-2 border-white/20 shrink-0">
              {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  {user.name}
                </h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  user.role === 'officer'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                }`}>
                  {user.role === 'officer' ? 'Nodal Grievance Officer' : 'Verified Citizen'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-700/60 text-amber-200 border border-amber-400/20 flex items-center gap-1">
                  {isDarkMode ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
                  <span>{isDarkMode ? 'Dark Theme' : 'Light Theme'}</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-300">
                <span className="font-mono text-amber-300">ID: {user.id}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-orange-400" />
                  {user.district}, {user.state}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Languages className="h-3.5 w-3.5 text-orange-400" />
                  {user.preferredLanguage.split('(')[0]}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Quick Dark Mode Toggle Button */}
            <button
              onClick={handleThemeToggle}
              className={`px-3.5 py-2.5 rounded-xl font-semibold text-xs border flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
                isDarkMode
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 hover:bg-amber-400/30 shadow-amber-400/10'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <>
                  <Sun className="h-4 w-4 text-amber-300 animate-spin-slow" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-stone-200" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            <button
              onClick={onLodgeNewComplaint}
              className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-md shadow-orange-600/30 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Lodge Complaint</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Sign Out of Session"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Profile and theme preferences updated successfully!</span>
        </div>
      )}

      {/* Quick Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-xs transition-colors">
          <div className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Total Complaints Lodged
          </div>
          <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            {user.complaintsLodgedCount || 3}
          </div>
          <div className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5">Assigned to district cells</div>
        </div>

        <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-xs transition-colors">
          <div className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Resolved & Closed
          </div>
          <div className="text-2xl font-serif font-bold text-emerald-700 dark:text-emerald-400 mt-1">
            {user.resolvedComplaintsCount || 2}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">67% Resolution Rate</div>
        </div>

        <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-xs transition-colors">
          <div className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Active in Queue
          </div>
          <div className="text-2xl font-serif font-bold text-amber-700 dark:text-amber-400 mt-1">
            1
          </div>
          <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-0.5">SLA Under 24h</div>
        </div>

        <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-xs transition-colors">
          <div className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Registered Since
          </div>
          <div className="text-base font-serif font-bold text-stone-800 dark:text-stone-200 mt-2">
            {user.createdAt}
          </div>
          <div className="text-[10px] text-stone-400 dark:text-stone-500">Verified Citizen Account</div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-stone-200 dark:border-stone-800 gap-6 text-xs font-semibold overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('complaints')}
          className={`pb-3 flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'complaints'
              ? 'border-b-2 border-orange-600 text-orange-700 dark:text-orange-400 font-bold'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>My Filed Complaints ({userComplaints.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`pb-3 flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'preferences'
              ? 'border-b-2 border-orange-600 text-orange-700 dark:text-orange-400 font-bold'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          {isDarkMode ? <Moon className="h-4 w-4 text-amber-400" /> : <Sun className="h-4 w-4 text-orange-500" />}
          <span>Dark Mode & Appearance</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
            isDarkMode ? 'bg-amber-400/20 text-amber-300' : 'bg-orange-100 text-orange-700'
          }`}>
            {isDarkMode ? 'Dark' : 'Light'}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('edit')}
          className={`pb-3 flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'edit'
              ? 'border-b-2 border-orange-600 text-orange-700 dark:text-orange-400 font-bold'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <Edit2 className="h-4 w-4" />
          <span>Personal & Regional Details</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`pb-3 flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'notifications'
              ? 'border-b-2 border-orange-600 text-orange-700 dark:text-orange-400 font-bold'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <Bell className="h-4 w-4" />
          <span>Citizen Alerts</span>
        </button>
      </div>

      {/* Tab Content: Dark Mode & Appearance Preferences */}
      {activeTab === 'preferences' && (
        <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xs max-w-3xl space-y-6 transition-colors">
          <div className="border-b border-stone-100 dark:border-stone-800 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Palette className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  <span>Theme & Display Settings</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Configure dark mode preferences and view active background settings for JanSetu.
                </p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold border flex items-center gap-1.5 ${
                isDarkMode
                  ? 'bg-stone-800 text-amber-300 border-amber-400/40'
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}>
                {isDarkMode ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                <span>Active: {isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
              </span>
            </div>
          </div>

          {/* Main Dark Mode Toggle Interactive Card */}
          <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-750 bg-stone-50/80 dark:bg-stone-800/80 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                    Dark Mode Option
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300">
                    User Preference
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  Reduces eye strain during late-night public service operations, panchayat helpdesk triage, and field grievance logging. High-contrast and low-light optimized.
                </p>
              </div>

              {/* Accessible Interactive Toggle Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={isDarkMode}
                onClick={handleThemeToggle}
                className={`relative inline-flex h-8 w-15 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                  isDarkMode ? 'bg-orange-600' : 'bg-stone-300 dark:bg-stone-600'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
                    isDarkMode ? 'translate-x-7' : 'translate-x-0'
                  }`}
                >
                  {isDarkMode ? (
                    <Moon className="h-4 w-4 text-orange-600" />
                  ) : (
                    <Sun className="h-4 w-4 text-amber-500" />
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Visual Theme Selection Cards (Light vs Dark) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
              Select Interface Appearance:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Light Mode Card */}
              <div
                onClick={() => {
                  if (isDarkMode) handleThemeToggle();
                }}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  !isDarkMode
                    ? 'border-orange-600 bg-orange-50/40 ring-2 ring-orange-500/20'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-400 bg-white/40 dark:bg-stone-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-amber-500" />
                    <span className="font-bold text-xs text-stone-900 dark:text-stone-100">Light Mode</span>
                  </div>
                  {!isDarkMode && (
                    <span className="h-5 w-5 rounded-full bg-orange-600 text-white flex items-center justify-center">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="bg-stone-100 rounded-lg p-2.5 border border-stone-200 text-[11px] text-stone-700 space-y-1 font-sans">
                  <div className="h-2 w-16 bg-stone-300 rounded" />
                  <div className="h-2 w-24 bg-orange-300 rounded" />
                  <p className="text-[10px] text-stone-500">Daylight & bright office viewing</p>
                </div>
              </div>

              {/* Dark Mode Card */}
              <div
                onClick={() => {
                  if (!isDarkMode) handleThemeToggle();
                }}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  isDarkMode
                    ? 'border-orange-500 bg-orange-950/20 ring-2 ring-orange-500/20'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-400 bg-white/40 dark:bg-stone-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Moon className="h-5 w-5 text-amber-400" />
                    <span className="font-bold text-xs text-stone-900 dark:text-stone-100">Dark Mode</span>
                  </div>
                  {isDarkMode && (
                    <span className="h-5 w-5 rounded-full bg-orange-600 text-white flex items-center justify-center">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="bg-stone-900 rounded-lg p-2.5 border border-stone-800 text-[11px] text-stone-200 space-y-1 font-sans">
                  <div className="h-2 w-16 bg-stone-700 rounded" />
                  <div className="h-2 w-24 bg-amber-500 rounded" />
                  <p className="text-[10px] text-stone-400">Night inspections & OLED power saving</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Background Information */}
          <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/50 flex items-start gap-4">
            <div className="h-14 w-20 rounded-lg overflow-hidden border border-stone-300 dark:border-stone-700 shrink-0 shadow-xs relative">
              <img
                src={jansetuBg}
                alt="JanSetu Background Wallpaper"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-900 dark:text-stone-100">
                  JanSetu Civic Mandala Wallpaper
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                  Active Background
                </span>
              </div>
              <p className="text-stone-500 dark:text-stone-400 text-[11px]">
                The app background is active with subtle Indian civic mandala motifs, seamlessly adapting across both light and dark themes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 1: My Lodged Complaints */}
      {activeTab === 'complaints' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
              Registered Citizen Grievances
            </h3>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Showing active and closed dockets submitted from your phone/profile
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {userComplaints.map((ticket, idx) => (
              <div
                key={ticket.id}
                className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-orange-300 dark:hover:border-orange-700 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-orange-800 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/60 px-2 py-0.5 rounded border border-orange-200 dark:border-orange-800">
                      {ticket.id}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {idx === 0 ? 'Routed to Jal Sansthan' : idx === 1 ? 'Under PWD Review' : 'Closed & Repaired'}
                    </span>
                  </div>

                  <div className="bg-stone-50 dark:bg-stone-800/70 p-3 rounded-xl border border-stone-200 dark:border-stone-700">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                      Submitted Grievance Text:
                    </div>
                    <p className="text-xs font-mono text-stone-800 dark:text-stone-200 italic line-clamp-3">
                      "{ticket.rawText}"
                    </p>
                  </div>

                  {ticket.result && (
                    <div className="space-y-1 text-xs">
                      <div className="text-stone-600 dark:text-stone-300">
                        <span className="font-bold text-stone-700 dark:text-stone-200">Problem Type: </span>
                        <span>{ticket.result.detected_issue_category || 'Water & Pipeline'}</span>
                      </div>
                      <div className="text-stone-600 dark:text-stone-300">
                        <span className="font-bold text-stone-700 dark:text-stone-200">Identified Dialect: </span>
                        <span>{ticket.result.predicted_region.split('(')[0]}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                  <button
                    onClick={() => onInspectComplaint(ticket.rawText)}
                    className="w-full py-2 px-3 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-orange-600 hover:text-white text-stone-800 dark:text-stone-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Inspect Linguistic Breakdown</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 2: Edit Profile & Regional Info */}
      {activeTab === 'edit' && (
        <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xs max-w-2xl space-y-6 transition-colors">
          <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              Personal & Regional Profile
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Update your contact info and linguistic dialect preference for precise municipal routing.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 dark:text-stone-300">Full Name:</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full border border-stone-300 dark:border-stone-700 rounded-xl p-2.5 text-stone-900 dark:text-stone-100 bg-stone-50 dark:bg-stone-800 focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 dark:text-stone-300">Registered Email:</label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/50 cursor-not-allowed text-xs"
              />
              <span className="text-[10px] text-stone-400 dark:text-stone-500">Email is linked to Citizen ID and cannot be modified.</span>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 dark:text-stone-300">Mobile Phone (+91):</label>
              <input
                type="text"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full border border-stone-300 dark:border-stone-700 rounded-xl p-2.5 text-stone-900 dark:text-stone-100 bg-stone-50 dark:bg-stone-800 focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">State:</label>
                <input
                  type="text"
                  disabled
                  value={user.state}
                  className="w-full border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/50 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">District / Taluka:</label>
                <input
                  type="text"
                  value={editDistrict}
                  onChange={(e) => setEditDistrict(e.target.value)}
                  className="w-full border border-stone-300 dark:border-stone-700 rounded-xl p-2.5 text-stone-900 dark:text-stone-100 bg-stone-50 dark:bg-stone-800 focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 dark:text-stone-300">Preferred Regional Language / Dialect:</label>
              <select
                value={editLanguage}
                onChange={(e) => setEditLanguage(e.target.value)}
                className="w-full border border-stone-300 dark:border-stone-700 rounded-xl p-2.5 text-stone-900 dark:text-stone-100 bg-stone-50 dark:bg-stone-800 focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-xs"
              >
                {DIALECT_ZONES.map((zone) => (
                  <option key={zone.id} value={zone.name} className="dark:bg-stone-800">
                    {zone.name} ({zone.state})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Dark Mode option in Edit Form */}
            <div className="p-3 bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-800 dark:text-stone-200 block">Dark Mode Preference</span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400">Toggle dark color scheme across the application.</span>
              </div>
              <button
                type="button"
                onClick={handleThemeToggle}
                className={`px-3 py-1.5 rounded-lg font-semibold text-xs border flex items-center gap-1.5 cursor-pointer ${
                  isDarkMode
                    ? 'bg-orange-600 text-white border-orange-600'
                    : 'bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-200 border-stone-300 dark:border-stone-600'
                }`}
              >
                {isDarkMode ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                <span>{isDarkMode ? 'Dark Enabled' : 'Light Mode'}</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold text-xs flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>Save Profile Updates</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab Content 3: Notification Alerts */}
      {activeTab === 'notifications' && (
        <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xs max-w-2xl space-y-6 transition-colors">
          <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              Grievance Notification Channels
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Manage how JanSetu alerts you regarding ticket status and municipal resolutions.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <label className="flex items-center justify-between p-3.5 bg-stone-50 dark:bg-stone-800/70 rounded-xl border border-stone-200 dark:border-stone-700 cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 dark:text-stone-100 block">SMS Docket Notifications</span>
                <span className="text-stone-500 dark:text-stone-400 text-[11px]">Receive free instant SMS on docket generation and department dispatch.</span>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-orange-600 rounded" />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-stone-50 dark:bg-stone-800/70 rounded-xl border border-stone-200 dark:border-stone-700 cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 dark:text-stone-100 block">WhatsApp Citizen Bot Updates</span>
                <span className="text-stone-500 dark:text-stone-400 text-[11px]">Receive daily resolution updates and inspection photos on WhatsApp.</span>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-orange-600 rounded" />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-stone-50 dark:bg-stone-800/70 rounded-xl border border-stone-200 dark:border-stone-700 cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 dark:text-stone-100 block">Official Email Copy (jansetu@gmail.com)</span>
                <span className="text-stone-500 dark:text-stone-400 text-[11px]">Receive an administrative acknowledgement docket PDF in your inbox.</span>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-orange-600 rounded" />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
