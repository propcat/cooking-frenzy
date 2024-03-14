import { useClientStore } from '@stores/ClientStore';
import { useJoystickStore } from '@stores/JoystickStore';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LuChefHat } from 'react-icons/lu';
import { Joystick } from 'react-joystick-component';
import type { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';
import styled from 'styled-components';

export function MovementJoystick() {
  const levelIndex = useClientStore(state => state.client?.game.level.levelIndex);
  const setJoystickState = useJoystickStore(state => state.setState);

  useEffect(() => () => { setJoystickState({ active: false, x: 0, y: 0 }) }, [levelIndex]);

  function onJoystickUpdate(event: IJoystickUpdateEvent) {
    setJoystickState({ active: !!(event.x || event.y), x: event.x ?? 0, y: event.y ?? 0 });
  }
  
  return (
    <>
      <div className='movement-joystick'>
        <Joystick
          size={Math.max(Math.min(window.innerWidth / 4, 100), 30)}
          baseColor='#452fab'
          stickColor='transparent'
          start={onJoystickUpdate}
          move={onJoystickUpdate}
          stop={onJoystickUpdate}
        />
      </div>
      {document.querySelector('.movement-joystick > div > button') && createPortal(
        (
          <JoystickIcon>
            <LuChefHat/>
          </JoystickIcon>
        ),
        document.querySelector('.movement-joystick > div > button')!,
      )}
    </>
  )
}

const JoystickIcon = styled.div`
  width: 100%;
  height: 100%;
  font-size: calc(min(1.75rem, 12.5vw));
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  color: #452fab;
  touch-action: none;
  pointer-events: none;
  background-color: #FFFFFA;
  border-radius: 100%;
`