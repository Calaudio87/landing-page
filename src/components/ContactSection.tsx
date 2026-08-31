import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Phone, MapPin, Clock, Copy, Check, ExternalLink, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';

interface ContactSectionProps {
  initialSubject?: string;
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject, onOpenBooking }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    serviceType: initialSubject || 'Desarrollo Backend en Laravel',
    budgetRange: '$1,000 - $3,000 USD',
    timeline: '1 a 2 meses',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({ ...prev, serviceType: initialSubject }));
    }
  }, [initialSubject]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`[Contacto Portfolio] ${formData.serviceType} - ${formData.name}`);
    const body = encodeURIComponent(
`Hola Claudio,

Me comunico a través de tu portafolio profesional para conversar sobre una oportunidad/proyecto.

DETALLES DEL REQUERIMIENTO:
- Nombre: ${formData.name}
- Email: ${formData.email}
- Empresa: ${formData.company || 'N/A'}
- Tipo de Servicio: ${formData.serviceType}
- Presupuesto Estimado: ${formData.budgetRange}
- Plazo Deseado: ${formData.timeline}

DESCRIPCIÓN DEL PROYECTO:
${formData.message}

Saludos cordiales,
${formData.name}`
    );
    return `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
`Hola Claudio! Mi nombre es ${formData.name}. Te contacto desde tu portafolio sobre *${formData.serviceType}*. 
Presupuesto: ${formData.budgetRange} | Plazo: ${formData.timeline}.
Detalles: ${formData.message}`
    );
    // Use international format without + or spaces
    return `https://wa.me/56987654321?text=${text}`;
  };

  const handleCopySummary = () => {
    const summary = `Contacto para Claudio Leiva (${PERSONAL_INFO.email})
De: ${formData.name} (${formData.email})
Empresa: ${formData.company || 'N/A'}
Servicio: ${formData.serviceType}
Presupuesto: ${formData.budgetRange}
Plazo: ${formData.timeline}
Mensaje: ${formData.message}`;
    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <section id="contacto" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>Contacto Directo & Cotizaciones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Iniciemos una <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">conversación directa</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            ¿Tienes un proyecto en mente, una base de datos MySQL que necesita optimización o buscas incorporar un desarrollador Laravel Senior a tu equipo?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Booking Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Details Card */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-7 space-y-5">
              <h3 className="text-lg font-bold font-display text-white">
                Canales Directos de Comunicación
              </h3>

              {/* Email Block */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-rose-400" />
                    <span>Correo Electrónico Personal</span>
                  </span>
                  <button
                    id="copy-email-btn"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-sm font-mono font-bold text-rose-400 hover:text-rose-300 transition-colors block break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              {/* Badges Info */}
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <strong className="text-white block font-medium">Tiempo de Respuesta Rápido</strong>
                    <span className="text-slate-400">Respuesta garantizada en menos de 24 horas hábiles.</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <strong className="text-white block font-medium">Ubicación & Disponibilidad</strong>
                    <span className="text-slate-400">{PERSONAL_INFO.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="text-white block font-medium">Acuerdo de Confidencialidad (NDA)</strong>
                    <span className="text-slate-400">Firma previa de NDA disponible para proyectos privados.</span>
                  </div>
                </div>
              </div>

              {/* Call Booking Card */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs">
                  <Calendar className="w-4 h-4" />
                  <span>¿Prefieres conversar en vivo?</span>
                </div>
                <p className="text-xs text-slate-300">
                  Reserva una llamada técnica de 30 minutos para analizar tu arquitectura actual o estimar los requerimientos de tu sistema.
                </p>
                <button
                  id="contact-schedule-btn"
                  onClick={onOpenBooking}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-lg border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5 text-rose-400" />
                  <span>Agendar Llamada en Calendario</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Communication Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
              {isSubmitted ? (
                /* Form Success & Dispatch Options */
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        ¡Mensaje estructurado listo para envío directo!
                      </h4>
                      <p className="text-xs text-emerald-300/90 mt-0.5">
                        Tu información ha sido formateada. Puedes despacharla con un clic directo a Claudio Leiva.
                      </p>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Destinatario:</span>
                      <span className="text-rose-400 font-bold">{PERSONAL_INFO.email}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div><span className="text-slate-500">De:</span> {formData.name}</div>
                      <div><span className="text-slate-500">Email:</span> {formData.email}</div>
                      <div><span className="text-slate-500">Servicio:</span> {formData.serviceType}</div>
                      <div><span className="text-slate-500">Presupuesto:</span> {formData.budgetRange}</div>
                    </div>
                    <div className="pt-2 border-t border-slate-800 text-slate-300">
                      <span className="text-slate-500 block mb-1">Mensaje:</span>
                      <p className="italic font-sans text-slate-200 line-clamp-4">{formData.message}</p>
                    </div>
                  </div>

                  {/* Primary Dispatch Actions */}
                  <div className="space-y-3">
                    <a
                      id="submit-mailto-action"
                      href={generateMailtoUrl()}
                      className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-xs rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Abrir y Enviar por Correo Electrónico (mailto)</span>
                    </a>

                    <a
                      id="submit-whatsapp-action"
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Enviar Resumen Directo vía WhatsApp</span>
                    </a>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={handleCopySummary}
                        className="flex-1 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-mono rounded-lg border border-slate-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedSummary ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copiado al Portapapeles</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Texto Completo</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        Editar Formulario
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                    <h3 className="text-base font-bold font-display text-white">
                      Formulario de Contacto Directo
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      * Campos Requeridos
                    </span>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Tu Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Ej: Marcelo Morales"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-rose-500/80 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Correo Electrónico de Contacto *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="tu@empresa.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-rose-500/80 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company & Service Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Empresa / Organización (Opcional)
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Ej: Tech Logistics SpA"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-rose-500/80 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Tipo de Requerimiento *
                      </label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-rose-500/80 transition-colors cursor-pointer"
                      >
                        <option value="Desarrollo Backend en Laravel a Medida">Desarrollo Backend en Laravel a Medida</option>
                        <option value="Auditoría y Optimización de Bases de Datos MySQL">Auditoría y Optimización de Bases de Datos MySQL</option>
                        <option value="Migración y Modernización de Sistemas PHP Legacy">Migración y Modernización de Sistemas PHP Legacy</option>
                        <option value="Arquitectura de APIs & Integraciones Complejas">Arquitectura de APIs & Integraciones Complejas</option>
                        <option value="Contratación Senior Backend (Full Time / Part Time)">Contratación Senior Backend (Full Time / Part Time)</option>
                        <option value="Consultoría Técnica General">Consultoría Técnica General</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Presupuesto Estimado
                      </label>
                      <select
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-rose-500/80 transition-colors cursor-pointer"
                      >
                        <option value="< $1,000 USD">&lt; $1,000 USD (Consultoría puntual)</option>
                        <option value="$1,000 - $3,000 USD">$1,000 - $3,000 USD (Módulos / Optimización)</option>
                        <option value="$3,000 - $7,000 USD">$3,000 - $7,000 USD (Proyecto Mediano)</option>
                        <option value="> $7,000 USD">&gt; $7,000 USD (Plataforma Enterprise / SaaS)</option>
                        <option value="A convenir / Por Horas">A convenir / Tarifa por horas</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Plazo Deseado
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-rose-500/80 transition-colors cursor-pointer"
                      >
                        <option value="Urgente (< 2 semanas)">Urgente (&lt; 2 semanas / Incidente crítico)</option>
                        <option value="1 a 2 meses">1 a 2 meses</option>
                        <option value="3 a 6 meses">3 a 6 meses</option>
                        <option value="Indefinido / A largo plazo">Indefinido / A largo plazo</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Descripción del Proyecto o Mensaje *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Cuéntame brevemente sobre tu aplicación, volumen de datos actual, versión de Laravel/PHP/MySQL o desafíos técnicos específicos..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-rose-500/80 transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="contact-form-submit"
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-xs rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensaje y Contactar Directamente</span>
                  </button>

                  <p className="text-[11px] text-slate-500 text-center">
                    🔒 Tu información se maneja con estricta confidencialidad profesional y no se comparte con terceros.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
