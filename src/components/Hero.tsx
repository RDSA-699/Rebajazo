import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Clock, Sparkles, Star, MapPin } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onExploreAbout: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onExploreAbout }) => {
  return (
    <section className="relative bg-stone-950 text-white overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Campaign Label */}
            <div className="inline-flex items-center gap-2 bg-stone-900 border border-stone-800 text-stone-200 px-3.5 py-1.5 rounded-full text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="font-semibold text-red-400">Ofertas Especiales Colombia</span>
              <span className="text-stone-600">·</span>
              <span className="text-stone-300">Descuentos de hasta el 40%</span>
            </div>

            {/* Main Headline with Solid Highlight Color (NO Gradient font) */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-balance">
              Todo lo que buscas, al{' '}
              <span className="text-yellow-400 underline decoration-red-600 decoration-wavy decoration-2 underline-offset-6">
                mejor precio
              </span>{' '}
              en Colombia.
            </h1>

            {/* Subtitle */}
            <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Conectamos compradores y vendedores de toda Colombia. Explora tecnología, hogar, moda y belleza a precios inigualables con <strong>pago contra entrega</strong> en efectivo.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onExploreCatalog}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer hover:scale-[1.02]"
              >
                <span>Ver Todo el Catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreAbout}
                className="bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 font-semibold px-5 py-3.5 rounded-xl transition-colors text-xs sm:text-sm cursor-pointer"
              >
                Conócenos
              </button>
            </div>

            {/* Trust Bullets */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left border-t border-stone-800/80">
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <Truck className="w-4 h-4 text-red-500 shrink-0" />
                <span>+900 municipios cubiertos</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pago contra entrega seguro</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-400 col-span-2 sm:col-span-1">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Despachos el mismo día</span>
              </div>
            </div>
          </div>

          {/* Right Column: Company Brand Icon & Trust Showcase Card (Restored Company Emblem) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-stone-900/90 rounded-3xl p-8 border border-stone-800 shadow-2xl backdrop-blur-md flex flex-col items-center justify-center text-center group">
              {/* Outer decorative halo */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-600/20 to-amber-500/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />

              {/* Company Logo Icon (Red Bag with %) */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white p-3.5 shadow-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 512 512" className="w-full h-full" fill="none">
                  {/* Bag handle */}
                  <path
                    d="M192 144C192 108.654 220.654 80 256 80C291.346 80 320 108.654 320 144V160H192V144Z"
                    stroke="#E31C25"
                    strokeWidth="34"
                    strokeLinecap="round"
                  />
                  {/* Red bag body */}
                  <path d="M128 160H384L416 432H96L128 160Z" fill="#E31C25" />
                  {/* White Percentage Symbol */}
                  <circle cx="218" cy="242" r="18" fill="white" />
                  <circle cx="294" cy="350" r="18" fill="white" />
                  <line
                    x1="316"
                    y1="226"
                    x2="196"
                    y2="366"
                    stroke="white"
                    strokeWidth="28"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Value proposition */}
              <h3 className="relative text-2xl sm:text-3xl font-black text-white tracking-tight">
                Descuentos de hasta el 40%
              </h3>

              <p className="relative text-xs sm:text-sm text-stone-300 mt-2 max-w-xs leading-relaxed">
                Aprovecha envíos express garantizados a más de 900 municipios de Colombia con pago al recibir en tu puerta.
              </p>

              {/* Time limited promotional badge */}
              <div className="relative mt-5 inline-flex items-center gap-2 bg-yellow-400 text-stone-950 font-black px-4 py-2 rounded-xl text-xs shadow-md">
                <Clock className="w-4 h-4 text-stone-950" />
                <span>Promociones por tiempo limitado</span>
              </div>

              {/* Store & Rating sub-badge */}
              <div className="relative mt-4 flex items-center gap-2 text-[11px] text-stone-400">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>Despachos desde Bucaramanga, Santander</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
