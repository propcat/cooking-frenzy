import { useRef, forwardRef, useImperativeHandle } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { PlayerModelHandle } from '@models/player/PlayerModelHandle';
import { useToonMaterials } from '@utilities/useToonMaterials';
import { PlayerBadge } from '@components/PlayerBadge';
import { PlayerProps } from '@models/player/PlayerProps';

export const RabbitPurple = forwardRef<PlayerModelHandle, GroupProps & PlayerProps>(({ children, playerId, ...props }, ref) => {
  const groupRef = useRef<Group>(null);

  const { nodes, materials, animations } = useGLTF('models/player/rabbit_purple.glb', 'draco/');

  const { actions, mixer } = useAnimations(animations as any, groupRef as any);

  useImperativeHandle(ref, () => {
    return {
      group: groupRef.current,
      playAnimation(animation) {
        mixer.stopAllAction();
        actions[animation]?.play();
      },
    }
  })

  const toonMaterials = useToonMaterials(materials);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
        </group>
        { playerId && <PlayerBadge id={playerId}/> }
        <skinnedMesh name="Eyes" geometry={(nodes.Eyes as any).geometry} material={toonMaterials.Atlas} skeleton={(nodes.Eyes as any).skeleton}/>
        <skinnedMesh name="Hair" geometry={(nodes.Hair as any).geometry} material={toonMaterials.Atlas} skeleton={(nodes.Hair as any).skeleton}/>
        <skinnedMesh name="Rabbit" geometry={(nodes.Rabbit as any).geometry} material={toonMaterials.Atlas} skeleton={(nodes.Rabbit as any).skeleton}/>
      </group>
      {children}
    </group>
  )
})

useGLTF.preload('models/player/rabbit_purple.glb', 'draco/');