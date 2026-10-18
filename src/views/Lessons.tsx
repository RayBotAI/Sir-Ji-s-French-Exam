import { useState } from 'react';
import { lessons } from '../data/lessons';
import { useProgress } from '../lib/progress';
import { BackLink, SpeakButton } from '../components/common';

export function Lessons({ id }: { id?: string }) {
  const lesson = lessons.find((l) => l.id === id);
  return lesson ? <LessonDetail key={lesson.id} lessonId={lesson.id} /> : <LessonList />;
}

function LessonList() {
  const { progress } = useProgress();
  return (
    <div className="view">
      <h1 className="page-title">A1 lessons</h1>
      <p className="muted">Short starter lessons. Listen, repeat aloud, then take the mini-quiz.</p>
      <ol className="lesson-list">
        {lessons.map((l, i) => {
          const done = progress.lessonsDone.includes(l.id);
          return (
            <li key={l.id}>
              <a href={`#/learn/${l.id}`} className={`lesson-link ${done ? 'done' : ''}`}>
                <span className="num">{done ? '✓' : i + 1}</span>
                <span>
                  <strong lang="fr">{l.title}</strong>
                  <em>{l.titleEn}</em>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function LessonDetail({ lessonId }: { lessonId: string }) {
  const lesson = lessons.find((l) => l.id === lessonId)!;
  const { progress, update } = useProgress();
  const [answers, setAnswers] = useState<(number | null)[]>(lesson.quiz.map(() => null));
  const done = progress.lessonsDone.includes(lesson.id);
  const correct = answers.filter((a, i) => a === lesson.quiz[i].answer).length;
  const finished = answers.every((a) => a !== null);
  const idx = lessons.indexOf(lesson);
  const next = lessons[idx + 1];

  const complete = () =>
    update((p) => {
      const cards = { ...p.cards };
      // Introduce this lesson's phrases into the flashcard deck.
      lesson.phrases.forEach((_, i) => {
        const cid = `${lesson.id}-${i}`;
        if (!cards[cid]) cards[cid] = { box: 0, due: Date.now(), seen: 0 };
      });
      return { ...p, cards, lessonsDone: p.lessonsDone.includes(lesson.id) ? p.lessonsDone : [...p.lessonsDone, lesson.id] };
    });

  return (
    <div className="view">
      <BackLink to="#/learn" label="All lessons" />
      <span className="eyebrow">Lesson {idx + 1}</span>
      <h1 className="page-title" lang="fr">
        {lesson.title}
      </h1>
      <p className="muted">{lesson.goal}</p>

      <div className="card">
        <div className="row between">
          <h3>Phrases</h3>
          <SpeakButton text={lesson.phrases.map((p) => ({ text: p.fr }))} label="Play all" />
        </div>
        <ul className="phrase-list">
          {lesson.phrases.map((p) => (
            <li key={p.fr}>
              <SpeakButton text={p.fr} small />
              <span>
                <strong lang="fr">{p.fr}</strong>
                <em>{p.en}</em>
              </span>
            </li>
          ))}
        </ul>
        <p className="tip">
          <strong>Tip · </strong>
          {lesson.tip}
        </p>
      </div>

      <div className="card">
        <h3>Mini-quiz</h3>
        {lesson.quiz.map((q, qi) => (
          <div key={q.q} className="quiz-q">
            <p className="question">{q.q}</p>
            <div className="options">
              {q.options.map((o, oi) => {
                const a = answers[qi];
                const cls = a === null ? 'option' : oi === q.answer ? 'option correct' : oi === a ? 'option wrong' : 'option';
                return (
                  <button key={o} type="button" className={cls} disabled={a !== null} onClick={() => setAnswers((s) => s.map((v, j) => (j === qi ? oi : v)))}>
                    {o}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {finished && (
          <div className="quiz-result">
            <p>
              Score: <strong>{correct}/{lesson.quiz.length}</strong>
            </p>
            {done ? (
              <p className="ok">✓ Lesson complete — its phrases are in your flashcards.</p>
            ) : correct >= lesson.quiz.length - 1 ? (
              <button type="button" className="btn primary" onClick={complete}>
                Mark complete & add flashcards
              </button>
            ) : (
              <button type="button" className="btn" onClick={() => setAnswers(lesson.quiz.map(() => null))}>
                Review the phrases and try again
              </button>
            )}
          </div>
        )}
      </div>

      {next && (
        <a className="btn ghost wide" href={`#/learn/${next.id}`}>
          Next lesson: {next.title} →
        </a>
      )}
    </div>
  );
}
