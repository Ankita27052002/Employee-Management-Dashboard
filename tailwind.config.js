/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand (Fresh & Trustworthy)
        primary: {
          DEFAULT: '#0FB9B1',
          hover: '#0AA39C',
          light: '#ECFEFD',
        },
        // Backgrounds
        bg: {
          app: '#F6FAFB',
          card: '#FFFFFF',
          neutral: '#F6FAFB',
        },
        // Text Hierarchy
        text: {
          primary: '#1F2933',
          secondary: '#6B7280',
          muted: '#9CA3AF',
        },
        // Borders & Dividers
        border: {
          DEFAULT: '#E6F2F2',
          input: '#D1E7E5',
          focus: '#0FB9B1',
        },
        // Status Colors
        active: {
          DEFAULT: '#22C55E',
          light: '#D1FAE5',
        },
        inactive: {
          DEFAULT: '#9CA3AF',
          light: '#F3F4F6',
        },
        // Action Buttons
        edit: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
        },
        danger: {
          DEFAULT: '#EF4444',
          hover: '#DC2626',
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
