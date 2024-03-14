import { actions } from '@logic/actions';

export const updatePlayer: typeof actions.updatePlayer = (update, { game, playerId }) => {
  const tempPlayers = [...game.players];

  game.players = tempPlayers.map(player => {
    if(player.id !== playerId) return player;

    return { ...player, ...update }
  }) as typeof game.players;
}