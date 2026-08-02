import React from 'react';
import { MapPin, Globe, ArrowUpDown } from 'lucide-react';
import { ZONES_DATA, BANK_POINTS } from '../../data/antioquianData';

interface Props {
  selectedZoneId: string; // 'todos' or zone ID
  onSelectZone: (zoneId: string) => void;
  selectedMunicipioId: string; // 'todos' or municipio ID
  onSelectMunicipio: (municipioId: string) => void;
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'name-asc';
  onSortChange: (sort: 'default' | 'price-asc' | 'price-desc' | 'name-asc') => void;
}

export const Navigation: React.FC<Props> = ({
  selectedZoneId,
  onSelectZone,
  selectedMunicipioId,
  onSelectMunicipio,
  sortBy,
  onSortChange,
}) => {
  // Collect all municipalities for quick direct filters
  const allMunicipios = ZONES_DATA.flatMap((zone) => zone.municipios);

  return (
    <nav className="bg-yellow-400 border-b-2 border-yellow-500 shadow-md sticky top-[68px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 space-y-2">
        {/* Zone Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
          <span className="text-xs font-black uppercase text-slate-900 flex items-center gap-1 shrink-0 mr-1 bg-yellow-300 px-2 py-1 rounded-md border border-yellow-500/30">
            <Globe className="w-3.5 h-3.5 text-red-700" />
            <span>Zonas:</span>
          </span>

          <button
            onClick={() => {
              onSelectZone('todos');
              onSelectMunicipio('todos');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all shrink-0 border ${
              selectedZoneId === 'todos'
                ? 'bg-red-600 text-yellow-300 border-red-800 shadow-md scale-105 ring-2 ring-white'
                : 'bg-white text-slate-800 border-yellow-300 hover:bg-yellow-100 hover:border-red-400'
            }`}
          >
            🗺️ Ver Todo Antioquia
          </button>

          <button
            onClick={() => {
              onSelectZone('bancos');
              onSelectMunicipio('bancos');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all shrink-0 border ${
              selectedZoneId === 'bancos'
                ? 'bg-red-600 text-yellow-300 border-red-800 shadow-md scale-105 ring-2 ring-white'
                : 'bg-white text-slate-800 border-yellow-300 hover:bg-yellow-100'
            }`}
          >
            🏦 Bancos de Fichos ({BANK_POINTS.length})
          </button>

          {ZONES_DATA.map((zone) => {
            const isSelected = selectedZoneId === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => {
                  onSelectZone(zone.id);
                  onSelectMunicipio('todos');
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 border ${
                  isSelected
                    ? 'bg-red-600 text-yellow-300 border-red-800 shadow-md scale-105 ring-2 ring-white'
                    : 'bg-white text-slate-800 border-yellow-300 hover:bg-yellow-100'
                }`}
              >
                📍 {zone.name}
              </button>
            );
          })}
        </div>

        {/* Municipality Direct Chips & Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-yellow-500/30">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar max-w-full">
            <span className="text-[11px] font-bold text-red-900 flex items-center gap-1 shrink-0">
              <MapPin className="w-3 h-3 text-red-700" />
              Municipios:
            </span>

            <button
              onClick={() => onSelectMunicipio('todos')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                selectedMunicipioId === 'todos'
                  ? 'bg-slate-900 text-yellow-300 font-bold'
                  : 'bg-yellow-300/80 hover:bg-white text-slate-900'
              }`}
            >
              Todos
            </button>

            {allMunicipios.map((mun) => {
              const isSelected = selectedMunicipioId === mun.id;
              return (
                <button
                  key={mun.id}
                  onClick={() => {
                    onSelectMunicipio(mun.id);
                    onSelectZone(mun.zoneId);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all shrink-0 font-medium ${
                    isSelected
                      ? 'bg-slate-900 text-yellow-300 font-bold shadow-xs'
                      : 'bg-yellow-300/80 hover:bg-white text-slate-900'
                  }`}
                >
                  {mun.name} <span className="text-[10px] text-red-800 font-bold">({mun.responsibleGrades})</span>
                </button>
              );
            })}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-1.5 shrink-0 bg-white/80 px-2 py-1 rounded-lg border border-yellow-500/30">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[11px] font-bold text-slate-700 hidden sm:inline">Orden:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-slate-800 outline-none cursor-pointer"
            >
              <option value="default">Por defecto</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name-asc">Nombre (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};
