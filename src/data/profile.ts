/**
 * 个人信息数据
 * 来源：项目背景文档中的设计师自述
 */
import type { ProfileInfo } from "./types";

export const profile: ProfileInfo = {
  name: "Old_glasses",
  handle: "@Old_glasses",
  slogan: "With Creative From Heart.",
  bio: [
    "独立设计师，聚焦于体验设计和创意设计，致力于做\"实用主义\"的设计。",
    "从 2016 年开始服务于大型互联网公司的视觉设计工作。我喜欢好看的任何东西，当然——也喜欢猫。",
    "我的作品范围涉及 动画、UI/UX 体验设计、视频制作、平面设计 等等，希望每一次产出都能让屏幕另一端的人会心一笑。",
  ],
  keywords: [
    "实用主义",
    "体验设计",
    "创意设计",
    "动画",
    "视频",
    "平面",
    "猫派",
    "Heart-Driven",
  ],
  timeline: [
    {
      year: "2016",
      title: "踏入设计行业",
      desc: "加入大型互联网公司，开始系统性的视觉设计工作。",
    },
    {
      year: "2018",
      title: "聚焦体验设计",
      desc: "从纯视觉拓展到 UI/UX，开始关注产品的整体体验。",
    },
    {
      year: "2020",
      title: "动画 & 视频探索",
      desc: "尝试动效、品牌动画与视频内容，让设计动起来。",
    },
    {
      year: "2023",
      title: "成为独立设计师",
      desc: "为不同行业的品牌提供创意与体验设计服务。",
    },
    {
      year: "Now",
      title: "持续创作",
      desc: "With Creative From Heart.",
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
