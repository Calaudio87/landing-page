import React from 'react';
import { Briefcase, Code, Database, RefreshCw, Share2, Check, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      case 'RefreshCw':
        return <RefreshCw className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Briefcase className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
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
    <section id="servicios" className="py-20 bg-white dark:bg-slate-950 relative border-t border-slate-200 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Briefcase className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Servicios de Consultoría &amp; Desarrollo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Modalidades de Colaboración
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Soluciones de ingeniería para empresas y startups que requieren velocidad, estabilidad y bases de datos relacionales sin cuellos de botella.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between rounded-2xl bg-slate-50/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 p-6 sm:p-7 transition-colors shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400">
                    Consultoría Especializada
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors mb-2">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2 mb-5">
                  <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Entregables Principales:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal For Box */}
                <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 mb-5">
                  <strong className="text-slate-800 dark:text-slate-200 font-semibold block mb-0.5">Dirigido a:</strong>
                  <span>{service.idealFor}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectService(service.title)}
                className="w-full py-2.5 px-4 rounded-lg bg-white dark:bg-slate-950 hover:bg-slate-900 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white text-slate-800 dark:text-slate-200 font-medium text-xs transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 cursor-pointer shadow-xs"
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
