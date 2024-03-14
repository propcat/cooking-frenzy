import { recipes } from '@constants/recipes';
import type { Food } from '@mytypes/Food';
import type { Ingredient } from '@mytypes/Ingredient';
import type { Recipe } from '@mytypes/Recipe';
import type { Utensil } from '@mytypes/Utensil';
import type { Workstation } from '@mytypes/Workstation';

export function getRecipe(workstation: Workstation, items: (Ingredient | Food)[], utensil?: Utensil): Recipe | null {
  let resultRecipe: Recipe | null = null;
  
  for(const recipe of recipes) {
    if(recipe.type === 'process' && recipe.workstation !== workstation) continue;
    if(recipe.type === 'cook' && ((utensil && !recipe.utensil) || (utensil && recipe.utensil !== utensil) || recipe.workstation !== workstation)) continue;

    const tempItems = [...items];

    let hasIngredients = true;

    for(const ingredient of recipe.ingredients) {
      const index = tempItems.findIndex(item => item === ingredient);

      if(index < 0) {
        hasIngredients = false;
        break;
      }

      tempItems.splice(index, 1);
    }

    if(hasIngredients) {
      if(!resultRecipe) resultRecipe = recipe;
      else if(recipe.ingredients.length > resultRecipe.ingredients.length) resultRecipe = recipe;
    }
  }

  return resultRecipe;
}