/**
 * GSAP nunca se importa desde el chunk crítico. El registro es único.
 * Solo se llama en navegador y cuando se permite movimiento.
 */
let promise: Promise<{
  gsap: typeof import('gsap')['gsap'];
  ScrollTrigger: typeof import('gsap/ScrollTrigger')['ScrollTrigger'];
  SplitText: typeof import('gsap/SplitText')['SplitText'];
}> | undefined;

export function loadGsap() {
  promise ??= Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('gsap/SplitText'),
  ]).then(([core, scroll, split]) => {
    const { gsap } = core;
    gsap.registerPlugin(scroll.ScrollTrigger, split.SplitText);
    return { gsap, ScrollTrigger: scroll.ScrollTrigger, SplitText: split.SplitText };
  }).catch((error: unknown) => {
    promise = undefined;
    throw error;
  });
  return promise;
}
