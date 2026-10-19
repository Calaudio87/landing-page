import React from 'react';
import { Terminal, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { CAREER_JOURNEY } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const workflowSteps = [
    {
      step: '01',
      title: 'Modelado Relacional & Análisis',
      desc: 'Diseño del diagrama Entidad-Relación (DER), normalización 3NF y selección de tipos de datos óptimos para índices.',
    },
    {
      step: '02',
      title: 'Arquitectura Laravel & Service Layer',
      desc: 'Estructuración modular de código con separación de responsabilidades, Form Requests tipados y DTOs.',
    },
    {
      step: '03',
      title: 'Pruebas Unitarias & Profiling MySQL',
      desc: 'Cobertura con PHPUnit / Pest y auditoría de consultas SQL con EXPLAIN para certificar cero cuellos de botella.',
    },
    {
      step: '04',
      title: 'CI/CD & Despliegue en Producción',
      desc: 'Contenedores Docker optimizados, pipelines automatizados de GitHub Actions y monitoreo proactivo de logs.',
    },
  ];

  return (
    <section id="trayectoria" className="py-20 bg-slate-50/60 dark:bg-slate-950 relative border-t border-slate-200 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Trayectoria Profesional &amp; Metodología</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Experiencia &amp; Metodología
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Más de 8 años construyendo sistemas backend confiables, resolviendo incidentes de rendimiento en producción y liderando arquitecturas de datos.
          </p>
        </div>

        {/* Workflow Methodology Bar */}
        <div className="mb-14">
          <h3 className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-5 text-center sm:text-left">
            Proceso de Desarrollo &amp; Aseguramiento de Calidad
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {workflowSteps.map((wf, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors shadow-xs"
              >
                <div className="text-xl font-bold font-mono text-rose-600 dark:text-rose-400 mb-2">
                  {wf.step}
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 font-display">
                  {wf.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                  {wf.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          <h3 className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-5 text-center sm:text-left">
            Historial de Experiencia
          </h3>

          <div className="relative border-l border-slate-200 dark:border-slate-800 ml-3 sm:ml-4 space-y-6 pl-6 sm:pl-7">
            {CAREER_JOURNEY.map((job, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[29px] sm:-left-[33px] top-2 w-3 h-3 rounded-full bg-white dark:bg-slate-950 border-2 border-rose-600 dark:border-rose-400"></div>

                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
                        {job.role}
                      </h4>
                      <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                        {job.company}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.period}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.location}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed font-sans">
                    {job.description}
                  </p>

                  {/* Key Achievements */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold block uppercase">
                      Logros Técnicos:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {job.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    {job.techUsed.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
