/**
 * 关于我 Section
 * - 左标题 + 右多段正文
 * - 关键词标签卡片，hover 微抖动
 * - 时间线纵向
 */
import { motion } from "framer-motion";
import { useProfile } from "@/hooks/useWorks";
import SectionHeader from "@/components/SectionHeader";
import { ANCHORS, EASE } from "@/constants";
import { useT } from "@/lib/i18n";

export default function AboutSection() {
  const profile = useProfile();
  const { t, pick } = useT();

  // 解析当前语言下的多段正文 / 关键词
  const bio = pick(profile.bio) as string[];
  const keywords = pick(profile.keywords) as string[];

  return (
    <section
      id={ANCHORS.ABOUT}
      className="relative overflow-hidden px-5 py-24 md:px-12 md:py-40"
    >
      {/* 背景柔光：对角双色（跟随主题色） */}
      <div
        className="bg-aurora-about pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      />
      <div className="ogs-container">
        <SectionHeader
          num="01"
          tag={t("about.tag")}
          title={
            <>
              {t("about.titleA")}
              <span className="italic text-accent"> {t("about.titleB")} </span>
              <br className="hidden md:block" />
              {t("about.titleC")}
            </>
          }
        />

        {/* 内容外壳：玻璃质感卡片
            - 不再用陈旧的"卡片下方大投影"，改用：
              · 半透明底（bg-card/70）+ 强 backdrop-blur 形成玻璃质感
              · 极细 ring 描边（ring-fg/10）
              · 顶部一道渐变高光线（before 伪元素），模拟玻璃边缘反光
              · 配合背景的漂浮色球，背景的颜色会透过卡片
            这种"frosted glass"语言更现代，base44/Linear/Arc 都在用 */}
        <div
          className="relative overflow-hidden rounded-[32px] bg-card/70 p-8 ring-1 ring-fg/10 backdrop-blur-2xl md:p-14
            before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px
            before:bg-gradient-to-r before:from-transparent before:via-fg/25 before:to-transparent"
        >
        {/* 双栏：左签名图 / 右正文 */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* 左：大引文 + handle */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE.expo }}
              className="sticky top-32 space-y-6"
            >
              <div className="rounded-2xl border border-fg/10 bg-card/50 p-6 backdrop-blur-sm">
                <div className="font-mono text-xs uppercase tracking-widest text-fg/40">
                  {t("about.profile")}
                </div>
                <div className="mt-4 font-display text-3xl italic md:text-4xl">
                  {profile.handle}
                </div>
                <div className="mt-1 text-sm text-fg/60">{profile.name}</div>
                <div className="mt-6 h-px bg-fg/10" />
                <div className="mt-6 grid grid-cols-2 gap-4 text-xs uppercase tracking-widest text-fg/60">
                  <div>
                    <div className="text-fg/40">{t("about.based")}</div>
                    <div className="mt-1 text-fg">{t("about.china")}</div>
                  </div>
                  <div>
                    <div className="text-fg/40">{t("about.since")}</div>
                    <div className="mt-1 text-fg">2016</div>
                  </div>
                  <div>
                    <div className="text-fg/40">{t("about.focus")}</div>
                    <div className="mt-1 text-fg">{t("about.uxBrand")}</div>
                  </div>
                  <div>
                    <div className="text-fg/40">{t("about.mood")}</div>
                    <div className="mt-1 text-fg">{t("about.cat")}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 右：多段正文 + 关键词 */}
          <div className="md:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-fg/80 md:text-xl">
              {bio.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, ease: EASE.expo, delay: i * 0.1 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* 关键词 */}
            <div className="mt-12 flex flex-wrap gap-2">
              {keywords.map((k, i) => (
                <motion.span
                  key={k}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: EASE.expo,
                    delay: i * 0.04,
                  }}
                  whileHover={{ y: -3, rotate: -2 }}
                  className="cursor-default rounded-full border border-fg/20 bg-card/60 px-4 py-1.5 text-xs uppercase tracking-widest text-fg/70 transition-colors hover:border-accent hover:text-accent"
                >
                  {k}
                </motion.span>
              ))}
            </div>

            {/* 时间线 */}
            <div className="mt-20">
              <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-fg/60">
                <span className="h-px w-8 bg-fg/30" /> {t("about.timeline")}
              </div>
              <ul className="relative space-y-8 border-l border-fg/15 pl-8">
                {profile.timeline.map((tItem, i) => (
                  <motion.li
                    key={tItem.year}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.6,
                      ease: EASE.expo,
                      delay: i * 0.07,
                    }}
                    className="relative"
                  >
                    {/* 圆点：精确压在 ul 左边线上
                        ul 用 pl-8 (32px) + border-l，所以圆点中心需要在 -(32 + 圆点半径)
                        圆点 h-3 w-3 = 12px，半径 6px，故 left = -38px
                        z-10 确保圆点盖住线，不会被截断 */}
                    <span className="absolute -left-[38px] top-1.5 z-10 flex h-3 w-3 items-center justify-center rounded-full border border-fg/30 bg-bg">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    <div className="font-mono text-xs uppercase tracking-widest text-accent">
                      {tItem.year}
                    </div>
                    <div className="mt-1 font-display text-2xl">
                      {pick(tItem.title)}
                    </div>
                    {tItem.desc && (
                      <p className="mt-1 text-sm text-fg/60">
                        {pick(tItem.desc)}
                      </p>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
