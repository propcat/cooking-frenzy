import type { Decoration } from '@mytypes/Decoration';
import type { Scale } from '@mytypes/Scale';

export type DecorationState = {
  type: Decoration,
  scale?: Scale | number,
}