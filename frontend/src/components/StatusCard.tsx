import type { ReactNode } from 'react';
import type { ConfiguracionState } from '../types';
import SpeedoGauge from './SpeedoGauge';

interface StatusCardProps {
  config: ConfiguracionState;
}

interface IndicatorProps {
  active: boolean;
  icon: ReactNode;
  label: string;
  activeColor: string;
  borderActive: string;
  bgActive: string;
}

const IconVentana = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="12" y1="4" x2="12" y2="20" />
    <polyline points="8,8 6,10 8,12" />
  </svg>
);

const IconPuerta = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    <circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const IconCinturon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="5" r="2.5" />
    <path d="M9 9 C9 9 8 14 8 20" />
    <path d="M15 9 C15 9 16 14 16 20" />
    <line x1="9" y1="9" x2="15" y2="9" />
    <line x1="10" y1="8" x2="17" y2="20" strokeWidth="2.5" />
  </svg>
);

const IconVelocidad = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M5.636 18.364a9 9 0 1 1 12.728 0" />
    <line x1="12" y1="18" x2="16" y2="10" />
    <circle cx="12" cy="18" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const Indicator = ({ active, icon, label, activeColor, borderActive, bgActive }: IndicatorProps) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
      active ? `${borderActive} ${bgActive}` : 'border-[#0f2030] bg-[#040a10] opacity-25'
    }`}>
      <span className={active ? activeColor : 'text-slate-500'}>
        {icon}
      </span>
    </div>
    <span className={`text-xs font-mono uppercase tracking-widest transition-all ${
      active ? activeColor : 'text-slate-700'
    }`}>
      {label}
    </span>
  </div>
);

const StatusCard = ({ config }: StatusCardProps) => {
  const modoActivo = config.ventanasBloqueadas || config.puertasBloqueadas || config.cinturonObligatorio;

  return (
    <div className="space-y-4">
      {/* Speedometer */}
      <div className="bg-[#040a10] border border-[#0a1e30] rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-4 rounded-full bg-cyan-600" />
          <span className="text-cyan-500/60 font-mono text-xs tracking-widest uppercase">Velocímetro</span>
        </div>
        <div className="w-full max-w-[220px] mx-auto aspect-square">
          <SpeedoGauge value={config.velocidadMaxima} />
        </div>
      </div>

      {/* Warning indicator lights */}
      <div className="bg-[#040a10] border border-[#0a1e30] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 rounded-full bg-amber-600" />
            <span className="text-amber-500/60 font-mono text-xs tracking-widest uppercase">Indicadores</span>
          </div>
          <span className={`font-mono text-xs font-bold tracking-widest px-2 py-0.5 rounded ${
            modoActivo ? 'text-green-400 bg-green-500/10' : 'text-red-600 bg-red-500/10'
          }`}>
            {modoActivo ? '● ON' : '○ OFF'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Indicator active={config.ventanasBloqueadas}
            icon={<IconVentana />} label="Ventanas"
            activeColor="text-amber-400"
            borderActive="border-amber-600" bgActive="bg-amber-500/15" />
          <Indicator active={config.puertasBloqueadas}
            icon={<IconPuerta />} label="Puertas"
            activeColor="text-amber-400"
            borderActive="border-amber-600" bgActive="bg-amber-500/15" />
          <Indicator active={config.cinturonObligatorio}
            icon={<IconCinturon />} label="Cinturón"
            activeColor="text-amber-400"
            borderActive="border-amber-600" bgActive="bg-amber-500/15" />
          <Indicator active={config.velocidadMaxima < 120}
            icon={<IconVelocidad />} label="Vel. Lím."
            activeColor="text-cyan-400"
            borderActive="border-cyan-600" bgActive="bg-cyan-500/15" />
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
