import * as fs from "node:fs"
import path from "node:path"
import asciidoctor, { type Html5Converter, type Table } from "asciidoctor"

// asciidoctor 节点类型定义
interface AsciidocNode {
  getNodeName(): string
  getContent(): string
  getText?(): string
  getLevel?(): number
  getTitle?(): string
  getStyle?(): string
  getType?(): string
  getTarget?(): string
}

class ShadcnTypographyConverter {
  private baseConverter: Html5Converter

  constructor() {
    this.baseConverter = asciidoctor().Html5Converter.create()
  }
  convert(node: AsciidocNode, transform?: string): string {
    const nodeName = transform || node.getNodeName()

    switch (nodeName) {
      case "document":
        return `<div class="prose prose-slate max-w-none dark:prose-invert">${node.getContent()}</div>`

      case "embedded":
        return node.getContent()

      case "section":
        return this.convertSection(node)

      case "paragraph":
        return `<p class="leading-7 [&:not(:first-child)]:mt-6">${node.getContent()}</p>`

      case "ulist":
        return `<ul class="my-6 ml-6 list-disc [&>li]:mt-2">${node.getContent()}</ul>`

      case "olist":
        return `<ol class="my-6 ml-6 list-decimal [&>li]:mt-2">${node.getContent()}</ol>`

      case "dlist":
        return `<dl class="my-6">${node.getContent()}</dl>`

      case "quote":
        return `<blockquote class="mt-6 border-l-2 pl-6 italic">${node.getContent()}</blockquote>`

      case "literal":
      case "listing":
        return `<pre class="mb-4 mt-6 overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900"><code>${node.getContent()}</code></pre>`

      case "example":
        return `<div class="my-6 rounded-lg border p-4">${node.getContent()}</div>`

      case "sidebar":
        return `<aside class="my-6 rounded-lg border bg-muted p-4">${node.getContent()}</aside>`

      case "admonition":
        return `<div class="my-6 rounded-lg border-l-4 border-orange-500 bg-orange-50 p-4 dark:bg-orange-950">${node.getContent()}</div>`

      case "table": {
        // 尝试获取表格的行数据
        const tableNode = node as Table
        return this.convertTable(tableNode)
      }

      case "image":
        return this.convertImage(node)

      case "thematic_break":
        return '<hr class="my-6 border-t" />'

      case "page_break":
        return '<div class="my-6 border-t-2 border-dashed"></div>'

      case "inline_anchor":
        return this.convertInlineAnchor(node)

      case "inline_quoted":
        return this.convertInlineQuoted(node)

      case "inline_image":
        return this.convertInlineImage(node)

      case "inline_break":
        return "<br />"

      case "inline_kbd":
        return `<kbd class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">${node.getText?.() || ""}</kbd>`

      case "inline_button":
        return `<button class="rounded bg-primary px-2 py-1 text-primary-foreground text-sm">${node.getText?.() || ""}</button>`

      case "inline_menu":
        return `<span class="font-medium">${node.getText?.() || ""}</span>`

      case "inline_callout":
        return `<span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">${node.getText?.() || ""}</span>`

      case "inline_footnote":
        return `<sup class="text-xs">${node.getText?.() || ""}</sup>`

      case "inline_indexterm":
        return node.getText?.() || ""

      case "verse":
        return `<div class="my-6 font-mono whitespace-pre-line">${node.getContent()}</div>`

      case "stem":
        return `<div class="my-6 text-center">${node.getContent()}</div>`

      case "audio":
        return `<audio controls class="my-6 w-full">${node.getContent()}</audio>`

      case "video":
        return `<video controls class="my-6 w-full">${node.getContent()}</video>`

      case "colist":
        return `<ol class="my-6 ml-6 list-decimal [&>li]:mt-2">${node.getContent()}</ol>`

      case "open":
        return `<div class="my-6">${node.getContent()}</div>`

      case "outline":
        return `<div class="outline">${node.getContent()}</div>`

      case "preamble":
        return `<div class="preamble text-lg text-muted-foreground">${node.getContent()}</div>`

      case "toc":
        return `<nav class="toc my-6 rounded-lg border p-4">${node.getContent()}</nav>`

      case "floating-title":
        return `<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">${node.getTitle?.() || ""}</h3>`

      default:
        // 对于未处理的节点类型，返回基本的HTML
        return node.getContent ? node.getContent() : ""
    }
  }

  private convertSection(node: AsciidocNode): string {
    const level = node.getLevel?.() || 1
    const title = node.getTitle?.() || ""
    const content = node.getContent()

    const headingClasses: Record<number, string> = {
      1: "scroll-m-20 text-2xl font-semibold tracking-tight",
      2: "scroll-m-20 text-xl font-semibold tracking-tight",
      3: "scroll-m-20 text-lg font-semibold tracking-tight",
      4: "scroll-m-20 text-base font-semibold tracking-tight"
    }

    const headingClass = headingClasses[level] || headingClasses[6]

    return `<section>
      <h${level} class="${headingClass}">${title}</h${level}>
      ${content}
    </section>`
  }

  private convertImage(node: AsciidocNode): string {
    const src = node.getTarget?.() || ""
    const alt = node.getText?.() || ""
    return `<img src="${src}" alt="${alt}" class="my-6 rounded-lg border" />`
  }

