import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OpenSurge for Mac",
    short_name: "OpenSurge",
    description: "Open-source whole-home gateway and control plane for macOS.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f5ed",
    theme_color: "#0c312d",
    icons: [
      {
        src: "/brand/opensurge-icon.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}
