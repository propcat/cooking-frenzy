import type { Group } from 'three';
import type { PlayerAnimation } from '@mytypes/PlayerAnimation';

export interface PlayerModelHandle {
  group: Group | null,
  playAnimation: (animation: PlayerAnimation) => void,
}