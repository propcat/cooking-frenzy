import { GameState } from '@logic/types/GameState';
import { Position } from '@mytypes/Position';
import { InitLogicEvents } from 'rune-games-sdk';

export const playerLeft: InitLogicEvents<GameState>['playerLeft'] = (playerId, { game, allPlayerIds }) => {
  const index = game.players.findIndex(player => player.id === playerId);

  if(index < 0) return;

  const player = game.players[index];

  const { carry, item } = game.players[index];

  const position: Position = { x: player.position.x, y: player.position.y + 0.5, z: player.position.z };

  if(carry) {
    game.items.push({
      startedAt: Rune.gameTime(),
      id: playerId,
      force: 0,
      initialPosition: position,
      rotation: { x: 0, y: 0, z: 0, w: 0 },
      path: { duration: 0, points: [] },
      carry: carry as any,
      item,
    });
  }

  game.players.splice(index, 1);
}