import { Position } from '@mytypes/Position';
import { useColliderStore } from '@stores/ColliderStore';
import { Vector3, Box3 } from 'three';
import { OBB } from 'three/examples/jsm/math/OBB';

export function useColliding() {
  const colliders = useColliderStore(state => state.colliders);

  function isColliding(position: Position): { colliding: string | null, grounded: string | null } {
    let colliding: string | null = null;
    let grounded: string | null = null;

    const feet: Vector3 = new Vector3(position.x, position.y, position.z);
    const torso: Vector3 = new Vector3(position.x, position.y + 1.5, position.z);
    const head: Vector3 = new Vector3(position.x, position.y + 3, position.z);

    for(const colliderId of Object.keys(colliders)) {
      const collider = colliders[colliderId];

      const offset = new Vector3(collider.offset?.x ?? 0, collider.offset?.y ?? 0, collider.offset?.z ?? 0).applyMatrix3(collider.matrix);
      const center = new Vector3(collider.position.x + offset.x, collider.position.y + offset.y, collider.position.z + offset.z);
      const halfSize = new Vector3(collider.boundingBox.x, collider.boundingBox.y, collider.boundingBox.z);
      const obb = new OBB(center, halfSize, collider.matrix);

      if(obb.containsPoint(feet) || obb.containsPoint(torso) || obb.containsPoint(head)) {
        if(collider.ground) grounded = colliderId;
        else colliding = colliderId;
      }

      if(grounded && colliding) break;
    }

    return { colliding, grounded };
  }

  return isColliding;
}