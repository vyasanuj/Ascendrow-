import { useEffect, useRef } from 'preact/hooks';

/** 2431 → "2.4K", 847 → "847" */
const fmtNum = (n: number) => {
  const v = Math.round(n);
  return v >= 1000 ? (v / 1000).toFixed(1) + 'K' : String(v);
};

export default function HeroAnimator() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    (async () => {
      const { gsap } = await import('gsap');
      const { TextPlugin } = await import('gsap/TextPlugin');
      gsap.registerPlugin(TextPlugin);

      const el = root.current;
      if (!el) return;

      ctx = gsap.context(() => {
        const phases = gsap.utils.toArray<HTMLElement>('[data-phase]');
        const demos = gsap.utils.toArray<HTMLElement>('[data-demo]');
        const stars = gsap.utils.toArray<HTMLElement>('.asc-anim-star');
        const words = gsap.utils.toArray<HTMLElement>('.asc-ai-word');
        const q = (s: string) => el.querySelector(s) as HTMLElement;
        const counters = { likes: 0, comments: 0, shares: 0 };

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });

        /* ── INIT (runs at t=0 and on every repeat) ── */
        tl.set(phases, { autoAlpha: 0, y: 24 })
          .set(demos, { autoAlpha: 0 })
          // Google reset
          .set('.asc-search-cursor', { autoAlpha: 1 })
          .set('.asc-search-result', { autoAlpha: 0, y: 14 })
          .set(stars, { scale: 0, autoAlpha: 0 })
          .set('.asc-rank-badge', { scale: 0.7, autoAlpha: 0 })
          .call(() => {
            const e = q('.asc-search-query');
            if (e) e.textContent = '';
          })
          // Social reset
          .set('.asc-social-main', { autoAlpha: 0, scale: 0.9, y: 20 })
          .set('.asc-social-float-1', { autoAlpha: 0, y: 30 })
          .set('.asc-social-float-2', { autoAlpha: 0, y: -20 })
          .set('.asc-social-heart-pop', { autoAlpha: 0, scale: 0 })
          .set('.asc-social-heart-icon', { fill: 'none', stroke: '#fff' })
          .call(() => {
            counters.likes = counters.comments = counters.shares = 0;
            ['likes', 'comments', 'shares'].forEach((k) => {
              const e = q(`[data-counter="${k}"]`);
              if (e) e.textContent = '0';
            });
          })
          // AI reset
          .set('.asc-ai-mockup', { scale: 1.5, y: 70, background: 'transparent', borderColor: 'transparent', transformOrigin: 'center bottom' })
          .set('.asc-ai-header, .asc-ai-footer-text', { autoAlpha: 0 })
          .set('.asc-ai-response-area', { autoAlpha: 0 })
          .set('.asc-ai-submit', { background: '#676767' })
          .set('.asc-ai-prompt-cursor', { autoAlpha: 1 })
          .call(() => {
            const e = q('.asc-ai-prompt-input');
            if (e) e.textContent = '';
          })
          .set(words, { autoAlpha: 0, y: 4 })
          .set('.asc-ai-hl', { color: '#ececf1', textShadow: 'none' })
          .set('.asc-ai-cursor', { autoAlpha: 1 })

          /* ═══ PHASE 1 — "find you on Google" ═══ */
          .addLabel('g', '+=0.1')
          .to(phases[0], { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 'g')
          .to(demos[0], { autoAlpha: 1, duration: 0.35 }, 'g+=0.3')
          .to(q('.asc-search-query'), {
            duration: 1.6,
            ease: 'none',
            text: 'best marketing agency near me',
          } as any, 'g+=0.5')
          .to('.asc-search-cursor', { autoAlpha: 0, duration: 0.12 })
          .to('.asc-search-result', {
            autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out',
          }, '+=0.12')
          .to(stars, {
            scale: 1, autoAlpha: 1, duration: 0.18, stagger: 0.1, ease: 'back.out(3)',
          })
          .to('.asc-rank-badge', {
            scale: 1, autoAlpha: 1, duration: 0.3, ease: 'back.out(2)',
          }, '-=0.1')
          .to({}, { duration: 1.5 }) // hold
          .to(phases[0], { autoAlpha: 0, y: -14, duration: 0.35, ease: 'power2.in' })
          .to(demos[0], { autoAlpha: 0, duration: 0.3 }, '<')

          /* ═══ PHASE 2 — "remember you on social" ═══ */
          .addLabel('s', '+=0.15')
          .to(phases[1], { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 's')
          .to(demos[1], { autoAlpha: 1, duration: 0.35 }, 's+=0.3')
          .to('.asc-social-float-1', { autoAlpha: 0.6, y: -10, duration: 2, ease: 'power2.out' }, 's+=0.3')
          .to('.asc-social-float-2', { autoAlpha: 0.6, y: 20, duration: 2, ease: 'power2.out' }, 's+=0.4')
          
          // Central main post pops in
          .to('.asc-social-main', { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }, 's+=0.5')
          
          // Heart double-tap pop animation
          .to('.asc-social-heart-pop', { autoAlpha: 1, scale: 1.2, duration: 0.2, ease: 'back.out(2)' }, 's+=1.1')
          .to('.asc-social-heart-pop', { autoAlpha: 0, scale: 1.5, duration: 0.2, ease: 'power2.out' }, 's+=1.3')
          
          // Heart icon turns active
          .to('.asc-social-heart-icon', { fill: '#FF6B4A', stroke: '#FF6B4A', duration: 0.2 }, 's+=1.1')
          
          // Counters go up
          .to(counters, {
            likes: 11500,
            comments: 123,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate() {
              ['likes', 'comments'].forEach((k) => {
                const e = q(`[data-counter="${k}"]`);
                if (e) {
                  const val = Math.floor(counters[k as keyof typeof counters]);
                  if (val >= 1000) {
                     e.textContent = (val / 1000).toFixed(1) + 'K';
                  } else {
                     e.textContent = val.toString();
                  }
                }
              });
            },
          }, 's+=1.2')
          .to({}, { duration: 1.5 }) // hold
          .to(phases[1], { autoAlpha: 0, y: -14, duration: 0.35, ease: 'power2.in' })
          .to(demos[1], { autoAlpha: 0, duration: 0.3 }, '<')

          /* ═══ PHASE 3 — "see you in AI answers" ═══ */
          .addLabel('a', '+=0.15')
          .to(phases[2], { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 'a')
          .to(demos[2], { autoAlpha: 1, duration: 0.35 }, 'a+=0.3')
          
          // Type the prompt while zoomed in
          .to(q('.asc-ai-prompt-input'), {
            duration: 1.6,
            ease: 'none',
            text: 'best travel agent near me',
          } as any, 'a+=0.6')
          
          // Zoom out! (Triggers while typing)
          .to('.asc-ai-mockup', {
            scale: 1, y: 0, background: '#000000', borderColor: 'rgba(255,255,255,0.1)', duration: 0.8, ease: 'power3.inOut'
          }, 'a+=1.2')
          .to('.asc-ai-header, .asc-ai-footer-text', {
            autoAlpha: 1, duration: 0.5, ease: 'power2.inOut'
          }, 'a+=1.3')
          
          // Light up the submit button (after typing)
          .to('.asc-ai-submit', { background: '#fff', duration: 0.2 }, 'a+=2.4')
          .to('.asc-ai-prompt-cursor', { autoAlpha: 0, duration: 0.1 }, '<')
          
          // Show AI response area and stream text
          .to('.asc-ai-response-area', { autoAlpha: 1, duration: 0.3 }, '+=0.2')
          .to(words, {
            autoAlpha: 1, y: 0, duration: 0.03, stagger: 0.05,
          }, '<')
          // Highlight the brand
          .to('.asc-ai-hl', {
            color: '#FF6B4A',
            textShadow: '0 0 20px rgba(255,107,74,0.4)',
            duration: 0.5,
            ease: 'power2.out',
          }, '-=0.3')
          .to('.asc-ai-cursor', { autoAlpha: 0, duration: 0.3 }, '+=0.3')
          
          .to({}, { duration: 1.5 }) // hold
          .to(phases[2], { autoAlpha: 0, y: -14, duration: 0.35, ease: 'power2.in' })
          .to(demos[2], { autoAlpha: 0, duration: 0.3 }, '<');
      }, el);
    })();

    return () => {
      ctx?.revert();
    };
  }, []);

  /* ─── Shared styles ─── */
  const card: Record<string, string> = {
    padding: '18px 22px',
    borderRadius: '12px',
    background: 'rgba(248,247,251,0.035)',
    border: '1px solid rgba(248,247,251,0.07)',
  };

  const off: Record<string, string | number> = {
    opacity: 0,
    visibility: 'hidden',
  };

  /* ─── Render ─── */
  return (
    <div ref={root}>
      {/* ── Animated Headline ── */}
      <h1
        style={{
          margin: '0 auto',
          maxWidth: '900px',
          fontSize: 'clamp(32px, 4.4vw, 58px)',
          lineHeight: 1.05,
          letterSpacing: '-0.035em',
          fontWeight: 800,
          color: '#F8F7FB',
        }}
      >
        We make sure your customers
        <span style={{ display: 'block', position: 'relative', marginTop: '0.06em' }}>
          {/* Invisible spacer — keeps the container tall enough for any phrase */}
          <span aria-hidden="true" style={{ visibility: 'hidden', display: 'block' }}>
            remember you on social.
          </span>
          {/* Rotating phrases (absolutely positioned, GSAP toggles visibility) */}
          <span data-phase style={{ position: 'absolute', top: 0, left: 0, width: '100%', ...off }}>
            find you on <span style={{ color: '#C9C2EC' }}>Google</span>.
          </span>
          <span data-phase style={{ position: 'absolute', top: 0, left: 0, width: '100%', ...off }}>
            remember you on <span style={{ color: '#C9C2EC' }}>social</span>.
          </span>
          <span data-phase style={{ position: 'absolute', top: 0, left: 0, width: '100%', ...off }}>
            see you in <span style={{ color: '#FF6B4A' }}>AI answers</span>.
          </span>
        </span>
      </h1>

      {/* ── Demo Zone (CSS Grid stacks all 3 in the same cell) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', width: '100%', maxWidth: '520px', margin: 'clamp(24px, 2.6vw, 36px) auto 0', textAlign: 'left' }}>

        {/* ▸ Google Search Demo — realistic dark-mode SERP */}
        <div data-demo style={{ gridArea: '1/1', width: '100%', minWidth: 0, ...off }}>
          <div
            style={{
              borderRadius: '14px',
              background: '#202124',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
              fontFamily: "'Arial', 'Helvetica', system-ui, sans-serif",
            }}
          >
            {/* ── Google header bar ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '10px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Google wordmark */}
              <img
                src="/brands/google.png"
                alt=""
                style={{ height: '18px', width: 'auto', flexShrink: 0, opacity: 0.95 }}
                decoding="async"
              />
              {/* Search input pill */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '24px',
                  background: '#303134',
                  border: '1px solid #5f6368',
                  minHeight: '34px',
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    flex: 1,
                    color: '#e8eaed',
                    fontSize: '13px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: 0,
                  }}
                >
                  <span class="asc-search-query" style={{ whiteSpace: 'pre' }} />
                  <span
                    class="asc-search-cursor"
                    style={{
                      display: 'inline-block',
                      width: '1px',
                      height: '15px',
                      background: '#8ab4f8',
                      animation: 'ascCaret 0.8s infinite',
                    }}
                  />
                </span>
                {/* X / mic / lens icons */}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.45, flexShrink: 0 }}>
                  <path d="M18 6L6 18M6 6l12 12" stroke="#e8eaed" stroke-width="2" stroke-linecap="round" />
                </svg>
                <div style={{ width: '1px', height: '18px', background: '#5f6368', flexShrink: 0 }} />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.55, flexShrink: 0 }}>
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="#8ab4f8" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="#8ab4f8" stroke-width="1.5" fill="none" />
                  <line x1="12" y1="19" x2="12" y2="23" stroke="#8ab4f8" stroke-width="1.5" />
                </svg>
              </div>
            </div>

            {/* ── Tabs bar ── */}
            <div
              class="asc-g-tabs"
              style={{
                display: 'flex',
                gap: '4px',
                padding: '0 16px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                fontSize: '11.5px',
                color: '#9aa0a6',
                fontWeight: 500,
                flexWrap: 'wrap',
              }}
            >
              {[
                { label: 'All', active: true },
                { label: 'Images', active: false },
                { label: 'Maps', active: false },
                { label: 'Videos', active: false },
                { label: 'Shopping', active: false },
              ].map((tab) => (
                <span
                  key={tab.label}
                  style={{
                    padding: '8px 10px',
                    borderBottom: tab.active ? '2px solid #8ab4f8' : '2px solid transparent',
                    color: tab.active ? '#8ab4f8' : '#9aa0a6',
                  }}
                >
                  {tab.label}
                </span>
              ))}
            </div>

            {/* ── Search result body ── */}
            <div class="asc-search-result" style={{ padding: '14px 16px 16px', position: 'relative' }}>
              {/* Breadcrumb / URL */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#303134',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#8ab4f8' }}>Y</span>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#bdc1c6', lineHeight: 1.3 }}>Your Business</div>
                  <div style={{ fontSize: '10px', color: '#9aa0a6', lineHeight: 1.3 }}>
                    https://yourbusiness.com
                  </div>
                </div>
              </div>

              {/* Title */}
              <div
                class="asc-g-title"
                style={{
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#8ab4f8',
                  lineHeight: 1.3,
                  marginBottom: '6px',
                  cursor: 'pointer',
                  wordWrap: 'break-word',
                }}
              >
                Your Business — #1 Marketing Agency
              </div>

              {/* Rating row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', color: '#bdc1c6', fontWeight: 500 }}>4.9</span>
                <div style={{ display: 'flex', gap: '1px' }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span class="asc-anim-star" key={i} style={{ color: '#f4b400', fontSize: '11px', lineHeight: 1 }}>
                      ★
                    </span>
                  ))}
                </div>
                <span style={{ fontSize: '11px', color: '#9aa0a6' }}>(2,847)</span>
                <span style={{ fontSize: '11px', color: '#9aa0a6' }}>· Marketing agency</span>
              </div>

              {/* Snippet text */}
              <div style={{ fontSize: '12px', color: '#bdc1c6', lineHeight: 1.55, wordWrap: 'break-word' }}>
                <span style={{ color: '#9aa0a6' }}>Open</span> · Award-winning digital marketing,
                SEO &amp; paid media. Trusted by 120+ brands.
              </div>

              {/* ── Second result (dimmed, partial) ── */}
              <div
                class="asc-g-result2"
                style={{
                  marginTop: '14px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  opacity: 0.4,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: '#303134',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ fontSize: '10px', color: '#9aa0a6' }}>competitor-agency.com</div>
                </div>
                <div style={{ fontSize: '14px', color: '#8ab4f8', opacity: 0.7 }}>
                  Another Agency — Digital Services...
                </div>
              </div>

              {/* ── #1 rank badge overlay ── */}
              <span
                class="asc-rank-badge"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '3px 9px',
                  borderRadius: '4px',
                  background: 'rgba(34,197,94,0.15)',
                  color: '#34d399',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.03em',
                  border: '1px solid rgba(34,197,94,0.2)',
                }}
              >
                #1 RESULT
              </span>
            </div>
          </div>
        </div>

        {/* ▸ Social Media Demo (Floating posts motion graphics) */}
        <div data-demo style={{ gridArea: '1/1', position: 'relative', height: '280px', width: '100%', minWidth: 0, ...off }}>
           
           {/* Background Floating Post 1 (Left) */}
           <div class="asc-social-float-1" style={{ position: 'absolute', top: '20px', left: '-10px', width: '160px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '10px', opacity: 0, transform: 'rotate(-8deg)' }}>
             <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
               <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#333' }} />
               <div style={{ width: '60px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.2)' }} />
             </div>
             <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=200&auto=format&fit=crop" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px' }} alt=""/>
             <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
               <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF6B4A' }} />
               <div style={{ width: '40px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)', marginTop: '3px' }} />
             </div>
           </div>

           {/* Background Floating Post 2 (Right) */}
           <div class="asc-social-float-2" style={{ position: 'absolute', top: '40px', right: '-10px', width: '150px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '10px', opacity: 0, transform: 'rotate(6deg)' }}>
             <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
               <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#333' }} />
               <div style={{ width: '50px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.2)' }} />
             </div>
             <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=200&auto=format&fit=crop" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '6px' }} alt=""/>
             <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
               <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF6B4A' }} />
               <div style={{ width: '30px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)', marginTop: '3px' }} />
             </div>
           </div>
           
           {/* Center Main Post (Instagram style dark mode) */}
           <div class="asc-social-main" style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '260px', borderRadius: '16px', background: '#000', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', overflow: 'hidden', opacity: 0, zIndex: 10 }}>
             
             {/* Header */}
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} alt="Avatar"/>
                 <div style={{ display: 'flex', flexDirection: 'column' }}>
                   <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                     YourBrand 
                     <svg width="10" height="10" viewBox="0 0 24 24" fill="#3b82f6"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.1 14.6l-4.2-4.2 1.4-1.4 2.8 2.8 7.1-7.1 1.4 1.4-8.5 8.5z"/></svg>
                   </span>
                   <span style={{ fontSize: '10px', color: '#9b9b9b' }}>Sponsored</span>
                 </div>
               </div>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
             </div>
             
             {/* Image */}
             <div style={{ position: 'relative', width: '100%', height: '150px' }}>
               <img src="/hero-images/sadguru hero -social image.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Post content"/>
               
               {/* Heart Animation Overlay */}
               <div class="asc-social-heart-pop" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }}>
                 <svg width="60" height="60" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
               </div>
             </div>

             {/* Actions & Counters */}
             <div style={{ padding: '10px 12px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                 <div style={{ display: 'flex', gap: '12px' }}>
                   <svg class="asc-social-heart-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                 </div>
                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
               </div>
               
               <div style={{ fontSize: '12px', color: '#fff', fontWeight: 600, marginBottom: '4px' }}>
                 <span data-counter="likes">0</span> likes
               </div>
               <div style={{ fontSize: '11px', color: '#ececf1' }}>
                 <span style={{ fontWeight: 600 }}>YourBrand</span> Growing your business has never been this visually stunning. 🚀 #marketing
               </div>
             </div>
           </div>
        </div>

        {/* ▸ AI Response Demo (ChatGPT style) */}
        <div data-demo style={{ gridArea: '1/1', width: '100%', minWidth: 0, ...off }}>
          <div
            class="asc-ai-mockup"
            style={{
              borderRadius: '12px',
              background: '#212121',
              border: '1px solid rgba(255,255,255,0.1)',
              overflow: 'hidden',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              display: 'flex',
              flexDirection: 'column',
              height: '240px',
              width: '100%',
            }}
          >
            {/* Header */}
            <div class="asc-ai-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <img src="/brands/chatgpt.png" alt="ChatGPT" style={{ height: '22px', width: 'auto' }} decoding="async" />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ececf1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{ opacity: 0.7 }}>
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>

            {/* Chat Area */}
            <div style={{ flex: 1, padding: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div class="asc-ai-response-area" style={{ opacity: 0 }}>
                {/* AI Text */}
                <div style={{ fontSize: '13px', lineHeight: 1.6, color: '#ececf1', paddingTop: '0px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    {['Here ', 'are ', 'the ', 'top ', 'travel ', 'agents ', 'near ', 'Indore: '].map((w, i) => (
                      <span class="asc-ai-word" key={`a${i}`}>{w}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span class="asc-ai-word">1.</span>
                    <div>
                      <span class="asc-ai-word asc-ai-hl" style={{ fontWeight: 700, color: '#F8F7FB' }}>Your Business </span>
                      <span class="asc-ai-word" style={{ color: '#FBBF24', fontSize: '11px', letterSpacing: '1px' }}>★★★★★</span>
                      <span class="asc-ai-word" style={{ color: '#9b9b9b', fontSize: '10px' }}> (5000+ customer reviews)</span>
                      <br/>
                      {['Very ', 'easy ', 'bookings ', 'and ', 'great ', 'service.'].map((w, i) => (
                        <span class="asc-ai-word" key={`b${i}`}>{w}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span class="asc-ai-word">2.</span>
                    <div>
                      <span class="asc-ai-word" style={{ fontWeight: 600 }}>Safari Journeys </span>
                      {['— ', 'Good ', 'for ', 'wildlife ', 'tours.'].map((w, i) => (
                        <span class="asc-ai-word" key={`c${i}`}>{w}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: '-4px' }}>
                    <span
                      class="asc-ai-cursor"
                      style={{ display: 'inline-block', width: '6px', height: '14px', borderRadius: '1px', background: '#ececf1', animation: 'ascCaret 0.5s infinite' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div style={{ padding: '0 14px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: '#2f2f2f', borderRadius: '24px', padding: '8px 12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9b9b9b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
                <div style={{ flex: 1, marginLeft: '10px', fontSize: '13px', color: '#ececf1', display: 'flex', alignItems: 'center', overflow: 'hidden', minWidth: 0 }}>
                  <span class="asc-ai-prompt-input" style={{ whiteSpace: 'pre' }} />
                  <span
                    class="asc-ai-prompt-cursor"
                    style={{
                      display: 'inline-block',
                      width: '2px',
                      height: '14px',
                      background: '#ececf1',
                      animation: 'ascCaret 0.8s infinite',
                    }}
                  />
                </div>
                <div class="asc-ai-submit" style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#676767', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#212121" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </div>
              </div>
              <div class="asc-ai-footer-text" style={{ textAlign: 'center', fontSize: '10px', color: '#9b9b9b', marginTop: '8px' }}>
                ChatGPT can make mistakes. Check important info.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
