import { Position } from '@mytypes/Position';
import { useClientStore } from '@stores/ClientStore';
import { useMemo } from 'react';
import { Vector3 } from 'three';

type ObjectWithId = { id: string };

export function useClosestObject<T extends { position: Position }>(objects: {[key: string]: T}, maxDistance: number): (T & ObjectWithId) | null {
  const localPlayer = useClientStore(state => state.localPlayer);

  const closestObject = useMemo<(T & ObjectWithId) | null>(() => {
    if(!localPlayer) return null;

    let closestObject: (T & ObjectWithId) | null = null;
    let closestObjectDistance: number = Number.MAX_SAFE_INTEGER;

    const playerVectorPosition = new Vector3(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z);

    for(const objectId of Object.keys(objects)) {
      const object = objects[objectId];

      const objectVectorPosition = new Vector3(object.position.x, object.position.y, object.position.z);

      const distance = playerVectorPosition.distanceTo(objectVectorPosition);

      if(distance < closestObjectDistance) {
        closestObject = { ...object, id: objectId };
        closestObjectDistance = distance;
      }
    }

    if(closestObjectDistance > maxDistance) closestObject = null;

    return closestObject;
  }, [objects, localPlayer?.position])

  return closestObject;
} 