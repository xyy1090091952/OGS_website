/** @type {import('tailwindcss').Config} */

export default {
  // 通过 class 切换深浅色主题
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "6rem",
      },
    },
    extend: {
      // 通过 CSS 变量驱动主题色，方便深浅色切换
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
      },
      fontFamily: {
        // Display：标题（带衬线）
        display: ['"Fraunces"', '"Noto Serif SC"', "serif"],
        // 正文
        sans: ['"Inter Tight"', '"Noto Sans SC"', "system-ui", "sans-serif"],
        // 等宽（用于编号、tag）
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      transitionTimingFunction: {
        // Out-Expo，干净有力的缓动
        expo: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        // Hero 文字逐字浮入
        floatUp: {
          "0%": { opacity: "0", transform: "translateY(40%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // 滚动指引微跳
        bounceY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        // 按钮边框流光
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        floatUp: "floatUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        bounceY: "bounceY 1.6s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};
