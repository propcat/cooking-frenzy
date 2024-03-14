import { InitLogicEvents } from 'rune-games-sdk';
import { GameState } from './types/GameState';
import { playerJoined } from './events/playerJoined';
import { playerLeft } from './events/playerLeft';

export const events: InitLogicEvents<GameState> = {
  playerJoined,
  playerLeft,
}