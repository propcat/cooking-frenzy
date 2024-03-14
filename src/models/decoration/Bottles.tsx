import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';
import { GroupProps } from '@react-three/fiber';

export const Bottles = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('models/supply/bottles.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={(nodes.Environment_Bottles as any).geometry} material={toonMaterials.Atlas}/>
    </group>
  )
})

useGLTF.preload('models/supply/bottles.glb', 'draco/');