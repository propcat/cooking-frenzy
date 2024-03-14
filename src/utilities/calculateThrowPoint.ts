import { PathItem } from '@mytypes/PathItem';
import { Position } from '@mytypes/Position';
import { calculateThrowDelta } from './calculateThrowDelta';
import { Quaternion, Vector3 } from 'three';
import { Rotation } from '@mytypes/Rotation';
import { degToRad } from 'three/src/math/MathUtils';

export function calculateThrowPoint(
  initialPosition: Position,
  force: number,
  angle: number = 30,
  time: number = 0,
  rotation?: Rotation,
): PathItem {
  const { x, y } = calculateThrowDelta(force, angle, time);

  const axis = new Vector3(0, 1, 0);

  const positionDelta = new Vector3(x, y, 0);

  if(rotation) {
    const quaternion = new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
  
    positionDelta.applyQuaternion(quaternion);
    positionDelta.applyAxisAngle(axis, degToRad(-90));
  }

  return {
    point: {
      x: initialPosition.x + positionDelta.x,
      y: initialPosition.y + positionDelta.y,
      z: initialPosition.z + positionDelta.z,
    },
  };
}