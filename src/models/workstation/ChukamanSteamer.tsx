import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';
import { Ingredient } from '@mytypes/Ingredient';
import { Food } from '@mytypes/Food';
import { ObjectOutline } from '@components/ObjectOutline';
import { UtensilProps } from '@models/utensil/UtensilProps';

interface Props {
  item?: Ingredient | Food,
  outline?: boolean,
}

export const ChukamanSteamer = forwardRef<Group, GroupProps & UtensilProps>(({ item, outline, ...props }, ref) => {
  const { nodes, materials } = useGLTF('models/utensil/chukaman_steamer.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={(nodes.ChukamanSteamer_Lid as any).geometry} material={toonMaterials.Atlas} position={[0.084, 0.426, 0]}>
        <ObjectOutline outline={outline}/>
      </mesh>
    </group>
  )
})

useGLTF.preload('models/utensil/chukaman_steamer.glb', 'draco/');