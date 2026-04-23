import type { ConfiguracionState } from '../types';
import Toggle from './Toggle';

interface ConfigFormProps {
  config: ConfiguracionState;
  onChange: (updates: Partial<ConfiguracionState>) => void;
}

interface SwitchRowProps {
  label: string;
  sublabel: string;
  checked: boolean;
  onToggle: (v: boolean) => void;
}

const SwitchRow = ({ label, sublabel, checked, onToggle }: SwitchRowProps) => (
  <div className={`flex items-center justify-between px-4 py-3.5 rounded-lg border transition-all duration-200 ${
    checked ? 'border-amber-700/50 bg-amber-500/5' : 'border-[#0f2030] bg-[#050a10]'
  }`}>
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full transition-all ${checked ? 'bg-amber-500' : 'bg-slate-800'}`} />
      <div>
        <p className={`font-mono text-sm uppercase tracking-widest transition-all ${
          checked ? 'text-amber-300' : 'text-slate-500'
        }`}>
          {label}
        </p>
        <p className="text-slate-700 font-mono text-xs mt-0.5">{sublabel}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <span className={`font-mono text-xs font-bold tracking-wider ${checked ? 'text-amber-400' : 'text-slate-700'}`}>
        {checked ? 'ON' : 'OFF'}
      </span>
      <Toggle checked={checked} onChange={onToggle} />
    </div>
  </div>
);

const ConfigForm = ({ config, onChange }: ConfigFormProps) => (
  <div className="bg-[#040a10] border border-[#0a1e30] rounded-xl p-5">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1.5 h-4 rounded-full bg-cyan-600" />
      <h2 className="text-cyan-500/60 font-mono text-xs tracking-widest uppercase">Panel de Control</h2>
    </div>

    <div className="space-y-2 mb-5">
      <SwitchRow
        label="Ventanas" sublabel="Bloqueo de ventanas traseras"
        checked={config.ventanasBloqueadas}
        onToggle={(v) => onChange({ ventanasBloqueadas: v })}
      />
      <SwitchRow
        label="Puertas" sublabel="Seguro de puertas traseras"
        checked={config.puertasBloqueadas}
        onToggle={(v) => onChange({ puertasBloqueadas: v })}
      />
      <SwitchRow
        label="Cinturón" sublabel="Alerta cinturón obligatorio"
        checked={config.cinturonObligatorio}
        onToggle={(v) => onChange({ cinturonObligatorio: v })}
      />
    </div>

    {/* Speed slider */}
    <div className={`p-4 rounded-lg border transition-all ${
      config.velocidadMaxima < 120 ? 'border-cyan-700/40 bg-cyan-500/5' : 'border-[#0f2030] bg-[#050a10]'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full transition-all ${config.velocidadMaxima < 120 ? 'bg-cyan-500' : 'bg-slate-800'}`} />
          <div>
            <p className="text-cyan-500/70 font-mono text-sm uppercase tracking-widest">Velocidad Máx.</p>
            <p className="text-slate-700 font-mono text-xs mt-0.5">Límite de velocidad</p>
          </div>
        </div>
        <div className="text-right">
          <span className="font-mono font-bold text-2xl text-cyan-400">{config.velocidadMaxima}</span>
          <span className="text-slate-600 font-mono text-xs ml-1">km/h</span>
        </div>
      </div>

      <input
        type="range" min={40} max={200} step={10} value={config.velocidadMaxima}
        onChange={(e) => onChange({ velocidadMaxima: Number(e.target.value) })}
        className="w-full cursor-pointer"
        style={{ appearance: 'none', height: '4px', borderRadius: '4px', background: '#0f2030', outline: 'none' }}
      />
      <div className="flex justify-between mt-2">
        <span className="text-slate-700 font-mono text-xs">40 km/h</span>
        <span className="text-slate-700 font-mono text-xs">200 km/h</span>
      </div>
    </div>
  </div>
);

export default ConfigForm;
