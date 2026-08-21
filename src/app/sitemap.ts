import type { MetadataRoute } from "next";
import { contentPages, pathFor, sectionKeys } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const updatedAt = new Date("2026-08-21T00:00:00+08:00");

function languageAlternates(englishPath: string, chinesePath: string) {
  return {
    languages: {
      en: absoluteUrl(englishPath),
      "zh-CN": absoluteUrl(chinesePath),
      "x-default": absoluteUrl(englishPath),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: updatedAt,
      changeFrequency: "weekly",
      priority: 1,
      alternates: languageAlternates("/", "/zh-cn/"),
    },
    {
      url: absoluteUrl("/zh-cn/"),
      lastModified: updatedAt,
      changeFrequency: "weekly",
      priority: 1,
      alternates: languageAlternates("/", "/zh-cn/"),
    },
  ];

  const sectionEntries: MetadataRoute.Sitemap = sectionKeys.flatMap((section) => {
    const englishPath = `/${section}/`;
    const chinesePath = `/zh-cn/${section}/`;
    const alternates = languageAlternates(englishPath, chinesePath);
    return [
      {
        url: absoluteUrl(englishPath),
        lastModified: updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates,
      },
      {
        url: absoluteUrl(chinesePath),
        lastModified: updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates,
      },
    ];
  });

  const contentEntries: MetadataRoute.Sitemap = contentPages.map((page) => {
    const englishPath = `/${page.section}/${page.slug}/`;
    const chinesePath = `/zh-cn/${page.section}/${page.slug}/`;
    return {
      url: absoluteUrl(pathFor(page)),
      lastModified: new Date(`${page.updatedAt}T00:00:00+08:00`),
      changeFrequency: page.section === "blog" ? "monthly" : "weekly",
      priority: page.section === "docs" ? 0.85 : 0.75,
      alternates: languageAlternates(englishPath, chinesePath),
    };
  });

  return [...homeEntries, ...sectionEntries, ...contentEntries];
}
