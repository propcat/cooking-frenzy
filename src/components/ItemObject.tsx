import { useColliding } from '@hooks/useColliding';
import { Chukaman } from '@models/food/Chukaman';
import { EbiNigiri } from '@models/food/EbiNigiri';
import { Gyoza } from '@models/food/Gyoza';
import { MaguroNigiri } from '@models/food/MaguroNigiri';
import { OctopusNigiri } from '@models/food/OctopusNigiri';
import { Ramen } from '@models/food/Ramen';
import { Roll } from '@models/food/Roll';
import { SalmonNigiri } from '@models/food/SalmonNigiri';
import { SalmonRoll } from '@models/food/SalmonRoll';
import { SeaUrchinRoll } from '@models/food/SeaUrchinRoll';
import { Udon } from '@models/food/Udon';
import { Wasabi } from '@models/food/Wasabi';
import { Avocado } from '@models/ingredient/Avocado';
import { Crabsticks } from '@models/ingredient/Crabsticks';
import { Cucumber } from '@models/ingredient/Cucumber';
import { Ebi } from '@models/ingredient/Ebi';
import { Eel } from '@models/ingredient/Eel';
import { Fish } from '@models/ingredient/Fish';
import { FishFillet } from '@models/ingredient/FishFillet';
import { Flounder } from '@models/ingredient/Flounder';
import { Mackerel } from '@models/ingredient/Mackerel';
import { Nori } from '@models/ingredient/Nori';
import { Octopus } from '@models/ingredient/Octopus';
import { Rice } from '@models/ingredient/Rice';
import { Salmon } from '@models/ingredient/Salmon';
import { SalmonFish } from '@models/ingredient/SalmonFish';
import { SeaUrchin } from '@models/ingredient/SeaUrchin';
import { SeaUrchinOpen } from '@models/ingredient/SeaUrchinOpen';
import { Shimesaba } from '@models/ingredient/Shimesaba';
import { SlicedCucumber } from '@models/ingredient/SlicedCucumber';
import { Squid } from '@models/ingredient/Squid';
import { Tentacle } from '@models/ingredient/Tentacle';
import { Tuna } from '@models/ingredient/Tuna';
import { Pan } from '@models/utensil/Pan';
import { Pot1Empty } from '@models/utensil/Pot1Empty';
import { Pot1Filled } from '@models/utensil/Pot1Filled';
import { Pot2Empty } from '@models/utensil/Pot2Empty';
import { Pot2Filled } from '@models/utensil/Pot2Filled';
import { ItemState } from '@mytypes/ItemState';
import { Position } from '@mytypes/Position';
import { useClosestInteraction } from '@providers/ClosestInteractionProvider';
import { Box } from '@react-three/drei';
import { GroupProps, useFrame } from '@react-three/fiber';
import { calculateThrowDelta } from '@utilities/calculateThrowDelta';
import { rotationToEuler } from '@utilities/rotationToEuler';
import { stringToUtensil } from '@utilities/stringToUtensil';
import { useLocalPlayer } from '@utilities/useLocalPlayer';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Euler, Group, Matrix3, Quaternion, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

interface Props {
  item: ItemState,
}

