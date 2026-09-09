import { useState } from 'preact/hooks';
import { funnelStages, funnelTierColors } from '../../data/content';

/**
 * Island #4 — the funnel. Hovering (or tapping) a tier swaps the copy beside it.
 * Geometry is presentational, so it lives here rather than in the content file.
 */

const TIERS = [
  {
    origin: '170px 40px',
    mouth: { cx: 170, cy: 40, rx: 148, ry: 26 },
    body: 'M 22,40 A 148 26 0 0 1 318,40 L 288,108 A 118 21 0 0 1 52,108 Z',
    highlight: 'M 32,49.1 A 138 26 0 0 1 143.36,64.96000000000001 L 120.44,108 L 58,106 Z',
    arrow: 'M 170,75 v 13 m -5.5,-6.5 l 5.5,6.5 5.5,-6.5',
  },
  {
    origin: '170px 126px',
    mouth: { cx: 170, cy: 126, rx: 118, ry: 21 },
    body: 'M 52,126 A 118 21 0 0 1 288,126 L 260,184 A 90 16 0 0 1 80,184 Z',
    highlight: 'M 62,133.35 A 108 21 0 0 1 148.76,146.16 L 132.2,184 L 86,182 Z',
    arrow: 'M 170,156 v 13 m -5.5,-6.5 l 5.5,6.5 5.5,-6.5',
  },
  {
    origin: '170px 202px',
    mouth: { cx: 170, cy: 202, rx: 90, ry: 16 },
    body: 'M 80,202 A 90 16 0 0 1 260,202 L 232,250 A 62 12 0 0 1 108,250 Z',
    highlight: 'M 90,207.6 A 80 16 0 0 1 153.8,217.36 L 143.96,250 L 114,248 Z',
    arrow: 'M 170,227 v 13 m -5.5,-6.5 l 5.5,6.5 5.5,-6.5',
  },
  {
    origin: '170px 268px',
    mouth: { cx: 170, cy: 268, rx: 62, ry: 12 },
    body: 'M 108,268 A 62 12 0 0 1 232,268 L 196,308 A 26 7 0 0 1 144,308 Z',
    highlight: 'M 118,272.2 A 52 12 0 0 1 158.84,279.52 L 159.08,308 L 150,306 Z',
    arrow: 'M 170,285 v 8 m -5.5,-6.5 l 5.5,6.5 5.5,-6.5',
  },
];

const GRADIENTS = [
  ['#9781F5', '#4B3AA0'],
  ['#6FA8F5', '#2E5CB8'],
  ['#5FCFC0', '#2A8478'],
  ['#FF9078', '#D9491F'],
];

