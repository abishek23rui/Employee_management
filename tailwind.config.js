/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css,scss}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "light-primary-color": "var(--light-primary-color)",
        "background-color": "var(--background-color)",
        "success-color": "var(--success-color)",
        "warning-color": "var(--warning-color)",
        "info-color": "var(--info-color)",
        "red-color": "var(--red-color)",
        "light-gray-color": "var(--light-gray-color)",
        "input-background": "var(--input-background)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],

        // Custom semantic sizes

        h1: ["2rem", { lineHeight: "2.5rem" }],
        h2: ["1.5rem", { lineHeight: "2rem" }],
        h3: ["1.25rem", { lineHeight: "1.75rem" }],
        body: ["1rem", { lineHeight: "1.5rem" }],
        table: ["0.875rem", { lineHeight: "1.25rem" }],
        small: ["0.75rem", { lineHeight: "1rem" }],
      },
      borderRadius: {
        lg: "12px",
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.1)",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-6px)" },
          "40%, 80%": { transform: "translateX(6px)" },
        },
      },
      animation: {
        shake: "shake 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
};
