/**
 * @file tailwind.config.js
 * @description Tailwind content paths and semantic Lexora design tokens.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['variant', '&:where([data-theme="dark"], [data-theme="dark"] *)'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        secondary: 'var(--color-secondary)',
        border: 'var(--color-border)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        primary: 'var(--color-primary)',
        'primary-subtle': 'var(--color-primary-subtle)',
        'primary-foreground': 'var(--color-primary-foreground)',
        accent: 'var(--color-accent)',
        danger: 'var(--color-danger)',
        'danger-foreground': 'var(--color-danger-foreground)',
        overlay: 'var(--color-overlay)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
