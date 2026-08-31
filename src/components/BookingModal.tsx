import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Video, Mail, User, Phone, ArrowRight } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-slate-900/95 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Agendar Llamada Técnica de 30 min
              </h3>
              <p className="text-xs text-slate-400">
                Reunión 1-a-1 por Google Meet con {PERSONAL_INFO.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isBooked ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-bold font-display text-white">
              ¡Llamada Agendada con Éxito!
            </h4>

            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Hemos registrado tu sesión para el <strong className="text-rose-400">{selectedDate}</strong> a las <strong className="text-cyan-400">{selectedTime}</strong>. Se ha enviado una confirmación a <strong className="text-white">{email}</strong> con el enlace de Google Meet.
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-left space-y-1.5 font-mono">
              <div className="text-slate-400">Participante: <span className="text-white">{name}</span></div>
              <div className="text-slate-400">Tema: <span className="text-amber-300">{topic}</span></div>
              <div className="text-slate-400">Ingeniero: <span className="text-rose-300">{PERSONAL_INFO.name}</span></div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer"
            >
              Listo, cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="p-6 space-y-4 text-xs">
            {/* Date selection */}
            <div>
              <label className="block text-slate-300 font-semibold mb-2 font-mono">
                1. Selecciona una Fecha:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableDates.map((d) => (
                  <button
                    type="button"
                    key={d.date}
                    onClick={() => setSelectedDate(d.date)}
                    className={`p-2 rounded-lg text-center transition-all border cursor-pointer ${
                      selectedDate === d.date
                        ? 'bg-rose-600 text-white border-rose-500 font-semibold'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time selection */}
            <div>
              <label className="block text-slate-300 font-semibold mb-2 font-mono">
                2. Selecciona un Horario:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`p-2 rounded-lg text-center transition-all border cursor-pointer ${
                      selectedTime === t
                        ? 'bg-cyan-600 text-white border-cyan-500 font-semibold'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Selection */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                3. Motivo de la Reunión:
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-rose-500"
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
                <label className="block text-slate-300 font-semibold mb-1">Tu Nombre:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Marcelo Morales"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tu Email:</label>
                <input
                  type="email"
                  required
                  placeholder="tu@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Video className="w-4 h-4" />
              <span>Confirmar y Reservar Cita en Calendario</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
