import { Difficulty } from '@mytypes/Difficulty';
import { Food } from '@mytypes/Food';
import { Ingredient } from '@mytypes/Ingredient';
import { Player } from '@mytypes/Player';
import { Position } from '@mytypes/Position';
import { Rotation } from '@mytypes/Rotation';

export type GameActions = {
  updatePlayer: (params: Omit<Player, 'id' | 'carry' | 'model'>) => void,
  giveItem: (params: { item: Ingredient | Food }) => void,
  throwItem: (params: { id: string, initialPosition: Position, path: { duration: number, points: Position[] }, rotation: Rotation, force: number }) => void,
  pickItem: (params: { id: string }) => void,
  interact: (params: { workstationId: string }) => void,
  setDifficulty: (params: { difficulty: Difficulty }) => void,
  startGame: () => void,
  restartGame: () => void,
  openHomeScreen: () => void,
  onLevelLoad: () => void,
  startWorkstationProcessing: (params: { workstationId: string }) => void,
  stopWorkstationProcessing: (params: { workstationId: string }) => void,
}