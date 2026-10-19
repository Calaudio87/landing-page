import React from 'react';
import { X, Database, ArrowRight, Copy, Check } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProjectForContact?: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onSelectProjectForContact }) => {
  const [copied, setCopied] = React.useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.sampleCode) {
      navigator.clipboard.writeText(project.sampleCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDiscuss = () => {
    if (onSelectProjectForContact) {
      onSelectProjectForContact(project.title);
    }
    onClose();
    const contactElem = document.getElementById('contacto');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 dark:bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-y-auto flex flex-col text-slate-800 dark:text-slate-200 transition-colors">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-5 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar modal de proyecto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-7">
          {/* Tagline & Full Overview */}
          <div>
            <p className="text-base text-rose-600 dark:text-rose-400 font-medium mb-2 font-display">
              {project.tagline}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              {project.fullOverview}
            </p>
          </div>

          {/* Impact Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.impactMetrics.map((metric, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-mono">
                  {metric.label}
                </span>
                <span className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1 block tabular-nums">
                  {metric.value}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block">
                  {metric.description}
                </span>
              </div>
            ))}
          </div>

          {/* Database Architecture & MySQL Tuning Highlights */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-semibold text-sm">
              <Database className="w-4 h-4" />
              <span>Decisiones de Arquitectura MySQL & Rendimiento de Datos</span>
            </div>
            <ul className="space-y-2">
              {project.databaseFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <span className="text-rose-600 dark:text-rose-400 font-bold font-mono">›</span>
                  <span className="leading-relaxed">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Snippet Viewer */}
          {project.sampleCode && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-mono text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{project.sampleCode.title}</span>
                  <span>·</span>
                  <span>{project.sampleCode.filename}</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>

              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed shadow-inner">
                <pre>
                  <code>{project.sampleCode.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div className="pt-2">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Stack Tecnológico Empleado
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded text-xs font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-750"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            ¿Quieres implementar un patrón similar en tu empresa?
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
            >
              Cerrar
            </button>
            <button
              onClick={handleDiscuss}
              className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <span>Consultar por este Proyecto</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
