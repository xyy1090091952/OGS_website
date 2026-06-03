/**
 * 作品集 Mock 数据
 * 后续替换为真实作品时，仅修改本文件 + 上传图片即可
 *
 * 缩略图使用 text_to_image 接口生成，符合站点 "实用主义 + 创意" 的视觉调性
 */
import { WORK_CATEGORIES, type Work } from "./types";

// 工具：构造 text_to_image URL，统一在此处管理（常量化 / 抽象数据层）
const img = (prompt: string, size: string = "landscape_4_3") =>
  `https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt
  )}&image_size=${size}`;

export const works: Work[] = [
  {
    slug: "moonlight-app",
    title: "Moonlight · 夜间冥想 App",
    category: WORK_CATEGORIES.UIUX,
    year: 2024,
    client: "Moonlight Studio",
    thumbAspect: "portrait",
    cover: img(
      "Minimal dark UI design mockup of a meditation app on iPhone, gradient deep navy and warm amber, soft serif typography, editorial layout, high end product photography",
      "portrait_4_3"
    ),
    tags: ["UI", "Mobile", "Brand"],
    summary: "为一款夜间冥想 App 设计的视觉与交互系统，强调宁静与陪伴。",
    accentBg: "#1B1F3A",
    accentFg: "#F4E1B5",
    contents: [
      {
        type: "text",
        content:
          "Moonlight 是一个面向夜晚的冥想 App，希望让用户在入睡前感到陪伴而非孤独。我从月光的形态出发，设计了一套柔和的渐变色与微妙的交互动效。",
      },
      {
        type: "image",
        alt: "Moonlight App 主屏与音频卡片",
        src: img(
          "Editorial mobile app screens showcase, dark blue gradient background, glowing moon shape, modern serif typography, high end design portfolio shot",
          "landscape_16_9"
        ),
      },
      {
        type: "image-pair",
        left: img(
          "Mobile UI screen design with soft glowing crescent moon and audio waveform, dark navy background, premium",
          "portrait_4_3"
        ),
        right: img(
          "Mobile UI screen design timer breathing exercise, dark blue gradient, minimal interface, premium",
          "portrait_4_3"
        ),
      },
      {
        type: "text",
        content:
          "整体节奏控制在「呼吸」的频率上：每个按钮按下时会有一次轻微缩放，像在回应你的触碰。",
      },
    ],
  },
  {
    slug: "kira-brand",
    title: "Kira · 独立咖啡品牌",
    category: WORK_CATEGORIES.GRAPHIC,
    year: 2024,
    client: "Kira Coffee",
    thumbAspect: "square",
    cover: img(
      "Minimal coffee brand identity mockup, beige and burnt orange color palette, custom serif logo on a paper bag, photographed editorial style, soft natural light",
      "square"
    ),
    tags: ["Branding", "Print", "Logo"],
    summary: "一家独立精品咖啡馆的整套品牌系统，温暖、克制、有手作感。",
    accentBg: "#F4E1C9",
    accentFg: "#3A1F0F",
    contents: [
      {
        type: "text",
        content:
          "Kira 是一家位于巷口的独立咖啡馆。我们希望品牌呈现出 \"刚烘焙完一壶豆子\" 的温热感，所以从颜色到字形都偏向温暖、手作。",
      },
      {
        type: "image",
        alt: "Kira 品牌应用",
        src: img(
          "Coffee shop branding application photography, beige paper coffee cups with serif logo, lifestyle editorial",
          "landscape_16_9"
        ),
      },
    ],
  },
  {
    slug: "wave-motion",
    title: "Wave · 品牌动画系统",
    category: WORK_CATEGORIES.ANIMATION,
    year: 2023,
    client: "Wave Tech",
    thumbAspect: "landscape",
    cover: img(
      "Abstract motion design still frame, gradient teal and orange flowing wave shapes, premium cinema 4d render, soft studio light",
      "landscape_16_9"
    ),
    // 详情页 Banner 使用视频背景做演示（公开 sample 视频，未来可换成自己作品的成片）
    bannerVideo:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    tags: ["Motion", "Brand", "3D"],
    summary: "为科技品牌设计的一套可衍生的品牌动画语言，覆盖从 logo 到全屏过渡。",
    accentBg: "#0F2A2B",
    accentFg: "#FFB347",
    contents: [
      {
        type: "text",
        content:
          "我们希望让品牌 Logo 能够 \"被使用\" 而不仅是 \"被印在角落\"。于是我们建立了一套形变系统：Logo 可以变成进度条、加载圈、过场图形。",
      },
      {
        type: "image",
        alt: "Wave 动画过场",
        src: img(
          "Brand motion design transition keyframes, abstract teal liquid flowing into letters, cinematic render",
          "landscape_16_9"
        ),
      },
    ],
  },
  {
    slug: "northern-doc",
    title: "北纬 · 短纪录片",
    category: WORK_CATEGORIES.VIDEO,
    year: 2023,
    thumbAspect: "landscape",
    cover: img(
      "Cinematic still from a documentary, snowy northern landscape, lone figure walking, anamorphic lens, warm sun, film grain",
      "landscape_16_9"
    ),
    tags: ["Documentary", "Direction"],
    summary: "一部关于北方小城的短纪录片：关于离开的人、留下的人，以及风。",
    accentBg: "#1A2230",
    accentFg: "#F4F1EC",
    contents: [
      {
        type: "text",
        content:
          "拍摄历时 3 个月，足迹覆盖东北六城。我们想用最朴素的方式记录下来——没有戏剧化的剪辑，只有时间。",
      },
      {
        type: "image",
        alt: "纪录片剧照",
        src: img(
          "Cinematic documentary still snowy quiet street old buildings, warm golden hour, film",
          "landscape_16_9"
        ),
      },
    ],
  },
  {
    slug: "atelier-portfolio",
    title: "Atelier · 设计工作室官网",
    category: WORK_CATEGORIES.UIUX,
    year: 2024,
    client: "Atelier Studio",
    thumbAspect: "portrait",
    cover: img(
      "High end design studio website mockup on a laptop, editorial layout, large serif headline, off-white background, refined typography",
      "portrait_4_3"
    ),
    tags: ["Web", "UX", "Animation"],
    summary: "为一家创意工作室重做的官网，强调编辑感、负空间与微妙动效。",
    accentBg: "#EDE7DD",
    accentFg: "#1F1F1F",
    contents: [
      {
        type: "text",
        content:
          "原网站是一个非常 \"工程师味\" 的网格布局。我们希望它更像一本杂志——大字号、纵向排版、慢慢翻阅的节奏。",
      },
      {
        type: "image",
        alt: "Atelier Web 界面",
        src: img(
          "Design studio website hero section editorial layout, large serif headline, off white background, magazine style",
          "landscape_16_9"
        ),
      },
    ],
  },
  {
    slug: "tofu-illustration",
    title: "豆腐先生 · 系列插画",
    category: WORK_CATEGORIES.GRAPHIC,
    year: 2022,
    thumbAspect: "square",
    cover: img(
      "Cute character illustration of a tofu cube with a face, pastel beige background, modern flat design, friendly playful",
      "square"
    ),
    tags: ["Illustration", "Character"],
    summary: "一组围绕 \"豆腐先生\" 的日常插画，记录都市生活中的小情绪。",
    accentBg: "#F1ECE0",
    accentFg: "#5A3A2A",
    contents: [
      {
        type: "text",
        content:
          "豆腐先生是一个虚构的角色，它柔软、易碎，但每天都坚持出门。它代表了我们大多数人。",
      },
      {
        type: "image",
        alt: "豆腐先生插画",
        src: img(
          "Series of cute tofu character illustrations daily life moments, soft beige and warm tones, flat design",
          "landscape_16_9"
        ),
      },
    ],
  },
  {
    slug: "aurora-dashboard",
    title: "Aurora · B 端数据后台",
    category: WORK_CATEGORIES.UIUX,
    year: 2023,
    client: "Aurora Cloud",
    thumbAspect: "landscape",
    cover: img(
      "Modern B2B SaaS dashboard UI design, light theme, blue accents, clean data visualization, premium typography, screen mockup",
      "landscape_16_9"
    ),
    tags: ["Dashboard", "B-End", "Data Viz"],
    summary: "为一款云服务设计的数据后台，强调信息密度与可读性。",
    accentBg: "#E6ECF5",
    accentFg: "#1A2E5A",
    contents: [
      {
        type: "text",
        content: "B 端的克制不是无聊，而是把有限的注意力让给数据。",
      },
      {
        type: "image",
        alt: "Aurora 后台界面",
        src: img(
          "B2B SaaS dashboard interface light blue theme data charts metrics, modern clean design",
          "landscape_16_9"
        ),
      },
    ],
  },
  {
    slug: "letter-motion",
    title: "字母游戏 · 动效实验",
    category: WORK_CATEGORIES.ANIMATION,
    year: 2024,
    thumbAspect: "square",
    cover: img(
      "Kinetic typography poster motion design still, big serif letters morphing into shapes, warm cream background, editorial",
      "square"
    ),
    tags: ["Motion", "Type"],
    summary: "26 个字母 × 26 种动效的小练习，每天一个。",
    accentBg: "#F4F1EC",
    accentFg: "#FF5722",
    contents: [
      {
        type: "text",
        content: "这是一个长期的小练习，目的是把字母变得不像字母——但一眼仍能认出来。",
      },
      {
        type: "image",
        alt: "字母动效",
        src: img(
          "Series of kinetic typography letters keyframes A through Z motion design",
          "landscape_16_9"
        ),
      },
    ],
  },
];
