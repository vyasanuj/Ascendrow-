import { useState } from 'preact/hooks';
import { quotes } from '../../data/content';

/**
 * Island #5 — testimonial carousel.
 * The `key` on the quote block is deliberate: changing it remounts the element
 * so the ascQuoteIn animation replays, exactly as in the design.
 */
export default function Testimonials() {
  const [qi, setQi] = useState(0);
  const quote = quotes[qi];
  const initials = quote.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const prev = () => setQi((i) => (i + quotes.length - 1) % quotes.length);
  const next = () => setQi((i) => (i + 1) % quotes.length);

  return (
    <div
      style={`position: relative; z-index: 1; border-radius: 6px; background: ${quote.cardBg}; color: #0F0F14; padding: clamp(34px, 4.6vw, 76px) clamp(20px, 3vw, 40px) clamp(26px, 3vw, 44px); box-shadow: 0 50px 110px -50px rgba(9,8,20,.9); transition: background .55s ease;`}
    >
      <h2 style="margin: 0 auto; max-width: 22ch; text-align: center; font-size: clamp(30px, 4.2vw, 58px); font-weight: 800; letter-spacing: -0.04em; line-height: 1.02; color: #0F0F14; text-wrap: balance;">
        Growth teams that stayed.
      </h2>

      <div style="display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: clamp(10px, 2vw, 28px); margin-top: clamp(26px, 3.2vw, 44px);">
        <button type="button" onClick={prev} aria-label="Previous testimonial" class="asc-quote-nav">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M14 6l-6 6 6 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <div
          key={`q${qi}`}
          style="min-width: 0; text-align: center; animation: ascQuoteIn .5s cubic-bezier(.22,.9,.24,1) both;"
        >
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 10.5px; letter-spacing: .16em; text-transform: uppercase; color: #4B3AA0;">
            {quote.tag}
          </div>
          <blockquote style="margin: 14px auto 0; max-width: 46ch; font-size: clamp(17px, 1.7vw, 25px); font-weight: 500; line-height: 1.4; letter-spacing: -0.02em; color: #14131C; text-wrap: pretty;">
            {quote.quote}
          </blockquote>
          <div style="display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: clamp(22px, 2.6vw, 32px);">
            <span style="flex: 0 0 auto; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(110,86,207,.28); background: linear-gradient(160deg, rgba(110,86,207,.16), rgba(110,86,207,.06)); font-size: 17px; font-weight: 800; letter-spacing: -0.01em; color: #4B3AA0;">
              {initials}
            </span>
            <span style="min-width: 0; display: flex; flex-direction: column; gap: 3px; text-align: left;">
              <span style="font-size: 14.5px; font-weight: 700; letter-spacing: -0.01em; color: #0F0F14;">
                {quote.name}
              </span>
              <span style="font-size: 13px; color: #4A4858; text-wrap: pretty;">{quote.role}</span>
            </span>
          </div>
        </div>

        <button type="button" onClick={next} aria-label="Next testimonial" class="asc-quote-nav">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M10 6l6 6-6 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <div style="margin-top: clamp(26px, 3.2vw, 44px); padding-top: clamp(20px, 2.4vw, 30px); border-top: 1px solid rgba(15,15,20,.1); display: grid; grid-template-columns: repeat(auto-fit, minmax(min(150px, 45%), 1fr)); grid-auto-rows: clamp(72px, 7vw, 88px); gap: clamp(10px, 1.4vw, 20px);">
        {[1, 2, 3, 4].map((n) => (
          <span
            key={n}
            style="display: flex; align-items: center; justify-content: center; border: 1px solid rgba(15,15,20,.1); border-radius: 4px; background: #FFFFFF; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: rgba(15,15,20,.28);"
          >
            Logo
          </span>
        ))}
      </div>
    </div>
  );
}
