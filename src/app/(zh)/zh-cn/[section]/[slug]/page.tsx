import { notFound } from "next/navigation";
import { ContentDetail } from "@/components/content-pages";
import { contentPages, getContentPage, isSectionKey, pathFor } from "@/lib/content";
import { createMetadata } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return contentPages
    .filter((page) => page.locale === "zh-CN")
    .map((page) => ({ section: page.section, slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps<"/zh-cn/[section]/[slug]">) {
  const { section, slug } = await params;
  if (!isSectionKey(section)) return {};
  const page = getContentPage("zh-CN", section, slug);
  if (!page) return {};
  return createMetadata({
    locale: "zh-CN",
    title: page.title,
    description: page.description,
    englishPath: `/${section}/${slug}/`,
    chinesePath: pathFor(page),
    image: page.image,
    keywords: page.keywords,
    type: "article",
  });
}

export default async function ChineseContent({ params }: PageProps<"/zh-cn/[section]/[slug]">) {
  const { section, slug } = await params;
  if (!isSectionKey(section)) notFound();
  const page = getContentPage("zh-CN", section, slug);
  if (!page) notFound();
  return <ContentDetail page={page} />;
}
