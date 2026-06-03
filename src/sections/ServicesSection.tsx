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

export default function ServicesSection() {
  const services = useServices();
  const clients = useClients();
  const setCursor = useUIStore((s) => s.setCursor);

  // marquee 列表（重复一次实现无缝循环）
  const clientsLoop = [...clients, ...clients];

  return (
    <section className="relative px-5 py-24 md:px-12 md:py-40">
      <div className="ogs-container">
        <SectionHeader
          num="03"
          tag="Services & Clients"
          title={
            <>
              我提供的
              <span className="italic text-accent"> 设计能力 </span>
              <br className="hidden md:block" />
              与服务过的品牌。
            </>
          }
        />

        {/* 服务能力 4 列 */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-fg/10 bg-fg/10 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: EASE.expo, delay: i * 0.08 }}
              onMouseEnter={() => setCursor("hover-link")}
              onMouseLeave={() => setCursor("default")}
              className="group relative flex h-72 flex-col justify-between overflow-hidden bg-bg p-6 transition-colors duration-500 hover:bg-card md:p-8"
            >
              {/* 顶部编号 */}
              <div className="font-mono text-xs uppercase tracking-widest text-fg/40">
                {s.num}
              </div>

              {/* 中段：标题 + 描述（默认显示） */}
              <div className="mt-auto transition-all duration-500 ease-expo group-hover:-translate-y-2">
                <h3 className="font-display text-2xl tracking-tight transition-colors duration-300 group-hover:text-accent md:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-fg/60">{s.desc}</p>
              </div>

              {/* hover 时浮出的关键词 */}
              <div className="pointer-events-none absolute inset-x-6 bottom-6 flex flex-wrap gap-1.5 opacity-0 transition-opacity duration-500 group-hover:pointer-events-auto group-hover:opacity-100 md:inset-x-8">
                {s.bullets.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-fg/20 bg-bg/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-fg/70"
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* 顶角强调点 */}
              <span className="absolute right-6 top-6 h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:right-8 md:top-8" />
            </motion.div>
          ))}
        </div>

        {/* 合作品牌：标题 */}
        <div className="mt-20 flex items-center gap-4 md:mt-28">
          <span className="h-px flex-1 bg-fg/15" />
          <span className="font-mono text-xs uppercase tracking-widest text-fg/60">
            Selected Clients
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
          以上为服务过的品牌示意，部分项目受 NDA 限制不便展示。
        </p>
      </div>
    </section>
  );
}
