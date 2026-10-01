import { useEffect, useState } from 'react';
import { HOUSES } from './houses';

const STORAGE_KEY = 'hp-house';

function readStoredHouse() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value && HOUSES[value] ? value : null;
  } catch {
    return null;
  }
}

function writeStoredHouse(id) {
  try {
    if (id && HOUSES[id]) localStorage.setItem(STORAGE_KEY, id);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage is optional; the in-memory state still works.
  }
}

export function useHouseTheme() {
  const [house, setHouseState] = useState(() => readStoredHouse());

  useEffect(() => {
    document.documentElement.setAttribute('data-house', house ?? 'default');
    return () => document.documentElement.removeAttribute('data-house');
  }, [house]);

  const setHouse = (id) => {
    if (id !== null && !HOUSES[id]) return;
    writeStoredHouse(id);
    setHouseState(id);
  };

  return { house, setHouse };
}
