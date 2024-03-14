export interface Rotation {
  x: number,
  y: number,
  z: number,
  w: number,
}

export type EulerRotation = Omit<Rotation, 'w'>;