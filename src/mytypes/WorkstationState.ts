import type { Food } from '@mytypes/Food';
import type { Ingredient } from '@mytypes/Ingredient';
import type { Workstation } from '@mytypes/Workstation';
import type { WorkstationCounter } from '@mytypes/WorkstationCounter';
import { UtensilState } from './UtensilState';
import { MovableObject } from './MovableObject';
import { Position } from './Position';

export type IndependentWorkstation = Extract<Workstation, 'oven' | 'adjunct'>;
export type CounterWorkstation = Extract<Workstation, 'counter' | 'chukaman_steamer' | 'cutting_table'>;

export type WorkstationState = {
  id: string,
  size: number,
  disabled?: boolean,
} & (
  {
    type: IndependentWorkstation,
    counterType?: undefined,
  } |
  {
    type: CounterWorkstation,
    counterType: WorkstationCounter,
  }
) & (
  {
    child: 'items',
    item?: undefined,
    items: [Ingredient | Food, ...(Ingredient | Food)[]],
  } |
  {
    child: 'utensil',
    item: string,
    items?: undefined,
  } |
  {
    child?: undefined | null,
    item?: undefined,
    items?: undefined,
  }
) & (
  {
    cooking?: false,
    cookingSince?: undefined,
    cookingGoal?: undefined,
  } |
  {
    cooking: true,
    cookingSince: number,
    cookingGoal: number,
  }
);