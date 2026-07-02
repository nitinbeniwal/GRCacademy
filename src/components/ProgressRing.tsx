interface Props {
  value?: number
  size?: number
  stroke?: number
  color?: string
  label?: string
}

export default function ProgressRing({ value = 0, size = 56, stroke = 6, color = '#0056D2', label }: Props) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const clamped = Math.min(100, Math.max(0, value))
  const off = c - (clamped / 100) * c
  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${Math.round(clamped)} percent complete`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e9f0" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset .6s ease' }}
        />
      </svg>
      <span className="absolute text-[11px] font-bold text-cink">{label ?? `${Math.round(clamped)}%`}</span>
    </div>
  )
}
