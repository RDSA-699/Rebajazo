import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Zap, HeartHandshake, Award, Truck, MapPin, ArrowRight } from 'lucide-react';
import storeFacadeImg from '../assets/images/store_fachada_moderna_1790447516070.jpg';

interface AboutViewProps {
  onExploreCatalog: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onExploreCatalog }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'Sede Principal & Atención al Cliente',
      subtitle: 'Cra 27 # 45-30, Bucaramanga, Santander, Colombia',
      image: storeFacadeImg,
      description: 'Nuestro punto corporativo y showroom de atención personalizada para clientes y aliados en Santander.',
    },
    {
      title: 'Centro de Distribución & Almacenamiento',
      subtitle: 'Bodega Principal con más de 2.500 m² de inventario',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      description: 'Operación logística sistematizada con despacho en menos de 24 horas a todas las regiones de Colombia.',
    },
    {
      title: 'Flota de Transporte & Envíos Nacionales',
      subtitle: 'Alianzas con Servientrega, Coordinadora e Interrapidísimo',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
      description: 'Rutas terrestres y aéreas con trazabilidad en tiempo real y cobro contra entrega garantizado.',
    },
  ];

  const handleNext = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="py-12 space-y-16">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-red-600 font-bold text-xs uppercase tracking-widest">
          Nuestra Trayectoria & Compromiso
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          Conecta con Rebajazo Colombia
        </h1>
        <p className="text-stone-500 text-sm max-w-2xl mx-auto leading-relaxed">
          Llevamos variedad, precios imbatibles y confianza a miles de hogares en más de 900 municipios colombianos.
        </p>
      </section>

      {/* Main Story & Interactive Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text Story */}
          <div className="lg:col-span-6 space-y-5">
            <span className="text-red-600 font-bold text-xs uppercase tracking-widest">
              ¿Quiénes Somos?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
              Tu tienda multicategoría de confianza en Colombia
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              En <strong>Rebajazo</strong> nos dedicamos a ofrecer un catálogo seleccionado con los más altos estándares de calidad y al precio más competitivo del mercado nacional. Desde tecnología de punta y artículos para el hogar hasta moda urbana y cuidado personal.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Nacimos con la firme convicción de que comprar por internet en Colombia debe ser una experiencia transparente, ágil y totalmente segura, respaldada por un punto de atención físico en Bucaramanga y un centro de distribución optimizado para despachar tus pedidos el mismo día.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-stone-200">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-stone-900">Garantía Real 30 Días</h4>
                  <p className="text-[11px] text-stone-500">Respaldo directo en cada compra</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-stone-200">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-stone-900">Envíos Rápidos</h4>
                  <p className="text-[11px] text-stone-500">Cobertura en todo el país</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Image Showcase Slider */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200 bg-stone-900 aspect-[16/11]">
              <img
                src={slides[activeSlide].image}
                alt={slides[activeSlide].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500"
              />

              {/* Overlay with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <span className="text-red-400 font-semibold text-xs flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {slides[activeSlide].subtitle}
                </span>
                <h3 className="text-lg sm:text-xl font-bold">{slides[activeSlide].title}</h3>
                <p className="text-xs text-stone-300 mt-1 max-w-md">{slides[activeSlide].description}</p>
              </div>

              {/* Controls */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-stone-900 flex items-center justify-center shadow-md backdrop-blur-xs transition-colors cursor-pointer"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-stone-900 flex items-center justify-center shadow-md backdrop-blur-xs transition-colors cursor-pointer"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dot Indicators */}
              <div className="absolute bottom-4 right-6 flex items-center gap-1.5 z-10">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeSlide === i ? 'w-6 bg-red-600' : 'w-2 bg-white/50 hover:bg-white'
                    }`}
                    aria-label={`Ver foto ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Foundational Pillars */}
      <section className="bg-stone-100/70 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-red-600 font-bold text-xs uppercase tracking-widest">
              Nuestros 4 Pilares
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              Lo que nos hace diferentes en el mercado
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-stone-900">1. Transparencia Total</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Sin cargos ocultos ni letras chiquitas. Precios netos en pesos colombianos y costos de envío claros desde el primer clic.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-stone-900">2. Agilidad Operativa</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Procesamos las órdenes el mismo día desde nuestra bodega en Bucaramanga para garantizar entregas en 2 a 4 días hábiles.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-stone-900">3. Atención Humana</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Asesores reales en WhatsApp dispuestos a guiarte antes, durante y después de recibir tu compra.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-stone-900">4. Calidad Verificada</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Cada producto pasa por revisión funcional de empaque y funcionamiento antes de ser despachado al mensajero.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black">
            ¿Listo para comprobar la experiencia Rebajazo?
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto">
            Explora las promociones activas y pide con tranquilidad con pago contra entrega en tu domicilio.
          </p>
          <div className="pt-2">
            <button
              onClick={onExploreCatalog}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-colors text-xs sm:text-sm cursor-pointer"
            >
              <span>Ver Catálogo Disponible</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
