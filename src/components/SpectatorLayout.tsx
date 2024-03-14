import styled from 'styled-components'
import { useMemo } from 'react';
import { Player } from 'rune-games-sdk';
import { useSpectator } from '@providers/SpectatorProvider';
import { useClientStore } from '@stores/ClientStore';

export function SpectatorLayout() {
  const client = useClientStore(store => store.client);
  const { observedPlayerId, setObservedPlayerId } = useSpectator();
  
  const playerArray = useMemo(() => {
    if(!client) return [];

    const array: Player[] = [];

    for(const key of Object.keys(client.players)) {
      array.push(client.players[key]);
    }

    return array;
  }, [client?.players])

  if(client?.yourPlayerId) return null;

  return (
    <Container>
      {playerArray.map((player, index) => (
        <Avatar
          key={index}
          onClick={() => setObservedPlayerId(player.playerId)}
          selected={observedPlayerId === player.playerId}
          src={player.avatarUrl}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  width: 100%;
  padding: 64px 32px;
  gap: 20px;
  z-index: 120;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Avatar = styled.img<{ selected?: boolean }>`
  width: calc(100% / 4 - 24px);
  max-width: 56px;
  object-fit: cover;
  border-radius: 100%;
  aspect-ratio: 1;
  ${props => props.selected ? '' : 'filter: grayscale(100%);'}
`