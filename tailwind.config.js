/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
        sans: ["var(--font-manrope)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-newsreader)", "ui-serif", "Georgia", "serif"],
        // Admin (CMS) faces — cms-* frames
        admin: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        geist: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        "geist-mono": ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        // CodeTherapy v2 palette (Figma: v2-* frames)
        cream: "#faf8f2",
        line: "#eae6db",
        ink: {
          DEFAULT: "#1e2229",
          deep: "#11141a",
          soft: "#454d49",
        },
        sage: {
          DEFAULT: "#4d6d53",
          soft: "#eaf0eb",
        },
        clay: {
          DEFAULT: "#c4644f",
          soft: "#f7ede9",
        },
        // Admin (CMS) palette — cms-* frames. Neutrals are Tailwind grays.
        "admin-sage": "#4a7c59",
        "admin-clay": "#c2703e",
        "admin-danger": "#dc2626",
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
        custome: {
          DEFAULT: "#00AEEF",
          // foreground: "hsl(var(--custome-foreground))",
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
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
