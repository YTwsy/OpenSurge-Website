import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { homeSchema } from "@/lib/schema";
import { RELEASES_URL, REPOSITORY_URL, type Locale } from "@/lib/site";

const copy = {
  en: {
    alternateHref: "/zh-cn/",
    badge: "Open source · macOS 13+",
    titleLead: "Turn your Mac into a",
    titleAccent: "whole-home gateway.",
    intro:
      "OpenSurge is a Surge-style macOS gateway and control plane powered by mihomo. Route phones, TVs, consoles, and other devices through one observable, recoverable network path.",
    primaryCta: "Download latest release",
    githubCta: "View on GitHub",
    secondaryCta: "See how the gateway works",
    packageNote: "Open source · GitHub · Apple Silicon and Intel",
    heroLabel: "ONE MAC · MANY DEVICES · INDEPENDENT ROUTES",
    status: ["Gateway ready", "TUN active", "Devices observed"],
    proof: [
      ["3", "network topologies"],
      ["1", "auditable control plane"],
      ["IPv4 / IPv6", "experimental"],
      ["GPL", "3.0-only"],
    ],
    problemEyebrow: "NETWORK CONTROL, NOT APP SETTINGS",
    problemTitle: "Proxy the household at the gateway layer",
    problemBody:
      "Devices such as game consoles and TVs cannot run the same proxy client as a Mac. OpenSurge moves routing policy to the Mac gateway so downstream devices use ordinary IP networking.",
    capabilities: [
      {
        number: "01",
        title: "DHCP & DNS gateway",
        text: "Start with selected-device bypass routing, take over LAN DHCP when you are ready, or serve an isolated downstream network.",
        href: "/features/dhcp-gateway/",
        link: "Explore gateway modes",
      },
      {
        number: "02",
        title: "Per-device routing",
        text: "Give a phone, TV, PS5, or VR headset a dedicated selector while keeping local and private traffic direct.",
        href: "/features/per-device-routing/",
        link: "See device policy",
      },
      {
        number: "03",
        title: "mihomo control plane",
        text: "Import compatible proxies and rules while OpenSurge retains ownership of gateway-critical DNS, TUN, and recovery state.",
        href: "/features/mihomo-control-plane/",
        link: "Understand the architecture",
      },
    ],
    topologyEyebrow: "START SMALL, SCALE DELIBERATELY",
    topologyTitle: "One product, three clearly distinguished network topologies",
    topologyBody:
      "The setup changes with the network you actually control. All three topologies start with IPv4 and can optionally enable experimental IPv6 takeover. OpenSurge explains the operational impact before it changes DHCP, routes, or advertisements.",
    topologyIpv6: "Optional IPv6 takeover",
    topologies: [
      {
        image: "/topologies/same-lan.svg",
        label: "Recommended first",
        title: "Bypass-router mode",
        text: "Keep router DHCP. Manually point selected stable devices at the Mac.",
      },
      {
        image: "/topologies/dhcp-takeover.svg",
        label: "Automatic onboarding",
        title: "LAN DHCP takeover",
        text: "Disable router DHCP and let OpenSurge provide device network settings.",
      },
      {
        image: "/topologies/isolated-lan.svg",
        label: "Cleanest boundary",
        title: "Isolated downstream LAN",
        text: "Use a separate AP, SSID, VLAN, or interface behind the Mac.",
      },
    ],
    policyEyebrow: "ONE ENGINE, DEVICE-SCOPED POLICY",
    policyTitle: "A PS5 can choose a region while the TV chooses a streaming route",
    policyBody:
      "OpenSurge compiles stable device identity into source-scoped mihomo rules. Mac-local mode stays independent, and the connection view shows the outbound chain that traffic actually used.",
    policyCta: "Read the PS5 gateway guide",
    ipv6Eyebrow: "WIND ROSE · EXPERIMENTAL IPV6",
    ipv6Title: "Two ingress paths. One policy model.",
    ipv6Body:
      "IPv4 and Mac-local traffic use mihomo TUN. Experimental downstream IPv6 uses RA/SLAAC/RDNSS plus a macOS BPF broker and the project-patched mihomo userspace packet path—without claiming the packets entered utun.",
    ipv6Cta: "Explore the IPv6 architecture",
    evidenceEyebrow: "BUILT FOR NETWORKS THAT MUST RECOVER",
    evidenceTitle: "Validation is part of the product story",
    evidenceBody:
      "Unit tests protect business rules. Virtual LAN labs exercise DHCP, DNS, TUN, NAT, rollback, and topology-specific IPv6 paths. Public claims stay bounded by the evidence that was actually collected.",
    learnTitle: "Start with the problem you want to solve",
    learnCards: [
      ["Guide", "Use a Mac as a router", "Onboard one device without redesigning the LAN.", "/guides/mac-as-router/"],
      ["Guide", "Route a PS5 through the Mac", "Give a console its own observable egress.", "/guides/ps5-proxy/"],
      ["Guide", "Route Claude Code by device", "Reuse one service template while choosing each device's exit.", "/guides/claude-code-device-rules/"],
      ["Guide", "Use a Pixel VPN exit", "Add a phone-side HTTP or SOCKS5 path as a mihomo outbound.", "/guides/pixel-google-vpn-egress/"],
      ["Docs", "Install and verify", "Check the unsigned package and complete a careful first run.", "/docs/getting-started/"],
      ["Journal", "Inside Wind Rose", "Why v0.2 adds a second transparent ingress path.", "/blog/wind-rose-ipv6/"],
    ],
    finalTitle: "Make the Mac the network control point.",
    finalBody: "Start with one device, verify the path, and expand only when the topology is ready.",
    finalPrimary: "Download latest release",
    finalSecondary: "Read the documentation",
  },
  "zh-CN": {
    alternateHref: "/",
    badge: "开源 · macOS 13+",
    titleLead: "把一台 Mac 变成",
    titleAccent: "全屋代理网关。",
    intro:
      "OpenSurge 是一套以 mihomo 为代理引擎的 Surge 风格 macOS 网关与控制面。让手机、电视、游戏机和其他设备通过一条可观察、可恢复的网络路径接入。",
    primaryCta: "下载最新版本",
    githubCta: "在 GitHub 查看",
    secondaryCta: "了解网关如何工作",
    packageNote: "开源 · GitHub · Apple Silicon 与 Intel",
    heroLabel: "一台 MAC · 多台设备 · 独立出口",
    status: ["网关已就绪", "TUN 已运行", "设备已观察"],
    proof: [
      ["3", "种网络拓扑"],
      ["1", "套可审计控制面"],
      ["IPv4 / IPv6", "实验性"],
      ["GPL", "3.0-only"],
    ],
    problemEyebrow: "控制网络，而不只是修改应用设置",
    problemTitle: "在网关层接管需要接入的家庭设备",
    problemBody:
      "游戏机和电视无法像 Mac 一样运行代理客户端。OpenSurge 把路由策略放到 Mac 网关，让下游设备只使用普通 IP 网络。",
    capabilities: [
      {
        number: "01",
        title: "DHCP 与 DNS 网关",
        text: "先从指定设备旁路由开始，准备好后接管局域网 DHCP，或为独立下游网络提供服务。",
        href: "/zh-cn/features/dhcp-gateway/",
        link: "了解网关模式",
      },
      {
        number: "02",
        title: "按设备分流",
        text: "让手机、电视、PS5 或 VR 使用专属 Selector，同时保持局域网与私有目标直连。",
        href: "/zh-cn/features/per-device-routing/",
        link: "查看设备策略",
      },
      {
        number: "03",
        title: "mihomo 控制面",
        text: "导入兼容节点与规则，同时由 OpenSurge 保留网关关键 DNS、TUN 与恢复状态。",
        href: "/zh-cn/features/mihomo-control-plane/",
        link: "理解产品架构",
      },
    ],
    topologyEyebrow: "从小范围开始，再有计划地扩展",
    topologyTitle: "同一个产品，三种清楚划分的网络拓扑",
    topologyBody:
      "配置取决于你真正控制的网络。三种拓扑都以 IPv4 为基线，并可按需开启实验性 IPv6 接管。修改 DHCP、路由或 IPv6 广播前，OpenSurge 会说明实际影响。",
    topologyIpv6: "可选 IPv6 接管",
    topologies: [
      {
        image: "/topologies/same-lan.svg",
        label: "首次体验推荐",
        title: "旁路由模式",
        text: "保留主路由 DHCP，只让指定稳定设备手工指向 Mac。",
      },
      {
        image: "/topologies/dhcp-takeover.svg",
        label: "自动接入",
        title: "局域网 DHCP 接管",
        text: "关闭主路由 DHCP，由 OpenSurge 下发设备网络设置。",
      },
      {
        image: "/topologies/isolated-lan.svg",
        label: "边界最清晰",
        title: "独立下游 LAN",
        text: "在 Mac 下游使用独立 AP、SSID、VLAN 或接口。",
      },
    ],
    policyEyebrow: "一个引擎，按设备划分策略",
    policyTitle: "PS5 选择游戏区服，电视使用流媒体出口",
    policyBody:
      "OpenSurge 把稳定设备身份编译成按来源生效的 mihomo 规则。Mac 本机模式保持独立，连接页显示流量真正使用的出口链。",
    policyCta: "阅读 PS5 网关指南",
    ipv6Eyebrow: "WIND ROSE · 实验性 IPV6",
    ipv6Title: "两种入口机制，共用一套策略模型",
    ipv6Body:
      "IPv4 与 Mac 本机流量进入 mihomo TUN。实验性下游 IPv6 使用 RA/SLAAC/RDNSS、macOS BPF broker 和项目补丁构建的 mihomo 用户态 packet path，不会声称这些包进入了 utun。",
    ipv6Cta: "了解 IPv6 架构",
    evidenceEyebrow: "为必须能够恢复的网络而构建",
    evidenceTitle: "验证也是产品叙事的一部分",
    evidenceBody:
      "单元测试保护业务规则，Virtual LAN Lab 覆盖 DHCP、DNS、TUN、NAT、回滚与拓扑对应的 IPv6 路径。公开结论只覆盖实际取得证据的范围。",
    learnTitle: "从你要解决的问题开始",
    learnCards: [
      ["指南", "让 Mac 成为网关", "只接入一台设备，不必重做整个局域网。", "/zh-cn/guides/mac-as-router/"],
      ["指南", "让 PS5 通过 Mac", "给游戏机一个可观察的独立出口。", "/zh-cn/guides/ps5-proxy/"],
      ["指南", "按设备分流 Claude Code", "复用同一服务模版，每台设备仍可选择自己的出口。", "/zh-cn/guides/claude-code-device-rules/"],
      ["指南", "使用 Pixel VPN 出口", "把手机侧 HTTP / SOCKS5 路径添加为 mihomo 节点。", "/zh-cn/guides/pixel-google-vpn-egress/"],
      ["文档", "安装与验证", "核对未签名安装包，完成谨慎的首次运行。", "/zh-cn/docs/getting-started/"],
      ["日志", "Wind Rose 内部设计", "v0.2 为什么增加第二条透明入口。", "/zh-cn/blog/wind-rose-ipv6/"],
    ],
    finalTitle: "让 Mac 成为家庭网络的控制点。",
    finalBody: "先接入一台设备，验收真实路径，再在拓扑准备好后扩大范围。",
    finalPrimary: "下载最新版本",
    finalSecondary: "阅读文档",
  },
} as const;

