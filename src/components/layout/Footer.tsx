import React from 'react';
import { InstitutionalLogo } from '../ui/InstitutionalLogo';
import { Coins, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white mt-16 border-t-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <InstitutionalLogo size="sm" />
              <div>
                <h3 className="font-black text-lg text-yellow-300">
                  Día de la Antioqueñidad
                </h3>
                <p className="text-xs text-slate-400">
                  Evento Institucional & Cultural
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Catálogo oficial de productos por municipio, grado y zona de Antioquia.
            </p>
          </div>

          {/* Ficho Mechanics Explanation */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 text-yellow-400 font-bold justify-center md:justify-start">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span>Sistema de Fichos Institucionales</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Los productos se adquieren únicamente mediante fichos tokens. Compra tus fichos en la <strong>Sala de Informática (Banco #1)</strong> o en <strong>Secretaría (Banco #2)</strong>.
            </p>
          </div>

          {/* Institutional Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-yellow-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Comunidad Educativa Antioqueña</span>
            </div>
            <p>&copy; {new Date().getFullYear()} Día de la Antioqueñidad — Todos los derechos reservados.</p>
            <p className="text-[11px] text-slate-500 flex items-center gap-1">
              Diseñado con <Heart className="w-3 h-3 text-red-500 fill-red-500" /> para estudiantes y familias.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
