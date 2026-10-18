import { cards, lessons } from '../data/lessons';
import { listening } from '../data/practice';
import { streak, useProgress } from '../lib/progress';

export function Dashboard() {
  const { progress } = useProgress();
  const now = Date.now();
  const due = cards.filter((c) => progress.cards[c.id] && progress.cards[c.id].due <= now).length;
  const learned = Object.values(progress.cards).filter((c) => c.box >= 3).length;
  const lAttempts = Object.values(progress.listening).reduce((a, b) => a + b.attempts, 0);
  const lCorrect = Object.values(progress.listening).reduce((a, b) => a + b.correct, 0);
  const done = progress.lessonsDone.length;
  const nextLesson = lessons.find((l) => !progress.lessonsDone.includes(l.id));
  const nextListening = listening.find((l) => !progress.listening[l.id]);
  const s = streak(progress.activeDays);
  const lastMock = progress.mocks[progress.mocks.length - 1];

  return (
    <div className="view">
      <section className="hero">
        <p className="eyebrow light">Votre coach de français</p>
        <h1>
          Bonjour&nbsp;! <span>Prêt·e pour aujourd’hui&nbsp;?</span>
        </h1>
        <div className="streak">
          <strong>{s}</strong>
          <span>day{s === 1 ? '' : 's'} in a row</span>
        </div>
      </section>

      <section className="stats">
        <div className="stat">
          <strong>
            {done}/{lessons.length}
          </strong>
          <span>lessons</span>
        </div>
        <div className="stat">
          <strong>{learned}</strong>
          <span>phrases learned</span>
        </div>
        <div className="stat">
          <strong>{lAttempts ? Math.round((lCorrect / lAttempts) * 100) + '%' : '—'}</strong>
          <span>listening accuracy</span>
        </div>
        <div className="stat">
          <strong>{progress.speaking.length}</strong>
          <span>speaking sessions</span>
        </div>
      </section>

      <h2 className="section-title">Today’s plan</h2>
      <div className="plan">
        {due > 0 && (
          <a className="plan-item" href="#/cards">
            <span className="plan-icon">⟳</span>
            <span>
              <strong>Review {due} flashcard{due > 1 ? 's' : ''}</strong>
              <em>Spaced repetition keeps words fresh</em>
            </span>
          </a>
        )}
        {nextLesson && (
          <a className="plan-item" href={`#/learn/${nextLesson.id}`}>
            <span className="plan-icon">✎</span>
            <span>
              <strong>Lesson: {nextLesson.title}</strong>
              <em>{nextLesson.titleEn}</em>
            </span>
          </a>
        )}
        <a className="plan-item" href={nextListening ? `#/listen/${nextListening.id}` : '#/listen'}>
          <span className="plan-icon">♪</span>
          <span>
            <strong>Listening: {nextListening?.title ?? 'replay an exercise'}</strong>
            <em>Train your ear with replays and a hidden transcript</em>
          </span>
        </a>
        <a className="plan-item" href="#/speak">
          <span className="plan-icon">◉</span>
          <span>
            <strong>Speak for one minute</strong>
            <em>Timed prompt, optional recording, self-review</em>
          </span>
        </a>
        <a className="plan-item" href="#/exams">
          <span className="plan-icon">✦</span>
          <span>
            <strong>TEF / TCF practice</strong>
            <em>{lastMock ? `Last mock: ${lastMock.score}/${lastMock.total} (${lastMock.exam.toUpperCase()})` : 'Try a short timed mock'}</em>
          </span>
        </a>
      </div>

      <p className="notice">
        Progress is saved only in this browser. Use <a href="#/settings">Settings → Export</a> to back it up or move it to another device.
      </p>
    </div>
  );
}
