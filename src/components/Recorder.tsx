import { useEffect, useRef, useState } from 'react';
import { getRecognition } from '../lib/speech';
import type { Recognition } from '../lib/speech';

const canRecord = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined';

/** Optional microphone recording (kept in page memory) and browser speech recognition. */
export function Recorder({
  active,
  onAudio,
  onTranscript,
}: {
  active: boolean;
  onAudio: (url: string | null) => void;
  onTranscript: (t: string) => void;
}) {
  const [recording, setRecording] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState('');
  const [useRecognition, setUseRecognition] = useState(false);
  const rec = useRef<MediaRecorder | null>(null);
  const recog = useRef<Recognition | null>(null);
  const finalText = useRef('');
  const RecognitionCtor = getRecognition();

  const stopAll = () => {
    if (rec.current && rec.current.state !== 'inactive') rec.current.stop();
    recog.current?.stop();
  };

  useEffect(() => {
    if (!active) stopAll();
  }, [active]);
  useEffect(() => () => stopAll(), []);

  const start = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks: Blob[] = [];
      const mr = new MediaRecorder(stream);
      mr.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        onAudio(URL.createObjectURL(new Blob(chunks, { type: mr.mimeType })));
        setRecording(false);
      };
      mr.start();
      rec.current = mr;
      setRecording(true);
      onAudio(null);
    } catch {
      setError('Microphone unavailable or permission denied. You can still practise aloud and self-review.');
    }
    if (useRecognition && RecognitionCtor) {
      const r = new RecognitionCtor();
      r.lang = 'fr-CA';
      r.continuous = true;
      r.interimResults = true;
      finalText.current = '';
      r.onresult = (e) => {
        let interim = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const res = e.results[i];
          if (res.isFinal) finalText.current += res[0].transcript + ' ';
          else interim += res[0].transcript;
        }
        onTranscript((finalText.current + interim).trim());
      };
      r.onerror = (e) => e.error !== 'aborted' && setError(`Speech recognition: ${e.error}`);
      r.onend = () => setListening(false);
      r.start();
      recog.current = r;
      setListening(true);
    }
  };

  if (!canRecord && !RecognitionCtor) {
    return <p className="muted small">Recording is not supported in this browser. Speak aloud and use the self-review below.</p>;
  }

  return (
    <div className="recorder">
      {RecognitionCtor && (
        <label className="check">
          <input type="checkbox" checked={useRecognition} disabled={recording} onChange={(e) => setUseRecognition(e.target.checked)} />
          <span>
            Show live transcript <em>(browser speech recognition — may send audio to your browser vendor’s service)</em>
          </span>
        </label>
      )}
      {!recording ? (
        <button type="button" className="btn record" disabled={!active} onClick={start}>
          <span className="dot" aria-hidden /> Record my answer
        </button>
      ) : (
        <button type="button" className="btn record on" onClick={stopAll}>
          <span className="dot" aria-hidden /> Stop recording
        </button>
      )}
      {listening && <span className="muted small">Listening…</span>}
      {error && <p className="error small">{error}</p>}
    </div>
  );
}
