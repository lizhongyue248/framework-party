import { usePageContext } from "vike-react/usePageContext"

const HeadDefault = () => {
  const { locale } = usePageContext()

  // 中英文 SEO 内容配置
  const seoContent = {
    zh: {
      title: "🥳Framework Party🥳 - 全栈框架终极派对 | 前端后端数据库框架全生态对比平台",
      description:
        "加入全栈框架派对！一站式对比前端、后端、数据库等各种框架的特性、性能和生态系统。从 React、Vue、Angular 到 Spring、Django、Express，再到 MySQL、PostgreSQL、MongoDB，选择最适合你项目的技术栈。",
      keywords: "框架对比,前端框架,后端框架,数据库框架,React,Vue,Angular,Spring,Django,Express,MySQL,PostgreSQL,MongoDB,全栈开发,技术栈选择,框架选型",
      ogTitle: "🥳Framework Party🥳 - 全栈框架终极派对",
      ogDescription: "全生态框架对比平台！涵盖前端、后端、数据库等各种框架的深度对比分析，帮助开发者做出最佳技术栈选择。",
      twitterTitle: "🥳Framework Party🥳 - 全栈框架终极派对",
      twitterDescription: "全生态框架对比平台！涵盖前端、后端、数据库等各种框架的深度对比分析，帮助开发者做出最佳技术栈选择。",
      jsonLd: {
        name: "Framework Party",
        description: "全栈框架对比平台，覆盖前端、后端、数据库等各技术栈的框架对比分析，帮助开发者选择最适合的技术方案",
        keywords: [
          "框架对比",
          "前端框架",
          "后端框架",
          "数据库框架",
          "React",
          "Vue",
          "Angular",
          "Svelte",
          "Qwik",
          "Spring",
          "Django",
          "Express",
          "FastAPI",
          "Laravel",
          "MySQL",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "全栈开发",
          "技术栈选择",
          "架构设计"
        ],
        about: [
          {
            "@type": "Thing",
            name: "Frontend Framework Comparison",
            description: "前端框架深度对比分析，包括React、Vue、Angular等现代框架"
          },
          {
            "@type": "Thing",
            name: "Backend Framework Comparison",
            description: "后端框架对比评估，涵盖各种编程语言的主流框架"
          },
          {
            "@type": "Thing",
            name: "Database Framework Comparison",
            description: "数据库和存储解决方案的对比分析"
          },
          {
            "@type": "Thing",
            name: "Full Stack Development",
            description: "全栈技术栈选择和架构决策支持"
          }
        ],
        audienceType: "全栈开发者、架构师、技术决策者、软件工程师"
      }
    },
    en: {
      title: "🥳Framework Party🥳 - Ultimate Full-Stack Framework Battle | Frontend Backend Database Framework Ecosystem Comparison",
      description:
        "Join the full-stack framework party! One-stop comparison of frontend, backend, database frameworks' features, performance, and ecosystems. From React, Vue, Angular to Spring, Django, Express, and MySQL, PostgreSQL, MongoDB - choose the perfect tech stack for your project.",
      keywords:
        "framework comparison,frontend frameworks,backend frameworks,database frameworks,React,Vue,Angular,Spring,Django,Express,MySQL,PostgreSQL,MongoDB,full-stack development,tech stack selection,framework selection",
      ogTitle: "🥳Framework Party🥳 - Ultimate Full-Stack Framework Battle",
      ogDescription:
        "Comprehensive framework comparison platform! In-depth analysis of frontend, backend, database frameworks to help developers make the best tech stack decisions.",
      twitterTitle: "🥳Framework Party🥳 - Ultimate Full-Stack Framework Battle",
      twitterDescription:
        "Comprehensive framework comparison platform! In-depth analysis of frontend, backend, database frameworks to help developers make the best tech stack decisions.",
      jsonLd: {
        name: "Framework Party",
        description:
          "Full-stack framework comparison platform covering frontend, backend, database technology stacks to help developers choose the most suitable technical solutions",
        keywords: [
          "framework comparison",
          "frontend frameworks",
          "backend frameworks",
          "database frameworks",
          "React",
          "Vue",
          "Angular",
          "Svelte",
          "Qwik",
          "Spring",
          "Django",
          "Express",
          "FastAPI",
          "Laravel",
          "MySQL",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "full-stack development",
          "tech stack selection",
          "architecture design"
        ],
        about: [
          {
            "@type": "Thing",
            name: "Frontend Framework Comparison",
            description: "In-depth comparison and analysis of frontend frameworks including React, Vue, Angular and other modern frameworks"
          },
          {
            "@type": "Thing",
            name: "Backend Framework Comparison",
            description: "Backend framework comparison and evaluation covering mainstream frameworks across various programming languages"
          },
          {
            "@type": "Thing",
            name: "Database Framework Comparison",
            description: "Comparative analysis of database and storage solutions"
          },
          {
            "@type": "Thing",
            name: "Full Stack Development",
            description: "Full-stack technology stack selection and architectural decision support"
          }
        ],
        audienceType: "Full-stack developers, architects, technical decision makers, software engineers"
      }
    }
  }

  const currentContent = seoContent[locale as keyof typeof seoContent] || seoContent.zh
  const currentLocale = locale === "en" ? "en_US" : "zh_CN"
  const alternateLocale = locale === "en" ? "zh_CN" : "en_US"

  return (
    <>
      {/* 基本 SEO 元数据 */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* 标题和描述 */}
      <title>{currentContent.title}</title>
      <meta name="description" content={currentContent.description} />
      <meta name="keywords" content={currentContent.keywords} />
      <meta name="author" content="Framework Party" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={currentContent.ogTitle} />
      <meta property="og:description" content={currentContent.ogDescription} />
      <meta property="og:image" content="/logo/framework-party-logo.svg" />
      <meta property="og:image:alt" content="🥳 Framework Party Logo" />
      <meta property="og:url" content="https://framework-party.dev" />
      <meta property="og:site_name" content="Framework Party" />
      <meta property="og:locale" content={currentLocale} />
      <meta property="og:locale:alternate" content={alternateLocale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={currentContent.twitterTitle} />
      <meta name="twitter:description" content={currentContent.twitterDescription} />
      <meta name="twitter:image" content="/logo/framework-party-logo.svg" />
      <meta name="twitter:image:alt" content="🥳 Framework Party Logo" />

      {/* 技术相关 meta */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="application-name" content="Framework Party" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Framework Party" />

      {/* Canonical URL */}
      <link rel="canonical" href="https://framework-party.dev" />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      <link rel="apple-touch-icon" href="/logo.svg" />

      {/* 预加载关键资源 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* JSON-LD 结构化数据 */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: currentContent.jsonLd.name,
          description: currentContent.jsonLd.description,
          url: "https://framework-party.dev",
          keywords: currentContent.jsonLd.keywords,
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://framework-party.dev/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          about: currentContent.jsonLd.about,
          audience: {
            "@type": "Audience",
            audienceType: currentContent.jsonLd.audienceType
          },
          applicationCategory: "Developer Tools",
          operatingSystem: "Web Browser"
        })}
      </script>

      {/* 分析脚本 */}
      <script defer src="https://analytics.gzqtjs.cn/script.js" data-website-id="8c32b2fb-a108-4797-b1b9-10356d3774b4" />
    </>
  )
}

export default HeadDefault
