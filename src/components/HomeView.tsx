import React from 'react';
import { ArrowRight, Laptop, Home, Shirt, Sparkles, LayoutGrid, Star, ShieldCheck, Truck, Clock, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { Hero } from './Hero';
import { FlashDeal } from './FlashDeal';
import { ProductCard } from './ProductCard';
import { REVIEWS } from '../data/reviews';

interface HomeViewProps {
  products: Product[];
  onNavigate: (view: string, categoryFilter?: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  wishlist: number[];
  onToggleWishlist: (product: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  onNavigate,
  onAddToCart,
  onSelectProduct,
  wishlist,
  onToggleWishlist,
}) => {
  const flashProduct = products.find((p) => p.id === 1) || products[0];
  const featuredProducts = products.slice(0, 8);

  const categoryHighlights = [
    { id: 'tecnologia', name: 'Tecnología', icon: Laptop, count: '14+ productos', color: 'from-blue-500/10 to-indigo-500/10 text-indigo-600' },
    { id: 'hogar', name: 'Hogar & Cocina', icon: Home, count: '28+ productos', color: 'from-amber-500/10 to-orange-500/10 text-amber-600' },
    { id: 'moda', name: 'Moda Urbana', icon: Shirt, count: '20+ productos', color: 'from-rose-500/10 to-red-500/10 text-red-600' },
    { id: 'belleza', name: 'Belleza & Skincare', icon: Sparkles, count: '16+ productos', color: 'from-purple-500/10 to-pink-500/10 text-purple-600' },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section */}
      <Hero
        onExploreCatalog={() => onNavigate('productos')}
        onExploreAbout={() => onNavigate('nosotros')}
      />

      {/* 2. Category Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-1.5">
          <span className="text-red-600 font-bold text-xs uppercase tracking-widest">
            Líneas Especializadas
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Explora por Categoría
          </h2>
          <p className="text-xs text-stone-500">
            Encuentra rápidamente los mejores descuentos organizados por sección
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {categoryHighlights.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => onNavigate('productos', cat.id)}
                className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-red-300 hover:shadow-md transition-all text-center flex flex-col items-center justify-center group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-stone-100 group-hover:bg-red-50 text-stone-700 group-hover:text-red-600 flex items-center justify-center mb-3 transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-red-600 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-stone-400 mt-0.5">{cat.count}</span>
              </button>
            );
          })}

          {/* Ver Todo Card */}
          <button
            onClick={() => onNavigate('productos', 'todos')}
            className="bg-stone-900 hover:bg-red-600 text-white p-5 rounded-2xl border border-stone-800 transition-all text-center flex flex-col items-center justify-center group cursor-pointer col-span-2 sm:col-span-1 shadow-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <LayoutGrid className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm">Ver Todo</h3>
            <span className="text-[11px] text-stone-300 mt-0.5">Catálogo Completo →</span>
          </button>
        </div>
      </section>

      {/* 3. Flash Deal Banner */}
      <FlashDeal
        product={flashProduct}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
      />

      {/* 4. Featured Best Sellers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 pb-4 border-b border-stone-200 gap-2">
          <div>
            <span className="text-red-600 font-bold text-xs uppercase tracking-widest">
              Favoritos de Colombia
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Productos Más Vendidos
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Los artículos con mayor calificación y despacho prioritario en todo el territorio nacional.
            </p>
          </div>

          <button
            onClick={() => onNavigate('productos')}
            className="text-red-600 hover:text-red-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* 5. Customer Testimonials from Colombian Cities */}
      <section className="bg-stone-100/70 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-red-600 font-bold text-xs uppercase tracking-widest">
              Testimonios Reales
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Clientes que Compran y Recomiendan
            </h2>
            <p className="text-xs text-stone-500">
              Opiniones de compradores verificados en Bucaramanga, Medellín, Bogotá, Cali y Barranquilla.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] text-stone-400">{review.date}</span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-stone-900">{review.name}</h4>
                    <span className="text-[11px] text-stone-500">{review.city}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Compra Verificada</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Nationwide Shipping Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-8 sm:p-10 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold uppercase tracking-wider">
              <Truck className="w-4 h-4" /> Despachos Diarios Garantizados
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              ¿Vives fuera de Bucaramanga? Llegamos a toda Colombia.
            </h3>
            <p className="text-xs text-stone-400 max-w-xl">
              Entregas rápidas con las mejores transportadoras del país y la tranquilidad de pagar únicamente cuando recibes el producto en tus manos.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('productos')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md shadow-red-600/30 cursor-pointer"
            >
              Hacer mi Primer Pedido
            </button>
            <button
              onClick={() => onNavigate('rastreo')}
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs px-5 py-3.5 rounded-xl transition-colors cursor-pointer border border-stone-700"
            >
              Rastrear un Envío
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
