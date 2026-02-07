'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useScreenTexture } from './useScreenTexture';
import { personalInfo } from '@/data/personal';

function valMap(
  x: number,
  from: [number, number],
  to: [number, number]
): number {
  const y =
    ((x - from[0]) / (from[1] - from[0])) * (to[1] - to[0]) + to[0];
  if (to[0] < to[1]) {
    if (y < to[0]) return to[0];
    if (y > to[1]) return to[1];
  } else {
    if (y > to[0]) return to[0];
    if (y < to[1]) return to[1];
  }
  return y;
}

export function ComputerScene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF('/models/Commodore710_33.5.glb');
  const sceneClone = useRef<THREE.Group | null>(null);
  const [bakeTexture, bakeFloorTexture] = useTexture([
    '/textures/bake-quality-5.jpg',
    '/textures/bake_floor-quality-3.jpg',
  ]);

  const screenTexture = useScreenTexture(
    '/khaled_bin_aziz.jpg',
    personalInfo.name,
    personalInfo.title,
    personalInfo.greeting
  );

  useEffect(() => {
    bakeTexture.flipY = false;
    bakeTexture.colorSpace = THREE.SRGBColorSpace;
    bakeFloorTexture.flipY = false;
    bakeFloorTexture.colorSpace = THREE.SRGBColorSpace;
  }, [bakeTexture, bakeFloorTexture]);

  if (!sceneClone.current) {
    sceneClone.current = gltf.scene.clone();
  }
  const clone = sceneClone.current;

  const computerMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ map: bakeTexture }),
    [bakeTexture]
  );
  const floorMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ map: bakeFloorTexture }),
    [bakeFloorTexture]
  );
  const screenMat = useMemo(() => {
    if (screenTexture) {
      return new THREE.MeshBasicMaterial({
        map: screenTexture,
        side: THREE.DoubleSide,
      });
    }
    return new THREE.MeshBasicMaterial({ color: 0x001100 });
  }, [screenTexture]);

  const screenMesh = clone.children.find(
    (c) => (c as THREE.Mesh).name === 'Screen'
  ) as THREE.Mesh | undefined;
  const computerMesh = clone.children.find(
    (c) => (c as THREE.Mesh).name === 'Computer'
  ) as THREE.Mesh | undefined;
  const crtMesh = clone.children.find(
    (c) => (c as THREE.Mesh).name === 'CRT'
  ) as THREE.Mesh | undefined;
  const keyboardMesh = clone.children.find(
    (c) => (c as THREE.Mesh).name === 'Keyboard'
  ) as THREE.Mesh | undefined;
  const shadowPlaneMesh = clone.children.find(
    (c) => (c as THREE.Mesh).name === 'ShadowPlane'
  ) as THREE.Mesh | undefined;

  const computerHeight = 1.5;
  const computerAngle = Math.PI * 0.2;
  const computerHorizontal = 0.5;

  useEffect(() => {
    if (!screenMesh || !computerMesh || !crtMesh || !keyboardMesh || !shadowPlaneMesh) return;
    screenMesh.material = screenMat;
    computerMesh.material = computerMaterial;
    crtMesh.material = computerMaterial;
    keyboardMesh.material = computerMaterial;
    shadowPlaneMesh.material = floorMaterial;
  }, [screenMesh, computerMesh, crtMesh, keyboardMesh, shadowPlaneMesh, screenMat, computerMaterial, floorMaterial]);

  useFrame((state) => {
    const scroll = scrollRef.current;
    const viewHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const portraitOffset = valMap(
      viewHeight / (typeof window !== 'undefined' ? window.innerWidth : 1200),
      [0.75, 1.75],
      [0, 2]
    );
    const zoomFac = valMap(scroll, [0, 1], [0, 1]);

    if (state.camera) {
      state.camera.position.z = valMap(
        scroll,
        [0, 1],
        [-2.5 - portraitOffset, -10 - portraitOffset]
      );
      state.camera.lookAt(0, 0, 0);
    }

    if (groupRef.current) {
      groupRef.current.position.x = computerHorizontal * zoomFac;
      groupRef.current.position.y = valMap(
        scroll,
        [0, 1],
        [0, computerHeight]
      );
      groupRef.current.rotation.y = computerAngle * zoomFac;
    }
  });

  if (!screenMesh || !computerMesh || !crtMesh || !keyboardMesh || !shadowPlaneMesh) {
    return null;
  }

  return (
    <group ref={groupRef}>
      <primitive object={clone} />
    </group>
  );
}

useGLTF.preload('/models/Commodore710_33.5.glb');
