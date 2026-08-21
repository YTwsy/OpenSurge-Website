import type { ReactNode } from "react";
import { rootMetadata } from "@/lib/site";
import "@/app/globals.css";

export const metadata = rootMetadata;

export default function ChineseLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
