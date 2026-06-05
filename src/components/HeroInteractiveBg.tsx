/**
 * Hero 区动态互动背景
 *  - 三颗大色球用纯 CSS keyframes 自动漂浮（最稳定，不依赖 framer 状态）
 *  - 鼠标移动时有一个跟随的"主色光斑"
 *  - 三颗球都用主题色（accent / accent-2），避免用 fg 中性色变灰脏
 *
 * 鼠标交互监听器挂在外层 div 上，用 pointer-events: none 让里面的色球
 * 不阻挡内容点击，但容器本身仍能接收 mousemove（因为父级 section 触发后冒泡）。
 *
 * 关键：mousemove 监听器要绑在 section 上（通过 prop 注入），
 * 因为 z-10 的内容层会"接走"鼠标事件。
 */
import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { useHasHover } from "@/hooks/useMediaQuery";

export default function HeroInteractiveBg() {
  const hasHover = useHasHover();
  const wrapRef = useRef<HTMLDivElement>(null);

  // 鼠标在容器内的相对坐标（默认放屏外）
  const rawX = useMotionValue(-1000);
  const rawY = useMotionValue(-1000);
  // spring 让光斑跟随有惯性
  const mx = useSpring(rawX, { stiffness: 80, damping: 20, mass: 0.8 });
  const my = useSpring(rawY, { stiffness: 80, damping: 20, mass: 0.8 });

  // 拼接 radial-gradient：跟随鼠标 + 主题强调色
  const spotlight = useMotionTemplate`radial-gradient(450px circle at ${mx}px ${my}px, rgb(var(--accent) / 0.32), transparent 60%)`;

  // 在 section（父元素的 parentElement）上监听鼠标，确保不被 z-10 内容层抢走事件
  useEffect(() => {
    if (!hasHover) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    // 直接找到 section（再上一层）
    const section = wrap.parentElement;
    if (!section) return;

    const handleMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      rawX.set(e.clientX - rect.left);
      rawY.set(e.clientY - rect.top);
    };
    const handleLeave = () => {
      rawX.set(-1000);
      rawY.set(-1000);
    };

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);
    return () => {
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
    };
    // 仅 mount 时绑定一次，hasHover 变化时重新绑
  }, [hasHover, rawX, rawY]);

  return (
    <div
      ref={wrapRef}
      // pointer-events-none：色球本身不抢走任何鼠标事件
      // z-0：在父 section（isolate）的内容（z-10）下方
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* 球 1：主色 accent，左上 —— 用 CSS 关键帧 ogs-blob-1 漂浮 */}
      <span
        className="ogs-blob-1 absolute -left-[10vw] -top-[10vw] block h-[55vw] w-[55vw] rounded-full opacity-80 blur-3xl will-change-transform"
        style={{ backgroundColor: "rgb(var(--accent))" }}
      />
      {/* 球 2：辅色 accent-2，右下 */}
      <span
        className="ogs-blob-2 absolute -right-[15vw] -bottom-[15vw] block h-[60vw] w-[60vw] rounded-full opacity-75 blur-3xl will-change-transform"
        style={{ backgroundColor: "rgb(var(--accent-2))" }}
      />
      {/* 球 3：主色变体（accent 0.6 透明），中心区域 —— 不再用 fg 中性色（避免灰脏） */}
      <span
        className="ogs-blob-3 absolute left-1/2 top-1/2 block h-[40vw] w-[40vw] rounded-full opacity-60 blur-3xl will-change-transform"
        style={{ backgroundColor: "rgb(var(--accent) / 0.7)" }}
      />

      {/* 鼠标跟随光斑（仅 hover 设备）：浮在三颗色球上方 */}
      {hasHover && (
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage: spotlight }}
        />
      )}
    </div>
  );
}
