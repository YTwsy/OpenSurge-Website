import { notFound } from "next/navigation";
import { SectionLanding } from "@/components/content-pages";
import { isSectionKey, sectionCopy, sectionKeys } from "@/lib/content";
import { createMetadata } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return sectionKeys.map((section) => ({ section }));
}

export async function generateMetadata({ params }: PageProps<"/zh-cn/[section]">) {
  const { section } = await params;
  if (!isSectionKey(section)) return {};
  const copy = sectionCopy["zh-CN"][section];
  return createMetadata({
    locale: "zh-CN",
    title: copy.title,
    description: copy.description,
    englishPath: `/${section}/`,
    chinesePath: `/zh-cn/${section}/`,
    keywords: ["OpenSurge", `OpenSurge ${copy.label}`, "macOS 网关"],
  });
}

export default async function ChineseSection({ params }: PageProps<"/zh-cn/[section]">) {
  const { section } = await params;
  if (!isSectionKey(section)) notFound();
  return <SectionLanding locale="zh-CN" section={section} />;
}
