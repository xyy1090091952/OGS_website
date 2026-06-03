/**
 * 数据模型类型定义
 * 注意：所有作品分类都通过常量化管理，避免散落字符串
 */

// 作品分类（使用 as const 让值变为字面量类型）
export const WORK_CATEGORIES = {
  ALL: "All",
  UIUX: "UI/UX",
  ANIMATION: "Animation",
  VIDEO: "Video",
  GRAPHIC: "Graphic",
} as const;

export type WorkCategory =
  (typeof WORK_CATEGORIES)[keyof typeof WORK_CATEGORIES];

// 缩略图比例（用于不规则网格布局）
export type ThumbAspect = "square" | "portrait" | "landscape";

// 详情页内容块（不同 type 渲染不同形态）
export type WorkContent =
  | { type: "image"; src: string; alt: string }
  | { type: "image-pair"; left: string; right: string; alt?: string }
  | { type: "video"; src: string; poster?: string }
  | { type: "text"; content: string };

// 单个作品
export interface Work {
  slug: string; // URL 唯一标识
  title: string; // 作品标题
  category: Exclude<WorkCategory, "All">; // 分类（不含 All）
  year: number; // 年份
  client?: string; // 客户/合作方
  cover: string; // 封面（用于网格缩略图）
  // 详情页顶部 banner 视频（可选；提供时优先于 cover 大图作为背景）
  bannerVideo?: string;
  thumbAspect: ThumbAspect; // 网格中卡片的比例
  tags: string[]; // 标签
  summary: string; // 一句话简介
  contents: WorkContent[]; // 详情页内容
  // 视觉装饰：每个作品自定义底色与字色，让网格更有层次
  accentBg?: string;
  accentFg?: string;
}

// 时间线节点
export interface TimelineItem {
  year: string;
  title: string;
  desc?: string;
}

// 社交链接
export interface SocialLink {
  label: string;
  url: string;
  // Lucide 图标 key（运行时由 icon-map 转换为组件）
  icon: "instagram" | "twitter" | "github" | "behance" | "dribbble" | "mail";
}

// 服务能力（一项服务）
export interface ServiceItem {
  id: string;
  // 编号，如 "01" / "02"
  num: string;
  title: string;
  // 短描述
  desc: string;
  // 配套关键词，鼠标悬停时显示
  bullets: string[];
}

// 合作品牌（用于墙）
export interface ClientItem {
  name: string;
  // 行业/类型标签，如 "Tech" / "Lifestyle"
  industry: string;
}

// 个人信息
export interface ProfileInfo {
  name: string;
  handle: string; // @Old_glasses
  slogan: string;
  bio: string[];
  keywords: string[];
  timeline: TimelineItem[];
  socials: SocialLink[];
  email: string;
}
