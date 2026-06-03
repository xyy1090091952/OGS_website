/**
 * 服务能力 + 合作品牌 Section
 * - 上半部分：4 项核心服务，hover 时关键词浮出
 * - 下半部分：合作品牌墙（横向滚动 marquee）
 */
import { motion } from "framer-motion";
import { useServices, useClients } from "@/hooks/useWorks";
import SectionHeader from "@/components/SectionHeader";
import { EASE } from "@/constants";
import { useUIStore } from "@/store/uiStore";
// 多语言：t 翻译 UI 文案，pick 从 LocalizedText 中取当前语言值
import { useT } from "@/lib/i18n";

export default function ServicesSection() {
  const services = useServices();
  const clients = useClients();
  const setCursor = useUIStore((s) => s.setCursor);
  const { t, pick } = useT();

  // marquee 列表（重复一次实现无缝循环）
  const clientsLoop = [...clients, ...clients];

  return (
    <section className="relative overflow-hidden px-5 py-24 md:px-12 md:py-40">
      {/* 背景：左右双色染色渐变（与上下段落自然衔接） */}
      <div
        className="bg-aurora-section pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      />
      <div className="ogs-container">
        <SectionHeader
          num="03"
          tag={t("services.tag")}
          title={
            <>
              {t("services.titleA")}
              <span className="italic text-accent"> {t("services.titleB")} </span>
              <br className="hidden md:block" />
              {t("services.titleC")}
            </>
          }
        />

        {/* 服务能力 4 列 */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-fg/10 bg-fg/10 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            // 取当前语言下的标题/描述/关键词数组
            const sTitle = pick(s.title) as string;
            const sDesc = pick(s.desc) as string;
            const sBullets = pick(s.bullets) as string[];
            return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: EASE.expo, delay: i * 0.08 }}
              onMouseEnter={() => setCursor("hover-link")}
              onMouseLeave={() => setCursor("default")}
              className="group relative flex h-80 flex-col overflow-hidden bg-bg p-6 transition-colors duration-500 hover:bg-card md:p-8"
            >
              {/* 顶部编号 */}
              <div className="font-mono text-xs uppercase tracking-widest text-fg/40">
                {s.num}
              </div>

              {/* 标题：hover 时上移 */}
              <h3 className="mt-auto font-display text-2xl tracking-tight transition-all duration-500 ease-expo group-hover:-translate-y-1 group-hover:text-accent md:text-3xl">
                {sTitle}
              </h3>

              {/* 描述与关键词共享同一位置：默认显示描述，hover 切换为关键词 */}
              <div className="relative mt-2 min-h-[68px]">
                {/* 默认显示的描述：hover 时淡出 */}
                <p className="absolute inset-0 text-sm text-fg/60 transition-opacity duration-300 group-hover:opacity-0">
                  {sDesc}
                </p>
                {/* hover 时浮出的关键词：默认透明 */}
                <div className="pointer-events-none absolute inset-0 flex flex-wrap content-start gap-1.5 opacity-0 transition-opacity duration-500 group-hover:pointer-events-auto group-hover:opacity-100">
                  {sBullets.map((b) => (
                    <span
                      key={b}
                      className="rounded-full border border-fg/20 bg-bg/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-fg/70"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* 顶角强调点 */}
              <span className="absolute right-6 top-6 h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:right-8 md:top-8" />
            </motion.div>
            );
          })}
        </div>

        {/* 合作品牌：标题 */}
        <div className="mt-20 flex items-center gap-4 md:mt-28">
          <span className="h-px flex-1 bg-fg/15" />
          <span className="font-mono text-xs uppercase tracking-widest text-fg/60">
            {t("services.clientsLabel")}
          </span>
          <span className="h-px flex-1 bg-fg/15" />
        </div>

        {/* 合作品牌墙：横向滚动 */}
        <div className="relative mt-10 overflow-hidden">
          {/* 左右渐变蒙版 */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent md:w-32" />

          <motion.div
            className="flex shrink-0 items-center gap-12"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {clientsLoop.map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="group flex shrink-0 items-baseline gap-3 whitespace-nowrap"
              >
                <span className="font-display text-2xl tracking-tight text-fg/80 transition-colors duration-300 group-hover:text-fg md:text-3xl">
                  {c.name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-fg/40">
                  · {c.industry}
                </span>
                {/* 分隔点 */}
                <span className="ml-12 h-1 w-1 rounded-full bg-accent" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* 底部小字 */}
        <p className="mt-10 text-center text-xs uppercase tracking-widest text-fg/40">
          {t("services.note")}
        </p>
      </div>
    </section>
  );
}
