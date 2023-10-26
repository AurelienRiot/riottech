/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  mode: "jit",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./providers/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        Inter: ["var(--font-inter)"],
        Pacifico: ["var(--font-pacifico)"],
        SourceCodePro: ["var(--font-source-code-pro)"],
      },
      boxShadow: {
        "2xl":
          "0 25px 50px -12px rgb(0 0 0 / 0.25), 0 20px 25px -10px rgb(0 0 0 / 0.25)",
      },
      transitionDuration: {
        2000: "2000ms",
        5000: "5000ms",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
        "gradient-multicolor":
          "linear-gradient(90deg, hsl(0, 100%, 50%), hsl(30, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(240, 100%, 50%), hsl(275, 100%, 50%), hsl(300, 100%, 50%))",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        glitch: {
          "2%, 64%": {
            transform: "translate(2px,0) skew(0deg)",
          },
          "4%, 60%": {
            transform: "translate(-2px,0) skew(0deg)",
          },
          "62%": {
            transform: "translate(0,0) skew(5deg)",
          },
        },
        "glitch-top": {
          "2%, 64%": {
            transform: "translate(2px, -2px)",
          },
          "4%, 60%": {
            transform: "translate(-2px, 2px)",
          },
          "62%": {
            transform: "translate(13px, -1px) skew(-13deg)",
          },
        },
        "glitch-bottom": {
          "2%, 64%": {
            transform: "translate(-2px, 0)",
          },
          "4%, 60%": {
            transform: "translate(-2px, 0)",
          },
          "62%": {
            transform: "translate(-22px, 5px) skew(21deg)",
          },
        },
        "load-bar": {
          "0%": { width: "25%", left: "-25%" },
          "100%": { width: "25%", left: "100%" },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { maxHeight: 0, opacity: 0 },
          to: {
            maxHeight: "var(--radix-collapsible-content-height)",
            opacity: 1,
          },
        },
        "collapsible-up": {
          from: {
            maxHeight: "var(--radix-collapsible-content-height)",
            opacity: 1,
          },
          to: { maxHeight: 0, opacity: 0 },
        },
        "reveal-in": {
          "0%": { width: "0%", color: "hsl(var(--primary-foreground))" },
          "100%": { width: "100%", color: "hsl(var(--primary-foreground))" },
        },
        "reveal-out": {
          "0%": { width: "100%", color: "hsl(var(--primary-foreground))" },
          "100%": { width: "0%", color: "hsl(var(--primary-foreground))" },
        },
        "bg-to-primary": {
          "0%": { backgroundColor: "transparent" },
          "100%": { backgroundColor: "hsl(var(--primary))" },
        },

        "bg-to-transparent": {
          "0%": { backgroundColor: "hsl(var(--primary))" },
          "100%": { backgroundColor: "transparent" },
        },
        blob: {
          "0%, 100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "25%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "50%": {
            transform: "translate(-60px, 30px) scale(0.9)",
          },
          "75%": {
            transform: "translate(20px, -20px) scale(1.1)",
          },
        },
        "move-up-down": {
          "0%": {
            bottom: "-10%",
          },
          "35%, 50%": {
            bottom: "100%",
          },
          "85%, 100%": {
            bottom: "-10%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        "collapsible-down": "collapsible-down 0.2s ease-out ",
        "collapsible-up": "collapsible-up 0.2s ease-out ",

        "checkbox-in": "reveal-in .2s ease-out .2s forwards",
        "checkbox-out": "reveal-out .2s ease-out forwards",
        "checkbox-bg-in": "bg-to-primary .2s ease-out forwards",
        "checkbox-bg-out": "bg-to-transparent .2s ease-out .2s forwards",

        "load-bar": "load-bar 1s linear infinite",

        blob: "blob 15s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-debug-screens"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    require("tailwind-clip-path"),
  ],
};
