import { PathItem } from '@mytypes/PathItem';
import { calculateThrowPoint } from './calculateThrowPoint';
import { Position } from '@mytypes/Position';
import { Rotation } from '@mytypes/Rotation';
import { degToRad } from 'three/src/math/MathUtils';

export function calculateThrowPath(
  initialPosition: Position,
  force: number,
  angle: number = 30,
  precision: number = 10,
  rotation?: Rotation,
): { duration: number, path: [PathItem, ...PathItem[]] } {
  const path: [PathItem, ...PathItem[]] = [{ point: initialPosition }];

  const g = 9.8;
  const v0y = force * Math.sin(degToRad(angle));

  const duration = (2 * v0y) / g;

  for(let i = 1; i < precision; i++) {
    const t = i * (duration / (precision - 1));

    path.push(calculateThrowPoint(initialPosition, force, angle, t, rotation));
  }

  return { duration, path };
}