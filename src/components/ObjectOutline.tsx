import { Outlines } from '@react-three/drei';

interface Props {
  outline?: boolean,
}

export function ObjectOutline({ outline }: Props) {
  if(outline) return (
    <Outlines thickness={0.05} color='#646464'/>
  )

  return null;
}