import { useState } from 'preact/hooks';
import { serviceOptions } from '../../data/site';

/**
 * Island #1 — the only interactive part of the hero.
 *
 * In the design this was:
 *   state = { picked: [] }
 *   <sc-for list="{{ options }}" as="opt"> ... onClick="{{ opt.toggle }}"
 * The heading and the CTA below the grid never changed with state, so they
 * stay static HTML in Hero.astro and ship no JavaScript.
 */
export default function ServicePicker() {
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (label: string) =>
    setPicked((p) =>
      p.includes(label) ? p.filter((x) => x !== label) : [...p, label]
    );

  return (
    <div class="asc-picker-grid">
      {serviceOptions.map((label) => {
        const on = picked.includes(label);
        return (
          <button
            type="button"
            key={label}
            onClick={() => toggle(label)}
            aria-pressed={on}
            class={on ? 'asc-tile is-on' : 'asc-tile'}
          >
            <span class="asc-tile-mark">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 13l4.5 4.5L19 7"
                  stroke="#FFFFFF"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
