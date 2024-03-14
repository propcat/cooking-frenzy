import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export function ScreenContainer({ children }: PropsWithChildren) {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </Container>
  )
}

export const Container = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  z-index: 125;
  gap: 16px;
`