import React, { useState, useEffect } from 'react';
import { X, Star, Truck, ShieldCheck, ShoppingCart, Heart, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { formatCOP } from '../utils/formatters';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  onBuyNow: (product: Product, quantity: number, color?: string, size?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'envio'>('desc');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (product) {
      document.body.classList.add('modal-open');
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : undefined);
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);
      setQuantity(1);
      setImgError(false);
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [product]);

  if (!product) return null;

  const savings = product.oldPrice ? product.oldPrice - product.price : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar detalle de producto"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 max-h-[90vh] overflow-y-auto">
          {/* Left: Product Image & Gallery */}
          <div className="bg-stone-100 p-8 flex flex-col items-center justify-center relative min-h-[340px] md:min-h-[460px]">
            {product.badge && (
              <span className="absolute top-6 left-6 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-xs">
                {product.badge}
              </span>
            )}

            {!imgError ? (
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full max-w-xs md:max-w-sm h-auto object-contain mix-blend-multiply drop-shadow-md"
              />
            ) : (
              <div className="text-center text-stone-400">
                <div className="w-16 h-16 rounded-2xl bg-stone-200 flex items-center justify-center mx-auto mb-2 text-stone-500">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <span className="text-xs">{product.title}</span>
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 text-xs text-stone-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{product.stock} unidades disponibles en Bodega Bucaramanga</span>
            </div>
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Breadcrumb */}
              <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                <span className="uppercase tracking-wider font-semibold text-stone-500">
                  {product.categoryLabel}
                </span>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="flex items-center gap-1.5 text-stone-600 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
                  <span className="text-xs">{isWishlisted ? 'Guardado' : 'Favorito'}</span>
                </button>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                {product.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-700">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-stone-400">· {product.reviewCount} opiniones verificadas</span>
              </div>

              {/* Price Block */}
              <div className="mt-4 p-4 bg-stone-50 rounded-2xl border border-stone-200/80">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-red-600 tabular-nums">
                    {formatCOP(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-stone-400 line-through tabular-nums">
                      {formatCOP(product.oldPrice)}
                    </span>
                  )}
                  {savings > 0 && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Ahorras {formatCOP(savings)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Precio final con IVA incluido. Pago contra entrega disponible.
                </p>
              </div>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-stone-700 mb-2">
                    Color: <span className="font-normal text-stone-500">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          selectedColor === color
                            ? 'border-red-600 bg-red-50 text-red-700 font-semibold'
                            : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-stone-700 mb-2">
                    Talla / Medida: <span className="font-normal text-stone-500">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'border-red-600 bg-red-50 text-red-700 font-semibold'
                            : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-4 flex items-center gap-4">
                <span className="text-xs font-semibold text-stone-700">Cantidad:</span>
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-xs tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-8 h-8 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-4 border-t border-stone-100">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onAddToCart(product, quantity, selectedColor, selectedSize);
                    onClose();
                  }}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Agregar al Carrito</span>
                </button>

                <button
                  onClick={() => {
                    onBuyNow(product, quantity, selectedColor, selectedSize);
                    onClose();
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-red-600/30"
                >
                  <span>Comprar Ahora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Value props */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-500 pt-2">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-stone-700 shrink-0" />
                  <span>Envío 2-4 días hábiles</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-700 shrink-0" />
                  <span>Garantía 30 días</span>
                </div>
              </div>
            </div>

            {/* Info Tabs */}
            <div className="pt-2 border-t border-stone-100">
              <div className="flex gap-4 border-b border-stone-200 text-xs font-medium mb-3">
                <button
                  onClick={() => setActiveTab('desc')}
                  className={`pb-1.5 transition-colors cursor-pointer ${
                    activeTab === 'desc'
                      ? 'text-red-600 border-b-2 border-red-600 font-semibold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Descripción
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-1.5 transition-colors cursor-pointer ${
                    activeTab === 'specs'
                      ? 'text-red-600 border-b-2 border-red-600 font-semibold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Especificaciones
                </button>
                <button
                  onClick={() => setActiveTab('envio')}
                  className={`pb-1.5 transition-colors cursor-pointer ${
                    activeTab === 'envio'
                      ? 'text-red-600 border-b-2 border-red-600 font-semibold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Envío & Pagos
                </button>
              </div>

              <div className="text-xs text-stone-600 leading-relaxed min-h-[90px]">
                {activeTab === 'desc' && (
                  <div className="space-y-2">
                    <p>{product.fullDesc}</p>
                    <ul className="space-y-1 mt-2">
                      {product.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(product.specs).map(([k, v]) => (
                      <div key={k} className="p-2 bg-stone-50 rounded-lg">
                        <span className="text-[10px] text-stone-400 block font-medium">{k}</span>
                        <span className="font-semibold text-stone-800">{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'envio' && (
                  <div className="space-y-2">
                    <p>
                      Despachamos desde nuestro centro logístico en <strong>Bucaramanga, Santander</strong> hacia más de 900 municipios de Colombia.
                    </p>
                    <p>
                      Aceptamos <strong>Pago Contra Entrega en efectivo</strong>, así como transferencias por <strong>Nequi, Daviplata y PSE</strong>.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
