import React from 'react';
import { Menu, ShoppingBag, Search, Sparkles } from 'lucide-react';
import { InstitutionalLogo } from '../ui/InstitutionalLogo';
import { calculateFichos, formatFichos } from '../../utils/formatters';

interface Props {
  totalCartItems: number;
  totalCartCOP: number;
  onOpenCart: () => void;
  onToggleMobileDrawer: () => void;
  onToggleSearchFocus?: () => void;
}

export const Header: React.FC<Props> = ({
  totalCartItems,
  totalCartCOP,
  onOpenCart,
  onToggleMobileDrawer,
}) => {
  const totalFichos = calculateFichos(totalCartCOP);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white shadow-xl border-b-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-3">
        {/* Left Side: Mobile Menu Button + Institutional Logo & Event Title */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onToggleMobileDrawer}
            className="lg:hidden p-2 rounded-xl bg-red-900/60 hover:bg-red-900 text-amber-300 border border-amber-400/40 transition-colors"
            title="Abrir menú"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="w-6 h-6" />
          </button>

          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <InstitutionalLogo size="md" />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs font-black tracking-widest text-amber-300 uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Institución Educativa
              </span>
              <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-amber-200 transition-colors">
                Día de la Antioqueñidad
              </h1>
              <span className="text-[11px] sm:text-xs text-red-100/90 font-medium hidden sm:block">
                Catálogo de Productos & Calculadora de Fichos
              </span>
            </div>
          </a>
        </div>

        {/* Right Side: Cart / Ficho Calculator Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-extrabold shadow-lg border-2 border-amber-200 transition-all transform hover:scale-105 active:scale-95"
            title="Ver calculadora de fichos"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-red-900 stroke-[2.5]" />
              {totalCartItems > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-red-700 text-amber-300 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-amber-400 animate-pulse">
                  {totalCartItems}
                </span>
              )}
            </div>

            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-[11px] uppercase tracking-wider text-slate-800 font-bold">
                Calculadora
              </span>
              <span className="text-xs font-black text-red-950">
                {totalCartItems > 0 ? formatFichos(totalFichos) : '0 Fichos'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
