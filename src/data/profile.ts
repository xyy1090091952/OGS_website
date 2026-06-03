/**
 * 个人信息数据（多语言）
 * 三语字段使用 { zh, en, ja } 形式集中管理；
 * 组件通过 useT().pick(field) 取当前语言的值。
 */
import type { ProfileInfo } from "./types";

export const profile: ProfileInfo = {
  name: "Old_glasses",
  handle: "@Old_glasses",
  // 英文 slogan，所有语言共用（保持品牌一致性）
  slogan: "With Creative From Heart.",
  bio: {
    zh: [
      "独立设计师，聚焦于体验设计和创意设计，致力于做\u201C实用主义\u201D的设计。",
      "从 2016 年开始服务于大型互联网公司的视觉设计工作。我喜欢好看的任何东西，当然——也喜欢猫。",
      "我的作品范围涉及 动画、UI/UX 体验设计、视频制作、平面设计 等等，希望每一次产出都能让屏幕另一端的人会心一笑。",
    ],
    en: [
      "Independent designer focused on experience and creative design, pursuing pragmatic design that just works.",
      "Since 2016 I've been doing visual design for major internet companies. I love beautiful things — and yes, cats.",
      "My work spans motion, UI/UX, video and graphic design. I hope each piece can quietly make someone smile.",
    ],
    ja: [
      "インディペンデントデザイナー。体験デザインとクリエイティブデザインを軸に、\u300C実用主義\u300Dのデザインを目指しています。",
      "2016 年から大手インターネット企業のビジュアルデザインに携わっています。美しいものが好きで、猫はもちろん大好物。",
      "アニメーション、UI/UX、映像、グラフィックなど幅広く制作。画面の向こうの誰かが、ふと微笑んでくれたら嬉しい。",
    ],
  },
  keywords: {
    zh: ["实用主义", "体验设计", "创意设计", "动画", "视频", "平面", "猫派", "Heart-Driven"],
    en: ["Pragmatic", "UX", "Creative", "Motion", "Video", "Graphic", "Cat Lover", "Heart-Driven"],
    ja: ["実用主義", "UX", "クリエイティブ", "モーション", "ビデオ", "グラフィック", "ネコ派", "Heart-Driven"],
  },
  timeline: [
    {
      year: "2016",
      title: {
        zh: "踏入设计行业",
        en: "Stepping into design",
        ja: "デザイン業界へ",
      },
      desc: {
        zh: "加入大型互联网公司，开始系统性的视觉设计工作。",
        en: "Joined a major internet company and started systematic visual design work.",
        ja: "大手インターネット企業に入社、ビジュアルデザインを本格スタート。",
      },
    },
    {
      year: "2018",
      title: {
        zh: "聚焦体验设计",
        en: "Focused on UX",
        ja: "UX へフォーカス",
      },
      desc: {
        zh: "从纯视觉拓展到 UI/UX，开始关注产品的整体体验。",
        en: "Expanded from pure visuals to UI/UX, caring about the whole product experience.",
        ja: "ビジュアルから UI/UX まで広げ、プロダクト体験全体を意識し始める。",
      },
    },
    {
      year: "2020",
      title: {
        zh: "动画 & 视频探索",
        en: "Motion & video exploration",
        ja: "モーションと映像の探求",
      },
      desc: {
        zh: "尝试动效、品牌动画与视频内容，让设计动起来。",
        en: "Trying motion design, brand animation and video content — making design move.",
        ja: "モーション、ブランドアニメ、映像コンテンツに挑戦。デザインを動かす。",
      },
    },
    {
      year: "2023",
      title: {
        zh: "成为独立设计师",
        en: "Going independent",
        ja: "独立デザイナーへ",
      },
      desc: {
        zh: "为不同行业的品牌提供创意与体验设计服务。",
        en: "Providing creative and experience design for brands across industries.",
        ja: "様々な業界のブランドにクリエイティブと体験デザインを提供。",
      },
    },
    {
      year: "Now",
      title: {
        zh: "持续创作",
        en: "Still creating",
        ja: "今も創作中",
      },
      desc: {
        zh: "With Creative From Heart.",
        en: "With Creative From Heart.",
        ja: "With Creative From Heart.",
      },
    },
  ],
  socials: [
    { label: "Behance", url: "https://www.behance.net/", icon: "behance" },
    { label: "Dribbble", url: "https://dribbble.com/", icon: "dribbble" },
    { label: "Instagram", url: "https://www.instagram.com/", icon: "instagram" },
    { label: "Twitter", url: "https://twitter.com/", icon: "twitter" },
  ],
  email: "hello@oldglasses.design",
};
