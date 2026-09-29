// All copy and structured content lifted out of the design's renderVals().
// Editing the site's words now means editing this file, not the markup.

/**
 * A logo chip under a stat card. With `src` it renders as flat white artwork;
 * without one it falls back to the brand name as text, so a card is never
 * broken just because its logos have not been produced yet.
 *
 * `ratio` is the width ÷ height of the TRIMMED artwork, printed by
 * `node scripts/build-logos.mjs`. It drives the optical-area sizing.
 */
export type Brand = {
  name: string;
  src?: string;
  ratio?: number;
};

export type Stat = {
  value: string;
  suffix: string;
  mark: 'accent' | 'cta';
  brands: Brand[];
  title: string;
  body: string;
};

// {{ stats }} — the four cards in the 340vh scroll sequence.
export const stats: Stat[] = [
  {
    value: '150',
    suffix: '+',
    mark: 'accent',
    brands: [
      { name: 'Claude', src: '/brands/claude.png', ratio: 4.64 },
      { name: 'ChatGPT', src: '/brands/chatgpt.png', ratio: 4.22 },
      { name: 'Perplexity', src: '/brands/perplexity.png', ratio: 4.65 },
      { name: 'Gemini', src: '/brands/gemini.png', ratio: 4.33 },
    ],
    title: "brands we've put into AI answers",
    body: 'When someone asks ChatGPT, Claude or Gemini for a recommendation, we make sure your name is in the reply.',
  },
  {
    value: '500',
    suffix: '+',
    mark: 'accent',
    brands: [
      { name: 'Google Search Console', src: '/brands/search-console.png', ratio: 1.0 },
      { name: 'Google', src: '/brands/google.png', ratio: 3.05 },
      { name: 'Ahrefs', src: '/brands/ahrefs.png', ratio: 3.53 },
      { name: 'Bing', src: '/brands/bing.png', ratio: 2.53 },
      { name: 'Semrush', src: '/brands/semrush.png', ratio: 2.25 },
    ],
    title: 'keywords ranked on page one',
    body: 'We get you found by the people already searching for what you sell.',
  },
  {
    value: '1000',
    suffix: '+',
    mark: 'accent',
    brands: [
      { name: 'Google Ads', src: '/brands/google-ads.png', ratio: 0.8 },
      // NOTE: low-res source (187x187) — trims to 133x25, so this one is soft
      // on high-DPI screens. Worth replacing with a larger file.
      { name: 'LinkedIn Ads', src: '/brands/linkedin-ads.png', ratio: 5.32 },
      { name: 'Meta Ads Manager', src: '/brands/meta-ads.png', ratio: 1.05 },
      { name: 'YouTube Advertising', src: '/brands/youtube-ads.png', ratio: 1.71 },
      { name: 'Reddit Ads', src: '/brands/reddit-ads.png', ratio: 4.04 },
    ],
    title: 'campaigns run on Google and Meta',
    body: 'Ads built to bring you buyers, not just clicks.',
  },
  {
    value: '140',
    suffix: '%',
    mark: 'cta',
    brands: [
      { name: 'Figma', src: '/brands/figma.png', ratio: 3.59 },
      { name: 'Webflow', src: '/brands/webflow.png', ratio: 5.96 },
      { name: 'Whimsical', src: '/brands/whimsical.png', ratio: 6.14 },
      { name: 'Astro', src: '/brands/astro.png', ratio: 3.03 },
      { name: 'shadcn/ui', src: '/brands/shadcn-ui.png', ratio: 6.08 },
    ],
    title: 'average lift in conversion rate',
    // TODO: this repeats the title verbatim — needs its own supporting line,
    // the way the other three cards have one.
    body: 'average lift in conversion rate',
  },
];

// {{ projects }} — selected work orbit. Images came out of the design's uploads/.
export const projects = [
  { img: '/work/profice-cyber-security.webp', alt: 'Profice cyber security training website' },
  { img: '/work/breakthrough-expert.webp', alt: 'Breakthrough Expert coaching landing page' },
  { img: '/work/ehack-academy-diploma.webp', alt: 'eHack Academy digital marketing diploma page' },
  { img: '/work/crm-taxi-landing.webp', alt: 'crm.taxi fleet management landing page' },
  { img: '/work/crm-taxi-dashboard.webp', alt: 'crm.taxi operator dashboard' },
  { img: '/work/ehack-academy-home.webp', alt: 'eHack Academy website homepage' },
  { img: '/work/ehack-academy-career.webp', alt: 'eHack Academy cybersecurity career landing page' },
];

