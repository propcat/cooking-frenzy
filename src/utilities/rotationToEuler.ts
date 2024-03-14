import { EulerRotation, Rotation } from '@mytypes/Rotation';
import { Euler } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

export const rotationToEuler: (rotation: EulerRotation) => Euler = ({ x, y, z }) => new Euler(degToRad(x), degToRad(y), degToRad(z));