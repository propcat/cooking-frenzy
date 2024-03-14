import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';
import { ObjectOutline } from '@components/ObjectOutline';
import { FoodProps } from '@mytypes/FoodProps';

export const SalmonNigiri = forwardRef<Group, GroupProps & FoodProps>(({ outline, ...props}, ref) => {
  const { nodes, materials } = useGLTF('models/food/salmon_nigiri.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={(nodes.Food_SalmonNigiri as any).geometry} material={toonMaterials.Atlas}>
        <ObjectOutline outline={outline}/>
      </mesh>
    </group>
  )
})

useGLTF.preload('models/food/salmon_nigiri.glb', 'draco/');