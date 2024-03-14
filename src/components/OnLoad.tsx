import { PropsWithChildren, useLayoutEffect } from 'react';

interface Props {
  onLoad: () => any,
}

export function OnLoad({ onLoad, children }: PropsWithChildren<Props>) {
  useLayoutEffect(() => {
    setTimeout(onLoad, 1000);
  }, [])

  return children;
}