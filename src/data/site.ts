// Theme tokens. In the Claude Design file these were editable props
// ({{ accent }} / {{ cta }}); here they are the single source of truth.
export const theme = {
  accent: '#6E56CF',
  cta: '#FF6B4A',
} as const;

// The design shipped links to #services and #system, which no section has —
// they scrolled nowhere. These point at sections that actually exist:
// the funnel lists the services, the approach section is the three founders.
export const nav = [
  { href: '#funnel', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '#approach', label: 'About us' },
];

export const navCta = { href: '#contact', label: 'Contact us' };

export type Logo = {
  id: string;
  /** Brand name — used as the alt text and the empty-slot label. */
  name: string;
  /** Path under /public, or null for a slot with no artwork yet. */
  src: string | null;
  /**
   * Width ÷ height of the TRIMMED artwork. Hero.astro uses this to give every
   * logo the same optical area, which is what makes a row of wildly different
   * shapes look evenly weighted. Sizing on height alone would leave a 5.6:1
   * wordmark looking tiny next to a 1:1 roundel.
   *
   * Produced by `node scripts/build-logos.mjs` — run that after adding a logo
   * and copy the printed ratio in here.
   */
  ratio: number;
};

// {{ logos }} — the client strip above the fold. 12 slots, 3 across.
// All artwork is trimmed, transparent PNG produced by scripts/build-logos.mjs,
// so the strip needs only one white-out filter and no per-logo fudging.
export const logos: Logo[] = [
  { id: 'profice', name: 'Profice', src: '/logos/profice.png', ratio: 3.52 },
  { id: 'ec-council', name: 'EC-Council', src: '/logos/ec-council.png', ratio: 5.26 },
  { id: 'google', name: 'Google', src: '/logos/google.png', ratio: 3.05 },
  { id: 'hubspot', name: 'HubSpot', src: '/logos/hubspot.png', ratio: 2.68 },
  { id: 'jiva', name: 'Jiva', src: '/logos/jiva.png', ratio: 2.68 },
  { id: 'meta', name: 'Meta', src: '/logos/meta.png', ratio: 4.29 },
  { id: 'posthog', name: 'PostHog', src: '/logos/posthog.png', ratio: 5.56 },
  { id: 'masters-union', name: "Masters' Union", src: '/logos/masters-union.png', ratio: 3.81 },
  { id: 'tutela', name: 'Tutela', src: '/logos/tutela.png', ratio: 3.39 },
  { id: 'wati', name: 'Wati', src: '/logos/wati.png', ratio: 2.94 },
  { id: 'dharita', name: 'Dharita', src: '/logos/dharita.png', ratio: 1.0 },
  { id: 'campaign', name: 'Campaign', src: '/logos/campaign.png', ratio: 4.74 },
];

// {{ options }} — the service picker labels.
export const serviceOptions = [
  'GEO / AEO',
  'SEO',
  'Paid Media',
  'Branding',
  'Content',
  'Social Media',
  'UI / UX Design',
  'Analytics',
  'Something else',
];

export const ctaLabel = 'Get started';
