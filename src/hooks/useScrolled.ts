/**
 * 滚动监听 Hook
 * 返回当前是否已滚动超过给定阈值（用于改变 header 样式等）
 */
import { useEffect, useState } from "react";

export function useScrolled(threshold: number = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
