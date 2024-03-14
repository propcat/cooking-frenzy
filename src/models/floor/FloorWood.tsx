import { forwardRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group, MeshBasicMaterial, MeshToonMaterial } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';

export const FloorWood = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('models/floor/floor_wood.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={(nodes.Floor_Wood as any).geometry} material={toonMaterials.Atlas}/>
    </group>
  )
})

useGLTF.preload('models/floor/floor_wood.glb', 'draco/');