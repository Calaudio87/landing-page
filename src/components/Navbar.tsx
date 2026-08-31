import React, { useState, useEffect } from 'react';
import { Terminal, Database, Code2, Layers, Briefcase, Mail, Send, Menu, X, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenBooking: () => void;
  onSelectService?: (serviceName: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Proyectos', href: '#proyectos', icon: Layers },
    { name: 'Laboratorio MySQL', href: '#mysql-lab', icon: Database },
    { name: 'Habilidades', href: '#habilidades', icon: Code2 },
    { name: 'Servicios', href: '#servicios', icon: Briefcase },
    { name: 'Trayectoria', href: '#trayectoria', icon: Terminal },
    { name: 'Contacto', href: '#contacto', icon: Mail },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="group flex items-center gap-3 focus:outline-none"
          aria-label="Claudio Leiva Portfolio"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 via-rose-600 to-amber-500 flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <span className="font-mono font-bold text-white text-base">CL</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-slate-100 text-lg group-hover:text-rose-400 transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Laravel & MySQL
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono hidden md:block">
              Backend & Database Architect
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/70 backdrop-blur-sm">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all"
              >
                <Icon className="w-3.5 h-3.5 text-slate-400" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Buttons & Status */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Disponible para proyectos</span>
          </div>

          <button
            id="nav-schedule-btn"
            onClick={onOpenBooking}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors cursor-pointer"
          >
            Agendar Llamada
          </button>

          <a
            id="nav-contact-cta"
            href="#contacto"
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 rounded-lg shadow-sm shadow-rose-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Hablemos</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="#contacto"
            className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 rounded-lg"
          >
            Contacto
          </a>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Disponible para nuevos proyectos</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700"
                >
                  <Icon className="w-4 h-4 text-rose-400" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/60 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-lg text-center"
            >
              Agendar Llamada de 30 min
            </button>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-full py-2.5 text-xs font-semibold text-white bg-rose-600 rounded-lg text-center flex items-center justify-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Enviar Correo Directo</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
