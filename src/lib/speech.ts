import { useEffect, useState } from 'react';
import type { Line } from '../data/practice';

export const ttsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

export function useFrenchVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  useEffect(() => {
    if (!ttsSupported) return;
    const load = () => setVoices(speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('fr')));
    load();
    speechSynthesis.addEventListener('voiceschanged', load);
    return () => speechSynthesis.removeEventListener('voiceschanged', load);
  }, []);
  return voices;
}

function pickVoice(voiceURI: string): SpeechSynthesisVoice | undefined {
  const all = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('fr'));
  return (
    all.find((v) => v.voiceURI === voiceURI) ??
    all.find((v) => v.lang.toLowerCase() === 'fr-ca') ??
    all.find((v) => v.lang.toLowerCase() === 'fr-fr') ??
    all[0]
  );
}

export function stopSpeaking() {
  if (ttsSupported) speechSynthesis.cancel();
}

export function speak(lines: Line[] | string, opts: { rate: number; voiceURI: string }): Promise<void> {
  if (!ttsSupported) return Promise.resolve();
  const list: Line[] = typeof lines === 'string' ? [{ text: lines }] : lines;
  speechSynthesis.cancel();
  const voice = pickVoice(opts.voiceURI);
  return new Promise((resolve) => {
    list.forEach((line, i) => {
      const u = new SpeechSynthesisUtterance(line.text);
      u.lang = voice?.lang ?? 'fr-CA';
      if (voice) u.voice = voice;
      u.rate = opts.rate;
      // A light pitch difference helps distinguish two speakers with one voice.
      u.pitch = line.speaker === 'B' ? 1.25 : 0.95;
      if (i === list.length - 1) {
        u.onend = () => resolve();
        u.onerror = () => resolve();
      }
      speechSynthesis.speak(u);
    });
  });
}

// Minimal typing for the Web Speech recognition API (not in TS DOM lib).
interface RecognitionResultEvent {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
}
export interface Recognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: RecognitionResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  start(): void;
  stop(): void;
}

type RecognitionCtor = new () => Recognition;

export function getRecognition(): RecognitionCtor | null {
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}
