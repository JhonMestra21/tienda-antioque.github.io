import React from 'react';
import { ShoppingBag, ArrowRight, Coins } from 'lucide-react';
import { formatCOP, formatFichos, calculateFichos } from '../../utils/formatters';

interface Props {
  totalItems: number;
  totalCOP: number;
  onOpenCart: () => void;
}

export const CartFloatingBar: React.FC<Props> = ({ totalItems, totalCOP, onOpenCart }) => {
  if (totalItems === 0) return null;

  const totalFichos = calculateFichos(totalCOP);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg">
      <button
        onClick={onOpenCart}
        className="w-full bg-slate-900 text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border-2 border-yellow-400 flex items-center justify-between gap-3 hover:bg-slate-800 transition-all transform hover:-translate-y-0.5 active:translate-y-0 group"
      >
        <div className="flex items-center gap-3">
          <div className="relative bg-red-600 text-white p-2.5 rounded-xl shadow-inner">
            <ShoppingBag className="w-5 h-5 text-yellow-300" />
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-slate-950 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900">
              {totalItems}
            </span>
          </div>

          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold text-yellow-300 text-sm sm:text-base">
                {formatFichos(totalFichos)}
              </span>
              <span className="text-slate-400 text-xs">• {totalItems} {totalItems === 1 ? 'producto' : 'productos'}</span>
            </div>
            <div className="text-xs text-slate-300 font-medium">
              Total en Pesos: <strong className="text-white">{formatCOP(totalCOP)}</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-colors">
          <Coins className="w-4 h-4 text-yellow-300" />
          <span>Ver Fichos</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>
    </div>
  );
};
