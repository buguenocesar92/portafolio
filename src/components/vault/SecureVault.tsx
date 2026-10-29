import { useCallback, useEffect, useRef, useState } from 'react';
import { canRender3D } from '../infrastructure/capability';
import { useReducedMotion } from '../../lib/motion/useReducedMotion';
import { VaultFallback } from './VaultFallback';
import { VAULT_COPY, type VaultLang, type VaultNodeId } from './vaultData';
import type { VaultSceneController } from './vaultScene';

export default function SecureVault({lang}:{lang:VaultLang}) {
  const t = VAULT_COPY[lang];
  const canvas = useRef<HTMLCanvasElement>(null);
  const controller = useRef<VaultSceneController | null>(null);
  const [selected, setSelected] = useState<VaultNodeId>('hefesto');
  const [ready, setReady] = useState(false);
  const [eligible, setEligible] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const onFailure = useCallback(() => { setReady(false); setEligible(false); }, []);

  useEffect(() => {
    const sync = () => {
      const off = document.documentElement.classList.contains('motion-paused');
      setPaused(off);
      setEligible(!off && !reduced && canRender3D());
    };
    sync();
    window.addEventListener('portfolio-motion-change', sync);
    return () => window.removeEventListener('portfolio-motion-change', sync);
  }, [reduced]);

  useEffect(() => {
    let cancelled = false;
    let instance: VaultSceneController | null = null;
    if (!eligible || !canvas.current) { setReady(false); return; }
    void import('./vaultScene').then(({createVaultScene}) => {
      if (cancelled || !canvas.current) return;
      try {
        instance = createVaultScene(canvas.current, setSelected, onFailure);
        controller.current = instance;
        setReady(true);
      } catch { instance?.dispose(); onFailure(); }
    }).catch(onFailure);
    return () => {
      cancelled = true;
      instance?.dispose();
      if (controller.current === instance) controller.current = null;
    };
  }, [eligible, onFailure]);

  useEffect(() => { if (ready) controller.current?.focusNode(selected); }, [selected, ready]);
  const toggle = () => {
    const next = !paused;
    setPaused(next);
    setEligible(!next && !reduced && canRender3D());
    controller.current?.setPaused(next);
  };
  const current = t.nodeList.find(node => node.id === selected)!;
  return (
    <section className="vault" aria-label={t.title}>
      <div className="vault__chrome">
        <span><span className="vault__live-dot" aria-hidden="true"/> {t.eyebrow}</span>
        <span>ARCHITECTURE / 001</span>
      </div>
      <div className="vault__stage">
        <div className="vault__stage-head">
          <span>CORE_01 <b>///</b> DEFENSE IN DEPTH</span>
          <span>{ready ? 'WEBGL / 3D' : 'VECTOR / 2D'}</span>
        </div>
        <div className="vault__visual">
          <div className="vault__grid" aria-hidden="true" />
          <div className="vault__halo" aria-hidden="true" />
          <span className="vault__ring-label vault__ring-label--one">{t.outer}</span>
          <span className="vault__ring-label vault__ring-label--two">{t.middle}</span>
          <span className="vault__ring-label vault__ring-label--three">{t.inner}</span>
          <div className={`vault__fallback ${ready ? 'vault__fallback--hidden' : ''}`}>
            <VaultFallback selected={selected} description={t.subtitle}/>
          </div>
          <canvas ref={canvas} className="vault__canvas" tabIndex={-1} aria-hidden="true"
            style={{opacity:ready ? 1 : 0}}/>
          <span className="vault__core-label">{t.center}</span>
        </div>
        <div className="vault__stage-foot">
          <span>{t.concept} / 04 SATELLITES</span>
          <button type="button" className="vault__motion" onClick={toggle}
            aria-pressed={paused} aria-label={paused ? t.resume : t.pause}>
            <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span> {paused ? t.resume : t.pause}
          </button>
        </div>
      </div>
      <div className="vault__dashboard">
        <div className="vault__sidebar">
          <p className="vault__section-label">{t.guide}</p>
          <div className="vault__node-list" role="group" aria-label={t.select}>
            {t.nodeList.map((node,index) => (
              <button key={node.id} type="button" aria-pressed={selected === node.id}
                aria-controls="vault-detail" onClick={() => setSelected(node.id)}
                className={`vault__node ${selected===node.id ? 'vault__node--active' : ''}`}>
                <span className="vault__node-index">0{index+1}</span>
                <span className="vault__node-copy"><strong>{node.title}</strong><small>{node.category}</small></span>
                <span aria-hidden="true" className="vault__node-arrow">↗</span>
              </button>
            ))}
          </div>
        </div>
        <article className="vault__detail" id="vault-detail" aria-live="polite" aria-atomic="true">
          <div className="vault__detail-heading">
            <span className="vault__section-label">{t.technical} / {current.category}</span>
            <span className="vault__detail-state">{t.concept}</span>
          </div>
          <h3>{current.title}</h3>
          <p className="vault__summary">{current.summary}</p>
          <div className="vault__data-grid">
            <div><h4>{t.architecture}</h4><ol>{current.layers.map(layer=><li key={layer}>{layer}</li>)}</ol></div>
            <div><h4>{t.technologies}</h4><ul className="vault__tech">{current.tech.map(item=><li key={item}>{item}</li>)}</ul></div>
          </div>
          <div className="vault__evidence">
            <strong>{t.evidence}</strong>
            <p>{current.verification}</p>
            {current.detail && <p>{current.detail}</p>}
          </div>
        </article>
      </div>
      <p className="vault__footnote">{t.note}</p>
    </section>
  );
}
