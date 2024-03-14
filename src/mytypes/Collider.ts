import type { BoundingBox } from '@mytypes/BoundingBox';
import type { Position } from '@mytypes/Position';

export type Collider = { boundingBox: BoundingBox, offset?: Position, ground?: boolean };