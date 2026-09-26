import React, { useState, useEffect } from 'react';
import { Clock, Flame, ArrowRight, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { formatCOP } from '../utils/formatters';

interface FlashDealProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const FlashDeal: React.FC<FlashDealProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
}) => {
  // Countdown timer state initialized to 7 hours 45 mins
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="py-8 bg-gradient-to-r from-red-600 to-red-700 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-950/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 grid lg:grid-cols-12 gap-6 items-center">
          {/* Left: Deal Header & Timer */}
          <div className="lg:col-span-4 space-y-3">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-stone-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Oferta Relámpago del Día</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              Precios de Liquidación Directa
            </h2>

            <p className="text-xs text-stone-200 leading-relaxed">
              Unidades limitadas despachadas hoy mismo con garantía total y pago al recibir.
            </p>

            {/* Countdown clock */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-stone-300 block mb-1.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-yellow-300" />
                La oferta termina en:
              </span>
              <div className="flex items-center gap-2 font-mono text-center">
                <div className="bg-stone-900 border border-stone-800 px-3 py-2 rounded-xl min-w-[50px]">
                  <span className="text-lg font-black text-yellow-400 tabular-nums">
                    {formatDigit(timeLeft.hours)}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider block text-stone-400 font-sans">
                    Horas
                  </span>
                </div>
                <span className="text-xl font-bold text-yellow-400">:</span>
                <div className="bg-stone-900 border border-stone-800 px-3 py-2 rounded-xl min-w-[50px]">
                  <span className="text-lg font-black text-yellow-400 tabular-nums">
                    {formatDigit(timeLeft.minutes)}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider block text-stone-400 font-sans">
                    Min
                  </span>
                </div>
                <span className="text-xl font-bold text-yellow-400">:</span>
                <div className="bg-stone-900 border border-stone-800 px-3 py-2 rounded-xl min-w-[50px]">
                  <span className="text-lg font-black text-yellow-400 tabular-nums">
                    {formatDigit(timeLeft.seconds)}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider block text-stone-400 font-sans">
                    Seg
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Featured Product Preview */}
          <div className="lg:col-span-5 flex items-center gap-4 bg-white/10 rounded-2xl p-4 border border-white/10">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-2xl p-2 shrink-0 flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-300">
                {product.categoryLabel}
              </span>
              <h3 className="font-bold text-sm text-white line-clamp-2 mt-0.5">
                {product.title}
              </h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-lg sm:text-xl font-black text-yellow-300 tabular-nums">
                  {formatCOP(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-stone-300 line-through tabular-nums">
                    {formatCOP(product.oldPrice)}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-emerald-300 font-medium block mt-1">
                ✓ Solo quedan {product.stock} unidades disponibles
              </span>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="lg:col-span-3 flex flex-col gap-2.5">
            <button
              onClick={() => onAddToCart(product)}
              className="w-full bg-white hover:bg-stone-100 text-stone-900 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-red-600" />
              <span>Aprovechar Oferta</span>
            </button>

            <button
              onClick={() => onSelectProduct(product)}
              className="w-full bg-stone-950/60 hover:bg-stone-950 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Ver Especificaciones</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
