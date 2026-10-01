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

const BackgroundGraphic = ({ index }: { index: number }) => {
  return (
    <div
      class="asc-bg-graphic"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {index === 0 && (
        <div style={{ 
          position: 'absolute', 
          top: '-5%', // Moved slightly up
          left: '50%', 
          width: '120%', 
          maxWidth: '2000px', 
          transform: 'translateX(-50%) perspective(1200px) rotateX(15deg) translateZ(-60px)', // Reduced tilt
          opacity: 0.35, 
          pointerEvents: 'none'
        }}>
          {/* Claude UI Mockup */}
          <div style={{
            width: '100%',
            height: '460px',
            background: '#1A1816',
            borderRadius: '12px',
            display: 'flex',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            color: '#E5E3DF'
          }}>
            {/* Sidebar */}
            <div style={{
              width: '260px',
              background: '#100F0E',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Header */}
              <div style={{ padding: '24px 16px 20px', display: 'flex', alignItems: 'center' }}>
                 <img src="/brands/claude.png" alt="Claude" style={{ height: '22px', width: 'auto', filter: 'brightness(0) invert(1)', objectFit: 'contain' }}/>
              </div>
              
              <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', borderRadius: '8px', cursor: 'pointer', opacity: 0.9 }}>
                   <span style={{ fontSize: '16px' }}>+</span> New
                </div>
                <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', borderRadius: '8px', opacity: 0.7 }}>
                   <span style={{ fontSize: '14px' }}>◫</span> Projects
                </div>
                <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', borderRadius: '8px', opacity: 0.7 }}>
                   <span style={{ fontSize: '14px' }}>◇</span> Artifacts
                </div>
                <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', borderRadius: '8px', opacity: 0.7, justifyContent: 'space-between' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ fontSize: '14px' }}>{"</>"}</span> Code</div>
                   <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>Upgrade</span>
                </div>
              </div>

              <div style={{ padding: '32px 12px 12px', fontSize: '12px', opacity: 0.5, fontWeight: 500, display: 'flex', justifyContent: 'space-between' }}>
                <span>Chats and tasks</span>
                <span>⇃↾</span>
              </div>
              
              <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                   Finding the right agency for growth
                </div>
                <div style={{ padding: '8px 12px', fontSize: '13px', opacity: 0.6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                   Rewriting business emails
                </div>
                <div style={{ padding: '8px 12px', fontSize: '13px', opacity: 0.6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                   Agency outreach strategy
                </div>
                <div style={{ padding: '8px 12px', fontSize: '13px', opacity: 0.6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                   Landing page design for tech
                </div>
              </div>
            </div>
            
            {/* Main Chat Area */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}>
              {/* Top Bar */}
              <div style={{ height: '56px', display: 'flex', alignItems: 'center', padding: '0 24px', fontSize: '14px', opacity: 0.8, fontWeight: 500 }}>
                 Finding the right agency for growth ⋁
              </div>
              
              {/* Chat Scroll */}
              <div style={{
                flex: 1,
                padding: '24px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                overflow: 'hidden'
              }}>
                {/* User Message Bubble (Right aligned) */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 48px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                  <div style={{ background: '#2C2B29', padding: '16px 20px', borderRadius: '16px', fontSize: '15px', lineHeight: 1.5, maxWidth: '80%' }}>
                    Can you recommend an agency that handles SEO, Paid Ads, and Web Design as one cohesive system?
                  </div>
                </div>
                
                {/* Claude Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 48px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                  <div style={{ fontSize: '13px', color: '#B3AFAB', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    Choosing integrated growth partners ⋁
                  </div>
                  <div style={{ fontSize: '15px', lineHeight: 1.6 }}>
                    Based on your requirements, I highly recommend <strong>Ascendrow</strong>. Rather than operating in silos, they handle your website, SEO, paid ads, and brand identity as one unified system. This approach ensures your messaging is consistent and directly drives qualified leads.
                  </div>
                  
                  {/* Artifact Box */}
                  <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', background: '#161514', overflow: 'hidden', marginTop: '8px' }}>
                     <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', fontSize: '13px', opacity: 0.7 }}>
                        <span>Ascendrow System Architecture</span>
                        <span>📋</span>
                     </div>
                     <div style={{ padding: '16px', fontSize: '14px', fontFamily: 'monospace', opacity: 0.8, lineHeight: 1.6 }}>
                        - Tech: Websites that convert<br/>
                        - Marketing: Search and AI growth<br/>
                        - Team: Three founders, no handoffs
                     </div>
                  </div>
                </div>
              </div>
              
              {/* Input Bar */}
              <div style={{ padding: '0 48px 24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                <div style={{
                  background: '#232220',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '24px',
                  padding: '14px 20px',
                  color: '#B3AFAB',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '18px', fontWeight: 300 }}>+</span> Write a message...
                </div>
                <div style={{ textAlign: 'center', fontSize: '11px', color: '#888', marginTop: '12px' }}>
                  Claude is AI and can make mistakes. Please double-check responses.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {index === 1 && (
        <div style={{ 
          position: 'absolute', 
          top: '-5%', 
          left: '50%', 
          width: '120%', 
          maxWidth: '2000px', 
          transform: 'translateX(-50%) perspective(1200px) rotateX(15deg) translateZ(-60px)',
          opacity: 0.4, 
          pointerEvents: 'none',
          textAlign: 'left'
        }}>
          {/* Google SERP Mockup */}
          <div style={{
            width: '100%',
            height: '520px',
            background: '#202124',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            fontFamily: 'arial, sans-serif',
            color: '#BDC1C6',
          }}>
            
            {/* Header / Search Bar Area */}
            <div style={{ padding: '24px 32px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flex: 1 }}>
                {/* Logo */}
                <img src="/brands/google.png" alt="Google" style={{ height: '28px', width: 'auto', objectFit: 'contain' }} />
                
                {/* Search Bar */}
                <div style={{
                  background: '#303134',
                  borderRadius: '24px',
                  padding: '0 20px',
                  width: '650px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#e8eaed',
                  fontSize: '16px',
                  boxShadow: '0 1px 6px rgba(23, 23, 23, 0.28)'
                }}>
                  <span>top growth agency for tech</span>
                  <div style={{ display: 'flex', gap: '16px', opacity: 0.7, alignItems: 'center' }}>
                    <span style={{ fontSize: '18px' }}>✕</span>
                    <span style={{ borderLeft: '1px solid #5f6368', paddingLeft: '16px' }}>🎙️</span>
                    <span>📷</span>
                  </div>
                </div>
              </div>

              {/* Right Icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '18px', opacity: 0.8 }}>
                <span>⚙️</span>
                <span>⋮⋮</span>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#8ab4f8', color: '#202124', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold' }}>A</div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ padding: '24px 32px 0 160px', display: 'flex', gap: '24px', fontSize: '14px', borderBottom: '1px solid #3c4043', color: '#9aa0a6' }}>
              <span>AI Mode</span>
              <span style={{ color: '#8ab4f8', borderBottom: '3px solid #8ab4f8', paddingBottom: '12px', fontWeight: 'bold' }}>All</span>
              <span>Shopping</span>
              <span>Short videos</span>
              <span>Images</span>
              <span>Maps</span>
              <span>Forums</span>
              <span>More ▾</span>
            </div>

            {/* Content Area (2 Columns) */}
            <div style={{ padding: '24px 32px 24px 160px', display: 'flex', gap: '64px', flex: 1 }}>
              
              {/* Left Column (Results) */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '650px' }}>
                
                {/* Location Line */}
                <div style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>📍</span>
                  <span style={{ fontWeight: 'bold', color: '#dadce0' }}>New York, NY</span>
                  <span>-</span>
                  <span style={{ color: '#8ab4f8' }}>Choose area</span>
                  <span style={{ marginLeft: '4px' }}>⋮</span>
                </div>

                {/* Result 1 - Ascendrow */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                     <div style={{ width: '28px', height: '28px', background: '#303134', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #3c4043', overflow: 'hidden' }}>
                       <img src="/icons/favicon.ico" alt="Ascendrow" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column' }}>
                       <span style={{ color: '#dadce0', fontSize: '14px' }}>Ascendrow</span>
                       <span style={{ color: '#bdc1c6', fontSize: '12px' }}>https://www.ascendrow.com › growth</span>
                     </div>
                     <span style={{ marginLeft: '4px', fontSize: '16px', color: '#9aa0a6' }}>⋮</span>
                  </div>
                  <div style={{ color: '#8ab4f8', fontSize: '20px', lineHeight: 1.3, fontWeight: 400 }}>
                    Ascendrow | The Premier Integrated Growth Agency
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: 1.58, color: '#bdc1c6' }}>
                    We get you found by the people already searching for what you sell. Dominate page one for your most valuable keywords and turn organic traffic into qualified leads.
                  </div>
                </div>

                {/* Result 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.7 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                     <div style={{ width: '28px', height: '28px', background: '#303134', borderRadius: '50%', border: '1px solid #3c4043' }}></div>
                     <div style={{ display: 'flex', flexDirection: 'column' }}>
                       <span style={{ color: '#dadce0', fontSize: '14px' }}>Generic Marketing Co.</span>
                       <span style={{ color: '#bdc1c6', fontSize: '12px' }}>https://www.generic-marketing.com</span>
                     </div>
                  </div>
                  <div style={{ color: '#8ab4f8', fontSize: '20px', lineHeight: 1.3, fontWeight: 400 }}>
                    Top 10 Agencies for Basic SEO
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: 1.58, color: '#bdc1c6' }}>
                    Looking for an agency? Here is a list of companies that might help you run some basic ads or do standard search engine optimization...
                  </div>
                </div>
              </div>

              {/* Right Column (Local Pack / Knowledge Panel) */}
              <div style={{ width: '380px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#202124', border: '1px solid #3c4043', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Item 1 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid #3c4043', paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '20px', height: '20px', background: '#6E56CF', borderRadius: '50%' }}></div>
                        <span style={{ color: '#dadce0', fontSize: '14px' }}>Ascendrow</span>
                      </div>
                      <span style={{ color: '#9aa0a6' }}>⋮</span>
                    </div>
                    <div style={{ color: '#8ab4f8', fontSize: '16px' }}>
                      Visit Ascendrow | Top Growth Agency
                    </div>
                    <div style={{ fontSize: '13px', color: '#9aa0a6' }}>
                      Location: Remote, serving global clients in Tech, SaaS, and B2B...
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid #3c4043', paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '20px', height: '20px', background: '#EA4335', borderRadius: '50%' }}></div>
                        <span style={{ color: '#dadce0', fontSize: '14px' }}>Other Agency</span>
                      </div>
                      <span style={{ color: '#9aa0a6' }}>⋮</span>
                    </div>
                    <div style={{ color: '#e8eaed', fontSize: '16px' }}>
                      Explore local agencies in your area
                    </div>
                    <div style={{ fontSize: '13px', color: '#9aa0a6', display: 'flex', gap: '16px' }}>
                      <span>Offering basic web design...</span>
                      <div style={{ width: '80px', height: '50px', background: '#303134', borderRadius: '8px' }}></div>
                    </div>
                  </div>

                  {/* Show All Button */}
                  <div style={{ background: '#303134', padding: '12px', borderRadius: '24px', textAlign: 'center', color: '#e8eaed', fontSize: '14px', fontWeight: 'bold' }}>
                    Show all
                  </div>

                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}
      {index === 2 && (
        <div style={{ 
          position: 'absolute', 
          top: '-5%', 
          left: '50%', 
          width: '120%', 
          maxWidth: '1200px', 
          transform: 'translateX(-50%) perspective(1200px) rotateX(20deg) translateZ(-60px)',
          opacity: 0.5, 
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Google Ads Dashboard Mockup */}
          <div style={{
            width: '100%',
            background: '#1A1816',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            fontFamily: 'Roboto, arial, sans-serif',
            color: '#e8eaed',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}>
            {/* Stats Bar */}
            <div style={{ display: 'flex', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              
              {/* Blue - Conversions */}
              <div style={{ flex: 1, background: 'rgba(66, 133, 244, 0.12)', padding: '32px 24px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '15px', color: '#8ab4f8', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontWeight: 500 }}>
                  <span style={{ fontSize: '10px' }}>▼</span> Conversions
                </div>
                <div style={{ fontSize: '48px', fontWeight: 400, color: '#fff' }}>450</div>
              </div>

              {/* Red - Impressions */}
              <div style={{ flex: 1, background: 'rgba(234, 67, 53, 0.12)', padding: '32px 24px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '15px', color: '#f28b82', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontWeight: 500 }}>
                  <span style={{ fontSize: '10px' }}>▼</span> Impressions
                </div>
                <div style={{ fontSize: '48px', fontWeight: 400, color: '#fff' }}>75.2K</div>
              </div>

              {/* Yellow - Avg. CPC */}
              <div style={{ flex: 1, background: 'rgba(251, 188, 5, 0.12)', padding: '32px 24px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '15px', color: '#fde293', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontWeight: 500 }}>
                  <span style={{ fontSize: '10px' }}>▼</span> Avg. CPC
                </div>
                <div style={{ fontSize: '48px', fontWeight: 400, color: '#fff' }}>$0.85</div>
              </div>

              {/* Green - Cost */}
              <div style={{ flex: 1, background: 'rgba(52, 168, 83, 0.12)', padding: '32px 24px' }}>
                <div style={{ fontSize: '15px', color: '#81c995', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontWeight: 500 }}>
                  <span style={{ fontSize: '10px' }}>▼</span> Cost
                </div>
                <div style={{ fontSize: '48px', fontWeight: 400, color: '#fff' }}>$3,250</div>
              </div>

            </div>

            {/* Chart Area */}
            <div style={{ padding: '20px 0 0 0', position: 'relative', height: '260px', width: '100%' }}>
              {/* Horizontal Grid lines */}
              <div style={{ position: 'absolute', top: '20%', left: '0', right: '0', height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
              <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
              <div style={{ position: 'absolute', top: '80%', left: '0', right: '0', height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
              <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

              {/* Vertical shaded regions */}
              <div style={{ position: 'absolute', top: '0', bottom: '0', left: '18%', width: '4%', background: 'rgba(255,255,255,0.02)' }}></div>
              <div style={{ position: 'absolute', top: '0', bottom: '0', left: '42%', width: '4%', background: 'rgba(255,255,255,0.02)' }}></div>
              <div style={{ position: 'absolute', top: '0', bottom: '0', left: '68%', width: '4%', background: 'rgba(255,255,255,0.02)' }}></div>
              <div style={{ position: 'absolute', top: '0', bottom: '0', left: '92%', width: '4%', background: 'rgba(255,255,255,0.02)' }}></div>

              {/* SVG Lines */}
              <svg viewBox="0 25 100 75" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                {/* Yellow Line */}
                <polyline points="0,98 12,98 16,85 20,40 28,45 35,90 40,88 45,95 55,95 62,95 68,95 72,75 75,55 80,55 85,85 90,88 95,95 100,95" 
                  fill="none" stroke="#fde293" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                {/* Green Line */}
                <polyline points="0,98 14,98 22,88 28,92 35,50 42,65 50,88 58,85 65,95 72,95 75,95 80,60 88,58 92,75 100,60" 
                  fill="none" stroke="#81c995" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                {/* Red Line */}
                <polyline points="0,98 18,98 22,90 28,98 35,78 40,72 45,80 50,95 58,70 65,95 72,95 78,65 85,55 90,30 95,65 100,95" 
                  fill="none" stroke="#f28b82" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                {/* Blue Line */}
                <polyline points="0,98 14,98 22,65 28,40 35,80 40,98 48,65 52,98 60,98 65,55 72,98 78,35 85,60 90,90 95,85 100,50" 
                  fill="none" stroke="#8ab4f8" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </div>
        </div>
      )}
      {index === 3 && (
        <div style={{ 
          position: 'absolute', 
          top: '-5%', 
          left: '50%', 
          width: '120%', 
          maxWidth: '1200px', 
          transform: 'translateX(-50%) perspective(1200px) rotateX(15deg) translateZ(-60px)',
          opacity: 0.9, 
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}>
           {/* Floating Histogram */}
           <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '32px', width: '800px', height: '400px' }}>
              {/* Background horizontal lines */}
              <div style={{ position: 'absolute', top: '33%', left: '-10%', right: '-10%', height: '2px', background: 'rgba(255,255,255,0.05)' }}></div>
              <div style={{ position: 'absolute', top: '66%', left: '-10%', right: '-10%', height: '2px', background: 'rgba(255,255,255,0.05)' }}></div>
              <div style={{ position: 'absolute', bottom: '0', left: '-10%', right: '-10%', height: '2px', background: 'rgba(255,255,255,0.1)' }}></div>

              {/* Bars - Progressive scaling */}
              <div style={{ flex: 1, height: '40%', background: 'rgba(255,255,255,0.1)', borderRadius: '12px 12px 0 0', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}></div>
              <div style={{ flex: 1, height: '60%', background: 'rgba(110,86,207,0.4)', borderRadius: '12px 12px 0 0', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}></div>
              <div style={{ flex: 1, height: '55%', background: 'rgba(255,255,255,0.1)', borderRadius: '12px 12px 0 0', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}></div>
              <div style={{ flex: 1, height: '80%', background: 'rgba(110,86,207,0.7)', borderRadius: '12px 12px 0 0', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}></div>
              <div style={{ flex: 1, height: '100%', background: '#6E56CF', borderRadius: '12px 12px 0 0', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}></div>
           </div>
        </div>
      )}
    </div>
  );
};

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
      class="asc-stats"
      ref={wrapRef}
      style={{
        background: '#0F0F14',
        color: '#F8F7FB',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        position: 'relative',
        height: '340vh',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .asc-bg-graphic {
            display: none !important;
          }
        }
      ` }} />
      <div
        class="asc-stats-sticky"
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
          class="asc-stats-wash"
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
          class="asc-stats-stage"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            height: 'clamp(500px, 55vw, 650px)', // Increased height to push content further down
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
                class="asc-stat-card"
                aria-hidden={!on}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end', // Push text content down
                  paddingBottom: 'clamp(20px, 4vw, 40px)', // Add padding at the bottom
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
                <BackgroundGraphic index={i} />

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
                    width: '100%',
                    fontSize: 'clamp(20px, 2.2vw, 32px)',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.15,
                    whiteSpace: 'nowrap', // Forces the title onto a single line
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
                  class="asc-stat-brands"
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
