/**
 * 平滑滚动 Hook：基于 Lenis
 * 仅在桌面 / 平板启用；移动端原生滚动更顺手
 */
import { useEffect } from "react";
import Lenis from "lenis";

export function useLenis(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;
    // 在小屏 / 触屏设备直接使用原生滚动，避免 iOS 兼容问题
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [enabled]);
}
