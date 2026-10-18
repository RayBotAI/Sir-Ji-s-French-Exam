import { useRef, useState } from 'react';
import { emptyProgress, normalize, useProgress } from '../lib/progress';
import type { Theme } from '../lib/progress';
import { speak, ttsSupported, useFrenchVoices } from '../lib/speech';

export function Settings() {
  const { progress, update } = useProgress();
  const voices = useFrenchVoices();
  const file = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');
  const set = (patch: Partial<typeof progress.settings>) => update((p) => ({ ...p, settings: { ...p.settings, ...patch } }));

  const exportData = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `frenchpath-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  const importData = async (f: File) => {
    try {
      const data = normalize(JSON.parse(await f.text()));
      update(() => data);
      setMsg('Progress imported.');
    } catch {
      setMsg('That file could not be read as FrenchPath progress.');
    }
  };

  return (
    <div className="view">
      <h1 className="page-title">Settings</h1>

      <div className="card">
        <h3>Appearance</h3>
        <div className="segmented" role="radiogroup" aria-label="Theme">
          {(['system', 'light', 'dark'] as Theme[]).map((t) => (
            <button key={t} type="button" role="radio" aria-checked={progress.settings.theme === t} className={progress.settings.theme === t ? 'on' : ''} onClick={() => set({ theme: t })}>
              {t === 'system' ? 'Auto' : t === 'light' ? 'Light' : 'Dark'}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Voice</h3>
        {!ttsSupported ? (
          <p className="muted">Text-to-speech isn’t available in this browser.</p>
        ) : (
          <>
            <label className="field">
              <span>French voice</span>
              <select value={progress.settings.voiceURI} onChange={(e) => set({ voiceURI: e.target.value })}>
                <option value="">Automatic (prefers fr-CA)</option>
                {voices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Default speed: {progress.settings.rate.toFixed(2)}×</span>
              <input type="range" min={0.6} max={1.1} step={0.05} value={progress.settings.rate} onChange={(e) => set({ rate: +e.target.value })} />
            </label>
            <button type="button" className="btn" onClick={() => speak('Bonjour ! Bienvenue au Canada.', progress.settings)}>
              ▶ Test voice
            </button>
            <p className="muted small">Synthetic speech from your device — not authentic exam audio. On iPhone, extra voices are in Settings → Accessibility → Spoken Content.</p>
          </>
        )}
      </div>

      <div className="card">
        <h3>Your data</h3>
        <p className="muted small">Progress lives only in this browser on this device. Export a backup file to keep it safe or move it.</p>
        <div className="row wrap">
          <button type="button" className="btn primary" onClick={exportData}>
            Export progress
          </button>
          <button type="button" className="btn" onClick={() => file.current?.click()}>
            Import progress
          </button>
          <input ref={file} type="file" accept="application/json,.json" hidden onChange={(e) => e.target.files?.[0] && importData(e.target.files[0])} />
          <button
            type="button"
            className="btn danger"
            onClick={() => {
              if (confirm('Erase all progress on this device? Export first if you want a backup.')) {
                update(() => ({ ...emptyProgress(), settings: progress.settings }));
                setMsg('Progress reset.');
              }
            }}
          >
            Reset
          </button>
        </div>
        {msg && <p className="ok small">{msg}</p>}
      </div>

      <div className="card">
        <h3>Privacy & limits</h3>
        <ul className="small">
          <li>Recordings are kept in page memory only and are never uploaded by this app.</li>
          <li>Live transcripts use your browser’s speech recognition, which may send audio to the browser vendor. Leave it off if you don’t consent.</li>
          <li>Speaking feedback is a self-review rubric, not an official score or pronunciation assessment.</li>
          <li>TEF/TCF mock results are unofficial practice indicators, not official scores or NCLC conversions.</li>
        </ul>
      </div>
    </div>
  );
}
