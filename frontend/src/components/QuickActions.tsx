import { useState } from 'react';
import type { ConfiguracionState } from '../types';
import { PERFILES_RAPIDOS } from '../types';

interface QuickActionsProps {
  onActivar: () => void;
  onDesactivar: () => void;
  onGuardar: (nombre: string) => void;
  onAplicarPerfil: (config: ConfiguracionState) => void;
  loading: boolean;
  modoActivo: boolean;
}

const QuickActions = ({ onActivar, onDesactivar, onGuardar, onAplicarPerfil, loading }: QuickActionsProps) => {
  const [showSave, setShowSave] = useState(false);
  const [nombre, setNombre] = useState('');

  const handleGuardar = () => {
    if (!nombre.trim()) return;
    onGuardar(nombre.trim());
    setNombre('');
    setShowSave(false);
  };

  return (
    <div className="bg-[#040a10] border border-[#0a1e30] rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-4 rounded-full bg-green-600" />
        <h2 className="text-green-500/60 font-mono text-xs tracking-widest uppercase">Controles Rápidos</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <button onClick={onActivar} disabled={loading}
          className="flex items-center justify-center gap-2 py-3 rounded-lg border border-green-800/60 bg-green-500/10 hover:bg-green-500/20 disabled:opacity-40 transition-all font-mono text-green-400 text-xs uppercase tracking-widest">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          Activar
        </button>
        <button onClick={onDesactivar} disabled={loading}
          className="flex items-center justify-center gap-2 py-3 rounded-lg border border-red-900/50 bg-red-500/10 hover:bg-red-500/20 disabled:opacity-40 transition-all font-mono text-red-400 text-xs uppercase tracking-widest">
          <div className="w-2 h-2 rounded-full bg-red-600" />
          Desactivar
        </button>
      </div>

      <button onClick={() => setShowSave(true)} disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-cyan-800/40 bg-cyan-500/5 hover:bg-cyan-500/10 disabled:opacity-40 transition-all font-mono text-cyan-500/70 text-xs uppercase tracking-widest mb-4">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        Guardar configuración actual
      </button>

      {showSave && (
        <div className="mb-4 p-4 bg-[#050d18] border border-cyan-800/30 rounded-lg">
          <p className="text-cyan-500/50 font-mono text-xs uppercase tracking-widest mb-2">
            Nombre de la configuración
          </p>
          <input
            autoFocus type="text" value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGuardar()}
            placeholder="Ej: Viaje al colegio"
            className="w-full bg-[#030810] border border-[#1a3050] rounded-lg px-3 py-2 text-cyan-300 font-mono text-sm placeholder-slate-700 focus:outline-none focus:border-cyan-700 mb-3"
          />
          <div className="flex gap-2">
            <button onClick={handleGuardar} disabled={!nombre.trim()}
              className="flex-1 py-2 rounded-lg border border-cyan-700/40 bg-cyan-500/10 hover:bg-cyan-500/20 disabled:opacity-40 font-mono text-cyan-400 text-xs uppercase tracking-wider transition-colors">
              Guardar
            </button>
            <button onClick={() => { setShowSave(false); setNombre(''); }}
              className="flex-1 py-2 rounded-lg border border-[#1a3050] bg-[#040a10] hover:bg-[#081520] font-mono text-slate-500 text-xs uppercase tracking-wider transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      )}

      <p className="text-slate-700 font-mono text-xs uppercase tracking-widest mb-2">Perfiles</p>
      <div className="grid grid-cols-2 gap-2">
        {PERFILES_RAPIDOS.map((p) => (
          <button key={p.nombre} onClick={() => onAplicarPerfil(p.config)} disabled={loading}
            className="text-left p-2.5 bg-[#050a10] hover:bg-[#0a1520] border border-[#0f2030] hover:border-[#1a3050] rounded-lg transition-colors disabled:opacity-50">
            <p className="text-slate-400 font-mono text-xs uppercase tracking-wide">{p.nombre}</p>
            <p className="text-slate-600 font-mono text-xs mt-0.5">{p.config.velocidadMaxima} km/h</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
