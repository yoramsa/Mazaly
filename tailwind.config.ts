import type { Config } from 'tailwindcss'

function withAlpha(variable: string) {
  return `rgb(var(${variable}) / <alpha-value>)`
}

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        marine: withAlpha('--c-marine'),
        bleu: withAlpha('--c-bleu'),
        mauve: withAlpha('--c-mauve'),
        creme: withAlpha('--c-creme'),
        or: withAlpha('--c-or'),
        ink: withAlpha('--c-ink'),
        surface: withAlpha('--c-surface'),
        rouge: withAlpha('--c-rouge'),
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(27,43,107,0.04), 0 8px 24px -12px rgba(27,43,107,0.12)',
        card: '0 1px 3px rgba(27,43,107,0.05), 0 18px 40px -20px rgba(27,43,107,0.22)',
        lift: '0 2px 6px rgba(27,43,107,0.06), 0 30px 60px -24px rgba(27,43,107,0.32)',
        glow: '0 10px 40px -10px rgba(74,111,212,0.45)',
        'glow-or': '0 8px 30px -6px rgba(201,168,76,0.5)',
        'glow-whatsapp': '0 0 0 0 rgba(37,211,102,0.55)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.6)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #4A6FD4 0%, #7B5EA7 100%)',
        'brand-gradient-soft':
          'linear-gradient(120deg, rgba(74,111,212,0.12) 0%, rgba(123,94,167,0.12) 100%)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(3%, -4%) scale(1.08)' },
          '66%': { transform: 'translate(-3%, 3%) scale(0.95)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(37,211,102,0.55)' },
          '100%': { boxShadow: '0 0 0 18px rgba(37,211,102,0)' },
        },
        'pulse-ring-rouge': {
          '0%': { boxShadow: '0 0 0 0 rgba(224,62,62,0.55)' },
          '100%': { boxShadow: '0 0 0 10px rgba(224,62,62,0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 18s ease-in-out infinite',
        'blob-slow': 'blob 26s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.22,1,0.36,1) infinite',
        'pulse-ring-rouge': 'pulse-ring-rouge 1.8s cubic-bezier(0.22,1,0.36,1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
