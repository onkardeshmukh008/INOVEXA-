import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Phone,
  Building,
  ArrowRight,
  Search,
  BookOpen,
  Volume2
} from 'lucide-react';
import { DIALECT_ZONES } from '../data/dialectData';
import { DialectZoneInfo } from '../types';

interface DialectMatrixProps {
  onSelectSample: (text: string) => void;
}

export const DialectMatrix: React.FC<DialectMatrixProps> = ({ onSelectSample }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState<DialectZoneInfo | null>(null);

  const filteredZones = DIALECT_ZONES.filter((z) => {
    const q = searchTerm.toLowerCase();
    return (
      z.name.toLowerCase().includes(q) ||
      z.state.toLowerCase().includes(q) ||
      z.keyHubs.some((h) => h.toLowerCase().includes(q)) ||
      z.signatureMarkers.some((m) => m.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-orange-100 text-orange-800 rounded-lg">
              <Compass className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-serif font-bold text-stone-900">
              16 Indian Grassroots Linguistic Zones
            </h2>
          </div>
          <p className="text-xs text-stone-500">
            Comprehensive taxonomy of dialects, morphological markers, and designated district redressal cells across India.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dialect, state, city, word..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl bg-stone-50 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Grid of Dialect Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredZones.map((zone) => (
          <div
            key={zone.id}
            className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group hover:border-orange-300"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-orange-700 transition-colors">
                    {zone.name}
                  </h3>
                  <div className="text-xs font-medium text-stone-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                    <span>{zone.state}</span>
                  </div>
                </div>
              </div>

              {/* District Hubs */}
              <div className="text-[11px] text-stone-600">
                <span className="font-semibold text-stone-700">Administrative Hubs: </span>
                <span>{zone.keyHubs.join(', ')}</span>
              </div>

              {/* Signature Markers */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Linguistic Clue Markers
                </div>
                <div className="flex flex-wrap gap-1">
                  {zone.signatureMarkers.map((marker, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 text-[11px] font-mono border border-stone-200"
                    >
                      {marker}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sample Grassroots Quote */}
              <div className="bg-orange-50/60 border border-orange-100 rounded-xl p-3 text-xs space-y-1">
                <div className="text-[10px] font-bold text-orange-900 uppercase tracking-wider flex items-center gap-1">
                  <Volume2 className="h-3 w-3 text-orange-600" />
                  <span>Grassroots Citizen Grievance Sample</span>
                </div>
                <p className="font-mono text-stone-800 text-[11px] italic">
                  "{zone.samplePhrase}"
                </p>
                <p className="text-stone-500 text-[10px]">
                  Meaning: {zone.sampleMeaning}
                </p>
              </div>
            </div>

            {/* Bottom Actions & Routing */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between text-[11px] text-stone-600">
                <div className="flex items-center gap-1 truncate" title={zone.nodalOffice}>
                  <Building className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{zone.nodalOffice.split('(')[0]}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0 font-semibold text-stone-700">
                  <Phone className="h-3 w-3 text-emerald-600" />
                  <span>{zone.helpline}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectSample(zone.samplePhrase)}
                className="w-full py-2 px-3 rounded-lg bg-stone-100 hover:bg-orange-600 hover:text-white text-stone-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Test in Dialect Analyzer</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
