import { PathItem } from '@mytypes/PathItem';
import { Position } from '@mytypes/Position';
import { Box, Circle, Outlines, Sphere } from '@react-three/drei';
import { GroupProps, useFrame } from '@react-three/fiber';
import { useClientStore } from '@stores/ClientStore';
import { useThrowStore } from '@stores/ThrowStore';
import { calculateThrowPath } from '@utilities/calculateThrowPath';
import { positionToVector3 } from '@utilities/positionToVector3';
import { useLocalPlayer } from '@utilities/useLocalPlayer';
import { useMemo, useRef } from 'react';
import { Euler, Group, MeshPhongMaterial, Quaternion, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

export function ItemThrowPreviewObject(props: GroupProps) {
  const localPlayer = useClientStore(state => state.localPlayerHandle?.group);
  const yourPlayerId = useClientStore(state => state.client?.yourPlayerId);

  const ref = useRef<Group>(null);
  
  const angle = useThrowStore(state => state.angle);
  const force = useThrowStore(state => state.force);
  const preview = useThrowStore(state => state.preview);

  const previewPath = useMemo<PathItem[] | null>(() => {
    return calculateThrowPath({ x: 0.5, y: 1.5, z: 0 }, force, 30, 15).path;
  }, [force])

  useFrame((_, delta) => {
    if(!yourPlayerId || !localPlayer || !ref.current) return;

    const group = ref.current;

    const lerpSpeed = delta * 20;

    group.position.lerp(new Vector3(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z), lerpSpeed);

    const euler = new Euler();

    euler.setFromQuaternion(group.quaternion);

    const newEuler = new Euler(0, degToRad(angle - 90), 0);

    const slerpQuaternion = new Quaternion();

    slerpQuaternion.setFromEuler(newEuler);

    const slerpSpeed = delta * 10;

    group.quaternion.slerp(slerpQuaternion, slerpSpeed);
  })

  return (
    <group ref={ref} {...props}>
      {previewPath?.map(({ point }, index) => (
        <Sphere
          scale={0.2}
          key={index}
          position={positionToVector3(point)}
        >
          <meshPhongMaterial opacity={0} transparent/>
          <Outlines opacity={preview ? 1 : 0} thickness={0.3} transparent color='#FFFFFF'/>
        </Sphere>
      ))}
    </group>
  )
}