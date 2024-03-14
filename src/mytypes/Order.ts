import type { Food } from '@mytypes/Food';

export type Order = {
  food: Food,
  start: number,
  time: number,
}