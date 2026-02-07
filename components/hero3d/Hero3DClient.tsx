'use client';

import dynamic from 'next/dynamic';

const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false });

type Hero3DProps = {
  experienceStarted: boolean;
  onLoaded?: () => void;
};

export default function Hero3DClient(props: Hero3DProps) {
  return <Hero3D {...props} />;
}
