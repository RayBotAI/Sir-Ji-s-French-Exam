import { speaking } from '../data/practice';
import { useProgress } from '../lib/progress';
import { SpeakingSession } from '../components/SpeakingSession';
import { BackLink } from '../components/common';

const groups = [
  { exam: 'general', title: 'Everyday warm-ups' },
  { exam: 'tef', title: 'TEF Canada style' },
  { exam: 'tcf', title: 'TCF Canada style' },
] as const;

export function Speaking({ id }: { id?: string }) {
  const { progress } = useProgress();
  const prompt = speaking.find((s) => s.id === id);

  if (prompt) {
    return (
      <div className="view">
        <BackLink to="#/speak" label="All prompts" />
        <SpeakingSession key={prompt.id} prompt={prompt} />
      </div>
    );
  }

  return (
    <div className="view">
      <h1 className="page-title">Speaking</h1>
      <p className="muted">Pick a prompt, prepare, then speak against the clock. Recording is optional and stays on this device.</p>
      {groups.map((g) => (
        <section key={g.exam}>
          <h2 className="section-title">{g.title}</h2>
          <ul className="lesson-list">
            {speaking
              .filter((s) => s.exam === g.exam)
              .map((s) => {
                const n = progress.speaking.filter((l) => l.id === s.id).length;
                return (
                  <li key={s.id}>
                    <a href={`#/speak/${s.id}`} className={`lesson-link ${n ? 'done' : ''}`}>
                      <span className="num">◉</span>
                      <span>
                        <strong>{s.task}</strong>
                        <em lang="fr">{s.prompt}</em>
                        {n > 0 && <em>Practised {n}×</em>}
                      </span>
                    </a>
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
}
