import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { formatCOP } from '../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAllResults: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onViewAllResults,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const matches = query.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDesc.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter' && query.trim()) {
      onViewAllResults(query.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-red-600 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar por audífonos, smartwatch, zapatillas, hogar..."
            className="w-full text-sm font-medium text-stone-900 focus:outline-none placeholder:text-stone-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Cerrar búsqueda"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Box */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="py-6 px-2 text-xs text-stone-400">
              <span className="font-semibold text-stone-600 block mb-2">Búsquedas populares en Colombia:</span>
              <div className="flex flex-wrap gap-2">
                {['Audífonos Bluetooth', 'Smartwatch GPS', 'Zapatillas Urbanas', 'Freidora de Aire', 'Brochas Maquillaje'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : matches.length === 0 ? (
            <div className="py-12 text-center text-xs text-stone-500">
              <p className="font-semibold text-stone-700">No encontramos coincidencias para "{query}"</p>
              <p className="mt-1">Verifica la ortografía o intenta buscar por una categoría general.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 px-2 pb-1 flex justify-between items-center">
                <span>{matches.length} resultados encontrados</span>
                <button
                  onClick={() => {
                    onViewAllResults(query.trim());
                    onClose();
                  }}
                  className="text-red-600 hover:underline flex items-center gap-1 normal-case font-bold cursor-pointer"
                >
                  <span>Ver todos en el catálogo</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {matches.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-stone-50 transition-colors cursor-pointer border border-transparent hover:border-stone-200"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-contain bg-stone-100 rounded-xl p-1 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-stone-400 uppercase font-semibold">
                      {item.categoryLabel}
                    </span>
                    <h4 className="text-xs font-bold text-stone-900 truncate">{item.title}</h4>
                    <span className="text-xs font-bold text-red-600 tabular-nums">
                      {formatCOP(item.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
