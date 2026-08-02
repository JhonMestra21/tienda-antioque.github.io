import React from 'react';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { CategoryFilterType } from '../../types/catalog';

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategoryFilter: CategoryFilterType;
  onCategoryFilterChange: (filter: CategoryFilterType) => void;
  totalResultsCount: number;
}

const CATEGORY_CHIPS: { id: CategoryFilterType; label: string; icon: string }[] = [
  { id: 'todos', label: 'Todos los productos', icon: '✨' },
  { id: 'bancos', label: '🏦 Bancos y Fichos', icon: '🏦' },
  { id: 'postres', label: '🍰 Postres', icon: '🍰' },
  { id: 'bebidas', label: '🥤 Bebidas Frías & Calientes', icon: '🥤' },
  { id: 'comidas', label: '🍔 Comidas Rápidas & Típicas', icon: '🍔' },
  { id: 'dulces', label: '🍬 Dulces & Confitería', icon: '🍬' },
  { id: 'panaderia', label: '🥐 Panadería & Snacks', icon: '🥐' },
  { id: 'atripciones', label: '🎪 Recreación & Juegos', icon: '🎪' },
];

export const SearchBar: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  activeCategoryFilter,
  onCategoryFilterChange,
  totalResultsCount,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-3">
      {/* Search Input Box */}
      <div className="relative flex items-center shadow-lg rounded-2xl bg-white border-2 border-red-100 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/15 transition-all">
        <div className="pl-4 pr-2 text-red-600 flex items-center justify-center">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="🔍 Buscar por producto, municipio, grado, categoría, precio ($7.000) o zona..."
          className="w-full py-3.5 pr-10 text-slate-800 placeholder-slate-400 bg-transparent text-sm sm:text-base font-medium outline-none"
        />

        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            title="Limpiar búsqueda"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar scroll-smooth">
        <div className="flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-200 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Filtros rápidos:</span>
        </div>

        {CATEGORY_CHIPS.map((chip) => {
          const isActive = activeCategoryFilter === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => onCategoryFilterChange(chip.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                isActive
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20 scale-105 ring-2 ring-amber-400'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50 hover:border-amber-300'
              }`}
            >
              <span>{chip.icon}</span>
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Search & Result Indicator */}
      {(searchQuery || activeCategoryFilter !== 'todos') && (
        <div className="flex items-center justify-between px-2 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-amber-700 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
              <Sparkles className="w-3 h-3 text-amber-600" />
              {totalResultsCount} {totalResultsCount === 1 ? 'coincidencia encontrada' : 'coincidencias encontradas'}
            </span>
            {searchQuery && (
              <span className="text-slate-500">
                para &quot;<strong className="text-slate-800">{searchQuery}</strong>&quot;
              </span>
            )}
          </div>

          <button
            onClick={() => {
              onSearchChange('');
              onCategoryFilterChange('todos');
            }}
            className="text-red-600 hover:text-red-800 underline font-semibold text-xs"
          >
            Restablecer todos los filtros
          </button>
        </div>
      )}
    </div>
  );
};
