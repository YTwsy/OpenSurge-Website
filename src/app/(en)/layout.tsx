import type { ReactNode } from "react";
import { rootMetadata } from "@/lib/site";
import "@/app/globals.css";

export const metadata = rootMetadata;

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