function GitHubMark() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
      />
    </svg>
  );
}

function markIpv6(text: string) {
  return text.split(/(IPv6)/i).map((part, index) =>
    part.toLowerCase() === "ipv6" ? (
      <span className="ipv6-mark" key={index}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const docsHref = locale === "en" ? "/docs/getting-started/" : "/zh-cn/docs/getting-started/";
  const ipv6Href = locale === "en" ? "/features/experimental-ipv6/" : "/zh-cn/features/experimental-ipv6/";
  const ps5Href = locale === "en" ? "/guides/ps5-proxy/" : "/zh-cn/guides/ps5-proxy/";

  return (
    <SiteShell locale={locale} alternateHref={c.alternateHref}>
      <JsonLd data={homeSchema(locale)} />
      <main lang={locale}>
        <section className="hero section-pad">
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />
          <div className="hero-grid page-width">
            <div className="hero-copy">
              <p className="eyebrow"><span />{c.badge}</p>
              <h1>{c.titleLead}<br /><em className={locale === "zh-CN" ? "zh-accent" : undefined}>{c.titleAccent}</em></h1>
              <p className="hero-intro">{c.intro}</p>
              <div className="hero-actions">
                <a className="button" href={RELEASES_URL}>{c.primaryCta}<span aria-hidden="true">↗</span></a>
                <a className="button button-ghost" href={REPOSITORY_URL}>
                  <GitHubMark />
                  {c.githubCta}
                  <span aria-hidden="true">↗</span>
                </a>
                <Link className="text-link" href={locale === "en" ? "/features/dhcp-gateway/" : "/zh-cn/features/dhcp-gateway/"}>
                  {c.secondaryCta}<span aria-hidden="true">→</span>
                </Link>
              </div>
              <p className="package-note">{c.packageNote}</p>
            </div>
            <div className="hero-visual">
              <div className="visual-label">{c.heroLabel}</div>
              <div className="app-window">
                <div className="window-bar"><span /><span /><span /><strong>OpenSurge Control</strong></div>
                <Image
                  src="/screenshots/dashboard.png"
                  alt={locale === "en" ? "OpenSurge whole-home gateway dashboard" : "OpenSurge 全屋网关控制面板"}
                  width={1408}
                  height={863}
                  sizes="(max-width: 900px) 94vw, 54vw"
                  priority
                />
              </div>
              <div className="status-row" aria-label={locale === "en" ? "Gateway status" : "网关状态"}>
                {c.status.map((status) => <span key={status}><i />{status}</span>)}
              </div>
            </div>
          </div>
          <div className="proof-grid page-width">
            {c.proof.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
        </section>

        <section className="capability-section section-pad">
          <div className="page-width">
            <div className="section-heading split-heading">
              <div><p className="eyebrow dark"><span />{c.problemEyebrow}</p><h2>{c.problemTitle}</h2></div>
              <p>{c.problemBody}</p>
            </div>
            <div className="capability-grid">
              {c.capabilities.map((item) => (
                <article className="capability-card" key={item.number}>
                  <span className="card-number">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <Link href={item.href}>{item.link}<span aria-hidden="true">→</span></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="topology-section section-pad">
          <div className="page-width">
            <div className="section-heading centered-heading">
              <p className="eyebrow dark"><span />{c.topologyEyebrow}</p>
              <h2>{c.topologyTitle}</h2>
              <p>{c.topologyBody}</p>
            </div>
            <div className="topology-grid">
              {c.topologies.map((topology) => (
                <article className="topology-card" key={topology.title}>
                  <Image src={topology.image} alt="" width={720} height={360} sizes="(max-width: 760px) 92vw, 30vw" />
                  <div>
                    <small>{topology.label}</small>
                    <h3>{topology.title}</h3>
                    <p>{topology.text}</p>
                    <p className="topology-ipv6">{c.topologyIpv6}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="policy-section section-pad">
          <div className="page-width media-split">
            <div className="media-frame">
              <Image src="/screenshots/devices.png" alt={locale === "en" ? "Per-device routing controls" : "按设备分流控制"} width={1600} height={1000} sizes="(max-width: 900px) 94vw, 50vw" />
            </div>
            <div className="media-copy">
              <p className="eyebrow"><span />{c.policyEyebrow}</p>
              <h2>{c.policyTitle}</h2>
              <p>{c.policyBody}</p>
              <Link className="text-link light" href={ps5Href}>{c.policyCta}<span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        <section className="ipv6-section section-pad">
          <div className="page-width media-split reverse">
            <div className="media-copy dark-copy">
              <p className="eyebrow dark"><span /><span>{markIpv6(c.ipv6Eyebrow)}</span></p>
              <h2>{c.ipv6Title}</h2>
              <p>{markIpv6(c.ipv6Body)}</p>
              <Link className="text-link" href={ipv6Href}>
                <span>{markIpv6(c.ipv6Cta)}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="rose-visual">
              <Image src="/og.png" alt={locale === "en" ? "Wind Rose IPv6 artwork" : "Wind Rose IPv6 视觉"} width={1280} height={640} sizes="(max-width: 900px) 94vw, 50vw" />
            </div>
          </div>
        </section>

        <section className="evidence-section section-pad">
          <div className="page-width evidence-grid">
            <div>
              <p className="eyebrow"><span />{c.evidenceEyebrow}</p>
              <h2>{c.evidenceTitle}</h2>
              <p>{c.evidenceBody}</p>
              <a className="text-link light" href={`${REPOSITORY_URL}/tree/master/tests/lab`}>
                {locale === "en" ? "Inspect the Virtual Lab" : "查看 Virtual Lab"}<span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="evidence-stack" aria-label={locale === "en" ? "Validation layers" : "验证层级"}>
              <div><span>01</span><strong>{locale === "en" ? "Unit & configuration tests" : "单元与配置测试"}</strong></div>
              <div><span>02</span><strong>{locale === "en" ? "Virtual host-network lab" : "虚拟 host-network Lab"}</strong></div>
              <div><span>03</span><strong>{locale === "en" ? "Topology-specific device evidence" : "拓扑对应的真实设备证据"}</strong></div>
            </div>
          </div>
        </section>

        <section className="learn-section section-pad">
          <div className="page-width">
            <div className="section-heading"><h2>{c.learnTitle}</h2></div>
            <div className="learn-grid">
              {c.learnCards.map(([label, title, text, href]) => (
                <Link className="learn-card" href={href} key={href}>
                  <small>{label}</small><h3>{title}</h3><p>{text}</p><span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta section-pad">
          <div className="page-width final-cta-inner">
            <div><h2>{c.finalTitle}</h2><p>{c.finalBody}</p></div>
            <div className="hero-actions">
              <a className="button button-light" href={RELEASES_URL}>{c.finalPrimary}<span aria-hidden="true">↗</span></a>
              <a className="button button-ghost" href={REPOSITORY_URL}>
                <GitHubMark />
                {c.githubCta}
                <span aria-hidden="true">↗</span>
              </a>
              <Link className="text-link light" href={docsHref}>{c.finalSecondary}<span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
