import { actions } from '@logic/actions';

export const throwItem: typeof actions.throwItem = (params, { game, playerId }) => {
  const player = game.players.find(player => player.id === playerId);
  
  if(!player) return;

  const { carry, item } = player;

  if(carry === null) return;

  game.items.push({
    ...params,
    startedAt: Rune.gameTime(),
    carry: carry as any,
    item,
  });

  game.players = game.players.map(player => {
    if(player.id !== playerId) return player;

    return {
      ...player,
      position: { ...player.position },
      rotation: { ...player.rotation },
      carry: null,
      item: undefined,
    };
  })
}