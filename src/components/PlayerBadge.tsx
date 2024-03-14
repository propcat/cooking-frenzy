import { Html } from '@react-three/drei'
import styled from 'styled-components'
import { useMemo } from 'react';
import { useClientStore } from '@stores/ClientStore';

interface Props {
  id: string,
}

export function PlayerBadge({ id }: Props) {
  const client = useClientStore(state => state.client);

  const player = useMemo(() => client?.players[id], [client?.players, id]);

  if(!player || player.playerId === client?.yourPlayerId) return null;

  return (
    <Html
      zIndexRange={[100, 0]}
      as='div'
      center
      transform
      sprite
      position={[0, 4.5, 0]}
    >
      <Container>
        <Avatar src={player.avatarUrl}/>
        <Name>{player.displayName}</Name>
      </Container>
    </Html>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 16px;
`

const Avatar = styled.img`
  width: 24px;
  border-radius: 32px;
  aspect-ratio: 1;
  object-fit: cover;
  background-color: #FCFCFC;
`

const Name = styled.p`
  font-size: 10px;
  font-weight: 500;
  margin: 0;
  background-color: #FCFCFC;
  color: #202020;
  padding: 4px 8px;
  border-radius: 16px;
`