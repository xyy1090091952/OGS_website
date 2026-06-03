/**
 * 服务能力数据（多语言）
 */
import type { ServiceItem } from "./types";

export const services: ServiceItem[] = [
  {
    id: "experience",
    num: "01",
    title: {
      zh: "体验设计",
      en: "Experience Design",
      ja: "体験デザイン",
    },
    desc: {
      zh: "从信息架构到细节交互，让产品好用又有温度。",
      en: "From information architecture to micro interactions — useful and warm.",
      ja: "情報設計から細部のインタラクションまで、使いやすく温かい体験を。",
    },
    bullets: {
      zh: ["UX 研究", "用户旅程", "交互设计", "设计系统"],
      en: ["UX Research", "User Journey", "Interaction", "Design System"],
      ja: ["UX 調査", "ユーザー旅程", "インタラクション", "デザインシステム"],
    },
  },
  {
    id: "ui",
    num: "02",
    title: {
      zh: "界面与品牌",
      en: "UI & Brand",
      ja: "UI とブランド",
    },
    desc: {
      zh: "为不同行业的品牌建立独特的视觉语言。",
      en: "Crafting a unique visual language for brands across industries.",
      ja: "業界を横断するブランドのために独自のビジュアルを構築。",
    },
    bullets: {
      zh: ["UI 视觉", "品牌识别", "Logo / VI", "插画系统"],
      en: ["UI Visual", "Brand Identity", "Logo / VI", "Illustration"],
      ja: ["UI ビジュアル", "ブランド", "ロゴ / VI", "イラスト"],
    },
  },
  {
    id: "motion",
    num: "03",
    title: {
      zh: "动画与动效",
      en: "Motion & Animation",
      ja: "モーション",
    },
    desc: {
      zh: "让品牌动起来——从 Logo 演绎到产品过场。",
      en: "Bringing brands to life — from logo reveal to product transitions.",
      ja: "ブランドを動かす──ロゴ演出からプロダクト遷移まで。",
    },
    bullets: {
      zh: ["品牌动画", "UI 动效", "Loading", "过渡效果"],
      en: ["Brand Anim.", "UI Motion", "Loading", "Transitions"],
      ja: ["ブランド演出", "UI モーション", "ローディング", "トランジション"],
    },
  },
  {
    id: "video",
    num: "04",
    title: {
      zh: "视频与剪辑",
      en: "Video & Editing",
      ja: "映像と編集",
    },
    desc: {
      zh: "短片、纪录片、产品宣传片的全流程创作。",
      en: "Short films, documentaries and product films — end to end.",
      ja: "ショートフィルム、ドキュメンタリー、PV を一気通貫で。",
    },
    bullets: {
      zh: ["短片", "宣传片", "纪录片", "剪辑/调色"],
      en: ["Short Film", "Brand Film", "Documentary", "Edit / Color"],
      ja: ["短編", "PV", "ドキュメンタリー", "編集/カラー"],
    },
  },
];
