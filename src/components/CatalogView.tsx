import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw, PackageSearch, Laptop, Home, Shirt, Sparkles, LayoutGrid } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/products';

interface CatalogViewProps {
  products: Product[];
  initialCategory?: string;
  initialSearch?: string;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  wishlist: number[];
  onToggleWishlist: (product: Product) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  initialCategory = 'todos',
  initialSearch = '',
  onAddToCart,
  onSelectProduct,
  wishlist,
  onToggleWishlist,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<'populares' | 'precio-bajo' | 'precio-alto' | 'descuento'>('populares');
  const [maxPrice, setMaxPrice] = useState<number>(250000);

  // Sync when initialCategory changes from outside
  React.useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  React.useEffect(() => {
    if (initialSearch !== undefined) setSearchQuery(initialSearch);
  }, [initialSearch]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'todos' || p.category === selectedCategory;
        const matchesQuery =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = p.price <= maxPrice;
        return matchesCategory && matchesQuery && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'precio-bajo') return a.price - b.price;
        if (sortBy === 'precio-alto') return b.price - a.price;
        if (sortBy === 'descuento') {
          const discA = a.oldPrice ? (a.oldPrice - a.price) / a.oldPrice : 0;
          const discB = b.oldPrice ? (b.oldPrice - b.price) / b.oldPrice : 0;
          return discB - discA;
        }
        return b.reviewCount - a.reviewCount;
      });
  }, [products, selectedCategory, searchQuery, sortBy, maxPrice]);

  const handleResetFilters = () => {
    setSelectedCategory('todos');
    setSearchQuery('');
    setSortBy('populares');
    setMaxPrice(250000);
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'tecnologia':
        return <Laptop className="w-4 h-4" />;
      case 'hogar':
        return <Home className="w-4 h-4" />;
      case 'moda':
        return <Shirt className="w-4 h-4" />;
      case 'belleza':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Title & Search Bar */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-red-600 font-bold text-xs uppercase tracking-widest">
              Tienda Oficial Colombia
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              Catálogo de Productos
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Mostrando {filteredProducts.length} de {products.length} productos con disponibilidad inmediata.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre o palabra..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-red-600 focus:bg-white transition-all"
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Ordenar productos por"
                className="bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-3 text-xs font-medium text-stone-700 focus:outline-none focus:border-red-600 focus:bg-white cursor-pointer"
              >
                <option value="populares">Más Populares</option>
                <option value="precio-bajo">Menor Precio</option>
                <option value="precio-alto">Mayor Precio</option>
                <option value="descuento">Mayor Descuento</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Category Filter list */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-stone-900 pb-2 border-b border-stone-100 flex items-center justify-between">
                <span>Categorías</span>
                <span className="text-[10px] text-stone-400 font-normal">5 líneas</span>
              </h3>

              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const count =
                    cat.id === 'todos'
                      ? products.length
                      : products.filter((p) => p.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between text-xs cursor-pointer ${
                        isSelected
                          ? 'bg-red-600 text-white font-bold shadow-xs'
                          : 'bg-stone-50 text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {getCategoryIcon(cat.id)}
                        <span>{cat.name}</span>
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-stone-200/70 text-stone-500'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Box */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <h3 className="font-bold text-xs uppercase tracking-wider text-stone-900">
                  Precio Máximo
                </h3>
                <span className="text-xs font-bold text-red-600 tabular-nums">
                  ${(maxPrice / 1000).toFixed(0)}.000 COP
                </span>
              </div>

              <input
                type="range"
                min={20000}
                max={250000}
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-stone-400">
                <span>$20.000 COP</span>
                <span>$250.000 COP</span>
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={handleResetFilters}
              className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer Filtros</span>
            </button>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300 p-8 space-y-3">
                <PackageSearch className="w-12 h-12 text-stone-400 mx-auto" />
                <h3 className="font-bold text-stone-800 text-base">No se encontraron productos</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  No hay artículos que coincidan con los filtros seleccionados o tu término de búsqueda.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Restablecer todos los filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
