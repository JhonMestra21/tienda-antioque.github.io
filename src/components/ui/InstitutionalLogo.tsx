import React from 'react';

interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const InstitutionalLogo: React.FC<Props> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-8 h-10',
    md: 'w-12 h-14',
    lg: 'w-16 h-20',
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
      <img
        src="logo.svg"
        alt="Escudo Institucional"
        className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-200 hover:scale-105"
        onError={(e) => {
          // Fallback if SVG fails to load
          const target = e.target as HTMLElement;
          target.style.display = 'none';
        }}
      />
    </div>
  );
};
