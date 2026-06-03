/**
 * 多语言（i18n）核心
 * - dictionary：集中管理所有 UI 文案（按 namespace 划分）
 * - pickLang(field, lang)：从一个 LocalizedText/Array 中取出当前语言的值，带 fallback
 * - useT()：组件中访问当前语言 + 翻译方法的 hook
 *
 * 数据访问层抽象：未来如果接入第三方 i18n 库，仅需改本文件，组件无需变动
 */
import { useUIStore } from "@/store/uiStore";
import type { Lang, LocalizedText, LocalizedTextArray } from "@/data/types";

// ==================== UI 文案字典 ====================
// 所有界面上的"硬编码文字"统一在这里，按 key 取值
const dict = {
  // 通用
  brand: { zh: "@Old_glasses", en: "@Old_glasses", ja: "@Old_glasses" },

  // 顶部导航
  "nav.home": { zh: "首页", en: "Home", ja: "ホーム" },
  "nav.about": { zh: "关于", en: "About", ja: "について" },
  "nav.works": { zh: "作品", en: "Works", ja: "作品" },
  "nav.contact": { zh: "联系", en: "Contact", ja: "連絡" },
  "nav.themeAria": { zh: "切换主题", en: "Toggle theme", ja: "テーマ切替" },
  "nav.menuAria": { zh: "菜单", en: "Menu", ja: "メニュー" },
  "nav.langAria": { zh: "切换语言", en: "Switch language", ja: "言語切替" },
  "nav.accentAria": { zh: "切换主题色", en: "Switch accent color", ja: "アクセントカラー切替" },
  "nav.accentTitle": { zh: "主题色", en: "Accent", ja: "アクセント" },

  // Hero
  "hero.tag": {
    zh: "独立设计师 · 自 2016",
    en: "Independent Designer · Since 2016",
    ja: "インディペンデントデザイナー · 2016〜",
  },
  "hero.subBefore": {
    zh: "独立设计师，聚焦于",
    en: "Independent designer focused on",
    ja: "インディペンデントデザイナー、フォーカス：",
  },
  "hero.subUx": {
    zh: "体验设计",
    en: "experience design",
    ja: "体験デザイン",
  },
  "hero.subAnd": { zh: "与", en: "and", ja: "と" },
  "hero.subCreative": {
    zh: "创意设计",
    en: "creative design",
    ja: "クリエイティブデザイン",
  },
  "hero.subAfter": {
    zh: "。致力于做\u201C实用主义\u201D的设计——好看、好用，并且让人会心一笑。",
    en: '. Pursuing "pragmatic" design — beautiful, useful, and a quiet smile.',
    ja: "。\u300C実用主義\u300Dのデザインを追求──美しく、使いやすく、心がほどける。",
  },
  "hero.scroll": {
    zh: "向下滚动浏览",
    en: "Scroll to explore",
    ja: "スクロールして探索",
  },
  "hero.portfolio": {
    zh: "作品集 · 2024 / 25",
    en: "Portfolio · 2024 / 25",
    ja: "ポートフォリオ · 2024 / 25",
  },
  // Hero CTA 按钮
  "hero.ctaPrimary": {
    zh: "查看作品",
    en: "View works",
    ja: "作品を見る",
  },
  "hero.ctaSecondary": {
    zh: "联系合作",
    en: "Get in touch",
    ja: "お問い合わせ",
  },

  // About Section
  "about.tag": { zh: "About Me", en: "About Me", ja: "About Me" },
  "about.titleA": { zh: "我是一个把", en: "I'm someone who tucks", ja: "ピクセルの中に" },
  "about.titleB": { zh: "心意", en: "feelings", ja: "想い" },
  "about.titleC": { zh: "藏在像素里的人。", en: "into pixels.", ja: "を込める人。" },
  "about.profile": { zh: "Profile", en: "Profile", ja: "プロフィール" },
  "about.based": { zh: "Based", en: "Based", ja: "拠点" },
  "about.since": { zh: "Since", en: "Since", ja: "活動開始" },
  "about.focus": { zh: "Focus", en: "Focus", ja: "領域" },
  "about.mood": { zh: "Mood", en: "Mood", ja: "気分" },
  "about.china": { zh: "中国", en: "China", ja: "中国" },
  "about.uxBrand": { zh: "UX · 品牌", en: "UX · Brand", ja: "UX · ブランド" },
  "about.cat": { zh: "猫派 ♡", en: "Cat ♡", ja: "ネコ派 ♡" },
  "about.timeline": { zh: "Timeline", en: "Timeline", ja: "タイムライン" },

  // Works Section
  "works.tag": { zh: "Selected Works", en: "Selected Works", ja: "Selected Works" },
  "works.titleA": {
    zh: "一些近期觉得",
    en: "A few recent works",
    ja: "最近、",
  },
  "works.titleB": { zh: "还不错", en: "I quite like", ja: "気に入っている" },
  "works.titleC": { zh: "的作品。", en: "myself.", ja: "作品たち。" },
  "works.cat.all": { zh: "全部", en: "All", ja: "すべて" },
  "works.cat.uiux": { zh: "UI/UX", en: "UI/UX", ja: "UI/UX" },
  "works.cat.motion": { zh: "动效", en: "Motion", ja: "モーション" },
  "works.cat.video": { zh: "视频", en: "Video", ja: "ビデオ" },
  "works.cat.graphic": { zh: "平面", en: "Graphic", ja: "グラフィック" },
  "works.projects": { zh: "项作品", en: "Projects", ja: "作品" },
  "works.viewProject": { zh: "查看项目", en: "View Project", ja: "プロジェクトを見る" },

  // Services Section
  "services.tag": { zh: "Services & Clients", en: "Services & Clients", ja: "Services & Clients" },
  "services.titleA": {
    zh: "我提供的",
    en: "What I",
    ja: "私が提供する",
  },
  "services.titleB": {
    zh: "设计能力",
    en: "design",
    ja: "デザイン能力",
  },
  "services.titleC": {
    zh: "与服务过的品牌。",
    en: "& brands I've worked with.",
    ja: "と、共に歩んだブランド。",
  },
  "services.clientsLabel": {
    zh: "Selected Clients",
    en: "Selected Clients",
    ja: "Selected Clients",
  },
  "services.note": {
    zh: "以上为服务过的品牌示意，部分项目受 NDA 限制不便展示。",
    en: "Brands shown above are illustrative; some are under NDA.",
    ja: "上記は実績の一例です。一部 NDA により非公開。",
  },

  // Contact
  "contact.tag": { zh: "Get In Touch", en: "Get In Touch", ja: "Get In Touch" },
  "contact.titleA": { zh: "喜欢就", en: "Like it?", ja: "気になったら" },
  "contact.titleB": { zh: "来聊聊", en: "let's talk", ja: "話そう" },
  "contact.titleC": { zh: "?", en: ".", ja: "。" },
  "contact.emailLabel": {
    zh: "邮箱 · 点击复制",
    en: "Email · Click to copy",
    ja: "メール · クリックでコピー",
  },
  "contact.copied": {
    zh: "邮箱已复制 · 期待你的消息",
    en: "Email copied · Looking forward",
    ja: "メールをコピーしました · お待ちしてます",
  },
  "contact.ps": {
    zh: "P.S. 我也喜欢看猫的视频，欢迎一起分享。",
    en: "P.S. I love cat videos too, feel free to share.",
    ja: "P.S. 猫の動画も大好き、ぜひシェアして。",
  },

  // Footer
  "footer.with": { zh: "With", en: "With", ja: "With" },
  "footer.creative": { zh: "Creative", en: "Creative", ja: "Creative" },
  "footer.fromHeart": { zh: "From Heart.", en: "From Heart.", ja: "From Heart." },
  "footer.copyright": {
    zh: "© {year} Old_glasses · 保留所有权利",
    en: "© {year} Old_glasses · All rights reserved.",
    ja: "© {year} Old_glasses · All rights reserved.",
  },
  "footer.madeWith": { zh: "用 ♡ 制作", en: "Made with ♡", ja: "♡ で制作" },
  "footer.top": { zh: "顶部", en: "Top", ja: "トップ" },

  // WorkDetail
  "wd.back": { zh: "返回", en: "Back", ja: "戻る" },
  "wd.category": { zh: "类别", en: "Category", ja: "カテゴリ" },
  "wd.year": { zh: "年份", en: "Year", ja: "年" },
  "wd.client": { zh: "客户", en: "Client", ja: "クライアント" },
  "wd.tags": { zh: "标签", en: "Tags", ja: "タグ" },
  "wd.previous": { zh: "上一项", en: "Previous", ja: "前へ" },
  "wd.next": { zh: "下一项", en: "Next", ja: "次へ" },
  "wd.contactCta": { zh: "喜欢就来聊聊", en: "Let's chat", ja: "話そう" },
  "wd.notFound": { zh: "作品不存在", en: "Work not found", ja: "作品が見つかりません" },
  "wd.backHome": { zh: "返回首页", en: "Back to home", ja: "ホームへ戻る" },

  // 404
  "nf.title": { zh: "页面不存在", en: "Page not found", ja: "ページが見つかりません" },
  "nf.desc": {
    zh: "你来的这一页好像不存在 :(",
    en: "Looks like this page doesn't exist :(",
    ja: "このページは存在しないようです :(",
  },
  "nf.backHome": { zh: "回到首页", en: "Back to home", ja: "ホームへ" },
} satisfies Record<string, LocalizedText>;

