/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Coursera-inspired palette
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
        // game / lab dark zone
        night: {
          900: '#0a0e1a',
          800: '#111827',
          700: '#1c2536',
          600: '#2a3550',
        },
        neon: {
          green: '#28e07a',
          cyan: '#22d3ee',
          amber: '#fbbf24',
          red: '#f43f5e',
          purple: '#a78bfa',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['SF Mono', 'Consolas', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(27,42,58,.08), 0 4px 14px rgba(27,42,58,.06)',
        cardhover: '0 10px 34px rgba(27,42,58,.16)',
        glow: '0 0 24px rgba(40,224,122,.35)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        pulseGlow: { '0%,100%': { opacity: 1 }, '50%': { opacity: .5 } },
        pop: { '0%': { transform: 'scale(.8)', opacity: 0 }, '100%': { transform: 'scale(1)', opacity: 1 } },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        pulseGlow: 'pulseGlow 1.6s ease-in-out infinite',
        pop: 'pop .25s ease-out',
      },
    },
  },
  plugins: [],
}
