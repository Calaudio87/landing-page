import React from 'react';
import { ArrowRight, Database, ShieldCheck, Zap, Download, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TerminalBench } from './TerminalBench';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const handleDownloadCV = () => {
    const cvContent = `CURRICULUM VITAE - CLAUDIO LEIVA
Desarrollador Senior PHP / Laravel & Experto en Bases de Datos MySQL
Email: ${PERSONAL_INFO.email}
Ubicación: Santiago, Chile / Remoto Global
Experiencia: 8+ años en desarrollo backend, arquitectura relacional y optimización de rendimiento.

HABILIDADES CLAVE:
- PHP 8.x, Laravel 10/11, Eloquent ORM, Livewire, Lumen
- MySQL 8.0, Optimización de Índices (B-Tree, Fulltext), EXPLAIN ANALYZE, InnoDB Tuning
- Transacciones ACID, Row Locking (SELECT FOR UPDATE), Particionamiento
- Redis (Caché, Pub/Sub, Colas con Laravel Horizon), RabbitMQ
- RESTful APIs, Swagger/OpenAPI, Webhooks Idempotentes, Laravel Sanctum/Passport
- Docker, CI/CD GitHub Actions, PHPUnit, Pest PHP, Clean Architecture

PROYECTOS DESTACADOS:
1. ApexLogistics ERP & Warehouse Core (Laravel 11 + MySQL 8 + Redis)
2. FinTech PayStream - Motor de Facturación y Pagos Idempotentes
3. QueryAudit Pro - Suite de Análisis y Optimización de Slow Queries MySQL
4. OmniMarket Multi-Tenant SaaS con aislamiento estricto de esquemas DB
`;
    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'CV_Claudio_Leiva_Laravel_MySQL_Expert.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="hero" className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-rose-500/5 dark:bg-rose-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-sky-500/5 dark:bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Clean unboxed metadata separator */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="text-rose-600 dark:text-rose-400 font-semibold">PHP 8.3 & Laravel 11</span>
              <span aria-hidden="true">·</span>
              <span className="text-sky-600 dark:text-sky-400 font-semibold">MySQL 8.0 Tuning</span>
              <span aria-hidden="true">·</span>
              <span>Clean Architecture</span>
            </div>

            {/* Headline with balanced text wrap */}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-slate-50 tracking-tight leading-[1.12] [text-wrap:balance]">
              Arquitectura backend de alto rendimiento y bases de datos MySQL escalables.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Hola, soy <strong className="text-slate-900 dark:text-white font-semibold">{PERSONAL_INFO.name}</strong>. Consultor senior y desarrollador backend especializado en ecosistemas <strong className="text-rose-600 dark:text-rose-400 font-medium">Laravel</strong>, optimización de consultas complejas con <strong className="text-sky-600 dark:text-sky-400 font-medium">MySQL</strong>, concurrencia transaccional e infraestructura de baja latencia.
            </p>

            {/* Core Value Pillars - Clean hairline boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-left">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 transition-colors">
                <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-semibold text-xs mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Laravel 10 / 11</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-normal">
                  Eloquent afinado, colas asíncronas con Horizon y arquitectura limpia.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 transition-colors">
                <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 font-semibold text-xs mb-1">
                  <Database className="w-3.5 h-3.5" />
                  <span>MySQL Tuning</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-normal">
                  Índices B-Tree compuestos, análisis EXPLAIN y optimización InnoDB.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 transition-colors">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold text-xs mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Transacciones ACID</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-normal">
                  Bloqueos a nivel de fila y consistencia estricta en cobros e inventario.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                id="hero-view-projects-btn"
                href="#proyectos"
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs sm:text-sm rounded-lg shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Explorar Proyectos</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                id="hero-contact-btn"
                href="#contacto"
                className="px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 transition-colors flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-rose-500" />
                <span>Contactar</span>
              </a>

              <button
                id="hero-download-cv-btn"
                onClick={handleDownloadCV}
                className="px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
                title="Descargar resumen curricular de Claudio Leiva"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Descargar CV (.txt)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Benchmark Terminal */}
          <div className="lg:col-span-5">
            <div className="relative">
              <TerminalBench />
            </div>
          </div>
        </div>

        {/* Full-width Stats Strip Below Split */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div key={idx} className="text-center sm:text-left border-r border-slate-200 dark:border-slate-800/80 last:border-r-0 pr-4">
              <div className="flex items-baseline justify-center sm:justify-start gap-1">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 dark:text-white tabular-nums">
                  {stat.value}
                </span>
                <span className="text-xs text-rose-600 dark:text-rose-400 font-mono font-semibold">{stat.suffix}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
