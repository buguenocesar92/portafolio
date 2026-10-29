import type { VaultNodeId } from './vaultData';

interface Props { selected: VaultNodeId }

/** SVG real servido por SSR: no depende de JavaScript/WebGL. */
export function VaultFallback({ selected }: Props) {
  const points: Record<VaultNodeId, [number, number]> = {
    hefesto: [140, 150], calify: [490, 150], kraftdo: [140, 424], secops: [490, 424],
  };
  return (
    <svg className="vault-fallback" viewBox="0 0 630 570" role="img"
      aria-label="Modelo conceptual: núcleo aislado, anillos protectores y cuatro sistemas conectados">
      <defs>
        <radialGradient id="vault-stage-glow">
          <stop stopColor="#10b981" stopOpacity=".21"/>
          <stop offset=".54" stopColor="#10b981" stopOpacity=".055"/>
          <stop offset="1" stopColor="#10b981" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="vault-core-metal" x1="225" y1="130" x2="427" y2="427" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7f998d"/><stop offset=".22" stopColor="#394b45"/>
          <stop offset=".58" stopColor="#17231f"/><stop offset="1" stopColor="#0c1714"/>
        </linearGradient>
        <linearGradient id="vault-energy" x1="248" y1="150" x2="372" y2="415" gradientUnits="userSpaceOnUse">
          <stop stopColor="#bcffdc"/><stop offset=".42" stopColor="#10b981"/>
          <stop offset="1" stopColor="#077c5a"/>
        </linearGradient>
        <filter id="vault-neon"><feGaussianBlur stdDeviation="3"/></filter>
      </defs>
      <circle cx="315" cy="286" r="272" fill="url(#vault-stage-glow)"/>
      <g fill="none" transform="translate(315 286)">
        <ellipse rx="239" ry="125" transform="rotate(-22)" stroke="#10b981" strokeOpacity=".4" strokeWidth="1.2" strokeDasharray="6 12" className="vault-svg-orbit vault-svg-orbit--outer"/>
        <ellipse rx="207" ry="105" transform="rotate(39)" stroke="#96bba9" strokeOpacity=".4" strokeWidth="1.2" className="vault-svg-orbit vault-svg-orbit--middle"/>
        <ellipse rx="164" ry="83" transform="rotate(-45)" stroke="#f59e0b" strokeOpacity=".52" strokeWidth="1.5" strokeDasharray="14 9" className="vault-svg-orbit vault-svg-orbit--inner"/>
      </g>
      <g fill="none" stroke="#10b981" strokeOpacity=".35" strokeWidth="1.2" strokeDasharray="4 7">
        {Object.values(points).map(([x,y],i)=>
          <path key={i} d={`M315 286 Q ${(x+315)/2} ${(y+286)/2-16} ${x} ${y}`}/>)}
      </g>
      <g>
        <path d="M315 139 421 196 421 360 315 422 210 361 210 197Z" fill="url(#vault-core-metal)" stroke="#89bda4" strokeWidth="2"/>
        <path d="M315 139 V421 M210 197 L315 246 421 196 M210 361 L315 309 421 360" stroke="#96cfb2" strokeOpacity=".64" strokeWidth="2"/>
        <path d="M315 176 382 213 382 341 315 379 248 342 248 215Z" fill="#101e1a" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M315 189 369 220 369 333 315 365 261 333 261 221Z" fill="none" stroke="url(#vault-energy)" strokeWidth="3" filter="url(#vault-neon)"/>
        <path d="M315 189 369 220 369 333 315 365 261 333 261 221Z" fill="none" stroke="url(#vault-energy)" strokeWidth="1.8"/>
        <path d="M281 237 H347 M281 251 H347 M281 265 H347 M281 279 H347 M281 293 H347 M281 307 H347 M281 321 H347" stroke="#10b981" strokeOpacity=".36"/>
        <path d="M315 239 336 253 V280 C336 303 328 314 315 324 C302 314 294 303 294 280 V253Z" fill="#10b981" fillOpacity=".16" stroke="#9df5c5" strokeWidth="2"/>
        <path d="M307 282 L315 292 327 274" fill="none" stroke="#baffd6" strokeWidth="3" strokeLinecap="round"/>
        <path d="M244 170 L254 165 M376 167 L386 173 M245 391 L258 400 M373 398 L386 389" stroke="#f59e0b" strokeWidth="3"/>
      </g>
      {Object.entries(points).map(([id, [x,y]])=>
        <g key={id} className={selected===id?'vault-svg-node is-selected':'vault-svg-node'}>
          <circle cx={x} cy={y} r="30" fill="#10231c" stroke={selected===id?'#f59e0b':'#10b981'} strokeWidth={selected===id?3:1.5}/>
          <path d={`M ${x-12} ${y} L ${x} ${y-12} L ${x+12} ${y} L ${x} ${y+12}Z`} fill={selected===id?'#f59e0b':'#10b981'} fillOpacity=".45" stroke={selected===id?'#ffd18a':'#8adbbb'}/>
        </g>)}
      <g stroke="#c4ddcd" strokeOpacity=".28" fill="none">
        <path d="M58 40 H95 M58 40 V80 M572 40 H535 M572 40 V80 M58 532 H95 M58 532 V495 M572 532 H535 M572 532 V495"/>
      </g>
    </svg>
  );
}
