import React from 'react';
import { X, Trash2, Plus, Minus, Calculator, Coins, ShoppingBag } from 'lucide-react';
import { CartItem } from '../../types/catalog';
import { formatCOP, formatFichos, calculateFichos, FICHO_VALUE_COP } from '../../utils/formatters';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onFinalizeCalculation: () => void;
}

export const CartDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onFinalizeCalculation,
}) => {
  if (!isOpen) return null;

  const totalCOP = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalFichosNeeded = calculateFichos(totalCOP);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l-2 border-amber-400">
          {/* Drawer Header */}
          <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white p-5 flex items-center justify-between border-b-2 border-amber-400">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-400 text-slate-950 rounded-xl shadow-md">
                <Calculator className="w-6 h-6 text-red-900" />
              </div>
              <div>
                <h2 className="font-black text-lg sm:text-xl text-white">Calculadora de Fichos</h2>
                <p className="text-xs text-amber-200">
                  {totalItemsCount} {totalItemsCount === 1 ? 'producto en carrito' : 'productos seleccionados'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/20 text-amber-300 transition-colors"
              title="Cerrar calculadora"
              aria-label="Cerrar calculadora"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Body - Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-700 text-base">Tu carrito está vacío</h3>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Agrega productos del catálogo para calcular la cantidad exacta de fichos que necesitarás en el evento.
                </p>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemTotalCOP = item.product.price * item.quantity;
                const itemFichos = calculateFichos(itemTotalCOP);

                return (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-200 transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
                          {item.municipioName}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-slate-500">
                          {formatCOP(item.product.price)} c/u
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-2xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-1.5 hover:bg-slate-100 text-slate-600 transition-colors"
                          title="Disminuir"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 font-bold text-slate-800 text-xs min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-1.5 hover:bg-slate-100 text-slate-600 transition-colors"
                          title="Aumentar"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line total in Pesos & Fichos */}
                      <div className="text-right">
                        <div className="font-extrabold text-red-700 text-sm">
                          {formatCOP(itemTotalCOP)}
                        </div>
                        <div className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block">
                          {formatFichos(itemFichos)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer - Calculations & Actions */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-slate-900 text-white border-t-2 border-amber-400 space-y-4">
              {/* Summary Stats Grid */}
              <div className="space-y-2 text-xs bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
                <div className="flex justify-between text-slate-300">
                  <span>Cantidad de productos:</span>
                  <span className="font-bold text-white">{totalItemsCount} unidades</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal en Pesos:</span>
                  <span className="font-bold text-white">{formatCOP(totalCOP)}</span>
                </div>
                <div className="flex justify-between text-slate-300 border-t border-slate-700 pt-1.5">
                  <span className="text-slate-200 font-semibold">Tasa de cambio:</span>
                  <span className="text-amber-300 font-medium">1 Ficho = {formatCOP(FICHO_VALUE_COP)}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-700">
                  <span className="font-black text-amber-300 flex items-center gap-1.5">
                    <Coins className="w-4 h-4" />
                    Total Fichos Necesarios:
                  </span>
                  <span className="text-xl font-black text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-xl border border-amber-400/30">
                    {formatFichos(totalFichosNeeded)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={onFinalizeCalculation}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-amber-300 font-black rounded-xl text-sm shadow-lg border border-amber-400 flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  <Coins className="w-5 h-5 text-amber-300" />
                  <span>Finalizar Cálculo de Fichos</span>
                </button>

                <button
                  onClick={onClearCart}
                  className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Vaciar Carrito</span>
                </button>
              </div>

              <div className="text-[10px] text-slate-400 text-center leading-tight">
                * Simulación de fichos para el evento escolar. No realiza cobranza real ni pagos en línea.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
