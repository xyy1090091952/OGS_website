/**
 * 作品详情页
 * - 顶部 Banner（封面 + 标题信息）
 * - 内容区图文混排
 * - 底部上下篇导航（环形）
 */
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { useWork } from "@/hooks/useWorks";
import { ROUTES, EASE, ANCHORS } from "@/constants";
import { useUIStore } from "@/store/uiStore";
import type { WorkContent } from "@/data/types";

// 渲染单个内容块
function ContentBlock({ block, index }: { block: WorkContent; index: number }) {
  const common = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, ease: EASE.expo, delay: 0.05 },
  };

  switch (block.type) {
    case "text":
      return (
        <motion.p
          {...common}
          key={index}
          className="mx-auto max-w-2xl text-lg leading-relaxed text-fg/80 md:text-xl"
        >
          {block.content}
        </motion.p>
      );
    case "image":
      return (
        <motion.figure {...common} key={index} className="overflow-hidden rounded-2xl">
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="h-auto w-full"
          />
        </motion.figure>
      );
    case "image-pair":
      return (
        <motion.div
          {...common}
          key={index}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
        >
          <img
            src={block.left}
            alt={block.alt ?? "image"}
            loading="lazy"
            className="h-auto w-full rounded-2xl"
          />
          <img
            src={block.right}
            alt={block.alt ?? "image"}
            loading="lazy"
            className="h-auto w-full rounded-2xl"
          />
        </motion.div>
      );
    case "video":
      return (
        <motion.div
          {...common}
          key={index}
          className="overflow-hidden rounded-2xl"
        >
          <video
            controls
            poster={block.poster}
            src={block.src}
            className="h-auto w-full"
          />
        </motion.div>
      );
    default:
      return null;
  }
}

