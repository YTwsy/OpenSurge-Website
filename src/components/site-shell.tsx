import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";
import { RELEASES_URL, REPOSITORY_URL } from "@/lib/site";

const labels = {
  en: {
    features: "Features",
    guides: "Guides",
    docs: "Docs",
    blog: "Journal",
    download: "Download",
    language: "简体中文",
    github: "GitHub",
    tagline: "Open-source macOS gateway and control plane",
    license: "GPL-3.0-only",
    package: "Unsigned community packages",
  },
  "zh-CN": {
    features: "功能",
    guides: "指南",
    docs: "文档",
    blog: "项目日志",
    download: "下载",
    language: "English",
    github: "GitHub",
    tagline: "开源 macOS 网关与控制面",
    license: "GPL-3.0-only",
    package: "社区未签名安装包",
  },
} satisfies Record<Locale, Record<string, string>>;

function localePath(locale: Locale, path: string) {
  if (locale === "en") return path;
  return path === "/" ? "/zh-cn/" : `/zh-cn${path}`;
}

export function SiteHeader({
  locale,
  alternateHref,
}: {
  locale: Locale;
  alternateHref: string;
}) {
  const copy = labels[locale];

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href={localePath(locale, "/")} aria-label="OpenSurge for Mac home">
          <Image
            className="brand-icon"
            src="/brand/opensurge-icon.png"
            width={42}
            height={42}
            alt=""
            aria-hidden="true"
          />
          <span>
            <strong>OpenSurge</strong>
            <small>for Mac</small>
          </span>
        </Link>

        <nav className="primary-nav" aria-label={locale === "en" ? "Primary navigation" : "主要导航"}>
          <Link href={localePath(locale, "/features/")}>{copy.features}</Link>
          <Link href={localePath(locale, "/guides/")}>{copy.guides}</Link>
          <Link href={localePath(locale, "/docs/")}>{copy.docs}</Link>
          <Link href={localePath(locale, "/blog/")}>{copy.blog}</Link>
        </nav>

        <div className="header-actions">
          <Link className="language-link" href={alternateHref} hrefLang={locale === "en" ? "zh-CN" : "en"}>
            {copy.language}
          </Link>
          <a className="button button-small" href={RELEASES_URL}>
            {copy.download}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = labels[locale];
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Image src="/brand/opensurge-icon.png" width={48} height={48} alt="OpenSurge app icon" />
          <div>
            <strong>OpenSurge for Mac</strong>
            <p>{copy.tagline}</p>
          </div>
        </div>
        <div className="footer-links">
          <a href={REPOSITORY_URL}>{copy.github}</a>
          <a href={`${REPOSITORY_URL}/blob/master/LICENSE`}>{copy.license}</a>
          <a href={RELEASES_URL}>{copy.package}</a>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({
  locale,
  alternateHref,
  children,
}: {
  locale: Locale;
  alternateHref: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader locale={locale} alternateHref={alternateHref} />
      {children}
      <SiteFooter locale={locale} />
    </>
  );
}
