import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';

export const ThreeStoryBalconyMat = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('models/decoration/three_story_balcony_mat.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group {...props} dispose={null} scale={6}>
      <mesh geometry={(nodes['3Story_Balcony_Mat'] as any).geometry} material={toonMaterials.PaletteMaterial001}/>
    </group>
  )
})

useGLTF.preload('models/decoration/three_story_balcony_mat.glb', 'draco/');