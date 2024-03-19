import { useClientStore } from '@stores/ClientStore';
import { LuCheckCircle, LuClock, LuMenu } from 'react-icons/lu';
import styled from 'styled-components'
import { IngameMenu } from './IngameMenu';
import { useEffect, useState } from 'react';
import { GameData } from '@gamedata';
import { PiQuestion, PiQuestionBold } from 'react-icons/pi';
import { FaQuestion } from 'react-icons/fa';
import { MdOutlineQuestionMark, MdQuestionMark } from 'react-icons/md';
import { BsQuestionCircleFill } from "react-icons/bs";
import { CiCircleQuestion } from "react-icons/ci";
import { BsPatchQuestionFill } from "react-icons/bs";
import { Tutorial } from './Tutorial';
import { TutorialPopup } from './TutorialPopup';
import { useTouchThrottle } from '@hooks/useTouchThrottle';

interface Props {
  loaded?: boolean,
}

export function TopLayout({ loaded }: Props) {
  const level = useClientStore(state => state.client?.game.level)
  const status = useClientStore(state => state.client?.game.status);
  const startedAt = useClientStore(state => state.client?.game.level.startedAt);
  const completedOrders = useClientStore(state => state.client?.game.completedOrders);

  function secondsToTime(value: number) {
    if(value > 60) {
      const minutes = Math.floor(value / 60);
      const seconds = value - minutes * 60;

      return `${minutes}m ${seconds}s`;
    } else {
      return `${Math.max(0, value)}s`;
    }
  }

  const [tutorialOpen, setTutorialOpen] = useState(false);

  useEffect(() => {
    setTutorialOpen(false);
  }, [status, level])

  const canToggleTutorial = useTouchThrottle();

  function onTutorialToggle() {
    if(!canToggleTutorial()) return;

    setTutorialOpen(open => {
      if(open || status !== 'game' || !level?.loaded) return false;

      return true;
    })
  }

  const onTutorialClose = () => setTutorialOpen(false);

  return (
    <Container>
      <Content onMouseUp={onTutorialToggle} onTouchEnd={onTutorialToggle}>
        {loaded && (
          <IconButton transparent={status !== 'game' || !level?.loaded}>
            <MdQuestionMark/>
          </IconButton>
        )}

        {loaded && level && startedAt !== undefined && (
          <Info transparent={status !== 'game' || !level?.loaded}>
            <LuClock/>
            {secondsToTime(GameData.levels[level.levelIndex].durationSeconds - Math.floor((Rune.gameTime() - startedAt) / 1000))}
          </Info>
        )}
        
        {loaded && completedOrders !== undefined && (
          <Info transparent={status !== 'game' || !level?.loaded}>
            <LuCheckCircle/>
            {completedOrders.completed}
          </Info>
        )}
      </Content>

      <TutorialPopup open={tutorialOpen} onClose={onTutorialClose}/>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Content = styled.div`
  width: 100%;
  padding: 8px 16px;
  background-color: #1b0035;
  color: #FFFFFA;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  z-index: 300;

  svg {
    font-size: 1.4em;
  }

  * {
    font-family: 'Roboto Mono Variable', sans-serif !important;
    font-size: 0.875em;
  }
`

const Info = styled.div<{ transparent?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;

  ${props => props.transparent ? 'opacity: 0;' : ''}
  transition: opacity 0.2s ease-in-out;
`

const IconButton = styled.button<{ transparent?: boolean }>`
  aspect-ratio: 1;
  border: none;
  background-color: #1b0035;
  color: #FFFFFA;
  line-height: 0;

  ${props => props.transparent ? 'opacity: 0;' : ''}
  ${props => props.transparent ? 'touch-action: none;' : ''}
  ${props => props.transparent ? 'pointer-events: none;' : ''}
  transition: opacity 0.2s ease-in-out;
`