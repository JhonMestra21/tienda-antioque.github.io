import React from 'react';
import { Landmark, MapPin, Coins, Info, Sparkles } from 'lucide-react';
import { BANK_POINTS } from '../../data/antioquianData';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';

export const BanksSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-yellow-400 space-y-6">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-400/60 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
            <Coins className="w-3.5 h-3.5 text-red-900" />
            <span>Puntos Oficiales de Cambio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-yellow-300 tracking-tight flex items-center gap-2">
            <Landmark className="w-8 h-8 text-yellow-400" />
            <span>Bancos - Compra de Fichos</span>
          </h2>
          <p className="text-xs sm:text-sm text-red-100 max-w-2xl leading-relaxed">
            Para realizar compras en cualquier municipio del evento, dirígete a uno de los dos bancos oficiales para cambiar tu dinero por fichos.
          </p>
        </div>

        <div className="bg-red-800/80 border border-yellow-400/40 p-4 rounded-2xl text-xs space-y-1 text-yellow-200 font-semibold max-w-xs">
          <div className="flex items-center gap-1.5 font-bold text-yellow-400 text-sm">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Tasa de Fichos</span>
          </div>
          <p>1 Ficho = $1.000 COP</p>
          <p className="text-[11px] text-red-100 font-normal">
            Calcula tus fichos desde nuestra calculadora interactiva en el menú principal.
          </p>
        </div>
      </div>

      {/* Bank Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BANK_POINTS.map((bank) => (
          <div
            key={bank.id}
            className="bg-white text-slate-900 rounded-2xl p-5 border-2 border-yellow-400 shadow-xl space-y-4 hover:scale-[1.01] transition-transform"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-yellow-300 flex items-center justify-center font-black shadow-md">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    {bank.name}
                  </h3>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{bank.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {bank.description}
            </p>

            {/* Placeholder space for bank photograph as requested */}
            <div className="pt-2">
              <ImagePlaceholder
                title={bank.name}
                type="banco"
                subtitle={`Fotografía de ${bank.location}`}
                heightClass="h-36"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Info notice footer */}
      <div className="flex items-center gap-3 bg-red-800/60 border border-yellow-400/30 p-3.5 rounded-2xl text-xs text-yellow-200">
        <Info className="w-5 h-5 text-yellow-400 shrink-0" />
        <p>
          Recuerda llevar billetes o monedas sencillas para agilizar la entrega de tus fichos en la ventanilla del banco.
        </p>
      </div>
    </section>
  );
};
