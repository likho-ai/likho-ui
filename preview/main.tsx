import './styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Button, Logo, MASCOT_POSES, Mascot, Meter, RECORDING_STATUSES, StatusChip, Tag } from '../src';

function Sheet({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <section
      className={`${theme === 'dark' ? 'dark' : ''} flex flex-col gap-8 p-10 text-ink`}
      style={{ background: 'var(--likho-ground)', backgroundImage: 'var(--likho-ground-image)' }}
    >
      <div className="flex items-center justify-between">
        <Logo size={44} />
        <span className="text-sm text-ink-3">{theme} theme</span>
      </div>

      <h1 className="m-0 text-6xl font-extrabold leading-[1.05] tracking-tight">
        <span className="block bg-clip-text text-transparent" style={{ backgroundImage: 'var(--likho-headline-1)' }}>
          Every call.
        </span>
        <span className="block bg-clip-text text-transparent" style={{ backgroundImage: 'var(--likho-headline-2)' }}>
          Every word.
        </span>
        <span className="block">Written in Hinglish.</span>
      </h1>

      <div className="flex flex-wrap items-end gap-8">
        {MASCOT_POSES.map((pose) => (
          <div key={pose} className="flex flex-col items-center gap-2">
            <Mascot pose={pose} size={120} />
            <span className="text-sm font-semibold text-ink-2">{pose}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="primary">Upload call</Button>
        <Button>Transcribe again</Button>
        <Button variant="ghost">Cancel</Button>
        <Button disabled>Disabled</Button>
        <Button asChild variant="primary" size="sm">
          <a href="#recordings">A link as a button</a>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {RECORDING_STATUSES.map((status) => (
          <StatusChip key={status} status={status} />
        ))}
        <Tag>Hindi · 0.91</Tag>
        <Tag>3:11</Tag>
        <Tag>turbo</Tag>
      </div>

      <div className="flex max-w-md flex-col gap-4 rounded-card border border-line bg-surface p-6 shadow-card">
        <span className="text-lg font-bold">Language</span>
        <Meter label="Hindi" value={0.91} />
        <Meter label="Urdu" value={0.07} />
        <Meter label="English" value={0.02} />
        <p className="m-0 text-sm text-ink-2">Decoded as Hindi and written in Devanagari, then in Hinglish.</p>
        <p lang="hi" className="m-0 font-deva text-ink">
          यह एक नमूना पंक्ति है
        </p>
        <p className="m-0 font-mono text-sm text-link">00:48 → 00:58</p>
      </div>
    </section>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="grid grid-cols-2">
      <Sheet theme="light" />
      <Sheet theme="dark" />
    </div>
  </StrictMode>,
);
