import { GameData } from '@gamedata';
import { useWorkstationState } from '@hooks/useWorkstationState';
import { ItemState } from '@mytypes/ItemState';
import { Position } from '@mytypes/Position';
import { Rotation } from '@mytypes/Rotation';
import { useClosestInteraction } from '@providers/ClosestInteractionProvider'
import { useClientStore } from '@stores/ClientStore';
import { useJoystickStore } from '@stores/JoystickStore';
import { useSupplyStore } from '@stores/SupplyStore';
import { useThrowStore } from '@stores/ThrowStore';
import { calculateThrowPath } from '@utilities/calculateThrowPath';
import { getRecipe } from '@utilities/getRecipe';
import { stringToUtensil } from '@utilities/stringToUtensil';
import { useLocalPlayer } from '@utilities/useLocalPlayer';
import { nanoid } from 'nanoid';
import { useEffect, useMemo, useState } from 'react';
import { PiHandGrabbing, PiKnifeFill } from 'react-icons/pi';
import styled from 'styled-components'
import { Euler, Quaternion } from 'three';
import { degToRad, radToDeg } from 'three/src/math/MathUtils';

function useTouchThrottle(pause: number = 100) {
  const [lastTouchTime, setLastTouchTime] = useState(0);

  function onTouch(): boolean {
    const now = Date.now();

    if(now - lastTouchTime < pause) return false;

    setLastTouchTime(now);
    return true;
  }

  return onTouch;
}

