import React, { useState } from 'react';
import { Server, Database, Zap, Cpu, CheckCircle2, Code2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server':
        return <Server className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      case 'Database':
        return <Database className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case 'Zap':
        return <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Code2 className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
    }
  };

  return (
    <section id="habilidades" className="py-20 bg-slate-50/60 dark:bg-slate-950 relative border-t border-slate-200 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Code2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Competencias &amp; Stack Tecnológico</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Especialización Técnica
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Ecosistema backend moderno, arquitectura relacional de alto volumen y rigurosas prácticas de ingeniería de software.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(idx)}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer border ${
                activeCategory === idx
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 font-semibold shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-800'
              }`}
            >
              {getIcon(cat.iconName)}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Active Category Detailed View */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                {getIcon(SKILL_CATEGORIES[activeCategory].iconName)}
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                  {SKILL_CATEGORIES[activeCategory].name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl mt-0.5">
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
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/90 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white font-mono">{skill.name}</h4>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      {skill.experienceYears}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {skill.highlight}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    <span>Nivel de Dominio</span>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold tabular-nums">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-600 dark:bg-rose-500 rounded-full transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Methodologies & Architectural Principles */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">SOLID &amp; Clean Code</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Controladores desacoplados, servicios reutilizables y reglas encapsuladas.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">Zero-Loss Database</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Transacciones atómicas, aislamiento estricto InnoDB y consistencia ACID.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">TDD &amp; PHPUnit</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Pruebas automatizadas de APIs y base de datos con cobertura exhaustiva.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">Async First</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Desacoplamiento de tareas pesadas hacia colas Redis con Laravel Horizon.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
