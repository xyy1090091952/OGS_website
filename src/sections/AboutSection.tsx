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

export default function AboutSection() {
  const profile = useProfile();

  return (
    <section
      id={ANCHORS.ABOUT}
      className="relative px-5 py-24 md:px-12 md:py-40"
    >
      <div className="ogs-container">
        <SectionHeader
          num="01"
          tag="About Me"
          title={
            <>
              我是一个把
              <span className="italic text-accent"> 心意 </span>
              <br className="hidden md:block" />
              藏在像素里的人。
            </>
          }
        />

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
                  Profile
                </div>
                <div className="mt-4 font-display text-3xl italic md:text-4xl">
                  {profile.handle}
                </div>
                <div className="mt-1 text-sm text-fg/60">{profile.name}</div>
                <div className="mt-6 h-px bg-fg/10" />
                <div className="mt-6 grid grid-cols-2 gap-4 text-xs uppercase tracking-widest text-fg/60">
                  <div>
                    <div className="text-fg/40">Based</div>
                    <div className="mt-1 text-fg">China</div>
                  </div>
                  <div>
                    <div className="text-fg/40">Since</div>
                    <div className="mt-1 text-fg">2016</div>
                  </div>
                  <div>
                    <div className="text-fg/40">Focus</div>
                    <div className="mt-1 text-fg">UX · Brand</div>
                  </div>
                  <div>
                    <div className="text-fg/40">Mood</div>
                    <div className="mt-1 text-fg">Cat ♡</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 右：多段正文 + 关键词 */}
          <div className="md:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-fg/80 md:text-xl">
              {profile.bio.map((p, i) => (
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
              {profile.keywords.map((k, i) => (
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
                <span className="h-px w-8 bg-fg/30" /> Timeline
              </div>
              <ul className="relative space-y-8 border-l border-fg/15 pl-8">
                {profile.timeline.map((t, i) => (
                  <motion.li
                    key={t.year}
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
                    {/* 圆点 */}
                    <span className="absolute -left-[34px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border border-fg/30 bg-bg">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    <div className="font-mono text-xs uppercase tracking-widest text-accent">
                      {t.year}
                    </div>
                    <div className="mt-1 font-display text-2xl">{t.title}</div>
                    {t.desc && (
                      <p className="mt-1 text-sm text-fg/60">{t.desc}</p>
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
