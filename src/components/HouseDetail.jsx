import { useEffect } from 'react';
import './HouseDetail.css';

export default function HouseDetail({ house, onClose, onChoose }) {
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose();
    if (!house) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow; };
  }, [onClose]);

  if (!house) return null;

  return (
    <div className="house-modal" role="dialog" aria-modal="true" aria-labelledby="house-detail-title" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="house-modal-card" style={{ '--modal-accent': house.accent, '--modal-glow': house.glow }}>
        <button className="house-modal-close" type="button" onClick={onClose} aria-label="Close house details">×</button>
        <div className="house-modal-orbit" aria-hidden="true" />
        <img src={house.logo} alt="" className="house-modal-logo" />
        <span className="house-modal-kicker">House dossier</span>
        <h2 id="house-detail-title">{house.name}</h2>
        <p className="house-modal-tagline">{house.tagline}</p>
        <div className="house-modal-grid">
          <div><span>Values</span><strong>{house.values}</strong></div>
          <div><span>Founder</span><strong>{house.founder}</strong></div>
        </div>
        <button className="house-modal-choose" type="button" onClick={() => { onChoose(); onClose(); }}>
          {house.selected ? 'Your house' : `Choose ${house.name}`}
        </button>
      </div>
    </div>
  );
}
