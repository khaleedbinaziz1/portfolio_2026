'use client';

import { useState } from 'react';

/** Cute pixel-style "pet" that sits near the corner label - terminal buddy */
export default function TerminalPet() {
  const [happy, setHappy] = useState(false);

  return (
    <div
      className="terminal-pet-wrap"
      onMouseEnter={() => setHappy(true)}
      onMouseLeave={() => setHappy(false)}
      aria-hidden
    >
      <div className="terminal-pet" data-happy={happy}>
        <svg viewBox="0 0 32 32" className="terminal-pet-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* simple pixel cat/creature */}
          <rect x="10" y="4" width="12" height="10" rx="2" className="pet-head" />
          <rect x="12" y="8" width="3" height="3" rx="1" className="pet-eye pet-eye-l" />
          <rect x="17" y="8" width="3" height="3" rx="1" className="pet-eye pet-eye-r" />
          <rect x="14" y="12" width="4" height="2" rx="1" className="pet-mouth" />
          <rect x="6" y="14" width="6" height="4" rx="1" className="pet-ear pet-ear-l" />
          <rect x="20" y="14" width="6" height="4" rx="1" className="pet-ear pet-ear-r" />
          <rect x="12" y="14" width="8" height="12" rx="2" className="pet-body" />
          <rect x="8" y="22" width="4" height="6" rx="1" className="pet-paw" />
          <rect x="20" y="22" width="4" height="6" rx="1" className="pet-paw" />
        </svg>
      </div>
    </div>
  );
}