  private convertInlineImage(node: AsciidocNode): string {
    const src = node.getTarget?.() || ""
    const alt = node.getText?.() || ""
    return `<img src="${src}" alt="${alt}" class="inline-block" />`
  }

  private convertInlineQuoted(node: AsciidocNode): string {
    const type = node.getType?.() || ""
    const content = node.getText?.() || ""

    switch (type) {
      case "monospaced":
        return `<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">${content}</code>`
      case "strong":
        return `<strong class="font-semibold">${content}</strong>`
      case "emphasis":
        return `<em class="italic">${content}</em>`
      case "mark":
        return `<mark class="bg-yellow-200 dark:bg-yellow-800">${content}</mark>`
      case "superscript":
        return `<sup class="text-xs">${content}</sup>`
      case "subscript":
        return `<sub class="text-xs">${content}</sub>`
      default:
        return content
    }
  }

  private convertInlineAnchor(node: AsciidocNode): string {
    const href = node.getTarget?.() || ""
    const text = node.getText?.() || ""
    return `<a href="${href}" class="font-medium text-primary underline underline-offset-4">${text}</a>`
  }

  private convertTable(tableNode: Table): string {
    const rows = tableNode.getRows()
    const caption = tableNode.getCaption()

    // 构建表格标题
    const captionHtml = caption ? `<caption class="mb-4 text-lg font-semibold text-foreground">${caption}</caption>` : ""

    // 构建表头
    let theadHtml = ""
    if (rows.getHead().length > 0) {
      const headRows = rows.getHead()
      theadHtml = `<thead class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        ${headRows
          .map(
            (row) => `
          <tr class="border-b border-border/60">
            ${row.map((cell) => `<th class="h-12 px-4 text-left align-middle font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent [&:has([role=checkbox])]:pr-0">${cell.getContent()}</th>`).join("")}
          </tr>
        `
          )
          .join("")}
      </thead>`
    }

    // 构建表身
    let tbodyHtml = ""
    if (rows.getBody().length > 0) {
      const bodyRows = rows.getBody()
      tbodyHtml = `<tbody class="[&_tr:last-child]:border-0">
        ${bodyRows
          .map(
            (row, index) => `
          <tr class="border-b border-border/40 hover:bg-muted/50 data-[state=selected]:bg-muted ${index % 2 === 0 ? "bg-card" : "bg-muted/20"}">
            ${row.map((cell) => `<td class="p-4 align-middle text-foreground [&:has([role=checkbox])]:pr-0">${cell.getContent()}</td>`).join("")}
          </tr>
        `
          )
          .join("")}
      </tbody>`
    }

    // 构建表脚
    let tfootHtml = ""
    if (rows.getFoot().length > 0) {
      const footRows = rows.getFoot()
      tfootHtml = `<tfoot class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        ${footRows
          .map(
            (row) => `
          <tr class="border-t border-border/60 font-medium">
            ${row.map((cell) => `<td class="p-4 align-middle text-foreground [&:has([role=checkbox])]:pr-0">${cell.getContent()}</td>`).join("")}
          </tr>
        `
          )
          .join("")}
      </tfoot>`
    }

    return `<div class="my-8 relative w-full overflow-auto rounded-lg border border-border/60 bg-card shadow-sm">
      <table class="w-full caption-bottom text-sm border-collapse">
        ${captionHtml}
        ${theadHtml}
        ${tbodyHtml}
        ${tfootHtml}
      </table>
    </div>`
  }
}

export const processReadmeFile = (targetDir: string, locale: string): string | null => {
  const asciidoctorProcessor = asciidoctor()

  // 根据语言选择对应的 README 文件
  const readmeFile = locale === "zh" ? "README.zh.adoc" : "README.adoc"
  const readmePath = path.join(targetDir, readmeFile)

  if (!fs.existsSync(readmePath)) {
    return null
  }

  try {
    const fileContent = fs.readFileSync(readmePath, "utf-8")

    // 查找 CONTENT-START 和 CONTENT-END 之间的内容
    const contentStartIndex = fileContent.indexOf("// CONTENT-START")
    const contentEndIndex = fileContent.indexOf("// CONTENT-END")

    if (contentStartIndex === -1 || contentEndIndex === -1 || contentEndIndex <= contentStartIndex) {
      return null
    }

    // 提取内容（不包含标记行）
    const lines = fileContent.split("\n")
    const startLineIndex = lines.findIndex((line) => line.includes("// CONTENT-START"))
    const endLineIndex = lines.findIndex((line) => line.includes("// CONTENT-END"))

    if (startLineIndex === -1 || endLineIndex === -1) {
      return null
    }

    const extractedContent = lines.slice(startLineIndex + 1, endLineIndex).join("\n")

    const customConverter = new ShadcnTypographyConverter()
    const typographyContent = asciidoctorProcessor.convert(extractedContent, {
      safe: "safe",
      attributes: {
        showtitle: false,
        toclevels: 0
      },
      converter: customConverter
    })

    return typographyContent as string
  } catch (error) {
    console.error(`Error processing README file ${readmeFile}:`, error)
    return null
  }
}
