import type { Position } from '@mytypes/Position';

interface Size {
  size: number,
  offset: number,
}

export function repeatTile({ size, offset }: Size) {
  const array: Position[] = [];

  for(let i = 0; i < size; i++) {
    for(let j = 0; j < size; j++) {
      array.push({ x: i * offset, y: 0, z: j * offset });
    }
  }

  return array;
}