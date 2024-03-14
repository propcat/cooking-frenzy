import { actions } from '@logic/actions';
import { ItemState } from '@mytypes/ItemState';

export const pickItem: typeof actions.pickItem = ({ id }, { game, playerId }) => {
  const item = game.items.find(item => item.id === id);
  const player = game.players.find(player => player.id === playerId);

  if(!item || !player || player.carry) return;

  game.players = game.players.map(player => {
    if(player.id !== playerId) return player;

    return {
      ...player,
      position: { ...player.position },
      rotation: { ...player.rotation },
      carry: item.carry,
      item: item.item,
    };
  }) as typeof game.players;

  game.items = game.items.filter(item => item.id !== id);
}