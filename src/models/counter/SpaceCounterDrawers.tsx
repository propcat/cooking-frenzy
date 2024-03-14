import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';

export const SpaceCounterDrawers = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('models/counter/space_counter_drawers.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh  geometry={(nodes.Environment_Counter_Drawers as any).geometry} material={toonMaterials.Atlas}/>
    </group>
  )
})

useGLTF.preload('models/counter/space_counter_drawers.glb', 'draco/');