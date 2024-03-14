import { EulerRotation, Rotation } from '@mytypes/Rotation';
import { Euler } from 'three';
import { radToDeg } from 'three/src/math/MathUtils';

export const eulerToRotation: (euler: Euler) => EulerRotation = ({ x, y, z }) => ({ x: radToDeg(x), y: radToDeg(y), z: radToDeg(z) });