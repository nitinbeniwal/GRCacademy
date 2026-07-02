/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ---- LIGHT marketing surface (Coursera-inspired) ----
        cblue: {
          DEFAULT: '#0056D2',
          50: '#eef4ff',
          100: '#dce8ff',
          600: '#0056D2',
          700: '#00419e',
          800: '#00307a',
        },
        cink: '#1f1f1f',
        cslate: '#5b6b80',
        cline: '#e5e9f0',
        cbg: '#f5f7fa',

        // ---- DARK "arena" surface (labs / dashboard / leaderboard) ----
        night: {
          950: '#05070f',
          900: '#0a0e1a',
          800: '#111827',
          700: '#1c2536',
          600: '#2a3550',
          500: '#3a4870',
        },
        // borders / muted text on dark
        arena: {
          line: '#1e293b',
          muted: '#8ea0bd',
          text: '#dbe4f3',
        },
        neon: {
          green: '#28e07a',
          cyan: '#22d3ee',
          amber: '#fbbf24',
          red: '#f43f5e',
          purple: '#a78bfa',
          blue: '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['"JetBrains Mono"', 'SF Mono', 'Consolas', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(27,42,58,.08), 0 4px 14px rgba(27,42,58,.06)',
        cardhover: '0 10px 34px rgba(27,42,58,.16)',
        glow: '0 0 24px rgba(40,224,122,.35)',
        'glow-cyan': '0 0 24px rgba(34,211,238,.35)',
        'glow-purple': '0 0 28px rgba(167,139,250,.35)',
        panel: '0 1px 0 rgba(255,255,255,.04) inset, 0 12px 40px rgba(0,0,0,.45)',
      },
      backgroundImage: {
        // faint grid for the dark arena
        grid: 'linear-gradient(rgba(148,163,184,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.06) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(600px circle at 50% 0%, rgba(40,224,122,.10), transparent 70%)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        pulseGlow: { '0%,100%': { opacity: 1 }, '50%': { opacity: .5 } },
        pop: { '0%': { transform: 'scale(.8)', opacity: 0 }, '100%': { transform: 'scale(1)', opacity: 1 } },
        scan: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        blink: { '0%,49%': { opacity: 1 }, '50%,100%': { opacity: 0 } },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        pulseGlow: 'pulseGlow 1.6s ease-in-out infinite',
        pop: 'pop .25s ease-out',
        scan: 'scan 3.5s linear infinite',
        shimmer: 'shimmer 2.2s linear infinite',
        blink: 'blink 1.1s step-end infinite',
      },
    },
  },
  plugins: [],
}
