import { useRef, useEffect } from 'react';
import { useClientStore } from '@stores/ClientStore';
import { Group, Vector3 } from 'three';
import type { PlayerModelHandle } from '@models/player/PlayerModelHandle';
import type { JoystickState } from '@mytypes/JoystickState';
import type { Player } from '@mytypes/Player';
import { useJoystickStore } from '@stores/JoystickStore';

export function useLocalPlayerMovementSync(player: Player | null, handle: PlayerModelHandle | null) {
  const joystickState = useJoystickStore(state => state.state);
  const updatePlayer = useClientStore(state => state.updatePlayer);

  const playerRef = useRef<Player | null>(player);
  const previousPlayerRef = useRef<Player | undefined>(undefined);
  const groupRef = useRef<Group | null | undefined>(handle?.group);
  const joystickStateRef = useRef<JoystickState>(joystickState);

  useEffect(() => { playerRef.current = player }, [player]);
  useEffect(() => { groupRef.current = handle?.group }, [handle?.group]);
  useEffect(() => { joystickStateRef.current = joystickState }, [joystickState]);

  useEffect(() => {
    function onLocalInterval() {
      const player = playerRef.current;
      const group = groupRef.current;
      const joystickState = joystickStateRef.current;

      if(!player || !group) return;

      const position = group.position;
      const quaternion = group.quaternion;

      updatePlayer({
        id: player.id,
        position: { x: position.x, y: position.y, z: position.z },
        rotation: { x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w },
        animation: player.carry ? (joystickState.active ? 'Run_Holding' : 'Idle_Holding') : (joystickState.active ? 'Run' : 'Idle'),
      });
    }

    function onOnlineInterval() {
      const player = playerRef.current;
      const previousPlayer = previousPlayerRef.current;

      if(!player) return;
      
      if(previousPlayer) {
        if(previousPlayer.position.x === player.position.x && previousPlayer.position.y === player.position.y && previousPlayer.position.z === player.position.z) {
          if(previousPlayer.rotation.x === player.rotation.x && previousPlayer?.rotation.y === player.rotation.y && previousPlayer.rotation.z === player.rotation.z) {
            if(previousPlayer.animation === player.animation) {
              return;
            }
          }
        }
      }

      previousPlayerRef.current = { ...player };

      Rune.actions.updatePlayer({
        position: {
          x: Math.floor(player.position.x * 100) / 100,
          y: Math.floor(player.position.y * 100) / 100,
          z: Math.floor(player.position.z * 100) / 100,
        },
        rotation: {
          x: Math.floor(player.rotation.x * 100) / 100,
          y: Math.floor(player.rotation.y * 100) / 100,
          z: Math.floor(player.rotation.z * 100) / 100,
          w: Math.floor(player.rotation.w * 100) / 100,
        },
        animation: player.animation,
      });
    }

    const localInterval = setInterval(onLocalInterval, 50);
    const onlineInterval = setInterval(onOnlineInterval, 115);

    return () => {
      clearInterval(localInterval);
      clearInterval(onlineInterval);
    }
  }, [])
}