import type { Food } from '@mytypes/Food';
import type { Ingredient } from '@mytypes/Ingredient';
import type { Utensil } from '@mytypes/Utensil';
import { UtensilState } from '@mytypes/UtensilState';

export interface UtensilProps {
  item?: Ingredient | Food | Utensil,
  outline?: boolean,
  utensil?: UtensilState,
  cooking?: boolean,
}