export default function Funnel() {
  const [fstage, setFstage] = useState(0);
  const stage = funnelStages[fstage];

  return (
    <div class="asc-funnel-grid">
      <div class="asc-funnel-copy">
        <h3 style="margin: 0; font-size: clamp(20px, 2.1vw, 27px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.14; text-wrap: balance;">
          {stage.title}
        </h3>
        <p class="asc-body-sm" style="margin: 12px 0 0; max-width: 36ch; color: var(--asc-text-muted);">
          {stage.fix}
        </p>
      </div>

      <div class="asc-funnel-services">
        <div style="display: grid; gap: 2px;">
          {stage.services.map((svc) => (
            <a key={svc} href="#contact" class="asc-funnel-link">
              {svc}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                style="flex: 0 0 auto;"
                aria-hidden="true"
              >
                <path
                  d="M5 12h13M12.5 6l6 6-6 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          ))}
        </div>
      </div>

      <div class="asc-funnel-viz" onMouseLeave={() => setFstage(0)}>
        <svg
          viewBox="-6 14 352 316"
          style="width: 100%; max-width: 420px; height: auto; overflow: visible;"
          role="img"
          aria-label="Funnel stages from visibility to conversion"
        >
          <defs>
            {GRADIENTS.map(([from, to], i) => (
              <linearGradient key={i} id={`ascFunnel${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color={from} />
                <stop offset="100%" stop-color={to} />
              </linearGradient>
            ))}
            <linearGradient id="ascFunnelOff" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#302E40" />
              <stop offset="100%" stop-color="#1B1A25" />
            </linearGradient>
            <radialGradient id="ascFunnelShadow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stop-color="rgba(110,86,207,.5)" />
              <stop offset="100%" stop-color="rgba(110,86,207,0)" />
            </radialGradient>
          </defs>

          <ellipse cx="170" cy="318" rx="120" ry="16" fill="url(#ascFunnelShadow)" />

          {/* SVG has no z-index — it paints in document order, so the lower
              tiers were drawing on top of whichever tier was selected. Render
              the active tier LAST so it always sits above its neighbours. */}
          {TIERS.map((_, i) => i)
            .sort((a, b) => (a === fstage ? 1 : b === fstage ? -1 : a - b))
            .map((i) => {
            const t = TIERS[i];
            const on = i === fstage;
            const fill = on ? `url(#ascFunnel${i})` : 'url(#ascFunnelOff)';
            const mouthFill = on ? funnelTierColors[i].mouth : '#131220';
            const rim = on ? funnelTierColors[i].rim : 'rgba(248,247,251,.22)';
            const stroke = on ? 'rgba(248,247,251,.34)' : 'rgba(248,247,251,.16)';
            const arrow = on ? '#F8F7FB' : 'transparent';

            return (
              <g
                key={i}
                onMouseEnter={() => setFstage(i)}
                onClick={() => setFstage(i)}
                style={`cursor: pointer; transform: ${
                  on ? 'scale(1.06)' : 'scale(1)'
                }; transform-origin: ${t.origin}; transition: transform .35s cubic-bezier(.22,.9,.24,1), filter .35s ease; filter: ${
                  on ? 'drop-shadow(0 14px 26px rgba(9,8,20,.75))' : 'none'
                };`}
              >
                <path d={t.body} fill="rgba(9,9,13,.75)" transform="translate(0, 5)" />
                <ellipse
                  cx={t.mouth.cx}
                  cy={t.mouth.cy}
                  rx={t.mouth.rx}
                  ry={t.mouth.ry}
                  fill={mouthFill}
                  style="transition: fill .3s ease;"
                />
                <path d={t.body} fill={fill} style="transition: fill .3s ease;" />
                <path d={t.highlight} fill="rgba(248,247,251,.1)" />
                <path
                  d={t.body}
                  fill="none"
                  stroke={stroke}
                  stroke-width="1.2"
                  style="transition: stroke .3s ease;"
                />
                <ellipse
                  cx={t.mouth.cx}
                  cy={t.mouth.cy}
                  rx={t.mouth.rx}
                  ry={t.mouth.ry}
                  fill="none"
                  stroke={rim}
                  stroke-width="1.4"
                  style="transition: stroke .3s ease;"
                />
                <path
                  d={t.arrow}
                  fill="none"
                  stroke={arrow}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style="transition: stroke .3s ease;"
                />
              </g>
            );
          })}
        </svg>

        <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: #8A8A9A;">
          Hover a stage to explore
        </div>
      </div>

      <div class="asc-funnel-cta">
        {/* TODO: this input is inert, exactly as in the design. It gets wired
            up when the contact form action lands. */}
        <input
          type="text"
          placeholder="Enter your website"
          aria-label="Your website"
          style="flex: 0 1 260px; min-width: 0; min-height: 52px; padding: 0 16px; border: 1px solid rgba(248,247,251,.16); border-radius: 4px; background: rgba(248,247,251,.04); color: #F8F7FB; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 15px;"
        />
        <a
          href="#contact"
          class="asc-cta-btn"
          style="display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 52px; padding: 0 22px; border-radius: 4px; font-size: 15.5px; font-weight: 700; text-align: center; text-wrap: balance; box-shadow: 0 18px 44px -18px rgba(255,107,74,.75);"
        >
          Get Custom Strategy Proposal
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            style="flex: 0 0 auto;"
            aria-hidden="true"
          >
            <path
              d="M5 12h13M12.5 6l6 6-6 6"
              stroke="#17110E"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
