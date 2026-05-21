/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // --- Legacy (kept for landing page / shop compatibility) ---
        primaryOrange: "#E8651A",
        primarywhite: "#fffaf0",
        primaryGreen: "#2E7D32",
        lightSage: "#F0F7E6",
        lightSky: "#E8F4FD",
        darkText: "#2C2C2C",
        grayText: "#555555",

        // --- Premium Wellness Design System ---
        wellness: {
          cream:      "#F7F3EE",
          softcream:  "#EFE7DC",
          green:      "#2F6B3B",
          sage:       "#8FA68E",
          gold:       "#A37E58", // Richer bronze-gold for improved contrast/readability
          orange:     "#E27229", // Calming terracotta sunset
          dark:       "#1D1D1D",
          muted:      "#6E6A66",
          // Derived shades
          greenDark:  "#2D6338",
          greenLight: "#eff7ea",
          orangeDeep: "#c55716",
          cream2:     "#fdf8f1",
          warm:       "#f7ead7",
          border:     "rgba(210,190,165,0.35)", // Softened border color
        },
      },

      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body:    ["Lato",    "sans-serif"],
        inter:   ["Inter",   "sans-serif"],
      },

      boxShadow: {
        // legacy
        glow: "0 10px 40px rgba(26, 107, 175, 0.16)",
        soft: "0 8px 28px rgba(44, 44, 44, 0.1)",
        // wellness design system
        glass:    "0 20px 80px rgba(72, 42, 8, 0.05)", // Softer shadow for lighter glass feel
        card:     "0 14px 35px rgba(72, 42, 8, 0.04)", // Softer shadow
        glow2:    "0 16px 35px rgba(226, 114, 41, 0.12)", // Calmed glow
        sidebar:  "4px 0 40px rgba(72, 42, 8, 0.03)",
        navitem:  "0 14px 30px rgba(226, 114, 41, 0.06)",
        liftSm:   "0 10px 25px rgba(72, 42, 8, 0.04)",
        heroCard: "0 20px 60px rgba(72, 42, 8, 0.06)",
      },

      backgroundImage: {
        // legacy
        "hero-gradient":
          "linear-gradient(120deg, rgba(26,107,175,0.3), rgba(232,101,26,0.2), rgba(46,125,50,0.2))",
        // wellness system
        "wellness-bg":
          "radial-gradient(circle at top left, rgba(226,114,41,0.06) 0%, transparent 32%), " +
          "radial-gradient(circle at top right, rgba(47,107,59,0.06) 0%, transparent 28%), " +
          "linear-gradient(180deg, #F7F3EE 0%, #f8f1e8 52%, #eef6ea 100%)",
        "sidebar-bg":
          "linear-gradient(180deg, rgba(252, 250, 247, 0.85) 0%, rgba(247, 243, 238, 0.85) 100%)",
        "hero-overlay":
          "linear-gradient(110deg, rgba(245,220,192,0.85) 0%, rgba(247,232,213,0.75) 34%, rgba(255,255,255,0.3) 100%)",
        "btn-primary":
          "linear-gradient(135deg, #E27229 0%, #EC9558 100%)",
        "btn-healing":
          "linear-gradient(135deg, #2D6338 0%, #3D854B 100%)",
        "card-gradient":
          "linear-gradient(160deg, rgba(255,255,255,0.92), rgba(247,232,213,0.82))",
        "sidebar-item-active":
          "linear-gradient(135deg, rgba(255,255,255,1), rgba(255,255,255,0.95))",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)"  },
          "50%":      { transform: "translateY(-8px)" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0"  },
          "100%": { backgroundPosition:  "200% 0"  },
        },
        pulseRing: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)"    },
          "50%":      { opacity: "1",   transform: "scale(1.06)" },
        },
        slideInLeft: {
          "0%":   { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)"      },
        },
      },

      animation: {
        float:        "float 5s ease-in-out infinite",
        "fade-up":    "fadeUp 0.5s ease both",
        shimmer:      "shimmer 2.2s linear infinite",
        "pulse-ring": "pulseRing 2.4s ease-in-out infinite",
        "slide-left": "slideInLeft 0.4s ease both",
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },

  plugins: [],
};