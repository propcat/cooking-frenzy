import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { Group, Vector3 } from 'three';
import type { Ingredient } from '@mytypes/Ingredient';
import type { Food } from '@mytypes/Food';
import type { Position } from '@mytypes/Position';
import type { Supply } from '@mytypes/Supply';
import { Fridge } from '@models/supply/Fridge';
import { useLocalPlayer } from '@utilities/useLocalPlayer';
import { useSupplyStore } from '@stores/SupplyStore';
import { useClosestInteraction } from '@providers/ClosestInteractionProvider';
import { useObjectUUID } from '@hooks/useObjectUUID';
import { GroupProps } from '@react-three/fiber';
import { vector3ToPosition } from '@utilities/vector3ToPosition';
import { getGroupWorldPosition } from '@utilities/getGroupWorldPosition';
import { useWorldPositionChangeTracker } from '@hooks/useWorldPositionChangeTracker';

interface Props {
  supply: Supply,
  content: (Ingredient | Food)[],
  dynamic?: boolean,
}

export function SupplyObject({ supply, content, dynamic, ...props }: GroupProps & Props) {
  const supplyId = useObjectUUID();

  const registerSupply = useSupplyStore(state => state.registerSupply);
  const unregisterSupply = useSupplyStore(state => state.unregisterSupply);

  const ref = useRef<Group>(null);
  
  const tracker = useWorldPositionChangeTracker(ref.current);

  useEffect(() => {
    if(!ref.current) return;

    const { position } = getGroupWorldPosition(ref.current);

    registerSupply(supplyId, position, content);

    return () => {
      unregisterSupply(supplyId);
    }
  }, [ref.current, content, tracker])

  const localPlayer = useLocalPlayer();
  const { closestSupply } = useClosestInteraction();

  const outline = useMemo<boolean>(() => closestSupply?.id === supplyId && !localPlayer?.carry, [supplyId, closestSupply, localPlayer?.carry]);

  if(supply === 'fridge') return <Fridge outline={outline} ref={ref} {...props}/>

  return null;
}