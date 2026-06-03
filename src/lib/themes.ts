/**
 * 主题色（强调色）预设
 * - 每套主题包含一个完整调色板：accent（主色）+ accent2（辅色）+ bgTint（背景微调）
 * - light / dark 两种模式各一份；暗色版整体提亮一档，避免发闷
 * - 数据访问层抽象：换皮只改本文件，不动组件
 *
 * 设计原则：
 *   1. 主色与辅色之间相邻或互补，但保持低饱和度，避免廉价感
 *   2. 双色用于背景径向光晕（参考 base44.com 的"双色柔光"）
 *   3. bgTint 用于把整体底色拉向调色板气质（暖/冷/中性）
 */

// 主题色 ID 常量化，避免散落字符串
export const ACCENT_PRESETS = [
  "sunset",   // 暖橙 + 蜜桃 —— 温暖、文艺、默认
  "forest",   // 鼠尾草 + 米杏 —— 自然、克制（base44 同款气质）
  "ocean",    // 雾蓝 + 淡紫 —— 清冷、未来
] as const;

export type AccentId = (typeof ACCENT_PRESETS)[number];

// 单个模式（light/dark）下的完整色板
interface PaletteSet {
  // 主强调色：用于 text-accent / bg-accent / border-accent
  accent: string;
  // 辅强调色：用于渐变第二点、点缀
  accent2: string;
  // 背景底色微调：写到 --bg 变量（与主题气质协调，但克制不抢戏）
  bg: string;
  // 字色保持高对比度，但跟随主题略偏调（暖主题偏深棕，冷主题偏深蓝）
  fg: string;
  // 卡片底色（用于 hover 时的浅层背景）
  card: string;
}

// 单个主题的元信息
export interface AccentPreset {
  id: AccentId;
  // 显示给用户的标签
  label: string;
  // UI 圆点示意色（双色，分别对应 accent / accent2 在 light 下的取值）
  swatch: { from: string; to: string };
  // light / dark 两套调色板
  light: PaletteSet;
  dark: PaletteSet;
}

// ==================== 主题预设字典 ====================
// RGB 用空格分隔的字符串，与 CSS 变量格式一致：rgb(var(--accent))
export const ACCENTS: Record<AccentId, AccentPreset> = {
  // ----- 1. Sunset 暖橙 + 蜜桃 -----
  sunset: {
    id: "sunset",
    label: "Sunset",
    swatch: { from: "#FF5722", to: "#FFC4A1" },
    light: {
      accent: "255 87 34",   // #FF5722 炙橙
      accent2: "255 196 161", // #FFC4A1 蜜桃
      bg: "246 240 232",     // #F6F0E8 暖米白
      fg: "28 22 18",        // #1C1612 偏暖深棕
      card: "255 251 246",   // #FFFBF6 米白
    },
    dark: {
      accent: "255 179 71",  // #FFB347 暖琥珀
      accent2: "255 138 107", // #FF8A6B 珊瑚
      bg: "20 16 14",        // #14100E 暖夜黑
      fg: "240 232 222",     // #F0E8DE 暖月白
      card: "30 24 22",      // #1E1816
    },
  },

  // ----- 2. Forest 鼠尾草 + 米杏（base44 同款气质）-----
  forest: {
    id: "forest",
    label: "Forest",
    swatch: { from: "#5C8D6E", to: "#D9C7A1" },
    light: {
      accent: "92 141 110",  // #5C8D6E 鼠尾草绿
      accent2: "217 199 161", // #D9C7A1 米杏
      bg: "242 240 232",     // #F2F0E8 灰米白（带绿调）
      fg: "26 30 26",        // #1A1E1A 偏冷深绿黑
      card: "252 251 246",   // #FCFBF6
    },
    dark: {
      accent: "156 201 168", // #9CC9A8 薄荷
      accent2: "201 179 147", // #C9B393 暖沙
      bg: "16 18 16",        // #101210 林夜黑
      fg: "232 234 226",     // #E8EAE2
      card: "24 28 24",      // #181C18
    },
  },

  // ----- 3. Ocean 雾蓝 + 淡紫 -----
  ocean: {
    id: "ocean",
    label: "Ocean",
    swatch: { from: "#5B7FE0", to: "#B5A7E8" },
    light: {
      accent: "91 127 224",  // #5B7FE0 雾蓝
      accent2: "181 167 232", // #B5A7E8 淡紫
      bg: "238 240 246",     // #EEF0F6 冷米白
      fg: "20 22 32",        // #141620 偏冷深靛
      card: "250 251 254",   // #FAFBFE
    },
    dark: {
      accent: "155 177 255", // #9BB1FF 北极蓝
      accent2: "200 183 255", // #C8B7FF 雾紫
      bg: "12 14 22",        // #0C0E16 海夜黑
      fg: "228 230 240",     // #E4E6F0
      card: "20 22 32",      // #141620
    },
  },
};

// 默认主题色（保持原网站气质）
export const DEFAULT_ACCENT: AccentId = "sunset";

// 当前模式下取出某个主题的色板
export function getPalette(id: AccentId, theme: "light" | "dark"): PaletteSet {
  const preset = ACCENTS[id] ?? ACCENTS[DEFAULT_ACCENT];
  return theme === "dark" ? preset.dark : preset.light;
}
