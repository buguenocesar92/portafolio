import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import InfrastructureBlueprint from '../InfrastructureBlueprint';
import type { BlueprintLayer } from '@/i18n/ui';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { canRender3D } from './capability';

/** El import se ejecuta solo después de la prueba WebGL y client:visible. */
const Blueprint3D = lazy(() => import('./InfrastructureBlueprint3D'));

interface Props { layers: BlueprintLayer[]; title: string; hint: string; schematicLabel: string }

export default function InfrastructureExperience(props: Props) {
  const reduceMotion = useReducedMotion();
  const [capable, setCapable] = useState(false);
  const onFailure = useCallback(() => setCapable(false), []);
  useEffect(() => {
    setCapable(!reduceMotion && canRender3D());
  }, [reduceMotion]);
  if (!capable) return <InfrastructureBlueprint layers={props.layers} title={props.title} hint={props.hint} />;
  return (
    <Suspense fallback={<InfrastructureBlueprint layers={props.layers} title={props.title} hint={props.hint} />}>
      <Blueprint3D {...props} onFailure={onFailure} />
    </Suspense>
  );
}
