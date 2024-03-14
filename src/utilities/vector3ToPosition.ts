import { Position } from '@mytypes/Position';
import { Vector3 } from 'three';

export const vector3ToPosition: (vector3: Vector3) => Position = ({ x, y, z }) => ({ x, y, z });