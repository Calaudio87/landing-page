import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100/60 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-12 text-slate-500 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200 dark:border-slate-900">
          {/* Col 1: Brand */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white font-mono font-bold text-xs">
                CL
              </div>
              <span className="font-display font-bold text-slate-900 dark:text-white text-sm">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Desarrollador Senior PHP / Laravel &amp; Especialista en Optimización MySQL. Arquitecturas backend tolerantes a fallos y de baja latencia.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>{PERSONAL_INFO.location} · Disponible para proyectos</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider block mb-2 text-[11px]">
              Navegación
            </span>
            <ul className="space-y-1.5">
              <li>
                <a href="#proyectos" className="hover:text-slate-900 dark:hover:text-rose-400 transition-colors">Proyectos Destacados</a>
              </li>
              <li>
                <a href="#mysql-lab" className="hover:text-slate-900 dark:hover:text-sky-400 transition-colors">Laboratorio MySQL</a>
              </li>
              <li>
                <a href="#habilidades" className="hover:text-slate-900 dark:hover:text-amber-400 transition-colors">Stack Técnico</a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-slate-900 dark:hover:text-rose-400 transition-colors">Servicios Profesionales</a>
              </li>
              <li>
                <a href="#trayectoria" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Trayectoria &amp; Proceso</a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-slate-900 dark:hover:text-rose-400 transition-colors">Contacto Directo</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Tech Principles */}
          <div className="md:col-span-4 space-y-2">
            <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider block mb-2 text-[11px]">
              Pilares de Ingeniería
            </span>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Enfoque en Clean Architecture, transacciones atómicas ACID, prevención de cuellos de botella con índices B-Tree compuestos y código limpio y mantenible.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-rose-400 border border-slate-200 dark:border-slate-800 transition-colors font-mono text-xs shadow-xs"
              >
                <Mail className="w-3.5 h-3.5 text-rose-500" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
              PHP 8.3 · Laravel 11 · MySQL 8.0
            </span>

            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer shadow-xs"
              aria-label="Volver arriba"
              title="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
