import type { RuneClient } from 'rune-games-sdk/multiplayer';
import { GameState } from '@logic/types/GameState';
import { GameActions } from '@logic/types/GameActions';
import { setup } from '@logic/setup';
import { update } from '@logic/update';
import { actions } from '@logic/actions';
import { events } from '@logic/events';
import { playerJoined as onPlayerJoin } from '@logic/events/playerJoined';
import { playerLeft as onPlayerLeave } from '@logic/events/playerLeft';

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 6,
  updatesPerSecond: 4,
  setup: allPlayerids => setup(allPlayerids),
  update: (context) => update(context),
  actions: { ...actions },
  events: {
    playerJoined: (playerId, context) => onPlayerJoin && onPlayerJoin(playerId, context),
    playerLeft: (playerId, context) => onPlayerLeave && onPlayerLeave(playerId, context),
  },
})