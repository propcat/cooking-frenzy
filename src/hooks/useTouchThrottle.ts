import { useState } from 'react';

export function useTouchThrottle(pause: number = 100) {
  const [lastTouchTime, setLastTouchTime] = useState(0);

  function onTouch(): boolean {
    const now = Date.now();

    if(now - lastTouchTime < pause) return false;

    setLastTouchTime(now);
    return true;
  }

  return onTouch;
}