import { GameData } from '@gamedata';
import { actions } from '@logic/actions';

export const restartGame: typeof actions.restartGame = (_, { game }) => {
  if(game.status !== 'game') return;

  game.level = {
    ...game.level,
    loadedPlayersIds: [ ...game.level.loadedPlayersIds ],
    startedAt: Rune.gameTime(),
    previousLevelIndexes: [ ...game.level.previousLevelIndexes ],
  };

  game.players = game.players.map(player => ({
    ...player,
    position: { ...player.position },
    rotation: { ...player.rotation },
    carry: null,
    item: undefined,    
  }));

  game.items = [];

  game.completedOrders = { completed: 0, total: 0 };
  game.orders = [];

  game.workstations = GameData.levels[game.level.levelIndex].workstations.filter(workstation => !workstation.disabled).map(workstation => {
    if(workstation.dynamic) {
      const { dynamic, path, collider, pause, speed, ...clearWorkstation } = workstation;

      return clearWorkstation;
    } else {
      const { dynamic, position, rotation, collider, ...clearWorkstation } = workstation;

      return clearWorkstation;
    }
  });
}