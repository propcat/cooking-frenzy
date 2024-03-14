import { create } from 'zustand'
import type { Position } from '@mytypes/Position';
import type { Workstation } from '@mytypes/Workstation';

type Workstations = {[key: string]: { type: Workstation, position: Position }};

interface WorkstationState {
  workstations: Workstations,
  registerWorkstation: (id: string, type: Workstation, position: Position) => void,
  unregisterWorkstation: (id: string) => void,
}

export const useWorkstationStore = create<WorkstationState>()((set) => ({
  workstations: {},
  registerWorkstation: (id, type, position) => set(state => {
    const workstations = { ...state.workstations };

    workstations[id] = { type, position };

    return { ...state, workstations };
  }),
  unregisterWorkstation: id => set(state => {
    const keys = Object.keys(state.workstations);

    const workstations: Workstations = {};

    for(const key of keys) {
      if(key === id) continue;

      workstations[key] = state.workstations[key];
    }

    return { ...state, workstations };
  }),
}))