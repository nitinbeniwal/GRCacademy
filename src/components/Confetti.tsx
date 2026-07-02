import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  g: number
  s: number
  rot: number
  vr: number
  c: string
  life: number
}

/** Lightweight canvas confetti burst. Fires when `fire` becomes true. */
export default function Confetti({ fire }: { fire: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!fire || !ref.current) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const W = (canvas.width = window.innerWidth)
    const H = (canvas.height = window.innerHeight)
    const colors = ['#0056D2', '#28e07a', '#fbbf24', '#f43f5e', '#a78bfa', '#22d3ee']
    const parts: Particle[] = Array.from({ length: 160 }, () => ({
      x: W / 2,
      y: H / 3,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -14 - 4,
      g: 0.3 + Math.random() * 0.2,
      s: 4 + Math.random() * 6,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      c: colors[(Math.random() * colors.length) | 0]!,
      life: 1,
    }))
    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, W, H)
      let alive = false
      for (const p of parts) {
        p.vy += p.g
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vr
        p.life -= 0.006
        if (p.life > 0 && p.y < H + 20) {
          alive = true
          ctx.save()
          ctx.globalAlpha = Math.max(0, p.life)
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)
          ctx.fillStyle = p.c
          ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6)
          ctx.restore()
        }
      }
      if (alive) raf = requestAnimationFrame(tick)
      else ctx.clearRect(0, 0, W, H)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [fire])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ display: fire ? 'block' : 'none' }}
    />
  )
}
