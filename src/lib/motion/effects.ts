import type { loadGsap } from './registry';

type Engine = Awaited<ReturnType<typeof loadGsap>>;
type Cleanup = () => void;

export function reveal(element: HTMLElement, { gsap, ScrollTrigger }: Engine): Cleanup {
  const tween = gsap.fromTo(element, { opacity: 0, y: 22 }, {
    opacity: 1, y: 0, duration: 0.65, ease: 'power2.out',
    scrollTrigger: { trigger: element, start: 'top 92%', once: true },
  });
  return () => { tween.scrollTrigger?.kill(); tween.kill(); gsap.set(element, { clearProps: 'opacity,transform' }); };
}

export function splitReveal(element: HTMLElement, { gsap, SplitText }: Engine): Cleanup {
  const split = new SplitText(element, { type: 'lines', linesClass: 'motion-line' });
  const animation = gsap.fromTo(split.lines, { opacity: 0, yPercent: 45 }, {
    opacity: 1, yPercent: 0, stagger: 0.07, duration: 0.6, ease: 'power2.out',
  });
  return () => { animation.kill(); split.revert(); };
}

/** Solo altera textContent; nunca HTML y conserva el nombre accesible. */
export function scrambleText(element: HTMLElement, { gsap }: Engine): Cleanup {
  const original = element.textContent ?? '';
  if (!original.trim()) return () => {};
  element.setAttribute('aria-label', original);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
  const progress = { value: 0 };
  const tween = gsap.to(progress, {
    value: 1, duration: 0.55, ease: 'none',
    onUpdate() {
      const fixed = Math.floor(original.length * progress.value);
      element.textContent = original.split('').map((ch, index) =>
        index < fixed || ch === ' ' ? ch : chars[(index * 7 + Math.floor(progress.value * 73)) % chars.length]
      ).join('');
    },
    onComplete() { element.textContent = original; },
  });
  return () => { tween.kill(); element.textContent = original; };
}

/** Elementos interactivos conservan funcionamiento sin este efecto. */
export function magnetic(element: HTMLElement, { gsap }: Engine): Cleanup {
  const xTo = gsap.quickTo(element, 'x', { duration: 0.3, ease: 'power2.out' });
  const yTo = gsap.quickTo(element, 'y', { duration: 0.3, ease: 'power2.out' });
  const move = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    const r = element.getBoundingClientRect();
    xTo((event.clientX - r.left - r.width / 2) * 0.09);
    yTo((event.clientY - r.top - r.height / 2) * 0.09);
  };
  const reset = () => { xTo(0); yTo(0); };
  element.addEventListener('pointermove', move);
  element.addEventListener('pointerleave', reset);
  return () => {
    element.removeEventListener('pointermove', move);
    element.removeEventListener('pointerleave', reset);
    gsap.killTweensOf(element);
    gsap.set(element, { clearProps: 'x,y' });
  };
}

export function spotlight(element: HTMLElement): Cleanup {
  const move = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    element.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };
  const leave = () => {
    element.style.removeProperty('--spot-x');
    element.style.removeProperty('--spot-y');
  };
  element.addEventListener('pointermove', move);
  element.addEventListener('pointerleave', leave);
  return () => {
    element.removeEventListener('pointermove', move);
    element.removeEventListener('pointerleave', leave);
    leave();
  };
}
