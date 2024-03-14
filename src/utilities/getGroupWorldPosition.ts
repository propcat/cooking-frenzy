import { Group, Vector3 } from 'three';
import { vector3ToPosition } from './vector3ToPosition';

export function getGroupWorldPosition(group: Group) {
  const worldPosition = new Vector3();
  group.getWorldPosition(worldPosition);

  const position = vector3ToPosition(worldPosition);

  return { worldPosition, position };
}