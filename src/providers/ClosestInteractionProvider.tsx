import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { useClosestObject } from '@hooks/useClosestObject';
import { useWorkstationStore } from '@stores/WorkstationStore';
import { useSupplyStore } from '@stores/SupplyStore';
import { ItemState } from '@mytypes/ItemState';
import { Position } from '@mytypes/Position';

const ClosestInteractionContext = createContext<ReturnType<typeof useContextValue>>({
  registerItem: () => {},
  unregisterItem: () => {},
  closestItem: null,
  closestWorkstation: null,
  closestSupply: null,
});

export const useClosestInteraction = () => useContext(ClosestInteractionContext);

export function ClosestInteractionProvider({ children }: PropsWithChildren) {
  const value = useContextValue();

  return (
    <ClosestInteractionContext.Provider value={value}>
      {children}
    </ClosestInteractionContext.Provider>
  )
}

const ITEM_MAX_DISTANCE = 4.3125;
const MAX_DISTANCE = 4;

function useContextValue() {
  const [items, setItems] = useState<{[key: string]: { position: Position }}>({});

  const workstations = useWorkstationStore(state => state.workstations);
  const supplies = useSupplyStore(state => state.supplies);

  const closestItem = useClosestObject(items, ITEM_MAX_DISTANCE);
  const closestWorkstation = useClosestObject(workstations, MAX_DISTANCE);
  const closestSupply = useClosestObject(supplies, MAX_DISTANCE);

  function registerItem(id: string, position: Position) {
    setItems(items => {
      const tempItems = { ...items };

      tempItems[id] = { position };

      return tempItems;
    })
  }

  function unregisterItem(id: string) {
    setItems(items => {
      const newItems: typeof items = {};

      for(const key of Object.keys(items)) {
        if(key === id) continue;

        newItems[key] = items[key];
      }

      return newItems;
    })
  }

  return { registerItem, unregisterItem, closestItem, closestWorkstation, closestSupply }
}