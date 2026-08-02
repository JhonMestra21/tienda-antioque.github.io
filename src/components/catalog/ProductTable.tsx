import React, { useState } from 'react';
import { Plus, ArrowUpDown, Coins, Sparkles } from 'lucide-react';
import { Product } from '../../types/catalog';
import { formatCOP, formatFichos, calculateFichos } from '../../utils/formatters';

interface Props {
  products: Product[];
  municipioName: string;
  categoryName: string;
  getCartQuantity: (productId: string) => number;
  onAddToCart: (product: Product, municipioName: string, categoryName: string) => void;
}

export const ProductTable: React.FC<Props> = ({
  products,
  municipioName,
  categoryName,
  getCartQuantity,
  onAddToCart,
}) => {
  const [sortField, setSortField] = useState<'name' | 'price'>('name');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const handleSort = (field: 'name' | 'price') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortField === 'name') {
      return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else {
      return sortAsc ? a.price - b.price : b.price - a.price;
    }
  });

  return (
    <div className="w-full border-2 border-slate-200 rounded-2xl overflow-hidden shadow-md bg-white">
      {/* Table scroll container for mobile responsiveness */}
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto no-scrollbar relative">
        <table className="w-full text-left border-collapse min-w-[500px]">
          {/* Sticky Header */}
          <thead className="sticky top-0 z-20 bg-gradient-to-r from-red-700 via-red-800 to-red-700 text-amber-300 font-black text-xs uppercase tracking-wider shadow-sm">
            <tr>
              <th
                onClick={() => handleSort('name')}
                className="py-3.5 px-4 cursor-pointer hover:bg-red-800 transition-colors select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>Producto ({products.length})</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </th>

              <th
                onClick={() => handleSort('price')}
                className="py-3.5 px-4 text-right cursor-pointer hover:bg-red-800 transition-colors select-none"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Precio Pesos</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </th>

              <th className="py-3.5 px-4 text-right">Fichos</th>
              <th className="py-3.5 px-4 text-center">Acción</th>
            </tr>
          </thead>

          {/* Table Body with alternating rows & hover */}
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {sortedProducts.map((product, idx) => {
              const quantity = getCartQuantity(product.id);
              const fichosNeeded = calculateFichos(product.price);
              const isEven = idx % 2 === 0;

              return (
                <tr
                  key={product.id}
                  className={`transition-colors hover:bg-amber-50/80 group ${
                    isEven ? 'bg-white' : 'bg-slate-50/60'
                  }`}
                >
                  {/* Product Name & details */}
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    <div className="flex items-center gap-2">
                      <span>{product.name}</span>
                      {product.popular && (
                        <span className="inline-flex items-center gap-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-300">
                          <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                          Popular
                        </span>
                      )}
                    </div>
                    {product.description && (
                      <div className="text-[11px] font-normal text-slate-500 mt-0.5">
                        {product.description}
                      </div>
                    )}
                  </td>

                  {/* Price COP */}
                  <td className="py-3 px-4 text-right font-extrabold text-red-700 whitespace-nowrap">
                    {formatCOP(product.price)}
                  </td>

                  {/* Fichos Token Count */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-bold text-slate-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <Coins className="w-3 h-3 text-amber-600" />
                      {formatFichos(fichosNeeded)}
                    </span>
                  </td>

                  {/* Add Button Column */}
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => onAddToCart(product, municipioName, categoryName)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 ${
                        quantity > 0
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-red-600 hover:bg-red-700 text-amber-300'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{quantity > 0 ? `+1 (${quantity})` : 'Agregar'}</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
