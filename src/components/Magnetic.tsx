/**
 * 磁吸按钮：鼠标靠近时按钮被吸引（在桌面端启用）
 * 用于联系按钮、社交链接等强交互入口
 */
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useHasHover } from "@/hooks/useMediaQuery";

interface MagneticProps {
  children: ReactNode;
  strength?: number; // 0-1，磁吸强度
  className?: string;
}

export default function Magnetic({
  children,
  strength = 0.4,
  className,
}: MagneticProps) {
  const hasHover = useHasHover();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // spring 让吸附与回弹更顺滑
  const sx = useSpring(x, { damping: 18, stiffness: 220, mass: 0.4 });
  const sy = useSpring(y, { damping: 18, stiffness: 220, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (!hasHover || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={hasHover ? { x: sx, y: sy } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
