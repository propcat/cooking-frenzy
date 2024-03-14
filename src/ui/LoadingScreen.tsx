import { useClientStore } from '@stores/ClientStore';
import { AnimatedBackground } from './AnimatedBackground';
import { ScreenContainer } from './ScreenContainer';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { LuCheck } from 'react-icons/lu';
import { ClipLoader } from 'react-spinners';

export function LoadingScreen() {
  const players = useClientStore(state => state.client?.players);
  const loadedPlayersIds = useClientStore(state => state.client?.game.level.loadedPlayersIds);

  return (
    <ScreenContainer>
      <Logo
        key='logo'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.125 }}
        src='logo.svg'
      />
      <Spacer/>
      <Table
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.125 }}
      >
        {players && Object?.values(players).map(({ playerId, displayName, avatarUrl }, index) => {
          const loaded = loadedPlayersIds?.includes(playerId);

          return (
            <TableElementContainer key={playerId}>
              <TableElementContent>
                <TableAvatar src={avatarUrl}/>
                {displayName}
                <Spacer/>
                { loaded && <LuCheck/> }
                { loaded || (
                  <ClipLoader
                    color='#3E9B4F'
                    loading={!loaded}
                    size={20}
                  />
                )}
              </TableElementContent>
              {(Object.values(players).length > 1 && index < Object.values(players).length - 1) && <TableDivider/>}
            </TableElementContainer>
          )
        })}
      </Table>
    </ScreenContainer>
  )
}

const Logo = styled(motion.img)`
  width: 100%;
  padding: 16px;
  object-fit: contain;
`

const ContainerStyle = css`
  padding: 16px;
  border-radius: 32px;

  background-color: #FCFCFC;
  color: #BBBBBB;

  -webkit-box-shadow: 0px 1px 2px 1px #8E8C99;
  -moz-box-shadow: 0px 1px 2px 1px #8E8C99;
  box-shadow: 0px 1px 2px 1px #8E8C99;
`

const Table = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 16px;

  ${ContainerStyle}
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
    color: #3E9B4F;
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