export type DictKey = keyof typeof dict;

// ==================== 工具函数 ====================
/**
 * 从 LocalizedText / LocalizedTextArray 中取出当前语言的值
 * 不存在的语言会回退到 zh，这样数据缺漏不会让页面变空
 */
export function pickLang<T extends string | string[]>(
  field: Record<Lang, T>,
  lang: Lang
): T {
  return field[lang] ?? field.zh;
}

// 简单插值：把 "{name}" 替换为 vars.name
function interpolate(s: string, vars?: Record<string, string | number>) {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

// ==================== Hook ====================
/**
 * useT：在组件里调用，得到当前语言、翻译函数、原始 picker
 *
 * 用法：
 *   const { t, lang, pick } = useT();
 *   t("nav.home")            // "首页" / "Home" / "ホーム"
 *   pick(work.title)         // 自动取出当前语言下的标题
 */
export function useT() {
  const lang = useUIStore((s) => s.language);

  const t = (key: DictKey, vars?: Record<string, string | number>) => {
    const entry = dict[key];
    return interpolate(entry[lang] ?? entry.zh, vars);
  };

  const pick = <T extends string | string[]>(
    field: LocalizedText | LocalizedTextArray | Record<Lang, T>
  ) => {
    return pickLang(field as Record<Lang, T>, lang);
  };

  return { t, lang, pick };
}

// ==================== 语言展示信息（给切换器用） ====================
export const LANG_LABELS: Record<Lang, { short: string; full: string }> = {
  zh: { short: "中", full: "中文" },
  en: { short: "EN", full: "English" },
  ja: { short: "日", full: "日本語" },
};
