import type { ContentPage, SectionKey } from "@/lib/content";
import { pathFor, sectionCopy } from "@/lib/content";
import { absoluteUrl, REPOSITORY_URL, RELEASES_URL, SITE_NAME, SITE_URL, type Locale } from "@/lib/site";

export function homeSchema(locale: Locale) {
  const homePath = locale === "en" ? "/" : "/zh-cn/";
  const description =
    locale === "en"
      ? "Open-source Surge-style whole-home gateway and control plane for macOS."
      : "开源的 Surge 风格 macOS 全屋网关与控制面。";

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      alternateName: ["OpenSurge", "OpenSurge for Mac"],
      url: SITE_URL,
      inLanguage: locale,
      description,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      operatingSystem: "macOS 13 or later",
      applicationCategory: "UtilitiesApplication",
      applicationSubCategory: "Network gateway and control plane",
      description,
      url: absoluteUrl(homePath),
      downloadUrl: RELEASES_URL,
      codeRepository: REPOSITORY_URL,
      license: `${REPOSITORY_URL}/blob/master/LICENSE`,
      image: absoluteUrl("/og.png"),
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      softwareRequirements: "macOS 13+, administrator access for installation",
      isAccessibleForFree: true,
    },
  ];
}

export function sectionSchema(locale: Locale, section: SectionKey) {
  const prefix = locale === "en" ? "" : "/zh-cn";
  const copy = sectionCopy[locale][section];
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: copy.title,
      description: copy.description,
      url: absoluteUrl(`${prefix}/${section}/`),
      inLanguage: locale,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: SITE_NAME,
          item: absoluteUrl(prefix ? `${prefix}/` : "/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: copy.label,
          item: absoluteUrl(`${prefix}/${section}/`),
        },
      ],
    },
  ];
}

export function contentSchema(page: ContentPage) {
  const localePrefix = page.locale === "en" ? "" : "/zh-cn";
  const section = sectionCopy[page.locale][page.section];
  const articleType = page.section === "blog" ? "Article" : "TechArticle";

  return [
    {
      "@context": "https://schema.org",
      "@type": articleType,
      headline: page.title,
      description: page.description,
      image: absoluteUrl(page.image),
      datePublished: page.updatedAt,
      dateModified: page.updatedAt,
      inLanguage: page.locale,
      mainEntityOfPage: absoluteUrl(pathFor(page)),
      author: { "@type": "Organization", name: "OpenSurge contributors", url: REPOSITORY_URL },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: SITE_NAME,
          item: absoluteUrl(localePrefix ? `${localePrefix}/` : "/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: section.label,
          item: absoluteUrl(`${localePrefix}/${page.section}/`),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: page.title,
          item: absoluteUrl(pathFor(page)),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];
}
