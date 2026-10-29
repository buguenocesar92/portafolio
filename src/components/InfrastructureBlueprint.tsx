import { useId, useRef, useState, type KeyboardEvent } from 'react';
import type { BlueprintLayer } from '@/i18n/ui';

interface Props {
  layers: BlueprintLayer[];
  title: string;
  hint: string;
}

const ACCENT = {
  emerald: {
    text: 'text-emerald-term',
    border: 'border-emerald-term/60',
    bg: 'bg-emerald-term/10',
    dot: 'bg-emerald-term',
  },
  amber: {
    text: 'text-amber-forge',
    border: 'border-amber-forge/60',
    bg: 'bg-amber-forge/10',
    dot: 'bg-amber-forge',
  },
} as const;

export default function InfrastructureBlueprint({ layers, title, hint }: Props) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = layers[active]!;
  const a = ACCENT[current.accent];

  function onKeyDown(e: KeyboardEvent, i: number) {
    let next = i;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % layers.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + layers.length) % layers.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = layers.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-surface">
      <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-2 font-mono text-xs text-slate-400">
        <span>
          <span className="text-emerald-term">$</span> {title}
        </span>
        <span className="hidden sm:inline">{hint}</span>
      </div>

      <div className="grid md:grid-cols-[18rem_1fr]">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label={title}
          className="flex gap-2 overflow-x-auto border-b border-slate-800/80 p-3 md:flex-col md:border-r md:border-b-0"
        >
          {layers.map((l, i) => {
            const c = ACCENT[l.accent];
            const selected = i === active;
            return (
              <button
                key={l.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`${uid}-tab-${l.id}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`min-w-44 shrink-0 rounded-lg border px-3 py-2 text-left font-mono text-xs transition-colors focus-visible:ring-2 focus-visible:ring-emerald-term focus-visible:outline-none md:min-w-0 ${
                  selected
                    ? `${c.border} ${c.bg} ${c.text}`
                    : 'border-slate-800/80 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`size-1.5 rounded-full ${selected ? c.dot : 'bg-slate-600'}`} aria-hidden="true" />
                  {l.tag.split(' // ')[0]}
                </span>
                <span className="mt-1 block text-[11px] opacity-80">{l.tag.split(' // ')[1]}</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${current.id}`}
          tabIndex={0}
          className="p-5 focus-visible:outline-none sm:p-6"
        >
          <p className={`font-mono text-xs ${a.text}`}>{current.tag}</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-100">{current.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">{current.summary}</p>

          <ul className="mt-5 space-y-2 font-mono text-xs text-slate-300">
            {current.details.map((d) => (
              <li key={d} className="flex gap-2">
                <span className={a.text} aria-hidden="true">
                  &gt;
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {current.metrics.map((m) => (
              <div key={m.k} className={`rounded-lg border ${a.border} ${a.bg} px-3 py-2`}>
                <dt className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">{m.k}</dt>
                <dd className={`mt-0.5 font-mono text-sm ${a.text}`}>{m.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
