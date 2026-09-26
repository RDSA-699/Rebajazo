import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, categoryFilter?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-stone-800">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-stone-800 text-red-500 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Envíos a Toda Colombia</h4>
              <p className="text-stone-400 mt-0.5 leading-relaxed">
                Cobertura a más de 900 municipios con Servientrega, Coordinadora e Interrapidísimo.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-stone-800 text-red-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Pago Contra Entrega</h4>
              <p className="text-stone-400 mt-0.5 leading-relaxed">
                Paga en efectivo al recibir tu paquete en la puerta de tu casa o negocio.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-stone-800 text-red-500 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Garantía Directa</h4>
              <p className="text-stone-400 mt-0.5 leading-relaxed">
                30 días de garantía por defectos de fábrica con reposición inmediata.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-stone-800 text-red-500 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Atención Humana</h4>
              <p className="text-stone-400 mt-0.5 leading-relaxed">
                Asesores en línea por WhatsApp de lunes a sábado de 8:00 AM a 6:00 PM.
              </p>
            </div>
          </div>
        </div>

        {/* Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12 border-b border-stone-800">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-lg">
                R
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                REBAJAZO<span className="text-red-500">.co</span>
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              La plataforma de comercio electrónico de Colombia que conecta productos de alta demanda directamente con los mejores precios del mercado.
            </p>
            <div className="pt-2 text-stone-400 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>Despachos activos desde Bodega Bucaramanga</span>
            </div>
          </div>

          {/* Catalog Navigation */}
          <div>
            <h4 className="font-semibold text-sm text-white mb-4">Líneas de Producto</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('productos', 'tecnologia')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Tecnología & Gadgets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('productos', 'hogar')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Hogar & Organización
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('productos', 'moda')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Moda & Calzado Urbano
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('productos', 'belleza')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Belleza & Cuidado Facial
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('productos', 'todos')}
                  className="text-red-400 hover:text-red-300 font-medium transition-colors cursor-pointer text-left"
                >
                  Ver Catálogo Completo →
                </button>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-sm text-white mb-4">Servicio & Ayuda</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('rastreo')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Rastrear mi Pedido
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('nosotros')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Centro Logístico & Nosotros
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contacto')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Preguntas Frecuentes & PQRS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contacto')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Punto de Atención Físico
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-white mb-4">Contacto Directo</h4>
            <div className="flex items-start gap-2.5 text-stone-400">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>Cra 27 # 45-30, Bucaramanga, Santander, Colombia</span>
            </div>
            <div className="flex items-center gap-2.5 text-stone-400">
              <Phone className="w-4 h-4 text-red-500 shrink-0" />
              <span>+57 300 123 4567</span>
            </div>
            <div className="flex items-center gap-2.5 text-stone-400">
              <Mail className="w-4 h-4 text-red-500 shrink-0" />
              <span>contacto@rebajazo.com</span>
            </div>
            <div className="flex items-start gap-2.5 text-stone-400">
              <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>Lunes a Sábado: 8:00 a.m. - 6:00 p.m.</span>
            </div>
          </div>
        </div>

        {/* Payment Methods and Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-stone-500">
          <p>© 2026 Rebajazo Colombia S.A.S. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-400">
            <span className="bg-stone-800 px-2 py-1 rounded">Pago Contra Entrega</span>
            <span className="bg-stone-800 px-2 py-1 rounded font-bold text-emerald-400">Nequi</span>
            <span className="bg-stone-800 px-2 py-1 rounded font-bold text-red-400">Daviplata</span>
            <span className="bg-stone-800 px-2 py-1 rounded font-bold text-blue-400">PSE</span>
            <span className="bg-stone-800 px-2 py-1 rounded">Visa / Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
