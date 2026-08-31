import React from 'react';
import { Briefcase, Code, Database, RefreshCw, Share2, Check, ArrowRight, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5 text-rose-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-cyan-400" />;
      case 'RefreshCw':
        return <RefreshCw className="w-5 h-5 text-amber-400" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-emerald-400" />;
      default:
        return <Briefcase className="w-5 h-5 text-rose-400" />;
    }
  };

  const handleSelectService = (title: string) => {
    onSelectService(title);
    const contactElement = document.getElementById('contacto');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicios" className="py-20 bg-slate-900/50 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Servicios & Modalidades de Colaboración</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            ¿Cómo puedo <span className="bg-gradient-to-r from-rose-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent">ayudarte a escalar?</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Soluciones de ingeniería backend para empresas, agencias y startups que buscan velocidad, estabilidad y bases de datos robustas.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-rose-950/20 group"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-105 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-900 text-slate-400 border border-slate-800">
                    Consultoría & Desarrollo
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-white group-hover:text-rose-400 transition-colors mb-2">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                    Entregables Clave:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal For Box */}
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 mb-6">
                  <strong className="text-slate-300 font-semibold block mb-0.5">Ideal para:</strong>
                  <span>{service.idealFor}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectService(service.title)}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-rose-600 text-slate-200 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-slate-800 hover:border-rose-500 cursor-pointer shadow-sm"
              >
                <span>Solicitar propuesta para este servicio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
