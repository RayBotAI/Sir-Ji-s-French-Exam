import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type Theme = 'system' | 'light' | 'dark';

export interface CardState {
  box: number;
  due: number;
  seen: number;
}

export interface SpeakingLog {
  id: string;
  date: string;
  scores: number[];
  note: string;
  transcript?: string;
}

export interface MockLog {
  exam: 'tef' | 'tcf';
  date: string;
  score: number;
  total: number;
}

export interface Progress {
  version: 1;
  lessonsDone: string[];
  cards: Record<string, CardState>;
  listening: Record<string, { attempts: number; correct: number }>;
  speaking: SpeakingLog[];
  mocks: MockLog[];
  activeDays: string[];
  settings: { theme: Theme; rate: number; voiceURI: string };
}

const KEY = 'frenchpath-progress-v1';

export const emptyProgress = (): Progress => ({
  version: 1,
  lessonsDone: [],
  cards: {},
  listening: {},
  speaking: [],
  mocks: [],
  activeDays: [],
  settings: { theme: 'system', rate: 0.85, voiceURI: '' },
});

export function normalize(raw: unknown): Progress {
  const base = emptyProgress();
  if (!raw || typeof raw !== 'object') return base;
  const r = raw as Partial<Progress>;
  return {
    ...base,
    ...r,
    version: 1,
    settings: { ...base.settings, ...(r.settings ?? {}) },
  };
}

function load(): Progress {
  try {
    const s = localStorage.getItem(KEY);
    return s ? normalize(JSON.parse(s)) : emptyProgress();
  } catch {
    return emptyProgress();
  }
}

export const today = () => new Date().toISOString().slice(0, 10);

type Updater = (p: Progress) => Progress;

const Ctx = createContext<{ progress: Progress; update: (fn: Updater) => void } | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(progress));
  }, [progress]);

  const update = (fn: Updater) =>
    setProgress((p) => {
      const next = fn(p);
      const d = today();
      return next.activeDays.includes(d) ? next : { ...next, activeDays: [...next.activeDays, d] };
    });

  return <Ctx.Provider value={{ progress, update }}>{children}</Ctx.Provider>;
}

export function useProgress() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useProgress outside provider');
  return c;
}

export function streak(days: string[]): number {
  const set = new Set(days);
  let n = 0;
  const d = new Date();
  if (!set.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
  while (set.has(d.toISOString().slice(0, 10))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

// Leitner intervals in days for boxes 0..5
const INTERVALS = [0, 1, 2, 4, 8, 16];

export function review(state: CardState | undefined, knew: boolean): CardState {
  const box = knew ? Math.min((state?.box ?? 0) + 1, INTERVALS.length - 1) : 0;
  const due = Date.now() + INTERVALS[box] * 86400000 - (box === 0 ? 0 : 3600000);
  return { box, due, seen: (state?.seen ?? 0) + 1 };
}
