import React from 'react';
import { X, Coins, CheckCircle, Info, Printer, RefreshCw } from 'lucide-react';
import { CartItem } from '../../types/catalog';
import { formatCOP, formatFichos, calculateFichos, FICHO_VALUE_COP } from '../../utils/formatters';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalCOP: number;
  onClearCart: () => void;
}

export const SummaryModal: React.FC<Props> = ({
  isOpen,
  onClose,
  cartItems,
  totalCOP,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalFichos = calculateFichos(totalCOP);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-amber-400 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header banner */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white p-5 sm:p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-amber-300 transition-colors"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto mb-3 bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white">
            <Coins className="w-8 h-8 text-red-900" />
          </div>

          <span className="text-xs font-bold tracking-widest text-amber-300 uppercase block mb-1">
            Simulación Día de la Antioqueñidad
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Resumen de Fichos Necesarios
          </h2>
        </div>

        {/* Modal content body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Main Ficho Callout Card */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/70 border-2 border-amber-300 rounded-2xl p-4 text-center space-y-2">
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wide">
              Fichos Totales a Adquirir en Banco
            </div>
            <div className="text-3xl sm:text-4xl font-black text-red-700 tracking-tight">
              {formatFichos(totalFichos)}
            </div>
            <div className="text-xs text-slate-600 font-medium pt-1 border-t border-amber-200">
              Valor equivalente en pesos: <strong className="text-slate-900 font-bold">{formatCOP(totalCOP)}</strong>
              <span className="block text-[11px] text-amber-800 mt-0.5">
                (Tasa fija institucional: 1 Ficho = {formatCOP(FICHO_VALUE_COP)})
              </span>
            </div>
          </div>

          {/* Itemized Table Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Detalle de Productos Seleccionados ({totalQuantity})
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 max-h-48 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.product.id} className="p-3 text-xs flex justify-between items-center bg-slate-50/50">
                  <div>
                    <div className="font-bold text-slate-800">{item.product.name}</div>
                    <div className="text-[11px] text-slate-500">
                      {item.municipioName} • {item.quantity} x {formatCOP(item.product.price)}
                    </div>
                  </div>
                  <div className="text-right font-bold text-red-700">
                    {formatFichos(calculateFichos(item.product.price * item.quantity))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Educational notice banner */}
          <div className="flex gap-3 bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block font-bold">¿Dónde comprar los fichos?</strong>
              <p className="text-blue-800 leading-relaxed">
                Dirígete a la <strong>Sala de Informática (Banco #1)</strong> o a <strong>Secretaría (Banco #2)</strong> para adquirir tus fichos en efectivo con este cálculo en mano.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center text-center">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Simulación educativa sin pasarela de pagos ni cobros electrónicos.</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap sm:flex-nowrap gap-2">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Ticket</span>
          </button>

          <button
            onClick={() => {
              onClearCart();
              onClose();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-red-50 text-red-700 font-bold text-xs hover:bg-red-100 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Nuevo Cálculo</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto flex-1 py-2.5 px-4 rounded-xl bg-red-600 text-amber-300 font-bold text-xs hover:bg-red-700 transition-colors shadow-sm"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
