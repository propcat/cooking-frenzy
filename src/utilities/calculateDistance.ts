import { Position } from '@mytypes/Position';

export function calculateDistance({ x: x1, z: z1 }: Omit<Position, 'y'>, { x: x2, z: z2 }: Omit<Position, 'y'>) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(z1 - z2, 2));
}