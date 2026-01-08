/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base & Layout
        bg: {
          app: '#FDFBD4',
          card: '#FFFFFF',
          neutral: '#F7F6E5',
        },
        // Header
        header: {
          DEFAULT: '#5F5E3D',
          text: '#FDFBD4',
          hover: '#D9D7B6',
        },
        // Typography
        text: {
          primary: '#2F2F1F',
          secondary: '#878672',
          muted: '#9A9985',
        },
        // Borders
        border: {
          DEFAULT: '#E3E1C8',
          input: '#D9D7B6',
          focus: '#6B8E23',
          accent: '#6B8E23',
        },
        // Primary Actions
        primary: {
          DEFAULT: '#5F7E1E',
          hover: '#4F6B18',
        },
        // Secondary Actions
        secondary: {
          DEFAULT: '#FDFBD4',
          border: '#6B8E23',
          hover: '#E3E1C8',
        },
        // Status Colors
        active: {
          DEFAULT: '#6B8E23',
          light: '#EDF4E3',
          text: '#4F6E1F',
          accent: '#5F7E1E',
          rowBg: '#F1F2DF',
        },
        inactive: {
          DEFAULT: '#9A9985',
          light: '#E4E6D6',
          text: '#6E6D58',
          border: '#CFCFB5',
          track: '#D1D5C4',
          rowBg: '#FAFAF0',
        },
        // Action Buttons
        edit: {
          DEFAULT: '#7A7965',
          hover: '#6A6957',
        },
        danger: {
          DEFAULT: '#B0483E',
          hover: '#9E3F36',
        },
        // Table
        table: {
          header: '#F2F1DA',
          headerText: '#3B3A26',
          hover: '#ECEAD2',
          selected: '#E3E1C8',
        },
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(84, 83, 51, 0.12), 0 1px 2px 0 rgba(84, 83, 51, 0.08)',
        'card-hover': '0 4px 6px -1px rgba(84, 83, 51, 0.12), 0 2px 4px -1px rgba(84, 83, 51, 0.08)',
      },
    },
  },
  plugins: [],
}
