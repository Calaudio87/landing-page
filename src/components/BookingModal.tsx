import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Video } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<string>('2024-09-02');
  const [selectedTime, setSelectedTime] = useState<string>('15:00 GMT-4');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [topic, setTopic] = useState<string>('Evaluación de Arquitectura & Base de Datos');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  if (!isOpen) return null;

  const availableDates = [
    { date: '2024-09-02', label: 'Lunes, 2 Sep' },
    { date: '2024-09-03', label: 'Martes, 3 Sep' },
    { date: '2024-09-04', label: 'Miércoles, 4 Sep' },
    { date: '2024-09-05', label: 'Jueves, 5 Sep' },
    { date: '2024-09-08', label: 'Lunes, 8 Sep' },
  ];

  const availableTimes = [
    '10:00 GMT-4',
    '11:30 GMT-4',
    '15:00 GMT-4',
    '16:30 GMT-4',
    '18:00 GMT-4',
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsBooked(true);
  };

  const handleReset = () => {
    setIsBooked(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-800 dark:text-slate-200 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                Agendar Llamada Técnica (30 min)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Reunión por Google Meet con {PERSONAL_INFO.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isBooked ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white">
              ¡Llamada Agendada con Éxito!
            </h4>

            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
              Hemos registrado tu sesión para el <strong className="text-rose-600 dark:text-rose-400">{selectedDate}</strong> a las <strong className="text-sky-600 dark:text-sky-400">{selectedTime}</strong>. Se ha enviado una confirmación a <strong className="text-slate-900 dark:text-white">{email}</strong>.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-left space-y-1 font-mono">
              <div className="text-slate-500">Participante: <span className="text-slate-900 dark:text-white">{name}</span></div>
              <div className="text-slate-500">Tema: <span className="text-slate-800 dark:text-amber-300">{topic}</span></div>
              <div className="text-slate-500">Ingeniero: <span className="text-rose-600 dark:text-rose-300">{PERSONAL_INFO.name}</span></div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Listo, cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="p-5 space-y-3.5 text-xs">
            {/* Date selection */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5 font-mono">
                1. Selecciona Fecha:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {availableDates.map((d) => (
                  <button
                    type="button"
                    key={d.date}
                    onClick={() => setSelectedDate(d.date)}
                    className={`p-2 rounded-lg text-center transition-colors border cursor-pointer ${
                      selectedDate === d.date
                        ? 'bg-rose-600 text-white border-rose-600 font-semibold'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time selection */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5 font-mono">
                2. Selecciona Horario:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {availableTimes.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`p-1.5 rounded-lg text-center transition-colors border cursor-pointer font-mono text-[11px] ${
                      selectedTime === t
                        ? 'bg-sky-600 text-white border-sky-600 font-semibold'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Selection */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                3. Motivo de la Reunión:
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value="Desarrollo de Nuevo Proyecto Laravel">Desarrollo de Nuevo Proyecto Laravel</option>
                <option value="Auditoría y Optimización de Base de Datos MySQL">Auditoría y Optimización de Base de Datos MySQL</option>
                <option value="Migración de Sistema Legacy PHP">Migración de Sistema Legacy PHP</option>
                <option value="Contratación / Oportunidad Laboral">Contratación / Oportunidad Laboral</option>
                <option value="Consultoría Técnica General">Consultoría Técnica General</option>
              </select>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Tu Nombre:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Marcelo Morales"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Tu Email:</label>
                <input
                  type="email"
                  required
                  placeholder="tu@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-1"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Confirmar Cita en Calendario</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
