import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { formatCOP } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md hover:border-red-200 transition-all duration-200 flex flex-col justify-between">
      {/* Image Container */}
      <div className="relative aspect-square bg-stone-100/80 overflow-hidden p-4 flex items-center justify-center">
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs z-10">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors cursor-pointer ${
            isWishlisted
              ? 'bg-red-50 text-red-600'
              : 'bg-white/80 hover:bg-white text-stone-500 hover:text-red-600 backdrop-blur-xs shadow-xs'
          }`}
          aria-label={isWishlisted ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-600' : ''}`} />
        </button>

        {/* Product Image or Fallback */}
        {!imgError ? (
          <img
            src={product.image}
            alt={product.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            onClick={() => onSelectProduct(product)}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        ) : (
          <div
            onClick={() => onSelectProduct(product)}
            className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-stone-200 flex items-center justify-center text-stone-500 mb-2">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-stone-600 line-clamp-1">{product.title}</span>
          </div>
        )}

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex gap-2">
          <button
            onClick={() => onSelectProduct(product)}
            className="flex-1 bg-stone-900/90 hover:bg-stone-900 text-white text-xs font-semibold py-2 px-3 rounded-xl backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Vista Rápida</span>
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-stone-500">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-stone-700">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-xs">{product.rating.toFixed(1)}</span>
              <span className="text-stone-400 text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-semibold text-stone-900 text-sm line-clamp-2 hover:text-red-600 transition-colors cursor-pointer mb-2"
          >
            {product.title}
          </h3>

          <p className="text-stone-500 text-xs line-clamp-2 mb-3 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-2 border-t border-stone-100">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-red-600 tabular-nums">
              {formatCOP(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-stone-400 line-through tabular-nums">
                {formatCOP(product.oldPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-stone-900 hover:bg-red-600 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Agregar al Carrito</span>
          </button>
        </div>
      </div>
    </article>
  );
};
