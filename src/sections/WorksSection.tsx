/**
 * 作品集 Section
 * - 顶部分类切换
 * - 不规则网格（错位 + 不同尺寸）
 * - 切换分类时淡入淡出
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorks } from "@/hooks/useWorks";
import SectionHeader from "@/components/SectionHeader";
import WorkCard from "@/components/WorkCard";
import { ANCHORS, EASE } from "@/constants";
import { WORK_CATEGORIES, type WorkCategory } from "@/data/types";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";
import { useT, type DictKey } from "@/lib/i18n";

// 分类顺序（label 改为 i18n key，避免硬编码）
const CATEGORY_LIST: { key: WorkCategory; labelKey: DictKey }[] = [
  { key: WORK_CATEGORIES.ALL, labelKey: "works.cat.all" },
  { key: WORK_CATEGORIES.UIUX, labelKey: "works.cat.uiux" },
  { key: WORK_CATEGORIES.ANIMATION, labelKey: "works.cat.motion" },
  { key: WORK_CATEGORIES.VIDEO, labelKey: "works.cat.video" },
  { key: WORK_CATEGORIES.GRAPHIC, labelKey: "works.cat.graphic" },
];

export default function WorksSection() {
  const [active, setActive] = useState<WorkCategory>(WORK_CATEGORIES.ALL);
  const works = useWorks(active);
  const setCursor = useUIStore((s) => s.setCursor);
  const { t } = useT();

  return (
    <section
      id={ANCHORS.WORKS}
      className="relative px-5 py-24 md:px-12 md:py-40"
    >
      {/* 顶部分隔线 */}
      <div className="ogs-container">
        <SectionHeader
          num="02"
          tag={t("works.tag")}
          title={
            <>
              {t("works.titleA")}
              <span className="italic text-accent"> {t("works.titleB")} </span>
              <br className="hidden md:block" />
              {t("works.titleC")}
            </>
          }
        />

        {/* 分类切换 */}
        <div className="-mx-2 mb-10 flex flex-wrap items-center gap-1 md:mb-16">
          {CATEGORY_LIST.map((c) => {
            const isActive = active === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                onMouseEnter={() => setCursor("hover-link")}
                onMouseLeave={() => setCursor("default")}
                className={cn(
                  // 基础样式：圆角胶囊；选中时直接给 bg-fg + text-bg，避免依赖底层 motion 元素加载顺序
                  "relative isolate overflow-hidden rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-300",
                  isActive
                    ? "bg-fg text-bg"
                    : "text-fg/60 hover:text-fg"
                )}
              >
                {/* 选中态使用 layoutId 平滑滑动指示器；放在按钮文字下层做高光 */}
                {isActive && (
                  <motion.span
                    layoutId="cat-pill"
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full bg-fg"
                    // 初次进入不动画，避免出现"指示器还没到位 → 文字消失"的视觉空白
                    initial={false}
                    transition={{ duration: 0.5, ease: EASE.expo }}
                  />
                )}
                {t(c.labelKey)}
              </button>
            );
          })}
          <div className="ml-auto hidden font-mono text-xs uppercase tracking-widest text-fg/40 md:block">
            {String(works.length).padStart(2, "0")} {t("works.projects")}
          </div>
        </div>

        {/* 不规则网格 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: EASE.expo }}
            className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-6 md:gap-y-20"
          >
            {works.map((w, i) => {
              // 错位：奇偶下移制造不对称感
              const span =
                w.thumbAspect === "landscape"
                  ? "md:col-span-7"
                  : w.thumbAspect === "portrait"
                  ? "md:col-span-5"
                  : "md:col-span-6";
              // 视差强度：每隔一张反向，让滚动时呈现深浅层次
              const parallax = i % 2 === 0 ? 60 : -40;
              const colStart = i % 2 === 1 ? "md:col-start-7" : "";
              return (
                <div
                  key={w.slug}
                  className={cn(
                    span,
                    colStart,
                    // 第一个作品占满更大宽度
                    i === 0 && "md:col-span-8 md:col-start-1"
                  )}
                >
                  <WorkCard work={w} parallax={parallax} />
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
