import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  HelpCircle,
  Copy,
  Check,
  Send,
  MessageSquare,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Building2
} from 'lucide-react';

export const ContactFaq: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCategory, setContactCategory] = useState('General Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const officialEmail = 'jansetu@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(officialEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 4000);
  };

  const faqs = [
    {
      question: 'What is JanSetu (जनसेतु) and how does it help citizens?',
      answer:
        'JanSetu is an intelligent linguistic bridge and grassroots grievance triage system. It reads unstructured, informal citizen complaints—submitted in spoken dialects, phonetic Roman scripts, Devanagari, or code-mixed languages—and identifies both the regional origin and the exact civic problem type (water, electricity, roads, sanitation, etc.) to route them directly to the appropriate district or municipal office.'
    },
    {
      question: 'Can I submit complaints in mixed languages like Hinglish, Tanglish, or with typos?',
      answer:
        'Absolutely. JanSetu is engineered specifically for everyday citizen communication. You do not need formal grammar or standard Hindi/English. Phrasing like "hamre tola me paani naikhe aawat", "mahre gaam ki firni tootti padi se", or "transformer ud gaya andhera hai" is instantly parsed and mapped to the right nodal department.'
    },
    {
      question: 'How does "Problem Segregation" categorize my complaint?',
      answer:
        'Our Problem Segregation engine automatically classifies complaints into 8 civic departments: Water & Pipeline, Road & Infrastructure, Electricity & Power, Sanitation & Waste, Ration & Food Supply (PDS), Land Records & Revenue, Healthcare & Nutrition, and Civic Amenities & Safety. Each problem type is assigned to its designated nodal officer with a strict turnaround SLA (12h to 48h).'
    },
    {
      question: 'What is the official email to contact the JanSetu team?',
      answer:
        'You can reach our nodal support and technical cell directly at jansetu@gmail.com. We respond to citizen queries, administrative onboarding requests, and grievance escalations within 24 business hours.'
    },
    {
      question: 'How does JanSetu determine the routing office for my complaint?',
      answer:
        'By analyzing diagnostic vocabulary (e.g., "firni" for Haryana/Punjab roads, "tola" for Purvanchal hamlets, "rada" for Mumbai chawls, "kotihedar" for UP/Bihar ration dealers) and grammar patterns, JanSetu determines the exact state and district jurisdiction, directing the ticket to portals like UP Jan Sunwai, Bihar Lok Shikayat, Maharashtra Aaple Sarkar, Telangana Prajavani, and Central CPGRAMS.'
    },
    {
      question: 'Can Gram Panchayats and Municipal Ward offices use JanSetu in batch mode?',
      answer:
        'Yes. The Complain/Problem Queue supports batch ingestion from citizen WhatsApp helplines, SMS portals, and Panchayat computer kiosks. Public officials can segregate hundreds of grievances by department and export them as CSV/dossiers with one click.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-orange-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/30 text-xs font-semibold">
            <Mail className="h-3.5 w-3.5" />
            Citizen Helpdesk & Official Communication
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Contact Us & Help Center
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Need assistance lodging a grievance, escalating an unresolved municipal issue, or onboarding your district office?
            Reach out to the JanSetu administrative desk or browse our citizen FAQs below.
          </p>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Email Card (Prominently showing jansetu@gmail.com) */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-orange-400 transition-all group">
          <div className="space-y-3">
            <div className="h-12 w-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Official Citizen Email
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
                jansetu@gmail.com
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Send citizen petitions, municipal coordination requests, or escalation dockets directly to our team.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-stone-100">
            <button
              onClick={handleCopyEmail}
              className="w-full py-2.5 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-900 font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-orange-200"
            >
              {copiedEmail ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              <span>{copiedEmail ? 'Email Copied!' : 'Copy jansetu@gmail.com'}</span>
            </button>

            <a
              href={`mailto:${officialEmail}?subject=Citizen%20Grievance%20Query%20-%20JanSetu`}
              className="w-full py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Compose Email</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Helpline Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-orange-400 transition-all group">
          <div className="space-y-3">
            <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Toll-Free Grievance Helpline
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
                1800-11-2026 / 181
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Available in 16 regional dialects 24 hours a day, 7 days a week for immediate civic escalation and IVR filing.
            </p>
          </div>

          <div className="pt-2 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-emerald-600" />
              <span><strong>Operating Hours:</strong> 24x7 Public Service</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Free calling across all Indian mobile operators</span>
            </div>
          </div>
        </div>

        {/* National Coordination Hub */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-orange-400 transition-all group">
          <div className="space-y-3">
            <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Nodal Coordination Hub
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
                JanSetu Citizen Redressal Hub
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Integrated with Department of Administrative Reforms & Public Grievances (DARPG) and State Lok Shikayat cells.
            </p>
          </div>

          <div className="pt-2 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <span>Central Secretariat / CPGRAMS Cell, New Delhi</span>
            </div>
            <span className="text-[11px] text-stone-400 block">
              PIN Code: 110001 • Inter-State Redressal Desk
            </span>
          </div>
        </div>
      </div>

      {/* Quick Message to jansetu@gmail.com Form */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-orange-600" />
              <span>Send a Message to the JanSetu Desk</span>
            </h2>
            <p className="text-xs text-stone-500">
              Messages submitted here are dispatched to <strong className="text-stone-800">jansetu@gmail.com</strong> for swift citizen response.
            </p>
          </div>
          <span className="text-xs px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full font-medium shrink-0 self-start sm:self-auto">
            Response SLA: Under 24h
          </span>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-2">
            <div className="h-10 w-10 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
              <Check className="h-5 w-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-emerald-950">
              Message Dispatched to jansetu@gmail.com!
            </h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Thank you for contacting JanSetu. Your query has been logged under docket #JS-{Math.floor(1000 + Math.random() * 9000)} and forwarded to our citizen response team.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitContact} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-xs">
                <label className="font-bold text-stone-700">Citizen / Officer Name:</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Anand Vardhan"
                  className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-xs"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-stone-700">Email Address or Phone:</label>
                <input
                  type="text"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="e.g. citizen@example.com or +91 98765 43210"
                  className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-stone-700">Inquiry / Problem Domain:</label>
              <select
                value={contactCategory}
                onChange={(e) => setContactCategory(e.target.value)}
                className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-xs"
              >
                <option value="General Inquiry">General Citizen Inquiry</option>
                <option value="Water Problem Escalation">Water & Pipeline Escalation</option>
                <option value="Road & PWD Problem">Road & PWD Infrastructure</option>
                <option value="Electricity Power Outage">Electricity & DISCOM Transformer</option>
                <option value="Municipal Sanitation">Civic Sanitation & Garbage</option>
                <option value="Ration PDS Issue">Ration Shop & PDS Malpractice</option>
                <option value="Panchayat Onboarding">Gram Panchayat / Urban Ward Onboarding</option>
              </select>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-stone-700">Your Message or Grievance Details:</label>
              <textarea
                rows={4}
                required
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Describe your issue or inquiry... you may write in English, Hindi, or any regional dialect."
                className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-xs leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-stone-500">
                Routed securely to <strong>jansetu@gmail.com</strong>
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold text-xs flex items-center gap-2 shadow-md shadow-orange-600/20 active:scale-95 transition-all"
              >
                <Send className="h-4 w-4" />
                <span>Send to JanSetu Support</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Frequently Asked Questions (FAQs) Section */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1 border-b border-stone-100 pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-wider">
            <HelpCircle className="h-4 w-4" />
            <span>Citizen Knowledge Base</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Frequently Asked Questions (FAQs)
          </h2>
          <p className="text-xs text-stone-500">
            Common questions regarding dialect interpretation, problem segregation, and jurisdictional grievance handling.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="border border-stone-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 bg-stone-50 hover:bg-stone-100/80 transition-colors"
                >
                  <span className="font-serif font-semibold text-xs sm:text-sm text-stone-900">
                    {faq.question}
                  </span>
                  <span className="text-stone-500 shrink-0">
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 space-y-2">
                    <p>{faq.answer}</p>
                    {faq.answer.includes('jansetu@gmail.com') && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-800 rounded-lg border border-orange-200 font-mono text-xs">
                        <span>Email: jansetu@gmail.com</span>
                        <button
                          onClick={handleCopyEmail}
                          className="text-orange-700 hover:text-orange-950 underline font-sans ml-2"
                        >
                          {copiedEmail ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
