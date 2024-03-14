import '@fontsource-variable/roboto-mono';
import '@fontsource-variable/rubik';

import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Canvas} from '@react-three/fiber';
import styled from 'styled-components';
import { PlayerObject } from '@components/PlayerObject';
import { SpectatorLayout } from '@components/SpectatorLayout.tsx';
import { OnLoad } from '@components/OnLoad.tsx';
import { LazyImagePreload } from '@components/LazyImagePreload.tsx';
import { SpectatorCamera } from '@components/SpectatorCamera';
import { MusicProvider } from '@providers/MusicProvider.tsx';
import { SpectatorProvider } from '@providers/SpectatorProvider.tsx';
import { Level1 } from '@levels/Level1.tsx';
import { useClientStore } from '@stores/ClientStore.tsx';
import { ClosestInteractionProvider } from '@providers/ClosestInteractionProvider';
import { LevelObject } from '@components/LevelObject';
import { GameData } from '@gamedata';
import { BottomLayout } from '@ui/BottomLayout';
import { HomeScreen } from '@ui/HomeScreen';
import { SupplyLayout } from '@ui/SupplyLayout';
import { Box } from '@react-three/drei';
import { TopLayout } from '@ui/TopLayout';
import { OrderLayout } from '@ui/OrderLayout';
import { GameOverScreen } from '@ui/GameOverScreen';
import { LoadingScreen } from '@ui/LoadingScreen';
import { AnimatePresence } from 'framer-motion';
import { AnimatedBackground } from '@ui/AnimatedBackground';
import { IngameMenu } from '@ui/IngameMenu';
import { ItemObject } from '@components/ItemObject';
import { ItemThrowPreviewObject } from '@components/ItemThrowPreviewObject';

export function App() {
  const { client, setClient } = useClientStore();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if(!loaded) return;
    
    Rune.initClient({
      onChange: (client) => {
        setClient(client);
      },
    })
  }, [loaded])

  const onLevelLoad = () => Rune.actions.onLevelLoad();

  return (
    <Container>
      <LazyImagePreload/>
      <MusicProvider loaded={loaded}>
        <SpectatorProvider>
          <ClosestInteractionProvider>
            <TopLayout loaded={loaded}/>
            <Content>
              <Suspense>
                <OnLoad onLoad={() => setLoaded(true)}/>

                <AnimatePresence>
                  { loaded && (client?.game.status !== 'game' || !client.game.level.loaded) && <AnimatedBackground key='background'/> }
                  { loaded && client?.game.status === 'menu' && <HomeScreen key='home'/> }
                  { loaded && client?.game.status === 'game' && !client.game.level.loaded && <LoadingScreen key='loading'/> }
                  { loaded && client?.game.status === 'gameover' && <GameOverScreen key='gameover'/> }
                </AnimatePresence>

                { loaded && client?.game.status === 'game' && (
                  <Suspense>
                    <OnLoad onLoad={onLevelLoad}/>

                    <SupplyLayout/>
                    <OrderLayout/>

                    { client?.yourPlayerId && <BottomLayout/> }
                    
                    <Canvas style={{ width: '100%', height: '100%' }}>
                      <SpectatorCamera/>

                      <LevelObject position={[0, -0.1, 0]} level={GameData.levels[client.game.level.levelIndex]}/>

                      {client.game.players.map(player => (
                        <PlayerObject key={player.id} player={player}/>
                      ))}

                      <ItemThrowPreviewObject/>
                    </Canvas>
                    
                  </Suspense>
                )}
              </Suspense>
            </Content>
            <SpectatorLayout/>
          </ClosestInteractionProvider>
        </SpectatorProvider>
      </MusicProvider>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
`