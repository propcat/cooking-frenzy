import styled from 'styled-components'
import { MovementJoystick } from '@ui/MovementJoystick'
import { InteractionButton } from '@ui/InteractionButton'

export function BottomLayout() {
  return (
    <Container>
      <MovementJoystick/>
      <InteractionButton/>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 110;
  width: 100%;
  padding: 36px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  @media (max-width: 300px) {
    padding: 16px;
  }
`