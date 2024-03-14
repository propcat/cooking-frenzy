import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';

export const Platform2x2 = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('models/floor/platform_2x2.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group scale={5} ref={ref} {...props} dispose={null}>
      <mesh geometry={(nodes.Cube as any).geometry} material={toonMaterials.Texture_Signs}/>
      <mesh geometry={(nodes.Cube_1 as any).geometry} material={toonMaterials.PaletteMaterial001}/>
    </group>
  )
})

useGLTF.preload('models/floor/platform_2x2.glb', 'draco/');