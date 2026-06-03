/**
 * 首屏 Loading 加载页：品牌字符跳动 + 进度
 * 1.4s 左右自动消失
 */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/constants";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // 模拟加载进度
    const start = performance.now();
    const total = 1400; // 1.4 秒
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 200);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE.expo }}
        >
          {/* 大号品牌字 */}
          <motion.span
            className="font-display text-5xl italic tracking-tight md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.expo }}
          >
            Old<span className="text-accent">_</span>glasses
          </motion.span>

          {/* 进度数字 + 进度条 */}
          <div className="mt-10 flex w-[220px] flex-col items-center gap-3 md:w-[300px]">
            <div className="flex w-full items-center justify-between font-mono text-xs uppercase tracking-widest text-fg/60">
              <span>Loading</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div className="h-px w-full overflow-hidden bg-fg/10">
              <motion.div
                className="h-full origin-left bg-fg"
                style={{ scaleX: progress }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
