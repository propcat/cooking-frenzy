import { create } from 'zustand'
import type { Client } from '@mytypes/Client'
import type { Player } from '@mytypes/Player';
import type { Rotation } from '@mytypes/Rotation';
import type { Position } from '@mytypes/Position';
import type { PlayerAnimation } from '@mytypes/PlayerAnimation';
import { PlayerModelHandle } from '@models/player/PlayerModelHandle';

type PlayerUpdate = {
  id: string,
  position?: Position,
  rotation?: Rotation,
  animation?: PlayerAnimation,
}

interface ClientState {
  localPlayer: Player | null,
  client: Client | null,
  setClient: (client: Client) => void,
  updatePlayer: (update: PlayerUpdate) => void,
  localPlayerHandle: PlayerModelHandle | null,
  setLocalPlayerHandle: (handle: PlayerModelHandle) => void,
  removeLocalPlayerHandle: () => void,
}

export const useClientStore = create<ClientState>()((set) => ({
  localPlayer: null,
  client: null,
  setClient: client => set(state => {
    const localPlayer = client.game.players.find(player => player.id === client.yourPlayerId);

    return {
      ...state,
      client,
      localPlayer: localPlayer ? {
        ...localPlayer,
        position: state.localPlayer?.position ?? localPlayer.position,
        rotation: state.localPlayer?.rotation ?? localPlayer.rotation,
        animation: state.localPlayer?.animation ?? localPlayer.animation,
      } : null,
    };
  }),
  updatePlayer: ({ id, position, rotation, animation }) => set(state => {
    if(!state.client) return state;

    const localPlayer = state.client.game.players.find(player => player.id === id);

    if(!localPlayer) return state;

    return {
      ...state,
      localPlayer: {
        ...localPlayer,
        position: position ?? localPlayer.position,
        rotation: rotation ?? localPlayer.rotation,
        animation: animation ?? localPlayer.animation,
      }
    };
  }),
  localPlayerHandle: null,
  setLocalPlayerHandle: localPlayerHandle => set(state => ({ ...state, localPlayerHandle })),
  removeLocalPlayerHandle: () => set(state => ({ ...state, localPlayerHandle: null })),
}))