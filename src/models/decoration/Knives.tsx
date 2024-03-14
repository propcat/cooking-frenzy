import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';

export const Knives = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('models/decoration/knives.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group {...props} dispose={null}>
      <mesh geometry={(nodes.Environment_KitchenKnives as any).geometry} material={toonMaterials.Atlas} />
    </group>
  )
})

useGLTF.preload('models/decoration/knives.glb', 'draco/');