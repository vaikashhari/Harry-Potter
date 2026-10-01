import { useEffect, useState } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    const started = performance.now();
    const tick = (now) => {
      const elapsed = now - started;
      const next = Math.min(100, Math.round((elapsed / 1450) * 100));
      setProgress(next);
      if (next < 100) frame = requestAnimationFrame(tick);
      else setTimeout(onComplete, 180);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <div className="loading-screen" role="status" aria-label="Entering Hogwarts">
      <div className="loading-stars" aria-hidden="true" />
      <div className="loading-crest" aria-hidden="true">
        <span>✦</span>
      </div>
      <p className="loading-kicker">The castle is waking</p>
      <h1>Hogwarts</h1>
      <div className="loading-rule"><span style={{ width: `${progress}%` }} /></div>
      <p className="loading-progress">{progress}%</p>
    </div>
  );
}
