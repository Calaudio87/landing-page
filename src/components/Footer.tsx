import React from 'react';
import { ArrowUp, Mail, Database, Server, Code, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-900">
          {/* Col 1: Brand */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white font-mono font-bold text-sm">
                CL
              </div>
              <span className="font-display font-bold text-white text-base">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Desarrollador Senior PHP / Laravel & Especialista en Bases de Datos MySQL. Construyendo sistemas escalables, seguros y de baja latencia.
            </p>
            <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="font-mono text-slate-300 font-semibold uppercase tracking-wider block mb-2">
              Navegación Rápida
            </span>
            <ul className="space-y-1.5">
              <li>
                <a href="#proyectos" className="hover:text-rose-400 transition-colors">Proyectos Destacados</a>
              </li>
              <li>
                <a href="#mysql-lab" className="hover:text-cyan-400 transition-colors">Laboratorio MySQL & EXPLAIN</a>
              </li>
              <li>
                <a href="#habilidades" className="hover:text-amber-400 transition-colors">Stack Técnico & Habilidades</a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-rose-400 transition-colors">Servicios Profesionales</a>
              </li>
              <li>
                <a href="#trayectoria" className="hover:text-slate-200 transition-colors">Trayectoria & Metodología</a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-rose-400 transition-colors">Contacto Directo</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Tech Principles */}
          <div className="md:col-span-4 space-y-2">
            <span className="font-mono text-slate-300 font-semibold uppercase tracking-wider block mb-2">
              Pilares de Ingeniería
            </span>
            <p className="text-slate-400 text-xs leading-relaxed">
              Enfoque en Clean Architecture, integridad transaccional ACID, prevención de cuellos de botella mediante indexación B-Tree estratégica y código limpio documentado.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-rose-400 hover:text-rose-300 border border-slate-800 transition-colors font-mono text-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-mono text-[11px]">
              PHP 8.x • Laravel 11 • MySQL 8.0
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
