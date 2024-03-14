import { nanoid } from 'nanoid';
import { useMemo } from 'react';

export function useObjectUUID() {
  const uuid = useMemo(() => nanoid(), []);

  return uuid;
}