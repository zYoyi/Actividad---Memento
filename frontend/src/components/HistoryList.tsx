import type { ConfiguracionSnapshot } from '../types';

interface HistoryListProps {
  historial: ConfiguracionSnapshot[];
  onRestaurar: (id: string) => void;
  onEliminar: (id: string) => void;
  loading: boolean;
}

const formatFecha = (fecha: string) =>
  new Date(fecha).toLocaleString('es-ES', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });

const HistoryList = ({ historial, onRestaurar, onEliminar, loading }: HistoryListProps) => (
  <div className="bg-[#040a10] border border-[#0a1e30] rounded-xl p-5 flex flex-col h-full">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-4 rounded-full bg-green-600" />
        <h2 className="text-green-500/60 font-mono text-xs tracking-widest uppercase">Historial</h2>
      </div>
      <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-800/40 px-2 py-0.5 rounded">
        {historial.length} REG.
      </span>
    </div>

    {historial.length === 0 ? (
      <div className="flex-1 flex flex-col items-center justify-center py-8 text-center">
        <div className="w-12 h-12 rounded-full border border-[#0f2030] bg-[#050a10] flex items-center justify-center mb-3">
          <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-slate-600 font-mono text-xs uppercase tracking-widest">Sin registros</p>
        <p className="text-slate-700 font-mono text-xs mt-2 leading-relaxed">
          Guarda una configuración<br />para crear el primer registro
        </p>
      </div>
    ) : (
      <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
        {[...historial].reverse().map((snap) => (
          <div key={snap.id}
            className="group p-3 bg-[#050a10] hover:bg-[#071018] border border-[#0f2030] hover:border-[#1a3050] rounded-lg transition-all">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <p className="text-slate-300 font-mono text-xs font-medium uppercase tracking-wide truncate">
                  {snap.nombre}
                </p>
                <p className="text-slate-600 font-mono text-xs mt-0.5">{formatFecha(snap.fecha)}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button onClick={() => onRestaurar(snap.id)} disabled={loading} title="Restaurar"
                  className="p-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-800/30 text-cyan-400 rounded transition-colors disabled:opacity-40">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button onClick={() => onEliminar(snap.id)} disabled={loading} title="Eliminar"
                  className="p-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-900/30 text-red-400 rounded transition-colors disabled:opacity-40">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {snap.ventanasBloqueadas && (
                <span className="font-mono text-xs bg-amber-500/10 text-amber-500/70 border border-amber-800/30 px-1.5 py-0.5 rounded">VNT</span>
              )}
              {snap.puertasBloqueadas && (
                <span className="font-mono text-xs bg-amber-500/10 text-amber-500/70 border border-amber-800/30 px-1.5 py-0.5 rounded">PRT</span>
              )}
              {snap.cinturonObligatorio && (
                <span className="font-mono text-xs bg-amber-500/10 text-amber-500/70 border border-amber-800/30 px-1.5 py-0.5 rounded">CNT</span>
              )}
              <span className="font-mono text-xs bg-cyan-500/10 text-cyan-500/70 border border-cyan-800/30 px-1.5 py-0.5 rounded">
                {snap.velocidadMaxima} km/h
              </span>
            </div>
          </div>
        ))}
      </div>
    )}

    <div className="mt-3 pt-3 border-t border-[#0a1520]">
      <p className="text-slate-700 font-mono text-xs">Hover sobre un registro para ver acciones</p>
    </div>
  </div>
);

export default HistoryList;
