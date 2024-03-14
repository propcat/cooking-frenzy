import { useRef, forwardRef, useEffect, useMemo, useState, useLayoutEffect } from 'react';
import { useGLTF, useAnimations, Html } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useClientStore } from '@stores/ClientStore';
import { useLocalPlayer } from '@utilities/useLocalPlayer';
import { PlayerAnimation } from '@mytypes/PlayerAnimation';

export const Panda = forwardRef<Group, GroupProps>(({ children, ...props }, ref) => {
  const groupRef = useRef<Group>(null);

  const { nodes, materials, animations } = useGLTF('models/character/panda.glb', 'draco/');
  
  const { actions, mixer } = useAnimations(animations as any, groupRef as any);

  const orders = useClientStore(store => store.client?.game.orders);
  const localPlayer = useLocalPlayer();

  const nearby = useMemo(() => {
    const position = groupRef.current?.position;

    if(!position) return false;

    const maxDistance = 12;

    const localPlayerVectorPosition = new Vector3(localPlayer?.position.x, localPlayer?.position.y, localPlayer?.position.z);
    const groupVectorPosition = new Vector3(position.x, position.y, position.z);

    const distance = localPlayerVectorPosition.distanceTo(groupVectorPosition);

    return distance < maxDistance;
  }, [localPlayer?.position])

  const carry = useMemo<boolean>(() => !!localPlayer?.carry, [localPlayer?.carry]);

  const carryOrder = useMemo<boolean>(() => localPlayer?.carry === 'item' && !!(orders?.find(order => order.food === localPlayer?.item)), [orders, localPlayer]);

  const [lastAnimation, setLastAnimation] = useState<PlayerAnimation | null>(null);

  useEffect(() => {
    if(nearby && carry) {
      if(carryOrder) {
        if(lastAnimation === 'Yes') return;
        
        const animation: PlayerAnimation = 'Yes';
        mixer.stopAllAction();
        actions[animation]?.play();

        setLastAnimation('Yes');
      } else {
        if(lastAnimation === 'No') return;

        const animation: PlayerAnimation = 'No';
        mixer.stopAllAction();
        actions[animation]?.play();

        setLastAnimation('No');
      }
    } else {
      if(lastAnimation === 'Idle') return;

      const animation: PlayerAnimation = 'Idle';
      mixer.stopAllAction();
      actions[animation]?.play();

      setLastAnimation('Idle');
    }
  }, [nearby, carry, carryOrder, actions, mixer])

  const toonMaterials = useToonMaterials(materials);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
        </group>
        <skinnedMesh name="Headband" geometry={(nodes.Headband as any).geometry} material={toonMaterials.Atlas} skeleton={(nodes.Headband as any).skeleton}/>
        <skinnedMesh name="Panda" geometry={(nodes.Panda as any).geometry} material={toonMaterials.Atlas} skeleton={(nodes.Panda as any).skeleton}/>
      </group>
      {children}
      <Html
        zIndexRange={[90, 0]}
        as='div'
        center
        transform
        sprite
        position={[ 0, 4.5, 0 ]}
      >
        <AnimatePresence>
          {orders && orders.length > 0 && (
            <BubbleContainer
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >  
              <Bubble layout transition={{ duration: 0.1 }}>
                {orders?.map((order, index) => (
                  <Image
                    key={index}
                    src={`previews/${order.food}.webp`}
                  />
                ))}
              </Bubble>
            </BubbleContainer>
          )}
        </AnimatePresence>
      </Html>
    </group>
  )
})

const BubbleContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`

const Bubble = styled(motion.div)`
  min-width: 48px;
  height: 48px;
  background-color: #FFF;
  border-radius: 16px;
  display: flex;
  gap: 16px;
  padding: 8px;
`

const Image = styled(motion.img)`
  height: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  filter: saturate(1.25) brightness(1.25) ;
`

useGLTF.preload('models/character/panda.glb', 'draco/');