import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles, Tag } from 'lucide-react';
import { CartItem } from '../types';
import { formatCOP, calculateShipping, FREE_SHIPPING_THRESHOLD } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number, color?: string, size?: string) => void;
  onRemoveItem: (id: number, color?: string, size?: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; error: boolean } | null>(null);

  if (!isOpen) return null;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const shipping = calculateShipping(subtotal);
  const total = subtotal - discountAmount + shipping;

  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'REBAJA10' || clean === 'COLOMBIA10') {
      setDiscountPercent(10);
      setCouponMessage({ text: '¡Cupón aplicado! 10% de descuento concedido.', error: false });
    } else if (clean === 'ENVIOGRATIS') {
      setCouponMessage({ text: '¡Cupón de descuento especial activado!', error: false });
      setDiscountPercent(5);
    } else {
      setCouponMessage({ text: 'Código no válido. Prueba con "REBAJA10".', error: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-red-600" />
              <h2 className="font-bold text-stone-900 text-base">Tu Carrito de Compra</h2>
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-red-50 p-4 border-b border-red-100 text-xs">
            <div className="flex items-center justify-between font-semibold mb-1.5">
              {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                <span className="text-red-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  ¡Felicidades! Tienes Envío Gratis a Colombia 🎉
                </span>
              ) : (
                <span className="text-stone-700">
                  Agrega <strong className="text-red-600">{formatCOP(missingForFreeShipping)}</strong> para{' '}
                  <strong className="text-red-600">Envío Gratis</strong>
                </span>
              )}
              <span className="text-stone-500 text-[11px] font-bold">{shippingProgress}%</span>
            </div>
            <div className="w-full bg-red-200/60 rounded-full h-2 overflow-hidden">
              <div
                className="bg-red-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-stone-400">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-300">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-stone-800 font-bold text-sm">Tu carrito está vacío</p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Explora nuestras ofertas directas y añade lo que más te guste para estrenar hoy.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Ver Catálogo de Ofertas
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.id}-${item.selectedColor || ''}-${item.selectedSize || ''}-${idx}`}
                  className="flex gap-3 p-3.5 rounded-2xl border border-stone-200 bg-white hover:border-stone-300 transition-colors shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 object-contain bg-stone-50 rounded-xl p-1.5 border border-stone-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-semibold text-stone-900 text-xs line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id, item.selectedColor, item.selectedSize)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1 cursor-pointer shrink-0"
                          aria-label="Quitar producto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Selected options */}
                      {(item.selectedColor || item.selectedSize) && (
                        <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          {item.selectedColor && item.selectedSize && <span>·</span>}
                          {item.selectedSize && <span>Talla: {item.selectedSize}</span>}
                        </div>
                      )}

                      <span className="text-xs font-bold text-red-600 mt-1 block tabular-nums">
                        {formatCOP(item.price)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1, item.selectedColor, item.selectedSize)}
                          className="px-2.5 py-0.5 text-stone-600 hover:bg-stone-200 font-bold transition-colors cursor-pointer text-xs"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold bg-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1, item.selectedColor, item.selectedSize)}
                          className="px-2.5 py-0.5 text-stone-600 hover:bg-stone-200 font-bold transition-colors cursor-pointer text-xs"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-extrabold text-stone-900 tabular-nums">
                        {formatCOP(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Order Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Cupón (ej. REBAJA10)"
                    className="w-full bg-white border border-stone-200 rounded-xl py-2 pl-8 pr-3 text-xs uppercase focus:outline-none focus:border-red-600"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-stone-800 hover:bg-stone-900 text-white font-semibold text-xs px-3 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
              </form>

              {couponMessage && (
                <p
                  className={`text-[11px] ${
                    couponMessage.error ? 'text-red-600' : 'text-emerald-700 font-medium'
                  }`}
                >
                  {couponMessage.text}
                </p>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900 tabular-nums">{formatCOP(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Descuento cupón ({discountPercent}%)</span>
                    <span className="tabular-nums">-{formatCOP(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Costo de Envío</span>
                  <span
                    className={`font-semibold tabular-nums ${
                      shipping === 0 ? 'text-emerald-600 font-bold' : 'text-stone-900'
                    }`}
                  >
                    {shipping === 0 ? '¡GRATIS!' : formatCOP(shipping)}
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-extrabold text-stone-900">
                  <span>Total Estimado</span>
                  <span className="text-red-600 text-base tabular-nums">{formatCOP(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={onClearCart}
                  className="bg-white hover:bg-stone-200 border border-stone-200 text-stone-700 font-semibold text-xs py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Vaciar Carrito
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-red-600/30 cursor-pointer"
                >
                  <span>Ir a Pagar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
