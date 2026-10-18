import { useState } from 'react';
import { examInfo, listening, speaking } from '../data/practice';
import { today, useProgress } from '../lib/progress';
import { ListeningExercise } from '../components/ListeningExercise';
import { SpeakingSession } from '../components/SpeakingSession';
import { BackLink, Notice, TimerRing, fmt, useCountdown } from '../components/common';

type ExamKey = 'tef' | 'tcf';
const MOCK_SIZE = 10;

export function Exams({ exam, sub }: { exam?: string; sub?: string }) {
  if (exam !== 'tef' && exam !== 'tcf') return <ExamPicker />;
  if (sub === 'mock') return <MockTest exam={exam} />;
  const prompt = speaking.find((s) => s.id === sub && s.exam === exam);
  if (prompt)
    return (
      <div className="view">
        <BackLink to={`#/exams/${exam}`} label={examInfo[exam].name} />
        <SpeakingSession key={prompt.id} prompt={prompt} />
      </div>
    );
  return <ExamHome exam={exam} />;
}

function ExamPicker() {
  return (
    <div className="view">
      <h1 className="page-title">Exam practice</h1>
      <p className="muted">Separate practice areas for each test. Both focus here on the oral modules: listening and speaking.</p>
      <div className="exam-pick">
        {(['tef', 'tcf'] as const).map((k) => (
          <a key={k} href={`#/exams/${k}`} className={`exam-tile ${k}`}>
            <strong>{examInfo[k].name}</strong>
            <span>{examInfo[k].org}</span>
            <em>
              Listening: {examInfo[k].listening.questions} questions / {examInfo[k].listening.minutes} min
            </em>
          </a>
        ))}
      </div>
      <Notice>
        Mock scores in this app are unofficial practice indicators — not official exam scores or NCLC conversions. Always confirm current requirements with IRCC
        before registering.
      </Notice>
    </div>
  );
}

function ExamHome({ exam }: { exam: ExamKey }) {
  const { progress } = useProgress();
  const info = examInfo[exam];
  const mocks = progress.mocks.filter((m) => m.exam === exam);
  const mins = Math.round((MOCK_SIZE * info.listening.minutes) / info.listening.questions);
  return (
    <div className="view">
      <BackLink to="#/exams" label="Exams" />
      <h1 className="page-title">{info.name}</h1>
      <div className="card">
        <h3>Official format</h3>
        <p>
          <strong>Compréhension orale:</strong> {info.listening.questions} questions / {info.listening.minutes} minutes.
        </p>
        <p>{info.oral}</p>
        <a className="small" href={info.url} target="_blank" rel="noreferrer">
          Official information ({info.org}) ↗
        </a>
      </div>

      <h2 className="section-title">Listening mini-mock</h2>
      <a className="plan-item" href={`#/exams/${exam}/mock`}>
        <span className="plan-icon">⏱</span>
        <span>
          <strong>
            {MOCK_SIZE} questions · {mins} minutes
          </strong>
          <em>Each audio plays once, like the real test. Results at the end.</em>
        </span>
      </a>
      {mocks.length > 0 && (
        <p className="muted small">
          Recent: {mocks.slice(-5).map((m) => `${m.score}/${m.total}`).join(' · ')}
        </p>
      )}

      <h2 className="section-title">Oral expression tasks</h2>
      <ul className="lesson-list">
        {speaking
          .filter((s) => s.exam === exam)
          .map((s) => (
            <li key={s.id}>
              <a href={`#/exams/${exam}/${s.id}`} className="lesson-link">
                <span className="num">◉</span>
                <span>
                  <strong>{s.task}</strong>
                  <em lang="fr">{s.prompt}</em>
                </span>
              </a>
            </li>
          ))}
      </ul>
      <Notice>
        Unofficial practice. In the real {info.name} oral test you speak with a live examiner; here you practise alone against the timer and review yourself.
      </Notice>
    </div>
  );
}

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

function MockTest({ exam }: { exam: ExamKey }) {
  const { update } = useProgress();
  const info = examInfo[exam];
  const seconds = Math.round(((MOCK_SIZE * info.listening.minutes) / info.listening.questions) * 60);
  const [items] = useState(() => shuffle(listening).slice(0, MOCK_SIZE));
  const [state, setState] = useState<'intro' | 'running' | 'done'>('intro');
  const [i, setI] = useState(0);
  const [results, setResults] = useState<(boolean | null)[]>(() => items.map(() => null));

  const finish = (r = results) => {
    setState('done');
    update((p) => ({ ...p, mocks: [...p.mocks, { exam, date: today(), score: r.filter(Boolean).length, total: items.length }] }));
  };
  const [left] = useCountdown(seconds, state === 'running', () => finish());

  if (state === 'intro') {
    return (
      <div className="view">
        <BackLink to={`#/exams/${exam}`} label={info.name} />
        <h1 className="page-title">Listening mini-mock</h1>
        <div className="card">
          <p>
            {items.length} questions in {fmt(seconds)} — the same pace as the official {info.name} listening test ({info.listening.questions} questions /{' '}
            {info.listening.minutes} min).
          </p>
          <ul>
            <li>Each recording plays only once.</li>
            <li>Answers can’t be changed. Feedback appears at the end.</li>
            <li>When the timer ends, unanswered questions count as wrong.</li>
          </ul>
          <button type="button" className="btn primary" onClick={() => setState('running')}>
            Start the mock
          </button>
        </div>
      </div>
    );
  }

  if (state === 'done') {
    const score = results.filter(Boolean).length;
    return (
      <div className="view">
        <BackLink to={`#/exams/${exam}`} label={info.name} />
        <h1 className="page-title">Results</h1>
        <div className="card center">
          <p className="score">
            {score}
            <span>/{items.length}</span>
          </p>
          <p className="muted">Unofficial practice indicator only.</p>
        </div>
        <ul className="lesson-list">
          {items.map((it, k) => (
            <li key={it.id}>
              <a href={`#/listen/${it.id}`} className={`lesson-link ${results[k] ? 'done' : 'missed'}`}>
                <span className="num">{results[k] ? '✓' : '✗'}</span>
                <span>
                  <strong>{it.title}</strong>
                  <em>{results[k] ? 'Correct' : results[k] === null ? 'Not answered — practise it' : 'Missed — practise with replays'}</em>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const answered = results[i] !== null;
  return (
    <div className="view">
      <div className="mock-head">
        <span>
          Question {i + 1}/{items.length}
        </span>
        <TimerRing left={left} total={seconds} label="left" />
      </div>
      <ListeningExercise
        key={items[i].id}
        item={items[i]}
        examMode
        onAnswer={(c) => setResults((r) => r.map((v, k) => (k === i ? c : v)))}
      />
      <button
        type="button"
        className="btn primary wide"
        disabled={!answered}
        onClick={() => (i + 1 < items.length ? setI(i + 1) : finish())}
      >
        {i + 1 < items.length ? 'Next question →' : 'Finish'}
      </button>
    </div>
  );
}
