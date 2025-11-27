/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  
  theme: {
    extend: {

      /* =========================================================
         COLORS  → matches theme.css variables
         ========================================================= */

      colors: {
        /* Primary */
        "primary-10": "var(--colors-primary-10)",
        "primary-20": "var(--colors-primary-20)",
        "primary-40": "var(--colors-primary-40)",
        "primary-60": "var(--colors-primary-60)",
        "primary-80": "var(--colors-primary-80)",
        "primary-90": "var(--colors-primary-90)",
        "primary-100": "var(--colors-primary-100)",

        /* Secondary */
        "secondary-10": "var(--colors-secondary-10)",
        "secondary-20": "var(--colors-secondary-20)",
        "secondary-40": "var(--colors-secondary-40)",
        "secondary-60": "var(--colors-secondary-60)",
        "secondary-80": "var(--colors-secondary-80)",
        "secondary-90": "var(--colors-secondary-90)",
        "secondary-100": "var(--colors-secondary-100)",

        /* Grayscale / Charade */
        "charade-10": "var(--colors-charade-10)",
        "charade-20": "var(--colors-charade-20)",
        "charade-40": "var(--colors-charade-40)",
        "charade-60": "var(--colors-charade-60)",
        "charade-80": "var(--colors-charade-80)",
        "charade-90": "var(--colors-charade-90)",
        "charade-100": "var(--colors-charade-100)",

        /* Alerts */
        success: "var(--colors-alerts-success)",
        error: "var(--colors-alerts-error)",
        warning: "var(--colors-alerts-warning)",

        /* Others */
        black: "var(--colors-others-black)",
        white: "var(--colors-others-white)",

        /* Semantic colors (styles.css mapping) */
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        text: "var(--text)",
        muted: "var(--muted)",
        border: "var(--border)",
        primary: "var(--primary)",
        "primary-600": "var(--primary-600)",
        accent: "var(--accent)",
        successAlias: "var(--success)",
        warningAlias: "var(--warning)",
        errorAlias: "var(--error)",
      },

      /* =========================================================
         TYPOGRAPHY (Font Family)
         ========================================================= */

      fontFamily: {
        /* H1 */
        "h1-regular": "var(--typography-h1-regular-font-family)",
        "h1-medium": "var(--typography-h1-medium-font-family)",
        "h1-semibold": "var(--typography-h1-semibold-font-family)",
        "h1-bold": "var(--typography-h1-bold-font-family)",

        /* H2 */
        "h2-regular": "var(--typography-h2-regular-font-family)",
        "h2-medium": "var(--typography-h2-medium-font-family)",
        "h2-semibold": "var(--typography-h2-semibold-font-family)",
        "h2-bold": "var(--typography-h2-bold-font-family)",

        /* H3 */
        "h3-regular": "var(--typography-h3-regular-font-family)",
        "h3-medium": "var(--typography-h3-medium-font-family)",
        "h3-semibold": "var(--typography-h3-semibold-font-family)",
        "h3-bold": "var(--typography-h3-bold-font-family)",

        /* H4 */
        "h4-regular": "var(--typography-h4-regular-font-family)",
        "h4-medium": "var(--typography-h4-medium-font-family)",
        "h4-semibold": "var(--typography-h4-semibold-font-family)",
        "h4-bold": "var(--typography-h4-bold-font-family)",

        /* H5 */
        "h5-regular": "var(--typography-h5-regular-font-family)",
        "h5-medium": "var(--typography-h5-medium-font-family)",
        "h5-semibold": "var(--typography-h5-semibold-font-family)",
        "h5-bold": "var(--typography-h5-bold-font-family)",

        /* H6 */
        "h6-regular": "var(--typography-h6-regular-font-family)",
        "h6-medium": "var(--typography-h6-medium-font-family)",
        "h6-semibold": "var(--typography-h6-semibold-font-family)",
        "h6-bold": "var(--typography-h6-bold-font-family)",

        /* Label */
        "label-regular": "var(--typography-label-regular-font-family)",
        "label-medium": "var(--typography-label-medium-font-family)",
        "label-semibold": "var(--typography-label-semibold-font-family)",
      },

      /* =========================================================
         TYPOGRAPHY (Font Size)
         ========================================================= */

      fontSize: {
        /* H1 */
        "h1-regular": "var(--typography-h1-regular-font-size)",
        "h1-medium": "var(--typography-h1-medium-font-size)",
        "h1-semibold": "var(--typography-h1-semibold-font-size)",
        "h1-bold": "var(--typography-h1-bold-font-size)",

        /* H2 */
        "h2-regular": "var(--typography-h2-regular-font-size)",
        "h2-medium": "var(--typography-h2-medium-font-size)",
        "h2-semibold": "var(--typography-h2-semibold-font-size)",
        "h2-bold": "var(--typography-h2-bold-font-size)",

        /* H3 */
        "h3-regular": "var(--typography-h3-regular-font-size)",
        "h3-medium": "var(--typography-h3-medium-font-size)",
        "h3-semibold": "var(--typography-h3-semibold-font-size)",
        "h3-bold": "var(--typography-h3-bold-font-size)",

        /* H4 */
        "h4-regular": "var(--typography-h4-regular-font-size)",
        "h4-medium": "var(--typography-h4-medium-font-size)",
        "h4-semibold": "var(--typography-h4-semibold-font-size)",
        "h4-bold": "var(--typography-h4-bold-font-size)",

        /* H5 */
        "h5-regular": "var(--typography-h5-regular-font-size)",
        "h5-medium": "var(--typography-h5-medium-font-size)",
        "h5-semibold": "var(--typography-h5-semibold-font-size)",
        "h5-bold": "var(--typography-h5-bold-font-size)",

        /* H6 */
        "h6-regular": "var(--typography-h6-regular-font-size)",
        "h6-medium": "var(--typography-h6-medium-font-size)",
        "h6-semibold": "var(--typography-h6-semibold-font-size)",
        "h6-bold": "var(--typography-h6-bold-font-size)",

        /* Label */
        "label-regular": "var(--typography-label-regular-font-size)",
        "label-medium": "var(--typography-label-medium-font-size)",
        "label-semibold": "var(--typography-label-semibold-font-size)",
      },

      /* =========================================================
         TYPOGRAPHY (Font Weight)
         ========================================================= */

      fontWeight: {
        "h1-regular": "var(--typography-h1-regular-font-weight)",
        "h1-medium": "var(--typography-h1-medium-font-weight)",
        "h1-semibold": "var(--typography-h1-semibold-font-weight)",
        "h1-bold": "var(--typography-h1-bold-font-weight)",

        "h2-regular": "var(--typography-h2-regular-font-weight)",
        "h2-medium": "var(--typography-h2-medium-font-weight)",
        "h2-semibold": "var(--typography-h2-semibold-font-weight)",
        "h2-bold": "var(--typography-h2-bold-font-weight)",

        "h3-regular": "var(--typography-h3-regular-font-weight)",
        "h3-medium": "var(--typography-h3-medium-font-weight)",
        "h3-semibold": "var(--typography-h3-semibold-font-weight)",
        "h3-bold": "var(--typography-h3-bold-font-weight)",

        "h4-regular": "var(--typography-h4-regular-font-weight)",
        "h4-medium": "var(--typography-h4-medium-font-weight)",
        "h4-semibold": "var(--typography-h4-semibold-font-weight)",
        "h4-bold": "var(--typography-h4-bold-font-weight)",

        "h5-regular": "var(--typography-h5-regular-font-weight)",
        "h5-medium": "var(--typography-h5-medium-font-weight)",
        "h5-semibold": "var(--typography-h5-semibold-font-weight)",
        "h5-bold": "var(--typography-h5-bold-font-weight)",

        "h6-regular": "var(--typography-h6-regular-font-weight)",
        "h6-medium": "var(--typography-h6-medium-font-weight)",
        "h6-semibold": "var(--typography-h6-semibold-font-weight)",
        "h6-bold": "var(--typography-h6-bold-font-weight)",

        "label-regular": "var(--typography-label-regular-font-weight)",
        "label-medium": "var(--typography-label-medium-font-weight)",
        "label-semibold": "var(--typography-label-semibold-font-weight)",
      },

      /* =========================================================
         TYPOGRAPHY (Line Height)
         ========================================================= */

      lineHeight: {
        "h1-regular": "var(--typography-h1-regular-line-height)",
        "h1-medium": "var(--typography-h1-medium-line-height)",
        "h1-semibold": "var(--typography-h1-semibold-line-height)",
        "h1-bold": "var(--typography-h1-bold-line-height)",

        "h2-regular": "var(--typography-h2-regular-line-height)",
        "h2-medium": "var(--typography-h2-medium-line-height)",
        "h2-semibold": "var(--typography-h2-semibold-line-height)",
        "h2-bold": "var(--typography-h2-bold-line-height)",

        "h3-regular": "var(--typography-h3-regular-line-height)",
        "h3-medium": "var(--typography-h3-medium-line-height)",
        "h3-semibold": "var(--typography-h3-semibold-line-height)",
        "h3-bold": "var(--typography-h3-bold-line-height)",

        "h4-regular": "var(--typography-h4-regular-line-height)",
        "h4-medium": "var(--typography-h4-medium-line-height)",
        "h4-semibold": "var(--typography-h4-semibold-line-height)",
        "h4-bold": "var(--typography-h4-bold-line-height)",

        "h5-regular": "var(--typography-h5-regular-line-height)",
        "h5-medium": "var(--typography-h5-medium-line-height)",
        "h5-semibold": "var(--typography-h5-semibold-line-height)",
        "h5-bold": "var(--typography-h5-bold-line-height)",

        "h6-regular": "var(--typography-h6-regular-line-height)",
        "h6-medium": "var(--typography-h6-medium-line-height)",
        "h6-semibold": "var(--typography-h6-semibold-line-height)",
        "h6-bold": "var(--typography-h6-bold-line-height)",

        "label-regular": "var(--typography-label-regular-line-height)",
        "label-medium": "var(--typography-label-medium-line-height)",
        "label-semibold": "var(--typography-label-semibold-line-height)",
      },
    },
  },

  plugins: [],
};
