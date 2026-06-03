/**
 * 单个作品卡片
 * - 不同 thumbAspect 决定不同高度
 * - 悬停时缩略图缩放、自定义鼠标变 "VIEW"
 * - 进入视口时上移浮入 + 滚动视差（不同卡片按不同速度位移）
 */
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useUIStore } from "@/store/uiStore";
import { useHasHover, useIsDesktop } from "@/hooks/useMediaQuery";
import { ROUTES, EASE } from "@/constants";
import type { Work } from "@/data/types";
import { cn } from "@/lib/utils";

interface WorkCardProps {
  work: Work;
  // 视差强度：0 = 不动；正数 = 滚动时整体上移更慢，负数 = 更快
  parallax?: number;
}

const aspectClass = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
} as const;

export default function WorkCard({ work, parallax = 0 }: WorkCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const setCursor = useUIStore((s) => s.setCursor);
  const hasHover = useHasHover();
  const isDesktop = useIsDesktop();

  // 监听卡片相对于视口的滚动进度（0 = 进入视口；1 = 离开视口）
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // 根据 parallax 把进度映射成 Y 位移
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE.expo }}
    >
      <Link
        to={ROUTES.WORK_DETAIL(work.slug)}
        onMouseEnter={() => setCursor("hover-card", "VIEW")}
        onMouseLeave={() => setCursor("default")}
        className="group block focus-visible:outline-none"
      >
        {/* 视差包裹层（仅桌面启用，移动端保持原位） */}
        <motion.div style={isDesktop ? { y } : undefined}>
          {/* 图像容器 */}
          <div
            className={cn(
              "relative overflow-hidden rounded-xl",
              aspectClass[work.thumbAspect]
            )}
            style={{ backgroundColor: work.accentBg ?? "rgb(var(--card))" }}
          >
            <motion.img
              src={work.cover}
              alt={work.title}
              loading="lazy"
              className="h-full w-full object-cover"
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE.expo }}
              // hover 缩放
              whileHover={hasHover ? { scale: 1.06 } : undefined}
            />
            {/* 遮罩：hover 时浮起信息 */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {/* 标签：右上角 */}
            <div className="absolute right-4 top-4 rounded-full border border-white/30 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur">
              {work.category}
            </div>
          </div>

          {/* 文本块 */}
          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-xl tracking-tight transition-colors duration-300 group-hover:text-accent md:text-2xl">
                {work.title}
              </h3>
              <p className="mt-1 text-sm text-fg/60">{work.summary}</p>
            </div>
            <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-fg/40">
              {work.year}
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
