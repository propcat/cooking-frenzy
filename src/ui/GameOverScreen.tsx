import { PiArrowClockwiseBold, PiHouseBold, PiPlayFill, PiStar, PiStarFill, PiStarFourFill, PiStarHalf, PiStarHalfFill } from 'react-icons/pi';
import { AnimatedBackground } from './AnimatedBackground';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { LuHome } from 'react-icons/lu';
import { useMemo } from 'react';
import { ScreenContainer } from './ScreenContainer';
import { useClientStore } from '@stores/ClientStore';
import { SiFoodpanda } from 'react-icons/si';
import { RoundedContainerStyle } from '@styles/RoundedContainerStyle';

export function GameOverScreen() {
  const orders = useClientStore(state => state.client?.game.orders);
  const completedOrders = useClientStore(state => state.client?.game.completedOrders);
  const players = useClientStore(state => state.client?.players);
  const openHomeScreen = () => Rune.actions.openHomeScreen();
  const startGame = () => Rune.actions.startGame();

  const score = useMemo(() => {
    if(!completedOrders) return 0;

    return Math.min(Math.round(5 * ((completedOrders.completed + (orders?.length ?? 0)) / completedOrders.total) * 2) / 2, 5);
  }, [completedOrders])

  return (
    <ScreenContainer>
      <Stars
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.125 }}
      >
        <Star type={score >= 1 ? 'fill' : (score >= 0.5 ? 'half' : 'empty')}/>
        <Star type={score >= 2 ? 'fill' : (score >= 1.5 ? 'half' : 'empty')}/>
        <Star type={score >= 3 ? 'fill' : (score >= 2.5 ? 'half' : 'empty')}/>
        <Star type={score >= 4 ? 'fill' : (score >= 3.5 ? 'half' : 'empty')}/>
        <Star type={score >= 5 ? 'fill' : (score >= 4.5 ? 'half' : 'empty')}/>
      </Stars>
      <Table
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.125 }}
      >
        {players && Object?.values(players).map(({ playerId, displayName, avatarUrl }, index) => (
          <TableElementContainer key={playerId}>
            <TableElementContent>
              <TableAvatar src={avatarUrl}/>
              {displayName}
            </TableElementContent>
            {(Object.values(players).length > 1 && index < Object.values(players).length - 1) && <TableDivider/>}
          </TableElementContainer>
        ))}
      </Table>
      <Buttons
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.125 }}
      >
        <HomeButton onClick={openHomeScreen}>
          <PiHouseBold/>
        </HomeButton>
        <PlayButton onClick={startGame}>
          <PiArrowClockwiseBold/>
        </PlayButton>
      </Buttons>
    </ScreenContainer>
  )
}

interface StarProps {
  type: 'empty' | 'half' | 'fill',
}

function Star({ type }: StarProps) {
  const color = useMemo(() => {
    switch(type) {
      case 'empty': return '#BBBBBB';
      case 'half': return '#3E9B4F';
      case 'fill': return '#3E9B4F';
      default: return '';
    }
  }, [type])

  return (
    <StarContainer color={color}>
      {type === 'empty' && <PiStar/> }
      {type === 'half' && <PiStarHalfFill/> }
      {type === 'fill' && <PiStarFill/> }
    </StarContainer>
  )
}

const StarContainer = styled.div<{ color: string }>`
  color: ${props => props.color};
  line-height: 0;
`

const Stars = styled(motion.div)`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  font-size: calc(min(100vw / 5 - 48px, 48px));
  
  ${RoundedContainerStyle}
`

const Table = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 16px;

  ${RoundedContainerStyle}
`

const TableElementContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`

const TableElementContent = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  color: #646464;
  padding: 0 8px;

  svg {
    font-size: 1.5rem;
  }
`

const TableDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #D9D9D9;
  align-self: center;
`

const TableAvatar = styled.img`
  height: 100%;
  aspect-ratio: 1;
  object-fit: cover;
`

const Spacer = styled.div`
  flex: 1;
`

const Buttons = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 16px;
`

const HomeButton = styled.div`
  width: 80px;
  height: 80px;
  min-width: 80px;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border-radius: 32px;
  border: none;
  background-color: #FCFCFC;
  color: #646464;

  -webkit-box-shadow: 0px 1px 2px 1px #8E8C99;
  -moz-box-shadow: 0px 1px 2px 1px #8E8C99;
  box-shadow: 0px 1px 2px 1px #8E8C99;
`

const PlayButton = styled.div`
  width: 100%;
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