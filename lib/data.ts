export const profile = {
  name: "Nisarg Thakkar",
  title: "Systems & Infrastructure",
  avatar: "/images/image1.jpg",
  status: "Open to new contract and full time work",
  headline: "I build the systems that make products scale",
  subhead:
    "Backend infrastructure, distributed systems, and the interfaces on top. I ship end to end: data pipelines, APIs, proof systems, and the dashboards people actually use. Open to full-time roles and contract engagements.",
  location: "Based in Bangalore, working with teams anywhere",
  contactIntro:
    "Interested in working together, or just want to chat? I'm open to full-time engineering roles and contract engagements.",
  // Leave empty to hide the copy-email button in the contact section.
  email: "itsnisargthakkar@gmail.com",
  links: {
    x: "https://x.com/itsnishutwt",
    linkedin: "https://www.linkedin.com/in/Nishu0",
    instagram: "https://www.instagram.com/itznishuu_/",
    github: "https://github.com/Nishu0",
    resume: "/Nisarg_Thakkar_Resume.pdf",
  },
};

export const photos = [
  { src: "/images/image1.jpg", width: 220, height: 160, rotate: -5 },
  { src: "/images/image2.jpg", width: 150, height: 190, rotate: 2 },
  { src: "/images/image3.jpg", width: 210, height: 150, rotate: -6 },
  { src: "/images/image4.jpg", width: 230, height: 150, rotate: 4 },
  { src: "/images/image5.jpg", width: 160, height: 185, rotate: -6 },
  { src: "/images/image6.jpg", width: 200, height: 155, rotate: 3 },
];

export type Entry = {
  role: string;
  org: string;
  /** Letter shown in the tile when there is no logo image. Defaults to org's first letter. */
  monogram?: string;
  period: string;
  badge?: string;
  logo?: string;
  bullets: string[];
  tags?: string[];
  links?: { label: string; href: string }[];
};

export const experience: Entry[] = [
  {
    role: "Developer",
    org: "Lunacards",
    period: "Jan 2026 - Present",
    badge: "Remote",
    logo: "/company/lunacards.png",
    bullets: [
      "Sole developer on an all-in-one card trading app, owning it end to end: the marketplace, listings, and live Pokémon pack rips, including the randomisation architecture driving pull odds and rip outcomes.",
      "Built a fundamental analysis Telegram bot for end-to-end trading on Polymarket, wiring real-time data feeds, prediction market APIs, and automated execution for event-driven bets.",
      "Analysed trading strategies across historical datasets, surfacing patterns in entry/exit signals, win rates, and risk metrics, and integrated that analysis into the live product.",
    ],
  },
  {
    role: "Founding Move Developer",
    org: "Qiro Finance",
    logo: "/company/qiro.jpg",
    period: "2024 - 2025",
    bullets: [
      "Built the initial underwriting system for a credit protocol: ingested borrower data, ran the analysis, and generated zero-knowledge proofs over the result.",
      "Wrote the underwriting policy engine in Python: lending policies expressed as rules that score each borrower and decide approval, limits, and terms.",
      "Designed and built the proof generation pipeline from scratch, end to end.",
      "Developed the core contracts driving lending pools, credit scoring, and loan lifecycle management.",
      "Wrote Daml contracts on Canton for the loan workflow, modelling each party's rights and obligations so lenders and borrowers only see the data they are entitled to.",
      "Built backend services in Go and Fastify for large-scale data processing and system orchestration.",
      "Shipped the Next.js dashboards borrowers and lenders used to operate the product.",
    ],
    tags: ["rust", "move", "daml", "canton", "python", "fastify", "nextjs", "go"],
  },
];

