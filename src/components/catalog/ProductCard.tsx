import React from 'react';
import { Plus, Check, Coins, Sparkles } from 'lucide-react';
import { Product } from '../../types/catalog';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';
import { formatCOP, formatFichos, calculateFichos } from '../../utils/formatters';

interface Props {
  product: Product;
  municipioName: string;
  categoryName: string;
  cartQuantity: number;
  onAddToCart: (product: Product, municipioName: string, categoryName: string) => void;
}

export const ProductCard: React.FC<Props> = ({
  product,
  municipioName,
  categoryName,
  cartQuantity,
  onAddToCart,
}) => {
  const fichosNeeded = calculateFichos(product.price);

  return (
    <div className="group relative bg-white rounded-2xl border-2 border-slate-200/80 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Popular badge if applicable */}
      {product.popular && (
        <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md border border-amber-200">
          <Sparkles className="w-3 h-3 text-red-800" />
          <span>Popular</span>
        </div>
      )}

      {/* Cart quantity floating pill */}
      {cartQuantity > 0 && (
        <div className="absolute top-3 right-3 z-10 bg-red-600 text-amber-300 font-extrabold text-xs px-2.5 py-1 rounded-full shadow-md border-2 border-amber-400 animate-bounce">
          {cartQuantity} en carrito
        </div>
      )}

      {/* Image space placeholder as requested */}
      <div className="p-3">
        <ImagePlaceholder
          title={product.name}
          type="producto"
          subtitle={formatCOP(product.price)}
          heightClass="h-36 sm:h-40"
        />
      </div>

      {/* Product Information */}
      <div className="p-4 pt-1 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <h4 className="font-bold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-red-700 transition-colors">
            {product.name}
          </h4>

          {product.description && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Pricing & Token Equivalency */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Precio
            </div>
            <div className="text-lg font-black text-red-700 tracking-tight">
              {formatCOP(product.price)}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Fichos
            </div>
            <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 font-extrabold text-xs px-2 py-1 rounded-lg border border-amber-200">
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              <span>{formatFichos(fichosNeeded)}</span>
            </div>
          </div>
        </div>

        {/* Add button */}
        <button
          onClick={() => onAddToCart(product, municipioName, categoryName)}
          className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
            cartQuantity > 0
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-400'
              : 'bg-red-600 hover:bg-red-700 text-amber-300 border border-amber-400'
          }`}
        >
          {cartQuantity > 0 ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Agregar más (+1)</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Agregar a Calculadora</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
