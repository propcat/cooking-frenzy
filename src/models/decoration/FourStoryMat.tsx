import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';

export const FourStoryMat = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('models/decoration/four_story_mat.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group {...props} dispose={null} scale={6}>
      <mesh geometry={(nodes['4Story_Mat'] as any).geometry} material={toonMaterials.PaletteMaterial001}/>
    </group>
  )
})

useGLTF.preload('models/decoration/four_story_mat.glb', 'draco/');