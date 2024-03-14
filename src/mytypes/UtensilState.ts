import type { Food } from '@mytypes/Food';
import type { Ingredient } from '@mytypes/Ingredient';
import type { Utensil } from '@mytypes/Utensil';

export type UtensilState = {
  type: Utensil,
  content: (Ingredient | Food)[],
  size: number,
}