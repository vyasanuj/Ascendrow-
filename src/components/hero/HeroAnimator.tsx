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
          // Website demo reset
          .set('.asc-web-browser', { autoAlpha: 0, y: 20 })
          .set('.asc-web-cursor', { autoAlpha: 0, x: 0, y: 0 })
          .set('.asc-web-cta-btn', { background: '#FF6B4A', scale: 1 })
          .set('.asc-web-cta-ripple', { autoAlpha: 0, scale: 0 })
          .set('.asc-web-hero-content', { autoAlpha: 1 })
          .set('.asc-web-form-overlay', { autoAlpha: 0, y: 20 })
          .set('.asc-web-form-name .asc-web-field-fill', { scaleX: 0 })
          .set('.asc-web-form-email .asc-web-field-fill', { scaleX: 0 })
          .set('.asc-web-form-msg .asc-web-field-fill', { scaleX: 0 })
          .set('.asc-web-form-submit', { background: '#FF6B4A', scale: 1 })
          .set('.asc-web-form-success', { autoAlpha: 0, scale: 0.8 })
          // WhatsApp demo reset
          .set('.asc-wa-phone', { autoAlpha: 0, y: 24 })
          .set('.asc-wa-msg', { autoAlpha: 0, y: 10 })
          .set('.asc-wa-typing', { autoAlpha: 0 })
          .set('.asc-wa-reply-1', { autoAlpha: 0, y: 10 })
          .set('.asc-wa-reply-2', { autoAlpha: 0, y: 10 })
          .set('.asc-wa-reply-3', { autoAlpha: 0, y: 10 })
          .set('.asc-wa-customer-2', { autoAlpha: 0, y: 10 })
          .set('.asc-wa-confirm', { autoAlpha: 0, y: 10 })
          .set('.asc-wa-quick-btns', { autoAlpha: 0 })
          .set('.asc-wa-chat-inner', { y: 0 })
          // Cybersecurity dashboard resets
          .set('.asc-cy-dash', { autoAlpha: 0, y: 20 })
          .set('.asc-cy-sidebar', { autoAlpha: 0, x: -30 })
          .set('.asc-cy-header', { autoAlpha: 0, y: -10 })
          .set('.asc-cy-card', { autoAlpha: 0, y: -20 })
          .set('.asc-cy-heatmap-box', { autoAlpha: 0, scale: 0 })
          .set('.asc-cy-bottom', { autoAlpha: 0, y: 20 })
          .set('.asc-cy-terminal', { autoAlpha: 0, scale: 0.9 })
          .call(() => {
            const nameV = q('.asc-web-form-name .asc-web-field-value');
            const emailV = q('.asc-web-form-email .asc-web-field-value');
            const msgV = q('.asc-web-form-msg .asc-web-field-value');
            if (nameV) nameV.textContent = '';
            if (emailV) emailV.textContent = '';
            if (msgV) msgV.textContent = '';
          })

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
          .to(demos[2], { autoAlpha: 0, duration: 0.3 }, '<')
          
          /* ═══ PHASE 4 — "land on a website that converts" ═══ */
          .addLabel('w', '+=0.15')
          .to(phases[3], { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 'w')
          .to(demos[3], { autoAlpha: 1, duration: 0.35 }, 'w+=0.3')
          // Browser slides up
          .to('.asc-web-browser', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 'w+=0.4')
          // Show cursor
          .to('.asc-web-cursor', { autoAlpha: 1, duration: 0.2 }, 'w+=1.0')
          // Move cursor toward the CTA button
          .to('.asc-web-cursor', { x: 30, y: 120, duration: 0.8, ease: 'power2.inOut' }, 'w+=1.2')
          // Click effect on CTA
          .to('.asc-web-cta-btn', { scale: 0.93, duration: 0.1 }, 'w+=2.1')
          .to('.asc-web-cta-btn', { scale: 1, duration: 0.15 }, 'w+=2.2')
          .to('.asc-web-cta-ripple', { autoAlpha: 0.6, scale: 1.8, duration: 0.3, ease: 'power2.out' }, 'w+=2.1')
          .to('.asc-web-cta-ripple', { autoAlpha: 0, duration: 0.2 }, 'w+=2.4')
          // Swap hero content for form
          .to('.asc-web-hero-content', { autoAlpha: 0, duration: 0.25 }, 'w+=2.5')
          .to('.asc-web-form-overlay', { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 'w+=2.7')
          // Cursor moves to name field
          .to('.asc-web-cursor', { x: -40, y: 10, duration: 0.5, ease: 'power2.inOut' }, 'w+=3.0')
          // Type name
          .to(q('.asc-web-form-name .asc-web-field-value'), {
            duration: 0.6, ease: 'none', text: 'Sarah Johnson',
          } as any, 'w+=3.5')
          .to('.asc-web-form-name .asc-web-field-fill', { scaleX: 1, duration: 0.6, ease: 'power1.out' }, 'w+=3.5')
          // Cursor moves to email field
          .to('.asc-web-cursor', { x: -40, y: 40, duration: 0.3, ease: 'power2.inOut' }, 'w+=4.2')
          // Type email
          .to(q('.asc-web-form-email .asc-web-field-value'), {
            duration: 0.6, ease: 'none', text: 'sarah@company.io',
          } as any, 'w+=4.5')
          .to('.asc-web-form-email .asc-web-field-fill', { scaleX: 1, duration: 0.6, ease: 'power1.out' }, 'w+=4.5')
          // Cursor moves to message field
          .to('.asc-web-cursor', { x: -40, y: 70, duration: 0.3, ease: 'power2.inOut' }, 'w+=5.2')
          // Type message
          .to(q('.asc-web-form-msg .asc-web-field-value'), {
            duration: 0.5, ease: 'none', text: 'I need help scaling...',
          } as any, 'w+=5.5')
          .to('.asc-web-form-msg .asc-web-field-fill', { scaleX: 1, duration: 0.5, ease: 'power1.out' }, 'w+=5.5')
          // Cursor moves to submit
          .to('.asc-web-cursor', { x: 30, y: 110, duration: 0.4, ease: 'power2.inOut' }, 'w+=6.1')
          // Click submit
          .to('.asc-web-form-submit', { scale: 0.93, duration: 0.1 }, 'w+=6.5')
          .to('.asc-web-form-submit', { scale: 1, duration: 0.15 }, 'w+=6.6')
          // Success state
          .to('.asc-web-form-overlay', { autoAlpha: 0, duration: 0.2 }, 'w+=6.8')
          .to('.asc-web-form-success', { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, 'w+=7.0')
          .to('.asc-web-cursor', { autoAlpha: 0, duration: 0.2 }, 'w+=7.0')
          .to({}, { duration: 1.2 }) // hold
          .to(phases[3], { autoAlpha: 0, y: -14, duration: 0.35, ease: 'power2.in' })
          .to(demos[3], { autoAlpha: 0, duration: 0.3 }, '<')

          /* ═══ PHASE 5 — "get a reply in seconds" ═══ */
          .addLabel('wa', '+=0.15')
          .to(phases[4], { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 'wa')
          .to(demos[4], { autoAlpha: 1, duration: 0.35 }, 'wa+=0.3')
          // Phone slides up
          .to('.asc-wa-phone', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 'wa+=0.4')
          // Customer message appears
          .to('.asc-wa-msg', { autoAlpha: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)' }, 'wa+=1.0')
          // Typing indicator
          .to('.asc-wa-typing', { autoAlpha: 1, duration: 0.15 }, 'wa+=1.5')
          .to('.asc-wa-typing', { autoAlpha: 0, duration: 0.1 }, 'wa+=2.3')
          // AI reply 1 — greeting + first product
          .to('.asc-wa-reply-1', { autoAlpha: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)' }, 'wa+=2.4')
          // Quick reply buttons
          .to('.asc-wa-quick-btns', { autoAlpha: 1, duration: 0.25 }, 'wa+=2.8')
          // Scroll up a bit
          .to('.asc-wa-chat-inner', { y: -85, duration: 0.4, ease: 'power2.inOut' }, 'wa+=3.1')
          // AI reply 2 — second product card with image
          .to('.asc-wa-reply-2', { autoAlpha: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)' }, 'wa+=3.2')
          // Scroll up more
          .to('.asc-wa-chat-inner', { y: -185, duration: 0.4, ease: 'power2.inOut' }, 'wa+=3.6')
          // AI reply 3 — third product card
          .to('.asc-wa-reply-3', { autoAlpha: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)' }, 'wa+=3.7')
          // Scroll up to show next replies
          .to('.asc-wa-chat-inner', { y: -260, duration: 0.4, ease: 'power2.inOut' }, 'wa+=4.4')
          // Customer reply — "I'll take the serum!"
          .to('.asc-wa-customer-2', { autoAlpha: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)' }, 'wa+=4.5')
          // Quick btns hide
          .to('.asc-wa-quick-btns', { autoAlpha: 0, duration: 0.2 }, 'wa+=4.5')
          // Scroll up for confirmation
          .to('.asc-wa-chat-inner', { y: -360, duration: 0.4, ease: 'power2.inOut' }, 'wa+=5.1')
          // Confirmation reply
          .to('.asc-wa-confirm', { autoAlpha: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)' }, 'wa+=5.2')
          .to({}, { duration: 1.5 }) // hold
          .to(phases[4], { autoAlpha: 0, y: -14, duration: 0.35, ease: 'power2.in' })
          .to(demos[4], { autoAlpha: 0, duration: 0.3 }, '<')

          /* ═══ PHASE 6 — "use a product that scales" ═══ */
          .addLabel('c', '+=0.15')
          .to(phases[5], { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 'c')
          .to(demos[5], { autoAlpha: 1, duration: 0.35 }, 'c+=0.3')
          // Dashboard container appears
          .to('.asc-cy-dash', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 'c+=0.4')
          // Sidebar slides in
          .to('.asc-cy-sidebar', { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power2.out' }, 'c+=0.7')
          // Header slides down
          .to('.asc-cy-header', { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 'c+=0.9')
          // Stat cards cascade
          .to('.asc-cy-card', { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)' }, 'c+=1.1')
          // Heatmap boxes scale up
          .to('.asc-cy-heatmap-box', { autoAlpha: 1, scale: 1, duration: 0.4, stagger: { each: 0.015, from: 'random' }, ease: 'back.out(2)' }, 'c+=1.5')
          // Bottom area slides up
          .to('.asc-cy-bottom', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 'c+=1.8')
          // Terminal pop up
          .to('.asc-cy-terminal', { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(1.2)' }, 'c+=2.3')
          // Terminal typing effect
          .to(q('.asc-cy-term-text'), { duration: 2.0, ease: 'none', text: '> init_lab --target=api_gw\n> scaling nodes... [||||||||||] 100%\n> ACCESS GRANTED' } as any, 'c+=2.8')
          .to({}, { duration: 2.0 }) // hold
          .to(phases[5], { autoAlpha: 0, y: -14, duration: 0.35, ease: 'power2.in' })
          .to(demos[5], { autoAlpha: 0, duration: 0.3 }, '<');
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
            land on a website that converts.
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
          <span data-phase style={{ position: 'absolute', top: 0, left: 0, width: '100%', ...off }}>
            land on a website that <span style={{ color: '#C9C2EC' }}>converts</span>.
          </span>
          <span data-phase style={{ position: 'absolute', top: 0, left: 0, width: '100%', ...off }}>
            get a reply in <span style={{ color: '#C9C2EC' }}>seconds</span>.
          </span>
          <span data-phase style={{ position: 'absolute', top: 0, left: 0, width: '100%', ...off }}>
            use a product that <span style={{ color: '#FF6B4A' }}>scales</span>.
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

        {/* ▸ Website Landing Page Demo — "land on a website that converts" */}
        <div data-demo style={{ gridArea: '1/1', width: '100%', minWidth: 0, ...off }}>
          <div
            class="asc-web-browser"
            style={{
              borderRadius: '12px',
              background: '#0a0a0f',
              border: '1px solid rgba(255,255,255,0.1)',
              overflow: 'hidden',
              fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
              position: 'relative',
            }}
          >
            {/* ── Browser chrome bar ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#111118' }}>
              <div style={{ display: 'flex', gap: '5px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{ background: '#1a1a24', borderRadius: '6px', padding: '4px 16px', fontSize: '10px', color: '#6b6b80', display: 'flex', alignItems: 'center', gap: '4px', maxWidth: '240px', width: '100%', justifyContent: 'center' }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#28c840" stroke-width="3" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  yourbusiness.com
                </div>
              </div>
            </div>

            {/* ── Mini navbar ── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>YourBrand<span style={{ color: '#FF6B4A' }}>.</span></div>
              <div style={{ display: 'flex', gap: '14px', fontSize: '9px', color: '#888', fontWeight: 500 }}>
                <span>Services</span>
                <span>Work</span>
                <span>About</span>
                <span style={{ background: '#FF6B4A', color: '#000', padding: '3px 8px', borderRadius: '3px', fontWeight: 700 }}>Contact</span>
              </div>
            </div>

            {/* ── Hero content area ── */}
            <div class="asc-web-hero-content" style={{ padding: '16px 16px 14px', display: 'flex', gap: '12px', alignItems: 'center', minHeight: '180px' }}>
              {/* Left: copy */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '7px', fontWeight: 700, color: '#FF6B4A', textTransform: 'uppercase' as any, letterSpacing: '0.1em', marginBottom: '6px' }}>Award-Winning Agency</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '8px' }}>
                  Grow Your Brand.<br/>Scale Your Revenue.
                </div>
                <div style={{ fontSize: '9px', color: '#9b9baa', lineHeight: 1.5, marginBottom: '12px' }}>
                  We build digital experiences that turn visitors into customers. Strategy, design & technology — all under one roof.
                </div>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <button
                    class="asc-web-cta-btn"
                    style={{
                      background: '#FF6B4A',
                      color: '#000',
                      border: 'none',
                      padding: '7px 18px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    Get Started
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </button>
                  <div class="asc-web-cta-ripple" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) scale(0)', width: '100%', height: '100%', borderRadius: '4px', border: '2px solid #FF6B4A', opacity: 0, pointerEvents: 'none' }} />
                </div>
                {/* Trust row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
                  <div style={{ display: 'flex' }}>
                    {[1,2,3].map(i => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/40?img=${i + 10}`}
                        style={{ width: '16px', height: '16px', borderRadius: '50%', border: '1.5px solid #0a0a0f', marginLeft: i > 1 ? '-5px' : '0', objectFit: 'cover' }}
                        alt=""
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '8px', color: '#888' }}>Trusted by <span style={{ color: '#fff', fontWeight: 600 }}>120+</span> brands</span>
                </div>
              </div>
              {/* Right: image card */}
              <div style={{ width: '45%', flexShrink: 0, borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=400&auto=format&fit=crop"
                  style={{ width: '100%', height: '155px', objectFit: 'cover', display: 'block' }}
                  alt="Team collaboration"
                />
                {/* Floating stat card */}
                <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', borderRadius: '6px', padding: '6px 10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '7px', color: '#888', marginBottom: '2px' }}>Conversion Rate</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#34d399' }}>4.8x</span>
                    <span style={{ fontSize: '7px', color: '#34d399' }}>↑ 340%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Form overlay (hidden initially, revealed after CTA click) ── */}
            <div class="asc-web-form-overlay" style={{ position: 'absolute', top: '72px', left: 0, right: 0, bottom: 0, background: '#0a0a0f', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', opacity: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '2px' }}>Let's get started 🚀</div>
              <div style={{ fontSize: '8px', color: '#888', marginBottom: '4px' }}>Fill in your details and we'll reach out within 24h.</div>
              {/* Name field */}
              <div class="asc-web-form-name" style={{ position: 'relative' }}>
                <div style={{ fontSize: '7px', color: '#666', marginBottom: '3px', fontWeight: 600 }}>Full Name</div>
                <div style={{ background: '#16161f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', padding: '6px 8px', fontSize: '10px', color: '#fff', position: 'relative', overflow: 'hidden', minHeight: '20px' }}>
                  <div class="asc-web-field-fill" style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '100%', background: 'rgba(110,86,207,0.08)', transformOrigin: 'left', transform: 'scaleX(0)' }} />
                  <span class="asc-web-field-value" style={{ position: 'relative', whiteSpace: 'pre' }} />
                </div>
              </div>
              {/* Email field */}
              <div class="asc-web-form-email" style={{ position: 'relative' }}>
                <div style={{ fontSize: '7px', color: '#666', marginBottom: '3px', fontWeight: 600 }}>Email</div>
                <div style={{ background: '#16161f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', padding: '6px 8px', fontSize: '10px', color: '#fff', position: 'relative', overflow: 'hidden', minHeight: '20px' }}>
                  <div class="asc-web-field-fill" style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '100%', background: 'rgba(110,86,207,0.08)', transformOrigin: 'left', transform: 'scaleX(0)' }} />
                  <span class="asc-web-field-value" style={{ position: 'relative', whiteSpace: 'pre' }} />
                </div>
              </div>
              {/* Message field */}
              <div class="asc-web-form-msg" style={{ position: 'relative' }}>
                <div style={{ fontSize: '7px', color: '#666', marginBottom: '3px', fontWeight: 600 }}>Message</div>
                <div style={{ background: '#16161f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', padding: '6px 8px', fontSize: '10px', color: '#fff', position: 'relative', overflow: 'hidden', minHeight: '20px' }}>
                  <div class="asc-web-field-fill" style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '100%', background: 'rgba(110,86,207,0.08)', transformOrigin: 'left', transform: 'scaleX(0)' }} />
                  <span class="asc-web-field-value" style={{ position: 'relative', whiteSpace: 'pre' }} />
                </div>
              </div>
              {/* Submit */}
              <button
                class="asc-web-form-submit"
                style={{
                  background: '#FF6B4A',
                  color: '#000',
                  border: 'none',
                  padding: '7px 20px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                  marginTop: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                Submit
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
              </button>
            </div>

            {/* ── Success state (shown after form submit) ── */}
            <div class="asc-web-form-success" style={{ position: 'absolute', top: '72px', left: 0, right: 0, bottom: 0, background: '#0a0a0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: 0 }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(34,197,94,0.25)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>You're in! 🎉</div>
              <div style={{ fontSize: '9px', color: '#888', textAlign: 'center' }}>We'll reach out within 24 hours.<br/>Get ready to scale.</div>
            </div>

            {/* ── Animated cursor ── */}
            <div
              class="asc-web-cursor"
              style={{
                position: 'absolute',
                top: '50%',
                left: '25%',
                width: '18px',
                height: '18px',
                opacity: 0,
                zIndex: 50,
                pointerEvents: 'none',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
              }}
            >
              <svg viewBox="0 0 24 24" fill="#fff" stroke="#000" stroke-width="1">
                <path d="M4 1l14 10.5-6 .5 4 9-3 1.5-4-9-5 4z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ▸ WhatsApp Chat Demo — "get a reply in seconds" */}
        <div data-demo style={{ gridArea: '1/1', width: '100%', minWidth: 0, ...off }}>
          <div
            class="asc-wa-phone"
            style={{
              borderRadius: '14px',
              background: '#111b21',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
              fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
              position: 'relative',
              height: '310px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* ── WhatsApp header ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: '#1f2c34', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {/* Back arrow */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aebac1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              {/* Avatar */}
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=80&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#e9edef', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  GlowSkin ✨
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#25D366"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.1 14.6l-4.2-4.2 1.4-1.4 2.8 2.8 7.1-7.1 1.4 1.4-8.5 8.5z"/></svg>
                </div>
                <div style={{ fontSize: '10px', color: '#8696a0' }}>Business Account · Online</div>
              </div>
              {/* Action icons */}
              <div style={{ display: 'flex', gap: '14px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aebac1" stroke-width="2"><path d="M23 7V1h-6M16 8l7-7M1 17v6h6M8 16l-7 7" /></svg>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aebac1" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
              </div>
            </div>

            {/* ── Chat wallpaper area ── */}
            <div style={{ flex: 1, background: '#0b141a', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'p\' width=\'40\' height=\'40\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1\' fill=\'rgba(255,255,255,0.03)\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'200\' height=\'200\' fill=\'url(%23p)\'/%3E%3C/svg%3E")', padding: '10px 10px 6px', overflow: 'hidden', position: 'relative' }}>
              <div class="asc-wa-chat-inner" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>

              {/* ── Customer message ── */}
              <div class="asc-wa-msg" style={{ alignSelf: 'flex-end', maxWidth: '78%', opacity: 0 }}>
                <div style={{ background: '#005c4b', borderRadius: '8px 0 8px 8px', padding: '6px 10px', fontSize: '11.5px', color: '#e9edef', lineHeight: 1.45, position: 'relative' }}>
                  Hi! I'm looking for a good vitamin C serum for dull skin 🧴
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>11:42 AM</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#53bdeb" stroke-width="2" stroke-linecap="round"><path d="M2 12l5 5L20 5M8 12l5 5L22 5" /></svg>
                  </div>
                </div>
              </div>

              {/* ── Typing indicator ── */}
              <div class="asc-wa-typing" style={{ alignSelf: 'flex-start', opacity: 0 }}>
                <div style={{ background: '#202c33', borderRadius: '0 8px 8px 8px', padding: '8px 14px', display: 'flex', gap: '3px', alignItems: 'center' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8696a0', animation: 'ascWaDot 1.4s infinite 0s' }} />
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8696a0', animation: 'ascWaDot 1.4s infinite 0.2s' }} />
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8696a0', animation: 'ascWaDot 1.4s infinite 0.4s' }} />
                </div>
              </div>

              {/* ── AI Reply 1 — Greeting + product card with image ── */}
              <div class="asc-wa-reply-1" style={{ alignSelf: 'flex-start', maxWidth: '82%', opacity: 0 }}>
                <div style={{ background: '#202c33', borderRadius: '0 8px 8px 8px', overflow: 'hidden' }}>
                  <div style={{ padding: '6px 10px 2px', fontSize: '11.5px', color: '#e9edef', lineHeight: 1.45 }}>
                    Hi there! 👋 Welcome to <span style={{ fontWeight: 600 }}>GlowSkin</span>. Here are our bestsellers for dull skin:
                  </div>
                  {/* Product card 1 */}
                  <div style={{ margin: '6px 8px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', gap: '8px', padding: '6px' }}>
                      <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=120&auto=format&fit=crop" style={{ width: '52px', height: '52px', borderRadius: '4px', objectFit: 'cover', flexShrink: 0 }} alt="Vitamin C Serum" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#e9edef' }}>Vitamin C Brightening Serum</div>
                        <div style={{ fontSize: '9px', color: '#8696a0', marginTop: '1px' }}>20% Vitamin C · All skin types</div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#25D366', marginTop: '3px' }}>₹1,299</div>
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '5px', textAlign: 'center', fontSize: '10px', color: '#00a884', fontWeight: 600, cursor: 'pointer' }}>View Product →</div>
                  </div>
                  <div style={{ padding: '0 10px 6px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '3px' }}>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>11:42 AM</span>
                  </div>
                </div>
              </div>

              {/* ── AI Reply 2 — Second product ── */}
              <div class="asc-wa-reply-2" style={{ alignSelf: 'flex-start', maxWidth: '82%', opacity: 0 }}>
                <div style={{ background: '#202c33', borderRadius: '0 8px 8px 8px', overflow: 'hidden' }}>
                  <div style={{ margin: '6px 8px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', gap: '8px', padding: '6px' }}>
                      <img src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=120&auto=format&fit=crop" style={{ width: '52px', height: '52px', borderRadius: '4px', objectFit: 'cover', flexShrink: 0 }} alt="Face Moisturizer" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#e9edef' }}>Hyaluronic Glow Moisturizer</div>
                        <div style={{ fontSize: '9px', color: '#8696a0', marginTop: '1px' }}>Deep hydration · SPF 30</div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#25D366', marginTop: '3px' }}>₹899</div>
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '5px', textAlign: 'center', fontSize: '10px', color: '#00a884', fontWeight: 600, cursor: 'pointer' }}>View Product →</div>
                  </div>
                  <div style={{ padding: '0 10px 6px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '3px' }}>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>11:42 AM</span>
                  </div>
                </div>
              </div>

              {/* ── AI Reply 3 — Combo offer ── */}
              <div class="asc-wa-reply-3" style={{ alignSelf: 'flex-start', maxWidth: '82%', opacity: 0 }}>
                <div style={{ background: '#202c33', borderRadius: '0 8px 8px 8px', padding: '6px 10px', fontSize: '11.5px', color: '#e9edef', lineHeight: 1.45 }}>
                  💡 <span style={{ fontWeight: 600 }}>Pro tip:</span> Get both in our Glow Combo at <span style={{ color: '#25D366', fontWeight: 700 }}>₹1,799</span> <span style={{ textDecoration: 'line-through', color: '#8696a0', fontSize: '10px' }}>₹2,198</span> — save 18%!
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>11:42 AM</span>
                  </div>
                </div>
              </div>

              {/* ── Customer reply 2 ── */}
              <div class="asc-wa-customer-2" style={{ alignSelf: 'flex-end', maxWidth: '78%', opacity: 0 }}>
                <div style={{ background: '#005c4b', borderRadius: '8px 0 8px 8px', padding: '6px 10px', fontSize: '11.5px', color: '#e9edef', lineHeight: 1.45 }}>
                  OMG the combo deal is perfect! 😍 I'll take it!
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>11:43 AM</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#53bdeb" stroke-width="2" stroke-linecap="round"><path d="M2 12l5 5L20 5M8 12l5 5L22 5" /></svg>
                  </div>
                </div>
              </div>

              {/* ── AI Confirmation reply ── */}
              <div class="asc-wa-confirm" style={{ alignSelf: 'flex-start', maxWidth: '82%', opacity: 0 }}>
                <div style={{ background: '#202c33', borderRadius: '0 8px 8px 8px', padding: '6px 10px', fontSize: '11.5px', color: '#e9edef', lineHeight: 1.45 }}>
                  Awesome choice! 🎉 Here's your payment link:
                  <div style={{ margin: '5px 0', padding: '6px 10px', background: 'rgba(0,168,132,0.12)', borderRadius: '4px', border: '1px solid rgba(0,168,132,0.2)' }}>
                    <div style={{ fontSize: '10px', color: '#00a884', fontWeight: 600 }}>🔗 pay.glowskin.com/order/GS-2847</div>
                    <div style={{ fontSize: '9px', color: '#8696a0', marginTop: '2px' }}>Glow Combo · ₹1,799 · Free shipping</div>
                  </div>
                  <div style={{ fontSize: '10px', color: '#8696a0', marginTop: '2px' }}>Order confirmed in <span style={{ color: '#25D366', fontWeight: 700 }}>47 seconds</span> ⚡</div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>11:43 AM</span>
                  </div>
                </div>
              </div>

            </div>
            </div>

            {/* ── Quick reply buttons ── */}
            <div class="asc-wa-quick-btns" style={{ padding: '6px 10px', display: 'flex', gap: '6px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#111b21', opacity: 0 }}>
              <div style={{ padding: '4px 12px', borderRadius: '14px', border: '1px solid #00a884', fontSize: '10px', color: '#00a884', fontWeight: 500, cursor: 'pointer' }}>🛒 Order Now</div>
              <div style={{ padding: '4px 12px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.15)', fontSize: '10px', color: '#aebac1', fontWeight: 500 }}>More Products</div>
              <div style={{ padding: '4px 12px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.15)', fontSize: '10px', color: '#aebac1', fontWeight: 500 }}>💬 Talk to Agent</div>
            </div>

            {/* ── Input bar ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', background: '#111b21' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8696a0" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>
              <div style={{ flex: 1, background: '#2a3942', borderRadius: '20px', padding: '6px 12px', fontSize: '11px', color: '#8696a0', display: 'flex', alignItems: 'center' }}>
                Type a message
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8696a0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
            </div>
          </div>
        </div>

        {/* ▸ Cybersecurity Dashboard Demo — "use a product that scales" */}
        <div data-demo style={{ gridArea: '1/1', width: '100%', minWidth: 0, ...off }}>
          <div
            class="asc-cy-dash"
            style={{
              borderRadius: '12px',
              background: '#0a0812',
              border: '1px solid rgba(138, 92, 255, 0.15)',
              overflow: 'hidden',
              fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
              position: 'relative',
              height: '310px',
              display: 'flex',
            }}
          >
            {/* Sidebar */}
            <div class="asc-cy-sidebar" style={{ width: '85px', background: '#110d1c', borderRight: '1px solid rgba(138, 92, 255, 0.1)', display: 'flex', flexDirection: 'column', padding: '10px 8px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px', paddingLeft: '4px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #6366f1)' }} />
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#e2e8f0' }}>Orca</span>
              </div>
              
              {/* Profile Card */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px', padding: '4px 6px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=64&auto=format&fit=crop" style={{ width: '16px', height: '16px', borderRadius: '50%', objectFit: 'cover' }} alt="Profile" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '7px', fontWeight: 600, color: '#e2e8f0', lineHeight: 1 }}>Niko Satrio</span>
                  <span style={{ fontSize: '5px', color: '#64748b', marginTop: '2px' }}>Lead Product</span>
                </div>
              </div>
              
              {/* Menu items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {['Dashboard', 'Discovery'].map(item => (
                  <div key={item} style={{ fontSize: '8px', color: '#64748b', padding: '5px 8px', borderRadius: '4px' }}>{item}</div>
                ))}
                <div style={{ fontSize: '8px', color: '#fff', padding: '5px 8px', borderRadius: '4px', background: 'rgba(168, 85, 247, 0.15)', borderLeft: '2px solid #a855f7' }}>API Security</div>
                {['Inventory', 'Attack Paths', 'Settings'].map(item => (
                  <div key={item} style={{ fontSize: '8px', color: '#64748b', padding: '5px 8px', borderRadius: '4px' }}>{item}</div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
              {/* Header */}
              <div class="asc-cy-header">
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f8fafc', margin: 0 }}>API Security</h3>
              </div>
              
              {/* Stat Cards Row */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { label: 'Critical', value: '223', color: '#ef4444', pct: '+0.30%' },
                  { label: 'High', value: '269', color: '#f97316', pct: '+0.30%' },
                  { label: 'Medium', value: '458', color: '#eab308', pct: '+0.30%' },
                  { label: 'Low', value: '789', color: '#a855f7', pct: '+0.30%' }
                ].map((stat, i) => (
                  <div key={i} class="asc-cy-card" style={{ flex: 1, background: 'linear-gradient(180deg, rgba(30,27,75,0.8), rgba(17,13,28,0.8))', border: '1px solid rgba(138, 92, 255, 0.15)', borderRadius: '8px', padding: '10px', position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: stat.color, boxShadow: `0 0 6px ${stat.color}` }} />
                      <span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: 500 }}>{stat.label}</span>
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ fontSize: '6px', color: '#64748b', marginTop: '4px' }}>This week's threats</div>
                    <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(34,197,94,0.15)', color: '#4ade80', fontSize: '6px', padding: '2px 5px', borderRadius: '10px', fontWeight: 600 }}>{stat.pct}</div>
                  </div>
                ))}
              </div>

              {/* Middle Row (Heatmap + Map) */}
              <div style={{ display: 'flex', gap: '8px', flex: 1, minHeight: 0 }}>
                {/* Heatmap Area */}
                <div class="asc-cy-bottom" style={{ flex: 1.8, background: '#110d1c', border: '1px solid rgba(138, 92, 255, 0.15)', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '10px' }}>Top Address Exposure</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(18, 1fr)', gap: '2px', flex: 1, alignContent: 'center' }}>
                    {Array.from({ length: 90 }).map((_, i) => {
                      const isHighlighted = (i % 8 === 0) || (i % 13 === 0);
                      const isMedium = (i % 5 === 0);
                      const intensity = isHighlighted ? 0.9 : isMedium ? 0.4 : 0.05;
                      return (
                        <div key={i} class="asc-cy-heatmap-box" style={{ aspectRatio: '1', background: `rgba(168, 85, 247, ${intensity})`, borderRadius: '1.5px', border: '1px solid rgba(168, 85, 247, 0.1)' }} />
                      );
                    })}
                  </div>
                </div>

                {/* Nodes Map */}
                <div class="asc-cy-bottom" style={{ flex: 1.2, background: '#110d1c', border: '1px solid rgba(138, 92, 255, 0.15)', borderRadius: '8px', padding: '10px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '10px', position: 'relative', zIndex: 2 }}>IP Addresses</div>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '24px 10px 10px' }}>
                    <img src="/images/world-map.svg" style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.15 }} alt="World Map" />
                    
                    {/* Glowing nodes overlay */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                      <div style={{ position: 'absolute', top: '35%', left: '30%', width: '4px', height: '4px', borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 8px #a855f7' }} />
                      <div style={{ position: 'absolute', top: '25%', left: '45%', width: '3px', height: '3px', borderRadius: '50%', background: '#c084fc', boxShadow: '0 0 6px #c084fc' }} />
                      <div style={{ position: 'absolute', top: '45%', left: '75%', width: '4px', height: '4px', borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 8px #a855f7' }} />
                      <div style={{ position: 'absolute', top: '65%', left: '55%', width: '3px', height: '3px', borderRadius: '50%', background: '#c084fc', boxShadow: '0 0 6px #c084fc' }} />
                      <div style={{ position: 'absolute', top: '55%', left: '20%', width: '2px', height: '2px', borderRadius: '50%', background: '#c084fc', boxShadow: '0 0 4px #c084fc' }} />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Terminal Overlay */}
              <div class="asc-cy-terminal" style={{ position: 'absolute', bottom: '15px', left: '10%', right: '10%', background: 'rgba(10, 8, 18, 0.95)', border: '1px solid rgba(168, 85, 247, 0.4)', borderRadius: '8px', padding: '10px 14px', backdropFilter: 'blur(8px)', boxShadow: '0 8px 32px rgba(168,85,247,0.3)' }}>
                <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#eab308' }} />
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e' }} />
                </div>
                <div class="asc-cy-term-text" style={{ fontSize: '10px', color: '#4ade80', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.5, minHeight: '45px' }} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
