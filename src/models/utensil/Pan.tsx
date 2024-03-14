import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';
import { UtensilProps } from '@models/utensil/UtensilProps';
import { ObjectOutline } from '@components/ObjectOutline';

export const Pan = forwardRef<Group, GroupProps & UtensilProps>(({ item, outline, ...props }, ref) => {
  const { nodes, materials } = useGLTF('models/utensil/pan.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh  geometry={(nodes.Environment_Pan as any).geometry} material={toonMaterials.Atlas}>
        <ObjectOutline outline={outline}/>
      </mesh>
    </group>
  )
})

useGLTF.preload('models/utensil/pan.glb', 'draco/');