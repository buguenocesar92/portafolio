import { useEffect, useRef, useState } from 'react';
import type { BlueprintLayer } from '@/i18n/ui';
import { createInfrastructureScene, type NodeId } from './scene';

interface Props {
  layers: BlueprintLayer[];
  title: string;
  hint: string;
  onFailure: () => void;
}

export default function InfrastructureBlueprint3D({ layers, title, hint, onFailure }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selected, setSelected] = useState<NodeId>('isolation');
  const current = layers.find((layer) => layer.id === selected) ?? layers[0];

  useEffect(() => {
    if (!canvasRef.current) return;
    try {
      return createInfrastructureScene(canvasRef.current, setSelected);
    } catch {
      onFailure();
      return;
    }
  }, [onFailure]);

  if (!current) return null;

  return (
    <section className="overflow-hidden rounded-xl border border-slate-800/80 bg-surface" aria-label={title}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 px-4 py-2 font-mono text-xs text-slate-400">
        <span className="text-emerald-term">{title}</span>
        <span>{hint}</span>
      </div>
      <div className="relative min-h-64 bg-obsidian">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          tabIndex={-1}
          className="block h-[20rem] w-full md:h-[25rem]"
        />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] text-slate-500">
          SCHEMATIC / CONCEPTUAL
        </span>
      </div>
      <div className="border-t border-slate-800/80 p-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label={title}>
          {layers.map((layer) => (
            <button
              key={layer.id}
              type="button"
              aria-pressed={layer.id === selected}
              onClick={() => setSelected(layer.id as NodeId)}
              className={`rounded border px-3 py-2 font-mono text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-term ${
                layer.id === selected
                  ? 'border-emerald-term text-emerald-term'
                  : 'border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
            >{layer.title}</button>
          ))}
        </div>
        <div aria-live="polite" aria-atomic="true" className="mt-5">
          <p className="font-mono text-xs text-amber-forge">{current.tag}</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-100">{current.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{current.summary}</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {current.details.map((detail) => (
              <li className="font-mono text-xs text-slate-300" key={detail}>
                <span aria-hidden="true" className="mr-2 text-emerald-term">&gt;</span>{detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
