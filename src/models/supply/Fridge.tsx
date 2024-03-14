import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';
import { SupplyProps } from '@models/supply/SupplyProps';
import { ObjectOutline } from '@components/ObjectOutline';

export const Fridge = forwardRef<Group, GroupProps & SupplyProps>(({ outline, ...props }, ref) => {
  const { nodes, materials } = useGLTF('models/supply/fridge.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={(nodes.Environment_Fridge as any).geometry} material={toonMaterials.Atlas}>
        <ObjectOutline outline={outline}/>
      </mesh>
    </group>
  )
})

useGLTF.preload('models/supply/fridge.glb', 'draco/');