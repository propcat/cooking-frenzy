import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';

export const WallNormalOpaque = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('models/wall/wall_normal.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials, 0.125);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={(nodes.Wall_Normal as any).geometry} material={toonMaterials.Atlas}/>
    </group>
  )
})

useGLTF.preload('models/wall/wall_normal.glb', 'draco/');