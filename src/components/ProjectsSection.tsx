import React, { useState } from 'react';
import { Layers, Database, Server, Cpu, ArrowUpRight, Search, Zap, CheckCircle2, Shield } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

interface ProjectsSectionProps {
  onSelectProjectForContact?: (projectName: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProjectForContact }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'Todos los Proyectos', count: FEATURED_PROJECTS.length },
    { id: 'enterprise', label: 'Enterprise & ERP', count: FEATURED_PROJECTS.filter(p => p.category === 'enterprise').length },
    { id: 'mysql', label: 'MySQL & Query Tuning', count: FEATURED_PROJECTS.filter(p => p.category === 'mysql').length },
    { id: 'saas', label: 'SaaS & FinTech', count: FEATURED_PROJECTS.filter(p => p.category === 'saas').length },
    { id: 'laravel', label: 'Laravel & APIs', count: FEATURED_PROJECTS.filter(p => p.category === 'laravel').length },
  ];

  const filteredProjects = FEATURED_PROJECTS.filter((project) => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.databaseFeatures.some(df => df.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="proyectos" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Portafolio Técnico & Casos Reales</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Proyectos <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">Destacados</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Arquitecturas backend en Laravel y bases de datos relacionales MySQL diseñadas para soportar alta demanda, cero discrepancias transaccionales y mínima latencia.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por tech, SQL, etc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-rose-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25 font-semibold'
                  : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800/80'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/30 border border-slate-800/60 text-slate-400">
            <p className="text-sm">No se encontraron proyectos con el término "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold underline cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-rose-950/20 hover:-translate-y-1"
              >
                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-semibold rounded uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="flex items-center gap-1 text-[10px] font-mono font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        <Zap className="w-3 h-3" />
                        <span>Destacado</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-rose-400 transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Primary Metric Badge */}
                  {project.impactMetrics.length > 0 && (
                    <div className="mb-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          {project.impactMetrics[0].label}
                        </span>
                        <span className="text-xs text-slate-400 line-clamp-1">
                          {project.impactMetrics[0].description}
                        </span>
                      </div>
                      <span className="text-sm font-bold font-mono text-emerald-400 shrink-0 ml-2">
                        {project.impactMetrics[0].value}
                      </span>
                    </div>
                  )}

                  {/* Database Feature snippet */}
                  <div className="mb-5 space-y-1.5">
                    <span className="text-[11px] font-semibold text-cyan-400 flex items-center gap-1.5 font-mono">
                      <Database className="w-3 h-3" />
                      <span>Optimización MySQL Clave:</span>
                    </span>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {project.databaseFeatures[0]}
                    </p>
                  </div>
                </div>

                <div>
                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-400">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Card Action */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-rose-600 text-slate-200 hover:text-white font-medium text-xs transition-all flex items-center justify-center gap-2 border border-slate-700/80 hover:border-rose-500 cursor-pointer shadow-sm"
                  >
                    <span>Ver Arquitectura & Código</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProjectForContact={onSelectProjectForContact}
        />
      )}
    </section>
  );
};
