import type { Position } from '@mytypes/Position';

interface Size {
  length: number,
  offset: number,
  axis: 'x' | 'z',
}

export function repeatLine({ length, offset, axis }: Size) {
  const array: Position[] = [];

  for(let i = 0; i < length; i++) {
    array.push({ x: axis === 'x' ? i * offset : 0, y: 0, z: axis === 'z' ? i * offset : 0 });
  }

  return array;
}