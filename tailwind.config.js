/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Definir animaciones personalizadas
      animation: {
        'fade-in': 'fadeIn 1.5s ease-out',
        'slide-down': 'slideDown 1.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'slide-up': 'slideUp 1.5s ease-out',
        'fade-in-down': 'fade-in-down 1s ease-out forwards',
        'blink': 'blink 1.5s infinite', // Animación de parpadeo
        'slide-right-back': 'slideRightAndBack 0.5s ease-in-out infinite', // Animación infinita
      },
      // Definir keyframes para las animaciones
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' }, // Siempre visible
          '10%': { opacity: '0.5' }, // Titileo sutil
        },
        // Nueva animación: Desliza a la derecha y regresa
        slideRightAndBack: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' }, // Mueve 10px a la derecha
          '100%': { transform: 'translateX(0)' }, // Regresa a la posición original
        },
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
};