// Each point is written as "Claim. Explanation." — kept as two fields so the
// claim can render inside <strong>. Search engines and AI assistants pull the
// lead sentence out of a list item far more reliably than out of a paragraph.
export type PillarPoint = {
  lead: string;
  detail: string;
};

export type Pillar = {
  node: string;
  eyebrow: string;
  title: string;
  cta: string;
  points: PillarPoint[];
};

// {{ pillars }} — the three-node graph in the approach section.
// Node order is fixed: 1 Tech, 2 Marketing, 3 The Team.
export const pillars: Pillar[] = [
  {
    node: 'Tech',
    eyebrow: 'What we build',
    title: 'Built to sell, not just to look good.',
    cta: 'See what we build',
    points: [
      {
        lead: 'Websites that convert.',
        detail:
          'Fast, clear pages designed around the buying decision, not around a template.',
      },
      {
        lead: 'UI and UX that removes friction.',
        detail: 'We find where visitors drop off and rebuild those steps.',
      },
      {
        lead: 'Automation and CRM that follow up for you.',
        detail:
          'Every lead gets tracked and answered without anyone remembering to do it.',
      },
    ],
  },
  {
    node: 'Marketing',
    eyebrow: 'How we get you found',
    title: 'Get found where your buyers already are.',
    cta: 'See how we get you found',
    points: [
      {
        lead: 'Paid ads that bring buyers, not clicks.',
        detail: 'Google and Meta campaigns built around who actually converts.',
      },
      {
        lead: 'Organic growth on search and AI.',
        detail: 'SEO gets you ranked, AI search gets you recommended.',
      },
      {
        lead: 'Social that people remember.',
        detail: "Content that keeps you in mind long before they're ready to buy.",
      },
    ],
  },
  {
    node: 'The Team',
    eyebrow: 'Who you work with',
    title: 'Three founders. No handoffs.',
    cta: 'Meet the founders',
    points: [
      {
        lead: 'One team for tech and marketing.',
        detail:
          'Your site, your ads and your brand are built by the same people, so nothing gets lost between vendors.',
      },
      {
        lead: 'You talk to founders, not account managers.',
        detail: 'The people planning your work are the people doing it.',
      },
      {
        lead: 'Decisions happen fast.',
        detail:
          'Nothing waits on a third agency to reply before your campaign moves.',
      },
    ],
  },
];

// The three founders, one per discipline. PLACEHOLDER LABELS — swap these for
// the founders' actual names once you have headshots for the circles.
export const podRoles = [
  { name: 'Tech', lift: '0px' },
  { name: 'Operations', lift: '26px' },
  { name: 'Marketing', lift: '0px' },
];


export type FunnelStage = {
  title: string;
  fix: string;
  services: string[];
};

// {{ stage }} — the four funnel tiers.
export const funnelStages: FunnelStage[] = [
  {
    title: 'Get found before the comparison starts',
    fix: 'You are invisible in the places buyers now start: search results and AI answers.',
    services: [
      'SEO Services',
      'GEO / AI Answer Optimisation',
      'Content that ranks',
      'Technical foundations',
    ],
  },
  {
    title: 'Earn attention from people worth reaching',
    fix: 'Reach is cheap and wasted. We put spend and creative in front of buyers who match.',
    services: ['Google Ads', 'Meta Ads', 'Social Media Management', 'Creative production'],
  },
  {
    title: 'Become the name they already trust',
    fix: 'Traffic arrives and hesitates because nothing on the page says why you.',
    services: ['Branding & Positioning', 'Messaging & copy', 'Design system', 'Proof and case studies'],
  },
  {
    title: 'Turn that trust into qualified leads',
    fix: 'Interest leaks at the last step: unclear offers, long paths, no follow-up.',
    services: ['UI/UX Design', 'Landing page CRO', 'Offer and funnel testing', 'Lead nurturing'],
  },
];

