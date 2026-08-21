import { HomePage } from "@/components/home-page";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  locale: "en",
  title: "Open-source whole-home gateway for macOS",
  description:
    "Turn a Mac into an observable whole-home gateway for phones, TVs, consoles, and other devices with OpenSurge and mihomo.",
  englishPath: "/",
  chinesePath: "/zh-cn/",
  keywords: [
    "macOS gateway",
    "Mac as router",
    "whole-home proxy",
    "mihomo macOS",
    "OpenSurge",
  ],
});

export default function EnglishHome() {
  return <HomePage locale="en" />;
}
