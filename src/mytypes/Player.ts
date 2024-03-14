import type { Food } from '@mytypes/Food';
import type { Ingredient } from '@mytypes/Ingredient';
import type { PlayerAnimation } from '@mytypes/PlayerAnimation';
import type { PlayerModelType } from '@mytypes/PlayerModelType';
import type { Position } from '@mytypes/Position';
import type { Rotation } from '@mytypes/Rotation';
import { UtensilState } from './UtensilState';

export type Player =  {
  id: string,
  model: PlayerModelType,
  position: Position,
  rotation: Rotation,
  animation: PlayerAnimation,
} & (
  {
    carry: 'item',
    item: Ingredient | Food,
  } |
  {
    carry: 'utensil',
    item: string,
  } |
  {
    carry: null,
    item?: undefined,
  }
)