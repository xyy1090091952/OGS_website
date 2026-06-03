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

export default function HeroSection() {
  const profile = useProfile();
  const setCursor = useUIStore((s) => s.setCursor);

  // 把 slogan 拆成单词，做逐词浮入
  const words = profile.slogan.split(" ");

  const scrollToNext = () => {
    document
      .getElementById(ANCHORS.ABOUT)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id={ANCHORS.HOME}
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32 md:items-center md:pb-12 md:pt-24"
    >
      {/* 背景：径向渐变 + 噪点 */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(120% 80% at 80% 0%, rgb(var(--accent) / 0.18) 0%, transparent 60%), radial-gradient(80% 50% at 0% 100%, rgb(var(--accent) / 0.10) 0%, transparent 60%)",
        }}
      />
      <div className="bg-grain absolute inset-0 -z-10" aria-hidden />

      <div className="ogs-container w-full">
        {/* 顶部小标签 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE.expo, delay: 0.2 }}
          className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-fg/60 md:mb-10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Independent Designer · Since 2016
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

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE.expo, delay: 0.95 }}
          className="mt-8 max-w-md text-base leading-relaxed text-fg/70 md:mt-12 md:max-w-lg md:text-lg"
        >
          独立设计师，聚焦于 <span className="text-fg">体验设计</span> 与{" "}
          <span className="text-fg">创意设计</span>。
          致力于做"实用主义"的设计——好看、好用，并且让人会心一笑。
        </motion.p>

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
            Scroll to explore
          </button>

          {/* 角标信息 */}
          <div className="hidden flex-col text-right text-xs uppercase tracking-widest text-fg/40 md:flex">
            <span>{profile.handle}</span>
            <span className="mt-1">Portfolio · 2024 / 25</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
