import { useEffect, useState } from 'react';
import { useProgress } from './lib/progress';
import { Dashboard } from './views/Dashboard';
import { Lessons } from './views/Lessons';
import { Flashcards } from './views/Flashcards';
import { Listening } from './views/Listening';
import { Speaking } from './views/Speaking';
import { Exams } from './views/Exams';
import { Settings } from './views/Settings';
import { stopSpeaking } from './lib/speech';

const tabs = [
  { key: '', label: 'Home', icon: '⌂' },
  { key: 'learn', label: 'Learn', icon: '✎' },
  { key: 'cards', label: 'Cards', icon: '⟳' },
  { key: 'listen', label: 'Listen', icon: '♪' },
  { key: 'speak', label: 'Speak', icon: '◉' },
  { key: 'exams', label: 'Exams', icon: '✦' },
];

function useRoute() {
  const parse = () => window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const on = () => {
      stopSpeaking();
      setRoute(parse());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

export function App() {
  const [section = '', a, b] = useRoute();
  const { progress } = useProgress();

  useEffect(() => {
    const root = document.documentElement;
    if (progress.settings.theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', progress.settings.theme);
  }, [progress.settings.theme]);

  let view;
  switch (section) {
    case 'learn':
      view = <Lessons id={a} />;
      break;
    case 'cards':
      view = <Flashcards />;
      break;
    case 'listen':
      view = <Listening id={a} />;
      break;
    case 'speak':
      view = <Speaking id={a} />;
      break;
    case 'exams':
      view = <Exams exam={a} sub={b} />;
      break;
    case 'settings':
      view = <Settings />;
      break;
    default:
      view = <Dashboard />;
  }

  return (
    <div className="app">
      <header className="topbar">
        <a href="#/" className="brand">
          <span className="leaf" aria-hidden>
            ✦
          </span>
          FrenchPath <em>Canada</em>
        </a>
        <a href="#/settings" className={`icon-btn ${section === 'settings' ? 'active' : ''}`} aria-label="Settings">
          ⚙
        </a>
      </header>
      <main key={`${section}/${a ?? ''}/${b ?? ''}`}>{view}</main>
      <nav className="tabbar" aria-label="Main">
        {tabs.map((t) => (
          <a key={t.key} href={`#/${t.key}`} className={section === t.key ? 'active' : ''} aria-current={section === t.key ? 'page' : undefined}>
            <span aria-hidden>{t.icon}</span>
            {t.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
