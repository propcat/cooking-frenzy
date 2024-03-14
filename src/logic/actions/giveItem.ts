import { actions } from '@logic/actions';

export const giveItem: typeof actions.giveItem = ({ item }, { game, playerId }) => {
  const tempPlayers = [...game.players];

  game.players = tempPlayers.map(player => {
    if(player.id !== playerId) return player;

    return {
      ...player,
      position: { ...player.position },
      rotation: { ...player.rotation },
      carry: 'item',
      item,
    };
  });
}