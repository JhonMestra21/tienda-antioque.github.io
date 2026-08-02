import React from 'react';
import { MapPin, Users, Utensils, LayoutGrid, TableProperties } from 'lucide-react';
import { Municipio, Product } from '../../types/catalog';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';
import { ProductCard } from './ProductCard';
import { ProductTable } from './ProductTable';

interface Props {
  municipio: Municipio;
  getCartQuantity: (productId: string) => number;
  onAddToCart: (product: Product, municipioName: string, categoryName: string) => void;
}

export const MunicipioCard: React.FC<Props> = ({
  municipio,
  getCartQuantity,
  onAddToCart,
}) => {
  return (
    <article className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden transition-all hover:border-amber-400">
      {/* Municipality Header Banner */}
      <div className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white p-5 sm:p-6 border-b-4 border-amber-400 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-red-950/80 px-3 py-1 rounded-full border border-amber-400/30">
              Subregión {municipio.zoneName}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 bg-amber-400 px-3 py-1 rounded-full shadow-xs">
              <Users className="w-3.5 h-3.5 text-red-900" />
              Grados: {municipio.responsibleGrades}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-1">
            {municipio.name}
          </h2>
        </div>

        {/* Location Pin Badge */}
        <div className="inline-flex items-center gap-2 bg-red-900/90 border border-amber-400/40 text-amber-200 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-semibold shadow-inner">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{municipio.location}</span>
        </div>
      </div>

      {/* Municipality Body */}
      <div className="p-5 sm:p-8 space-y-8">
        {/* Placeholder Photo Space as explicitly requested */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-red-600" />
            <span>Fotografía del Municipio / Stand ({municipio.name})</span>
          </div>
          <ImagePlaceholder
            title={`Municipio de ${municipio.name}`}
            type="municipio"
            subtitle={`Ubicación: ${municipio.location} • Responsables: ${municipio.responsibleGrades}`}
            heightClass="h-48 sm:h-64"
          />
        </div>

        {/* Render Categories */}
        <div className="space-y-10">
          {municipio.categories.map((category) => {
            const productCount = category.products.length;
            const isSmallCategory = productCount <= 5; // User rule: <= 5 items -> cards, > 5 items -> table

            return (
              <section key={category.id} className="space-y-4 pt-4 border-t border-slate-100 first:border-0 first:pt-0">
                {/* Category Title & Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div className="space-y-0.5">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                      <span className="w-2.5 h-6 bg-red-600 rounded-full inline-block" />
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-xs text-slate-500 font-medium pl-4">
                        {category.description}
                      </p>
                    )}
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-2xs">
                    {isSmallCategory ? (
                      <>
                        <LayoutGrid className="w-3.5 h-3.5 text-amber-600" />
                        <span>{productCount} {productCount === 1 ? 'producto (Tarjetas)' : 'productos (Tarjetas)'}</span>
                      </>
                    ) : (
                      <>
                        <TableProperties className="w-3.5 h-3.5 text-red-600" />
                        <span>{productCount} productos (Tabla grande)</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Render Small Category as Cards Grid OR Large Category as Table */}
                {isSmallCategory ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {category.products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        municipioName={municipio.name}
                        categoryName={category.name}
                        cartQuantity={getCartQuantity(product.id)}
                        onAddToCart={onAddToCart}
                      />
                    ))}
                  </div>
                ) : (
                  <ProductTable
                    products={category.products}
                    municipioName={municipio.name}
                    categoryName={category.name}
                    getCartQuantity={getCartQuantity}
                    onAddToCart={onAddToCart}
                  />
                )}
              </section>
            );
          })}
        </div>
      </div>
    </article>
  );
};
