import { useEffect, useRef, useState } from 'react';
import { canRender3D } from '../infrastructure/capability';

interface Props {
  title: string;
  caption: string;
  hint: string;
}

/**
 * Figura escultórica abstracta.
 * El SVG se entrega desde SSR: nunca es necesario WebGL para ver el hero.
 * Three.js solo se importa bajo demanda cuando la isla entra en viewport.
 */
export default function ForgeVisual({ title, caption, hint }: Props) {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let disposed = false;
    let generation = 0;
    let cleanup: (() => void) | undefined;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const start = () => {
      const attempt = ++generation;
      cleanup?.();
      cleanup = undefined;
      setLive(false);

      if (!canvas.current ||
          !canRender3D() ||
          document.documentElement.classList.contains('motion-paused')) {
        return;
      }

      void import('./forgeScene').then(({ createForgeScene }) => {
        if (disposed || attempt !== generation || !canvas.current || media.matches ||
            document.documentElement.classList.contains('motion-paused')) return;
        try {
          cleanup = createForgeScene(canvas.current);
          setLive(true);
        } catch {
          cleanup?.();
          cleanup = undefined;
          setLive(false);
        }
      }).catch(() => setLive(false));
    };
    start();
    media.addEventListener('change', start);
    window.addEventListener('portfolio-motion-change', start);
    return () => {
      disposed = true;
      generation++;
      cleanup?.();
      media.removeEventListener('change', start);
      window.removeEventListener('portfolio-motion-change', start);
    };
  }, []);

  return (
    <figure className={`forge-art ${live ? 'is-live3d' : ''}`} aria-label={title}>
      <div className="forge-art__matrix" aria-hidden="true" />
      <div className="forge-art__halo" aria-hidden="true" />
      <svg className="forge-art__fallback" viewBox="0 0 650 650" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="forge-glow">
            <stop stopColor="#d9542f" stopOpacity=".45"/>
            <stop offset=".58" stopColor="#c78c65" stopOpacity=".14"/>
            <stop offset="1" stopColor="#c78c65" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="forge-metal" x1="145" y1="80" x2="506" y2="574" gradientUnits="userSpaceOnUse">
            <stop stopColor="#191e1c"/>
            <stop offset=".24" stopColor="#b45135"/>
            <stop offset=".42" stopColor="#f2b47b"/>
            <stop offset=".67" stopColor="#642d25"/>
            <stop offset="1" stopColor="#111d1a"/>
          </linearGradient>
          <linearGradient id="forge-face" x1="208" y1="168" x2="471" y2="439" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffce92"/>
            <stop offset=".34" stopColor="#c8683d"/>
            <stop offset=".68" stopColor="#652b22"/>
            <stop offset="1" stopColor="#141918"/>
          </linearGradient>
          <linearGradient id="forge-stroke" x1="60" y1="325" x2="590" y2="325" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c34b2a" stopOpacity="0"/>
            <stop offset=".4" stopColor="#c34b2a" stopOpacity=".65"/>
            <stop offset="1" stopColor="#c34b2a" stopOpacity="0"/>
          </linearGradient>
          <filter id="forge-soft"><feGaussianBlur stdDeviation="22" /></filter>
        </defs>
        <circle cx="325" cy="325" r="315" fill="url(#forge-glow)" />
        <g opacity=".55" stroke="#bd653e" strokeWidth="1.3">
          <ellipse cx="325" cy="326" rx="251" ry="91" transform="rotate(-34 325 326)" />
          <ellipse cx="325" cy="326" rx="251" ry="91" transform="rotate(48 325 326)" />
          <circle cx="325" cy="325" r="236" strokeDasharray="3 14" opacity=".35"/>
        </g>
        <path d="M325 103 494 192 530 362 402 518 223 524 124 367 167 199Z" fill="#a7462a" opacity=".3" filter="url(#forge-soft)"/>
        <path d="M325 99 495 191 517 369 401 520 220 520 133 366 159 203Z" fill="url(#forge-metal)" stroke="#ae674b" strokeWidth="2"/>
        <path d="M325 99 352 304 495 191 325 99Z" fill="#f4b077" fillOpacity=".35"/>
        <path d="M159 203 352 304 325 99Z" fill="#0d1514" fillOpacity=".75"/>
        <path d="M159 203 352 304 133 366Z" fill="#ba6644" fillOpacity=".55"/>
        <path d="M133 366 352 304 220 520Z" fill="#141917" fillOpacity=".93"/>
        <path d="M220 520 352 304 401 520Z" fill="url(#forge-face)"/>
        <path d="M401 520 352 304 517 369Z" fill="#191f1b" fillOpacity=".95"/>
        <path d="M495 191 352 304 517 369Z" fill="#c05b37" fillOpacity=".75"/>
        <path d="M325 99 352 304 517 369" stroke="#f0b388" strokeOpacity=".7" strokeWidth="2"/>
        <path d="M159 203 352 304 220 520" stroke="#f0b388" strokeOpacity=".4"/>
        <path d="M136 370 517 370" stroke="url(#forge-stroke)" strokeWidth="1.8"/>
        <path d="M288 251 351 304 304 385 243 312Z" fill="#e5a472" fillOpacity=".5"/>
        <path d="M352 304 407 241 449 310 399 390Z" fill="#080f0e" fillOpacity=".7" stroke="#edaa7b" strokeOpacity=".6"/>
        <g fill="#c65a33">
          <circle cx="89" cy="342" r="4"/>
          <circle cx="531" cy="161" r="5"/>
          <circle cx="558" cy="432" r="3"/>
          <circle cx="237" cy="84" r="3"/>
        </g>
        <path d="M76 548 H574" stroke="#c08a68" strokeOpacity=".45"/>
        <path d="M76 538 V558 M574 538 V558" stroke="#c08a68" strokeOpacity=".45"/>
      </svg>
      <canvas
        ref={canvas}
        className="forge-art__canvas"
        aria-hidden="true"
        tabIndex={-1}
        style={{ opacity: live ? 1 : 0 }}
      />
      <span className="forge-art__axis forge-art__axis--top" aria-hidden="true">FORM / SYSTEM / MOTION</span>
      <span className="forge-art__axis forge-art__axis--side" aria-hidden="true">{hint}</span>
      <figcaption className="forge-art__caption">{caption}</figcaption>
    </figure>
  );
}
