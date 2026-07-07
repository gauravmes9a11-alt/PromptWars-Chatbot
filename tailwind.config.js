/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#12172B",
          light: "#1C2340",
          soft: "#2A3358",
        },
        paper: "#F5F3EE",
        amber: {
          DEFAULT: "#FFB100",
          dim: "#B87F00",
        },
        teal: {
          DEFAULT: "#00C2B2",
          dim: "#00897E",
        },
        crimson: "#E23744",
        line: "rgba(245,243,238,0.12)",
      },
      fontFamily: {
        display: ["'Oswald'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
    },
  },
  plugins: [],
};
