import { useMemo } from 'react';

interface SpeedoGaugeProps {
  value: number;
  min?: number;
  max?: number;
}

const SpeedoGauge = ({ value, min = 40, max = 200 }: SpeedoGaugeProps) => {
  const cx = 110, cy = 108, r = 82;
  const circumference = 2 * Math.PI * r;
  const arcLength = circumference * 0.75;
  const pct = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const filled = arcLength * pct;

  const color =
    value <= 80  ? '#22c55e' :
    value <= 130 ? '#06b6d4' :
    value <= 160 ? '#f59e0b' : '#ef4444';

  const majorTicks = useMemo(() =>
    [0, 0.25, 0.5, 0.75, 1].map((f) => {
      const angle = (135 + f * 270) * (Math.PI / 180);
      return {
        x1: cx + Math.cos(angle) * 65, y1: cy + Math.sin(angle) * 65,
        x2: cx + Math.cos(angle) * 76, y2: cy + Math.sin(angle) * 76,
        lx: cx + Math.cos(angle) * 55, ly: cy + Math.sin(angle) * 55,
        label: Math.round(min + f * (max - min)),
      };
    }), [min, max]
  );

  const minorTicks = useMemo(() =>
    Array.from({ length: 21 }, (_, i) => i / 20)
      .filter((f) => ![0, 0.25, 0.5, 0.75, 1].includes(f))
      .map((f) => {
        const angle = (135 + f * 270) * (Math.PI / 180);
        return {
          x1: cx + Math.cos(angle) * 70, y1: cy + Math.sin(angle) * 70,
          x2: cx + Math.cos(angle) * 76, y2: cy + Math.sin(angle) * 76,
        };
      }), []
  );

  return (
    <svg viewBox="0 0 220 210" className="w-full h-full">
      <circle cx={cx} cy={cy} r={106} fill="#040a10" stroke="#0a1a28" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={100} fill="none" stroke="#071520" strokeWidth="8" />
      <circle cx={cx} cy={cy} r={96} fill="none" stroke="#0a1e30" strokeWidth="1" />

      {/* Arc track */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none" stroke="#0d1e2e" strokeWidth="14" strokeLinecap="round"
        strokeDasharray={`${arcLength} ${circumference}`}
        transform={`rotate(135, ${cx}, ${cy})`}
      />

      {/* Filled arc */}
      {filled > 3 && (
        <circle
          cx={cx} cy={cy} r={r}
          fill="none" stroke={color} strokeWidth="14" strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
          transform={`rotate(135, ${cx}, ${cy})`}
        />
      )}

      {/* Minor ticks */}
      {minorTicks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#182838" strokeWidth="1" />
      ))}

      {/* Major ticks + labels */}
      {majorTicks.map((t, i) => (
        <g key={i}>
          <line x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#1e3a54" strokeWidth="2.5" />
          <text x={t.lx} y={t.ly} textAnchor="middle" dominantBaseline="middle"
            fill="#1e3a54" fontSize="9" fontFamily="monospace">{t.label}</text>
        </g>
      ))}

      {/* Center face */}
      <circle cx={cx} cy={cy} r={54} fill="#030810" stroke="#0d1e2e" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={49} fill="none" stroke="#091520" strokeWidth="4" />

      {/* Speed value */}
      <text x={cx} y={cy - 10} textAnchor="middle"
        fill={color} fontSize="38" fontFamily="monospace" fontWeight="bold">
        {value}
      </text>
      <text x={cx} y={cy + 16} textAnchor="middle"
        fill="#1e3a54" fontSize="11" fontFamily="monospace" letterSpacing="3">
        KM/H
      </text>
      <text x={cx} y={cy + 34} textAnchor="middle"
        fill="#0f2030" fontSize="7.5" fontFamily="monospace" letterSpacing="5">
        VEL MÁX
      </text>
    </svg>
  );
};

export default SpeedoGauge;
