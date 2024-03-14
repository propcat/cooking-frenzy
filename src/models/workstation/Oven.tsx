import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';
import { UtensilProps } from '@models/utensil/UtensilProps';
import { ObjectOutline } from '@components/ObjectOutline';
import { degToRad } from 'three/src/math/MathUtils';
import { Pan } from '@models/utensil/Pan';
import { Pot1Empty } from '@models/utensil/Pot1Empty';
import { Pot2Empty } from '@models/utensil/Pot2Empty';
import { Pot1Filled } from '@models/utensil/Pot1Filled';
import { Pot2Filled } from '@models/utensil/Pot2Filled';

export const Oven = forwardRef<Group, GroupProps & UtensilProps>(({ item, outline, utensil, cooking, ...props }, ref) => {
  const { nodes, materials } = useGLTF('models/utensil/oven.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);
  
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={(nodes.Environment_Oven as any).geometry} material={toonMaterials.Atlas}>
        <ObjectOutline outline={outline}/>
      </mesh>

      {utensil?.type === 'pan' && <Pan outline={outline} position={[0, 2.2, 0.25]}/>}

      {utensil?.type === 'pot_1' && !((utensil?.content.length ?? 0) > 0) && <Pot1Empty outline={outline} position={[0, 2.2, 0.25]} rotation={[0, degToRad(180), 0]}/>}
      {utensil?.type === 'pot_1' && (utensil?.content.length ?? 0) > 0 && <Pot1Filled outline={outline} position={[0, 2.2, 0.25]} rotation={[0, degToRad(180), 0]}/>}
      
      {utensil?.type === 'pot_2' && !((utensil?.content.length ?? 0) > 0) && <Pot2Empty outline={outline} position={[0, 2.2, 0.25]} rotation={[0, degToRad(180), 0]}/>}
      {utensil?.type === 'pot_2' && (utensil?.content.length ?? 0) > 0 && <Pot2Filled outline={outline} position={[0, 2.2, 0.25]} rotation={[0, degToRad(180), 0]}/>}
    </group>
  )
})

useGLTF.preload('models/utensil/oven.glb', 'draco/');