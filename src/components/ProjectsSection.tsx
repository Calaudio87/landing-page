import React, { useState } from 'react';
import { Layers, Database, ArrowUpRight, Search } from 'lucide-react';
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
    { id: 'all', label: 'Todos', count: FEATURED_PROJECTS.length },
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
    <section id="proyectos" className="py-20 bg-slate-50/60 dark:bg-slate-950 relative border-t border-slate-200 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <Layers className="w-3.5 h-3.5 text-rose-500" />
              <span>Casos Reales de Ingeniería</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              Proyectos Destacados
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Arquitecturas en Laravel y bases de datos relacionales MySQL diseñadas para soportar alta demanda, integridad transaccional ACID y mínima latencia.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full md:w-64 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por tecnología, SQL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-rose-500 transition-colors shadow-xs"
            />
          </div>
        </div>

        {/* Category Filters (Clean Segmented Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 font-semibold'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] font-mono opacity-70">
                ({cat.count})
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
            <p className="text-sm">No se encontraron proyectos con el criterio "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer text-left"
              >
                <div>
                  {/* Clean unboxed category kicker */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span className="uppercase text-[11px] tracking-wider font-semibold text-rose-600 dark:text-rose-400">
                      {project.category}
                    </span>
                    <span className="text-slate-400 dark:text-slate-400 flex items-center gap-1 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                      Detalles <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1 mb-3">
                    {project.tagline}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                  {/* Primary Metric Highlight */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">{project.impactMetrics[0].label}</span>
                    <span className="font-bold font-mono text-slate-900 dark:text-white tabular-nums">{project.impactMetrics[0].value}</span>
                  </div>

                  {/* Tech stack as clean unboxed typography */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    {project.techStack.slice(0, 4).map((tech, i) => (
                      <React.Fragment key={tech}>
                        <span>{tech}</span>
                        {i < Math.min(project.techStack.length - 1, 3) && <span className="text-slate-300 dark:text-slate-700">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Details Modal */}
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
