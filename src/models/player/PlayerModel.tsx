import { forwardRef, useMemo } from 'react';
import { PlayerModelHandle } from '@models/player/PlayerModelHandle';
import { GroupProps } from '@react-three/fiber';
import { PlayerModelType } from '@mytypes/PlayerModelType';
import { RabbitPink } from '@models/player/RabbitPink';
import { RabbitPurple } from '@models/player/RabbitPurple';
import { RabbitGrey } from '@models/player/RabbitGrey';
import { RabbitGreen } from '@models/player/RabbitGreen';
import { RabbitCyan } from '@models/player/RabbitCyan';
import { RabbitBlond } from '@models/player/RabbitBlond';
import { Player } from '@mytypes/Player';
import { degToRad, radToDeg } from 'three/src/math/MathUtils';
import { Html } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useClientStore } from '@stores/ClientStore';
import { Plate } from '@models/utensil/Plate';
import { Pan } from '@models/utensil/Pan';
import { Pot1Empty } from '@models/utensil/Pot1Empty';
import { Pot2Empty } from '@models/utensil/Pot2Empty';
import { Pot1Filled } from '@models/utensil/Pot1Filled';
import { Pot2Filled } from '@models/utensil/Pot2Filled';
import { UtensilState } from '@mytypes/UtensilState';
import { stringToUtensil } from '@utilities/stringToUtensil';
import { ItemThrowPreviewObject } from '@components/ItemThrowPreviewObject';
import { rotationToEuler } from '@utilities/rotationToEuler';
import { useThrowStore } from '@stores/ThrowStore';
import { Euler, Quaternion } from 'three';

interface Props {
  player: Player,
  playerModelType: PlayerModelType,
}

export const PlayerModel = forwardRef<PlayerModelHandle, GroupProps & Props>(({ player, playerModelType, ...props }, ref) => {
  const yourPlayerId = useClientStore(store => store.client?.yourPlayerId);

  const items = useMemo(() => player.carry === 'utensil' ? stringToUtensil(player.item).content : (player.item ? [ player.item ] : []), [player.carry, player.item]);

  const children = (
    <group>
      {yourPlayerId === player.id && (
        <Html
          zIndexRange={[90, 0]}
          as='div'
          center
          transform
          sprite
          position={[ 0, 4.75, 0 ]}
        >
          <AnimatePresence>
            {items.length > 0 && (
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Bubble layout transition={{ duration: 0.1 }}>
                  {items.map((item, index) => (
                    <Image
                      key={index}
                      src={`previews/${item}.webp`}
                    />
                  ))}
                </Bubble>
              </motion.div>
            )}
          </AnimatePresence>
        </Html>
      )}
      <Carry player={player}/>
    </group>
  )
  
  //@ts-ignore
  if(playerModelType === 'rabbit_pink') return <RabbitPink ref={ref} {...props} playerId={player.id} children={children}/>
  //@ts-ignore
  if(playerModelType === 'rabbit_purple') return <RabbitPurple ref={ref} {...props} playerId={player.id} children={children}/>
  //@ts-ignore
  if(playerModelType === 'rabbit_grey') return <RabbitGrey ref={ref} {...props} playerId={player.id} children={children}/>
  //@ts-ignore
  if(playerModelType === 'rabbit_green') return <RabbitGreen ref={ref} {...props} playerId={player.id} children={children}/>
  //@ts-ignore
  if(playerModelType === 'rabbit_cyan') return <RabbitCyan ref={ref} {...props} playerId={player.id} children={children}/>
  //@ts-ignore
  if(playerModelType === 'rabbit_blond') return <RabbitBlond ref={ref} {...props} playerId={player.id} children={children}/>

  return null;
})

function Carry({ player, ...props }: GroupProps & { player: Player }) {
  const utensil = useMemo<UtensilState | null>(() => player.carry === 'utensil' ? stringToUtensil(player.item) : null, [player.carry, player.item]);
  
  if(player.carry === 'item') return (
    <Plate item={player.item} position={[0, 1.2, 1.2]} {...props}/>
  )

  if(player.carry === 'utensil' && utensil) {
    if(utensil.type === 'pan') return (
      <Pan position={[0, 1.2, 1.8]} rotation={[0, degToRad(180), 0]} {...props}/>
    )

    if(utensil.type === 'pot_1') {
      if(utensil.content.length > 0) return <Pot1Filled position={[0, 1, 1.3]} {...props}/>;
      else return <Pot1Empty position={[0, 1, 1.3]} {...props}/>;
    }

    if(utensil.type === 'pot_2') {
      if(utensil.content.length > 0) return <Pot2Filled position={[0, 0.75, 1.3]} {...props}/>;
      else return <Pot2Empty position={[0, 0.75, 1.3]} {...props}/>;
    }
  }

  return null;
}

const Bubble = styled(motion.div)`
  min-width: 32px;
  height: 32px;
  background-color: #FFF;
  border-radius: 8px;
  display: flex;
  gap: 16px;
  padding: 4px;
  outline: 2px solid #646464;
`

const Image = styled(motion.img)`
  height: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  filter: saturate(1.25) brightness(1.25) ;
`