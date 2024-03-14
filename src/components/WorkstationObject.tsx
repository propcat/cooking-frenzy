import { GroupProps } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Group, Vector3 } from 'three';
import { Ingredient } from '@mytypes/Ingredient';
import { Food } from '@mytypes/Food';
import { Counter } from '@models/workstation/Counter';
import { Workstation } from '@mytypes/Workstation';
import { ChukamanSteamer } from '@models/workstation/ChukamanSteamer';
import { CuttingTable } from '@models/workstation/CuttingTable';
import { Oven } from '@models/workstation/Oven';
import { CounterWorkstation, IndependentWorkstation, WorkstationState } from '@mytypes/WorkstationState';
import { useClientStore } from '@stores/ClientStore';
import { useClosestInteraction } from '@providers/ClosestInteractionProvider';
import { useWorkstationStore } from '@stores/WorkstationStore';
import { WorkstationCounter } from '@mytypes/WorkstationCounter';
import { useObjectUUID } from '@hooks/useObjectUUID';
import { getGroupWorldPosition } from '@utilities/getGroupWorldPosition';
import { CounterCorner } from '@models/counter/CounterCorner';
import { CounterDoors } from '@models/counter/CounterDoors';
import { CounterDrawers } from '@models/counter/CounterDrawers';
import { CounterEnd } from '@models/counter/CounterEnd';
import { CounterSink } from '@models/counter/CounterSink';
import { CounterStraight } from '@models/counter/CounterStraight';
import { Box, Html } from '@react-three/drei';
import { Position } from '@mytypes/Position';
import { positionToVector3 } from '@utilities/positionToVector3';
import { AnimatePresence, progress, motion } from 'framer-motion';
import styled from 'styled-components';
import { useWorldPositionChangeTracker } from '@hooks/useWorldPositionChangeTracker';
import { stringToUtensil } from '@utilities/stringToUtensil';
import { useWorkstationState } from '@hooks/useWorkstationState';
import { SpaceCounterCorner } from '@models/counter/SpaceCounterCorner';
import { SpaceCounterDoors } from '@models/counter/SpaceCounterDoors';
import { SpaceCounterDrawers } from '@models/counter/SpaceCounterDrawers';
import { SpaceCounterEnd } from '@models/counter/SpaceCounterEnd';
import { SpaceCounterSink } from '@models/counter/SpaceCounterSink';
import { SpaceCounterStraight } from '@models/counter/SpaceCounterStraight';

interface Props {
  state: WorkstationState,
  dynamic?: boolean,
}

export function WorkstationObject({ state: { id: workstationId, type: workstation, counterType, disabled }, dynamic, ...props }: GroupProps & Props) {
  const registerWorkstation = useWorkstationStore(state => state.registerWorkstation);
  const unregisterWorkstation = useWorkstationStore(state => state.unregisterWorkstation);
  
  const ref = useRef<Group>(null);
  
  const tracker = useWorldPositionChangeTracker(ref.current);

  useEffect(() => {
    if(!ref.current || disabled) return;

    const { position } = getGroupWorldPosition(ref.current);

    registerWorkstation(workstationId, workstation, position);

    return () => {
      unregisterWorkstation(workstationId);
    }
  }, [ref.current, workstation, counterType, disabled, tracker])

  const { closestSupply, closestWorkstation } = useClosestInteraction();

  const localPlayer = useClientStore(state => state.localPlayer);

  const outline = useMemo(() => workstationId === closestWorkstation?.id && (!closestSupply || !!localPlayer?.carry), [workstationId, closestWorkstation?.id, closestSupply?.id, localPlayer?.carry]);

  const { items, item, utensil, progress } = useWorkstationState(workstationId);

  return (
    <group ref={ref} {...props}>
      { counterType === 'counter_corner' && <CounterCorner/> }
      { counterType === 'counter_doors' && <CounterDoors/> }
      { counterType === 'counter_drawers' && <CounterDrawers/> }
      { counterType === 'counter_end' && <CounterEnd/> }
      { counterType === 'counter_sink' && <CounterSink/> }
      { counterType === 'counter_straight' && <CounterStraight/> }

      { counterType === 'space_counter_corner' && <SpaceCounterCorner/> }
      { counterType === 'space_counter_doors' && <SpaceCounterDoors/> }
      { counterType === 'space_counter_drawers' && <SpaceCounterDrawers/> }
      { counterType === 'space_counter_end' && <SpaceCounterEnd/> }
      { counterType === 'space_counter_sink' && <SpaceCounterSink/> }
      { counterType === 'space_counter_straight' && <SpaceCounterStraight/> }

      { workstation === 'chukaman_steamer' && <ChukamanSteamer outline={outline} item={item} utensil={utensil} position={[0, 2, 0]}/> }
      { workstation === 'cutting_table' && <CuttingTable outline={outline} item={item} utensil={utensil}/> }
      { workstation === 'oven' && <Oven outline={outline} item={item} utensil={utensil}/> }
      { (workstation === 'counter' || workstation === 'adjunct') && <Counter outline={outline} item={item} utensil={utensil}/> }

      <Bubble workstation={workstation} outline={outline} items={items} progress={progress}/>
    </group>
  )
}

interface BubbleProps {
  workstation: Workstation,
  outline?: boolean,
  items: (Ingredient | Food)[],
  progress: number,
}

function Bubble({ workstation, outline, items, progress }: BubbleProps) {
  const htmlPosition = useMemo<Position>(() => {
    if(workstation === 'oven') return { x: 0, y: 4.5, z: 0.25 };

    return { x: 0, y: 4, z: 0 };
  }, [workstation])
  
  if(items.length > 0 || outline) return (
    <Html
      zIndexRange={outline ? [91, 99] : [90, 0]}
      as='div'
      center
      transform
      sprite
      position={[ htmlPosition.x, htmlPosition.y, htmlPosition.z ]}
    >
      <AnimatePresence>
        {items.length > 0 && (
          <BubbleContainer
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <BubbleContent layout transition={{ duration: 0.1 }} outline={outline}>
              {items.map((item, index) => (
                <BubbleImage
                  key={index}
                  src={`previews/${item}.webp`}
                />
              ))}
            </BubbleContent>
            <AnimatePresence>
              { progress === 0 || progress === 1 || (
                <BubbleProgressBar
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div animate={{ width: `${progress * 100}%` }}/>
                </BubbleProgressBar>
              )}
            </AnimatePresence>
          </BubbleContainer>
        )}
      </AnimatePresence>
    </Html>
  )

  return null;
}

const BubbleContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`

const BubbleContent = styled(motion.div)<{ outline?: boolean }>`
  min-width: 48px;
  height: 48px;
  background-color: #FFF;
  border-radius: 16px;
  display: flex;
  gap: 16px;
  padding: 8px;
  ${props => props.outline ? `outline: 2px solid #646464;` : ''}
`

const BubbleImage = styled(motion.img)`
  height: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  filter: saturate(1.25) brightness(1.25) ;
`

const BubbleProgressBar = styled(motion.div)`
  position: relative;
  width: calc(100% - 4px);
  height: 5px;
  background-color: #FFFFFA;
  border-radius: 8px;
  overflow: hidden;

  & > div {
    position: absolute;
    width: 0;
    height: 100%;
    background-color: #452fab;
    border-radius: 8px;
  }
`