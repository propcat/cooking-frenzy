import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';
import { ObjectOutline } from '@components/ObjectOutline';
import { UtensilProps } from '@models/utensil/UtensilProps';

export const Pot2Filled = forwardRef<Group, GroupProps & UtensilProps>(({ item, outline, ...props }, ref) => {
  const { nodes, materials } = useGLTF('models/utensil/pot_2_filled.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={(nodes.Environment_Pot_2_Filled as any).geometry} material={toonMaterials.Atlas}>
        <ObjectOutline outline={outline}/>
      </mesh>
    </group>
  )
})

useGLTF.preload('models/utensil/pot_2_filled.glb', 'draco/');