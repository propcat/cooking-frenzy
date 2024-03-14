import { getPlayerArrayFromIds } from './utils/getPlayerArrayFromIds';
import { GameState } from './types/GameState';

export const setup: (allPlayerIds: string[]) => GameState = allPlayerIds => ({
  status: 'menu',
  difficulty: 'easy',
  level: {
    levelIndex: 0,
    startedAt: 0,
    loaded: false,
    loadedPlayersIds: [],
    previousLevelIndexes: [],
  },
  completedOrders: {
    completed: 0,
    total: 0,
  },
  orders: [],
  workstations: [],
  players: getPlayerArrayFromIds(allPlayerIds),
  items: [],
});