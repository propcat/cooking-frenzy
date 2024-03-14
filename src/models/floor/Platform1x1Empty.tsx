import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';

export const Platform1x1Empty = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('models/floor/platform_1x1_empty.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group scale={5} ref={ref} {...props} dispose={null}>
      <mesh geometry={(nodes.Cube100 as any).geometry} material={toonMaterials.Grey}/>
      <mesh geometry={(nodes.Cube100_1 as any).geometry} material={toonMaterials.LightGrey}/>
      <mesh geometry={(nodes.Cube100_2 as any).geometry} material={toonMaterials.Texture_Signs}/>
    </group>
  )
})

useGLTF.preload('models/floor/platform_1x1_empty.glb', 'draco/');