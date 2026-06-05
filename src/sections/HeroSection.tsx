/**
 * Hero 主视觉
 * - 大字号 Display 字体显示 slogan
 * - 文字逐字浮入
 * - 背景渐变 + 噪点
 * - 滚动指引
 */
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useProfile } from "@/hooks/useWorks";
import { ANCHORS, EASE } from "@/constants";
import { useUIStore } from "@/store/uiStore";
import { useT } from "@/lib/i18n";
// Hero 动态互动背景（漂浮色球 + 跟随鼠标光斑）
import HeroInteractiveBg from "@/components/HeroInteractiveBg";

export default function HeroSection() {
  const profile = useProfile();
  const setCursor = useUIStore((s) => s.setCursor);
  const { t } = useT();

  // 把 slogan 拆成单词，做逐词浮入（slogan 始终为英文，便于动画）
  const words = profile.slogan.split(" ");

  const scrollToNext = () => {
    document
      .getElementById(ANCHORS.ABOUT)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id={ANCHORS.HOME}
      // isolate：建立独立 stacking context，确保子元素的 -z-10 不会被 main 的背景吞掉
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32 md:items-center md:pb-12 md:pt-24"
    >
      {/* 动态互动背景：三颗漂浮色球 + 鼠标跟随光斑（基于主题色）
          替代原来的静态 bg-aurora-hero，让首屏更有生命力 */}
      <HeroInteractiveBg />
      {/* 噪点叠加层：让色块表面带颗粒感（在背景之上、内容之下） */}
      <div className="bg-grain pointer-events-none absolute inset-0 z-0" aria-hidden />

      {/* 内容容器：z-10 浮在背景之上 */}
      <div className="ogs-container relative z-10 w-full">
        {/* 顶部小标签 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE.expo, delay: 0.2 }}
          className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-fg/60 md:mb-10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {t("hero.tag")}
        </motion.div>

        {/* 主标题：逐词浮入 */}
        <h1 className="font-display leading-[0.92] tracking-tightest">
          <span className="block text-[14vw] md:text-[10vw]">
            {words.map((word, i) => (
              <span
                key={i}
                className="mr-[0.18em] inline-block overflow-hidden align-bottom"
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1,
                    ease: EASE.expo,
                    delay: 0.35 + i * 0.08,
                  }}
                >
                  {/* 第二个词用斜体 + 强调色 */}
                  {i === 1 ? (
                    <span className="italic text-accent">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        {/* 副标题（多语言） */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE.expo, delay: 0.95 }}
          className="mt-8 max-w-md text-base leading-relaxed text-fg/70 md:mt-12 md:max-w-lg md:text-lg"
        >
          {t("hero.subBefore")}{" "}
          <span className="text-fg">{t("hero.subUx")}</span> {t("hero.subAnd")}{" "}
          <span className="text-fg">{t("hero.subCreative")}</span>
          {t("hero.subAfter")}
        </motion.p>

        {/* CTA 反色按钮组（实色色块对照渐变背景，参考 base44 首屏右下橙色按钮）*/}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE.expo, delay: 1.1 }}
          className="mt-8 flex flex-wrap items-center gap-3 md:mt-10"
        >
          {/* 主按钮：fg 实色（深色块） */}
          <a
            href={`#${ANCHORS.WORKS}`}
            onMouseEnter={() => setCursor("hover-link")}
            onMouseLeave={() => setCursor("default")}
            className="group inline-flex items-center gap-3 rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-all duration-500 hover:gap-4 hover:bg-accent"
          >
            {t("hero.ctaPrimary")}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bg/20 transition-transform duration-500 group-hover:translate-x-0.5">
              <ArrowDown size={14} className="-rotate-45" />
            </span>
          </a>
          {/* 副按钮：透明 + 边框 */}
          <a
            href={`#${ANCHORS.CONTACT}`}
            onMouseEnter={() => setCursor("hover-link")}
            onMouseLeave={() => setCursor("default")}
            className="inline-flex items-center gap-2 rounded-full border border-fg/20 bg-bg/40 px-6 py-3.5 text-sm font-medium text-fg backdrop-blur-md transition-colors duration-300 hover:border-fg/60 hover:bg-bg/60"
          >
            {t("hero.ctaSecondary")}
          </a>
        </motion.div>

        {/* 底部信息行 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE.expo, delay: 1.2 }}
          className="mt-16 flex flex-wrap items-end justify-between gap-6 md:mt-24"
        >
          {/* 滚动指引 */}
          <button
            onClick={scrollToNext}
            onMouseEnter={() => setCursor("hover-link")}
            onMouseLeave={() => setCursor("default")}
            className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-fg/60 transition-colors hover:text-fg"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-fg/30 transition-colors group-hover:border-fg">
              <ArrowDown size={14} className="animate-bounceY" />
            </span>
            {t("hero.scroll")}
          </button>

          {/* 角标信息 */}
          <div className="hidden flex-col text-right text-xs uppercase tracking-widest text-fg/40 md:flex">
            <span>{profile.handle}</span>
            <span className="mt-1">{t("hero.portfolio")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
