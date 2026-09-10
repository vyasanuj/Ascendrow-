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
  { img: '/work/profice-cyber-security.png', alt: 'Profice cyber security training website' },
  { img: '/work/breakthrough-expert.png', alt: 'Breakthrough Expert coaching landing page' },
  { img: '/work/ehack-academy-diploma.png', alt: 'eHack Academy digital marketing diploma page' },
  { img: '/work/crm-taxi-landing.png', alt: 'crm.taxi fleet management landing page' },
  { img: '/work/crm-taxi-dashboard.png', alt: 'crm.taxi operator dashboard' },
  { img: '/work/ehack-academy-home.png', alt: 'eHack Academy website homepage' },
  { img: '/work/ehack-academy-career.png', alt: 'eHack Academy cybersecurity career landing page' },
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
  name: string;
  role: string;
  quote: string;
  cardBg: string;
};

// PLACEHOLDER COPY — replace before launch. These are the design's own
// stand-in strings, not real client testimonials.
export const quotes: Quote[] = [
  {
    tag: 'Organic growth',
    name: 'Client name',
    role: 'Role, company',
    quote:
      'Add the client quote here — what changed once search, AI answers and content were run as one plan.',
    cardBg: '#EFEAFB',
  },
  {
    tag: 'Paid media',
    name: 'Client name',
    role: 'Role, company',
    quote:
      'Add the client quote here — what changed in lead quality and cost once Google and Meta ran off one measurement model.',
    cardBg: '#E7F0FC',
  },
  {
    tag: 'Brand & product',
    name: 'Client name',
    role: 'Role, company',
    quote:
      'Add the client quote here — what the rebrand and page redesign did for how buyers respond.',
    cardBg: '#E6F4F1',
  },
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
