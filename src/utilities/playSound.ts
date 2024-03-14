import { Sound } from '@mytypes/Sound';

export function playSound(sound: Sound, volume?: number, rate?: number) {
  let name: string = sound;

  const howl = new Howl({
    src: `sounds/${name}.mp3`,
    autoplay: true,
    loop: false,
    volume: volume ?? 0.5,
    rate: Math.max(0.5, Math.min(rate ?? 1, 4)),
  });

  howl.play();
}