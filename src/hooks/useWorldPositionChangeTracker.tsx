import { getGroupWorldPosition } from '@utilities/getGroupWorldPosition';
import { useEffect, useState } from 'react';
import { Group } from 'three';

export function useWorldPositionChangeTracker(group: Group | null) {
  const [tracker, setTracker] = useState(0);
  
  useEffect(() => {
    if(!group) return;
    
    setTracker(0);

    let { position: previousGroupWorldPosition } = getGroupWorldPosition(group);

    function onInterval() {
      if(!group) return;

      const { position } = getGroupWorldPosition(group);

      if(position.x !== previousGroupWorldPosition.x || position.y !== previousGroupWorldPosition.y || position.z !== previousGroupWorldPosition.z) {
        setTracker(tracker => tracker + 1);
      }
    }

    const interval = setInterval(onInterval, 200);

    return () => {
      clearInterval(interval);
    }
  }, [group])

  return tracker;
}