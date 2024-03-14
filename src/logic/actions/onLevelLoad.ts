import { actions } from '@logic/actions';

export const onLevelLoad: typeof actions.onLevelLoad = (_, { game, playerId }) => {
  if(!game.level.loadedPlayersIds.includes(playerId)) {
    game.level.loadedPlayersIds.push(playerId);
  }
}