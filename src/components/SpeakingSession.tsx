import { useEffect, useState } from 'react';
import { rubric } from '../data/practice';
import type { SpeakingPrompt } from '../data/practice';
import { today, useProgress } from '../lib/progress';
import { Recorder } from './Recorder';
import { SpeakButton, TimerRing, useCountdown } from './common';

const dur = (s: number) => (s >= 60 ? `${+(s / 60).toFixed(1)} min` : `${s} s`);

type Phase = 'ready' | 'prep' | 'speak' | 'review' | 'saved';

export function SpeakingSession({ prompt, onDone }: { prompt: SpeakingPrompt; onDone?: () => void }) {
  const { update } = useProgress();
  const [phase, setPhase] = useState<Phase>('ready');
  const [audio, setAudio] = useState<string | null>(null);
  const [transcript, setTranscript] = useState('');
  const [scores, setScores] = useState<number[]>(rubric.map(() => 0));
  const [note, setNote] = useState('');
  const [showEn, setShowEn] = useState(false);

  const [prepLeft] = useCountdown(prompt.prepSec, phase === 'prep', () => setPhase('speak'));
  const [speakLeft] = useCountdown(prompt.speakSec, phase === 'speak', () => setPhase('review'));

  useEffect(() => () => void (audio && URL.revokeObjectURL(audio)), [audio]);

  const save = () => {
    update((p) => ({
      ...p,
      speaking: [...p.speaking, { id: prompt.id, date: today(), scores, note, transcript: transcript || undefined }],
    }));
    setPhase('saved');
  };

  const total = scores.reduce((a, b) => a + b, 0);

  return (
    <div className="session">
      <div className="card prompt-card">
        <span className="eyebrow">{prompt.task}</span>
        <p className="prompt-fr" lang="fr">
          {prompt.prompt}
        </p>
        <div className="row">
          <SpeakButton text={prompt.prompt} label="Hear the prompt" />
          <button type="button" className="btn ghost" onClick={() => setShowEn((s) => !s)}>
            {showEn ? 'Hide English' : 'Show English'}
          </button>
        </div>
        {showEn && <p className="muted">{prompt.promptEn}</p>}
        <details className="phrases">
          <summary>Useful phrases</summary>
          <ul lang="fr">
            {prompt.phrases.map((ph) => (
              <li key={ph}>{ph}</li>
            ))}
          </ul>
        </details>
      </div>

      {phase === 'ready' && (
        <div className="card center">
          <p>
            {prompt.prepSec > 0 && <>Preparation: {dur(prompt.prepSec)} · </>}
            Speaking: {dur(prompt.speakSec)}
          </p>
          <button type="button" className="btn primary" onClick={() => setPhase(prompt.prepSec > 0 ? 'prep' : 'speak')}>
            Start timed practice
          </button>
        </div>
      )}

      {phase === 'prep' && (
        <div className="card center">
          <TimerRing left={prepLeft} total={prompt.prepSec} label="Prepare" />
          <p className="muted">Plan your ideas. Note 3–4 key words.</p>
          <button type="button" className="btn" onClick={() => setPhase('speak')}>
            Start speaking now
          </button>
        </div>
      )}

      {phase === 'speak' && (
        <div className="card center">
          <TimerRing left={speakLeft} total={prompt.speakSec} label="Speak" />
          <Recorder active onAudio={setAudio} onTranscript={setTranscript} />
          {transcript && (
            <p className="transcript" lang="fr">
              {transcript}
            </p>
          )}
          <button type="button" className="btn primary" onClick={() => setPhase('review')}>
            I’m finished
          </button>
        </div>
      )}

      {(phase === 'review' || phase === 'saved') && (
        <div className="card">
          <h3>Self-review</h3>
          {audio ? (
            <audio controls src={audio} className="playback" />
          ) : (
            <p className="muted small">No recording this time — rate how it felt.</p>
          )}
          {transcript && (
            <>
              <p className="small muted">What the browser heard (may be imperfect):</p>
              <p className="transcript" lang="fr">
                {transcript}
              </p>
            </>
          )}
          <div className="rubric">
            {rubric.map((r, i) => (
              <div key={r.key} className="rubric-row">
                <div>
                  <strong>{r.label}</strong>
                  <span className="muted small">{r.hint}</span>
                </div>
                <div className="pips" role="radiogroup" aria-label={r.label}>
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      role="radio"
                      aria-checked={scores[i] === n}
                      className={scores[i] >= n ? 'on' : ''}
                      disabled={phase === 'saved'}
                      onClick={() => setScores((s) => s.map((v, j) => (j === i ? n : v)))}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <textarea
            placeholder="Notes: words I was missing, what to improve next time…"
            value={note}
            disabled={phase === 'saved'}
            onChange={(e) => setNote(e.target.value)}
          />
          <p className="small muted">
            Self-rating: {total}/{rubric.length * 4}. This is a personal reflection, not an official score.
          </p>
          {phase === 'review' ? (
            <button type="button" className="btn primary" disabled={scores.some((s) => !s)} onClick={save}>
              Save review
            </button>
          ) : (
            <div className="row">
              <span className="ok">✓ Saved</span>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setPhase('ready');
                  setAudio(null);
                  setTranscript('');
                  setScores(rubric.map(() => 0));
                  setNote('');
                }}
              >
                Try again
              </button>
              {onDone && (
                <button type="button" className="btn primary" onClick={onDone}>
                  Continue
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
