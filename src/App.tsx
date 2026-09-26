import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { CatalogView } from './components/CatalogView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { TrackingView } from './components/TrackingView';
import { WishlistView } from './components/WishlistView';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { SearchModal } from './components/SearchModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { PRODUCTS } from './data/products';
import { Product, CartItem, OrderDetails } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('inicio');
  const [catalogCategory, setCatalogCategory] = useState<string>('todos');
  const [catalogSearch, setCatalogSearch] = useState<string>('');
  const [trackingInitialCode, setTrackingInitialCode] = useState<string>('');

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rebajazo_cart_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('rebajazo_wishlist_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('rebajazo_cart_v2', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('rebajazo_wishlist_v2', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Scroll to top on view change
  const navigateTo = (view: string, categoryFilter?: string) => {
    setCurrentView(view);
    if (categoryFilter) {
      setCatalogCategory(categoryFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            ...product,
            quantity,
            selectedColor,
            selectedSize,
          },
        ];
      }
    });

    showToast(`¡"${product.title}" agregado al carrito!`);
  };

  // Buy Now direct to checkout
  const handleBuyNow = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    handleAddToCart(product, quantity, selectedColor, selectedSize);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (
    id: number,
    delta: number,
    color?: string,
    size?: string
  ) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id && item.selectedColor === color && item.selectedSize === size) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (id: number, color?: string, size?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.selectedColor === color && item.selectedSize === size)
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Eliminado de favoritos`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Guardado en favoritos`);
        return [...prev, product.id];
      }
    });
  };

  const handleOrderCompleted = (order: OrderDetails) => {
    setCart([]);
    setIsCheckoutOpen(false);
    setConfirmedOrder(order);
  };

  const handleTrackFromConfirmation = (orderId: string) => {
    setConfirmedOrder(null);
    setTrackingInitialCode(orderId);
    navigateTo('rastreo');
  };

  const handleGlobalSearch = (query: string) => {
    setCatalogSearch(query);
    setCatalogCategory('todos');
    navigateTo('productos');
  };

  const totalCartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-red-500 selection:text-white">
      {/* Toast Notification Notification Pill */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-stone-900 text-white text-xs font-semibold py-2.5 px-4 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-4 duration-150 border border-stone-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'inicio' && (
          <HomeView
            products={PRODUCTS}
            onNavigate={navigateTo}
            onAddToCart={handleAddToCart}
            onSelectProduct={setSelectedProduct}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentView === 'productos' && (
          <CatalogView
            products={PRODUCTS}
            initialCategory={catalogCategory}
            initialSearch={catalogSearch}
            onAddToCart={handleAddToCart}
            onSelectProduct={setSelectedProduct}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentView === 'nosotros' && (
          <AboutView onExploreCatalog={() => navigateTo('productos')} />
        )}

        {currentView === 'contacto' && <ContactView />}

        {currentView === 'rastreo' && (
          <TrackingView initialCode={trackingInitialCode} />
        )}

        {currentView === 'favoritos' && (
          <WishlistView
            wishlistIds={wishlist}
            products={PRODUCTS}
            onAddToCart={handleAddToCart}
            onSelectProduct={setSelectedProduct}
            onToggleWishlist={handleToggleWishlist}
            onExploreCatalog={() => navigateTo('productos')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Floating Colombian WhatsApp Support */}
      <WhatsAppButton />

      {/* Product Detail Modal (PDP) */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          isWishlisted={wishlist.includes(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cart}
          onOrderCompleted={handleOrderCompleted}
        />
      )}

      {/* Order Confirmation Modal */}
      {confirmedOrder && (
        <OrderConfirmationModal
          order={confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
          onTrackOrder={handleTrackFromConfirmation}
        />
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={PRODUCTS}
          onSelectProduct={setSelectedProduct}
          onViewAllResults={handleGlobalSearch}
        />
      )}
    </div>
  );
}
