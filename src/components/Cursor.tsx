/**
 * 自定义鼠标光标
 * - 桌面端用环形 + 文字替换原生光标
 * - 手机/平板自动隐藏
 * - hover 链接时放大；hover 作品卡时显示文字
 */
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { useHasHover } from "@/hooks/useMediaQuery";

export default function Cursor() {
  const hasHover = useHasHover();
  const variant = useUIStore((s) => s.cursorVariant);
  const label = useUIStore((s) => s.cursorLabel);
  const [visible, setVisible] = useState(false);

  // 鼠标位置：使用 motion value + spring，让光标平滑跟随
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 350, mass: 0.4 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 350, mass: 0.4 });

  useEffect(() => {
    if (!hasHover) return;

    // 给 <html> 加 class 用于隐藏原生光标
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [hasHover, mouseX, mouseY, visible]);

  if (!hasHover) return null;

  // 根据 variant 计算光标尺寸与样式
  const sizeMap = {
    default: 14,
    "hover-link": 48,
    "hover-card": 96,
  } as const;
  const size = sizeMap[variant];

  return (
    <>
      {/* 主光标圆 */}
      <motion.div
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY, top: 0, left: 0 }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full bg-white text-[10px] font-medium uppercase tracking-widest text-black"
          animate={{
            width: size,
            height: size,
            opacity: visible ? 1 : 0,
            x: -size / 2,
            y: -size / 2,
          }}
          transition={{ type: "spring", damping: 24, stiffness: 280 }}
        >
          {variant === "hover-card" && label}
        </motion.div>
      </motion.div>
    </>
  );
}
