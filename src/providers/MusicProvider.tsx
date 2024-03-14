import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useClientStore } from '@stores/ClientStore';
import { Howl } from 'howler';

const MusicContext = createContext<ReturnType<typeof useContextValue>>(null!);
export const useMusic = () => useContext(MusicContext);

export function MusicProvider({ children, loaded }: PropsWithChildren<{ loaded: boolean }>) {
  const value = useContextValue();

  const game = useClientStore(state => state.client?.game);

  const [howl, setHowl] = useState<Howl | null>(null);

  useEffect(() => {
    if(!loaded) return;
    
    const howl = new Howl({
      src: `music/music.mp3`,
      autoplay: true,
      loop: true,
      volume: 0.125,
    });

    setHowl(howl);

    return () => {
      howl.pause();
      setHowl(null);
    }
  }, [loaded])

  useEffect(() => {
    if(loaded && value.playing) howl?.play();
    else howl?.pause();
  }, [loaded, howl, value.playing])

  useEffect(() => {
    if(!loaded || !game) return;

    const maxSpeed = 0.125;
    const start = game.level.startedAt;

    if(game.status !== 'game') howl?.rate(1);

    function onInterval() {
      const progress = Math.round((((Rune.gameTime() - start) / 1000) / (10 * 60)) * 10) / 10;

      howl?.rate(Math.min(Math.round((1 + progress * maxSpeed) * 10) / 10, 1 + 1 * maxSpeed));
    }
    
    const interval = setInterval(onInterval, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [loaded, howl, game?.status, game?.level.startedAt])

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  )
}

function useContextValue() {
  const [playing, setPlaying] = useState(true);

  return {
    playing,
    setPlaying,
  }
}