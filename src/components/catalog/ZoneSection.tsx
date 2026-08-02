import React from 'react';
import { Globe, MapPin } from 'lucide-react';
import { Zone, Product } from '../../types/catalog';
import { MunicipioCard } from './MunicipioCard';

interface Props {
  zone: Zone;
  getCartQuantity: (productId: string) => number;
  onAddToCart: (product: Product, municipioName: string, categoryName: string) => void;
}

export const ZoneSection: React.FC<Props> = ({
  zone,
  getCartQuantity,
  onAddToCart,
}) => {
  return (
    <section className="space-y-6 scroll-mt-28">
      {/* Zone Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 p-5 sm:p-6 rounded-3xl border-2 border-amber-500 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-red-700 text-amber-300 font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
            <Globe className="w-3.5 h-3.5" />
            <span>Zona Antioqueña</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            {zone.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 font-medium max-w-xl">
            {zone.description}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-2xl border border-amber-500/30 text-xs font-bold text-red-900 shadow-2xs">
          <MapPin className="w-4 h-4 text-red-700" />
          <span>{zone.municipios.length} {zone.municipios.length === 1 ? 'Municipio' : 'Municipios'}</span>
        </div>
      </div>

      {/* Municipios List */}
      <div className="space-y-10">
        {zone.municipios.map((municipio) => (
          <MunicipioCard
            key={municipio.id}
            municipio={municipio}
            getCartQuantity={getCartQuantity}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};
