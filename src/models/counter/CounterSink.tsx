import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { useToonMaterials } from '@utilities/useToonMaterials';

export const CounterSink = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF('models/counter/counter_sink.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh  geometry={(nodes.Environment_Counter_Sink as any).geometry} material={toonMaterials.Atlas} scale={100}/>
    </group>
  )
})

useGLTF.preload('models/counter/counter_sink.glb', 'draco/');