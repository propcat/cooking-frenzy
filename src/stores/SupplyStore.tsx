import { create } from 'zustand'
import type { Position } from '@mytypes/Position';
import type { Food } from '@mytypes/Food';
import type { Ingredient } from '@mytypes/Ingredient';

type Supply = { position: Position, content: (Ingredient | Food)[] };
type Supplies = {[key: string]: Supply};

interface SupplyState {
  supplies: Supplies,
  supply: { id: string } & Supply | null,
  registerSupply: (id: string, position: Position, content: (Ingredient | Food)[]) => void,
  unregisterSupply: (id: string) => void,
  openSupply: (id: string) => void,
  closeSupply: () => void,
}

export const useSupplyStore = create<SupplyState>()((set) => ({
  supplies: {},
  supply: null,
  registerSupply: (id, position, content) => set(state => {
    const supplies = { ...state.supplies };

    supplies[id] = { position, content };

    return { ...state, supplies };
  }),
  unregisterSupply: id => set(state => {
    const keys = Object.keys(state.supplies);

    const supplies: Supplies = {};

    for(const key of keys) {
      if(key === id) continue;

      supplies[key] = state.supplies[key];
    }

    return { ...state, supplies };
  }),
  openSupply: id => set(state => {
    const supply = state.supplies[id];

    if(!supply) return state;

    return { ...state, supply: { ...supply, id }};
  }),
  closeSupply: () => set(state => ({ ...state, supply: null })),
}))