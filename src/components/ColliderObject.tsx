import { useEffect } from 'react';
import type { Position } from '@mytypes/Position';
import { useColliderStore } from '@stores/ColliderStore';
import { Matrix3 } from 'three';
import { Collider } from '@mytypes/Collider';

interface Props {
  id: string,
  position: Position,
  matrix: Matrix3,
  collider: Collider,
  showWireframe?: boolean,
}

export function ColliderObject({ id, position, matrix, collider: { boundingBox, offset, ground }, showWireframe }: Props) {
  const registerCollider = useColliderStore(state => state.registerCollider);
  const unregisterCollider = useColliderStore(state => state.unregisterCollider);

  useEffect(() => {
    registerCollider(id, {...position}, {...boundingBox}, matrix.clone(), offset ? {...offset} : undefined, ground);
  
    return () => {
      unregisterCollider(id);
    }
  }, [position, matrix, boundingBox, offset, ground])

  if(showWireframe) return (
    <mesh position={[offset?.x ?? 0, offset?.y ?? 0, offset?.z ?? 0]}>
      <boxBufferGeometry args={[boundingBox.x * 2, boundingBox.y * 2, boundingBox.z * 2]}/>
      <meshStandardMaterial wireframe/>
    </mesh>
  )

  return null;
}