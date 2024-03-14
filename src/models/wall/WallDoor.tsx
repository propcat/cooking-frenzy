import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';

export const WallDoor = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('models/wall/wall_door.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={(nodes.Cube211 as any).geometry} material={toonMaterials.Light}/>
      <mesh geometry={(nodes.Cube211_1 as any).geometry} material={toonMaterials.Atlas}/>
    </group>
  )
})

useGLTF.preload('models/wall/wall_door.glb', 'draco/');