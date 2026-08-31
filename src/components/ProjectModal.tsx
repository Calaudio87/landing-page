import React from 'react';
import { X, Database, Server, Code, CheckCircle2, ArrowRight, Zap, Cpu, ExternalLink, ShieldCheck, Copy, Check } from 'lucide-react';
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-y-auto flex flex-col text-slate-200">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-5 bg-slate-900/95 border-b border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-[11px] font-mono font-semibold rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase tracking-wider">
              {project.category}
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar modal de proyecto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Tagline & Full Overview */}
          <div>
            <p className="text-base text-rose-300/90 font-medium mb-3">
              {project.tagline}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.fullOverview}
            </p>
          </div>

          {/* Impact Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.impactMetrics.map((metric, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400 uppercase tracking-wider block font-mono">
                  {metric.label}
                </span>
                <span className="text-2xl font-bold font-display text-white mt-1 block">
                  {metric.value}
                </span>
                <span className="text-xs text-slate-400 mt-1 block">
                  {metric.description}
                </span>
              </div>
            ))}
          </div>

          {/* Database Architecture & MySQL Tuning Highlights */}
          <div className="p-5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
              <Database className="w-4 h-4" />
              <span>Decisiones de Arquitectura MySQL & Rendimiento de Datos</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
              {project.databaseFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Laravel & Backend Highlights */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
              <Server className="w-4 h-4" />
              <span>Aspectos Clave de Implementación Backend & Laravel</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.architectureHighlights.map((arch, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{arch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Sample Section */}
          {project.sampleCode && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Code className="w-4 h-4 text-rose-400" />
                  <span>{project.sampleCode.filename}</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Código</span>
                    </>
                  )}
                </button>
              </div>

              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner">
                <pre className="text-slate-300 whitespace-pre">
                  <code>{project.sampleCode.code}</code>
                </pre>
              </div>
              <p className="text-xs text-slate-400 italic">
                {project.sampleCode.explanation}
              </p>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-2 font-mono">
              TECNOLOGÍAS Y HERRAMIENTAS
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono font-medium rounded-lg bg-slate-800 text-slate-200 border border-slate-700/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-3 p-5 bg-slate-900/95 border-t border-slate-800 backdrop-blur-md">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Cerrar Detalles
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                if (onSelectProjectForContact) {
                  onSelectProjectForContact(project.title);
                }
                const contactEl = document.getElementById('contacto');
                if (contactEl) {
                  contactEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-4 py-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-xs rounded-lg shadow-md shadow-rose-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Consultar por un desarrollo similar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
