import { HomePage } from "@/components/home-page";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  locale: "zh-CN",
  title: "OpenSurge for Mac — 开源 macOS 全屋网关与控制面",
  description:
    "把 Mac 变成可观察、可恢复的全屋网关，让手机、电视、游戏机和其他设备通过 OpenSurge 与 mihomo 接入。",
  englishPath: "/",
  chinesePath: "/zh-cn/",
  keywords: ["macOS 网关", "Mac 旁路由", "全屋代理", "mihomo macOS", "OpenSurge"],
});

export default function ChineseHome() {
  return <HomePage locale="zh-CN" />;
}
