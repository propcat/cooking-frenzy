import { GameState } from '@logic/types/GameState';
import { getPlayerFromId } from '@logic/utils/getPlayerFromId';
import { InitLogicEvents } from 'rune-games-sdk';

export const playerJoined: InitLogicEvents<GameState>['playerJoined'] = (playerId, { game }) => {
  const player = getPlayerFromId(game.players, playerId);

  game.players.push(player);
}