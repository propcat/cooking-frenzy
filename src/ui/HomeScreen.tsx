import { Difficulty } from '@mytypes/Difficulty';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react'
import { LuHelpCircle } from 'react-icons/lu';
import { PiPlayFill, PiStarFill, PiQuestionFill, PiQuestionBold } from 'react-icons/pi'
import styled, { css } from 'styled-components'
import { FaCheck, FaQuestion } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { RabbitPink } from '@models/player/RabbitPink';
import { PlayerModelHandle } from '@models/player/PlayerModelHandle';
import { degToRad } from 'three/src/math/MathUtils';
import { RabbitGrey } from '@models/player/RabbitGrey';
import { RabbitBlond } from '@models/player/RabbitBlond';
import { useClientStore } from '@stores/ClientStore';
import { AnimatedBackground } from './AnimatedBackground';
import { ScreenContainer } from './ScreenContainer';
import { useIsSpectator } from '@hooks/isSpectator';
import { RoundedContainerStyle } from '@styles/RoundedContainerStyle';
import { Tutorial as TutorialContent } from './Tutorial';
import { playSound } from '@utilities/playSound';

const Difficulties: {[key in Difficulty]: { name: string, stars: 1 | 2 | 3 | 4, background: string, onBackground: string, shadow: string }} = {
  easy: {
    name: 'Easy',
    stars: 1,
    background: '#B0E64C',
    onBackground: '#FCFDFA',
    shadow: '#5C7C2F',
  },
  medium: {
    name: 'Medium',
    stars: 2,
    background: '#FFBA18',
    onBackground: '#FEFCFB',
    shadow: '#AB6400',
  },
  hard: {
    name: 'Hard',
    stars: 3,
    background: '#DC3E42',
    onBackground: '#FFFCFC',
    shadow: '#641723',
  },
  intense: {
    name: 'Intense',
    stars: 4,
    background: '#8347B9',
    onBackground: '#FEFCFE',
    shadow: '#402060',
  },
}

export function HomeScreen() {
  const clientDifficulty = useClientStore(state => state.client?.game.difficulty);

  const difficulty = useMemo(() => clientDifficulty ?? 'easy', [clientDifficulty]);

  function onDifficultyChange() {
    playSound('put', undefined, 2);

    Rune.actions.setDifficulty({ difficulty: getNextDifficulty(difficulty) });
  }

  function getNextDifficulty(difficulty: Difficulty) {
    switch(difficulty){
      case 'easy': return 'medium';
      case 'medium': return 'hard';
      case 'hard': return 'intense';
      case 'intense': return 'easy';
      default: return 'easy';
    }
  }

  function onPlayClick() {
    playSound('put', undefined, 2);

    Rune.actions.startGame();
  }

  const isSpectator = useIsSpectator();

  return (
    <ScreenContainer>
      <AnimatePresence>
        <Tutorial
          key='tutorial'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.125, delay: 0.25 }}
        >
          <TutorialContent/>
        </Tutorial>
      </AnimatePresence>
      
      <Row>
        <AnimatePresence>
          <DifficultyButton
            difficulty={difficulty}
            onClick={onDifficultyChange}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.0625 } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.0625 }}
          >
            {Difficulties[difficulty].name}
            <Stars>
              {Difficulties[difficulty].stars >= 1 && <PiStarFill/>}
              {Difficulties[difficulty].stars >= 2 && <PiStarFill/>}
              {Difficulties[difficulty].stars >= 3 && <PiStarFill/>}
              {Difficulties[difficulty].stars >= 4 && <PiStarFill/>}
            </Stars>
          </DifficultyButton>
        </AnimatePresence>
        
        {isSpectator || (
          <PlayButton
            onClick={onPlayClick}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.125 }}
          >
            <PiPlayFill/>
          </PlayButton>
        )}
      </Row>
    </ScreenContainer>
  )
}

const Stars = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

const Row = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`

const Tutorial = styled(motion.div)`
  width: 100%;
  flex: 1;
  padding: 16px;
  border-radius: 32px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #FFF;
  color: #000;

  -webkit-box-shadow: 0px 1px 2px 1px #8E8C99;
  -moz-box-shadow: 0px 1px 2px 1px #8E8C99;
  box-shadow: 0px 1px 2px 1px #8E8C99;
`

const DifficultyButton = styled(motion.button)<{ difficulty: Difficulty }>`
  position: absolute;
  left: 0;
  bottom: 0;
  width: calc(100% - 96px);
  height: 80px;
  padding: 8px 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  border-radius: 32px;
  border: none;
  background-color: ${props => Difficulties[props.difficulty].background};
  color: ${props => Difficulties[props.difficulty].onBackground};
  font-weight: 700;

  -webkit-box-shadow: 0px 1px 2px 1px ${props => Difficulties[props.difficulty].shadow};
  -moz-box-shadow: 0px 1px 2px 1px ${props => Difficulties[props.difficulty].shadow};
  box-shadow: 0px 1px 2px 1px ${props => Difficulties[props.difficulty].shadow};
`

const PlayButton = styled(motion.button)<{ fullWidth?: boolean }>`
  position: absolute;
  width: 80px;
  bottom: 0;
  right: 0;
  ${props => props.fullWidth ? 'width: 100%;' : ''}
  height: 80px;
  min-width: 80px;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border-radius: 32px;
  border: none;
  background-color: #FDFCFD;
  color: #218358;

  -webkit-box-shadow: 0px 1px 2px 1px #8E8C99;
  -moz-box-shadow: 0px 1px 2px 1px #8E8C99;
  box-shadow: 0px 1px 2px 1px #8E8C99;
`