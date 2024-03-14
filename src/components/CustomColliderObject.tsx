import { GroupProps } from '@react-three/fiber';
import { forwardRef, useEffect, useMemo, useRef } from 'react';
import { Group, Matrix3 } from 'three';
import { ColliderObject } from './ColliderObject';
import { nanoid } from 'nanoid';
import { Collider } from '@mytypes/Collider';

interface Props {
  collider: Collider,
  showWireframe?: boolean,
}

export function CustomColliderObject({ collider, showWireframe, ...props }: GroupProps & Props) {
  const ref = useRef<Group>(null);
  const id = useMemo(() => nanoid(), []);

  const position = useMemo(() => ref.current?.position, [ref.current?.position]);
  const matrix = useMemo(() => ref.current ? new Matrix3().setFromMatrix4(ref.current.matrix) : undefined, [ref.current?.matrix]);

  return (
    <group ref={ref} {...props}>
      { matrix && position && <ColliderObject showWireframe={showWireframe} id={id} collider={collider} matrix={matrix} position={position}/> }
    </group>
  )
}