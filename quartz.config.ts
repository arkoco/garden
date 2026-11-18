import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Arkoco 的花园",
    pageTitleSuffix: " · 知识花园",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "zh-CN",
    // 站点根路径。sitemap / RSS / OG 的绝对链接都靠它，写错会让整站链接错。
    // 默认是正式域名；GitHub Pages 那条 workflow 会用环境变量覆盖成
    // arkoco.github.io/garden（项目页，多一层路径），这样两个部署目标都能用。
    baseUrl: process.env.QUARTZ_BASE_URL ?? "garden.arkoco.com",
    // raw/ 是剪藏原文（已在 .gitignore 里），templates/ 是模板，private/ 是草稿。
    // 这三类都不进入构建产物——这是"原文不公开"的第一道物理隔离。
    ignorePatterns: ["private", "templates", ".obsidian", "raw"],
    defaultDateType: "modified",
    theme: {
      // 用本地字体：Google Fonts 在国内不可达，用 googleFonts 会让整站字体加载卡住。
      // 具体字体栈在 quartz/styles/custom.scss 里覆盖。
      fontOrigin: "local",
      cdnCaching: false,
      typography: {
        header: "Noto Serif SC",
        body: "Noto Sans SC",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#fbfaf6",
          lightgray: "#e8e2d6",
          gray: "#a9a294",
          darkgray: "#4f4a42",
          dark: "#1c1a17",
          secondary: "#a63d72",
          tertiary: "#2f6f6a",
          highlight: "rgba(166, 61, 114, 0.12)",
          textHighlight: "#f6e7b0",
        },
        darkMode: {
          light: "#171613",
          lightgray: "#35322c",
          gray: "#6b6659",
          darkgray: "#cfc8bb",
          dark: "#f0ece2",
          secondary: "#d987b3",
          tertiary: "#7cc0b8",
          highlight: "rgba(217, 135, 179, 0.15)",
          textHighlight: "#d4a72c66",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // CustomOgImages 需要在构建时拉取字体，国内网络下会卡住构建，先关掉。
      // 想要自动 OG 图时，把字体下载到本地再启用。
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
