import { useEffect, type DependencyList, type RefObject } from 'react';
import { loadGsap } from './registry';
import { prefersReducedMotion } from './useReducedMotion';

/** El contexto revierte estilos y elimina timelines/ScrollTriggers al desmontar. */
export function useGsap(
  ref: RefObject<HTMLElement | null>,
  setup: (engine: Awaited<ReturnType<typeof loadGsap>>) => void,
  deps: DependencyList = [],
): void {
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    if (prefersReducedMotion()) return;
    void loadGsap().then((engine) => {
      if (disposed || !ref.current) return;
      const context = engine.gsap.context(() => setup(engine), ref.current!);
      cleanup = () => context.revert();
    }).catch(() => {
      // Motion es progresivo: nunca impide mostrar contenido.
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
    // El consumidor decide las dependencias, igual que useEffect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
