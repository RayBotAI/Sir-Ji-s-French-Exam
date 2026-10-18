import { useEffect, useState } from 'react';
import type { ListeningItem } from '../data/practice';
import { useProgress } from '../lib/progress';
import { speak, stopSpeaking, ttsSupported } from '../lib/speech';

/**
 * Audio is synthesised by the browser. In exam mode the audio plays once and
 * feedback is withheld until the end of the mock.
 */
export function ListeningExercise({
  item,
  examMode = false,
  onAnswer,
}: {
  item: ListeningItem;
  examMode?: boolean;
  onAnswer?: (correct: boolean) => void;
}) {
  const { progress, update } = useProgress();
  const [plays, setPlays] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [choice, setChoice] = useState<number | null>(null);
  const [showText, setShowText] = useState(false);
  const [rate, setRate] = useState(progress.settings.rate);

  useEffect(() => {
    setPlays(0);
    setChoice(null);
    setShowText(false);
    return () => stopSpeaking();
  }, [item.id]);

  const play = async () => {
    setPlaying(true);
    setPlays((n) => n + 1);
    await speak(item.lines, { rate, voiceURI: progress.settings.voiceURI });
    setPlaying(false);
  };

  const answer = (i: number) => {
    if (choice !== null) return;
    setChoice(i);
    const correct = i === item.answer;
    update((p) => {
      const prev = p.listening[item.id] ?? { attempts: 0, correct: 0 };
      return { ...p, listening: { ...p.listening, [item.id]: { attempts: prev.attempts + 1, correct: prev.correct + (correct ? 1 : 0) } } };
    });
    onAnswer?.(correct);
  };

  const canPlay = !playing && (!examMode || plays === 0);
  const revealed = choice !== null && !examMode;

  return (
    <div className="card listening">
      <div className="row between">
        <span className="eyebrow">
          {item.level} · {item.title}
        </span>
        {!examMode && <span className="muted small">Played {plays}×</span>}
      </div>

      {!ttsSupported && <p className="error small">Your browser has no text-to-speech. Open the transcript to read instead.</p>}

      <button type="button" className={`play-big ${playing ? 'playing' : ''}`} disabled={!canPlay} onClick={play} aria-label={plays ? 'Replay audio' : 'Play audio'}>
        <span aria-hidden>{playing ? '♪' : plays && !examMode ? '↻' : '▶'}</span>
        <span>{playing ? 'Playing…' : examMode && plays ? 'Played once' : plays ? 'Replay' : 'Play audio'}</span>
      </button>

      {!examMode && (
        <label className="rate">
          <span className="small muted">Speed</span>
          <input type="range" min={0.6} max={1.1} step={0.05} value={rate} onChange={(e) => setRate(+e.target.value)} />
          <span className="small">{rate.toFixed(2)}×</span>
        </label>
      )}

      <p className="question">{item.question}</p>
      <div className="options">
        {item.options.map((o, i) => {
          let cls = 'option';
          if (choice !== null) {
            if (examMode) cls += i === choice ? ' picked' : '';
            else if (i === item.answer) cls += ' correct';
            else if (i === choice) cls += ' wrong';
          }
          return (
            <button key={o} type="button" className={cls} disabled={choice !== null || (examMode && plays === 0)} onClick={() => answer(i)}>
              {o}
            </button>
          );
        })}
      </div>

      {revealed && (
        <p className={choice === item.answer ? 'feedback ok' : 'feedback bad'}>
          {choice === item.answer ? 'Correct! ' : 'Not quite. '}
          {item.explanation}
        </p>
      )}

      {!examMode && (
        <>
          <button type="button" className="btn ghost small" onClick={() => setShowText((s) => !s)}>
            {showText ? 'Hide transcript' : 'Show transcript'}
          </button>
          {showText && (
            <div className="transcript" lang="fr">
              {item.lines.map((l, i) => (
                <p key={i}>
                  {l.speaker && <strong>{l.speaker}: </strong>}
                  {l.text}
                </p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
