/**
 * 单个作品卡片（v2：base44 风方角硬卡）
 * - variant 控制布局变体：feature 大头牌 16:9 / grid 网格 4:3 / auto 沿用旧逻辑
 * - 删除了 3D tilt 倾斜（base44 不用这种装饰）
 * - 图片 hover 缓慢 scale 1.04，标题颜色变 accent
 * - 进入视口上移浮入；可选视差位移（默认关闭）
 */
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useUIStore } from "@/store/uiStore";
import { useHasHover, useIsDesktop } from "@/hooks/useMediaQuery";
import { ROUTES, EASE } from "@/constants";
import type { Work } from "@/data/types";
import { cn } from "@/lib/utils";
// 多语言 hook：从 LocalizedText 中按当前语言取值
import { useT } from "@/lib/i18n";

// 卡片变体类型：feature 大头牌 / grid 网格小卡 / auto 兼容老逻辑
type WorkCardVariant = "feature" | "grid" | "auto";

interface WorkCardProps {
  work: Work;
  // 视差强度：0 = 不动；正数 = 滚动时整体上移更慢，负数 = 更快
  parallax?: number;
  // 卡片样式变体
  variant?: WorkCardVariant;
}

const aspectClass = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
} as const;

export default function WorkCard({
  work,
  parallax = 0,
  variant = "auto",
}: WorkCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const setCursor = useUIStore((s) => s.setCursor);
  const hasHover = useHasHover();
  const isDesktop = useIsDesktop();
  // 多语言：从 LocalizedText 中按当前语言取值
  const { pick } = useT();
  const title = pick(work.title) as string;
  const summary = pick(work.summary) as string;

  // 监听卡片相对于视口的滚动进度（0 = 进入视口；1 = 离开视口）
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // 根据 parallax 把进度映射成 Y 位移
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  // 根据 variant 决定图片容器的比例
  const aspectCls =
    variant === "feature"
      ? "aspect-[16/9]"
      : variant === "grid"
      ? "aspect-[4/3]"
      : aspectClass[work.thumbAspect];

  // 头牌卡片标题字号更大
  const titleSizeCls =
    variant === "feature"
      ? "font-display text-2xl tracking-tight transition-colors duration-300 group-hover:text-accent md:text-4xl"
      : "font-display text-xl tracking-tight transition-colors duration-300 group-hover:text-accent md:text-2xl";

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
        {/* 视差包裹层：仅当 parallax≠0 且桌面时启用 */}
        <motion.div
          style={isDesktop && parallax !== 0 ? { y } : undefined}
        >
          {/* 图像容器：v2 用方角小圆角 4px（rounded-sm），无 3D 倾斜 */}
          <div
            style={{ backgroundColor: work.accentBg ?? "rgb(var(--card))" }}
            className={cn("relative overflow-hidden rounded-sm", aspectCls)}
          >
            <motion.img
              src={work.cover}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover"
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE.expo }}
              // hover 缓慢 scale 1.04（base44 风：克制的图片放大）
              whileHover={hasHover ? { scale: 1.04 } : undefined}
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
              <h3 className={titleSizeCls}>{title}</h3>
              <p className="mt-1 text-sm text-fg/60">{summary}</p>
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
