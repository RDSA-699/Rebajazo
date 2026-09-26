import React from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface WishlistViewProps {
  wishlistIds: number[];
  products: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onExploreCatalog: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlistIds,
  products,
  onAddToCart,
  onSelectProduct,
  onToggleWishlist,
  onExploreCatalog,
}) => {
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Lista de Deseos</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              Tus Productos Favoritos
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Tienes {wishlistedProducts.length} producto{wishlistedProducts.length === 1 ? '' : 's'} guardado{wishlistedProducts.length === 1 ? '' : 's'} para comprar después.
            </p>
          </div>

          {wishlistedProducts.length > 0 && (
            <button
              onClick={onExploreCatalog}
              className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Seguir Explorando Catálogo
            </button>
          )}
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-stone-900">Aún no has guardado favoritos</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              Haz clic en el icono del corazón en cualquier producto para guardarlo aquí y no perder de vista las mejores ofertas.
            </p>
            <button
              onClick={onExploreCatalog}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-sm shadow-red-600/30 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explorar Ofertas Ahora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
                isWishlisted={true}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
