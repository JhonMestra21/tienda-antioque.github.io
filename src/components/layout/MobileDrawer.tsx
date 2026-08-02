import React from 'react';
import { X, Globe, MapPin, Calculator, Coins, Compass } from 'lucide-react';
import { ZONES_DATA } from '../../data/antioquianData';
import { InstitutionalLogo } from '../ui/InstitutionalLogo';
import { CategoryFilterType } from '../../types/catalog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedZoneId: string;
  onSelectZone: (zoneId: string) => void;
  selectedMunicipioId: string;
  onSelectMunicipio: (muniId: string) => void;
  activeCategoryFilter: CategoryFilterType;
  onCategoryFilterChange: (filter: CategoryFilterType) => void;
  onOpenCart: () => void;
  totalCartItems: number;
}

export const MobileDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedZoneId,
  onSelectZone,
  selectedMunicipioId,
  onSelectMunicipio,
  activeCategoryFilter,
  onCategoryFilterChange,
  onOpenCart,
  totalCartItems,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs lg:hidden animate-fadeIn">
      <div className="absolute inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col border-r-4 border-amber-400">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-800 to-red-700 text-white p-5 flex items-center justify-between border-b-2 border-amber-400">
            <div className="flex items-center gap-3">
              <InstitutionalLogo size="sm" />
              <div>
                <h2 className="font-black text-lg text-amber-300">Día de la Antioqueñidad</h2>
                <span className="text-xs text-red-100">Menú del Evento</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/20 text-amber-300 transition-colors"
              title="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 text-sm">
            {/* Quick Action: Calculator */}
            <button
              onClick={() => {
                onClose();
                onOpenCart();
              }}
              className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white p-3.5 rounded-2xl border-2 border-amber-400 flex items-center justify-between shadow-md"
            >
              <div className="flex items-center gap-2.5">
                <Calculator className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-amber-300">Calculadora de Fichos</span>
              </div>
              <span className="bg-red-600 text-amber-300 font-extrabold text-xs px-2.5 py-1 rounded-full border border-amber-400">
                {totalCartItems} items
              </span>
            </button>

            {/* Zones Section */}
            <div className="space-y-2">
              <div className="text-xs font-black uppercase tracking-wider text-red-800 flex items-center gap-1.5 border-b border-red-100 pb-1">
                <Globe className="w-4 h-4 text-red-600" />
                <span>Explorar por Zonas</span>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => {
                    onSelectZone('todos');
                    onSelectMunicipio('todos');
                    onClose();
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    selectedZoneId === 'todos' ? 'bg-red-600 text-amber-300' : 'hover:bg-amber-50 text-slate-800'
                  }`}
                >
                  🗺️ Todo Antioquia
                </button>

                <button
                  onClick={() => {
                    onSelectZone('bancos');
                    onSelectMunicipio('bancos');
                    onClose();
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    selectedZoneId === 'bancos' ? 'bg-red-600 text-amber-300' : 'hover:bg-amber-50 text-slate-800'
                  }`}
                >
                  🏦 Bancos - Compra de Fichos
                </button>

                {ZONES_DATA.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => {
                      onSelectZone(zone.id);
                      onSelectMunicipio('todos');
                      onClose();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      selectedZoneId === zone.id ? 'bg-red-600 text-amber-300' : 'hover:bg-amber-50 text-slate-800'
                    }`}
                  >
                    📍 {zone.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Category Filters */}
            <div className="space-y-2">
              <div className="text-xs font-black uppercase tracking-wider text-red-800 flex items-center gap-1.5 border-b border-red-100 pb-1">
                <Compass className="w-4 h-4 text-red-600" />
                <span>Categorías Populares</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { id: 'todos', label: 'Todos', icon: '✨' },
                  { id: 'postres', label: 'Postres', icon: '🍰' },
                  { id: 'bebidas', label: 'Bebidas', icon: '🥤' },
                  { id: 'comidas', label: 'Comidas', icon: '🍔' },
                  { id: 'dulces', label: 'Dulces', icon: '🍬' },
                  { id: 'panaderia', label: 'Panadería', icon: '🥐' },
                  { id: 'atripciones', label: 'Juegos', icon: '🎪' },
                  { id: 'bancos', label: 'Bancos', icon: '🏦' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onCategoryFilterChange(item.id as CategoryFilterType);
                      onClose();
                    }}
                    className={`p-2 rounded-xl text-left font-semibold text-xs flex items-center gap-1.5 border ${
                      activeCategoryFilter === item.id
                        ? 'bg-amber-400 text-slate-950 border-amber-500 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-slate-100 text-xs text-slate-500 text-center border-t border-slate-200">
            Día de la Antioqueñidad © 2026
          </div>
        </div>
      </div>
    </div>
  );
};
