import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Truck, CreditCard, Banknote, Smartphone, CheckCircle2 } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { COLOMBIA_LOCATIONS } from '../data/colombia';
import { formatCOP, calculateShipping } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount?: number;
  onOrderCompleted: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountAmount = 0,
  onOrderCompleted,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDept, setSelectedDept] = useState('Santander');
  const [selectedCity, setSelectedCity] = useState('Bucaramanga');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'contraentrega' | 'nequi' | 'pse' | 'tarjeta'>('contraentrega');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = calculateShipping(subtotal);
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const currentDeptObj = COLOMBIA_LOCATIONS.find((l) => l.department === selectedDept);
  const availableCities = currentDeptObj ? currentDeptObj.cities : ['Bucaramanga'];

  const handleDeptChange = (dept: string) => {
    setSelectedDept(dept);
    const found = COLOMBIA_LOCATIONS.find((l) => l.department === dept);
    if (found && found.cities.length > 0) {
      setSelectedCity(found.cities[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !selectedCity) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const newOrder: OrderDetails = {
        orderId: `RBZ-${randomNum}`,
        date: new Date().toLocaleDateString('es-CO', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        customerName: name,
        phone,
        email: email || 'cliente@rebajazo.com',
        department: selectedDept,
        city: selectedCity,
        address: `${address} ${neighborhood ? `(Barrio: ${neighborhood})` : ''}`,
        notes,
        paymentMethod,
        items,
        subtotal,
        shipping,
        discount: discountAmount,
        total,
        status: 'confirmado',
      };

      setIsSubmitting(false);
      onOrderCompleted(newOrder);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden relative my-6">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 leading-tight">Finalizar Compra</h2>
              <p className="text-xs text-stone-500">Datos de envío para Colombia y selección de pago</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
            aria-label="Cerrar checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-6 text-xs max-h-[80vh] overflow-y-auto">
          {/* Customer info */}
          <div>
            <h3 className="font-bold text-stone-900 text-sm mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center">
                1
              </span>
              Información de Contacto
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Juan Andrés Pérez"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-red-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Número Celular / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej. 312 456 7890"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-red-600 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-stone-700 mb-1">
                  Correo Electrónico (Opcional para recibo digital)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="juan@correo.com"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-red-600 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="pt-2 border-t border-stone-100">
            <h3 className="font-bold text-stone-900 text-sm mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center">
                2
              </span>
              Lugar de Entrega en Colombia
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Departamento *</label>
                <select
                  value={selectedDept}
                  onChange={(e) => handleDeptChange(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-red-600 focus:bg-white"
                >
                  {COLOMBIA_LOCATIONS.map((loc) => (
                    <option key={loc.department} value={loc.department}>
                      {loc.department}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Ciudad o Municipio *</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-red-600 focus:bg-white"
                >
                  {availableCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Dirección Exacta (Calle / Cra / Transversal) *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ej. Calle 45 # 27-18 Apto 402"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-red-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Barrio o Conjunto</label>
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="Ej. Cabecera / San Francisco"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-red-600 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-stone-700 mb-1">
                  Indicaciones para el mensajero (Opcional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. Portería 24h, frente al parque, timbre 3"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-red-600 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="pt-2 border-t border-stone-100">
            <h3 className="font-bold text-stone-900 text-sm mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center">
                3
              </span>
              Forma de Pago
            </h3>

            <div className="grid sm:grid-cols-2 gap-2.5">
              {/* Cash on Delivery (Popular in Colombia) */}
              <label
                className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'contraentrega'
                    ? 'border-red-600 bg-red-50/60 ring-1 ring-red-600'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'contraentrega'}
                  onChange={() => setPaymentMethod('contraentrega')}
                  className="mt-0.5 text-red-600 focus:ring-red-500"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-stone-900">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    <span>Pago Contra Entrega</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                    Pagas en efectivo al repartidor cuando recibas tu pedido en casa.
                  </p>
                </div>
              </label>

              {/* Nequi / Daviplata */}
              <label
                className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'nequi'
                    ? 'border-red-600 bg-red-50/60 ring-1 ring-red-600'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'nequi'}
                  onChange={() => setPaymentMethod('nequi')}
                  className="mt-0.5 text-red-600 focus:ring-red-500"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-stone-900">
                    <Smartphone className="w-4 h-4 text-purple-600" />
                    <span>Nequi / Daviplata</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                    Transferencia instantánea a cuenta corporativa verificada.
                  </p>
                </div>
              </label>

              {/* PSE */}
              <label
                className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'pse'
                    ? 'border-red-600 bg-red-50/60 ring-1 ring-red-600'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'pse'}
                  onChange={() => setPaymentMethod('pse')}
                  className="mt-0.5 text-red-600 focus:ring-red-500"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-stone-900">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>PSE Colombia</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                    Débito desde Bancolombia, Davivienda, Nequi, BBVA y todos los bancos.
                  </p>
                </div>
              </label>

              {/* Card */}
              <label
                className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'tarjeta'
                    ? 'border-red-600 bg-red-50/60 ring-1 ring-red-600'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'tarjeta'}
                  onChange={() => setPaymentMethod('tarjeta')}
                  className="mt-0.5 text-red-600 focus:ring-red-500"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-stone-900">
                    <CreditCard className="w-4 h-4 text-stone-700" />
                    <span>Tarjeta Crédito / Débito</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                    Visa, Mastercard, American Express procesado seguro.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
            <div className="flex justify-between text-stone-600">
              <span>{items.length} artículos en tu pedido</span>
              <span className="font-semibold text-stone-900 tabular-nums">{formatCOP(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Descuento aplicado</span>
                <span className="tabular-nums">-{formatCOP(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>Envío a {selectedCity}</span>
              <span
                className={`font-semibold tabular-nums ${
                  shipping === 0 ? 'text-emerald-600 font-bold' : 'text-stone-900'
                }`}
              >
                {shipping === 0 ? '¡GRATIS!' : formatCOP(shipping)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-black text-stone-900">
              <span>Total a Pagar</span>
              <span className="text-red-600 text-base tabular-nums">{formatCOP(total)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-stone-400 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-red-600/30 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generando Orden de Despacho...
              </span>
            ) : (
              <span>Confirmar Pedido ({formatCOP(total)})</span>
            )}
          </button>

          <p className="text-[11px] text-center text-stone-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
            Tus datos están protegidos conforme a la ley colombiana de protección de datos (Habeas Data).
          </p>
        </form>
      </div>
    </div>
  );
};
