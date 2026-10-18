import { useMemo, useState } from 'react';
import { cards } from '../data/lessons';
import { review, useProgress } from '../lib/progress';
import { SpeakButton } from '../components/common';

export function Flashcards() {
  const { progress, update } = useProgress();
  const [reverse, setReverse] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  // Build the session queue once; cards answered "again" go to the back.
  const [queue, setQueue] = useState<string[]>(() =>
    cards.filter((c) => progress.cards[c.id] && progress.cards[c.id].due <= Date.now()).map((c) => c.id).slice(0, 20),
  );

  const boxes = useMemo(() => {
    const b = [0, 0, 0, 0, 0, 0];
    Object.values(progress.cards).forEach((c) => b[c.box]++);
    return b;
  }, [progress.cards]);

  const inDeck = Object.keys(progress.cards).length;
  const card = cards.find((c) => c.id === queue[0]);

  const grade = (knew: boolean) => {
    if (!card) return;
    update((p) => ({ ...p, cards: { ...p.cards, [card.id]: review(p.cards[card.id], knew) } }));
    setReviewed((n) => n + 1);
    setFlipped(false);
    setQueue((q) => (knew ? q.slice(1) : [...q.slice(1), q[0]]));
  };

  return (
    <div className="view">
      <h1 className="page-title">Flashcards</h1>
      <div className="row between">
        <p className="muted small">
          {inDeck} phrases in your deck · {queue.length} left this session
        </p>
        <label className="check small">
          <input type="checkbox" checked={reverse} onChange={(e) => setReverse(e.target.checked)} />
          <span>English first</span>
        </label>
      </div>

      {inDeck === 0 ? (
        <div className="card center">
          <p>Your deck is empty. Complete a lesson to add its phrases here.</p>
          <a className="btn primary" href="#/learn">
            Go to lessons
          </a>
        </div>
      ) : !card ? (
        <div className="card center">
          <p className="big">🎉</p>
          <p>{reviewed ? `Nice! You reviewed ${reviewed} cards.` : 'Nothing due right now.'} Come back later for more reviews.</p>
          <a className="btn" href="#/learn">
            Learn new phrases
          </a>
        </div>
      ) : (
        <>
          <button type="button" className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((f) => !f)} aria-label="Flip card">
            <span className="face">
              <span className="eyebrow">{reverse ? 'English' : 'Français'}</span>
              <strong lang={reverse ? 'en' : 'fr'}>{reverse ? card.en : card.fr}</strong>
              {!flipped && <span className="muted small">Tap to reveal</span>}
              {flipped && (
                <>
                  <span className="divider" />
                  <strong className="answer" lang={reverse ? 'fr' : 'en'}>
                    {reverse ? card.fr : card.en}
                  </strong>
                </>
              )}
            </span>
          </button>
          <div className="row center">
            {(!reverse || flipped) && <SpeakButton text={card.fr} label="Hear it" />}
          </div>
          {flipped && (
            <div className="grade">
              <button type="button" className="btn again" onClick={() => grade(false)}>
                Again
              </button>
              <button type="button" className="btn primary" onClick={() => grade(true)}>
                Got it
              </button>
            </div>
          )}
        </>
      )}

      {inDeck > 0 && (
        <div className="card">
          <h3>Review boxes</h3>
          <p className="muted small">Cards move up a box each time you know them (1, 2, 4, 8, 16 days). Box 3+ counts as learned.</p>
          <div className="boxes">
            {boxes.map((n, i) => (
              <div key={i} className="box">
                <div className="bar" style={{ height: `${inDeck ? Math.max(4, (n / inDeck) * 100) : 4}%` }} />
                <strong>{n}</strong>
                <span>{i === 0 ? 'new' : `box ${i}`}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
