/**
 * 鼠标跟随高光卡片（Spotlight Card）
 * - 鼠标在卡片内移动时，出现一个跟随鼠标位置的彩色径向光晕
 * - 鼠标离开时自动淡出
 * - 灵感来源：Vercel / Linear / Cal.com 等现代产品官网
 *
 * 使用方式：
 *   <SpotlightCard className="...">
 *     {内容}
 *   </SpotlightCard>
 *
 * 实现要点：
 * - 用 useMotionValue 直接更新 CSS 变量 --mx / --my，避免 React re-render
 * - 通过 ::before 伪元素读取这两个变量，做 radial-gradient 高光
 * - 整个交互不会触发任何重渲染，性能开销极小
 */
import {
  type CSSProperties,
  type ReactNode,
  type MouseEvent,
  useRef,
} from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  // 高光半径（像素），默认 320
  radius?: number;
  // 高光颜色（可使用 CSS 变量），默认 accent
  spotlightColor?: string;
  // 透明背景层颜色（不传则透明）
  background?: string;
  // 自定义内联样式（如背景色等）
  style?: CSSProperties;
  // 透传 onMouseEnter / onMouseLeave，让父组件能联动其它行为（比如改鼠标光标）
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function SpotlightCard({
  children,
  className = "",
  radius = 320,
  spotlightColor = "rgb(var(--accent) / 0.35)",
  background,
  style,
  onMouseEnter,
  onMouseLeave,
}: SpotlightCardProps) {
  // 鼠标在卡片内的相对坐标（运行时计算，不触发 React 渲染）
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const ref = useRef<HTMLDivElement>(null);

  // 鼠标移动：更新坐标
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // 鼠标离开：把高光位置移到看不见的远处
  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
    onMouseLeave?.();
  };

  // 用 motion template 把 mouseX/Y 拼成 radial-gradient
  // 鼠标在哪里，亮色就在哪里
  const background_image = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 70%)`;

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden ${className}`}
      style={{ ...style, ...(background ? { background } : {}) }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      {/* 高光层：跟随鼠标的径向渐变（pointer-events-none 不阻止下层交互） */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundImage: background_image }}
        aria-hidden
      />
      {/* 实际内容层 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
