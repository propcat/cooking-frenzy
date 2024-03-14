import type { Player } from '@mytypes/Player';
import type { Ingredient } from '@mytypes/Ingredient';
import type { Food } from '@mytypes/Food';
import { PlayerModelTypes } from '@mytypes/PlayerModelType';

export function getPlayerFromId(players: Player[], playerId: string, carry?: 'item' | 'utensil', item?: Ingredient | Food | string): Player {
  const playerModels = [...PlayerModelTypes];

  for(const player of players) {
    const index = playerModels.findIndex(model => model === player.model);

    if(index < 0) continue;

    playerModels.splice(index, 1);
  }
  
  const playerModelIndex = Math.floor(Math.random() * playerModels.length);;

  return {
    id: playerId,
    model: playerModels[playerModelIndex],
    position: { x: 5 + players.length * 4, y: 0, z: 5 },
    rotation: { x: 0, y: 0, z: 0, w: 0 },
    animation: 'Idle',
    carry: carry ?? null,
    //@ts-ignore
    item: item ?? null,
  }
}