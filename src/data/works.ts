/**
 * 作品集 Mock 数据（多语言）
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
    title: {
      zh: "Moonlight · 夜间冥想 App",
      en: "Moonlight · Night Meditation App",
      ja: "Moonlight · 夜の瞑想アプリ",
    },
    category: WORK_CATEGORIES.UIUX,
    year: 2024,
    client: "Moonlight Studio",
    thumbAspect: "portrait",
    cover: img(
      "Minimal dark UI design mockup of a meditation app on iPhone, gradient deep navy and warm amber, soft serif typography, editorial layout, high end product photography",
      "portrait_4_3"
    ),
    tags: ["UI", "Mobile", "Brand"],
    summary: {
      zh: "为一款夜间冥想 App 设计的视觉与交互系统，强调宁静与陪伴。",
      en: "Visual and interaction system for a night-time meditation app — calm, companionship.",
      ja: "夜の瞑想アプリのビジュアルとインタラクション。静けさと寄り添いを大切に。",
    },
    accentBg: "#1B1F3A",
    accentFg: "#F4E1B5",
    contents: [
      {
        type: "text",
        content: {
          zh: "Moonlight 是一个面向夜晚的冥想 App，希望让用户在入睡前感到陪伴而非孤独。我从月光的形态出发，设计了一套柔和的渐变色与微妙的交互动效。",
          en: "Moonlight is a meditation app made for the night — to feel accompanied rather than alone before sleep. Starting from the shape of moonlight, I built a gentle gradient palette with subtle motion.",
          ja: "Moonlight は夜のための瞑想アプリ。眠る前に一人じゃなく寄り添いを感じてほしい。月の光の形を起点に、柔らかなグラデーションと繊細なモーションを設計しました。",
        },
      },
      {
        type: "image",
        alt: {
          zh: "Moonlight App 主屏与音频卡片",
          en: "Moonlight app home screen and audio card",
          ja: "Moonlight アプリのホームとオーディオカード",
        },
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
        content: {
          zh: "整体节奏控制在「呼吸」的频率上：每个按钮按下时会有一次轻微缩放，像在回应你的触碰。",
          en: "The overall rhythm follows breathing: every tap responds with a tiny scale — like the app is breathing back.",
          ja: "全体のリズムは「呼吸」に合わせて。タップするたびにわずかにスケールし、アプリが息づいているような感覚に。",
        },
      },
    ],
  },
  {
    slug: "kira-brand",
    title: {
      zh: "Kira · 独立咖啡品牌",
      en: "Kira · Independent Coffee Brand",
      ja: "Kira · インディペンデントコーヒー",
    },
    category: WORK_CATEGORIES.GRAPHIC,
    year: 2024,
    client: "Kira Coffee",
    thumbAspect: "square",
    cover: img(
      "Minimal coffee brand identity mockup, beige and burnt orange color palette, custom serif logo on a paper bag, photographed editorial style, soft natural light",
      "square"
    ),
    tags: ["Branding", "Print", "Logo"],
    summary: {
      zh: "一家独立精品咖啡馆的整套品牌系统，温暖、克制、有手作感。",
      en: "A full brand system for a small specialty coffee shop — warm, restrained, hand-crafted.",
      ja: "小さなスペシャルティコーヒーショップのブランド一式。温かく、控えめで、手仕事感のある仕上がり。",
    },
    accentBg: "#F4E1C9",
    accentFg: "#3A1F0F",
    contents: [
      {
        type: "text",
        content: {
          zh: "Kira 是一家位于巷口的独立咖啡馆。我们希望品牌呈现出 \u201C刚烘焙完一壶豆子\u201D 的温热感，所以从颜色到字形都偏向温暖、手作。",
          en: "Kira is a tiny coffee shop on a corner. We wanted the brand to feel like a freshly roasted batch of beans — warm, hand-made — from palette to typography.",
          ja: "Kira は路地の小さなカフェ。\u300C焙煎したての豆\u300Dのような温かさをブランドに込めたく、色も書体も手仕事寄りに。",
        },
      },
      {
        type: "image",
        alt: {
          zh: "Kira 品牌应用",
          en: "Kira brand applications",
          ja: "Kira ブランド展開",
        },
        src: img(
          "Coffee shop branding application photography, beige paper coffee cups with serif logo, lifestyle editorial",
          "landscape_16_9"
        ),
      },
    ],
  },
  {
    slug: "wave-motion",
    title: {
      zh: "Wave · 品牌动画系统",
      en: "Wave · Brand Motion System",
      ja: "Wave · ブランドモーションシステム",
    },
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
    summary: {
      zh: "为科技品牌设计的一套可衍生的品牌动画语言，覆盖从 logo 到全屏过渡。",
      en: "An extensible motion language for a tech brand — from logo reveal to fullscreen transitions.",
      ja: "テックブランドのための拡張可能なモーション言語。ロゴ演出から全画面遷移まで。",
    },
    accentBg: "#0F2A2B",
    accentFg: "#FFB347",
    contents: [
      {
        type: "text",
        content: {
          zh: "我们希望让品牌 Logo 能够 \u201C被使用\u201D 而不仅是 \u201C被印在角落\u201D。于是我们建立了一套形变系统：Logo 可以变成进度条、加载圈、过场图形。",
          en: "We wanted the logo to be 'usable', not just printed in a corner. So we built a morph system: it becomes progress bars, loaders and transitions.",
          ja: "ロゴを\u300C片隅に置くもの\u300Dではなく\u300C使うもの\u300Dに。プログレス、ローダー、トランジションへ変形するモーフシステムを構築。",
        },
      },
      {
        type: "image",
        alt: {
          zh: "Wave 动画过场",
          en: "Wave motion transition",
          ja: "Wave モーション遷移",
        },
        src: img(
          "Brand motion design transition keyframes, abstract teal liquid flowing into letters, cinematic render",
          "landscape_16_9"
        ),
      },
    ],
  },
  {
    slug: "northern-doc",
    title: {
      zh: "北纬 · 短纪录片",
      en: "Northern · Short Documentary",
      ja: "北緯 · ショートドキュメンタリー",
    },
    category: WORK_CATEGORIES.VIDEO,
    year: 2023,
    thumbAspect: "landscape",
    cover: img(
      "Cinematic still from a documentary, snowy northern landscape, lone figure walking, anamorphic lens, warm sun, film grain",
      "landscape_16_9"
    ),
    tags: ["Documentary", "Direction"],
    summary: {
      zh: "一部关于北方小城的短纪录片：关于离开的人、留下的人，以及风。",
      en: "A short documentary about a northern town — those who left, those who stayed, and the wind.",
      ja: "北の小さな町を巡るショートドキュメンタリー。去った人、残った人、そして風。",
    },
    accentBg: "#1A2230",
    accentFg: "#F4F1EC",
    contents: [
      {
        type: "text",
        content: {
          zh: "拍摄历时 3 个月，足迹覆盖东北六城。我们想用最朴素的方式记录下来——没有戏剧化的剪辑，只有时间。",
          en: "Three months of shooting across six cities in northeast China. We wanted a plain record — no dramatic cuts, just time.",
          ja: "撮影は 3 ヶ月、東北 6 都市を巡りました。劇的な編集ではなく、ただ時間を素直に記録すること。",
        },
      },
      {
        type: "image",
        alt: {
          zh: "纪录片剧照",
          en: "Documentary still",
          ja: "ドキュメンタリーのスチル",
        },
        src: img(
          "Cinematic documentary still snowy quiet street old buildings, warm golden hour, film",
          "landscape_16_9"
        ),
      },
    ],
  },
  {
    slug: "atelier-portfolio",
    title: {
      zh: "Atelier · 设计工作室官网",
      en: "Atelier · Design Studio Site",
      ja: "Atelier · デザインスタジオ Web",
    },
    category: WORK_CATEGORIES.UIUX,
    year: 2024,
    client: "Atelier Studio",
    thumbAspect: "portrait",
    cover: img(
      "High end design studio website mockup on a laptop, editorial layout, large serif headline, off-white background, refined typography",
      "portrait_4_3"
    ),
    tags: ["Web", "UX", "Animation"],
    summary: {
      zh: "为一家创意工作室重做的官网，强调编辑感、负空间与微妙动效。",
      en: "A new site for a creative studio — editorial, generous whitespace, subtle motion.",
      ja: "クリエイティブスタジオの公式サイトを刷新。エディトリアル、余白、繊細なモーション。",
    },
    accentBg: "#EDE7DD",
    accentFg: "#1F1F1F",
    contents: [
      {
        type: "text",
        content: {
          zh: "原网站是一个非常 \u201C工程师味\u201D 的网格布局。我们希望它更像一本杂志——大字号、纵向排版、慢慢翻阅的节奏。",
          en: "The original site was very 'engineering grid'. We wanted it to feel like a magazine — large type, vertical rhythm, slow reading.",
          ja: "従来のサイトは\u300Cエンジニア的なグリッド\u300D。雑誌のように大きな見出し、縦のリズム、ゆっくり読む速度感を目指しました。",
        },
      },
      {
        type: "image",
        alt: {
          zh: "Atelier Web 界面",
          en: "Atelier web interface",
          ja: "Atelier Web インターフェース",
        },
        src: img(
          "Design studio website hero section editorial layout, large serif headline, off white background, magazine style",
          "landscape_16_9"
        ),
      },
    ],
  },
  {
    slug: "tofu-illustration",
    title: {
      zh: "豆腐先生 · 系列插画",
      en: "Mr. Tofu · Illustration Series",
      ja: "とうふ氏 · イラストシリーズ",
    },
    category: WORK_CATEGORIES.GRAPHIC,
    year: 2022,
    thumbAspect: "square",
    cover: img(
      "Cute character illustration of a tofu cube with a face, pastel beige background, modern flat design, friendly playful",
      "square"
    ),
    tags: ["Illustration", "Character"],
    summary: {
      zh: "一组围绕 \u201C豆腐先生\u201D 的日常插画，记录都市生活中的小情绪。",
      en: "A series of daily illustrations about 'Mr. Tofu' — small feelings of city life.",
      ja: "\u300Cとうふ氏\u300Dをめぐる日常イラスト。都市生活のささやかな感情を記録。",
    },
    accentBg: "#F1ECE0",
    accentFg: "#5A3A2A",
    contents: [
      {
        type: "text",
        content: {
          zh: "豆腐先生是一个虚构的角色，它柔软、易碎，但每天都坚持出门。它代表了我们大多数人。",
          en: "Mr. Tofu is a fictional character — soft, fragile, but he goes out every day. He stands for most of us.",
          ja: "とうふ氏は架空のキャラクター。柔らかくて壊れやすいけど、毎日ちゃんと外へ。私たちの多くを映しています。",
        },
      },
      {
        type: "image",
        alt: {
          zh: "豆腐先生插画",
          en: "Mr. Tofu illustrations",
          ja: "とうふ氏イラスト",
        },
        src: img(
          "Series of cute tofu character illustrations daily life moments, soft beige and warm tones, flat design",
          "landscape_16_9"
        ),
      },
    ],
  },
  {
    slug: "aurora-dashboard",
    title: {
      zh: "Aurora · B 端数据后台",
      en: "Aurora · B2B Data Dashboard",
      ja: "Aurora · B 向けダッシュボード",
    },
    category: WORK_CATEGORIES.UIUX,
    year: 2023,
    client: "Aurora Cloud",
    thumbAspect: "landscape",
    cover: img(
      "Modern B2B SaaS dashboard UI design, light theme, blue accents, clean data visualization, premium typography, screen mockup",
      "landscape_16_9"
    ),
    tags: ["Dashboard", "B-End", "Data Viz"],
    summary: {
      zh: "为一款云服务设计的数据后台，强调信息密度与可读性。",
      en: "A data dashboard for a cloud service — high density, high readability.",
      ja: "クラウドサービスのデータダッシュボード。高密度かつ読みやすさを両立。",
    },
    accentBg: "#E6ECF5",
    accentFg: "#1A2E5A",
    contents: [
      {
        type: "text",
        content: {
          zh: "B 端的克制不是无聊，而是把有限的注意力让给数据。",
          en: "B2B restraint isn't boring — it's giving limited attention back to the data.",
          ja: "B 向けの抑制は退屈ではなく、限られた注意をデータに譲ること。",
        },
      },
      {
        type: "image",
        alt: {
          zh: "Aurora 后台界面",
          en: "Aurora dashboard interface",
          ja: "Aurora ダッシュボード",
        },
        src: img(
          "B2B SaaS dashboard interface light blue theme data charts metrics, modern clean design",
          "landscape_16_9"
        ),
      },
    ],
  },
  {
    slug: "letter-motion",
    title: {
      zh: "字母游戏 · 动效实验",
      en: "Letter Play · Motion Studies",
      ja: "字母遊び · モーション習作",
    },
    category: WORK_CATEGORIES.ANIMATION,
    year: 2024,
    thumbAspect: "square",
    cover: img(
      "Kinetic typography poster motion design still, big serif letters morphing into shapes, warm cream background, editorial",
      "square"
    ),
    tags: ["Motion", "Type"],
    summary: {
      zh: "26 个字母 × 26 种动效的小练习，每天一个。",
      en: "26 letters × 26 motion studies — one per day.",
      ja: "26 文字 × 26 のモーション習作。毎日ひとつずつ。",
    },
    accentBg: "#F4F1EC",
    accentFg: "#FF5722",
    contents: [
      {
        type: "text",
        content: {
          zh: "这是一个长期的小练习，目的是把字母变得不像字母——但一眼仍能认出来。",
          en: "A long-running exercise: make a letter not look like a letter — yet still recognizable at a glance.",
          ja: "長期の習作。文字に見えないのに、ぱっと見で読めること。それが目標。",
        },
      },
      {
        type: "image",
        alt: {
          zh: "字母动效",
          en: "Letter motion stills",
          ja: "字母モーション",
        },
        src: img(
          "Series of kinetic typography letters keyframes A through Z motion design",
          "landscape_16_9"
        ),
      },
    ],
  },
];
