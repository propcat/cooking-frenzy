import type { Food } from '@mytypes/Food';
import type { Ingredient } from '@mytypes/Ingredient';
import type { Supply } from '@mytypes/Supply';

export type SupplyState = {
  type: Supply,
  content: (Ingredient | Food)[],
}