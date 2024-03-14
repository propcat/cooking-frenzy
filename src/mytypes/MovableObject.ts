import type { Position } from '@mytypes/Position';
import type { EulerRotation, Rotation } from '@mytypes/Rotation';
import type { Collider } from '@mytypes/Collider';
import { PathItem } from './PathItem';

export type MovableObject = 
{
  collider?: Collider,
} &
(
  {
    dynamic: false,
    position: Position,
    rotation?: EulerRotation,
  } |
  {
    dynamic: true,
    path: [PathItem, PathItem, ...PathItem[]],
    speed?: number,
    pause?: number,
  }
)