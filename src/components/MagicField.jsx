import { useEffect, useRef, useState } from 'react';
import './MagicField.css';

export default function MagicField() {
  const [bursts, setBursts] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (event.target.closest('button,a,input,[role="button"]')) return;
      const id = idRef.current++;
      setBursts((current) => [...current.slice(-5), { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => setBursts((current) => current.filter((burst) => burst.id !== id)), 900);
    };
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, []);

  return <div className="magic-field" aria-hidden="true">{bursts.map((burst) => (
    <span key={burst.id} className="magic-burst" style={{ left: burst.x, top: burst.y }}>
      {Array.from({ length: 8 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}
    </span>
  ))}</div>;
}
