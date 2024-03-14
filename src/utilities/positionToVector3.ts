import type { Position } from '@mytypes/Position';
import { Vector3 } from 'three';

export const positionToVector3 = ({ x, y, z }: Position) => new Vector3(x, y, z);