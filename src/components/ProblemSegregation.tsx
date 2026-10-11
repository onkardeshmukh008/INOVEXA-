import React, { useState, useMemo } from 'react';
import {
  Layers,
  Droplets,
  Construction,
  Zap,
  Trash2,
  ShoppingBag,
  FileSpreadsheet,
  HeartPulse,
  Shield,
  HelpCircle,
  Filter,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  ExternalLink,
  PlusCircle,
  Sparkles,
  Download,
  Building,
  RefreshCw,
  Send,
  MessageSquare
} from 'lucide-react';
import { BatchTicket, ProblemCategoryType, DialectAnalysisResult } from '../types';
import { PROBLEM_CATEGORIES_META } from '../data/dialectData';

interface ProblemSegregationProps {
  tickets: BatchTicket[];
  setTickets: React.Dispatch<React.SetStateAction<BatchTicket[]>>;
  onInspectComplaint: (text: string) => void;
}

export const ProblemSegregation: React.FC<ProblemSegregationProps> = ({
  tickets,
  setTickets,
  onInspectComplaint,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProblemCategoryType | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newComplaintText, setNewComplaintText] = useState('');
  const [newCitizenName, setNewCitizenName] = useState('');
  const [isClassifyingNew, setIsClassifyingNew] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Helper to map result detected_issue_category string to normalized ProblemCategoryType
  const normalizeCategory = (categoryString?: string, text?: string): ProblemCategoryType => {
    if (!categoryString && text) {
      const lower = text.toLowerCase();
      if (lower.includes('paani') || lower.includes('pani') || lower.includes('water') || lower.includes('thanni') || lower.includes('neeru') || lower.includes('pipeline') || lower.includes('bore')) {
        return 'Water & Pipeline';
      }
      if (lower.includes('sadak') || lower.includes('road') || lower.includes('firni') || lower.includes('gundi') || lower.includes('pothole') || lower.includes('rasta')) {
        return 'Road & Infrastructure';
      }
      if (lower.includes('light') || lower.includes('bijli') || lower.includes('power') || lower.includes('transformer') || lower.includes('current') || lower.includes('eb') || lower.includes('andhera')) {
        return 'Electricity & Power';
      }
      if (lower.includes('kachra') || lower.includes('drain') || lower.includes('nala') || lower.includes('nali') || lower.includes('waste') || lower.includes('safai') || lower.includes('garbage')) {
        return 'Sanitation & Waste';
      }
      if (lower.includes('ration') || lower.includes('anaj') || lower.includes('chal') || lower.includes('gom') || lower.includes('dealer') || lower.includes('pds')) {
        return 'Ration & Food Supply (PDS)';
      }
      if (lower.includes('zameen') || lower.includes('dakhil') || lower.includes('kharij') || lower.includes('patwari') || lower.includes('anchal')) {
        return 'Land Records & Revenue';
      }
      if (lower.includes('hospital') || lower.includes('bhojan') || lower.includes('doctor') || lower.includes('dawai') || lower.includes('swasthya')) {
        return 'Healthcare & Nutrition';
      }
      if (lower.includes('street light') || lower.includes('chori') || lower.includes('police') || lower.includes('safety')) {
        return 'Civic Amenities & Safety';
      }
      return 'General Grievance';
    }

    const cat = categoryString || '';
    if (cat.includes('Water') || cat.includes('Jal Jeevan')) return 'Water & Pipeline';
    if (cat.includes('Road') || cat.includes('PWD') || cat.includes('Infrastructure')) return 'Road & Infrastructure';
    if (cat.includes('Electricity') || cat.includes('Discom') || cat.includes('Power')) return 'Electricity & Power';
    if (cat.includes('Sanitation') || cat.includes('Waste') || cat.includes('Drain')) return 'Sanitation & Waste';
    if (cat.includes('Ration') || cat.includes('PDS') || cat.includes('Food')) return 'Ration & Food Supply (PDS)';
    if (cat.includes('Land') || cat.includes('Revenue')) return 'Land Records & Revenue';
    if (cat.includes('Health') || cat.includes('PHC') || cat.includes('Hospital') || cat.includes('Nutrition')) return 'Healthcare & Nutrition';
    if (cat.includes('Safety') || cat.includes('Amenities') || cat.includes('Streetlight') || cat.includes('Police')) return 'Civic Amenities & Safety';

    return 'General Grievance';
  };

  // Group tickets by normalized category
  const segregatedGroups = useMemo(() => {
    const groups: Record<ProblemCategoryType, BatchTicket[]> = {
      'Water & Pipeline': [],
      'Road & Infrastructure': [],
      'Electricity & Power': [],
      'Sanitation & Waste': [],
      'Ration & Food Supply (PDS)': [],
      'Land Records & Revenue': [],
      'Healthcare & Nutrition': [],
      'Civic Amenities & Safety': [],
      'General Grievance': [],
    };

    tickets.forEach((ticket) => {
      const category = normalizeCategory(ticket.result?.detected_issue_category, ticket.rawText);
      groups[category].push(ticket);
    });

    return groups;
  }, [tickets]);

  // Filtered tickets based on search and urgency
  const displayedTickets = useMemo(() => {
    let list = selectedCategory === 'All'
      ? tickets
      : segregatedGroups[selectedCategory] || [];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((t) =>
        t.rawText.toLowerCase().includes(q) ||
        t.citizenName.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        (t.result?.predicted_region || '').toLowerCase().includes(q)
      );
    }

    if (selectedUrgency !== 'All') {
      list = list.filter((t) => t.result?.urgency_level === selectedUrgency);
    }

    return list;
  }, [tickets, segregatedGroups, selectedCategory, searchTerm, selectedUrgency]);

  // Category Icon helper
  const renderCategoryIcon = (id: ProblemCategoryType, className = "h-4 w-4") => {
    switch (id) {
      case 'Water & Pipeline':
        return <Droplets className={className} />;
      case 'Road & Infrastructure':
        return <Construction className={className} />;
      case 'Electricity & Power':
        return <Zap className={className} />;
      case 'Sanitation & Waste':
        return <Trash2 className={className} />;
      case 'Ration & Food Supply (PDS)':
        return <ShoppingBag className={className} />;
      case 'Land Records & Revenue':
        return <FileSpreadsheet className={className} />;
      case 'Healthcare & Nutrition':
        return <HeartPulse className={className} />;
      case 'Civic Amenities & Safety':
        return <Shield className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  // Quick action: Auto-classify and add new complaint
  const handleAddNewComplaint = async () => {
    if (!newComplaintText.trim()) return;

    setIsClassifyingNew(true);
    const newId = `TCK-2026-${Math.floor(100 + Math.random() * 900)}`;

    try {
      const response = await fetch('/api/analyze-dialect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newComplaintText }),
      });

      let result: DialectAnalysisResult | undefined;
      if (response.ok) {
        result = await response.json();
      }

      const newTicket: BatchTicket = {
        id: newId,
        citizenName: newCitizenName.trim() || 'Anonymous Citizen (Helpline)',
        channel: 'WhatsApp Bot',
        submittedAt: 'Just now',
        rawText: newComplaintText,
        status: result ? 'Triaged' : 'Pending',
        result: result,
      };

      setTickets((prev) => [newTicket, ...prev]);
      setNewComplaintText('');
      setNewCitizenName('');
      setShowAddModal(false);
      setActionNotice(`New complaint ${newId} segregated under "${result ? normalizeCategory(result.detected_issue_category, newComplaintText) : 'Pending'}"!`);
      setTimeout(() => setActionNotice(null), 4000);
    } catch {
      // Fallback ticket
      const fallbackTicket: BatchTicket = {
        id: newId,
        citizenName: newCitizenName.trim() || 'Anonymous Citizen',
        channel: 'SMS Portal',
        submittedAt: 'Just now',
        rawText: newComplaintText,
        status: 'Pending',
      };
      setTickets((prev) => [fallbackTicket, ...prev]);
      setShowAddModal(false);
    } finally {
      setIsClassifyingNew(false);
    }
  };

  // Export Segregated Report
  const handleExportSegregatedReport = () => {
    const lines = [
      'Ticket ID,Citizen,Problem Category,Responsible Department,Dialect / Region,Urgency,Raw Text,Routing Target'
    ];

    tickets.forEach((t) => {
      const cat = normalizeCategory(t.result?.detected_issue_category, t.rawText);
      const meta = PROBLEM_CATEGORIES_META.find((m) => m.id === cat);
      lines.push(
        `"${t.id}","${t.citizenName}","${cat}","${meta?.department || 'District Grievance Cell'}","${t.result?.predicted_region || 'Unassigned'}","${t.result?.urgency_level || 'Normal'}","${t.rawText.replace(/"/g, '""')}","${(t.result?.routing_suggestion || '').replace(/"/g, '""')}"`
      );
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + lines.join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `problem_segregation_docket_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedMeta = PROBLEM_CATEGORIES_META.find((m) => m.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-orange-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/30 text-xs font-semibold">
              <Layers className="h-3.5 w-3.5" />
              Automated Citizen Grievance Categorization
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Problem Segregation
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Instantly clusters citizen communications into departmental problem types (Water, Road, Electricity, Sanitation, PDS Ration, Revenue).
              Even when phrased in colloquial dialects like Bhojpuri, Tanglish, Haryanvi, or Bambaiya, tickets are routed to the specific nodal department.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-md shadow-orange-600/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Segregate New Complaint</span>
            </button>

            <button
              onClick={handleExportSegregatedReport}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center gap-1.5 transition-all"
            >
              <Download className="h-4 w-4" />
              <span>Export Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {actionNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Problem Categories Grid (Quick Selection & Counters) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-orange-600" />
            <span>Select Problem Category to Segregate:</span>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            Total {tickets.length} Complaints in System
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {/* "All" button */}
          <button
            onClick={() => setSelectedCategory('All')}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
              selectedCategory === 'All'
                ? 'bg-stone-900 text-white border-stone-900 shadow-md ring-2 ring-stone-900/20'
                : 'bg-white text-stone-800 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="p-1.5 rounded-lg bg-stone-100 text-stone-700">
                <Layers className="h-4 w-4" />
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                selectedCategory === 'All' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-800'
              }`}>
                {tickets.length}
              </span>
            </div>
            <div className="mt-3">
              <div className="font-semibold text-xs leading-snug">All Complaints</div>
              <div className="text-[10px] text-stone-400 mt-0.5">Comprehensive view</div>
            </div>
          </button>

          {/* Individual Categories */}
          {PROBLEM_CATEGORIES_META.map((meta) => {
            const count = segregatedGroups[meta.id]?.length || 0;
            const isSelected = selectedCategory === meta.id;

            return (
              <button
                key={meta.id}
                onClick={() => setSelectedCategory(meta.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-orange-600 text-white border-orange-600 shadow-md ring-2 ring-orange-600/30'
                    : 'bg-white text-stone-800 border-stone-200 hover:border-orange-300 hover:bg-orange-50/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`p-1.5 rounded-lg ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-700'
                  }`}>
                    {renderCategoryIcon(meta.id, "h-4 w-4")}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/25 text-white' : 'bg-stone-100 text-stone-800 border border-stone-200'
                  }`}>
                    {count}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="font-semibold text-xs leading-snug truncate" title={meta.label}>
                    {meta.label}
                  </div>
                  <div className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-orange-100' : 'text-stone-500'}`}>
                    SLA: {meta.defaultSLA}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Category Departmental Focus Card (if not All) */}
      {selectedMeta && (
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 text-orange-800 rounded-xl">
                {renderCategoryIcon(selectedMeta.id, "h-6 w-6")}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    {selectedMeta.label}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-100 text-orange-800">
                    {segregatedGroups[selectedMeta.id]?.length || 0} Tickets Segregated
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  {selectedMeta.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="bg-stone-50 px-3 py-2 rounded-xl border border-stone-200">
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Responsible Department</span>
                <span className="font-semibold text-stone-800">{selectedMeta.department}</span>
              </div>
              <div className="bg-stone-50 px-3 py-2 rounded-xl border border-stone-200">
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Mandated Turnaround</span>
                <span className="font-semibold text-emerald-700">{selectedMeta.defaultSLA}</span>
              </div>
            </div>
          </div>

          {/* Cross-Dialect Expression Guide for this Problem */}
          <div className="bg-orange-50/70 border border-orange-200/80 rounded-xl p-3.5 space-y-2 text-xs">
            <div className="text-[11px] font-bold text-orange-950 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-orange-700" />
              <span>How Different Dialects Report This Problem:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
              {selectedMeta.id === 'Water & Pipeline' && (
                <>
                  <div className="bg-white p-2 rounded-lg border border-orange-200">
                    <span className="font-bold text-stone-800 block">Bhojpuri / Purvanchal:</span>
                    <span className="text-stone-600 font-mono">"paani naikhe aawat, pipeline tutal ba"</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-orange-200">
                    <span className="font-bold text-stone-800 block">Dakhni / Hyderabad:</span>
                    <span className="text-stone-600 font-mono">"mereku paani nai aara ji, nakko bolo"</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-orange-200">
                    <span className="font-bold text-stone-800 block">Tanglish / Tamil:</span>
                    <span className="text-stone-600 font-mono">"enga area la thanni varala, bore pochu"</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-orange-200">
                    <span className="font-bold text-stone-800 block">Kanglish / Kannada:</span>
                    <span className="text-stone-600 font-mono">"namma layout alli neeru barthilla"</span>
                  </div>
                </>
              )}

              {selectedMeta.id === 'Road & Infrastructure' && (
                <>
                  <div className="bg-white p-2 rounded-lg border border-orange-200">
                    <span className="font-bold text-stone-800 block">Haryanvi:</span>
                    <span className="text-stone-600 font-mono">"firni aali sadak tootti padi se"</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-orange-200">
                    <span className="font-bold text-stone-800 block">Kanglish:</span>
                    <span className="text-stone-600 font-mono">"road full gundi aagide, bus breakdown"</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-orange-200">
                    <span className="font-bold text-stone-800 block">Punjabi:</span>
                    <span className="text-stone-600 font-mono">"sadak tuti payi aa, rasta band"</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-orange-200">
                    <span className="font-bold text-stone-800 block">Bengali:</span>
                    <span className="text-stone-600 font-mono">"rastar kharap obostha, jol jome ache"</span>
                  </div>
                </>
              )}

              {selectedMeta.id === 'Electricity & Power' && (
                <>
                  <div className="bg-white p-2 rounded-lg border border-orange-200">
                    <span className="font-bold text-stone-800 block">Hyderabadi Dakhni:</span>
                    <span className="text-stone-600 font-mono">"transformer ud gaya andhera hai"</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-orange-200">
                    <span className="font-bold text-stone-800 block">Malwi (MP):</span>
                    <span className="text-stone-600 font-mono">"apne yahan bijli ko roz ka locha hega"</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-orange-200">
                    <span className="font-bold text-stone-800 block">Tanglish:</span>
                    <span className="text-stone-600 font-mono">"eb current cut, street light eriyala"</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-orange-200">
                    <span className="font-bold text-stone-800 block">Punjabi:</span>
                    <span className="text-stone-600 font-mono">"bijli cut lag reha motor chaldi ni"</span>
                  </div>
                </>
              )}

              {selectedMeta.id !== 'Water & Pipeline' && selectedMeta.id !== 'Road & Infrastructure' && selectedMeta.id !== 'Electricity & Power' && (
                <>
                  <div className="bg-white p-2 rounded-lg border border-orange-200 col-span-full">
                    <span className="text-stone-700">
                      JanSetu automatically maps slang terms like <em>"rada"</em> (slum waste dispute), <em>"dakhil kharij"</em> (land mutation delay), and <em>"kotihedar"</em> (ration dealer corruption) directly to this department.
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search within segregated complaints..."
            className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg bg-stone-50 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-stone-500 font-medium">Filter Severity:</label>
          <select
            value={selectedUrgency}
            onChange={(e) => setSelectedUrgency(e.target.value)}
            className="border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-800 bg-stone-50 text-xs"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="text-stone-500 text-xs">
          Showing <strong>{displayedTickets.length}</strong> complaints
        </div>
      </div>

      {/* Segregated Complaints Grid */}
      {displayedTickets.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-12 text-center text-stone-400 space-y-3">
          <Layers className="h-10 w-10 mx-auto text-stone-300" />
          <div className="font-serif text-base font-semibold text-stone-700">
            No complaints found in this category
          </div>
          <p className="text-xs max-w-sm mx-auto text-stone-500">
            Try selecting a different category or click "Segregate New Complaint" to classify one now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTickets.map((ticket) => {
            const cat = normalizeCategory(ticket.result?.detected_issue_category, ticket.rawText);
            const meta = PROBLEM_CATEGORIES_META.find((m) => m.id === cat);

            return (
              <div
                key={ticket.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 hover:border-orange-300"
              >
                <div className="space-y-3">
                  {/* Top Bar: Category Pill & Urgency */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border flex items-center gap-1.5 ${meta?.badgeColor || 'bg-stone-100 text-stone-800 border-stone-200'}`}>
                      {renderCategoryIcon(cat, "h-3.5 w-3.5")}
                      <span>{cat}</span>
                    </span>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ticket.result?.urgency_level === 'Critical'
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : ticket.result?.urgency_level === 'High'
                        ? 'bg-orange-100 text-orange-800 border border-orange-300'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}>
                      {ticket.result?.urgency_level || 'Normal'}
                    </span>
                  </div>

                  {/* Citizen & Channel info */}
                  <div className="flex items-center justify-between text-[11px] text-stone-500 border-b border-stone-100 pb-2">
                    <div>
                      <span className="font-semibold text-stone-900">{ticket.citizenName}</span>
                      <span className="block text-[10px] text-stone-400 font-mono">{ticket.id}</span>
                    </div>
                    <span className="bg-stone-50 px-2 py-0.5 rounded border border-stone-200 text-[10px]">
                      {ticket.channel}
                    </span>
                  </div>

                  {/* Grassroots Original Text */}
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      Original Grassroots Voice
                    </div>
                    <p className="text-xs font-mono text-stone-800 italic leading-relaxed">
                      "{ticket.rawText}"
                    </p>
                  </div>

                  {/* Translation or Summary */}
                  {ticket.result?.standard_english_translation && (
                    <div className="text-xs text-stone-600 leading-relaxed">
                      <span className="font-bold text-stone-700">Official Translation: </span>
                      <span>{ticket.result.standard_english_translation}</span>
                    </div>
                  )}

                  {/* Identified Dialect */}
                  {ticket.result?.predicted_region && (
                    <div className="text-[11px] text-stone-500 flex items-center justify-between pt-1">
                      <span className="font-medium">Dialect Origin:</span>
                      <span className="font-semibold text-stone-800 text-right truncate max-w-[200px]" title={ticket.result.predicted_region}>
                        {ticket.result.predicted_region.split('(')[0]}
                      </span>
                    </div>
                  )}

                  {/* Department Routing Target */}
                  {ticket.result?.routing_suggestion && (
                    <div className="p-2.5 rounded-lg bg-orange-50/60 border border-orange-100 text-[11px] text-orange-950 space-y-0.5">
                      <span className="font-bold block text-[10px] uppercase text-orange-800">Assigned Routing Target</span>
                      <span className="font-medium">
                        {ticket.result.routing_suggestion.replace('Forward to local office in ', '')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onInspectComplaint(ticket.rawText)}
                    className="w-full py-2 px-3 rounded-lg bg-stone-100 hover:bg-orange-600 hover:text-white text-stone-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Analyze Linguistic Morphology</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Quick Segregate New Complaint */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-orange-100 text-orange-800 rounded-lg">
                  <Layers className="h-4 w-4" />
                </span>
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Segregate a Citizen Complaint
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-500">
              Paste or type any unstructured citizen grievance. The system will identify the problem category (Water, Road, Electricity, Sanitation, etc.) and dialect.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Citizen Name & Location (Optional):</label>
                <input
                  type="text"
                  value={newCitizenName}
                  onChange={(e) => setNewCitizenName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar (Ghazipur, UP)"
                  className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Raw Complaint Text:</label>
                <textarea
                  rows={4}
                  value={newComplaintText}
                  onChange={(e) => setNewComplaintText(e.target.value)}
                  placeholder="e.g. 'Humare gali ka transformer blast ho gya hai 3 din se light nahi aa rahi bacche ro rahe hain jaldi banwao'"
                  className="w-full border border-stone-300 rounded-lg p-2.5 text-stone-900 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500 leading-relaxed font-sans"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleAddNewComplaint}
                disabled={isClassifyingNew || !newComplaintText.trim()}
                className={`px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 transition-all ${
                  isClassifyingNew || !newComplaintText.trim()
                    ? 'bg-stone-300 cursor-not-allowed'
                    : 'bg-orange-600 hover:bg-orange-700 shadow-sm'
                }`}
              >
                {isClassifyingNew ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Auto-Categorizing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Segregate & Add</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