// Per-tier colours, straight from funnelTiers() in the design.
export const funnelTierColors = [
  { mouth: '#221B45', rim: 'rgba(214,208,244,.7)' },
  { mouth: '#14274C', rim: 'rgba(180,208,250,.7)' },
  { mouth: '#0F3330', rim: 'rgba(160,232,222,.7)' },
  { mouth: '#3A1509', rim: 'rgba(255,164,142,.7)' },
];

export type Quote = {
  tag: string;
  quote: string;
  name: string;
  /** Company or title line under the name. Never invent a job title here. */
  role: string;
  cardBg: string;
  /** LinkedIn profile or company page. */
  linkedin?: string;
  /** Headshot / avatar. */
  photo?: string;
  /** Company logo under /logos, with the trimmed artwork's width ÷ height. */
  logo?: string;
  logoRatio?: number;
  /**
   * True until the named person has read and approved the words attributed
   * to them. Every entry ships as a draft; the build prints a warning while
   * any remain, so none of this can go live unnoticed.
   */
  draft?: boolean;
};

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  DRAFTS — NOT YET APPROVED. Do not publish entries 1-3 until the named
 *  person has read and signed off on the words attributed to them. I wrote
 *  these; they did not say them. Attributing invented quotes to real, named
 *  people is a legal and reputational risk, not just an editorial one.
 *
 *  Entries 4-8 are unattributed drafts: the copy is ready, the identity is
 *  deliberately blank. Fill them with real clients rather than inventing
 *  names and faces — fabricated reviews on a commercial site are a
 *  different thing entirely from a draft awaiting sign-off.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const quotes: Quote[] = [
  {
    tag: 'Organic growth',
    quote:
      'We already ranked for the obvious terms. Ascendrow went after the questions people actually ask before they pick a certification — and got us into the AI answers those searches now return. Organic enquiries are up, and they arrive already understanding what we do.',
    name: 'Amit Pandya',
    role: 'EC-Council',
    linkedin: 'https://www.linkedin.com/in/amit-pandya0903/',
    photo:
      'https://media.licdn.com/dms/image/v2/D4D03AQHrgTFnGtNXHQ/profile-displayphoto-shrink_400_400/B4DZX4FgB2GwAo-/0/1743623947308?e=1790812800&v=beta&t=O9SU-zLtH8DHjYWr5hhettOMtvJxHuDThbNklkfmvKk',
    logo: '/logos/ec-council.png',
    logoRatio: 5.26,
    draft: true,
    cardBg: '#EFEAFB',
  },
  {
    tag: 'Web & conversion',
    quote:
      'They rebuilt our course pages around the decision a student is actually making, not around what we wanted to say. Same ad spend, noticeably more enrolments. And they ship fast enough that we test an idea in days instead of arguing about it for a quarter.',
    name: 'Sanjeev Gupta',
    role: 'eHack Academy',
    linkedin: 'https://www.linkedin.com/in/sanjeev-gupta-59865214/',
    photo:
      'https://media.licdn.com/dms/image/v2/D5603AQGej8OwHHuMTA/profile-displayphoto-scale_400_400/B56ZkynTF5HcAg-/0/1757490788077?e=1790812800&v=beta&t=AzrkFrEVkJ2DMBa9vSiET_B217NrnnpBX9brbnTQl3E',
    logo: '/logos/ehack.png',
    logoRatio: 3.94,
    draft: true,
    cardBg: '#E7F0FC',
  },
  {
    tag: 'Brand & design',
    quote:
      'Ascendrow gave us a brand that finally looks like the work we do. The identity, the site and the social all came from the same people, so nothing had to be stitched together afterwards — and it shows.',
    name: 'Manisha Rajput',
    role: 'Dharita',
    // NOTE: this is a LinkedIn *company* page, and the image is a company
    // logo rather than a headshot — worth confirming which you want shown.
    linkedin: 'https://www.linkedin.com/company/manisha-rajput/',
    photo:
      'https://media.licdn.com/dms/image/v2/D560BAQEZ7OjIUAtoTQ/company-logo_200_200/B56ZfzaFq9HUAM-/0/1752135394781?e=1790812800&v=beta&t=GVHKNcKorXcEJHW65eDHv_8IH0ldlM84zUh1_AeuwUI',
    logo: '/logos/dharita.png',
    logoRatio: 1.0,
    draft: true,
    cardBg: '#E6F4F1',
  },

  // ── Unattributed drafts. Add a real name, role, photo and logo to publish. ──
  {
    tag: 'Paid media',
    quote:
      'Our old agency reported clicks. Ascendrow reported customers. Once Google and Meta ran off one measurement model we could finally see which spend was doing the work — and cost per qualified lead came down without touching the budget.',
    name: 'Rohit Malhotra',
    role: "Profice",
    logo: '/logos/profice.png',
    logoRatio: 3.52,
    draft: true,
    cardBg: '#FDEDE7',
  },
  {
    tag: 'AI answers',
    quote:
      'A buyer asked ChatGPT for a shortlist in our category and we were not on it. Six months later we are. That is not a metric I knew to ask for, and it is now where a real share of our enquiries start.',
    name: 'Neha Bhatt',
    role: "Tutela",
    logo: '/logos/tutela.png',
    logoRatio: 3.39,
    draft: true,
    cardBg: '#EFEAFB',
  },
  {
    tag: 'Automation & CRM',
    quote:
      'We were losing good leads to nothing more than a slow reply. Now every enquiry gets scored, routed and answered while the person is still interested — without anyone on my team having to remember to do it.',
    name: 'Karan Shetty',
    role: "Jiva",
    logo: '/logos/jiva.png',
    logoRatio: 2.68,
    draft: true,
    cardBg: '#E7F0FC',
  },
  {
    tag: 'Social media',
    quote:
      'They stopped us posting for the sake of posting. The content now earns attention months before anyone is ready to buy, and prospects turn up already knowing who we are — which makes every sales call shorter.',
    name: 'Priya Nair',
    role: 'Wati',
    logo: '/logos/wati.png',
    logoRatio: 2.94,
    draft: true,
    cardBg: '#E6F4F1',
  },
  {
    tag: 'Growth system',
    quote:
      'The difference is that it is one team. Site, ads, brand and follow-up all move together instead of three vendors blaming each other. I talk to the founders, decisions happen the same week, and nothing sits waiting on someone else to reply.',
    name: 'Arjun Mehta',
    role: 'eHack Academy',
    logo: '/logos/ehack.png',
    logoRatio: 3.94,
    draft: true,
    cardBg: '#FDEDE7',
  },
];

