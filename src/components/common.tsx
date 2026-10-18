import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Line } from '../data/practice';
import { useProgress } from '../lib/progress';
import { speak, stopSpeaking, ttsSupported } from '../lib/speech';

export function useCountdown(seconds: number, running: boolean, onDone?: () => void) {
  const [left, setLeft] = useState(seconds);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    if (!running) return;
    setLeft(seconds);
    const end = Date.now() + seconds * 1000;
    const t = setInterval(() => {
      const l = Math.max(0, Math.round((end - Date.now()) / 1000));
      setLeft(l);
      if (l === 0) {
        clearInterval(t);
        done.current?.();
      }
    }, 250);
    return () => clearInterval(t);
  }, [running, seconds]);

  return [left, setLeft] as const;
}

export const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export function TimerRing({ left, total, label }: { left: number; total: number; label: string }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  const pct = total ? left / total : 0;
  return (
    <div className={`timer ${left <= 10 && left > 0 ? 'urgent' : ''}`} role="timer" aria-label={`${label}: ${fmt(left)}`}>
      <svg viewBox="0 0 100 100" aria-hidden>
        <circle cx="50" cy="50" r={r} className="track" />
        <circle cx="50" cy="50" r={r} className="fill" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} />
      </svg>
      <div className="timer-text">
        <strong>{fmt(left)}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

export function SpeakButton({ text, label = 'Listen', small }: { text: string | Line[]; label?: string; small?: boolean }) {
  const { progress } = useProgress();
  const [playing, setPlaying] = useState(false);
  useEffect(() => () => stopSpeaking(), []);
  if (!ttsSupported) return null;
  return (
    <button
      type="button"
      className={`btn-audio ${small ? 'small' : ''} ${playing ? 'playing' : ''}`}
      aria-label={playing ? 'Stop audio' : label}
      onClick={async () => {
        if (playing) {
          stopSpeaking();
          setPlaying(false);
          return;
        }
        setPlaying(true);
        await speak(text, progress.settings);
        setPlaying(false);
      }}
    >
      <span aria-hidden>{playing ? '■' : '▶'}</span>
      {!small && <span>{playing ? 'Stop' : label}</span>}
    </button>
  );
}

export function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <a className="back" href={to}>
      ← {label}
    </a>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return <p className="notice">{children}</p>;
}