export default function WorkDetail() {
  const { slug } = useParams();
  const data = useWork(slug);
  const navigate = useNavigate();
  const setCursor = useUIStore((s) => s.setCursor);

  // 进入页面回到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // 找不到作品
  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="font-display text-3xl">作品不存在</p>
          <Link to={ROUTES.HOME} className="btn-outline mt-6">
            <ArrowLeft size={14} /> 返回首页
          </Link>
        </div>
      </div>
    );
  }

  const { work, prev, next } = data;

  return (
    <article className="pb-24">
      {/* 顶部 Banner */}
      <section
        className="relative flex min-h-[80svh] flex-col justify-end overflow-hidden px-5 pb-12 pt-32 md:px-12 md:pb-16 md:pt-40"
        style={{
          backgroundColor: work.accentBg ?? "rgb(var(--card))",
          color: work.accentFg ?? "rgb(var(--fg))",
        }}
      >
        {/* 背景层：优先使用视频；没有视频则使用封面图 */}
        {work.bannerVideo ? (
          // 视频背景：自动播放、静音、循环、内联（满足移动端浏览器自动播放策略）
          <video
            src={work.bannerVideo}
            poster={work.cover}
            autoPlay
            muted
            loop
            playsInline
            // 不允许用户控制，避免视频抢走 hover 焦点
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
          />
        ) : (
          <img
            src={work.cover}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
          />
        )}
        {/* 颗粒蒙层，统一质感 */}
        <div className="bg-grain absolute inset-0" aria-hidden />
        {/* 底部渐变遮罩，让文字更易读 */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent"
          aria-hidden
        />

        <div className="ogs-container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE.expo }}
            className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest opacity-70"
          >
            <button
              onClick={() => navigate(-1)}
              onMouseEnter={() => setCursor("hover-link")}
              onMouseLeave={() => setCursor("default")}
              className="flex items-center gap-1.5 transition-opacity hover:opacity-100"
            >
              <ArrowLeft size={12} /> Back
            </button>
            <span className="opacity-30">/</span>
            <span>{work.category}</span>
            <span className="opacity-30">/</span>
            <span>{work.year}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE.expo, delay: 0.1 }}
            className="font-display text-5xl leading-[1.05] tracking-tightest md:text-7xl lg:text-8xl"
          >
            {work.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.expo, delay: 0.25 }}
            className="mt-8 grid max-w-3xl grid-cols-2 gap-6 text-xs uppercase tracking-widest md:grid-cols-3"
          >
            <div>
              <div className="opacity-50">Category</div>
              <div className="mt-1">{work.category}</div>
            </div>
            <div>
              <div className="opacity-50">Year</div>
              <div className="mt-1">{work.year}</div>
            </div>
            {work.client && (
              <div>
                <div className="opacity-50">Client</div>
                <div className="mt-1">{work.client}</div>
              </div>
            )}
            <div className="col-span-2 md:col-span-3">
              <div className="opacity-50">Tags</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {work.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-current/30 px-3 py-1 text-[10px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 内容区 */}
      <section className="px-5 py-20 md:px-12 md:py-32">
        <div className="ogs-container">
          {/* 概要 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE.expo }}
            className="mx-auto mb-20 max-w-3xl font-display text-3xl leading-[1.2] tracking-tight md:text-4xl"
          >
            {work.summary}
          </motion.p>

          {/* 内容块流 */}
          <div className="space-y-16 md:space-y-24">
            {work.contents.map((b, i) => (
              <ContentBlock key={i} block={b} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 上下篇导航 */}
      <section className="border-t border-fg/10 px-5 py-16 md:px-12 md:py-24">
        <div className="ogs-container grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* 上一个：左对齐，hover 时缩略图从右侧浮出 */}
          <Link
            to={ROUTES.WORK_DETAIL(prev.slug)}
            onMouseEnter={() => setCursor("hover-card", "PREV")}
            onMouseLeave={() => setCursor("default")}
            className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-fg/10 p-6 transition-colors hover:bg-card md:p-8"
          >
            <ArrowLeft
              size={20}
              className="shrink-0 text-fg/40 transition-all group-hover:-translate-x-1 group-hover:text-accent"
            />
            <div className="min-w-0 flex-1">
              <div className="font-mono text-xs uppercase tracking-widest text-fg/40">
                Previous
              </div>
              <div className="mt-1 truncate font-display text-xl tracking-tight transition-colors group-hover:text-accent md:text-2xl">
                {prev.title}
              </div>
            </div>
            {/* hover 缩略图预览 */}
            <div className="pointer-events-none absolute right-6 top-1/2 hidden h-20 w-28 -translate-y-1/2 translate-x-6 overflow-hidden rounded-lg opacity-0 transition-all duration-500 ease-expo group-hover:translate-x-0 group-hover:opacity-100 md:block">
              <img
                src={prev.cover}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </Link>

          {/* 下一个：右对齐，hover 时缩略图从左侧浮出 */}
          <Link
            to={ROUTES.WORK_DETAIL(next.slug)}
            onMouseEnter={() => setCursor("hover-card", "NEXT")}
            onMouseLeave={() => setCursor("default")}
            className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-fg/10 p-6 text-right transition-colors hover:bg-card md:p-8"
          >
            {/* hover 缩略图预览 */}
            <div className="pointer-events-none absolute left-6 top-1/2 hidden h-20 w-28 -translate-x-6 -translate-y-1/2 overflow-hidden rounded-lg opacity-0 transition-all duration-500 ease-expo group-hover:translate-x-0 group-hover:opacity-100 md:block">
              <img
                src={next.cover}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-auto min-w-0 flex-1">
              <div className="font-mono text-xs uppercase tracking-widest text-fg/40">
                Next
              </div>
              <div className="mt-1 truncate font-display text-xl tracking-tight transition-colors group-hover:text-accent md:text-2xl">
                {next.title}
              </div>
            </div>
            <ArrowRight
              size={20}
              className="shrink-0 text-fg/40 transition-all group-hover:translate-x-1 group-hover:text-accent"
            />
          </Link>
        </div>

        {/* 返回联系方式 */}
        <div className="ogs-container mt-12 flex justify-center">
          <Link
            to={`${ROUTES.HOME}#${ANCHORS.CONTACT}`}
            onMouseEnter={() => setCursor("hover-link")}
            onMouseLeave={() => setCursor("default")}
            className="btn-outline"
          >
            喜欢就来聊聊 <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </article>
  );
}
