import type { Locale } from "@/lib/site";

export const sectionKeys = ["features", "guides", "docs", "blog"] as const;
export type SectionKey = (typeof sectionKeys)[number];

export type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ContentPage = {
  section: SectionKey;
  slug: string;
  locale: Locale;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  updatedAt: string;
  readingTime: string;
  sections: ContentSection[];
  faqs: { question: string; answer: string }[];
};

type SectionCopy = {
  label: string;
  title: string;
  description: string;
};

export const sectionCopy: Record<Locale, Record<SectionKey, SectionCopy>> = {
  en: {
    features: {
      label: "Features",
      title: "A gateway, not another proxy window",
      description:
        "Explore the network, routing, device-policy, and observability capabilities that turn a Mac into a whole-home control plane.",
    },
    guides: {
      label: "Guides",
      title: "Solve the network problem you actually have",
      description:
        "Practical, topology-aware guides for putting phones, consoles, TVs, and other devices behind an OpenSurge gateway.",
    },
    docs: {
      label: "Documentation",
      title: "Start carefully and verify each layer",
      description:
        "Installation and operating guidance with explicit boundaries for unsigned packages, DHCP, TUN, recovery, and experimental IPv6.",
    },
    blog: {
      label: "Project journal",
      title: "Releases, architecture, and evidence",
      description:
        "Readable explanations of OpenSurge releases and the engineering decisions behind its macOS gateway paths.",
    },
  },
  "zh-CN": {
    features: {
      label: "功能",
      title: "它是网关，不是另一个代理窗口",
      description:
        "了解 OpenSurge 如何把 Mac 变成覆盖网络接入、设备策略、流量观察与恢复控制的全屋控制面。",
    },
    guides: {
      label: "指南",
      title: "从你真正要解决的网络问题开始",
      description:
        "面向手机、游戏机、电视和其他下游设备的实用指南，每一步都明确适用拓扑与验收边界。",
    },
    docs: {
      label: "文档",
      title: "谨慎开始，逐层验证",
      description:
        "覆盖未签名安装包、DHCP、TUN、恢复流程和实验性 IPv6 的安装与运行说明。",
    },
    blog: {
      label: "项目日志",
      title: "版本、架构与证据",
      description:
        "用可读的方式解释 OpenSurge 版本变化，以及 macOS 网关路径背后的工程决策。",
    },
  },
};

