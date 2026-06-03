/**
 * 主题应用 Hook：监听 store 中的 theme 并同步到 <html> 的 class
 * 同时同步 PWA theme-color 元信息
 */
import { useEffect } from "react";
import { useUIStore } from "@/store/uiStore";

export function useApplyTheme() {
  const theme = useUIStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);
}
