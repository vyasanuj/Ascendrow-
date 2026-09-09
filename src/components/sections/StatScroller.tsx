import { useEffect, useRef, useState } from 'preact/hooks';
import { stats } from '../../data/content';

/**
 * Island #2 — the 340vh sticky scroll sequence (#what-we-do).
 *
 * The design drove this with `setInterval(this.onScroll, 120)`, which called
 * getBoundingClientRect() eight times a second for the life of the page and
 * forced a layout every time. Replaced here with:
 *   - an IntersectionObserver that gates the listener, so nothing runs at all
 *     while the section is off screen, and
 *   - a requestAnimationFrame-coalesced scroll handler, so we measure at most
 *     once per frame instead of on every scroll event.
 * Same behaviour, none of the idle cost.
 */
// Size each chip logo by a SOFTENED area rule: h = C / ratio^0.35.
//
// True area normalisation (exponent 0.5) works for the hero strip, where every
// logo is a wordmark. These chips span 0.8 (the stacked Google Ads lockup) to
// 5.3 (LinkedIn Ads), and at 0.5 the portrait and square marks tower over the
// wordmarks. At 0.35 the spread lands around 22–46px: wordmarks stay compact,
// stacked lockups get the height they need to stay legible.
const CHIP_C = 42.3;
const CHIP_K = 0.35;
const brandHeight = (ratio = 3) =>
  Math.round(Math.min(46, Math.max(22, CHIP_C / Math.pow(ratio, CHIP_K))) * 10) / 10;

export default function StatScroller() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let ticking = false;
    let inView = false;

    const measure = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      const i = Math.round(p * (stats.length - 1));
      setActive((prev) => (prev === i ? prev : i));
    };

    const onScroll = () => {
      if (!inView || ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    const io = new IntersectionObserver((entries) => {
      inView = entries[0].isIntersecting;
      if (inView) onScroll();
    });
    io.observe(el);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    measure();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const n = stats.length;
  const washHeight = `${28 + active * 17}vh`;

  return (
    <div
      id="what-we-do"
      ref={wrapRef}
      style={{
        background: '#0F0F14',
        color: '#F8F7FB',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        position: 'relative',
        height: '340vh',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '0 clamp(20px, 4vw, 56px)',
          background: '#0F0F14',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: washHeight,
            background:
              'linear-gradient(180deg, rgba(27,24,48,.92) 0%, rgba(41,34,80,.95) 30%, rgba(59,47,126,.97) 58%, rgba(92,72,188,1) 82%, #6E56CF 100%)',
            WebkitMaskImage:
              'radial-gradient(150% 108% at 50% 100%, #000 68%, rgba(0,0,0,.5) 84%, transparent 100%)',
            maskImage:
              'radial-gradient(150% 108% at 50% 100%, #000 68%, rgba(0,0,0,.5) 84%, transparent 100%)',
            transition: 'height .7s cubic-bezier(.22,.9,.24,1)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            height: 'clamp(430px, 44vw, 500px)',
            perspective: '1200px',
          }}
        >
          {stats.map((stat, i) => {
            let d = i - active;
            if (d > n / 2) d -= n;
            if (d < -n / 2) d += n;
            const on = d === 0;

            return (
              <div
                key={stat.title}
                aria-hidden={!on}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  transformStyle: 'preserve-3d',
                  transition:
                    'transform .7s cubic-bezier(.22,.9,.24,1), opacity .7s ease',
                  willChange: 'transform, opacity',
                  opacity: on ? 1 : 0,
                  transform: `rotateX(${d * -34}deg) translateY(${d * 62}px) translateZ(${
                    on ? 0 : -170
                  }px) scale(${on ? 1 : 0.9})`,
                  pointerEvents: on ? 'auto' : 'none',
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(56px, 8.4vw, 116px)',
                    fontWeight: 800,
                    letterSpacing: '-0.05em',
                    lineHeight: 0.95,
                  }}
                >
                  {stat.value}
                  <span
                    style={{
                      color:
                        stat.mark === 'cta'
                          ? 'var(--asc-cta, #FF6B4A)'
                          : 'var(--asc-accent, #6E56CF)',
                    }}
                  >
                    {stat.suffix}
                  </span>
                </div>

                <div
                  style={{
                    marginTop: 'clamp(12px, 1.6vw, 20px)',
                    maxWidth: '20ch',
                    fontSize: 'clamp(20px, 2.2vw, 32px)',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.15,
                    textWrap: 'balance',
                  }}
                >
                  {stat.title}
                </div>

                <p
                  style={{
                    margin: 'clamp(12px, 1.4vw, 18px) 0 0',
                    maxWidth: '56ch',
                    fontSize: 'var(--asc-body-size)',
                    lineHeight: 'var(--asc-body-lh)',
                    color: '#EFEEF6',
                    textWrap: 'pretty',
                  }}
                >
                  {stat.body}
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: 'clamp(18px, 2.2vw, 28px)',
                  }}
                >
                  {stat.brands.map((brand) => (
                    <span
                      key={brand.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 'clamp(112px, 13vw, 132px)',
                        height: '76px',
                        border: '1px solid rgba(248,247,251,.28)',
                        borderRadius: '4px',
                        background: 'rgba(15,15,20,.55)',
                        fontSize: '12px',
                        letterSpacing: '0.06em',
                        color: 'rgba(248,247,251,.55)',
                        textAlign: 'center',
                        padding: '0 8px',
                      }}
                    >
                      {brand.src ? (
                        <img
                          src={brand.src}
                          alt={brand.name}
                          loading="lazy"
                          decoding="async"
                          style={{
                            width: 'auto',
                            height: 'auto',
                            maxHeight: `${brandHeight(brand.ratio)}px`,
                            maxWidth: '88%',
                            objectFit: 'contain',
                            // Artwork is already a white silhouette; this keeps
                            // the chips uniform if a coloured file slips in.
                            filter: 'brightness(0) invert(1)',
                            opacity: 0.88,
                          }}
                        />
                      ) : (
                        brand.name
                      )}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