const englishPages: ContentPage[] = [
  {
    section: "features",
    slug: "dhcp-gateway",
    locale: "en",
    eyebrow: "DHCP & DNS gateway",
    title: "Turn a Mac into a gateway for the devices that need it",
    description:
      "How OpenSurge combines dnsmasq DHCP/DNS, mihomo TUN, macOS packet forwarding, and recovery controls for whole-home routing.",
    intro:
      "A proxy app changes traffic on one computer. OpenSurge lets the Mac take responsibility for downstream devices as a real network gateway, with a topology you choose and a recovery path you can audit.",
    image: "/screenshots/dashboard.png",
    imageAlt: "OpenSurge dashboard showing gateway and service status",
    keywords: [
      "macOS DHCP gateway",
      "Mac as router",
      "whole-home proxy gateway",
      "dnsmasq macOS",
    ],
    updatedAt: "2026-08-21",
    readingTime: "6 min read",
    sections: [
      {
        heading: "More than an HTTP proxy",
        paragraphs: [
          "OpenSurge coordinates the pieces required for gateway operation instead of asking every device to understand a proxy protocol. dnsmasq can provide DHCP and DNS, mihomo supplies policy and proxy egress, and macOS provides IPv4 forwarding and pf NAT.",
          "The Web GUI and menu bar app sit above those components as a control plane. They show applied state, guide recovery, and keep high-risk network changes behind explicit actions.",
        ],
      },
      {
        heading: "Choose the smallest topology that solves the problem",
        paragraphs: [
          "Most first-time users should begin with bypass-router mode. The existing router keeps DHCP enabled; only selected devices use a stable IPv4 address and point their gateway and DNS to the Mac.",
        ],
        bullets: [
          "Bypass-router mode: manual onboarding for selected devices.",
          "LAN DHCP takeover: automatic IPv4 onboarding after the router DHCP service is disabled.",
          "Isolated downstream LAN: a separate AP, SSID, VLAN, or interface with OpenSurge as its gateway.",
        ],
      },
      {
        heading: "Recovery is part of the feature",
        paragraphs: [
          "Changing DHCP, forwarding, or packet-filter state can disconnect a household if it is treated like a cosmetic setting. OpenSurge records ownership, validates startup, rolls back failures, and exposes a guided stop and recovery flow.",
          "A healthy Mac process is not the final acceptance test. A downstream client must receive or use the expected gateway and DNS, resolve names, reach HTTPS without an explicit proxy, and leave evidence in the intended TUN path.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I have to disable DHCP on my router?",
        answer:
          "No. Bypass-router mode keeps router DHCP enabled and manually onboards selected devices. Router DHCP must be disabled only for LAN DHCP takeover, where OpenSurge becomes the sole DHCP server on that broadcast domain.",
      },
      {
        question: "Does OpenSurge replace my router?",
        answer:
          "It can become the gateway for selected devices or a downstream network, but your existing router still provides the upstream internet connection unless you design a different topology.",
      },
    ],
  },
  {
    section: "features",
    slug: "per-device-routing",
    locale: "en",
    eyebrow: "Per-device policy",
    title: "Give every device an independent route without running another core",
    description:
      "Route a phone, TV, game console, or VR headset through different mihomo selectors while keeping one auditable OpenSurge gateway.",
    intro:
      "OpenSurge maps stable device identity to source-scoped mihomo rules. A phone can follow the normal rules, a console can use a dedicated selector, and a TV can use a streaming route—all through one gateway process.",
    image: "/screenshots/devices.png",
    imageAlt: "OpenSurge device policy interface",
    keywords: [
      "per-device proxy routing",
      "PS5 proxy gateway",
      "Apple TV proxy",
      "mihomo device policy",
    ],
    updatedAt: "2026-08-21",
    readingTime: "5 min read",
    sections: [
      {
        heading: "Identity first, policy second",
        paragraphs: [
          "In DHCP-managed topologies, OpenSurge uses a reservation to keep a device on a stable IPv4 address and associates that address with its MAC identity. In bypass-router mode, a stable router-side IPv4 address is enough to start; MAC information can remain optional.",
          "The generated mihomo overlay places source-specific rules before the ordinary global rules. That makes device behavior explicit without turning each device into a separate proxy client.",
        ],
      },
      {
        heading: "Dedicated does not mean isolated from the LAN",
        paragraphs: [
          "A dedicated egress selector applies to public traffic. Local and private destinations remain direct so casting, local services, game discovery, and controller traffic can continue to work inside the household network.",
        ],
        bullets: [
          "Follow the gateway rule set.",
          "Use a device-specific selector for public destinations.",
          "Apply targeted overrides by domain, IP, protocol, port, or rule provider.",
          "Reject selected traffic for a specific device.",
        ],
      },
      {
        heading: "Observe the actual egress chain",
        paragraphs: [
          "The Web GUI attributes active connections and transfer rates to observed or registered devices. It shows the outbound chain reported by mihomo instead of assuming that the selected label is the route a connection actually used.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does changing the Mac local mode change device policy?",
        answer:
          "No. The Mac local rule/global/direct switch is source-scoped and does not replace the policies generated for downstream devices.",
      },
      {
        question: "Can an unmanaged device receive a dedicated route?",
        answer:
          "The device needs a stable source identity. In bypass-router mode that can be a stable IPv4 address; DHCP-managed modes normally use a reservation with MAC identity.",
      },
    ],
  },
  {
    section: "features",
    slug: "mihomo-control-plane",
    locale: "en",
    eyebrow: "Powered by mihomo",
    title: "Use the mihomo ecosystem without reducing the product to a skin",
    description:
      "OpenSurge uses mihomo as its proxy engine and adds the macOS gateway lifecycle, DHCP/DNS, device policy, observability, and recovery around it.",
    intro:
      "mihomo is the proxy engine. OpenSurge is the macOS gateway and control plane that makes that engine usable for an entire downstream network.",
    image: "/screenshots/policies.png",
    imageAlt: "OpenSurge policy groups and proxy health interface",
    keywords: [
      "mihomo macOS gateway",
      "mihomo whole home proxy",
      "mihomo TUN Mac",
      "mihomo control plane",
    ],
    updatedAt: "2026-08-21",
    readingTime: "4 min read",
    sections: [
      {
        heading: "Import the ecosystem, retain gateway ownership",
        paragraphs: [
          "OpenSurge can import compatible mihomo profile sections for proxies, groups, providers, and rules. It deliberately retains ownership of gateway-critical DNS, TUN, controller, and listener fields so an imported subscription cannot silently redefine the network lifecycle.",
        ],
      },
      {
        heading: "One engine, several responsibilities around it",
        paragraphs: [
          "The control plane starts and validates processes, generates device overlays, monitors policy groups and providers, correlates connections with LAN identity, and guides network recovery. Those responsibilities are outside the scope of an ordinary profile editor.",
        ],
        bullets: [
          "TUN-based transparent routing on supported macOS paths.",
          "DHCP/DNS coordination through dnsmasq.",
          "pf NAT and IPv4 forwarding lifecycle management.",
          "Per-device selectors and rule overrides.",
          "Web GUI, menu bar status, diagnostics, and recovery.",
        ],
      },
      {
        heading: "Compatibility still depends on the source profile",
        paragraphs: [
          "A node protocol name alone is not a guarantee. UUIDs, transport and TLS parameters, rule providers, and server-side settings still need to match. OpenSurge validates the composed runtime configuration before applying it.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is OpenSurge a fork of mihomo?",
        answer:
          "OpenSurge is a separate macOS gateway and control-plane project. It embeds a project-built mihomo engine and maintains a narrow patched packet listener for the experimental downstream IPv6 data path.",
      },
      {
        question: "Can I import an existing subscription?",
        answer:
          "Yes, when it is compatible with the mihomo configuration format. OpenSurge imports policy content while preserving fields that belong to gateway safety and lifecycle management.",
      },
    ],
  },
  {
    section: "features",
    slug: "experimental-ipv6",
    locale: "en",
    eyebrow: "Experimental downstream IPv6",
    title: "Two transparent data paths, one device-policy model",
    description:
      "Learn how OpenSurge handles downstream IPv6 with RA/SLAAC/RDNSS, a macOS BPF broker, and a patched mihomo userspace path.",
    intro:
      "OpenSurge v0.2 introduces an experimental downstream IPv6 path. It shares mihomo rules and egress with the IPv4 gateway, but it does not pretend that downstream IPv6 packets enter the macOS system TUN.",
    image: "/og.png",
    imageAlt: "OpenSurge Wind Rose IPv6 project artwork",
    keywords: [
      "macOS IPv6 gateway",
      "IPv6 transparent proxy Mac",
      "mihomo IPv6 gateway",
      "downstream IPv6 proxy",
    ],
    updatedAt: "2026-08-21",
    readingTime: "7 min read",
    sections: [
      {
        heading: "IPv4 and IPv6 enter through different doors",
        paragraphs: [
          "Mac-local and downstream IPv4 traffic use the supported mihomo TUN path. Downstream IPv6 is captured from the selected physical interface by a macOS BPF broker and handed to the project-patched opensurge-packet listener in mihomo's userspace gVisor stack.",
          "The packet channel carries source MAC identity alongside the layer-3 packet. That lets the IPv6 connection reuse the same device mapping, policy overlays, and outbound selection model.",
        ],
      },
      {
        heading: "Topology remains a hard requirement",
        paragraphs: [
          "Automatic downstream IPv6 uses dnsmasq RA, SLAAC, and RDNSS in supported topologies. A shared layer-2 network must not have a competing IPv6 router advertisement or default route. Bypass-router mode uses a manual ULA setup instead of pretending it can selectively override another router's RA.",
        ],
      },
      {
        heading: "Reachability is not the same as native IPv6",
        paragraphs: [
          "An IPv6 destination can work through a proxy exit even when the ISP does not provide native public IPv6. Native DIRECT IPv6 still requires upstream addressing and a valid route; OpenSurge cannot manufacture carrier connectivity.",
          "The capability remains experimental because packet ingress, topology control, device identity, QUIC, and stop-time withdrawal all need host-network validation—not only unit tests.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does IPv6 traffic go through the macOS utun interface?",
        answer:
          "Downstream IPv6 does not. It uses the BPF broker and patched mihomo userspace packet listener. The overall gateway still requires transparent mode to remain set to TUN.",
      },
      {
        question: "Do I need native ISP IPv6?",
        answer:
          "Not for every proxied IPv6 destination. You do need native upstream IPv6 for true DIRECT public IPv6 egress; otherwise reachability depends on an IPv6-capable proxy exit.",
      },
    ],
  },
  {
    section: "guides",
    slug: "mac-as-router",
    locale: "en",
    eyebrow: "Topology guide",
    title: "Use a Mac as a proxy gateway without redesigning the whole LAN",
    description:
      "Start with OpenSurge bypass-router mode, onboard one stable device, and verify gateway, DNS, HTTPS, and TUN evidence layer by layer.",
    intro:
      "The safest first OpenSurge setup changes one client, not the entire household. Keep the router's DHCP service running, give one test device a stable IPv4 identity, and point only that device at the Mac.",
    image: "/screenshots/dashboard.png",
    imageAlt: "OpenSurge gateway dashboard used for readiness checks",
    keywords: [
      "Mac as router",
      "Mac bypass router",
      "macOS transparent proxy gateway",
      "Mac whole home proxy",
    ],
    updatedAt: "2026-08-21",
    readingTime: "6 min read",
    sections: [
      {
        heading: "Prove the topology before enabling takeover",
        paragraphs: [
          "The Mac and test device must be on a network where the device can reach the Mac directly. Confirm the Mac's ordinary upstream connection first, then confirm both devices share the expected IPv4 subnet and can communicate.",
        ],
        bullets: [
          "Give the Mac a stable LAN address.",
          "Keep the router DHCP service enabled.",
          "Reserve or manually assign a stable IPv4 address to the test device.",
          "Set that device's gateway and DNS to the Mac address.",
        ],
      },
      {
        heading: "Register the device and choose its egress",
        paragraphs: [
          "Open the local Web GUI from the menu bar app, register the device by its stable IPv4 identity, and initially let it follow the gateway rules. A dedicated selector can be introduced after baseline connectivity works.",
        ],
      },
      {
        heading: "Accept the path from the client outward",
        paragraphs: [
          "Verify the device is using the Mac as gateway and DNS, resolves a real hostname, reaches an HTTPS service without an explicit proxy, and appears in OpenSurge connections with the expected mihomo outbound chain.",
          "If any layer fails, stop at that layer. A green dashboard alone does not prove that the downstream device used the gateway path.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can the Mac stay connected to the router over Ethernet?",
        answer:
          "Yes. What matters is the actual layer-2 and IPv4 topology between the Mac, router, and downstream client, not whether the Mac's upstream link is wired or wireless.",
      },
      {
        question: "Should I begin with whole-LAN DHCP takeover?",
        answer:
          "Usually no. Start with bypass-router mode and one test device. Move to DHCP takeover only when you want automatic onboarding and have a clear router-DHCP recovery plan.",
      },
    ],
  },
  {
    section: "guides",
    slug: "ps5-proxy",
    locale: "en",
    eyebrow: "Game console guide",
    title: "Route a PS5 through a Mac gateway with its own policy",
    description:
      "Put a PS5 behind OpenSurge, keep local traffic direct, and select a dedicated mihomo egress without configuring an application proxy on the console.",
    intro:
      "A console cannot run the same proxy clients as a Mac or phone. OpenSurge solves that at the network layer: the PS5 sends ordinary IP traffic to the Mac gateway, then device policy chooses the egress.",
    image: "/screenshots/devices.png",
    imageAlt: "OpenSurge device policy view with dedicated routing controls",
    keywords: [
      "PS5 proxy through Mac",
      "PS5 transparent proxy",
      "game console proxy gateway",
      "PS5 mihomo",
    ],
    updatedAt: "2026-08-21",
    readingTime: "5 min read",
    sections: [
      {
        heading: "Give the console a stable network identity",
        paragraphs: [
          "In bypass-router mode, reserve a stable IPv4 address for the PS5 on the existing router and set the PS5 gateway and DNS to the Mac. In a DHCP-managed topology, OpenSurge creates a fixed lease from the console's MAC address.",
        ],
      },
      {
        heading: "Start with inherited rules, then specialize",
        paragraphs: [
          "First confirm the console can resolve names and reach the network while following the gateway rules. After that baseline passes, give it a dedicated selector with appropriate candidates for the target game region.",
        ],
        bullets: [
          "Keep private and local destinations direct.",
          "Use a dedicated selector for public game and service traffic.",
          "Add targeted domain, IP, protocol, or port overrides only when evidence requires them.",
          "Check active connections for the actual outbound chain.",
        ],
      },
      {
        heading: "Test sessions, not only a web page",
        paragraphs: [
          "Console connectivity includes DNS, HTTPS, UDP, NAT behavior, and long-lived game sessions. A browser-like probe cannot prove all of them. Test the account sign-in and one real game session, then compare OpenSurge connection evidence with the selected policy.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does the PS5 need an explicit proxy address?",
        answer:
          "No. In the gateway path it uses ordinary IP networking and points its gateway and DNS to the Mac, or receives those settings from OpenSurge DHCP.",
      },
      {
        question: "Will a dedicated selector proxy local console traffic?",
        answer:
          "OpenSurge keeps local and private destinations direct in dedicated mode. Public destinations are evaluated by the console-specific policy.",
      },
    ],
  },
  {
    section: "docs",
    slug: "getting-started",
    locale: "en",
    eyebrow: "Getting started",
    title: "Install OpenSurge, verify the package, and onboard one device",
    description:
      "A careful first-run path for the unsigned macOS package, the local Web GUI, bypass-router mode, and downstream client validation.",
    intro:
      "OpenSurge changes real network state, so the first run should be deliberate. Verify the package provenance, open the local control plane, keep the gateway stopped while configuring, and start with one test device.",
    image: "/screenshots/dashboard.png",
    imageAlt: "OpenSurge Web GUI overview after installation",
    keywords: [
      "install OpenSurge for Mac",
      "OpenSurge unsigned pkg",
      "macOS proxy gateway setup",
      "OpenSurge getting started",
    ],
    updatedAt: "2026-08-21",
    readingTime: "7 min read",
    sections: [
      {
        heading: "Download the correct unsigned package",
        paragraphs: [
          "Choose the arm64 package for Apple Silicon or the x86_64 package for an Intel Mac. Download SHA256SUMS from the same GitHub Release and verify the selected file before installation.",
          "Formal releases are built by GitHub Actions with provenance, but the packages are not Developer ID signed or notarized. If Gatekeeper blocks the installer, use System Settings → Privacy & Security → Open Anyway for that package. Do not disable Gatekeeper globally.",
        ],
      },
      {
        heading: "Configure while the gateway is stopped",
        paragraphs: [
          "Open the menu bar app and its local Web GUI. Import a compatible mihomo profile or subscription, review network mode, and keep experimental IPv6 off for the first IPv4 acceptance unless it is the feature you are specifically testing.",
        ],
        bullets: [
          "Begin with bypass-router mode for one device.",
          "Confirm the Mac's stable LAN address.",
          "Register the test device's stable IPv4 identity.",
          "Apply configuration, then start the gateway explicitly.",
        ],
      },
      {
        heading: "Verify the client path and stop cleanly",
        paragraphs: [
          "From the downstream client, confirm gateway, DNS, hostname resolution, HTTPS reachability, and connection visibility. When the test is complete, stop OpenSurge through the control plane and confirm the expected network service is restored.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are the release packages signed and notarized?",
        answer:
          "No. Current public packages are explicitly unsigned. Verify SHA-256 checksums and GitHub build provenance, then use the per-package Gatekeeper override if you trust the release.",
      },
      {
        question: "Does opening the app immediately start the gateway?",
        answer:
          "No. Installation starts the local helper and control service, but the gateway remains stopped until you explicitly start it from the control plane.",
      },
    ],
  },
  {
    section: "blog",
    slug: "wind-rose-ipv6",
    locale: "en",
    eyebrow: "Wind Rose · v0.2",
    title: "Why Wind Rose adds a second transparent path for downstream IPv6",
    description:
      "The design story behind OpenSurge v0.2's experimental downstream IPv6 ingress and its shared device-policy model.",
    intro:
      "Wind Rose is the v0.2 release theme: one gateway, traffic arriving from different directions, and an explicit map of where each packet actually enters the data plane.",
    image: "/og.png",
    imageAlt: "Wind Rose artwork for OpenSurge v0.2",
    keywords: [
      "OpenSurge Wind Rose",
      "OpenSurge v0.2",
      "macOS BPF IPv6 proxy",
      "mihomo opensurge-packet",
    ],
    updatedAt: "2026-08-21",
    readingTime: "5 min read",
    sections: [
      {
        heading: "The system TUN is not the whole map",
        paragraphs: [
          "The established macOS TUN path remains responsible for Mac-local and downstream IPv4 transparent routing. Darwin does not deliver downstream IPv6 ingress to that utun path in the way OpenSurge needs, so v0.2 adds a bounded userspace packet channel instead of reviving unsupported redirection mechanisms.",
        ],
      },
      {
        heading: "Preserve the device identity at ingress",
        paragraphs: [
          "The BPF broker observes the selected physical interface and sends the packet plus its source MAC over a permission-restricted Unix datagram. The patched mihomo listener maps that identity into the same device-policy namespace used by the control plane.",
        ],
      },
      {
        heading: "Experimental is an engineering boundary",
        paragraphs: [
          "The label is not decorative. Shared-L2 RA competition, upstream capability, packet protocols, QUIC, device identity, and clean withdrawal all require topology-specific host-network evidence. The public documentation describes only the paths that have matching validation gates.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why is the release called Wind Rose?",
        answer:
          "The name reflects several ingress directions converging on one auditable policy and egress system, while keeping each data path explicit.",
      },
      {
        question: "Did v0.2 replace mihomo TUN?",
        answer:
          "No. TUN remains the supported transparent path for Mac-local and downstream IPv4 traffic. The packet listener is a separate experimental ingress for downstream IPv6.",
      },
    ],
  },
];

const chinesePages: ContentPage[] = [
  {
    ...englishPages[0],
    locale: "zh-CN",
    eyebrow: "DHCP 与 DNS 网关",
    title: "让 Mac 成为需要接入设备的真实网关",
    description:
      "了解 OpenSurge 如何组合 dnsmasq DHCP/DNS、mihomo TUN、macOS 转发与恢复控制，实现全屋网络接入。",
    intro:
      "普通代理应用只改变一台电脑的流量。OpenSurge 让 Mac 对下游设备承担真正的网关职责，同时把拓扑选择、运行状态和恢复路径放进可审计的控制面。",
    imageAlt: "展示网关和服务状态的 OpenSurge 控制面板",
    keywords: ["macOS DHCP 网关", "Mac 旁路由", "全屋透明代理", "Mac 当网关"],
    readingTime: "阅读约 6 分钟",
    sections: [
      {
        heading: "不只是 HTTP 代理",
        paragraphs: [
          "OpenSurge 负责协调成为网关所需的多个组件，而不是要求每台设备理解代理协议。dnsmasq 可提供 DHCP/DNS，mihomo 负责策略与代理出口，macOS 提供 IPv4 forwarding 和 pf NAT。",
          "Web GUI 与菜单栏 App 位于这些组件之上，展示实际应用状态、引导恢复，并让高风险网络变更只能通过明确操作发生。",
        ],
      },
      {
        heading: "选择能解决问题的最小拓扑",
        paragraphs: [
          "首次体验通常应从旁路由模式开始：主路由继续提供 DHCP，只让指定设备使用稳定 IPv4，并把网关与 DNS 指向 Mac。",
        ],
        bullets: [
          "旁路由模式：手工接入少量指定设备。",
          "局域网 DHCP 接管：关闭主路由 DHCP 后自动接入 IPv4 设备。",
          "独立下游 LAN：通过独立 AP、SSID、VLAN 或接口形成单独网络。",
        ],
      },
      {
        heading: "恢复能力本身就是功能",
        paragraphs: [
          "DHCP、转发或 pf 状态不是普通界面开关。OpenSurge 会记录状态归属、验证启动、在失败时回滚，并提供明确的停止和网络恢复流程。",
          "Mac 上进程健康并不是最终验收。下游设备还必须实际使用预期网关与 DNS、完成解析和 HTTPS，并在对应 TUN 路径留下证据。",
        ],
      },
    ],
    faqs: [
      {
        question: "必须关闭主路由 DHCP 吗？",
        answer:
          "不必。旁路由模式保持主路由 DHCP 开启，只手工接入指定设备。只有局域网 DHCP 接管要求关闭同一广播域里的主路由 DHCP。",
      },
      {
        question: "OpenSurge 会替代主路由吗？",
        answer:
          "它可以成为指定设备或独立下游网络的网关，但在常见拓扑中，原有路由器仍负责提供上游互联网连接。",
      },
    ],
  },
  {
    ...englishPages[1],
    locale: "zh-CN",
    eyebrow: "按设备策略",
    title: "一个网关核心，也能让每台设备拥有独立出口",
    description:
      "让手机、电视、游戏机或 VR 设备分别使用不同的 mihomo Selector，同时保持一个可审计的 OpenSurge 网关。",
    intro:
      "OpenSurge 把稳定设备身份映射到按来源生效的 mihomo 规则。手机可以跟随全局规则，游戏机使用专属出口，电视选择流媒体节点，而不需要为每台设备运行代理客户端。",
    imageAlt: "OpenSurge 按设备策略界面",
    keywords: ["按设备分流", "PS5 代理网关", "Apple TV 代理", "mihomo 设备策略"],
    readingTime: "阅读约 5 分钟",
    sections: [
      {
        heading: "先确定身份，再应用策略",
        paragraphs: [
          "在 DHCP 接管拓扑中，OpenSurge 通过固定租约让设备保持稳定 IPv4，并关联 MAC 身份。旁路由模式只要主路由侧保持稳定 IPv4 就能开始，MAC 可以作为可选信息。",
          "生成的 mihomo overlay 会把设备来源规则放在普通全局规则之前，因此无需把每台设备变成独立代理客户端。",
        ],
      },
      {
        heading: "专属出口不等于隔离局域网",
        paragraphs: [
          "专属 Selector 作用于公网流量，本地和私有目标仍保持直连，从而保留投屏、局域网服务、游戏发现和控制器通信。",
        ],
        bullets: [
          "跟随网关规则。",
          "为公网目标使用设备专属 Selector。",
          "按域名、IP、协议、端口或规则提供者增加覆盖。",
          "对指定设备拒绝特定流量。",
        ],
      },
      {
        heading: "观察实际出口链",
        paragraphs: [
          "Web GUI 会把活跃连接和速率归属到观察到或已登记的设备，并展示 mihomo 报告的实际 outbound chain，而不是把界面选择标签当作连接事实。",
        ],
      },
    ],
    faqs: [
      {
        question: "切换 Mac 本机模式会改变设备策略吗？",
        answer:
          "不会。Mac 本机的规则、全局、直连切换只针对本机来源，不会替换为下游设备生成的策略。",
      },
      {
        question: "未被 DHCP 管理的设备可以使用专属出口吗？",
        answer:
          "可以，但设备需要稳定来源身份。旁路由模式可使用稳定 IPv4；DHCP 接管模式通常使用带 MAC 的固定租约。",
      },
    ],
  },
  {
    ...englishPages[2],
    locale: "zh-CN",
    eyebrow: "由 mihomo 驱动",
    title: "使用 mihomo 生态，但不把产品缩减成换皮界面",
    description:
      "OpenSurge 以 mihomo 为代理引擎，并围绕它提供 macOS 网关生命周期、DHCP/DNS、设备策略、可观测性和恢复控制。",
    intro:
      "mihomo 是代理引擎；OpenSurge 是让这个引擎服务整个下游网络的 macOS 网关与控制面。",
    imageAlt: "OpenSurge 策略组与节点健康界面",
    keywords: ["mihomo macOS 网关", "mihomo 全屋代理", "mihomo TUN Mac", "mihomo 控制面"],
    readingTime: "阅读约 4 分钟",
    sections: [
      {
        heading: "导入生态内容，保留网关归属",
        paragraphs: [
          "OpenSurge 可以导入兼容的 mihomo 节点、策略组、provider 和规则，但会保留 DNS、TUN、Controller 与 Listener 等网关关键字段的控制权，避免订阅静默改写网络生命周期。",
        ],
      },
      {
        heading: "一个引擎，外围有完整网关职责",
        paragraphs: [
          "控制面负责启停与验证进程、生成设备 overlay、观察策略组和 provider、把连接关联到 LAN 设备身份，并引导网络恢复。这些职责超出了普通配置编辑器的范围。",
        ],
        bullets: [
          "mihomo TUN 透明路由。",
          "dnsmasq DHCP/DNS 协调。",
          "pf NAT 与 IPv4 forwarding 生命周期。",
          "按设备 Selector 与规则覆盖。",
          "Web GUI、菜单栏状态、诊断与恢复。",
        ],
      },
      {
        heading: "兼容性仍取决于配置与服务端",
        paragraphs: [
          "协议名称本身不是可用性保证。UUID、传输/TLS 参数、规则提供者和服务端设置仍需匹配，OpenSurge 会在应用前验证组合后的运行时配置。",
        ],
      },
    ],
    faqs: [
      {
        question: "OpenSurge 是 mihomo 的 fork 吗？",
        answer:
          "OpenSurge 是独立的 macOS 网关与控制面项目。它内置项目构建的 mihomo，并为实验性下游 IPv6 维护窄范围的 packet listener 补丁。",
      },
      {
        question: "可以导入已有订阅吗？",
        answer:
          "可以，前提是订阅兼容 mihomo 配置格式。OpenSurge 导入策略内容，同时保留属于网关安全与生命周期的字段。",
      },
    ],
  },
  {
    ...englishPages[3],
    locale: "zh-CN",
    eyebrow: "实验性下游 IPv6",
    title: "两条透明数据路径，共用一套设备策略",
    description:
      "了解 OpenSurge 如何通过 RA/SLAAC/RDNSS、macOS BPF broker 与 patched mihomo 用户态路径处理下游 IPv6。",
    intro:
      "OpenSurge v0.2 引入实验性下游 IPv6。它与 IPv4 网关共享 mihomo 规则和出口，但不会声称下游 IPv6 数据包进入了 macOS 系统 TUN。",
    imageAlt: "OpenSurge Wind Rose IPv6 项目视觉",
    keywords: ["macOS IPv6 网关", "IPv6 透明代理 Mac", "mihomo IPv6 网关", "下游 IPv6 接管"],
    readingTime: "阅读约 7 分钟",
    sections: [
      {
        heading: "IPv4 与 IPv6 从不同入口进入",
        paragraphs: [
          "Mac 本机与下游 IPv4 使用受支持的 mihomo TUN。下游 IPv6 则由 macOS BPF broker 从选定物理接口捕获，再交给项目补丁提供的 opensurge-packet listener 和 mihomo gVisor 用户态栈。",
          "packet channel 会把来源 MAC 与三层数据包一起传递，使 IPv6 连接能够复用相同的设备映射、策略 overlay 和出口选择模型。",
        ],
      },
      {
        heading: "拓扑仍然是硬前提",
        paragraphs: [
          "支持的自动接入拓扑使用 dnsmasq RA、SLAAC 与 RDNSS。共享二层网络不能存在竞争的 IPv6 RA 或默认路由；旁路由模式使用手工 ULA，而不是假装能够选择性覆盖其他路由器的 RA。",
        ],
      },
      {
        heading: "可达不等于原生公网 IPv6",
        paragraphs: [
          "即使运营商没有提供原生公网 IPv6，IPv6 目标仍可能通过具备 IPv6 的代理出口访问。真正的 DIRECT 公网 IPv6 仍要求上游地址和有效路由。",
          "这项能力保留实验性标签，因为 ingress、拓扑控制、设备身份、QUIC 与停止撤销都需要 host-network 验证，不能只靠单元测试。",
        ],
      },
    ],
    faqs: [
      {
        question: "下游 IPv6 会进入 macOS utun 吗？",
        answer:
          "不会。它使用 BPF broker 与 patched mihomo 用户态 packet listener；但网关整体仍要求透明模式保持为 TUN。",
      },
      {
        question: "必须有运营商原生 IPv6 吗？",
        answer:
          "代理访问并不一定需要，但真正的 DIRECT 公网 IPv6 必须有上游原生 IPv6。否则可达性取决于代理出口。",
      },
    ],
  },
  {
    ...englishPages[4],
    locale: "zh-CN",
    eyebrow: "拓扑指南",
    title: "让 Mac 成为代理网关，而不必重新设计整个局域网",
    description:
      "从 OpenSurge 旁路由模式开始，只接入一台稳定设备，并逐层验证网关、DNS、HTTPS 与 TUN 证据。",
    intro:
      "最安全的首次配置只改变一台客户端，而不是整个家庭网络。保持主路由 DHCP 开启，给测试设备稳定 IPv4，并只让它指向 Mac。",
    imageAlt: "用于检查网关就绪状态的 OpenSurge 控制面板",
    keywords: ["Mac 当旁路由", "Mac 当网关", "macOS 透明代理网关", "Mac 全屋代理"],
    readingTime: "阅读约 6 分钟",
    sections: [
      {
        heading: "启用接管前先证明拓扑",
        paragraphs: [
          "Mac 与测试设备必须位于能够直接互通的网络。先确认 Mac 的普通上游连接，再确认两台设备处于预期 IPv4 子网并可以互相访问。",
        ],
        bullets: [
          "为 Mac 保持稳定 LAN 地址。",
          "保持主路由 DHCP 开启。",
          "为测试设备保留或手工配置稳定 IPv4。",
          "把该设备的网关与 DNS 设置为 Mac。",
        ],
      },
      {
        heading: "登记设备并选择出口",
        paragraphs: [
          "从菜单栏 App 打开本地 Web GUI，按稳定 IPv4 登记设备，并先让它跟随网关规则。基线连通后再引入专属 Selector。",
        ],
      },
      {
        heading: "从客户端向外逐层验收",
        paragraphs: [
          "确认设备实际使用 Mac 作为网关与 DNS，能够解析真实域名、无需显式代理访问 HTTPS，并在 OpenSurge 连接页显示预期 mihomo 出口链。",
          "任何一层失败都应停在该层排查。控制面全绿不能单独证明下游设备真的走过网关。",
        ],
      },
    ],
    faqs: [
      {
        question: "Mac 可以通过以太网上联路由器吗？",
        answer:
          "可以。关键是 Mac、路由器和下游客户端之间的真实二层与 IPv4 拓扑，而不是上游链路名称。",
      },
      {
        question: "应该直接从全局 DHCP 接管开始吗？",
        answer:
          "通常不建议。先用旁路由模式验收一台设备；只有需要自动接入并已有主路由 DHCP 恢复计划时，再使用 DHCP 接管。",
      },
    ],
  },
  {
    ...englishPages[5],
    locale: "zh-CN",
    eyebrow: "游戏机指南",
    title: "让 PS5 通过 Mac 网关使用独立策略",
    description:
      "把 PS5 接入 OpenSurge，保持局域网目标直连，并为公网流量选择专属 mihomo 出口，无需在游戏机上配置应用代理。",
    intro:
      "游戏机不能像 Mac 或手机那样运行代理客户端。OpenSurge 在网络层解决这个问题：PS5 把普通 IP 流量交给 Mac 网关，再由设备策略选择出口。",
    imageAlt: "带专属出口控制的 OpenSurge 设备策略界面",
    keywords: ["PS5 通过 Mac 代理", "PS5 透明代理", "游戏机代理网关", "PS5 mihomo"],
    readingTime: "阅读约 5 分钟",
    sections: [
      {
        heading: "给游戏机稳定网络身份",
        paragraphs: [
          "旁路由模式下，在主路由上为 PS5 保留稳定 IPv4，并把 PS5 网关与 DNS 指向 Mac。DHCP 接管拓扑则由 OpenSurge 根据游戏机 MAC 创建固定租约。",
        ],
      },
      {
        heading: "先跟随规则，再专门优化",
        paragraphs: [
          "先确认游戏机跟随网关规则时能够解析和联网。基线通过后，再为它配置带目标区域候选节点的专属 Selector。",
        ],
        bullets: [
          "局域网与私有目标保持直连。",
          "公网游戏与服务流量使用专属 Selector。",
          "只有在证据需要时才添加域名、IP、协议或端口覆盖。",
          "从活跃连接确认实际出口链。",
        ],
      },
      {
        heading: "测试真实会话，而不只是网页",
        paragraphs: [
          "游戏机连通包含 DNS、HTTPS、UDP、NAT 和长连接。浏览器式探测不能证明全部路径，应实际测试账号登录和一局游戏，并将连接证据与策略选择对照。",
        ],
      },
    ],
    faqs: [
      {
        question: "PS5 需要填写显式代理地址吗？",
        answer:
          "不需要。网关模式使用普通 IP 网络，PS5 只需把网关与 DNS 指向 Mac，或从 OpenSurge DHCP 获取这些设置。",
      },
      {
        question: "专属 Selector 会代理局域网流量吗？",
        answer:
          "不会。dedicated 模式下本地与私有目标保持直连，公网目标才由设备策略评估。",
      },
    ],
  },
  {
    ...englishPages[6],
    locale: "zh-CN",
    eyebrow: "快速开始",
    title: "安装 OpenSurge、验证安装包并接入一台设备",
    description:
      "谨慎完成未签名 macOS 安装包、本地 Web GUI、旁路由模式与下游客户端验收。",
    intro:
      "OpenSurge 会修改真实网络状态，因此首次运行应保持克制：验证安装包来源，打开本地控制面，在网关停止状态下完成配置，并从一台测试设备开始。",
    imageAlt: "安装后的 OpenSurge Web GUI 总览",
    keywords: ["安装 OpenSurge", "OpenSurge 未签名 pkg", "macOS 代理网关配置", "OpenSurge 入门"],
    readingTime: "阅读约 7 分钟",
    sections: [
      {
        heading: "下载正确的未签名安装包",
        paragraphs: [
          "Apple Silicon 选择 arm64，Intel Mac 选择 x86_64。一起下载同一 GitHub Release 的 SHA256SUMS，并在安装前核对文件。",
          "正式发布由 GitHub Actions 构建并提供 provenance，但当前 PKG 没有 Developer ID 签名或 notarization。若 Gatekeeper 阻止，请只对该安装包使用“系统设置 → 隐私与安全性 → 仍要打开”，不要全局关闭 Gatekeeper。",
        ],
      },
      {
        heading: "在网关停止时配置",
        paragraphs: [
          "从菜单栏 App 打开本地 Web GUI，导入兼容的 mihomo 配置或订阅，检查网络模式。首次 IPv4 验收时建议保持实验性 IPv6 关闭，除非你专门测试它。",
        ],
        bullets: [
          "从一台设备的旁路由模式开始。",
          "确认 Mac 的稳定 LAN 地址。",
          "登记测试设备的稳定 IPv4。",
          "应用配置后再明确启动网关。",
        ],
      },
      {
        heading: "验证客户端路径并干净停止",
        paragraphs: [
          "从下游设备确认网关、DNS、域名解析、HTTPS 与连接可见性。测试完成后从控制面停止 OpenSurge，并确认预期网络服务已经恢复。",
        ],
      },
    ],
    faqs: [
      {
        question: "公开安装包已经签名和公证了吗？",
        answer:
          "没有。当前公开 PKG 会明确标注 unsigned。请核对 SHA-256 与 GitHub 构建 provenance，再决定是否使用单个文件的 Gatekeeper 放行。",
      },
      {
        question: "打开 App 会立刻启动网关吗？",
        answer:
          "不会。安装会启动本地 helper 和 control service，但网关保持停止，只有在控制面明确操作后才启动。",
      },
    ],
  },
  {
    ...englishPages[7],
    locale: "zh-CN",
    eyebrow: "Wind Rose · v0.2",
    title: "为什么 Wind Rose 为下游 IPv6 增加第二条透明路径",
    description:
      "OpenSurge v0.2 实验性下游 IPv6 ingress 与共享设备策略模型背后的设计思路。",
    intro:
      "Wind Rose 是 v0.2 的版本主题：不同方向的流量汇入同一个网关，同时明确标出每个数据包真正进入数据面的入口。",
    imageAlt: "OpenSurge v0.2 Wind Rose 视觉",
    keywords: ["OpenSurge Wind Rose", "OpenSurge v0.2", "macOS BPF IPv6 代理", "mihomo opensurge-packet"],
    readingTime: "阅读约 5 分钟",
    sections: [
      {
        heading: "系统 TUN 不是整张地图",
        paragraphs: [
          "既有 macOS TUN 继续负责 Mac 本机与下游 IPv4。Darwin 不会按 OpenSurge 需要的方式把下游 IPv6 ingress 交给 utun，因此 v0.2 增加受控用户态 packet channel，而不是重新启用不受支持的重定向机制。",
        ],
      },
      {
        heading: "在入口保留设备身份",
        paragraphs: [
          "BPF broker 观察选定物理接口，并通过权限受限的 Unix datagram 发送数据包与来源 MAC。patched mihomo listener 再把身份映射到控制面使用的设备策略命名空间。",
        ],
      },
      {
        heading: "实验性是一条工程边界",
        paragraphs: [
          "共享二层 RA 竞争、上游能力、协议覆盖、QUIC、设备身份与干净撤销都需要拓扑对应的 host-network 证据。公开文档只描述有匹配验证门槛的路径。",
        ],
      },
    ],
    faqs: [
      {
        question: "为什么版本名是 Wind Rose？",
        answer:
          "它代表多个 ingress 方向汇入一套可审计的策略和出口系统，同时让每条数据路径保持明确。",
      },
      {
        question: "v0.2 替换了 mihomo TUN 吗？",
        answer:
          "没有。TUN 仍是 Mac 本机与下游 IPv4 的透明路径；packet listener 只是下游 IPv6 的独立实验性入口。",
      },
    ],
  },
];

export const contentPages = [...englishPages, ...chinesePages];

export function isSectionKey(value: string): value is SectionKey {
  return sectionKeys.includes(value as SectionKey);
}

export function getSectionPages(locale: Locale, section: SectionKey) {
  return contentPages.filter(
    (page) => page.locale === locale && page.section === section,
  );
}

export function getContentPage(
  locale: Locale,
  section: SectionKey,
  slug: string,
) {
  return contentPages.find(
    (page) =>
      page.locale === locale &&
      page.section === section &&
      page.slug === slug,
  );
}

export function pathFor(page: Pick<ContentPage, "locale" | "section" | "slug">) {
  const prefix = page.locale === "zh-CN" ? "/zh-cn" : "";
  return `${prefix}/${page.section}/${page.slug}/`;
}
