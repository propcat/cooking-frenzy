import { useEffect, useRef } from 'react';
import { PlayerModelHandle } from '@models/player/PlayerModelHandle';
import { PlayerModel } from '@models/player/PlayerModel';
import { useClientStore } from '@stores/ClientStore';
import { useLocalPlayer } from '@utilities/useLocalPlayer';
import { usePlayerAnimation } from '@hooks/player/usePlayerAnimation';
import { useLocalPlayerMovement } from '@hooks/player/useLocalPlayerMovement';
import { useLocalPlayerMovementSync } from '@hooks/player/useLocalPlayerMovementSync';
import { useOnlinePlayerMovement } from '@hooks/player/useOnlinePlayerMovement';
import { usePlayerCarrySound } from '@hooks/player/usePlayerCarrySound';
import type { Player } from '@mytypes/Player';

interface Props {
  player: Player,
}

export function PlayerObject({ player }: Props) {
  const yourPlayerId = useClientStore(store => store.client?.yourPlayerId);

  if(yourPlayerId === player.id) return <LocalPlayer/>;

  return <OnlinePlayer player={player}/>;
}

function OnlinePlayer({ player }: Props) {
  const ref = useRef<PlayerModelHandle>(null);

  useOnlinePlayerMovement(player, ref.current);
  usePlayerAnimation(player.animation, ref.current?.playAnimation);

  return (
    <PlayerModel player={player} playerModelType={player.model} ref={ref}/>
  )
}

function LocalPlayer() {
  const ref = useRef<PlayerModelHandle>(null);
  const setLocalPlayerHandle = useClientStore(state => state.setLocalPlayerHandle);
  const removeLocalPlayerHandle = useClientStore(state => state.removeLocalPlayerHandle);

  useEffect(() => {
    if(ref.current) setLocalPlayerHandle(ref.current);

    return () => {
      removeLocalPlayerHandle();
    }
  }, [ref])

  const player = useLocalPlayer();

  useLocalPlayerMovement(player, ref.current);
  useLocalPlayerMovementSync(player, ref.current);
  usePlayerAnimation(player?.animation, ref.current?.playAnimation);

  usePlayerCarrySound(player?.carry, player?.carry ? player?.item : null);

  if(player) return (
    <PlayerModel player={player} playerModelType={player.model} ref={ref}/>
  )

  return null;
}