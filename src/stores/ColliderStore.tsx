import { create } from 'zustand'
import type { Position } from '@mytypes/Position';
import { BoundingBox } from '@mytypes/BoundingBox';
import { Matrix3, Matrix4 } from 'three';
import { Rotation } from '@mytypes/Rotation';
import { nanoid } from 'nanoid';

type Collider = { position: Position, boundingBox: BoundingBox, matrix: Matrix3, offset?: Position, ground?: boolean };
type Colliders = { [key: string]: Collider };

interface ColliderState {
  colliders: Colliders,
  registerCollider: (id: string, position: Position, boundingBox: BoundingBox, matrix: Matrix3, offset?: Position, ground?: boolean) => void,
  unregisterCollider: (id: string) => void,
}

export const useColliderStore = create<ColliderState>()((set) => ({
  colliders: {},
  registerCollider: (id: string, position: Position, boundingBox: BoundingBox, matrix: Matrix3, offset?: Position, ground?: boolean) => set(state => {
    const colliders = { ...state.colliders };

    colliders[id] = { position, boundingBox, matrix, offset, ground };

    return { ...state, colliders };
  }),
  unregisterCollider: (id: string) => set(state => {
    const keys = Object.keys(state.colliders);

    const colliders: Colliders = {};

    for(const key of keys) {
      if(key === id) continue;

      colliders[key] = state.colliders[key];
    }

    return { ...state, colliders };
  }),
}))

/*
  This code turned out to be a major flop and dissapointment.

  function mergeColliders(colliders: Colliders): Colliders {
    let mergedColliders: ({ ids: string[] } & Collider)[] = [];

    for(const colliderId of Object.keys(colliders)) {
      const collider = colliders[colliderId];
      
      for(const otherColliderId of Object.keys(colliders)) {
        if(colliderId === otherColliderId) continue;
        const otherCollider = colliders[otherColliderId];

        if(collider.ground !== otherCollider.ground) continue;
        if(!boundingBoxesEqual(collider.boundingBox, otherCollider.boundingBox)) continue;
        if(!collider.matrix.equals(otherCollider.matrix)) continue; // No clue if this will work correctly
        if(!offsetsEqual(collider.offset, otherCollider.offset)) continue;
        
        const boundingBox = collider.boundingBox;

        const mergedColliderIndex = mergedColliders.findIndex(colliders => colliders.ids.includes(otherColliderId));

        if(collider.position.x === otherCollider.position.x + boundingBox.x && collider.position.y === otherCollider.position.y && collider.position.z === otherCollider.position.z) {
          if(mergedColliderIndex < 0) {
            mergedColliders.push({
              ...otherCollider,
              ids: [colliderId, otherColliderId],
              boundingBox: { ...boundingBox, x: boundingBox.x * 2 },
            })
          } else {
            const mergedCollider = mergedColliders[mergedColliderIndex];
            
            mergedColliders[mergedColliderIndex] = {
              ...mergedCollider,
              ids: [...mergedCollider.ids, colliderId],
              boundingBox: { ...mergedCollider.boundingBox, x: mergedCollider.boundingBox.x + boundingBox.x },
            }
          }
          break;
        }

        if(collider.position.x === otherCollider.position.x && collider.position.y === otherCollider.position.y + boundingBox.y && collider.position.z === otherCollider.position.z) {
          if(mergedColliderIndex < 0) {
            mergedColliders.push({
              ...otherCollider,
              ids: [colliderId, otherColliderId],
              boundingBox: { ...boundingBox, y: boundingBox.y * 2 },
            })
          } else {
            const mergedCollider = mergedColliders[mergedColliderIndex];
            
            mergedColliders[mergedColliderIndex] = {
              ...mergedCollider,
              ids: [...mergedCollider.ids, colliderId],
              boundingBox: { ...mergedCollider.boundingBox, y: mergedCollider.boundingBox.y + boundingBox.y },
            }
          }
          break;
        }

        if(collider.position.x === otherCollider.position.x && collider.position.y === otherCollider.position.y && collider.position.z === otherCollider.position.z + boundingBox.z) {
          if(mergedColliderIndex < 0) {
            mergedColliders.push({
              ...otherCollider,
              ids: [colliderId, otherColliderId],
              boundingBox: { ...boundingBox, z: boundingBox.z * 2 },
            })
          } else {
            const mergedCollider = mergedColliders[mergedColliderIndex];
            
            mergedColliders[mergedColliderIndex] = {
              ...mergedCollider,
              ids: [...mergedCollider.ids, colliderId],
              boundingBox: { ...mergedCollider.boundingBox, z: mergedCollider.boundingBox.z + boundingBox.z },
            }
          }
          break;
        }
      }
    }

    const newColliders: Colliders = { };

    for(const colliderId of Object.keys(colliders)) {
      if(mergedColliders.find(mergedCollider => mergedCollider.ids.includes(colliderId))) continue;

      newColliders[colliderId] = colliders[colliderId];
    }
    
    for(const { ids, ...collider } of mergedColliders) {
      const id = nanoid();

      newColliders[id] = collider;
    }

    return newColliders;
  }

  const boundingBoxesEqual = (boundingBox1: BoundingBox, boundingBox2: BoundingBox) => boundingBox1.x === boundingBox2.x && boundingBox1.y === boundingBox2.y && boundingBox1.z === boundingBox2.z;

  function offsetsEqual(offset1?: Position, offset2?: Position) {
    if((!offset1 && offset2) || (offset1 && !offset2)) return false;
    if(!offset1 && !offset2) return false;

    return offset1!.x === offset2!.x && offset1!.y === offset2!.y && offset1!.z === offset2!.z;
  }

*/