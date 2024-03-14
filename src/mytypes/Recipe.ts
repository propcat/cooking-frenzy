import type { Food } from '@mytypes/Food'
import type { Ingredient } from '@mytypes/Ingredient'
import type { Utensil } from '@mytypes/Utensil'
import type { Workstation } from '@mytypes/Workstation'

export type Recipe = {
  ingredients: Ingredient[],
} & (
  {
    type: 'process',
    result: Ingredient,
    workstation: Workstation,
    time: number,
  } | {
    type: 'cook',
    result: Food,
    utensil?: Utensil,
    workstation: Workstation,
    time: number,
  } | {
    type: 'assembly',
    result: Food,
  }
)