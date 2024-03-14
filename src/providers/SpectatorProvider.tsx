import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { useClientStore } from '@stores/ClientStore';

const SpectatorContext = createContext<ReturnType<typeof useContextValue>>(null!);
export const useSpectator = () => useContext(SpectatorContext);

export function SpectatorProvider({ children }: PropsWithChildren) {
  const value = useContextValue();

  return (
    <SpectatorContext.Provider value={value}>
      {children}
    </SpectatorContext.Provider>
  )
}

function useContextValue() {
  const [observedPlayerId, setObservedPlayerId] = useState<string | null>();

  const players = useClientStore(store => store.client?.players);

  useEffect(() => {
    if(!players) return;
    
    if(observedPlayerId && players[observedPlayerId]) return;

    const ids = Object.keys(players);

    if(ids.length === 0) setObservedPlayerId(null);
    else setObservedPlayerId(ids[0]);
  }, [observedPlayerId, players])

  return {
    observedPlayerId,
    setObservedPlayerId,
  }
}