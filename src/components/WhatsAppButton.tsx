import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const handleClick = () => {
    const text = encodeURIComponent(
      '¡Hola Rebajazo Colombia! Tengo una consulta sobre un producto del catálogo y el pago contra entrega.'
    );
    window.open(`https://wa.me/573001234567?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
      {/* Tooltip on hover */}
      <span className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-stone-900 text-white text-xs font-medium py-1.5 px-3 rounded-xl shadow-lg border border-stone-800 pointer-events-none whitespace-nowrap">
        ¿Dudas? Chatea con un asesor 💬
      </span>

      {/* Button */}
      <button
        onClick={handleClick}
        className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:scale-110 cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
        aria-label="Contactar por WhatsApp a Rebajazo Colombia"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </button>
    </div>
  );
};
