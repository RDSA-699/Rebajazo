import React, { useEffect } from 'react';
import { X, Printer, Package, Truck, ShieldCheck, Download, AlertTriangle } from 'lucide-react';
import { OrderDetails } from '../../types';
import { formatCOP } from '../../utils/formatters';

interface ShippingLabelModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const ShippingLabelModal: React.FC<ShippingLabelModalProps> = ({ order, onClose }) => {
  useEffect(() => {
    if (order) {
      document.body.classList.add('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [order]);

  if (!order) return null;

  const carrier = order.carrier || 'Coordinadora';
  const trackingNumber = order.trackingNumber || `GUIA-${order.orderId}`;
  const isCOD = order.paymentMethod === 'contraentrega';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden relative flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls Bar */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-xs uppercase tracking-wider">
              Rótulo Oficial de Despacho Térmico (10x15 cm)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Label View */}
        <div className="p-6 overflow-y-auto bg-stone-100 flex items-center justify-center">
          <div
            id="shipping-label-container"
            className="w-full max-w-md bg-white border-2 border-black p-5 text-black font-sans shadow-sm select-all"
            style={{ minHeight: '520px' }}
          >
            {/* Header: Carrier & Tracking Barcode */}
            <div className="border-b-2 border-black pb-3 text-center">
              <div className="flex justify-between items-start">
                <div className="text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider block text-stone-600">
                    OPERADOR LOGÍSTICO
                  </span>
                  <span className="text-base font-black tracking-tight uppercase">
                    {carrier} COLOMBIA
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold block text-stone-600">ORDEN INTERNA</span>
                  <span className="text-xs font-mono font-black">{order.orderId}</span>
                </div>
              </div>

              {/* Barcode Visual Simulation */}
              <div className="my-2.5 flex flex-col items-center">
                <div className="w-full h-12 flex items-center justify-center gap-[2px] bg-white px-2">
                  {[4, 2, 6, 2, 4, 8, 2, 6, 4, 2, 8, 4, 2, 6, 2, 8, 4, 6, 2, 4, 8, 2, 6, 4, 8, 2, 6, 4, 2, 8, 4, 6, 2, 4, 8, 2, 6, 4, 2, 8].map(
                    (w, i) => (
                      <div
                        key={i}
                        className="h-full bg-black"
                        style={{ width: `${w}px` }}
                      />
                    )
                  )}
                </div>
                <span className="font-mono text-xs font-black tracking-widest mt-1">
                  *{trackingNumber}*
                </span>
              </div>
            </div>

            {/* Grid Remitente & Destinatario */}
            <div className="border-b-2 border-black py-2.5 grid grid-cols-12 gap-2 text-[11px]">
              {/* Remitente */}
              <div className="col-span-6 border-r-2 border-black pr-2">
                <span className="font-black block uppercase text-[10px] bg-black text-white px-1 mb-1">
                  REMITENTE (ORIGEN)
                </span>
                <p className="font-bold">REBAJAZO COLOMBIA S.A.S.</p>
                <p className="text-[10px] text-stone-600">NIT: 901.458.291-4</p>
                <p>Cra 27 # 45-30</p>
                <p className="font-bold">BUCARAMANGA - SANTANDER</p>
                <p>Tel: 300 123 4567</p>
              </div>

              {/* Destinatario */}
              <div className="col-span-6 pl-1">
                <span className="font-black block uppercase text-[10px] bg-black text-white px-1 mb-1">
                  DESTINATARIO (ENTREGA)
                </span>
                <p className="font-bold text-xs uppercase">{order.customerName}</p>
                <p className="leading-tight font-medium mt-0.5">{order.address}</p>
                <p className="font-black text-xs uppercase mt-1">
                  {order.city} - {order.department}
                </p>
                <p className="font-bold">Tel: {order.phone}</p>
              </div>
            </div>

            {/* COD / Modalidad de Recaudo Section (Crucial in Colombia) */}
            <div className="border-b-2 border-black py-2.5 bg-stone-50 p-2 my-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase block text-stone-600">
                    FORMA DE ENTREGA / RECAUDO
                  </span>
                  <span
                    className={`font-black text-xs uppercase ${
                      isCOD ? 'text-red-700' : 'text-stone-900'
                    }`}
                  >
                    {isCOD ? '★ RECAUDO CONTRA ENTREGA (COD)' : 'PAGADO ELECTRÓNICAMENTE'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold block text-stone-500">
                    VALOR A COBRAR EN PUERTA
                  </span>
                  <span className="text-base font-mono font-black text-black">
                    {isCOD ? formatCOP(order.total) : '$ 0 COP'}
                  </span>
                </div>
              </div>
            </div>

            {/* Contenido / Observaciones */}
            <div className="pt-2 text-[10px] space-y-1">
              <div className="flex justify-between font-bold">
                <span>CONTENIDO DECLARADO ({order.items.length} ARTÍCULOS):</span>
                <span>FLETE: {order.shipping === 0 ? 'FLETE GRATIS PAGADO' : formatCOP(order.shipping)}</span>
              </div>
              <ul className="list-disc pl-4 text-[9px] text-stone-800 space-y-0.5">
                {order.items.map((it, idx) => (
                  <li key={idx}>
                    {it.quantity}x {it.title}
                    {it.selectedColor ? ` (${it.selectedColor})` : ''}
                    {it.selectedSize ? ` [Talla: ${it.selectedSize}]` : ''}
                  </li>
                ))}
              </ul>
              {order.notes && (
                <p className="mt-1 p-1 bg-stone-100 border border-stone-300 font-medium">
                  <strong>Obs. Cliente:</strong> {order.notes}
                </p>
              )}
            </div>

            {/* Footer verification stamp */}
            <div className="mt-4 pt-2 border-t border-dashed border-black flex justify-between items-center text-[9px] text-stone-500">
              <span>BODEGA PRINCIPAL BUCARAMANGA</span>
              <span>EMITIDO: {order.date}</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-between items-center no-print">
          <span className="text-xs text-stone-500">
            Apto para impresora térmica de etiquetas adhesivas o papel bond standard.
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold text-xs py-2 px-4 rounded-xl transition-colors cursor-pointer"
            >
              Cerrar
            </button>
            <button
              onClick={handlePrint}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Rótulo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
