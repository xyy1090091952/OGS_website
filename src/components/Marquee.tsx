/**
 * Marquee 横向滚动条：滚动展示关键词
 * 在 Hero 与作品集之间作为视觉过渡
 *
 * 鼠标交互：
 *  1. 悬停整条 Marquee 时，滚动通过 CSS animation-play-state 暂停（可靠）
 *  2. 单个关键词 hover 时变成主色高亮 + 轻微放大，其他变暗（聚焦感）
 *  3. 鼠标移动到关键词上时，触发自定义光标（"READ" 文案）
 *  4. 跟随鼠标的柔和光斑在背景里轻微跟随移动
 */
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Asterisk } from "lucide-react";
import { useState, useRef } from "react";
import { useUIStore } from "@/store/uiStore";
import { useHasHover } from "@/hooks/useMediaQuery";

// 关键词列表：常量化，便于后续 i18n / 复用
const ITEMS = [
  "Experience Design",
  "UI / UX",
  "Brand Identity",
  "Motion Graphics",
  "Video Production",
  "Illustration",
  "Editorial",
  "Creative Coding",
];

export default function Marquee() {
  // 通过重复 + 无限平移实现循环（CSS keyframes 用 -50%）
  const list = [...ITEMS, ...ITEMS];

  // 当前 hover 中的关键词索引（用于实现「聚焦哪一个就高亮哪一个，其余变暗」）
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // 自定义鼠标：进入关键词时切换文案
  const setCursor = useUIStore((s) => s.setCursor);
  const hasHover = useHasHover();

  // ------- 鼠标跟随光斑（仅 hover 设备启用）-------
  const wrapRef = useRef<HTMLDivElement>(null);
  // 鼠标在容器内的相对坐标（默认 -1000 远离屏幕，避免初始就显示光斑）
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  // 用 useMotionTemplate 拼接背景：rgb(var(--accent)) 是当前主题强调色
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, rgb(var(--accent) / 0.18), transparent 70%)`;

  // 鼠标在容器内移动时更新坐标（不触发 React re-render，性能更好）
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={wrapRef}
      className="ogs-marquee relative overflow-hidden border-y border-fg/10 py-6 md:py-8"
      onMouseLeave={() => setHoverIdx(null)}
      onMouseMove={hasHover ? handleMouseMove : undefined}
    >
      {/* 跟随鼠标的柔和光斑（仅 hover 设备） */}
      {hasHover && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0"
          style={{ backgroundImage: spotlight }}
        />
      )}

      {/* 滚动轨道：CSS keyframes 驱动；父级 hover 时暂停（见 index.css .ogs-marquee:hover）*/}
      <div className="ogs-marquee-track flex shrink-0 items-center gap-10 whitespace-nowrap will-change-transform">
        {list.map((item, i) => {
          // 当前是否处于「有人 hover、且不是我」状态 → 变暗
          const dimmed = hoverIdx !== null && hoverIdx !== i;
          // 当前是不是被 hover 的那一个
          const focused = hoverIdx === i;
          return (
            <span
              key={i}
              onMouseEnter={() => {
                if (!hasHover) return;
                setHoverIdx(i);
                setCursor("hover-link", "READ");
              }}
              onMouseLeave={() => {
                if (!hasHover) return;
                setHoverIdx(null);
                setCursor("default");
              }}
              className={[
                "flex items-center gap-10 font-display text-3xl italic tracking-tight md:text-5xl",
                "transition-all duration-300",
                // 聚焦：主色 + 轻微放大；其他：变暗
                focused ? "text-accent scale-[1.04]" : "scale-100",
                dimmed ? "opacity-30" : "opacity-100",
              ].join(" ")}
            >
              {item}
              <Asterisk size={20} className="text-accent" />
            </span>
          );
        })}
      </div>
    </div>
  );
}
