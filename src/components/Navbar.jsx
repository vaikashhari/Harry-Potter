import { useEffect, useState } from 'react';
import './Navbar.css';

const LINKS = [
  { label: 'Hogwarts', href: '#hero' },
  { label: 'Sorting Hat', href: '#sorting' },
  { label: 'Houses', href: '#houses' },
  { label: 'Great Hall', href: '#finale' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#hero');

  useEffect(() => {
    const sections = LINKS.map((link) => document.querySelector(link.href)).filter(Boolean);
    const onScroll = () => setScrolled(window.scrollY > 40);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive('#' + visible.target.id);
    }, { rootMargin: '-30% 0px -55% 0px', threshold: [0.05, 0.25, 0.5] });
    sections.forEach((section) => observer.observe(section));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <header className={'navbar ' + (scrolled ? 'navbar--scrolled' : '')}>
      <div className="navbar-inner">
        <a className="navbar-brand" href="#hero">
          <svg className="navbar-crest" viewBox="0 0 48 48" aria-hidden="true">
            <path
              d="M24 4 L40 12 V24 C40 34 33 41 24 44 C15 41 8 34 8 24 V12 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M24 12 L24 36 M16 18 L32 30 M32 18 L16 30" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span className="navbar-brand-text">Hogwarts</span>
        </a>

        <nav className="navbar-links" aria-label="Primary navigation">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className={'navbar-link ' + (active === link.href ? 'is-active' : '')}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className={'navbar-toggle ' + (open ? 'is-open' : '')}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav id="mobile-navigation" className={'navbar-mobile ' + (open ? 'is-open' : '')} aria-label="Mobile navigation">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} className={'navbar-link ' + (active === link.href ? 'is-active' : '')} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
