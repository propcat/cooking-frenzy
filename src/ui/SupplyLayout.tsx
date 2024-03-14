import { useClientStore } from '@stores/ClientStore';
import { useSupplyStore } from '@stores/SupplyStore'
import { playSound } from '@utilities/playSound';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';
import { LuX } from 'react-icons/lu';
import styled from 'styled-components';

export function SupplyLayout() {
  const supply = useSupplyStore(state => state.supply);
  const previousSupply = useRef<typeof supply | undefined>(undefined);

  const closeSupply = useSupplyStore(state => state.closeSupply);
  
  const lastOpenTime = useMemo(() => Date.now(), [supply?.id]);
  const canClose = (pause: number = 200) => Date.now() - lastOpenTime >= pause;

  useEffect(() => {
    if(previousSupply.current === undefined && supply !== null) {
      closeSupply();
      return;
    }

    if(previousSupply.current === undefined && supply === null) {
      previousSupply.current = null;
      return;
    }

    if(previousSupply.current?.id === supply?.id) return;

    playSound('fridge_toggle');

    previousSupply.current = supply;
  }, [supply?.id])

  function onClose() {
    if(!canClose()) return;

    closeSupply();
  }

  return (
    <AnimatePresence>
      {supply && (
        <SupplyContainer
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.1 }}
        >
          <SupplyContent>
            {supply.content.map((item, index) => {
              function onClick() {
                Rune.actions.giveItem({ item });
                onClose();
              }

              return (
                <SupplyItem onClick={onClick} key={index}>
                  <SupplyImage src={`previews/${item}.webp`}/>
                </SupplyItem>
              )
            })}
          </SupplyContent>
          <SupplyExitContainer>
            <SupplyExit onClick={onClose}>
              <LuX/>
            </SupplyExit>
          </SupplyExitContainer>
        </SupplyContainer>
      )}
    </AnimatePresence>
  )
}

const SupplyContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 120;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const SupplyContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(240, 240, 240, 0.9);
  color: #582D1D;
  backdrop-filter: blur(2px);
`

const SupplyItem = styled.button`
  background-color: #F9F9F9;
  width: calc(min(100% / 4 - 16px, 72px));
  aspect-ratio: 1;
  border: none;
  padding: 8px;
  border-radius: 16px;

  :hover {
    border-color: #BBBBBB !important;
  }
`

const SupplyImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
`

const SupplyExitContainer = styled.div`
  width: 100%;
  padding: 16px;
  background-color: rgba(240, 240, 240, 0.9);
  color: #582D1D;
  backdrop-filter: blur(2px);
`

const SupplyExit = styled.button`
  width: 100%;
  height: 80px;
  border-radius: 24px;
  background-color: #E5484D;
  border: 1px solid #CE2C31;
  color: #FFFCFC;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
`