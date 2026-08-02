import React from 'react';
import { Camera, MapPin, Image as ImageIcon } from 'lucide-react';

interface Props {
  title: string;
  type?: 'municipio' | 'producto' | 'banco';
  subtitle?: string;
  className?: string;
  heightClass?: string;
}

export const ImagePlaceholder: React.FC<Props> = ({
  title,
  type = 'municipio',
  subtitle,
  className = '',
  heightClass = 'h-48 sm:h-56',
}) => {
  return (
    <div
      className={`relative w-full ${heightClass} bg-slate-100 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-300 overflow-hidden flex flex-col items-center justify-center p-4 text-center transition-all hover:border-red-400 group ${className}`}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-200/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 flex flex-col items-center gap-2 max-w-xs">
        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
          {type === 'municipio' ? (
            <MapPin className="w-6 h-6 text-red-700" />
          ) : type === 'banco' ? (
            <Camera className="w-6 h-6 text-red-700" />
          ) : (
            <ImageIcon className="w-6 h-6 text-amber-700" />
          )}
        </div>

        <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm sm:text-base line-clamp-1">
          {title}
        </span>

        {subtitle && (
          <span className="text-xs text-slate-500 font-medium">
            {subtitle}
          </span>
        )}

        <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 text-[11px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200 shadow-2xs">
          <Camera className="w-3.5 h-3.5 text-slate-400" />
          <span>Espacio para fotografía</span>
        </div>
      </div>
    </div>
  );
};
