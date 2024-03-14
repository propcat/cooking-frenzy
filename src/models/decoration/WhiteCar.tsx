import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';

export const WhiteCar = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('models/decoration/white_car.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group {...props} dispose={null} scale={3}>
      <mesh geometry={(nodes.NormalCar1 as any).geometry} material={toonMaterials.PaletteMaterial001}/>
    </group>
  )
})

useGLTF.preload('models/decoration/white_car.glb', 'draco/');