import { useState, useEffect } from 'react';
import type { PlayerAnimation } from '@mytypes/PlayerAnimation';

export function usePlayerAnimation(animation?: PlayerAnimation, playAnimation?: (animation: PlayerAnimation) => void) {
  const [previousAnimation, setPreviousAnimation] = useState<PlayerAnimation | null>(null);

  useEffect(() => {
    if(!playAnimation || !animation || animation === previousAnimation) return;

    playAnimation(animation);
    setPreviousAnimation(animation);
  }, [animation, playAnimation])
}