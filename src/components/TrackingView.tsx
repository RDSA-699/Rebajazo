import React, { useState } from 'react';
import { Package, Search, CheckCircle2, Clock, Truck, MapPin, AlertCircle, Phone } from 'lucide-react';

interface TrackingViewProps {
  initialCode?: string;
}

export const TrackingView: React.FC<TrackingViewProps> = ({ initialCode = '' }) => {
  const [trackingCode, setTrackingCode] = useState(initialCode);
  const [searched, setSearched] = useState(Boolean(initialCode));
  const [currentResult, setCurrentResult] = useState<any>(null);

  const sampleOrders: Record<string, any> = {
    'RBZ-84920': {
      code: 'RBZ-84920',
      client: 'Carlos Andrés Mendoza',
      city: 'Bucaramanga, Santander',
      carrier: 'Coordinadora Mercantil',
      guide: 'CM-782948201',
      date: 'Hoy, 09:30 AM',
      status: 'en_reparto',
      statusLabel: 'En reparto con el mensajero',
      estimated: 'Hoy antes de las 5:00 PM',
      steps: [
        { title: 'Pedido Confirmado', date: 'Ayer, 03:15 PM', completed: true, location: 'Sistema Rebajazo' },
        { title: 'Empacado y Verificado', date: 'Ayer, 05:40 PM', completed: true, location: 'Bodega Principal Bucaramanga' },
        { title: 'En Tránsito con Transportadora', date: 'Hoy, 07:10 AM', completed: true, location: 'Centro de Distribución Santander' },
        { title: 'En Reparto a Domicilio', date: 'Hoy, 09:30 AM', completed: true, current: true, location: 'Móvil de Reparto #14' },
        { title: 'Entregado a Satisfacción', date: 'Pendiente', completed: false, location: 'Dirección del Cliente' },
      ],
    },
    'RBZ-10492': {
      code: 'RBZ-10492',
      client: 'Valentina Restrepo',
      city: 'Medellín, Antioquia',
      carrier: 'Servientrega Nacional',
      guide: 'SE-910284729',
      date: 'Ayer, 11:20 AM',
      status: 'en_transito',
      statusLabel: 'En ruta Bucaramanga - Medellín',
      estimated: 'Mañana en la mañana',
      steps: [
        { title: 'Pedido Confirmado', date: 'Hace 2 días, 01:00 PM', completed: true, location: 'Sistema Rebajazo' },
        { title: 'Empacado y Verificado', date: 'Ayer, 08:30 AM', completed: true, location: 'Bodega Principal Bucaramanga' },
        { title: 'Despacho Nacional en Tránsito', date: 'Ayer, 11:20 AM', completed: true, current: true, location: 'Troncal del Magdalena Medio' },
        { title: 'Llegada a Centro de Acopio Medellín', date: 'Hoy en la noche', completed: false, location: 'Terminal Guayabal' },
        { title: 'Entregado a Satisfacción', date: 'Pendiente', completed: false, location: 'Medellín, Antioquia' },
      ],
    },
  };

  const handleSearch = (codeToSearch?: string) => {
    const code = (codeToSearch || trackingCode).trim().toUpperCase();
    if (!code) return;

    setSearched(true);
    if (sampleOrders[code]) {
      setCurrentResult(sampleOrders[code]);
    } else {
      // Generate a realistic live tracking result for any custom code entered
      setCurrentResult({
        code: code,
        client: 'Cliente Rebajazo',
        city: 'Colombia',
        carrier: 'Transportadora Nacional Aliada',
        guide: `GUIA-${code}`,
        date: 'En proceso activo',
        status: 'en_preparacion',
        statusLabel: 'En preparación en Bodega Bucaramanga',
        estimated: '2 a 3 días hábiles',
        steps: [
          { title: 'Pedido Recibido en Plataforma', date: 'Registrado con éxito', completed: true, location: 'Sistema Central' },
          { title: 'Alistamiento e Inspección', date: 'En proceso', completed: true, current: true, location: 'Bodega Principal Bucaramanga' },
          { title: 'Asignación de Guía de Transporte', date: 'Pendiente', completed: false, location: 'Centro Logístico' },
          { title: 'En Tránsito Nacional', date: 'Pendiente', completed: false, location: 'Red de Distribución' },
          { title: 'Entrega en Domicilio', date: 'Pendiente', completed: false, location: 'Dirección del Destinatario' },
        ],
      });
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-red-600 font-bold text-xs uppercase tracking-widest">
            Trazabilidad en Tiempo Real
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Rastreo de Guía & Pedido
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm max-w-lg mx-auto">
            Ingresa el número de tu orden (ej. <strong>RBZ-84920</strong>) o el código que recibiste por WhatsApp para consultar el estado del despacho.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Package className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="Ingresa tu código de orden (ej. RBZ-84920)"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-11 pr-4 text-xs font-mono uppercase focus:outline-none focus:border-red-600 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-red-600/30"
            >
              <Search className="w-4 h-4" />
              <span>Consultar Estado</span>
            </button>
          </form>

          {/* Quick Demo Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 pt-1">
            <span>Ejemplos rápidos para probar:</span>
            <button
              onClick={() => {
                setTrackingCode('RBZ-84920');
                handleSearch('RBZ-84920');
              }}
              className="font-mono text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer"
            >
              RBZ-84920 (En reparto)
            </button>
            <button
              onClick={() => {
                setTrackingCode('RBZ-10492');
                handleSearch('RBZ-10492');
              }}
              className="font-mono text-stone-700 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer"
            >
              RBZ-10492 (En tránsito)
            </button>
          </div>
        </div>

        {/* Tracking Result View */}
        {searched && currentResult && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden animate-in fade-in duration-200">
            {/* Order Status Header */}
            <div className="p-6 bg-stone-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[11px] text-amber-400 font-mono uppercase tracking-wider block">
                  Número de Guía: {currentResult.guide}
                </span>
                <h3 className="text-xl font-bold mt-0.5">{currentResult.code}</h3>
                <p className="text-xs text-stone-300 mt-1">
                  Destino: {currentResult.city} · Transportadora: {currentResult.carrier}
                </p>
              </div>

              <div className="bg-red-600/30 border border-red-500/40 px-3.5 py-2 rounded-xl text-right">
                <span className="text-[10px] text-stone-300 uppercase tracking-wider block font-semibold">
                  Entrega Estimada
                </span>
                <span className="text-xs font-bold text-white">{currentResult.estimated}</span>
              </div>
            </div>

            {/* Timeline Milestones */}
            <div className="p-6 sm:p-8 space-y-6">
              <h4 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-600" />
                <span>Historial de Hitos de Despacho</span>
              </h4>

              <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                {currentResult.steps.map((step: any, idx: number) => {
                  return (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Node Icon */}
                      <div
                        className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${
                          step.completed
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-200 text-stone-400'
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h5
                            className={`text-xs font-bold ${
                              step.current ? 'text-red-600' : 'text-stone-900'
                            }`}
                          >
                            {step.title}
                            {step.current && (
                              <span className="ml-2 bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded font-normal">
                                Estado Actual
                              </span>
                            )}
                          </h5>
                          <span className="text-[11px] text-stone-400">{step.date}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          <span>{step.location}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Need help footer */}
              <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-600 bg-stone-50 p-4 rounded-2xl">
                <div>
                  <span className="font-bold text-stone-900 block">¿Tienes alguna pregunta sobre tu entrega?</span>
                  <span className="text-[11px] text-stone-500">Nuestro equipo de logística está disponible para ti.</span>
                </div>
                <a
                  href="https://wa.me/573001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
