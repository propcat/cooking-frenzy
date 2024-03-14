import { Position } from '@mytypes/Position';
import { degToRad } from 'three/src/math/MathUtils';

export function calculateThrowDelta(
  force: number,
  angle: number = 30,
  time: number = 0,
): Omit<Position, 'z'> & { duration: number } {
  const g = 9.8;

  const v0 = force;

  const v0x = v0 * Math.cos(degToRad(angle));
  const v0y = v0 * Math.sin(degToRad(angle));

  const duration = (2 * v0y) / g;

  const x = (t: number) => v0x * t;
  const y = (t: number) => v0y * t - (g / 2) * Math.pow(t, 2);

  return {
    x: x(Math.min(time, duration)),
    y: y(Math.min(time, duration)),
    duration,
  };
}