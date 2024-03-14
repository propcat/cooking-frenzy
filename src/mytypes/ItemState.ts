import { Food } from './Food';
import { Ingredient } from './Ingredient';
import { Position } from './Position';
import { Rotation } from './Rotation';
import { Utensil } from './Utensil';

export type ItemState = {
  id: string,
  startedAt: number,
  initialPosition: Position,
  path: { duration: number, points: Position[] },
  rotation: Rotation,
  force: number,
} & (
  {
    carry: 'item',
    item: Ingredient | Food,
  } |
  {
    carry: 'utensil',
    item: string,
  }
)