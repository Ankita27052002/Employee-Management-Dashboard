/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0faec1',
          hover: '#0f6b6f',
          dark: '#042f30',
          light: '#4dc4d4',
        },
        header: {
          DEFAULT: '#5ec2cf', // Lighter, less saturated teal
        },
        active: {
          DEFAULT: '#10b981', // Green for active status
          light: '#d1fae5',
          text: '#047857',
        },
        bg: {
          app: '#f4fcfc',
          card: '#ffffff',
          muted: '#86d0cf',
          neutral: '#f9fafb',
        },
        text: {
          primary: '#040803',
          secondary: '#6b7280',
          muted: '#9ca3af',
        },
        border: {
          DEFAULT: '#e5e7eb',
          soft: '#86d0cf',
          accent: '#d1d5db',
        },
        success: {
          DEFAULT: '#0faec1',
          soft: '#f4fcfc',
        },
        danger: {
          DEFAULT: '#ef4444',
          soft: '#fee2e2',
          hover: '#dc2626',
          muted: '#f87171', // Less saturated red
        },
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
