import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Truck, Phone, MapPin, Package } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, categoryFilter?: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'productos', label: 'Catálogo' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'contacto', label: 'Contacto' },
    { id: 'rastreo', label: 'Rastrear Pedido' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Notification Strip */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <Truck className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span>
              Envíos <strong className="text-white">GRATIS</strong> en Colombia por compras mayores a <strong className="text-amber-400">$100.000 COP</strong>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[11px] text-stone-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-red-500" />
              Sede Principal: Bucaramanga, Santander
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-red-500" />
              WhatsApp: <strong className="text-stone-200">+57 300 123 4567</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Row - Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single element Brand Wordmark */}
        <button
          onClick={() => handleNavClick('inicio')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          aria-label="Rebajazo Colombia Inicio"
        >
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-2xl shadow-sm shadow-red-600/30 group-hover:bg-red-700 transition-colors">
            <svg viewBox="0 0 512 512" className="w-6 h-6 fill-current" aria-hidden="true">
              <path d="M192 144C192 108.654 220.654 80 256 80C291.346 80 320 108.654 320 144V160H192V144Z" stroke="currentColor" strokeWidth="32" strokeLinecap="round" fill="none"/>
              <path d="M128 160H384L416 432H96L128 160Z" fill="currentColor"/>
              <circle cx="218" cy="242" r="18" fill="white"/>
              <circle cx="294" cy="350" r="18" fill="white"/>
              <line x1="316" y1="226" x2="196" y2="366" stroke="white" strokeWidth="26" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-stone-900 leading-none">
              REBAJAZO<span className="text-red-600">.co</span>
            </span>
            <span className="text-[10px] text-stone-500 font-semibold tracking-wider uppercase mt-0.5">
              Compra & Ahorra Colombia
            </span>
          </div>
        </button>

        {/* Zone 2: Clean 4-6 nav links (Single-line, no capsules) */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-stone-700">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap py-1 relative cursor-pointer ${
                  isActive
                    ? 'text-red-600 font-semibold'
                    : 'text-stone-600 hover:text-red-600'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick search button */}
          <button
            onClick={onOpenSearch}
            className="p-2 sm:px-3 sm:py-2 text-xs font-medium text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            aria-label="Buscar productos"
          >
            <Search className="w-4 h-4 text-stone-500" />
            <span className="hidden sm:inline">Buscar</span>
          </button>

          {/* Wishlist toggle */}
          <button
            onClick={() => handleNavClick('favoritos')}
            className={`p-2.5 rounded-xl border transition-all relative flex items-center justify-center cursor-pointer ${
              currentView === 'favoritos'
                ? 'bg-red-50 border-red-200 text-red-600'
                : 'bg-stone-100 hover:bg-stone-200 border-transparent text-stone-700 hover:text-red-600'
            }`}
            aria-label="Ver productos favoritos"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm py-2 px-3 sm:px-4 rounded-xl shadow-sm shadow-red-600/20 transition-all cursor-pointer whitespace-nowrap"
            aria-label="Abrir carrito de compras"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Carrito</span>
            <span className="bg-white/20 text-white text-xs font-bold px-1.5 py-0.5 rounded-md min-w-[20px] text-center">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-3 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-red-50 text-red-600 font-semibold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 px-3">
            <span>Soporte WhatsApp: +57 300 123 4567</span>
            <span className="text-red-600 font-medium">Bucaramanga, Col</span>
          </div>
        </div>
      )}
    </header>
  );
};
