import { useClientStore } from '@stores/ClientStore';

export function useIsSpectator() {
  const yourPlayerId = useClientStore(state => state.client?.yourPlayerId);

  return !yourPlayerId;
}