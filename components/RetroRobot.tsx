'use client';

import { useState } from 'react';

export default function RetroRobot() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="retro-robot-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden
    >
      <div className="retro-robot-bubble" data-visible={hovered}>
        <span>hello!</span>
        <span className="retro-robot-bubble-tail" />
      </div>
      <div className="retro-robot">
        <svg
          viewBox="0 0 64 80"
          className="retro-robot-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* antenna */}
          <line x1="32" y1="8" x2="32" y2="0" className="robot-antenna" stroke="currentColor" strokeWidth="2" />
          <circle cx="32" cy="0" r="2.5" className="robot-antenna-dot" />
          {/* head */}
          <rect x="12" y="10" width="40" height="28" rx="4" className="robot-head" />
          {/* eyes */}
          <rect x="20" y="18" width="8" height="8" rx="2" className="robot-eye robot-eye-l" />
          <rect x="36" y="18" width="8" height="8" rx="2" className="robot-eye robot-eye-r" />
          {/* mouth / display */}
          <rect x="22" y="32" width="20" height="4" rx="1" className="robot-mouth" />
          {/* body */}
          <rect x="14" y="40" width="36" height="28" rx="4" className="robot-body" />
          <rect x="20" y="46" width="24" height="8" rx="2" className="robot-screen" />
          <text x="32" y="52" textAnchor="middle" className="robot-screen-text" fontSize="4" fill="currentColor">OK</text>
          {/* arms */}
          <rect x="6" y="44" width="10" height="6" rx="2" className="robot-arm robot-arm-l" />
          <rect x="48" y="44" width="10" height="6" rx="2" className="robot-arm robot-arm-r" />
          {/* feet */}
          <rect x="18" y="70" width="10" height="6" rx="2" className="robot-foot" />
          <rect x="36" y="70" width="10" height="6" rx="2" className="robot-foot" />
        </svg>
      </div>
    </div>
  );
}
