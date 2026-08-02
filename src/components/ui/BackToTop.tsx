import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-3 bg-red-600 hover:bg-red-700 text-amber-300 rounded-full shadow-xl border-2 border-amber-400/50 hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-red-300"
      title="Volver arriba"
      aria-label="Volver arriba"
    >
      <ChevronUp className="w-6 h-6 stroke-[3]" />
    </button>
  );
};
