import styled from 'styled-components';
import { Tutorial } from './Tutorial';
import { AnimatePresence, motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { IoCloseSharp } from "react-icons/io5";

interface Props {
  open: boolean,
  onClose: () => void,
}

export function TutorialPopup({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <Container
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.4 }}
        >
          <Content>
            <Tutorial/>
          </Content>
          <ExitButton
            initial={{ y: 'calc(100% + 37px)' }}
            animate={{ y: 0, transition: { delay: 0.4, duration: 0.2 } }}
            exit={{ y: 'calc(100% + 37px)' }}
            onMouseUp={onClose} 
            onTouchEnd={onClose}
          >
            <IoCloseSharp/>
            Close Tutorial
          </ExitButton>
        </Container>
      )}
    </AnimatePresence>
  )
}

const Container = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: calc(100% - 37px);
  max-height: 100%;
  z-index: 500;
  bottom: 0;
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #FFFFFF;
  color: #000000;
`

const ExitButton = styled(motion.button)`
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  gap: 8px;
  border-radius: 32px;
  border: none;
  background-color: #DC3E42;
  color: #FFFCFC;

  font-family: 'Rubik Variable', sans-serif;
  font-size: 1rem;

  -webkit-box-shadow: 0px 1px 2px 1px #641723;
  -moz-box-shadow: 0px 1px 2px 1px #641723;
  box-shadow: 0px 1px 2px 1px #641723;
`