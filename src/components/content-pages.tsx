import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { getSectionPages, pathFor, sectionCopy, type ContentPage, type SectionKey } from "@/lib/content";
import { contentSchema, sectionSchema } from "@/lib/schema";
import type { Locale } from "@/lib/site";

function homePath(locale: Locale) {
  return locale === "en" ? "/" : "/zh-cn/";
}

function sectionPath(locale: Locale, section: SectionKey) {
  return locale === "en" ? `/${section}/` : `/zh-cn/${section}/`;
}

export function SectionLanding({ locale, section }: { locale: Locale; section: SectionKey }) {
  const copy = sectionCopy[locale][section];
  const pages = getSectionPages(locale, section);
  const otherLocale: Locale = locale === "en" ? "zh-CN" : "en";

  return (
    <SiteShell locale={locale} alternateHref={sectionPath(otherLocale, section)}>
      <JsonLd data={sectionSchema(locale, section)} />
      <main className="content-main" lang={locale}>
        <section className="collection-hero section-pad">
          <div className="page-width narrow-width">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href={homePath(locale)}>OpenSurge</Link><span>/</span><span>{copy.label}</span>
            </nav>
            <p className="eyebrow dark"><span />{copy.label}</p>
            <h1>{copy.title}</h1>
            <p>{copy.description}</p>
          </div>
        </section>
        <section className="collection-list section-pad">
          <div className="page-width article-card-grid">
            {pages.map((page) => (
              <Link className="article-card" href={pathFor(page)} key={page.slug}>
                <div className="article-image">
                  <Image className={page.imageFit === "contain" ? "image-contain" : undefined} src={page.image} alt="" width={800} height={500} sizes="(max-width: 760px) 92vw, 44vw" />
                </div>
                <div className="article-card-copy">
                  <small>{page.eyebrow} · {page.readingTime}</small>
                  <h2>{page.title}</h2>
                  <p>{page.description}</p>
                  <span>{locale === "en" ? "Read page" : "阅读页面"} →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

export function ContentDetail({ page }: { page: ContentPage }) {
  const locale = page.locale;
  const otherLocale: Locale = locale === "en" ? "zh-CN" : "en";
  const alternatePage = getSectionPages(otherLocale, page.section).find((candidate) => candidate.slug === page.slug);
  const related = getSectionPages(locale, page.section).filter((candidate) => candidate.slug !== page.slug).slice(0, 3);
  const section = sectionCopy[locale][page.section];

  return (
    <SiteShell locale={locale} alternateHref={alternatePage ? pathFor(alternatePage) : homePath(otherLocale)}>
      <JsonLd data={contentSchema(page)} />
      <main className="content-main" lang={locale}>
        <article>
          <header className="article-hero section-pad">
            <div className="page-width article-hero-grid">
              <div>
                <nav className="breadcrumbs" aria-label="Breadcrumb">
                  <Link href={homePath(locale)}>OpenSurge</Link><span>/</span>
                  <Link href={sectionPath(locale, page.section)}>{section.label}</Link><span>/</span>
                  <span>{page.eyebrow}</span>
                </nav>
                <p className="eyebrow dark"><span />{page.eyebrow}</p>
                <h1>{page.title}</h1>
                <p className="article-intro">{page.intro}</p>
                <div className="article-meta"><span>{page.readingTime}</span><span>{locale === "en" ? "Updated" : "更新于"} {page.updatedAt}</span></div>
              </div>
              <div className="article-hero-image">
                <Image className={page.imageFit === "contain" ? "image-contain" : undefined} src={page.image} alt={page.imageAlt} width={1280} height={800} sizes="(max-width: 900px) 94vw, 43vw" priority />
              </div>
            </div>
          </header>

          <div className="page-width article-layout section-pad">
            <aside className="article-aside">
              <strong>{locale === "en" ? "On this page" : "本页内容"}</strong>
              {page.sections.map((sectionItem) => <a key={sectionItem.heading} href={`#${sectionItem.heading.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")}`}>{sectionItem.heading}</a>)}
              <a href="#faq">{locale === "en" ? "Questions" : "常见问题"}</a>
            </aside>
            <div className="article-body">
              {page.sections.map((sectionItem) => {
                const id = sectionItem.heading.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-");
                return (
                  <section id={id} key={sectionItem.heading}>
                    <h2>{sectionItem.heading}</h2>
                    {sectionItem.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {sectionItem.bullets && <ul>{sectionItem.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                    {sectionItem.codeBlocks?.map((block) => (
                      <div className="article-code" key={`${block.label}-${block.language}`}>
                        <div><strong>{block.label}</strong><span>{block.language}</span></div>
                        <pre><code>{block.code}</code></pre>
                      </div>
                    ))}
                    {sectionItem.resources && (
                      <div className="article-resources">
                        {sectionItem.resources.map((resource) => (
                          <a href={resource.href} key={resource.href} target="_blank" rel="noreferrer">
                            <span><strong>{resource.label}</strong><small>{resource.description}</small></span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
              <section id="faq" className="faq-section">
                <p className="eyebrow dark"><span />FAQ</p>
                <h2>{locale === "en" ? "Questions people ask before changing the network" : "改变网络前常见的问题"}</h2>
                <div className="faq-list">
                  {page.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
                </div>
              </section>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="related-section section-pad">
            <div className="page-width">
              <h2>{locale === "en" ? `More ${section.label.toLowerCase()}` : `更多${section.label}`}</h2>
              <div className="related-grid">
                {related.map((item) => <Link href={pathFor(item)} key={item.slug}><small>{item.eyebrow}</small><strong>{item.title}</strong><span aria-hidden="true">→</span></Link>)}
              </div>
            </div>
          </section>
        )}
      </main>
    </SiteShell>
  );
}
