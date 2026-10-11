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
  ExternalLink
} from 'lucide-react';
import { UserProfile, BatchTicket } from '../types';
import { DIALECT_ZONES } from '../data/dialectData';

interface UserProfileSectionProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onLogout: () => void;
  onLodgeNewComplaint: () => void;
  onInspectComplaint: (text: string) => void;
  tickets: BatchTicket[];
}

export const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  user,
  onUpdateUser,
  onLogout,
  onLodgeNewComplaint,
  onInspectComplaint,
  tickets
}) => {
  const [activeTab, setActiveTab] = useState<'complaints' | 'edit' | 'notifications'>('complaints');
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
      preferredLanguage: editLanguage
    };
    onUpdateUser(updated);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Hero Card */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
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

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onLodgeNewComplaint}
              className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-md shadow-orange-600/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span>Lodge New Complaint</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center gap-1.5 transition-all"
              title="Sign Out of Session"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Profile changes updated successfully in your citizen record!</span>
        </div>
      )}

      {/* Quick Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
          <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
            Total Complaints Lodged
          </div>
          <div className="text-2xl font-serif font-bold text-stone-900 mt-1">
            {user.complaintsLodgedCount || 3}
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">Assigned to district cells</div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
          <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
            Resolved & Closed
          </div>
          <div className="text-2xl font-serif font-bold text-emerald-700 mt-1">
            {user.resolvedComplaintsCount || 2}
          </div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">67% Resolution Rate</div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
          <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
            Active in Queue
          </div>
          <div className="text-2xl font-serif font-bold text-amber-700 mt-1">
            1
          </div>
          <div className="text-[10px] text-amber-600 font-medium mt-0.5">SLA SLA Under 24h</div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
          <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
            Registered Since
          </div>
          <div className="text-base font-serif font-bold text-stone-800 mt-2">
            {user.createdAt}
          </div>
          <div className="text-[10px] text-stone-400">Verified Citizen Account</div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-stone-200 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('complaints')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'complaints'
              ? 'border-b-2 border-orange-600 text-orange-700 font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>My Filed Complaints & Dockets ({userComplaints.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('edit')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'edit'
              ? 'border-b-2 border-orange-600 text-orange-700 font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Edit2 className="h-4 w-4" />
          <span>Personal & Regional Details</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'notifications'
              ? 'border-b-2 border-orange-600 text-orange-700 font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Bell className="h-4 w-4" />
          <span>Citizen Notification Alerts</span>
        </button>
      </div>

      {/* Tab Content 1: My Lodged Complaints */}
      {activeTab === 'complaints' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif font-bold text-stone-900">
              Registered Citizen Grievances
            </h3>
            <span className="text-xs text-stone-500">
              Showing active and closed dockets submitted from your phone/profile
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {userComplaints.map((ticket, idx) => (
              <div
                key={ticket.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-orange-300 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-orange-800 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                      {ticket.id}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {idx === 0 ? 'Routed to Jal Sansthan' : idx === 1 ? 'Under PWD Review' : 'Closed & Repaired'}
                    </span>
                  </div>

                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      Submitted Grievance Text:
                    </div>
                    <p className="text-xs font-mono text-stone-800 italic line-clamp-3">
                      "{ticket.rawText}"
                    </p>
                  </div>

                  {ticket.result && (
                    <div className="space-y-1 text-xs">
                      <div className="text-stone-600">
                        <span className="font-bold text-stone-700">Problem Type: </span>
                        <span>{ticket.result.detected_issue_category || 'Water & Pipeline'}</span>
                      </div>
                      <div className="text-stone-600">
                        <span className="font-bold text-stone-700">Identified Dialect: </span>
                        <span>{ticket.result.predicted_region.split('(')[0]}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <button
                    onClick={() => onInspectComplaint(ticket.rawText)}
                    className="w-full py-2 px-3 rounded-lg bg-stone-100 hover:bg-orange-600 hover:text-white text-stone-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
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
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs max-w-2xl space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Personal & Regional Profile
            </h3>
            <p className="text-xs text-stone-500">
              Update your contact info and linguistic dialect preference for precise municipal routing.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-stone-700">Full Name:</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700">Registered Email:</label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full border border-stone-200 rounded-xl p-2.5 text-stone-500 bg-stone-100 cursor-not-allowed text-xs"
              />
              <span className="text-[10px] text-stone-400">Email is linked to Citizen ID and cannot be modified.</span>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700">Mobile Phone (+91):</label>
              <input
                type="text"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-stone-700">State:</label>
                <input
                  type="text"
                  disabled
                  value={user.state}
                  className="w-full border border-stone-200 rounded-xl p-2.5 text-stone-500 bg-stone-100 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700">District / Taluka:</label>
                <input
                  type="text"
                  value={editDistrict}
                  onChange={(e) => setEditDistrict(e.target.value)}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700">Preferred Regional Language / Dialect:</label>
              <select
                value={editLanguage}
                onChange={(e) => setEditLanguage(e.target.value)}
                className="w-full border border-stone-300 rounded-xl p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-xs"
              >
                {DIALECT_ZONES.map((zone) => (
                  <option key={zone.id} value={zone.name}>
                    {zone.name} ({zone.state})
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold text-xs flex items-center gap-1.5 shadow-md transition-colors"
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
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs max-w-2xl space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Grievance Notification Channels
            </h3>
            <p className="text-xs text-stone-500">
              Manage how JanSetu alerts you regarding ticket status and municipal resolutions.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 block">SMS Docket Notifications</span>
                <span className="text-stone-500 text-[11px]">Receive free instant SMS on docket generation and department dispatch.</span>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-orange-600 rounded" />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 block">WhatsApp Citizen Bot Updates</span>
                <span className="text-stone-500 text-[11px]">Receive daily resolution updates and inspection photos on WhatsApp.</span>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-orange-600 rounded" />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 block">Official Email Copy (jansetu@gmail.com)</span>
                <span className="text-stone-500 text-[11px]">Receive an administrative acknowledgement docket PDF in your inbox.</span>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-orange-600 rounded" />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
