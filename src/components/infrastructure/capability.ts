import { prefersReducedMotion } from '../../lib/motion/useReducedMotion';

interface NavigatorCapabilities extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

/**
 * Heurística conservadora: WebGL operativo, sin petición de ahorro de datos,
 * >4 hilos cuando existe la información y >4 GB cuando el navegador la revela.
 * Dispositivos de gama baja mantienen siempre el plano 2D.
 */
export function canRender3D(): boolean {
  if (typeof window === 'undefined' || prefersReducedMotion()) return false;
  const device = navigator as NavigatorCapabilities;
  if (device.connection?.saveData || (device.deviceMemory !== undefined && device.deviceMemory <= 4)) return false;
  if (device.hardwareConcurrency !== undefined && device.hardwareConcurrency <= 4) return false;
  if (window.matchMedia('(max-width: 640px)').matches) return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2', { powerPreference: 'low-power' });
    if (!gl) return false;
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}
