import { useFrame } from '@react-three/fiber';
import { Vector3, Quaternion } from 'three';
import type { PlayerModelHandle } from '@models/player/PlayerModelHandle';
import type { Player } from '@mytypes/Player';

const MOVEMENT_SPEED = 7.5;
const ROTATION_SPEED = 7.5;

export function useOnlinePlayerMovement(player: Player, handle: PlayerModelHandle | null) {
  useFrame((_, delta) => {
    if(!handle || !handle.group) return;

    const { group } = handle;

    const movementSpeed = MOVEMENT_SPEED * delta;

    const position = new Vector3(player.position.x, player.position.y, player.position.z);

    const lerpPosition = group.position.lerp(position, movementSpeed);
    
    const rotationSpeed = ROTATION_SPEED * delta;

    const quaternion = group.quaternion.clone();
    const lerpQuaternion = quaternion.slerp(new Quaternion(player.rotation.x, player.rotation.y, player.rotation.z, player.rotation.w), rotationSpeed);

    group.position.set(lerpPosition.x, lerpPosition.y, lerpPosition.z);
    group.quaternion.set(lerpQuaternion.x, lerpQuaternion.y, lerpQuaternion.z, lerpQuaternion.w);
  })
}