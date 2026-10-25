import { CartItem, OrderDetails } from '../types';

export const formatCOP = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const FREE_SHIPPING_THRESHOLD = 100000;
export const STANDARD_SHIPPING_COST = 8000;

export const calculateShipping = (subtotal: number): number => {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
};

export const buildWhatsAppOrderMessage = (order: OrderDetails): string => {
  const itemsList = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.title}* x${item.quantity} (${formatCOP(item.price * item.quantity)})${
          item.selectedColor ? ` [Color: ${item.selectedColor}]` : ''
        }${item.selectedSize ? ` [Talla: ${item.selectedSize}]` : ''}`
    )
    .join('\n');

  const paymentName = {
    contraentrega: 'Pago Contra Entrega (Efectivo)',
    nequi: 'Nequi / Daviplata',
    pse: 'PSE (Transferencia Bancaria)',
    tarjeta: 'Tarjeta Débito/Crédito',
  }[order.paymentMethod];

  const text = `👋 *¡Hola Rebajazo Colombia! Acabo de hacer un pedido en la tienda online.*

🧾 *Orden:* #${order.orderId}
👤 *Cliente:* ${order.customerName}
📞 *Teléfono:* ${order.phone}
📍 *Destino:* ${order.city}, ${order.department}
🏠 *Dirección:* ${order.address}

🛒 *Productos:*
${itemsList}

💰 *Subtotal:* ${formatCOP(order.subtotal)}
🚚 *Envío:* ${order.shipping === 0 ? '¡GRATIS!' : formatCOP(order.shipping)}
${order.discount > 0 ? `🏷️ *Descuento:* -${formatCOP(order.discount)}\n` : ''}💵 *Total a Pagar:* ${formatCOP(order.total)}
💳 *Método de Pago:* ${paymentName}

Quedo atento a la confirmación del despacho. ¡Muchas gracias!`;

  return encodeURIComponent(text);
};
