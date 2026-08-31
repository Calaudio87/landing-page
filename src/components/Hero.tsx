import React from 'react';
import { ArrowRight, Database, Terminal, ShieldCheck, Zap, Download, Send, CheckCircle2, Award } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TerminalBench } from './TerminalBench';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const handleDownloadCV = () => {
    // Generate a formatted summary text or trigger simulated CV download
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
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-rose-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 left-5 w-[300px] h-[300px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span className="text-rose-400 font-semibold">PHP & Laravel Specialist</span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400 font-semibold">MySQL 8.0 Database Tuning</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-100 tracking-tight leading-[1.15]">
              Arquitecturas backend de <span className="bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400 bg-clip-text text-transparent">alto rendimiento</span> y bases de datos MySQL escalables.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Hola, soy <strong className="text-white font-semibold">{PERSONAL_INFO.name}</strong>. Diseñador y desarrollador de sistemas backend en <strong className="text-rose-400 font-medium">Laravel</strong>, optimización de consultas SQL complejas con <strong className="text-cyan-400 font-medium">MySQL</strong>, APIs REST de baja latencia y microservicios tolerantes a fallos.
            </p>

            {/* Core Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Laravel 10 / 11</span>
                </div>
                <p className="text-slate-400 text-xs">Eloquent afinado, colas asíncronas con Horizon y arquitectura limpia.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs mb-1">
                  <Database className="w-3.5 h-3.5" />
                  <span>MySQL Tuning</span>
                </div>
                <p className="text-slate-400 text-xs">Índices B-Tree compuestos, análisis EXPLAIN y optimización InnoDB.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Transacciones ACID</span>
                </div>
                <p className="text-slate-400 text-xs">Bloqueos a nivel de fila y consistencia absoluta en cobros e inventario.</p>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                id="hero-view-projects-btn"
                href="#proyectos"
                className="px-6 py-3 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-sm rounded-xl shadow-lg shadow-rose-600/25 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explorar Proyectos Destacados</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                id="hero-contact-btn"
                href="#contacto"
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm rounded-xl border border-slate-700/80 transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4 text-rose-400" />
                <span>Contactar Directamente</span>
              </a>

              <button
                id="hero-download-cv-btn"
                onClick={handleDownloadCV}
                className="px-4 py-3 bg-slate-900/80 hover:bg-slate-800/90 text-slate-300 hover:text-white text-xs font-mono rounded-xl border border-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
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
              {/* Decorative badge */}
              <div className="absolute -top-3 -right-3 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-[11px] font-mono font-bold rounded-full shadow-lg">
                <Database className="w-3.5 h-3.5" />
                <span>MySQL Query Profiler</span>
              </div>
              <TerminalBench />
            </div>
          </div>
        </div>

        {/* Bottom Key Stats Counter Bar */}
        <div className="mt-14 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm shadow-xl">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div key={idx} className="text-center sm:text-left border-r border-slate-800/60 last:border-r-0 pr-4">
              <div className="flex items-baseline justify-center sm:justify-start gap-1">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-xs text-rose-400 font-mono font-semibold">{stat.suffix}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
