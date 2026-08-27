import type { Metadata } from "next";

export const SITE_NAME = "OpenSurge for Mac";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://opensurge.pages.dev"
).replace(/\/$/, "");

export const REPOSITORY_URL = "https://github.com/YTwsy/OpenSurge-for-Mac";
export const RELEASES_URL = `${REPOSITORY_URL}/releases/latest`;
export const ISSUES_URL = `${REPOSITORY_URL}/issues`;

export type Locale = "en" | "zh-CN";

export function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

type MetadataInput = {
  locale: Locale;
  title: string;
  description: string;
  englishPath: string;
  chinesePath: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function createMetadata({
  locale,
  title,
  description,
  englishPath,
  chinesePath,
  image = "/og.png",
  keywords = [],
  type = "website",
}: MetadataInput): Metadata {
  const canonicalPath = locale === "en" ? englishPath : chinesePath;
  const canonical = absoluteUrl(canonicalPath);
  const socialImage = absoluteUrl(image);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        en: absoluteUrl(englishPath),
        "zh-CN": absoluteUrl(chinesePath),
        "x-default": absoluteUrl(englishPath),
      },
    },
    openGraph: {
      type,
      locale: locale === "en" ? "en_US" : "zh_CN",
      alternateLocale: locale === "en" ? ["zh_CN"] : ["en_US"],
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: socialImage, width: 1280, height: 640, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Open-source Surge-style whole-home gateway and control plane for macOS, powered by mihomo.",
  applicationName: SITE_NAME,
  category: "technology",
  creator: "OpenSurge contributors",
  publisher: "OpenSurge contributors",
  icons: {
    icon: "/brand/opensurge-favicon.png",
    apple: "/brand/opensurge-icon.png",
  },
  manifest: "/manifest.webmanifest",
};
