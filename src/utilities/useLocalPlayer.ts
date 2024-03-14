import { useClientStore } from '@stores/ClientStore';

export function useLocalPlayer() {
  const player = useClientStore(store => store.localPlayer);

  return player;
}