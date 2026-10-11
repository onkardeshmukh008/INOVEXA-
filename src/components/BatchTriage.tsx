import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Download,
  Filter,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  Building,
  FileCheck,
  FolderTree
} from 'lucide-react';
import { BatchTicket } from '../types';

interface BatchTriageProps {
  tickets: BatchTicket[];
  setTickets: React.Dispatch<React.SetStateAction<BatchTicket[]>>;
  onInspectTicket: (text: string) => void;
  onNavigateToSegregation?: () => void;
}

export const BatchTriage: React.FC<BatchTriageProps> = ({
  tickets,
  setTickets,
  onInspectTicket,
  onNavigateToSegregation
}) => {
  const [loading, setLoading] = useState(false);
  const [filterRegion, setFilterRegion] = useState<string>('All');
  const [filterUrgency, setFilterUrgency] = useState<string>('All');
  const [batchSuccessMsg, setBatchSuccessMsg] = useState<string | null>(null);

  const handleRunBatchTriage = async () => {
    const pendingTickets = tickets.filter((t) => t.status === 'Pending' || !t.result);
    if (pendingTickets.length === 0) {
      alert('All tickets in the queue have already been triaged.');
      return;
    }

    setLoading(true);
    setBatchSuccessMsg(null);

    try {
      const response = await fetch('/api/batch-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: pendingTickets.map((t) => ({ id: t.id, text: t.rawText })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Batch request failed with status ${response.status}`);
      }

      const data = await response.json();
      const resultsMap = new Map();
      (data.results || []).forEach((r: any) => {
        resultsMap.set(r.id, r.result);
      });

      setTickets((prev) =>
        prev.map((t) => {
          if (resultsMap.has(t.id)) {
            const res = resultsMap.get(t.id);
            return {
              ...t,
              status: 'Triaged',
              result: res,
            };
          }
          return t;
        })
      );

      setBatchSuccessMsg(`Successfully classified ${pendingTickets.length} grassroots citizen tickets!`);
    } catch (err: any) {
      console.error('Batch triage failed:', err);
      alert('Batch classification error: ' + (err.message || 'Server error'));
    } finally {
      setLoading(false);
    }
  };

  const handleRouteAll = () => {
    setTickets((prev) =>
      prev.map((t) => (t.status === 'Triaged' ? { ...t, status: 'Routed' } : t))
    );
    setBatchSuccessMsg('All triaged tickets have been dispatched to local district collectors and municipal nodal cells.');
  };

  const handleExportCSV = () => {
    const headers = [
      'Ticket ID',
      'Citizen Name',
      'Channel',
      'Original Text',
      'Predicted Region',
      'Confidence',
      'Urgency',
      'Category',
      'Routing Suggestion',
      'Status',
    ];

    const rows = tickets.map((t) => [
      `"${t.id}"`,
      `"${t.citizenName}"`,
      `"${t.channel}"`,
      `"${t.rawText.replace(/"/g, '""')}"`,
      `"${t.result?.predicted_region || 'Pending'}"`,
      `"${t.result?.confidence ? Math.round(t.result.confidence * 100) + '%' : '-'}"`,
      `"${t.result?.urgency_level || '-'}"`,
      `"${t.result?.detected_issue_category || '-'}"`,
      `"${(t.result?.routing_suggestion || '').replace(/"/g, '""')}"`,
      `"${t.status}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jansetu_triaged_complaints_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredTickets = tickets.filter((t) => {
    if (filterRegion !== 'All' && t.result?.predicted_region !== filterRegion) {
      return false;
    }
    if (filterUrgency !== 'All' && t.result?.urgency_level !== filterUrgency) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-orange-100 text-orange-800 rounded-lg">
              <Layers className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-serif font-bold text-stone-900">
              Complain/Problem Queue
            </h2>
          </div>
          <p className="text-xs text-stone-500">
            Automated language sorting and citizen complaint triage for multi-channel feeds (WhatsApp Helpline, SMS, Panchayat Kiosks, 181 IVR).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onNavigateToSegregation && (
            <button
              onClick={onNavigateToSegregation}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <FolderTree className="h-4 w-4 text-amber-800" />
              <span>Problem Segregation</span>
            </button>
          )}

          <button
            onClick={handleRunBatchTriage}
            disabled={loading}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 text-white shadow-sm transition-all ${
              loading
                ? 'bg-stone-400 cursor-not-allowed'
                : 'bg-orange-600 hover:bg-orange-700 active:scale-95 shadow-orange-600/30'
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Processing Dialects...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Classify Pending Tickets ({tickets.filter((t) => t.status === 'Pending').length})</span>
              </>
            )}
          </button>

          <button
            onClick={handleRouteAll}
            className="px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
          >
            <FileCheck className="h-4 w-4 text-emerald-600" />
            <span>Dispatch Routed Slips</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-2.5 rounded-xl text-xs font-semibold border border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-100 transition-colors flex items-center gap-1.5"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {batchSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            <span>{batchSuccessMsg}</span>
          </div>
          <button
            onClick={() => setBatchSuccessMsg(null)}
            className="text-stone-400 hover:text-stone-700 text-xs font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-stone-600 font-medium">
          <Filter className="h-4 w-4 text-stone-400" />
          <span>Filters:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-stone-500 font-medium">Urgency:</label>
            <select
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
              className="border border-stone-300 rounded-lg px-2.5 py-1 text-stone-800 bg-stone-50 text-xs"
            >
              <option value="All">All Urgencies</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="text-stone-500 text-xs">
          Showing <strong>{filteredTickets.length}</strong> of {tickets.length} complaints
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Ticket & Citizen</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4 max-w-xs">Raw Grievance</th>
                <th className="py-3 px-4">Identified Dialect</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Routing Target</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-stone-900">{ticket.id}</div>
                    <div className="text-stone-500 text-[11px]">{ticket.citizenName}</div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200 text-[10px] font-medium">
                      {ticket.channel}
                    </span>
                  </td>

                  <td className="py-3 px-4 max-w-xs">
                    <div className="text-stone-800 line-clamp-2 font-mono text-[11px]">
                      "{ticket.rawText}"
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    {ticket.result ? (
                      <div>
                        <div className="font-semibold text-stone-900">
                          {ticket.result.predicted_region.split('(')[0]}
                        </div>
                        <div className="text-[10px] text-stone-500">
                          {ticket.result.detected_issue_category || 'Grievance'}
                        </div>
                      </div>
                    ) : (
                      <span className="text-stone-400 italic">Not analyzed</span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    {ticket.result ? (
                      <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
                        <span>{Math.round(ticket.result.confidence * 100)}%</span>
                      </div>
                    ) : (
                      <span className="text-stone-400">-</span>
                    )}
                  </td>

                  <td className="py-3 px-4 max-w-[200px]">
                    {ticket.result ? (
                      <div className="text-stone-800 truncate" title={ticket.result.routing_suggestion}>
                        {ticket.result.routing_suggestion.replace('Forward to local office in ', '')}
                      </div>
                    ) : (
                      <span className="text-stone-400">-</span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    {ticket.status === 'Routed' ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] inline-flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Routed
                      </span>
                    ) : ticket.status === 'Triaged' ? (
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px] inline-flex items-center gap-1">
                        <FileCheck className="h-3 w-3" />
                        Triaged
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px] inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onInspectTicket(ticket.rawText)}
                      className="text-orange-600 hover:text-orange-800 font-semibold inline-flex items-center gap-1 text-[11px] p-1 rounded hover:bg-orange-50"
                    >
                      <span>Deep Dive</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
