import { InitLogicActions } from 'rune-games-sdk';
import { GameActions } from './types/GameActions';
import { GameState } from './types/GameState';
import { updatePlayer } from './actions/updatePlayer';
import { giveItem } from './actions/giveItem';
import { interact } from './actions/interact';
import { setDifficulty } from './actions/setDifficulty';
import { startGame } from './actions/startGame';
import { restartGame } from './actions/restartGame';
import { openHomeScreen } from './actions/openHomeScreen';
import { onLevelLoad } from './actions/onLevelLoad';
import { startWorkstationProcessing } from './actions/startWorkstationProcessing';
import { stopWorkstationProcessing } from './actions/stopWorkstationProcessing';
import { throwItem } from './actions/throwItem';
import { pickItem } from './actions/pickItem';

export const actions: InitLogicActions<GameState, GameActions> = {
  updatePlayer,
  giveItem,
  throwItem,
  pickItem,
  interact,
  setDifficulty,
  startGame,
  restartGame,
  openHomeScreen,
  onLevelLoad,
  startWorkstationProcessing,
  stopWorkstationProcessing,
}