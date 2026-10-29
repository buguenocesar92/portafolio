import { loadGsap } from './registry';
import { prefersReducedMotion } from './useReducedMotion';
import { reveal, splitReveal, scrambleText, magnetic, spotlight } from './effects';

/**
 * Punto de montaje único del documento. ScrollTrigger y SplitText se descargan
 * únicamente al entrar una sección animable en viewport.
 */
export function mountMotion(root: Document = document): () => void {
  if (prefersReducedMotion()) return () => {};
  const handlers: Array<() => void> = [];
  let alive = true;
  const decorate = [
    ...root.querySelectorAll<HTMLElement>('[data-spotlight]'),
  ];
  decorate.forEach((element) => handlers.push(spotlight(element)));

  const revealTargets = [...root.querySelectorAll<HTMLElement>('[data-reveal], [data-split-reveal]')];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      const element = entry.target as HTMLElement;
      void loadGsap().then((engine) => {
        if (!alive) return;
        let effectCleanup: (() => void) | undefined;
        const context = engine.gsap.context(() => {
          effectCleanup = element.matches('[data-split-reveal]')
            ? splitReveal(element, engine) : reveal(element, engine);
        }, element);
        handlers.push(() => { effectCleanup?.(); context.revert(); });
      }).catch(() => {});
    }
  }, { rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach((element) => observer.observe(element));
  const scrambleElements = [...root.querySelectorAll<HTMLElement>('[data-scramble]')];
  scrambleElements.forEach((element) => {
    let revert: (() => void) | undefined;
    const run = () => {
      if (revert) return;
      void loadGsap().then((engine) => {
        if (!alive) return;
        revert = scrambleText(element, engine);
      }).catch(() => {});
    };
    element.addEventListener('pointerenter', run);
    element.addEventListener('focus', run);
    handlers.push(() => {
      element.removeEventListener('pointerenter', run);
      element.removeEventListener('focus', run);
      revert?.();
    });
  });
  const magneticElements = [...root.querySelectorAll<HTMLElement>('[data-magnetic]')];
  magneticElements.forEach((element) => {
    let revert: (() => void) | undefined;
    const activate = () => {
      if (revert) return;
      void loadGsap().then((engine) => {
        if (alive) revert = magnetic(element, engine);
      }).catch(() => {});
    };
    element.addEventListener('pointerenter', activate, { once: true });
    handlers.push(() => { element.removeEventListener('pointerenter', activate); revert?.(); });
  });
  return () => {
    alive = false;
    observer.disconnect();
    handlers.forEach((cleanup) => cleanup());
  };
}
