import { Difficulty } from '@mytypes/Difficulty';
import { ItemState } from '@mytypes/ItemState';
import { Order } from '@mytypes/Order';
import { Player } from '@mytypes/Player';
import { Status } from '@mytypes/Status';
import { WorkstationState } from '@mytypes/WorkstationState';

export type GameState = {
  status: Status,
  difficulty: Difficulty,
  level: {
    levelIndex: number,
    startedAt: number,
    loaded: boolean,
    loadedPlayersIds: string[],
    previousLevelIndexes: [] | [number] | [number, number],
  },
  players: Player[],
  orders: Order[],
  completedOrders: { completed: number, total: number },
  workstations: WorkstationState[],
  items: ItemState[],
}