import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        marine: '#1B2B6B',
        bleu: '#4A6FD4',
        mauve: '#7B5EA7',
        creme: '#FAF8F5',
        or: '#C9A84C',
        ink: '#0E1430',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(27,43,107,0.04), 0 8px 24px -12px rgba(27,43,107,0.12)',
        card: '0 1px 3px rgba(27,43,107,0.05), 0 18px 40px -20px rgba(27,43,107,0.22)',
        lift: '0 2px 6px rgba(27,43,107,0.06), 0 30px 60px -24px rgba(27,43,107,0.32)',
        glow: '0 10px 40px -10px rgba(74,111,212,0.45)',
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
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
