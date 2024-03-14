import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';
import { ObjectOutline } from '@components/ObjectOutline';
import { IngredientProps } from '@mytypes/IngredientProps';

export const Avocado = forwardRef<Group, GroupProps & IngredientProps>(({ outline, ...props }, ref) => {
  const { nodes, materials } = useGLTF('models/ingredient/avocado.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={(nodes.FoodIngredient_Avocado as any).geometry} material={toonMaterials.Atlas}>
        <ObjectOutline outline={outline}/>
      </mesh>
    </group>
  )
})

useGLTF.preload('models/ingredient/avocado.glb', 'draco/');