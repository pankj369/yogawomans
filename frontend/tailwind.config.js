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
          bg:         "#050816", // PRIMARY BACKGROUND
          surface:    "#0B1220", // SECONDARY SURFACE
          sand:       "#EDE4D6", // SOFT SAND (legacy)
          green:      "#00E676", // PRIMARY ACCENT
          dark:       "#050816", // PRIMARY DARK
          glow:       "#00E676", // PREMIUM GLOW
          gold:       "#D4A64F", // SECONDARY ACCENT (spiritual/premium)
          orange:     "#FF8A3D", // ALERT / ENERGY ACCENT
          black:      "#0A0A0A", // LUXURY BLACK
          text:       "#F8FAFC", // PRIMARY TEXT
          textSec:    "#94A3B8", // SECONDARY TEXT
          muted:      "#64748B", // MUTED TEXT
          glass:      "rgba(10,15,25,0.72)", // GLASS SURFACE

          // Legacy maps to prevent layout breaks
          cream:      "#050816",
          softcream:  "#0B1220",
          sage:       "#1E7A46",
          greenDark:  "#050816",
          greenLight: "rgba(0, 230, 118, 0.08)", // Subtle neon glow for backgrounds
          orangeDeep: "#FF8A3D",
          cream2:     "#0B1220",
          warm:       "#0B1220",
          border:     "rgba(255,255,255,0.06)", // Elegant glass border
        },

        // --- Premium Light Cream Luxury Design System ---
        luxury: {
          bg:         "#F7F3EC", // PRIMARY BACKGROUND
          surface:    "#EFE6D7", // SECONDARY SURFACE
          card:       "rgba(255,255,255,0.72)", // CARD BACKGROUND
          text:       "#1A1A1A", // PRIMARY TEXT
          muted:      "#6B7280", // MUTED TEXT
          emerald:    "#00A86B", // ACCENT EMERALD
          gold:       "#C89B3C", // SOFT GOLD
          sand:       "#DCC9A3", // SAND HIGHLIGHT
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
        glass:    "0 10px 40px rgba(0, 0, 0, 0.35), 0 0 20px rgba(0, 230, 118, 0.04)", // Premium glass shadow
        card:     "0 10px 40px rgba(0, 0, 0, 0.35), 0 0 20px rgba(0, 230, 118, 0.04)", // Diffuse card shadow
        cardHover:"0 10px 30px rgba(0, 230, 118, 0.12)",
        glow2:    "0 16px 35px rgba(0, 230, 118, 0.15)", // Premium Emerald Glow
        sidebar:  "4px 0 40px rgba(0, 0, 0, 0.2)",
        navitem:  "0 14px 30px rgba(0, 230, 118, 0.08)",
        liftSm:   "0 12px 30px rgba(0, 0, 0, 0.15)",
        heroCard: "0 30px 90px rgba(0, 0, 0, 0.4)",
      },

      backgroundImage: {
        // legacy
        "hero-gradient":
          "linear-gradient(120deg, rgba(26,107,175,0.3), rgba(232,101,26,0.2), rgba(46,125,50,0.2))",
        // wellness system
        "wellness-bg":
          "radial-gradient(circle at top left, rgba(0,230,118,0.06) 0%, transparent 40%), " + // Premium Glow
          "radial-gradient(circle at bottom right, rgba(212,166,79,0.04) 0%, transparent 40%), " + // Spiritual Gold
          "linear-gradient(180deg, #050816 0%, #0B1220 100%)", // Deep Dark Surface
        "sidebar-bg":
          "linear-gradient(180deg, #07140F 0%, #081B14 50%, #050816 100%)",
        "hero-overlay":
          "linear-gradient(180deg, rgba(5,8,22,0.85) 0%, rgba(11,18,32,0.6) 100%)",
        "btn-primary":
          "linear-gradient(135deg, #1E7A46 0%, #00E676 100%)", // Forest Green to Emerald Glow
        "btn-healing":
          "linear-gradient(135deg, #0B1220 0%, #00E676 100%)", // Primary Dark to Accent
        "card-gradient":
          "linear-gradient(160deg, rgba(10,15,25,0.72), rgba(11,18,32,0.6))",
        "sidebar-item-active":
          "linear-gradient(90deg, rgba(0,230,118,0.18) 0%, rgba(0,230,118,0.04) 100%)",
        "breath-gradient":
          "radial-gradient(circle at center, rgba(0,230,118,0.18), rgba(0,0,0,0))",
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