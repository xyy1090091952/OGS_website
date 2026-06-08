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
      // bg-grad-about：渐变 B 灰 → 粉紫 → 淡青蓝（"色彩在底部聚集"）
      className="bg-grad-about relative overflow-hidden px-5 py-24 md:px-12 md:py-40"
    >
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

        {/* v2：去掉旧的"玻璃卡"包裹，让段落渐变直接透出 —— base44 主页就是这么做的 */}
        {/* 双栏：左签名图 / 右正文 */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* 左：大引文 + handle —— v2 用方角硬卡（borderRadius 4px），无投影 */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE.expo }}
              className="sticky top-32 space-y-6"
            >
              <div className="rounded-sm border border-fg/15 bg-card p-6">
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

            {/* 关键词（保留药丸 pill：base44 把"小标签"做成 999px 圆角） */}
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
                  whileHover={{ y: -3 }}
                  className="cursor-default rounded-full border border-fg/25 bg-card/70 px-4 py-1.5 text-xs uppercase tracking-widest text-fg/70 transition-colors hover:border-fg hover:text-fg"
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
                        ul 用 pl-8 (32px) + border-l，圆点中心 = -(32 + 6) = -38px */}
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
    </section>
  );
}
