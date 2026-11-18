# 花园（garden）

Java 后端知识库。不是博客——博客要求"一次说完"，这里允许一篇笔记今天三段、明年十段。

线上地址：<https://garden.arkoco.com>
主站（成篇长文）：<https://arkoco.github.io>

## 三层结构

| 目录 | 内容 | 是否发布 | 谁写 |
|---|---|---|---|
| `content/raw/` | 网页剪藏原文 | **否**（`.gitignore` + `ignorePatterns` 双保险） | 工具 |
| `content/notes/` | 一篇原文一页：出处 + 三行判断 + 它没讲到的 | 是 | 人 |
| `content/wiki/` | 一主题一页：合并多来源、标出分歧、维护检查表 | 是 | 人 + AI |
| `content/templates/` | Obsidian 模板 | 否 | 人 |

`content/` 同时是 **Obsidian vault** 和 **唯一发布源**，中间没有同步脚本。

## 命令

```bash
npm install                  # 首次
npx quartz build --serve     # 本地预览 http://localhost:8080
npx quartz build              # 构建到 public/
npx quartz sync               # 提交并推送（等同 git add/commit/push）
npx quartz check              # tsc + prettier 检查
```

首次跑 `--serve` 前如果配置改过，先 `npx quartz build` 一次看有没有报错——比在浏览器里猜快。

## 写作约定

- **笔记**放进 `content/notes/`，文件名就是标题，用中文，别改（改名 = 断链）。
- **主题页**放进 `content/wiki/`，主题页之间的链接用 `[[微服务]]` 或相对链接。
- 没写完的页面在正文顶部写一句 `> 本页仍在生长`，不要留空文件。
- 草稿用 frontmatter `draft: true`（Quartz 原生会跳过），不要靠"记得别 push"。
- 图片放 `content/attachments/`，**只要正文必需的截图**。剪藏的装饰图、广告图一律不留——公开仓库 1GB 是软上限。

## 部署

主部署在 **Cloudflare Pages**：连本仓库，构建命令 `node ./quartz/bootstrap-cli.mjs build`，输出目录 `public`，环境变量 `NODE_VERSION=22`。

`main` 上另有 `.github/workflows/deploy.yml` 兜底发布到 GitHub Pages（`arkoco.github.io/garden`），它用 `QUARTZ_BASE_URL` 覆盖 `baseUrl`，否则项目页多一层路径会让整站链接错。

`baseUrl` 必须和实际访问路径一致，否则 sitemap / RSS / OG 的绝对链接会错。换域名时改 `quartz.config.ts` 里的默认值。

## 关于 Quartz 本体

`quartz/` 目录是 [Quartz 4](https://quartz.jzhao.xyz/) 的源码（MIT，见 `LICENSE.txt`），vendor 进本仓库而不是 fork：这样可以改引擎，而不用维护 fork 的合并。

升级方式：`npx quartz update`（会覆盖 `quartz/` 目录，`content/` 不动）。