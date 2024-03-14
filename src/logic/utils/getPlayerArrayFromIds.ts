import type { Player } from '@mytypes/Player';
import { getPlayerFromId } from './getPlayerFromId';

export function getPlayerArrayFromIds(allPlayerIds: string[]): Player[] {
  const players: Player[] = [];

  for(const playerId of allPlayerIds) {
    const player = getPlayerFromId(players, playerId);

    players.push(player);
  }
  return players;
}