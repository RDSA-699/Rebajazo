import React, { useEffect } from 'react';
import { CheckCircle2, MessageCircle, Package, ArrowRight, X } from 'lucide-react';
import { OrderDetails } from '../types';
import { formatCOP, buildWhatsAppOrderMessage } from '../utils/formatters';

interface OrderConfirmationModalProps {
  order: OrderDetails | null;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onTrackOrder,
}) => {
  // Lock body scroll to prevent double scrollbars
  useEffect(() => {
    if (order) {
      document.body.classList.add('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [order]);

  if (!order) return null;

  const handleWhatsAppNotify = () => {
    const encoded = buildWhatsAppOrderMessage(order);
    const url = `https://wa.me/573001234567?text=${encoded}`;
    window.open(url, '_blank');
  };

  const paymentName = {
    contraentrega: 'Pago Contra Entrega (Efectivo)',
    nequi: 'Nequi / Daviplata',
    pse: 'PSE Colombia',
    tarjeta: 'Tarjeta Débito/Crédito',
  }[order.paymentMethod];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-stone-200 overflow-hidden relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-stone-800/60 hover:bg-stone-800 text-stone-200 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Compact Celebration Header */}
        <div className="bg-stone-900 text-white p-4 sm:p-5 text-center relative shrink-0">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 ring-4 ring-emerald-500/10">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-emerald-400 font-bold text-[11px] uppercase tracking-wider block">
            ¡Orden Registrada con Éxito!
          </span>
          <h2 className="text-lg sm:text-xl font-black mt-0.5">Gracias por tu compra</h2>
          <p className="text-[11px] text-stone-400 mt-0.5">
            Preparando despacho desde Bodega Bucaramanga
          </p>

          <div className="mt-2.5 inline-flex items-center gap-1.5 bg-stone-800 border border-stone-700 px-3 py-1 rounded-full text-xs font-mono font-bold text-amber-400">
            <span className="text-[10px] text-stone-400 font-sans">Guía / Orden:</span>
            <span>{order.orderId}</span>
          </div>
        </div>

        {/* Scrollable Receipt Body */}
        <div className="p-4 sm:p-5 space-y-3.5 text-xs text-stone-700 overflow-y-auto flex-1">
          {/* Summary Box */}
          <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Destinatario:</span>
              <span className="font-semibold text-stone-900">{order.customerName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Destino:</span>
              <span className="font-semibold text-stone-900">{order.city}, {order.department}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Dirección:</span>
              <span className="font-semibold text-stone-900 line-clamp-1 text-right max-w-[200px]">
                {order.address}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Método de pago:</span>
              <span className="font-semibold text-stone-900">{paymentName}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-stone-200 font-black text-stone-900 text-sm">
              <span>Total a pagar:</span>
              <span className="text-red-600 tabular-nums">{formatCOP(order.total)}</span>
            </div>
          </div>

          {/* Logistics Note */}
          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200/60 text-amber-900 text-[11px] leading-relaxed flex items-start gap-2">
            <span className="shrink-0 text-xs">📦</span>
            <span>
              <strong>Próximo paso:</strong> Te contactaremos al <strong>{order.phone}</strong> para coordinar la entrega con la transportadora.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleWhatsAppNotify}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar confirmación por WhatsApp (+57 300 123 4567)</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onTrackOrder(order.orderId);
              }}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Package className="w-4 h-4" />
              <span>Rastrear Estado de mi Envío</span>
            </button>

            <button
              onClick={onClose}
              className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-2 px-4 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
