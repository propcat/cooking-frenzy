import { create } from 'zustand'

interface ThrowState {
  force: number,
  setForce: (force: number) => void,
  preview: boolean,
  setPreview: (preview: boolean) => void,
  angle: number,
  setAngle: (angle: number) => void,
}

export const useThrowStore = create<ThrowState>()((set) => ({
  force: 12,
  setForce: force => set(state => ({ ...state, force })),
  preview: false,
  setPreview: preview => set(state => ({ ...state, preview })),
  angle: 30,
  setAngle: angle => set(state => ({ ...state, angle })),
}))