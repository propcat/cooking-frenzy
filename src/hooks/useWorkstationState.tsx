import { useClientStore } from '@stores/ClientStore';
import { stringToUtensil } from '@utilities/stringToUtensil';
import { useMemo, useState, useEffect } from 'react';

export function useWorkstationState(id?: string) {
  const workstations = useClientStore(state => state.client?.game.workstations);

  const workstation = useMemo(() => workstations?.find(w => w.id === id), [workstations, id]);
  const utensil = useMemo(() => workstation?.child === 'utensil' ? stringToUtensil(workstation.item) : undefined, [workstation]);
  
  const items = useMemo(() => workstation?.child === 'items' ? workstation.items : (utensil?.content ?? []), [workstation, utensil]);
  const item = useMemo(() => items.length === 0 ? undefined : items[0], [items]);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if(!workstation || !workstation.cooking) {
      setProgress(0);
      return;
    }

    const { cookingGoal, cookingSince } = workstation;

    function onInterval() {
      const now = Rune.gameTime();
      
      const timePassed = now - cookingSince;
      
      setProgress(timePassed / cookingGoal);
    }
    
    const interval = setInterval(onInterval, 10);

    return () => {
      clearInterval(interval);
    }
  }, [workstation?.cooking, workstation?.cookingGoal, workstation?.cookingSince])

  return { workstation, utensil, items, item, progress };
}