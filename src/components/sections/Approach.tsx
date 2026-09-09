import { useState } from 'preact/hooks';
import type { JSX } from 'preact';
import { pillars, podRoles, techTools, marketingTools } from '../../data/content';

/**
 * Island #3 — the three-node graph and the panel it drives.
 *
 * The design's icons were built with React.createElement(); they are plain JSX
 * here. Node positions come from the same slot table: the selected pillar takes
 * the big bottom slot, the other two fill the small top slots in rotation.
 */

const ICONS: JSX.Element[] = [
  <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
    <path
      d="M9 11a3 3 0 100-6 3 3 0 000 6zm7.5 1a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM3 20c0-2.9 2.7-4.5 6-4.5s6 1.6 6 4.5m1.2-6.2c2.4.3 3.8 1.7 3.8 4"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
    <path
      d="M12 5.2a6.8 6.8 0 106.8 6.8M12 9a3 3 0 103 3m0-8.6l.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9.9-2.2z"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
    <path
      d="M4.5 11a7.5 7.5 0 0112.6-4.4M19.5 13a7.5 7.5 0 01-12.6 4.4M17.6 3.4v3.6H14M6.4 20.6V17H10M12 9.4v2.9l2.1 1.3"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>,
];

const BASE =
  'position: absolute; padding: 0; border: 0; background: transparent; cursor: pointer; transform: translate(-50%, -50%); transition: left .5s cubic-bezier(.22,.9,.24,1), top .5s cubic-bezier(.22,.9,.24,1);';
const SMALL = ' width: clamp(64px, 6.4vw, 80px); height: clamp(64px, 6.4vw, 80px);';
const BIG = ' width: clamp(104px, 10vw, 124px); height: clamp(104px, 10vw, 124px);';
const LBL =
  'position: absolute; width: max-content; max-width: 15ch; font-size: clamp(12.5px, 1vw, 15px); font-weight: 700; letter-spacing: -0.015em; line-height: 1.2; transition: color .35s ease; text-wrap: balance; ';

const SLOTS = [
  {
    style: BASE + SMALL + ' left: 31%; top: 26%;',
    label: LBL + 'right: calc(100% + 14px); top: 50%; transform: translateY(-50%); text-align: right;',
  },
  {
    style: BASE + SMALL + ' left: 69%; top: 26%;',
    label: LBL + 'left: calc(100% + 14px); top: 50%; transform: translateY(-50%); text-align: left;',
  },
  {
    style: BASE + BIG + ' left: 50%; top: 96%;',
    label: LBL + 'left: 50%; bottom: calc(100% + 12px); transform: translateX(-50%); text-align: center;',
  },
];

const TOOL_TILE =
  'display: flex; align-items: center; justify-content: center; text-align: center; padding: 0 8px; border: 1px solid rgba(15,15,20,.14); border-radius: 6px; background: #FFFFFF; font-size: 12px; letter-spacing: .04em; color: #5A5870;';

