'use client';

import { useState, useEffect } from 'react';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';
import { setSoundMuted, isSoundMuted } from '@/lib/retroSound';

const NAV_AMBER = 'var(--retro-amber)';

export default function RetroSoundToggle() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(isSoundMuted());
  }, []);

  const handleClick = () => {
    const next = !muted;
    setMuted(next);
    setSoundMuted(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center justify-center w-10 h-10 rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0a08]"
      style={{ color: NAV_AMBER }}
      aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
      title={muted ? 'Sound off (click to enable)' : 'Sound on (click to mute)'}
    >
      {muted ? (
        <FiVolumeX size={22} style={{ filter: 'drop-shadow(0 0 3px rgba(249, 144, 33, 0.4))' }} />
      ) : (
        <FiVolume2 size={22} style={{ filter: 'drop-shadow(0 0 3px rgba(249, 144, 33, 0.4))' }} />
      )}
    </button>
  );
}