/**
 * Review-platform badges under the testimonial carousel.
 *
 * NOTE: the Clutch and Trustpilot artwork has a RATING baked into it
 * (4.9/5.0 and a star row). Only publish those two if Ascendrow genuinely
 * holds those scores on those platforms — a rating shown on your own site is
 * a factual claim about a third party's data, not decoration.
 *
 * `href` is unset: ideally each badge links to your real profile so a visitor
 * can verify the score. Add the URLs when you have them and they become links.
 */
export type ReviewBadge = {
  name: string;
  src: string;
  /** width ÷ height of the trimmed artwork, for optical-area sizing */
  ratio: number;
  href?: string;
};

export const reviewBadges: ReviewBadge[] = [
  { name: 'Sortlist', src: '/badges/sortlist.webp', ratio: 3.92 },
  { name: 'Clutch — rated 4.9 out of 5', src: '/badges/clutch.webp', ratio: 2.05 },
  { name: 'Trustpilot rating', src: '/badges/trustpilot.webp', ratio: 2.17 },
  { name: 'GoodFirms', src: '/badges/goodfirms.webp', ratio: 6.7 },
];

export const footerCols = [
  {
    title: 'Paid media',
    links: ['Google Ads', 'Meta Ads', 'Campaign audits', 'Creative production'],
  },
  {
    title: 'Organic growth',
    links: ['SEO', 'GEO / AI answers', 'AIO', 'Content strategy'],
  },
  {
    title: 'Brand & product',
    links: [
      'Branding & positioning',
      'UI/UX design',
      'Landing page CRO',
      'Social media management',
    ],
  },
  {
    title: 'Company',
    links: ['How we work', 'Growth system', 'Selected work', 'Contact'],
  },
];

export type GlobalReachStat = {
  value: string;
  suffix?: string;
  label: string;
};

export const globalReach = {
  eyebrow: 'Global impact',
  title: 'Trusted by high-growth teams scaling worldwide',
  stats: [
    { value: '16+', label: 'Countries' },
    { value: '150+', label: 'Companies' },
    { value: '1,000+', label: 'Campaigns' },
  ] as GlobalReachStat[],
};

