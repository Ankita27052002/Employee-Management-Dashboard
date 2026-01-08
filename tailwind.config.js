/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: {
          bg: '#FDFBD4',
        },
        card: {
          bg: '#FFFFFF',
          border: '#E3E1C8',
        },
        header: {
          bg: '#545333',
          text: '#FFFFFF',
          logoutHover: '#6A6957',
        },
        primary: {
          DEFAULT: '#6B8E23',
          hover: '#5F7E1E',
        },
        input: {
          bg: '#FFFFFF',
          border: '#D9D7B6',
          focus: '#6B8E23',
          placeholder: '#9A9985',
        },
        button: {
          edit: '#7A7965',
          editHover: '#6A6957',
          delete: '#B0483E',
          deleteHover: '#9E3F36',
          secondary: '#6B8E23',
          secondaryHover: '#EEF3E1',
        },
        table: {
          headerBg: '#F7F6E5',
          headerText: '#545333',
          hover: '#F1F2DF',
          activeBg: '#F8F8EA',
        },
        status: {
          active: '#6B8E23',
          activePill: '#EEF3E1',
          activeText: '#4F6E1F',
          inactiveTrack: '#D1D5C4',
          inactivePill: '#E4E6D6',
          inactiveText: '#6E6D58',
        },
        stat: {
          activeBorder: '#6B8E23',
          activeNumber: '#6B8E23',
          label: '#545333',
        },
      },
    },
  },
  plugins: [],
}
