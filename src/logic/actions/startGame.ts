import { GameData } from '@gamedata';
import { actions } from '@logic/actions';
import { random } from 'nanoid';

export const startGame: typeof actions.startGame = (_, { game }) => {
  let randomLevelIndex = -1;

  while(randomLevelIndex < 0) {
    const randomNumber = Math.floor(Math.random() * 3);

    //@ts-ignore
    const includes = game.level.previousLevelIndexes.includes(randomNumber);

    if(!includes) randomLevelIndex = randomNumber;
  }

  game.level = {
    levelIndex: randomLevelIndex,
    loaded: false,
    loadedPlayersIds: [],
    startedAt: Rune.gameTime(),
    previousLevelIndexes: [ ...game.level.previousLevelIndexes, randomLevelIndex ].slice(-2) as [number, number],
  };

  const spawn = GameData.levels[game.level.levelIndex].spawn;

  game.players = game.players.map((player, index) => ({
    ...player,
    position: { ...(Array.isArray(spawn) ? spawn[index] : spawn) },
    rotation: { ...player.rotation },
    carry: null,
    item: undefined,
  }));

  game.items = [];

  game.completedOrders = { completed: 0, total: 0 };
  game.orders = [];

  game.workstations = GameData.levels[randomLevelIndex].workstations.filter(workstation => !workstation.disabled).map(workstation => {
    if(workstation.dynamic) {
      const { dynamic, path, collider, pause, speed, ...clearWorkstation } = workstation;

      return clearWorkstation;
    } else {
      const { dynamic, position, rotation, collider, ...clearWorkstation } = workstation;

      return clearWorkstation;
    }
  });
  
  game.status = 'game';
}