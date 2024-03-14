import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import { Vector3 } from 'three';
import type { PlayerModelHandle } from '@models/player/PlayerModelHandle';
import type { Player } from '@mytypes/Player';
import type { Position } from '@mytypes/Position';
import { useJoystickStore } from '@stores/JoystickStore';
import { useClientStore } from '@stores/ClientStore';
import { GameData } from '@gamedata';
import { useColliding } from '@hooks/useColliding';
import { degToRad } from 'three/src/math/MathUtils';

const MOVEMENT_SPEED = 9;
const ROTATION_SPEED = 16;

export function useLocalPlayerMovement(player: Player | null, handle: PlayerModelHandle | null) {
  const players = useClientStore(state => state.client?.players);
  const level = useClientStore(state => state.client?.game.level);

  const joystickState = useJoystickStore(state => state.state);
  const isColliding = useColliding();

  useEffect(() => {
    if(!handle?.group || !player || !players || !level) return;
    
    const playerIndex = Object.keys(players).findIndex(id => id === player.id);

    if(playerIndex < 0) return;

    const spawn = GameData.levels[level.levelIndex].spawn;

    let initialPosition: Position | null = null;

    if(Array.isArray(spawn)) initialPosition = spawn[playerIndex];
    else initialPosition = spawn;

    handle.group.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
  }, [handle?.group?.id, level?.levelIndex, player?.id, level?.startedAt])

  useFrame((state, delta) => {
    if(!player || !handle || !handle?.group) return;

    const { group } = handle;

    let currentPosition = group.position;

    const movementSpeed = MOVEMENT_SPEED * delta;

    if(joystickState.active) {
      const { colliding: wasColliding } = isColliding(currentPosition);

      const position = new Vector3(currentPosition.x + joystickState.x * movementSpeed, currentPosition.y, currentPosition.z + joystickState.y * -1 * movementSpeed);
      const lookPosition = new Vector3(currentPosition.x + joystickState.x, currentPosition.y, currentPosition.z + joystickState.y * -1);

      const oldQuaternion = group.quaternion.clone();
      group.lookAt(lookPosition);
      const newQuaternion = group.quaternion.clone();

      const rotationSpeed = ROTATION_SPEED * delta;
      const slerpQuaternion = oldQuaternion.slerp(newQuaternion, rotationSpeed);
      
      group.quaternion.set(slerpQuaternion.x, slerpQuaternion.y, slerpQuaternion.z, slerpQuaternion.w);
      
      const { colliding, grounded } = isColliding(position);

      if((wasColliding && colliding && grounded) || (grounded && !colliding)) {
        group.position.set(position.x, position.y, position.z);
      }
    }
  })

  useFrame((state, delta) => {
    if(!handle || !handle.group) return;

    const { group } = handle;
    
    const currentPosition = group.position;

    const cameraPos: Vector3 = state.camera.position.clone();
    const playerPos: Vector3 = new Vector3(currentPosition.x, currentPosition.y + 10, currentPosition.z + 12);
    const newPos: Vector3 = cameraPos.lerp(playerPos, delta * 10);

    state.camera.position.set(newPos.x, newPos.y, newPos.z);

    state.camera.rotation.set(degToRad(-40), degToRad(0), degToRad(0));
  })
}