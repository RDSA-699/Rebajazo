import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ExternalLink, Navigation, Copy, Check } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const addressText = 'Cra 27 # 45-30, Bucaramanga, Santander, Colombia';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-red-600 font-bold text-xs uppercase tracking-widest">
            Atención Inmediata
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Estamos para Ayudarte
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm">
            ¿Tienes dudas con un pedido, despacho o consulta comercial? Contáctanos por cualquiera de nuestros canales oficiales o visítanos en nuestra sede en Bucaramanga.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards + Google Maps View */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-stone-900">Línea WhatsApp Directa</h4>
                  <p className="text-xs text-stone-600 mt-0.5">+57 300 123 4567</p>
                  <a
                    href="https://wa.me/573001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-emerald-600 hover:underline mt-1 inline-flex items-center gap-1"
                  >
                    <span>Iniciar chat con asesor</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-stone-900">Correo Electrónico</h4>
                  <p className="text-xs text-stone-600 mt-0.5">contacto@rebajazo.com</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">Respuesta en menos de 4 horas hábiles</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-stone-900">Sede Principal y Despacho</h4>
                  <p className="text-xs text-stone-600 mt-0.5">{addressText}</p>
                  <button
                    onClick={handleCopyAddress}
                    className="text-[11px] font-semibold text-red-600 hover:text-red-700 mt-1 inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">¡Dirección copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar dirección</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-stone-900">Horario de Atención</h4>
                  <p className="text-xs text-stone-600 mt-0.5">Lunes a Sábado: 8:00 a.m. a 6:00 p.m.</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">Domingos y festivos: Guardia de envíos</p>
                </div>
              </div>
            </div>

            {/* Google Maps Location Container */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Ubicación Sede Bucaramanga</span>
                  </h4>
                  <p className="text-[11px] text-stone-500">Google Maps Satelital / Callejero</p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Cra+27+%23+45-30,+Bucaramanga,+Santander,+Colombia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Google Maps</span>
                  </a>
                  <a
                    href="https://waze.com/ul?q=Cra+27+%23+45-30,+Bucaramanga,+Santander"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Waze</span>
                  </a>
                </div>
              </div>

              {/* Google Maps Embedded View */}
              <div className="w-full h-72 bg-stone-100 relative">
                <iframe
                  title="Google Maps Ubicación Rebajazo Bucaramanga Santander"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=Cra+27+%23+45-30,+Bucaramanga,+Santander,+Colombia&t=&z=16&ie=UTF8&iwloc=&output=embed"
                />
              </div>

              <div className="p-3 bg-stone-50 text-[11px] text-stone-600 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Cra 27 # 45-30, Bucaramanga (Sector Sotomayor / Cabecera)</span>
                </div>
                <span className="font-mono text-[10px] text-stone-400">7.1177° N, -73.1154° W</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">¡Mensaje Enviado con Éxito!</h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                  Gracias <strong>{name}</strong>. Hemos recibido tu consulta y un asesor te responderá a <strong>{email}</strong> o a tu WhatsApp a la brevedad.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                  }}
                  className="mt-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6 pb-4 border-b border-stone-100">
                  <h3 className="font-bold text-lg text-stone-900">Envíanos un Mensaje</h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Completa el formulario y nos pondremos en contacto contigo hoy mismo.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 uppercase mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Carolina Gómez"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-stone-700 uppercase mb-1">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="carolina@correo.com"
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-red-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 uppercase mb-1">
                        Asunto *
                      </label>
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Consulta de pedido o garantía"
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-red-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 uppercase mb-1">
                      Mensaje o Consulta *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Escribe tu mensaje con detalles de tu pedido o duda..."
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm shadow-red-600/30 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensaje</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
