import { listening } from '../data/practice';
import { useProgress } from '../lib/progress';
import { ListeningExercise } from '../components/ListeningExercise';
import { BackLink } from '../components/common';

export function Listening({ id }: { id?: string }) {
  const { progress } = useProgress();
  const idx = listening.findIndex((l) => l.id === id);

  if (idx >= 0) {
    const next = listening[idx + 1];
    return (
      <div className="view">
        <BackLink to="#/listen" label="All exercises" />
        <ListeningExercise item={listening[idx]} />
        {next && (
          <a className="btn ghost wide" href={`#/listen/${next.id}`}>
            Next: {next.title} →
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="view">
      <h1 className="page-title">Listening</h1>
      <p className="muted">Play the audio, replay as often as you like, then answer. Try before opening the transcript.</p>
      <ul className="lesson-list">
        {listening.map((l) => {
          const s = progress.listening[l.id];
          return (
            <li key={l.id}>
              <a href={`#/listen/${l.id}`} className={`lesson-link ${s?.correct ? 'done' : ''}`}>
                <span className="num level">{l.level}</span>
                <span>
                  <strong lang="fr">{l.title}</strong>
                  <em>{s ? `${s.correct}/${s.attempts} correct` : 'Not tried yet'}</em>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
