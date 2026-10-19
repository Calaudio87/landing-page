import React, { useState, useEffect } from 'react';
import { Sun, Moon, Send, Menu, X, Calendar } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenBooking: () => void;
  onSelectService?: (serviceName: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Laboratorio MySQL', href: '#mysql-lab' },
    { name: 'Habilidades', href: '#habilidades' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Trayectoria', href: '#trayectoria' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single clean element) */}
        <a
          href="#"
          className="group flex items-center gap-3 focus:outline-none shrink-0"
          aria-label="Claudio Leiva - Desarrollador Senior PHP & MySQL"
        >
          <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-mono font-bold text-xs tracking-wider shadow-xs">
            CL
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-slate-900 dark:text-slate-100 text-base tracking-tight group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors whitespace-nowrap">
              {PERSONAL_INFO.name}
            </span>
            <span className="hidden xl:inline text-xs text-slate-400 dark:text-slate-400 font-mono">
              / Backend Architect
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Clean unboxed single-line typography) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-slate-600 dark:text-slate-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-rose-500/60"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions (Theme Toggle + Schedule + Primary CTA) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            id="theme-toggle-btn"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
            aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            title={isDark ? 'Activar tema claro' : 'Activar tema oscuro'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" />
            )}
          </button>

          <button
            id="nav-schedule-btn"
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Agendar Llamada</span>
          </button>

          <a
            id="nav-contact-cta"
            href="#contacto"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Contacto</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer"
            aria-label="Alternar menú de navegación móvil"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 mt-3 shadow-lg">
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/80">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Modo de Visualización</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
              <span>{isDark ? 'Tema Claro' : 'Tema Oscuro'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-center"
            >
              Agendar Llamada Técnica (30 min)
            </button>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-xs font-medium text-white bg-rose-600 rounded-lg text-center"
            >
              Iniciar Conversación
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
