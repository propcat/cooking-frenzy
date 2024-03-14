import { useState, useEffect } from 'react';
import { playSound } from '@utilities/playSound';

export function usePlayerCarrySound(carry?: 'item' | 'utensil' | null, item?: any) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if(!initialized) {
      setInitialized(true);
      return;
    }

    if(carry) playSound('pick');
    else playSound('put');
  }, [carry, item])
}