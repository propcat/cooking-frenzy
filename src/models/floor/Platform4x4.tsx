import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';

export const Platform4x4 = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('models/floor/platform_4x4.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group scale={5} ref={ref} {...props} dispose={null}>
      <mesh geometry={(nodes.Cube099 as any).geometry} material={toonMaterials.Texture_Signs}/>
      <mesh geometry={(nodes.Cube099_1 as any).geometry} material={toonMaterials.PaletteMaterial001}/>
    </group>
  )
})

useGLTF.preload('models/floor/platform_4x4.glb', 'draco/');