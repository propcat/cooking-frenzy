import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';

export const CabinetDoors = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('models/cabinet/cabinet_doors.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group {...props} dispose={null}>
      <mesh geometry={(nodes.Environment_Cabinet_Doors as any).geometry} material={toonMaterials.Atlas}/>
    </group>
  )
})

useGLTF.preload('models/cabinet/cabinet_doors.glb', 'draco/');