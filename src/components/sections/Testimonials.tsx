import { useState } from 'preact/hooks';
import { quotes, reviewBadges } from '../../data/content';

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
            {/* Photo when there is one, initials when there isn't — an
                unattributed draft shouldn't render a broken avatar. */}
            {quote.photo ? (
              <img
                class="asc-quote-photo"
                src={quote.photo}
                alt=""
                width="56"
                height="56"
                loading="lazy"
                decoding="async"
                referrerpolicy="no-referrer"
              />
            ) : (
              <span class="asc-quote-initials">{initials}</span>
            )}

            <span style="min-width: 0; display: flex; flex-direction: column; gap: 3px; text-align: left;">
              <span style="font-size: 14.5px; font-weight: 700; letter-spacing: -0.01em; color: #0F0F14;">
                {quote.linkedin ? (
                  <a
                    class="asc-quote-name"
                    href={quote.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {quote.name}
                    <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M6.94 5a2 2 0 11-4 0 2 2 0 014 0zM3.2 8.5h3.5V21H3.2V8.5zm5.8 0h3.35v1.71h.05c.47-.84 1.6-1.71 3.3-1.71 3.53 0 4.18 2.2 4.18 5.06V21h-3.5v-5.73c0-1.37-.03-3.13-1.98-3.13-1.99 0-2.29 1.49-2.29 3.03V21H9V8.5z"
                      />
                    </svg>
                  </a>
                ) : (
                  quote.name
                )}
              </span>
              <span style="font-size: 13px; color: #4A4858; text-wrap: pretty;">{quote.role}</span>
            </span>

            {/* Company logo. The shipped artwork is a white silhouette for the
                dark hero strip, so brightness(0) flips it to black for this
                light card — same file, no second asset. */}
            {quote.logo && (
              <img
                class="asc-quote-logo"
                src={quote.logo}
                alt={quote.role}
                loading="lazy"
                decoding="async"
                style={`width: ${Math.round(26 * (quote.logoRatio ?? 3))}px;`}
              />
            )}
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
        {reviewBadges.map((b) => {
          // Same softened optical-area rule used elsewhere: size by area, not
          // height, so a 6.7:1 wordmark and a 2:1 badge carry equal weight.
          const h = Math.round(Math.min(40, Math.max(20, 42.3 / Math.pow(b.ratio, 0.35))) * 10) / 10;
          const img = (
            <img
              class="asc-badge-img"
              src={b.src}
              alt={b.name}
              loading="lazy"
              decoding="async"
              style={`max-height: ${h}px;`}
            />
          );
          return (
            <span class="asc-badge" key={b.src}>
              {b.href ? (
                <a href={b.href} target="_blank" rel="noopener noreferrer">
                  {img}
                </a>
              ) : (
                img
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
