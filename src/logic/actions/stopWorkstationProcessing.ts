import { actions } from '@logic/actions';

export const stopWorkstationProcessing: typeof actions.stopWorkstationProcessing = ({ workstationId }, { game }) => {
  game.workstations = game.workstations.map(workstation => {
    if(workstation.id !== workstationId || !workstation.cooking) return workstation;

    return { ...workstation, cooking: false, items: workstation.items ? [ ...workstation.items ] : null };
  }) as typeof game.workstations;
}