export const projects: Entry[] = [
  {
    role: "Sakura",
    org: "sakura.mom",
    logo: "/projects_logo/sakura-icon.png",
    period: "Jul 2026",
    badge: "Project",
    bullets: [
      "Your coding agents, in your pocket. Monitor, browse, and continue the AI coding sessions running on your Mac from anywhere, privately over Tailscale.",
      "The iOS app joins a private tailnet through an embedded tsnet module, registering with the key from a QR scan; the tunnel terminates at 127.0.0.1, which also sidesteps iOS ATS.",
      "Self-hosted Headscale control plane running database policy mode with per-account ACL isolation. The phone and the Mac's sakura-tsnet sidecar both register there and meet over the WireGuard mesh.",
      "Rust API server handles auth, GitHub, Convex session reads, and the CLI device flow, and auto-provisions each account's tailnet key when the daemon starts.",
      "Node daemon reads ~/.claude, ~/.codex, and ~/.local/share/opencode, and drives the claude, codex, and opencode CLIs locally.",
      "Caddy fronts both services with auto-HTTPS; the Next.js web app on Vercel handles CLI login and invites.",
    ],
    tags: ["rust", "swift", "node", "tailscale", "headscale", "convex", "nextjs"],
    links: [{ label: "Live site", href: "https://www.sakura.mom" }],
  },
  {
    role: "Kodama",
    org: "Local-first iMessage agent",
    logo: "/projects_logo/kodama.svg",
    period: "May 2026",
    badge: "Project",
    bullets: [
      "A local-first iMessage agent that lives inside your self-thread. You text yourself; Kodama answers, like shouting into a forest and hearing the mountain reply. Your data sits on your Mac.",
      "A parent orchestrator routes each message to exactly one specialized sub-agent with a whitelisted tool set. No sub-agent can dispatch, so the tree is exactly one level deep and there is no fan-out.",
      "Memory is bucketed by decay speed across seven semantic segments; effective importance decays exponentially from last access, and the nightly pass prunes anything under 0.08. Accessing a memory resets the clock and can promote its bucket.",
      "A 03:00 launchd job runs a three-stage adversarial pass over the store: a consolidator proposes keep/promote/merge/prune, an adversary challenges each proposal, and a judge rules on the contested ones, biased toward preserving identity and relationship segments.",
      "Every action writes an immutable event and a record snapshot, so the whole history is reversible.",
      "Captures journal entries, schedules reminders, watches X handles with free-form filters on a 5-hour digest, serves weather from Open-Meteo, and reads Gmail behind a redaction policy that strips OTPs and financial numbers before the LLM ever sees them.",
      "Each run is bounded by a per-sub-agent USD spend cap and turn cap. When “ok, logged” is the whole response, it sends a tapback instead of typing.",
    ],
    tags: ["bun", "typescript", "sqlite", "convex", "ai-sdk", "launchd"],
  },
  {
    role: "findfounder",
    org: "findfounder.one",
    monogram: "F",
    period: "Feb 2026",
    badge: "Project",
    bullets: [
      "Quick scoring tool for founders based on their X profile, project stage, grants, tweet quality, key follows, and investor connections.",
      "Built to solve my own problem of evaluating founders before joining their startups.",
      "Scores founders based on project stage, profile quality, grants, and tweet authenticity.",
      "Analyzes key follows including ecosystems, investors, and VCs from an X profile.",
      "Helps freelancers and builders quickly assess if a founder or project is worth betting on.",
    ],
    tags: ["typescript", "nextjs", "fastify"],
    links: [
      { label: "Live site", href: "https://findfounder.one/" },
      { label: "Thread", href: "https://x.com/itsnishutwt/status/2013890499011338545" },
    ],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
  /** Optional link proving the quote is real, e.g. the LinkedIn recommendation. */
  source?: string;
};

/**
 * Add real quotes here and the "What people say" section renders itself.
 * While this array is empty the whole section is skipped.
 */
export const testimonials: Testimonial[] = [];

export type Logo = {
  name: string;
  /** Full wordmark. Entries without one render the name as text instead. */
  src?: string;
  /** Intrinsic pixel size of the file, so the aspect ratio is preserved. */
  width?: number;
  height?: number;
  /** Rendered height in px. Tune per logo so they read at the same weight. */
  display?: number;
};

export const logos: Logo[] = [
  {
    name: "Lunacards",
    src: "/full_company_logo/lunacards-wordmark.png",
    width: 2162,
    height: 931,
    display: 52,
  },
  {
    name: "Qiro Finance",
    src: "/full_company_logo/qiro-wordmark.png",
    width: 564,
    height: 149,
    display: 34,
  },
  { name: "Sakura" },
  { name: "Kodama" },
  { name: "findfounder" },
  { name: "Rust" },
  { name: "Go" },
  { name: "TypeScript" },
  { name: "Next.js" },
  { name: "Fastify" },
];
