/**
 * 主题应用 Hook：
 * 1. 监听 store 中的 theme，同步到 <html> 的 class（light / dark）
 * 2. 监听 accent + theme，把整套调色板（accent / accent2 / bg / fg / card）写入 :root
 *    —— 整站颜色都通过 rgb(var(--xxx)) 引用，这里只改一处即可全局生效
 *    —— 加入 --accent2 让渐变背景能呈现"双色柔光"，参考 base44 的高级感
 */
import { useEffect } from "react";
import { useUIStore } from "@/store/uiStore";
import { getPalette } from "@/lib/themes";

export function useApplyTheme() {
  const theme = useUIStore((s) => s.theme);
  const accent = useUIStore((s) => s.accent);

  // 同步 light / dark class
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  // 同步整套调色板到 CSS 变量
  useEffect(() => {
    const root = document.documentElement;
    const p = getPalette(accent, theme);
    // 一次写入多个变量，整站强调色 + 底色一起更新
    root.style.setProperty("--accent", p.accent);
    root.style.setProperty("--accent-2", p.accent2);
    root.style.setProperty("--bg", p.bg);
    root.style.setProperty("--fg", p.fg);
    root.style.setProperty("--card", p.card);
  }, [accent, theme]);
}
