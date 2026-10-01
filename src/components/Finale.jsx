import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HOUSES } from '../theme/houses';
import './Finale.css';

export default function Finale({ house }) {
  const sectionRef = useRef(null);
  const starsRef = useRef(null);
  const selected = house ? HOUSES[house] : null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const stars = starsRef.current?.querySelectorAll('.finale-star') || [];
    const tween = gsap.to(stars, {
      y: -18,
      x: 'random(-8, 8)',
      opacity: 'random(.35, 1)',
      duration: 'random(2.5, 5)',
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.08, from: 'random' },
      ease: 'sine.inOut',
    });

    const onPointerMove = (event) => {
      const rect = section.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(section, { '--mx': `${x * 35}px`, '--my': `${y * 25}px`, duration: 0.7, overwrite: true });
    };

    section.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      tween.kill();
      section.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <section
      className={`finale ${selected ? 'finale--house' : ''}`}
      id="finale"
      ref={sectionRef}
      style={selected ? { '--finale-accent': selected.accent, '--finale-glow': selected.glow } : undefined}
    >
      <div className="finale-stars" ref={starsRef} aria-hidden="true">
        {Array.from({ length: 42 }).map((_, index) => (
          <i key={index} className="finale-star" style={{ '--x': `${(index * 37) % 100}%`, '--y': `${(index * 61) % 100}%`, '--s': `${1 + (index % 3) * 0.65}px` }} />
        ))}
      </div>
      <div className="finale-orbit finale-orbit--one" aria-hidden="true" />
      <div className="finale-orbit finale-orbit--two" aria-hidden="true" />

      <div className="finale-content">
        <span className="finale-kicker">The Great Hall</span>
        <div className="finale-seal" aria-hidden="true">✦</div>
        <h2>Make the magic<br /><em>yours.</em></h2>
        <p>
          {selected
            ? `${selected.name} awaits. Your story has a house, a place, and a beginning.`
            : 'Four houses. A thousand stories. One place where yours can begin.'}
        </p>
        <a className="finale-cta" href="#hero">Return to the castle <span>↗</span></a>
      </div>

      <div className="finale-footer">
        <span>Hogwarts • School of Witchcraft and Wizardry</span>
        <span>✦</span>
        <span>Created by Creatary Labs</span>
      </div>
    </section>
  );
}