export function InteractionButton() {
  const throwAngle = useThrowStore(state => state.angle);
  const throwForce = useThrowStore(state => state.force);
  const throwPreview = useThrowStore(state => state.preview);

  const setThrowAngle = useThrowStore(state => state.setAngle);
  const setThrowForce = useThrowStore(state => state.setForce);
  const setThrowPreview = useThrowStore(state => state.setPreview);

  const { closestItem, closestSupply, closestWorkstation } = useClosestInteraction();
  const localPlayer = useLocalPlayer();
  const { state: { active: joystickActive } } = useJoystickStore();
  const openSupply = useSupplyStore(state => state.openSupply);
  const workstations = useClientStore(state => state.client?.game.workstations);

  const canActionStart = useTouchThrottle();
  const canActionEnd = useTouchThrottle();
  const canInteract = useTouchThrottle();

  const [cookingWorkstationId, setCookingWorkstationId] = useState<string | null>(null);

  useEffect(() => {
    if(cookingWorkstationId && joystickActive) {
      Rune.actions.stopWorkstationProcessing({ workstationId: cookingWorkstationId });
      setCookingWorkstationId(null);
    }
  }, [joystickActive])

  const [touchCenter, setTouchCenter] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  const canThrow = useMemo(() => !!localPlayer?.carry, [localPlayer?.carry]);

  useEffect(() => {
    if(throwPreview && !canThrow) setThrowPreview(false);
  }, [throwPreview, canThrow])

  function onActionStart() {
    if(!canActionStart()) return;

    if(closestItem && canInteract() && !localPlayer?.carry) {
      Rune.actions.pickItem({ id: closestItem.id });
      return;
    }

    else if(closestSupply && !localPlayer?.carry) {
      openSupply(closestSupply.id);
      return;
    }

    else if(!closestSupply && closestWorkstation) {
      const workstation = workstations?.find(workstation => workstation.id === closestWorkstation.id);
      const utensil = workstation?.child === 'utensil' ? stringToUtensil(workstation.item) : null;

      if(!workstation?.child || workstation.cooking) return;

      const recipe = getRecipe(workstation.type, workstation.child === 'items' ? workstation.items : utensil!.content, utensil?.type);

      if(recipe?.type !== 'process') return;

      setCookingWorkstationId(closestWorkstation.id);
      Rune.actions.startWorkstationProcessing({ workstationId: closestWorkstation.id });
    }
  }

  function onActionEnd() {
    if(!canActionEnd()) return;

    if(cookingWorkstationId) {
      Rune.actions.stopWorkstationProcessing({ workstationId: cookingWorkstationId });
      setCookingWorkstationId(null);
    }

    if((!closestSupply || localPlayer?.carry) && closestWorkstation && canInteract()) {
      Rune.actions.interact({ workstationId: closestWorkstation.id });
      return;
    }
  }

  function onTouchStart(event: React.TouchEvent<HTMLButtonElement>) {
    const { screenX, screenY } = event.targetTouches[0];

    setTouchCenter({ x: screenX, y: screenY });

    onActionStart();
  }

  function onTouchMove(event: React.TouchEvent<HTMLButtonElement>) {
    if(!canThrow) return;
    
    const { screenX, screenY } = event.targetTouches[0];

    const minDistance = 15;
    const maxDistance = 50;

    const x = Math.min(Math.max(-maxDistance, screenX - touchCenter.x), maxDistance) / maxDistance;
    const y = Math.min(Math.max(-maxDistance, screenY - touchCenter.y), maxDistance) / maxDistance;

    const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    if((distance * maxDistance) < minDistance) setThrowPreview(false);
    else {
      setThrowPreview(true);

      if(cookingWorkstationId) {
        Rune.actions.stopWorkstationProcessing({ workstationId: cookingWorkstationId });
        setCookingWorkstationId(null);
      }
    }

    const angle = radToDeg(Math.atan2(x, y));

    const minForce = 6;
    const maxForce = 14;

    const force = minForce + (maxForce - minForce) * distance;

    setThrowAngle(angle);
    setThrowForce(force);
  }

  function onTouchEnd() {
    if(!throwPreview) onActionEnd();

    if(!localPlayer || !throwPreview) return;

    setThrowPreview(false);

    const quaternion = new Quaternion(localPlayer.rotation.x, localPlayer.rotation.y, localPlayer.rotation.z, localPlayer.rotation.w);
    const euler = new Euler();

    euler.setFromQuaternion(quaternion, undefined, true);

    euler.set(0, degToRad(throwAngle), 0);

    quaternion.setFromEuler(euler, true);

    const initialPosition: Position = {
      x: Math.round(localPlayer.position.x * 100) / 100,
      y: Math.round(localPlayer.position.y * 100) / 100 + 1.5,
      z: Math.round(localPlayer.position.z * 100) / 100
    };

    const rotation: Rotation = {
      x: Math.round(quaternion.x * 100) / 100,
      y: Math.round(quaternion.y * 100) / 100,
      z: Math.round(quaternion.z * 100) / 100,
      w: Math.round(quaternion.w * 100) / 100,
    }

    const force = Math.round(throwForce * 100) / 100;

    const { path: throwPath, duration } = calculateThrowPath(initialPosition, force, undefined, 50, rotation);
    
    const path: ItemState['path'] = { duration, points: throwPath.map(t => t.point) };

    Rune.actions.throwItem({ id: nanoid(), initialPosition, path, rotation, force });
  }

  const utensil = useMemo(() => localPlayer?.carry === 'utensil' ? stringToUtensil(localPlayer.item): null, [localPlayer?.carry, localPlayer?.item]);

  const { progress } = useWorkstationState(cookingWorkstationId ?? undefined);

  const { workstation: closestWorkstationState, ...closestWorkstationData } = useWorkstationState(closestWorkstation?.id);

  const active = useMemo<boolean>(() => {
    if(closestItem && !localPlayer?.carry) return true;
    if(closestSupply) return true;
    if(closestWorkstation && closestWorkstationState?.child) return true;

    return !!localPlayer?.carry;
  }, [closestItem, localPlayer?.carry, closestSupply, closestWorkstation, closestWorkstationState?.child])

  const canChop = useMemo<boolean>(() => {
    if(closestSupply || !closestWorkstation) return false;
    if(closestWorkstation.type !== 'cutting_table') return false;
    
    const { item, items } = closestWorkstationData;
    
    const recipe = GameData.recipes.find(recipe => {
      if(recipe.type !== 'process') return false;
      if(recipe.workstation !== 'cutting_table') return false;

      if(item) return !!recipe.ingredients.find(ingredient => ingredient === item);
      else if(items) return !!items.find(item => recipe.ingredients.find(ingredient => ingredient === item));

      return false;
    })

    return !!recipe;
  }, [closestSupply, closestWorkstation, closestWorkstationData])

  return (
    <Button
      active={active}
      progress={progress}
      onMouseDown={onActionStart}
      onMouseUp={onActionEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {!localPlayer?.carry && (canChop ? <PiKnifeFill/> : <PiHandGrabbing/>) }
      {localPlayer?.carry && <Image src={`previews/${localPlayer.carry === 'item' ? localPlayer.item : utensil!.type}.webp`}/>}
    </Button>
  )
}

const Button = styled.button<{ active?: boolean, progress: number }>`
  position: relative;
  width: calc(max(min(100vw / 4, 100px), 30px));
  height: calc(max(min(100vw / 4, 100px), 30px));
  border-radius: 50px;
  border: none;

  background-color: #FFFFFA;
  color: #452fab;
  font-size: calc(min(1.75rem, 12.5vw));
  
  transition: opacity 0.125s ease-in-out;

  opacity: ${props => props.active ? 1 : 0};

  display: flex;
  justify-content: center;
  align-items: center;

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: -3px;
    top: -3px;
    right: -3px;
    bottom: -3px;
    background-color: transparent;
    background-image: conic-gradient(#452fab, #452fab ${props => props.progress * 100}%, transparent ${props => props.progress * 100}%);
    z-index: -100;
    border-radius: 50px;
  }
`

const Image = styled.img`
  width: 64px;
  height: 64px;
  aspect-ratio: 1;
  object-fit: contain;
  pointer-events: none;
`