import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';

export const StreetStraight = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('models/floor/street_straight.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group ref={ref} {...props} dispose={null} scale={25}>
      <mesh geometry={(nodes.Cube003 as any).geometry} material={toonMaterials.Grey}/>
      <mesh geometry={(nodes.Cube003_1 as any).geometry} material={toonMaterials.Black}/>
      <mesh geometry={(nodes.Cube003_2 as any).geometry} material={toonMaterials.White}/>
    </group>
  )
})

useGLTF.preload('models/floor/street_straight.glb', 'draco/');