function ToolGrid({ label, tools }: { label: string; tools: string[] }) {
  return (
    <div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: #5A5870;">
        {label}
      </div>
      <div style="margin-top: 14px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-auto-rows: clamp(116px, 11vw, 132px); gap: clamp(8px, 1.1vw, 14px);">
        {tools.map((t) => (
          <span key={t} style={TOOL_TILE}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Approach() {
  const [pillar, setPillar] = useState(0);
  const order = [(pillar + 1) % 3, (pillar + 2) % 3];

  return (
    <>
      <div style="position: relative; z-index: 2; height: clamp(150px, 15vw, 190px); margin-top: clamp(28px, 3.4vw, 48px);">
        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
          style="position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible;"
          aria-hidden="true"
        >
          <g
            fill="none"
            stroke="#F8F7FB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-dasharray="2 9"
            pathLength="100"
            vector-effect="non-scaling-stroke"
          >
            <path d="M310 104 H 690" />
            <path d="M310 104 L 500 384" />
            <path d="M690 104 L 500 384" />
          </g>
        </svg>

        {pillars.map((p, i) => {
          const on = i === pillar;
          const slot = SLOTS[on ? 2 : i === order[0] ? 0 : 1];
          const nodeBg = on
            ? 'linear-gradient(160deg, #1B1A24, #0F0F14)'
            : 'linear-gradient(160deg, #17161F, #0F0F14)';
          const nodeGlow = on
            ? '0 0 0 12px rgba(248,247,251,.16), 0 24px 50px -20px rgba(15,15,20,.7)'
            : '0 0 0 9px rgba(248,247,251,.09), inset 0 0 0 1px rgba(248,247,251,.3)';

          return (
            <button
              type="button"
              key={p.node}
              onClick={() => setPillar(i)}
              aria-label={p.node}
              aria-pressed={on}
              style={slot.style}
            >
              <span
                style={`width: 100%; height: 100%; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center; background: ${nodeBg}; box-shadow: ${nodeGlow}; transition: background .35s ease, box-shadow .35s ease;`}
              >
                <span style="width: 30px; height: 30px; display: block; color: #FFFFFF;">
                  {ICONS[i]}
                </span>
              </span>
              <span style={slot.label + ' color: ' + (on ? '#FFFFFF' : '#F8F7FB') + ';'}>
                {p.node}
              </span>
            </button>
          );
        })}
      </div>

      <div style="position: relative; border: 1px solid rgba(15,15,20,.12); border-radius: 14px; background: #F8F7FB; color: #0F0F14; box-shadow: 0 44px 100px -50px rgba(15,15,20,.7); padding: clamp(34px, 4vw, 56px) clamp(24px, 3vw, 46px) clamp(24px, 3vw, 46px); display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: clamp(24px, 3.2vw, 52px); align-items: center;">
        {/* All three panels are rendered into the DOM and the inactive ones are
            hidden, rather than only rendering the active one. Otherwise two
            thirds of this section's copy would not exist for search engines, or
            for the AI crawlers that never run the click. */}
        <div style="min-width: 0;">
          {pillars.map((p, i) => (
            <div key={p.node} hidden={i !== pillar}>
              <div style="display: inline-flex; align-items: flex-start; gap: 8px; max-width: 100%; padding: 7px 13px; border-radius: 999px; border: 1px solid rgba(110,86,207,.32); background: rgba(110,86,207,.1); font-family: 'JetBrains Mono', monospace; font-size: 10.5px; line-height: 1.45; letter-spacing: .14em; text-transform: uppercase; color: #4B3AA0;">
                <span style="flex: 0 0 auto; width: 5px; height: 5px; margin-top: 5px; border-radius: 50%; background: #D9401C;" />
                <span style="min-width: 0;">{p.eyebrow}</span>
              </div>

              <h3 style="margin: 12px 0 0; font-size: clamp(22px, 2.4vw, 32px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.12; color: #0F0F14; text-wrap: balance;">
                {p.title}
              </h3>

              {/* A real <ul>: list markup is what search engines and AI
                  assistants lift into snippets and answers. The claim sits in
                  <strong> so the scannable half of each point is
                  machine-identifiable too. */}
              <ul style="list-style: none; margin: clamp(18px, 2.2vw, 26px) 0 0; padding: 0; display: grid; gap: 14px;">
                {p.points.map((pt) => (
                  <li key={pt.lead} style="display: flex; gap: 12px; align-items: flex-start;">
                    <span style="flex: 0 0 auto; width: 6px; height: 6px; margin-top: 8px; border-radius: 50%; background: var(--asc-accent, #6E56CF);" />
                    <p class="asc-body" style="margin: 0; color: var(--asc-text-on-light);">
                      <strong style="font-weight: 700; color: #14131C;">{pt.lead}</strong>{' '}
                      {pt.detail}
                    </p>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                class="asc-inline-link"
                style="display: inline-flex; align-items: center; gap: 8px; margin-top: clamp(20px, 2.4vw, 28px); font-size: 15px; font-weight: 700;"
              >
                {p.cta}
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
                    stroke-width="2.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>

        <div style="min-width: 0;">
          <div hidden={pillar !== 0}>
            <ToolGrid label="Built with" tools={techTools} />
          </div>
          <div hidden={pillar !== 1}>
            <ToolGrid label="Runs on" tools={marketingTools} />
          </div>
          <div hidden={pillar !== 2}>
            <div>
              <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(10px, 1.3vw, 18px); align-items: end;">
                {podRoles.map((r) => (
                  <div
                    key={r.name}
                    style={`display: grid; grid-template-rows: 34px auto; align-items: end; justify-items: center; gap: 8px; padding-bottom: ${r.lift};`}
                  >
                    <span style="font-size: 10.5px; font-weight: 700; line-height: 1.25; text-align: center; color: #3A384A; text-wrap: balance;">
                      {r.name}
                    </span>
                    <span style="display: block; width: 100%; min-height: 104px; aspect-ratio: 1; border-radius: 50%; overflow: hidden; border: 1px solid rgba(110,86,207,.3); background: #FFFFFF;" />
                  </div>
                ))}
              </div>
              <div style="margin-top: -8px; padding: 22px 18px 16px; border-radius: 999px 999px 8px 8px; border: 1px solid rgba(110,86,207,.3); background: linear-gradient(180deg, rgba(110,86,207,.14), rgba(110,86,207,.05)); text-align: center;">
                <div style="font-size: 15px; font-weight: 800; letter-spacing: -0.02em; color: #0F0F14;">
                  The three founders you work with
                </div>
                <div style="margin-top: 5px; font-family: 'JetBrains Mono', monospace; font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase; color: #4B3AA0;">
                  One team · no handoffs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
