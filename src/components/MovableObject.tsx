import { Collider } from '@mytypes/Collider'
import { MovableObject as MovableObjectData } from '@mytypes/MovableObject'
import { GroupProps, useFrame } from '@react-three/fiber'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { Group, Matrix3, Vector3 } from 'three'
import { ColliderObject } from './ColliderObject'
import { Position } from '@mytypes/Position'
import { degToRad } from 'three/src/math/MathUtils'
import { useClientStore } from '@stores/ClientStore'
import { useColliding } from '@hooks/useColliding'
import { nanoid } from 'nanoid'
import { GameData } from '@gamedata'
import { useObjectUUID } from '@hooks/useObjectUUID'
import { EulerRotation, Rotation } from '@mytypes/Rotation'

interface Props {
  collider?: Collider,
  data: MovableObjectData,
  showWireframe?: boolean,
}

const DEFAULT_MOVABLE_OBJECT_SPEED = 1000;
const DEFAULT_MOVABLE_OBJECT_PAUSE = 0;

export function MovableObject({ collider, data, showWireframe, children, ...props }: GroupProps & Props) {
  const colliderId = useObjectUUID();
  const localPlayerHandle = useClientStore(state => state.localPlayerHandle);
  const ref = useRef<Group>(null);
  const isColliding = useColliding();
  
  const matrix = useMemo(() => ref.current ? new Matrix3().setFromMatrix4(ref.current.matrix) : undefined, [ref.current?.matrix]);

  useEffect(() => {
    const position = data.dynamic ? data.path[0].point : data.position;
    const rotation = data.dynamic ? data.path[0].rotation : data.rotation;

    ref.current?.position.set(position.x, position.y, position.z);
    ref.current?.rotation.set(degToRad(rotation?.x ?? 0), degToRad(rotation?.y ?? 0), degToRad(rotation?.z ?? 0));
  }, [ref])

  const [position, setPosition] = useState<Position>(data.dynamic ? data.path[0].point : data.position);

  useEffect(() => {
    if(!ref.current) return;

    if(ref.current.position.x === position.x && ref.current.position.y === position.y && ref.current.position.z === position.z) return;

    setPosition({ x: ref.current.position.x, y: ref.current.position.y, z: ref.current.position.z });
  })

  const time = useRef(Rune.gameTime());

  function getPosition(time: number): { position: Position, rotation?: EulerRotation } {
    if(!data.dynamic) return { position: data.position, rotation: data.rotation };

    const pointDuration = data.speed ?? DEFAULT_MOVABLE_OBJECT_SPEED;
    const pointDurationWithPause = pointDuration + (data.pause ?? DEFAULT_MOVABLE_OBJECT_PAUSE);

    const pointsPassed = Math.floor(time / pointDurationWithPause);
    const pointIndex = pointsPassed % data.path.length;
    const pointTime = time - pointsPassed * pointDurationWithPause;

    const progress = Math.min(pointTime / pointDuration, 1);

    const { point: initialPosition, rotation: initialRotation } = data.path[pointIndex];
    const { point: nextPosition, rotation: nextRotation } = data.path[pointIndex + 1 < data.path.length ? pointIndex + 1 : 0];

    const position: Position = {
      x: initialPosition.x + (nextPosition.x - initialPosition.x) * progress,
      y: initialPosition.y + (nextPosition.y - initialPosition.y) * progress,
      z: initialPosition.z + (nextPosition.z - initialPosition.z) * progress,
    };

    return { position, rotation: initialRotation };
  }

  useEffect(() => { time.current = Rune.gameTime() }, [data])

  useFrame((_, delta) => {
    if(!ref.current || !data.dynamic || !data.path || data.path.length === 0) return;

    time.current = time.current + delta * 1000;

    const { position, rotation } = getPosition(time.current);

    const initialPosition = ref.current.position.clone();

    ref.current.position.set(position.x, position.y, position.z);

    if(rotation) ref.current.rotation.set(degToRad(rotation.x), degToRad(rotation.y), degToRad(rotation.z));

    const newPosition = ref.current.position.clone();

    const player = localPlayerHandle?.group;

    if(!player) return;
    
    const { colliding, grounded } = isColliding({ x: player.position.x, y: player.position.y, z: player.position.z });

    if(grounded !== colliderId && colliding !== colliderId) return;

    player.position.add(newPosition.sub(initialPosition));
  })

  return (
    <group ref={ref} {...props}>
      {children}
      { collider && matrix && <ColliderObject id={colliderId} showWireframe={showWireframe} collider={collider} position={position} matrix={matrix}/> }
    </group>
  )
}