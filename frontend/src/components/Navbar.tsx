import { useState, useEffect } from 'react';

interface NavbarProps {
  modoActivo: boolean;
}

const Navbar = ({ modoActivo }: NavbarProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateStr = time.toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: '2-digit', year: '2-digit' });

  return (
    <nav className="border-b border-[#0a1e30] px-6 py-3"
      style={{ background: 'linear-gradient(180deg, #050d18 0%, #030810 100%)' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-cyan-900 bg-cyan-500/10 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M5 17H3a1 1 0 0 1-1-1v-4l2.5-5h13L20 12v4a1 1 0 0 1-1 1h-2" />
              <circle cx="7.5" cy="17" r="1.5" />
              <circle cx="16.5" cy="17" r="1.5" />
              <path d="M5 12h14" />
              <path d="M7 7l-1 5" />
              <path d="M17 7l1 5" />
            </svg>
          </div>
          <p className="text-cyan-400 font-mono font-bold text-sm tracking-widest uppercase">
            Child Safety Sys
          </p>
        </div>

        {/* System status */}
        <div className={`flex items-center gap-2.5 px-5 py-2 rounded-full border font-mono text-xs tracking-widest uppercase transition-all ${
          modoActivo
            ? 'border-green-700/50 bg-green-500/10 text-green-400'
            : 'border-red-900/40 bg-red-500/5 text-red-500'
        }`}>
          <div className={`w-2 h-2 rounded-full ${modoActivo ? 'bg-green-400 animate-pulse' : 'bg-red-700'}`} />
          {modoActivo ? 'Sistema Activo' : 'Sistema Inactivo'}
        </div>

        {/* Clock */}
        <div className="text-right">
          <p className="text-cyan-400 font-mono text-base tracking-widest">{timeStr}</p>
          <p className="text-slate-600 font-mono text-xs tracking-wider uppercase">{dateStr}</p>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
