import { create } from 'zustand'
import type { JoystickState } from '@mytypes/JoystickState';

interface JoystickStoreState {
  state: JoystickState,
  setState: (joystickState: JoystickState) => void,
}

export const useJoystickStore = create<JoystickStoreState>()((set) => ({
  state: { x: 0, y: 0, active: false },
  setState: joystickState => set(oldState => ({ ...oldState, state: joystickState })),
}))