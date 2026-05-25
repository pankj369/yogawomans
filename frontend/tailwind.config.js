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

        // --- Premium Wellness Design System (OFFICIAL PALETTE) ---
        wellness: {
          bg:         "#F7F3EC", // BACKGROUND IVORY
          sand:       "#EDE4D6", // SOFT SAND
          green:      "#1E7A46", // PRIMARY ACCENT
          dark:       "#0F2E1D", // PRIMARY DARK
          glow:       "#00E676", // PREMIUM GLOW
          orange:     "#E9781F", // SPIRITUAL ORANGE
          black:      "#0A0A0A", // LUXURY BLACK
          text:       "#1E1E1E", // TEXT PRIMARY
          muted:      "#7A7A7A", // TEXT SECONDARY
          glass:      "rgba(255,255,255,0.08)", // GLASS SURFACE

          // Legacy maps to prevent layout breaks
          cream:      "#F7F3EC",
          softcream:  "#EDE4D6",
          sage:       "#1E7A46",
          gold:       "#E9781F",
          greenDark:  "#0F2E1D",
          greenLight: "rgba(0, 230, 118, 0.15)", // Subtle neon glow for backgrounds
          orangeDeep: "#c55716",
          cream2:     "#F7F3EC",
          warm:       "#EDE4D6",
          border:     "rgba(255,255,255,0.1)", // Elegant glass border
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
        glass:    "0 30px 80px rgba(0, 0, 0, 0.04)", // Soft immersive shadow
        card:     "0 20px 40px rgba(0, 0, 0, 0.03)", // Very diffuse card shadow
        glow2:    "0 16px 35px rgba(0, 230, 118, 0.15)", // Premium Emerald Glow
        sidebar:  "4px 0 40px rgba(0, 0, 0, 0.02)",
        navitem:  "0 14px 30px rgba(0, 230, 118, 0.08)",
        liftSm:   "0 12px 30px rgba(0, 0, 0, 0.025)",
        heroCard: "0 30px 90px rgba(0, 0, 0, 0.05)",
      },

      backgroundImage: {
        // legacy
        "hero-gradient":
          "linear-gradient(120deg, rgba(26,107,175,0.3), rgba(232,101,26,0.2), rgba(46,125,50,0.2))",
        // wellness system
        "wellness-bg":
          "radial-gradient(circle at top left, rgba(233,120,31,0.04) 0%, transparent 32%), " + // Spiritual Orange
          "radial-gradient(circle at top right, rgba(0,230,118,0.04) 0%, transparent 28%), " + // Premium Glow
          "linear-gradient(180deg, #F7F3EC 0%, #EDE4D6 52%, #F7F3EC 100%)", // Ivory to Sand
        "sidebar-bg":
          "linear-gradient(180deg, rgba(247, 243, 236, 0.85) 0%, rgba(237, 228, 214, 0.85) 100%)",
        "hero-overlay":
          "linear-gradient(110deg, rgba(247,243,236,0.85) 0%, rgba(237,228,214,0.75) 34%, rgba(255,255,255,0.3) 100%)",
        "btn-primary":
          "linear-gradient(135deg, #1E7A46 0%, #00E676 100%)", // Forest Green to Emerald Glow
        "btn-healing":
          "linear-gradient(135deg, #0F2E1D 0%, #1E7A46 100%)", // Primary Dark to Accent
        "card-gradient":
          "linear-gradient(160deg, rgba(255,255,255,0.92), rgba(247,243,236,0.82))",
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
        spring: "cubic-bezier(0.2, 0.8, 0.2, 1)", // Cinematic, weightless spring
      },
    },
  },

  plugins: [],
};