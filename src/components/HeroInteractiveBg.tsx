/**
 * Hero 区动态互动背景
 *
 * 设计要点：
 * 1. 三颗大色球各自有 CSS 关键帧"自我漂浮"
 * 2. 同时各自接收一个 spring 驱动的"鼠标偏移"transform —— 不会完全粘上去，
 *    只会给它们一个小小的方向感，三颗球偏移强度不同制造层次
 * 3. 三颗球用 mix-blend-mode 叠加，重叠区会自动出现新色（"图层样式" 思路）
 *    - light 模式：multiply（像马克笔重叠那样）
 *    - dark 模式：screen（像灯光叠加那样）
 *    用 mix-blend-mode + dark: 切换
 *
 * 不再有单独的鼠标跟随光斑（用户反馈：太突兀）；
 * 鼠标对三颗球的"吸引"才是真正的互动反馈。
 */
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useHasHover } from "@/hooks/useMediaQuery";

export default function HeroInteractiveBg() {
  const hasHover = useHasHover();
  const wrapRef = useRef<HTMLDivElement>(null);

  // 鼠标在容器内的归一化坐标（-0.5 ~ 0.5），默认 0（中心）
  // 用归一化坐标方便给不同球乘以不同强度
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  // 用 spring 让位置变化有惯性（柔软不僵硬）
  const sx = useSpring(nx, { stiffness: 50, damping: 18, mass: 1 });
  const sy = useSpring(ny, { stiffness: 50, damping: 18, mass: 1 });

  // 三颗球各自的偏移强度（球 1 最迟钝、球 2 中等、球 3 最敏感）
  // 这样三颗球的"被吸引程度"不一致 → 产生层次感
  // 强度上限大约 60-100px 偏移，绝不会"完全跟随"
  const blob1X = useTransform(sx, [-0.5, 0.5], [-60, 60]);
  const blob1Y = useTransform(sy, [-0.5, 0.5], [-40, 40]);
  const blob2X = useTransform(sx, [-0.5, 0.5], [80, -80]); // 反向：和球 1 形成对位
  const blob2Y = useTransform(sy, [-0.5, 0.5], [60, -60]);
  const blob3X = useTransform(sx, [-0.5, 0.5], [100, -100]);
  const blob3Y = useTransform(sy, [-0.5, 0.5], [-80, 80]);

  // 鼠标监听器绑在 section 上（z-10 内容层不会抢走事件）
  useEffect(() => {
    if (!hasHover) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const section = wrap.parentElement;
    if (!section) return;

    const handleMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      // 归一化到 -0.5 ~ 0.5
      nx.set((e.clientX - rect.left) / rect.width - 0.5);
      ny.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleLeave = () => {
      // 鼠标离开时回到中心（球缓慢回归原位）
      nx.set(0);
      ny.set(0);
    };

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);
    return () => {
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
    };
  }, [hasHover, nx, ny]);

  return (
    <div
      ref={wrapRef}
      // 背景层不接收鼠标事件（事件由父 section 监听）
      // z-0：在父 section（isolate）的内容（z-10）下方
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* 三颗色球都用 mix-blend-mode 实现"图层样式"叠加效果
          - light 主题用 multiply（像马克笔颜色重叠 → 重叠处变深）
          - dark 主题用 screen（像灯光叠加 → 重叠处变亮）
          通过 Tailwind 的 mix-blend-multiply + dark:mix-blend-screen 切换 */}

      {/* 球 1：主色 accent —— 外层 motion.div 接 spring 偏移，内层 span 跑 CSS 关键帧
          opacity 从 0.8 降到 0.45：避免色块过重影响 Hero 文案（尤其 "Creative" 主色字）阅读 */}
      <motion.div
        className="absolute -left-[10vw] -top-[10vw] h-[55vw] w-[55vw] will-change-transform"
        style={{ x: blob1X, y: blob1Y }}
      >
        <span
          className="ogs-blob-1 block h-full w-full rounded-full opacity-45 blur-3xl mix-blend-multiply dark:mix-blend-screen"
          style={{ backgroundColor: "rgb(var(--accent))" }}
        />
      </motion.div>

      {/* 球 2：辅色 accent-2，右下 */}
      <motion.div
        className="absolute -right-[15vw] -bottom-[15vw] h-[60vw] w-[60vw] will-change-transform"
        style={{ x: blob2X, y: blob2Y }}
      >
        <span
          className="ogs-blob-2 block h-full w-full rounded-full opacity-45 blur-3xl mix-blend-multiply dark:mix-blend-screen"
          style={{ backgroundColor: "rgb(var(--accent-2))" }}
        />
      </motion.div>

      {/* 球 3：主色变体（半透明 accent），中心区域
          这颗球离正文最近，opacity 再低一点 0.3 */}
      <motion.div
        className="absolute left-[35vw] top-[20vw] h-[40vw] w-[40vw] will-change-transform"
        style={{ x: blob3X, y: blob3Y }}
      >
        <span
          className="ogs-blob-3-static block h-full w-full rounded-full opacity-30 blur-3xl mix-blend-multiply dark:mix-blend-screen"
          style={{ backgroundColor: "rgb(var(--accent) / 0.5)" }}
        />
      </motion.div>
    </div>
  );
}
