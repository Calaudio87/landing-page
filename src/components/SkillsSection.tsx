import React, { useState } from 'react';
import { Server, Database, Zap, Cpu, CheckCircle2, Code2, Award, Terminal } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server':
        return <Server className="w-5 h-5 text-rose-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-cyan-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      default:
        return <Code2 className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <section id="habilidades" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-semibold">
            <Code2 className="w-3.5 h-3.5" />
            <span>Competencias & Stack Tecnológico</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Especialización <span className="bg-gradient-to-r from-rose-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent">Técnica & Herramientas</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Stack especializado en el ecosistema backend moderno, arquitectura relacional de alto volumen y prácticas de ingeniería sólidas.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 cursor-pointer ${
                activeCategory === idx
                  ? 'bg-slate-900 text-white border border-rose-500/50 shadow-md shadow-rose-950/40 ring-1 ring-rose-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-slate-800'
              }`}
            >
              {getIcon(cat.iconName)}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Active Category Detailed View */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
                {getIcon(SKILL_CATEGORIES[activeCategory].iconName)}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  {SKILL_CATEGORIES[activeCategory].name}
                </h3>
                <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
                  {SKILL_CATEGORIES[activeCategory].description}
                </p>
              </div>
            </div>
          </div>

          {/* Skill Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILL_CATEGORIES[activeCategory].skills.map((skill, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                      <h4 className="text-sm font-bold text-white font-mono">{skill.name}</h4>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {skill.experienceYears}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {skill.highlight}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Dominio Técnico</span>
                    <span className="text-slate-300 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/80">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Methodologies & Architectural Principles */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">SOLID & Clean Code</h5>
              <p className="text-xs text-slate-400 mt-0.5">Controladores delgados, servicios reutilizables y reglas de negocio encapsuladas.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Zero-Loss Database</h5>
              <p className="text-xs text-slate-400 mt-0.5">Transacciones atómicas, aislamiento estricto InnoDB y respaldos automatizados.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">TDD & PHPUnit</h5>
              <p className="text-xs text-slate-400 mt-0.5">Pruebas automatizadas de APIs y base de datos con cobertura exhaustiva.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Async First</h5>
              <p className="text-xs text-slate-400 mt-0.5">Desacoplamiento de tareas pesadas hacia Redis Queues con Laravel Horizon.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
