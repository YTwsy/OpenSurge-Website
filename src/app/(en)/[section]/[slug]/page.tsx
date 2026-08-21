import { notFound } from "next/navigation";
import { ContentDetail } from "@/components/content-pages";
import { contentPages, getContentPage, isSectionKey, pathFor } from "@/lib/content";
import { createMetadata } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return contentPages
    .filter((page) => page.locale === "en")
    .map((page) => ({ section: page.section, slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[section]/[slug]">) {
  const { section, slug } = await params;
  if (!isSectionKey(section)) return {};
  const page = getContentPage("en", section, slug);
  if (!page) return {};
  const otherPath = `/zh-cn/${section}/${slug}/`;
  return createMetadata({
    locale: "en",
    title: page.title,
    description: page.description,
    englishPath: pathFor(page),
    chinesePath: otherPath,
    image: page.image,
    keywords: page.keywords,
    type: "article",
  });
}

export default async function EnglishContent({ params }: PageProps<"/[section]/[slug]">) {
  const { section, slug } = await params;
  if (!isSectionKey(section)) notFound();
  const page = getContentPage("en", section, slug);
  if (!page) notFound();
  return <ContentDetail page={page} />;
}
