import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';

export const Plant2 = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('models/decoration/plant_2.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group {...props} dispose={null}>
      <mesh geometry={(nodes.Decoration_Plant2 as any).geometry} material={toonMaterials.Atlas} />
    </group>
  )
})

useGLTF.preload('models/decoration/plant_2.glb', 'draco/');