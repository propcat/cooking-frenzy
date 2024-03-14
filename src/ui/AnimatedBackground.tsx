import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export function AnimatedBackground() {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    />
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
  z-index: 120;
  background-color: #F7913D;
  color: #FFF;
  gap: 16px;

  background-image: repeating-linear-gradient(
    -45deg, 
    transparent, 
    transparent 3rem,
    #FFBD59 3rem,
    #FFBD59 6rem
  );

  background-size: 200% 200%;
  animation: barberpole 30s linear infinite;

  @keyframes barberpole {
    100% {
      background-position: 100% 100%;
    }
  }
`