export function ItemObject({ item: { startedAt, initialPosition, rotation, force, carry, item, id }, ...props }: GroupProps & Props) {
  const ref = useRef<Group>(null);
  
  const time = useRef(0);

  const yAnimation = useRef<{ initialY: number, status: 'up' | 'down' }>({ initialY: initialPosition.y, status: 'down'});

  const isColliding = useColliding();

  const localPlayer = useLocalPlayer();

  const { registerItem, unregisterItem, closestItem } = useClosestInteraction();

  useEffect(() => {
    registerItem(id, initialPosition);

    return () => {
      unregisterItem(id);
    }
  }, [id])
  
  useEffect(() => {
    if(!ref.current || force !== 0) return;

    ref.current.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
  }, [ref, force, initialPosition])

  const [stopped, setStopped] = useState(false);

  useFrame((_, delta) => {
    if(!ref.current) return;
    
    time.current = time.current + delta;

    const { x, y, duration } = calculateThrowDelta(force, undefined, time.current);

    const axis = new Vector3(0, 1, 0);

    const positionDelta = new Vector3(x, y, 0);

    const quaternion = new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
    
    positionDelta.applyQuaternion(quaternion);
    positionDelta.applyAxisAngle(axis, degToRad(-90));

    const nextPoint: Position = { x: initialPosition.x + positionDelta.x, y: initialPosition.y + positionDelta.y, z: initialPosition.z + positionDelta.z };

    const { colliding, grounded } = isColliding({ x: nextPoint.x, y: nextPoint.y, z: nextPoint.z });

    const groundHeight = 1;
    const isOnGround = yAnimation.current.initialY === groundHeight;

    if(force !== 0 && !stopped && !colliding && time.current <= duration) {
      ref.current.position.set(nextPoint.x, nextPoint.y, nextPoint.z);
      ref.current.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);

      yAnimation.current.initialY = nextPoint.y;
    }

    else if(isOnGround) {
      setStopped(true);

      const maxYDelta = 0.25;
      const rotationAngle = 45;
      const hoverSpeed = 0.25;
      
      ref.current.rotateOnAxis(new Vector3(0, 1, 0), degToRad(rotationAngle * delta));

      if(Math.abs(yAnimation.current.initialY - ref.current.position.y) >= maxYDelta) {
        yAnimation.current.status = yAnimation.current.status === 'down' ? 'up' : 'down';
      }

      const sign = yAnimation.current.status === 'down' ? -1 : 1;

      ref.current.position.set(ref.current.position.x, ref.current.position.y + hoverSpeed * delta * sign, ref.current.position.z);
    }

    else {
      setStopped(true);
      
      let yDelta = -2 * delta;

      if(ref.current.position.y + yDelta < groundHeight) {
        yDelta = groundHeight - ref.current.position.y;
      }

      const newPosition = new Vector3(ref.current.position.x, ref.current.position.y + yDelta, ref.current.position.z);

      const { colliding: collidingBefore } = isColliding({ x: ref.current.position.x, y: ref.current.position.y, z: ref.current.position.z });

      const { colliding: collidingAfter } = isColliding({ x: newPosition.x, y: newPosition.y, z: newPosition.z });

      if(!collidingBefore && collidingAfter) return;

      ref.current.position.set(ref.current.position.x, ref.current.position.y + yDelta, ref.current.position.z);

      yAnimation.current.initialY = ref.current.position.y;
    }
 
    registerItem(id, { x: ref.current.position.x, y: ref.current.position.y, z: ref.current.position.z });
  })

  const utensil = useMemo(() => carry === 'utensil' ? stringToUtensil(item) : null, [carry, item]);

  const outline = useMemo(() => closestItem?.id === id && !localPlayer?.carry, [id, closestItem, localPlayer?.carry]);

  return (
    <group ref={ref} {...props}>
      { carry === 'item' && item === 'avocado' && <Avocado outline={outline}/> }
      { carry === 'item' && item === 'crabsticks' && <Crabsticks outline={outline}/> }
      { carry === 'item' && item === 'cucumber' && <Cucumber outline={outline}/> }
      { carry === 'item' && item === 'ebi' && <Ebi outline={outline}/> }
      { carry === 'item' && item === 'eel' && <Eel outline={outline}/> }
      { carry === 'item' && item === 'fish' && <Fish outline={outline}/> }
      { carry === 'item' && item === 'fish_fillet' && <FishFillet outline={outline}/> }
      { carry === 'item' && item === 'flounder' && <Flounder outline={outline}/> }
      { carry === 'item' && item === 'mackerel' && <Mackerel outline={outline}/> }
      { carry === 'item' && item === 'nori' && <Nori outline={outline}/> }
      { carry === 'item' && item === 'octopus' && <Octopus outline={outline}/> }
      { carry === 'item' && item === 'rice' && <Rice outline={outline}/> }
      { carry === 'item' && item === 'salmon' && <Salmon outline={outline}/> }
      { carry === 'item' && item === 'salmon_fish' && <SalmonFish outline={outline}/> }
      { carry === 'item' && item === 'sea_urchin' && <SeaUrchin outline={outline}/> }
      { carry === 'item' && item === 'sea_urchin_open' && <SeaUrchinOpen outline={outline}/> }
      { carry === 'item' && item === 'shimesaba' && <Shimesaba outline={outline}/> }
      { carry === 'item' && item === 'sliced_cucumber' && <SlicedCucumber outline={outline}/> }
      { carry === 'item' && item === 'squid' && <Squid outline={outline}/> }
      { carry === 'item' && item === 'tentacle' && <Tentacle outline={outline}/> }
      { carry === 'item' && item === 'tuna' && <Tuna outline={outline}/> }
      
      
      { carry === 'item' && item === 'chukaman' && <Chukaman outline={outline}/> }
      { carry === 'item' && item === 'ebi_nigiri' && <EbiNigiri outline={outline}/> }
      { carry === 'item' && item === 'gyoza' && <Gyoza outline={outline}/> }
      { carry === 'item' && item === 'maguro_nigiri' && <MaguroNigiri outline={outline}/> }
      { carry === 'item' && item === 'octopus_nigiri' && <OctopusNigiri outline={outline}/> }
      { carry === 'item' && item === 'ramen' && <Ramen outline={outline}/> }
      { carry === 'item' && item === 'roll' && <Roll outline={outline}/> }
      { carry === 'item' && item === 'salmon_nigiri' && <SalmonNigiri outline={outline}/> }
      { carry === 'item' && item === 'salmon_roll' && <SalmonRoll outline={outline}/> }
      { carry === 'item' && item === 'sea_urchin_roll' && <SeaUrchinRoll outline={outline}/> }
      { carry === 'item' && item === 'udon' && <Udon outline={outline}/> }
      { carry === 'item' && item === 'wasabi' && <Wasabi outline={outline}/> }

      { carry === 'utensil' && utensil?.type === 'pan' && <Pan outline={outline} rotation={rotationToEuler({ x: 0, y: 180, z: 0 })}/> }

      { carry === 'utensil' && utensil?.type === 'pot_1' && utensil?.content.length === 0 && <Pot1Empty outline={outline}/> }
      { carry === 'utensil' && utensil?.type === 'pot_1' && utensil?.content.length !== 0 && <Pot1Filled outline={outline}/> }
      
      { carry === 'utensil' && utensil?.type === 'pot_2' && utensil?.content.length === 0 && <Pot2Empty outline={outline}/> }
      { carry === 'utensil' && utensil?.type === 'pot_2' && utensil?.content.length !== 0 && <Pot2Filled outline={outline}/> }
    </group>
  )
}