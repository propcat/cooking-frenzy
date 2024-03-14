import { actions } from '@logic/actions';
import { getRecipe } from '@utilities/getRecipe';
import { stringToUtensil } from '@utilities/stringToUtensil';

export const startWorkstationProcessing: typeof actions.startWorkstationProcessing = ({ workstationId }, { game }) => {
  game.workstations = game.workstations.map(workstation => {
    if(workstation.id !== workstationId || !workstation.child || workstation.cooking) return workstation;
    
    const utensil = workstation.child === 'utensil' ? stringToUtensil(workstation.item) : null;
    const items = workstation.child === 'utensil' ? utensil!.content : workstation.items;

    const recipe = getRecipe(workstation.type, items, utensil?.type);

    if(!recipe || recipe.type !== 'process') return workstation;

    return { ...workstation, cooking: true, cookingSince: Rune.gameTime(), cookingGoal: recipe.time * 1000, items: workstation.items ? [ ...workstation.items ] : null };
  }) as typeof game.workstations;
}