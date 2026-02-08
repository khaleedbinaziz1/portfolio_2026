'use client';

import Image from 'next/image';

/** Local retro pixel GIFs – game room + arcade vibe */
const GAME_GIF = '/images/game.gif';
const GAME2_GIF = '/images/game2.gif';

export default function RetroGifs() {
  return (
    <div className="retro-gifs-wrap" aria-hidden>
      <div className="retro-gifs-inner">
        <Image
          src={GAME_GIF}
          alt=""
          width={64}
          height={64}
          className="retro-gifs-img"
          unoptimized
        />
        <Image
          src={GAME2_GIF}
          alt=""
          width={64}
          height={64}
          className="retro-gifs-img"
          unoptimized
        />
      </div>
      <span className="retro-gifs-label">retro</span>
    </div>
  );
}
