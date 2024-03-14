import { useMusic } from '@providers/MusicProvider';
import { useClientStore } from '@stores/ClientStore';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { FaChevronUp, FaHome } from 'react-icons/fa';
import { FaArrowRotateRight } from 'react-icons/fa6';
import styled from 'styled-components';
import { MdMusicNote, MdMusicOff } from 'react-icons/md';

interface Props {
  open: boolean,
  onClose: () => any,
}

export function IngameMenu({ open, onClose }: Props) {
  const status = useClientStore(state => state.client?.game.status);
  const levelIndex = useClientStore(state => state.client?.game.level.levelIndex);

  const { playing: musicPlaying, setPlaying: setMusicPlaying } = useMusic();

  useEffect(() => { onClose() }, [status, levelIndex])

  function onTouchEnd(event: React.TouchEvent<HTMLButtonElement>) {
    event.stopPropagation();
    event.preventDefault();
  }

  function onToggleMusic(event: React.TouchEvent<HTMLButtonElement>) {
    onTouchEnd(event);

    setMusicPlaying(musicPlaying => !musicPlaying);
    
    onClose();
  }

  function onRestart(event: React.TouchEvent<HTMLButtonElement>) {
    onTouchEnd(event);

    Rune.actions.restartGame();
    onClose();
  }

  function onHome(event: React.TouchEvent<HTMLButtonElement>) {
    onTouchEnd(event);

    Rune.actions.openHomeScreen();

    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <Container
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.125 }}
        >
          <Content onTouchEnd={onClose}>
            <Button fullWidth onTouchEnd={onToggleMusic}>
              { musicPlaying ? <MdMusicNote/> : <MdMusicOff/> }
            </Button>
            <Button fullWidth onTouchEnd={onRestart}>
              <FaArrowRotateRight/>
            </Button>
            <Button fullWidth onTouchEnd={onHome}>
              <FaHome/>
            </Button>
            <Button fullWidth onTouchEnd={onClose}>
              <FaChevronUp/>
            </Button>
          </Content>
        </Container>
      )}
    </AnimatePresence>
  )
}

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #1b0035;
  color: #FFFFFA;
  overflow: hidden;
  z-index: 200;
`

const Content = styled(motion.div)`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`

const Button = styled.button<{ fullWidth?: boolean }>`
  ${props => props.fullWidth ? 'width: 100%;' : ''}
  height: 100%;
  ${props => props.fullWidth ? '' : 'aspect-ratio: 1;'}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  background-color: #452fab;
  color: #FFFFFA;
  border: none;
  gap: 8px;

  svg {
    font-size: 1rem;
  }
`

const Spacer = styled.div`
  flex: 1;
`