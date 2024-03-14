import type { MovableObject } from '@mytypes/MovableObject';
import type { PlatformState } from '@mytypes/PlatformState';
import type { SupplyState } from '@mytypes/SupplyState';
import type { WallState } from '@mytypes/WallState';
import type { WorkstationState } from '@mytypes/WorkstationState';
import type { DecorationState } from '@mytypes/DecorationState';
import type { Position } from '@mytypes/Position';
import type { EulerRotation, Rotation } from '@mytypes/Rotation';
import type { Collider } from '@mytypes/Collider';

export type Level = {
  stars: boolean,
  lightColor: string,
  durationSeconds: number,
  spawn: Position | [Position, Position, Position, Position, Position, Position],
  panda: {
    position: Position,
    rotation?: EulerRotation,
  },
  walls: (WallState & MovableObject)[],
  platforms: (PlatformState & MovableObject)[],
  workstations: (WorkstationState & MovableObject)[],
  supplies: (SupplyState & MovableObject)[],
  decorations: (DecorationState & MovableObject)[],
  colliders: (Collider & { position: Position, rotation?: Rotation })[],
}