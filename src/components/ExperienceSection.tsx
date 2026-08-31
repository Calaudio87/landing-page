import React from 'react';
import { Terminal, Calendar, MapPin, CheckCircle2, Briefcase, GitBranch, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { CAREER_JOURNEY } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const workflowSteps = [
    {
      step: '01',
      title: 'Modelado Relacional & Análisis de Datos',
      desc: 'Diseño del diagrama Entidad-Relación (DER), normalización 3NF y selección de tipos de datos óptimos para índices y almacenamiento.',
    },
    {
      step: '02',
      title: 'Arquitectura Laravel & Service Layer',
      desc: 'Estructuración modular de código con separación de responsabilidades, Form Requests tipados, políticas de autorización y DTOs.',
    },
    {
      step: '03',
      title: 'Pruebas Unitarias & Profiling MySQL',
      desc: 'Cobertura con PHPUnit / Pest y auditoría de consultas SQL con EXPLAIN para certificar cero cuellos de botella.',
    },
    {
      step: '04',
      title: 'CI/CD & Despliegue en Producción',
      desc: 'Contenedores Docker optimizados, pipelines automatizados de GitHub Actions y monitoreo proactivo de logs con Telescope/Horizon.',
    },
  ];

  return (
    <section id="trayectoria" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>Trayectoria Profesional & Metodología</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Experiencia & <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">Metodología de Trabajo</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Más de 8 años entregando sistemas escalables, resolviendo incidentes de rendimiento en producción y liderando implementaciones backend.
          </p>
        </div>

        {/* Workflow Methodology Bar */}
        <div className="mb-16">
          <h3 className="text-sm font-mono font-semibold text-slate-400 uppercase tracking-wider mb-6 text-center sm:text-left">
            Proceso de Desarrollo & Garantía de Calidad
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowSteps.map((wf, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 relative overflow-hidden group hover:border-slate-700 transition-colors"
              >
                <div className="text-2xl font-extrabold font-mono text-rose-500/30 group-hover:text-rose-500/60 transition-colors mb-2">
                  {wf.step}
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5 font-display">
                  {wf.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {wf.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          <h3 className="text-sm font-mono font-semibold text-slate-400 uppercase tracking-wider mb-6 text-center sm:text-left">
            Historial Profesional
          </h3>

          <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
            {CAREER_JOURNEY.map((job, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-rose-500 group-hover:scale-125 group-hover:bg-rose-500 transition-all shadow-md shadow-rose-500/30"></div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 group-hover:border-slate-700 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-rose-400 transition-colors">
                        {job.role}
                      </h4>
                      <p className="text-xs sm:text-sm font-medium text-slate-300">
                        {job.company}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                        <Calendar className="w-3.5 h-3.5 text-rose-400" />
                        <span>{job.period}</span>
                      </span>
                      <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{job.location}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Key Achievements */}
                  <div className="space-y-2 mb-4">
                    <span className="text-[11px] font-mono text-slate-400 font-semibold block uppercase">
                      Logros Destacados:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {job.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                    {job.techUsed.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-950 text-slate-300 border border-slate-800"
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
