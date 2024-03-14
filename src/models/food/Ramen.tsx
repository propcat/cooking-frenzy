import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';
import { FoodProps } from '@mytypes/FoodProps';
import { ObjectOutline } from '@components/ObjectOutline';

export const Ramen = forwardRef<Group, GroupProps & FoodProps>(({ outline, ...props }, ref) => {
  const { nodes, materials } = useGLTF('models/food/ramen.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={(nodes.Food_Ramen as any).geometry} material={toonMaterials.Atlas}>
        <ObjectOutline outline={outline}/>
      </mesh>
    </group>
  )
})

useGLTF.preload('models/food/ramen.glb', 'draco/');