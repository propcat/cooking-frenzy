import { useFrame } from '@react-three/fiber';
import { useMemo } from 'react';
import { Vector3 } from 'three';
import { useSpectator } from '@providers/SpectatorProvider';
import { useClientStore } from '@stores/ClientStore';

export function SpectatorCamera() {
  const client = useClientStore(state => state.client);
  const { observedPlayerId } = useSpectator();

  const observedPlayer = useMemo(() => observedPlayerId ? client?.game.players.find(p => p.id === observedPlayerId) : null, [client?.game.players, observedPlayerId]);

  useFrame((state, delta) => {
    if(client?.yourPlayerId || !observedPlayer) return;

    const position = observedPlayer.position;
    
    const cameraPos: Vector3 = state.camera.position.clone();
    const playerPos: Vector3 = new Vector3(position.x, position.y + 10, position.z + 12);
    const newPos: Vector3 = cameraPos.lerp(playerPos, delta * 5);

    state.camera.position.set(newPos.x, newPos.y, newPos.z);

    state.camera.rotation.set(-0.7, 0, 0);
  })

  return null;
}