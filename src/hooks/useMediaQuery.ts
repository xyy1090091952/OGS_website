/**
 * 媒体查询 Hook
 * 用于响应式判断（自定义鼠标、视差等只在桌面端启用）
 */
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    // 兼容 Safari 旧版
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, [query]);

  return matches;
}

// 是否为支持精确指针（鼠标）的设备
export const useHasHover = () => useMediaQuery("(hover: hover) and (pointer: fine)");
// 是否为桌面尺寸
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
