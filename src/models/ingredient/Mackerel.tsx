import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';
import { IngredientProps } from '@mytypes/IngredientProps';
import { ObjectOutline } from '@components/ObjectOutline';

export const Mackerel = forwardRef<Group, GroupProps & IngredientProps>(({ outline, ...props }, ref) => {
  const { nodes, materials } = useGLTF('models/ingredient/mackerel.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={(nodes.FoodIngredient_Mackerel as any).geometry} material={toonMaterials.Atlas}>
        <ObjectOutline outline={outline}/>
      </mesh>
    </group>
  )
})

useGLTF.preload('models/ingredient/mackerel.glb', 'draco/');