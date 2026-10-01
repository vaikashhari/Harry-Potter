import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './HouseReveal.css';

export default function HouseReveal({ house, onComplete }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (!house) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' });
      gsap.fromTo(cardRef.current, { autoAlpha: 0, scale: 0.82, y: 24, filter: 'blur(12px)' }, { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.75, delay: 0.12, ease: 'power3.out' });
      gsap.fromTo(logoRef.current, { scale: 0.45, rotation: -18, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.9, delay: 0.3, ease: 'back.out(1.7)' });
      gsap.to(logoRef.current, { scale: 1.06, duration: 1.15, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.1 });
    }, overlayRef);

    const timer = window.setTimeout(onComplete, 2300);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onComplete();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
      ctx.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, [house, onComplete]);

  if (!house) return null;

  return (
    <div
      ref={overlayRef}
      className="house-reveal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="house-reveal-title"
      style={{ '--reveal-accent': house.accent, '--reveal-accent2': house.accent2, '--reveal-glow': house.glow }}
      onClick={onComplete}
    >
      <div className="house-reveal-stars" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, index) => (
          <i key={index} style={{ '--x': `${(index * 47) % 100}%`, '--y': `${(index * 71) % 100}%`, '--d': `${1.5 + (index % 5) * 0.45}s`, '--delay': `${(index % 7) * 0.12}s` }} />
        ))}
      </div>
      <div className="house-reveal-ring house-reveal-ring--one" aria-hidden="true" />
      <div className="house-reveal-ring house-reveal-ring--two" aria-hidden="true" />

      <div ref={cardRef} className="house-reveal-card" onClick={(event) => event.stopPropagation()}>
        <span className="house-reveal-kicker">The Sorting Hat has spoken</span>
        <div className="house-reveal-crest">
          <span className="house-reveal-glow" aria-hidden="true" />
          <img ref={logoRef} src={house.logo} alt="" />
        </div>
        <span className="house-reveal-label">Your house</span>
        <h2 id="house-reveal-title">{house.name}</h2>
        <p>{house.tagline}</p>
        <div className="house-reveal-values">{house.values}</div>
        <button type="button" onClick={onComplete}>Enter the house <span>↗</span></button>
        <small>Press Escape or tap outside to continue</small>
      </div>
    </div>
  );
}
